import { WalletIcon } from '@heroicons/react/24/solid';

interface FormHeaderProps {
  title: string;
}

export default function FormHeader(props: FormHeaderProps) {
  const { title } = props;

  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <WalletIcon className="mx-auto h-16 w-auto" />
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        {title}
      </h2>
    </div>
  );
}
