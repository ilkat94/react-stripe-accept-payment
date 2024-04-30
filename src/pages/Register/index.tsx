import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import Input from '../../components/Input';
import Message from '../../components/Message';
import FormHeader from '../../components/FromHeader';
import FormButton from '../../components/FormButton';

import { useAuth } from '../../hooks/useAuth';

export interface Inputs {
  email: string;
  fullName: string;
  password: string;
  password_confirmation: string;
}

const schema = z
  .object({
    email: z.string().email({ message: 'Invalid email address.' }),
    fullName: z
      .string()
      .min(1, { message: 'Name must contain at least 1 character.' })
      .max(18),
    password: z
      .string()
      .min(8, { message: 'Password must contain at least 8 characters.' })
      .max(120, { message: 'Password must contain at most 120 characters.' }),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'Passwords do not match.',
    path: ['password_confirmation'],
  });

export default function Register() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ resolver: zodResolver(schema) });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    setError('');

    const response = await fetch('http://localhost:8000/api/register', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        email: data.email,
        fullName: data.fullName,
        password: data.password,
        password_confirmation: data.password_confirmation,
      }),
    });

    if (!response.ok) {
      setLoading(false);
      setError(`An error occurred: ${response.status}`);
      return;
    }

    setLoading(false);
    setSuccess('Account has been created successfully.');

    setTimeout(() => {
      setSuccess('');
      navigate('/login');
    }, 1500);
  };

  if (user) {
    return <Navigate to="/" />;
  }

  const clearError = () => setError('');

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <FormHeader title="Create an account" />

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {success && <Message title={success} isSuccess />}

        {error && (
          <Message title={error} clearError={clearError} isNetworkError />
        )}

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Email address"
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            register={register}
          />
          {errors.email && <Message title={errors.email.message} />}

          <Input
            label="Full name"
            id="name"
            name="fullName"
            type="text"
            autoComplete="name"
            register={register}
          />

          {errors.fullName && <Message title={errors.fullName.message} />}

          <Input
            label="Password"
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            register={register}
          />
          {errors.password && <Message title={errors.password.message} />}

          <Input
            label="Confirm password"
            id="password"
            name="password_confirmation"
            type="password"
            autoComplete="new-password"
            register={register}
          />
          {errors.password_confirmation && (
            <Message title={errors.password_confirmation.message} />
          )}

          <FormButton
            title="Sign up"
            disabled={loading}
            disabledTitle="Signing up..."
          />
        </form>
      </div>
    </div>
  );
}
