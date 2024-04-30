import Label from '../Label';

interface InputProps {
  label: string;
  id: string;
  name: 'email' | 'fullName' | 'password' | 'password_confirmation';
  type: string;
  register: any;
  autoComplete?: string;
}

export default function Input(props: InputProps) {
  const { label, id, name, type, register, autoComplete } = props;

  return (
    <div>
      <Label name={name} label={label} />

      <div className="mt-2">
        <input
          {...register(name)}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          id={id}
          type={type}
          autoComplete={autoComplete}
        />
      </div>
    </div>
  );
}
