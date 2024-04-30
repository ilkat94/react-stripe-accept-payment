import { classNames } from '../../utils';
import Spinner from '../Spinner';

interface FormButtonProps {
  disabled: boolean;
  disabledTitle: string;
  title: string;
}

export default function FormButton(props: FormButtonProps) {
  const { title, disabled, disabledTitle } = props;

  const classes = classNames(
    disabled
      ? 'opacity-55'
      : 'hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
    'flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm'
  );

  return (
    <button disabled={disabled} type="submit" className={classes}>
      {disabled ? <Spinner message={disabledTitle} /> : <span>{title}</span>}
    </button>
  );
}
