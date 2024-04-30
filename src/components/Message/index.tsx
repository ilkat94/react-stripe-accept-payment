import { XMarkIcon } from '@heroicons/react/24/solid';
import { classNames } from '../../utils';

interface MessageProps {
  title: string | undefined;
  isSuccess?: boolean;
  clearError?(): void;
  isNetworkError?: boolean;
}

export default function Message(props: MessageProps) {
  const { title, clearError, isSuccess, isNetworkError } = props;

  return (
    <div
      className={classNames(
        isSuccess
          ? 'text-green-800 dark:text-green-400 bg-green-50'
          : 'text-red-800 dark:text-red-400  bg-red-50',
        'flex items-center justify-between p-4 mb-4 text-sm  rounded-lg dark:bg-gray-800'
      )}
      role="alert"
    >
      <span>{title}</span>
      {isNetworkError && (
        <button onClick={clearError}>
          <XMarkIcon className="h-4" />
        </button>
      )}
    </div>
  );
}
