import Label from '../Label';

export default function Input(props) {
  const { label, id, name, type, autoComplete, required } = props;

  return (
    <div>
      <Label name={name} label={label} autoComplete={autoComplete} />

      <div className="mt-2">
        <input
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          id={id}
          name={name}
          type={type}
          autoComplete={autoComplete}
          required={required}
        />
      </div>
    </div>
  );
}
