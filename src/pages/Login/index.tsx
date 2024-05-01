import { useState } from 'react';
import { Navigate } from 'react-router';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import Input from '../../components/Input';
import Message from '../../components/Message';
import FormHeader from '../../components/FromHeader';
import FormButton from '../../components/FormButton';

import { useAuth } from '../../hooks/useAuth';

interface Inputs {
  email: string;
  password: string;
}

const schema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z
    .string()
    .min(8, { message: 'Password must contain at least 8 characters.' })
    .max(120, { message: 'Password must contain at most 120 characters.' }),
});

export default function Login() {
  const { login, user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ resolver: zodResolver(schema) });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);

    const response = await fetch('http://localhost:8000/api/login', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    });

    if (!response.ok) {
      const error = await response.json();

      setLoading(false);
      setError(error.message);
      return;
    }

    const auth = await response.json();

    setLoading(false);
    login({ ...auth });
  };

  if (user) {
    return <Navigate to="/" />;
  }

  const clearError = () => setError('');

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <FormHeader title="Sign in to your account" />

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
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
            label="Password"
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            register={register}
          />
          {errors.password && <Message title={errors.password.message} />}

          <FormButton
            title="Sign in"
            disabled={loading}
            disabledTitle="Signing in..."
          />
        </form>
      </div>
    </div>
  );
}
