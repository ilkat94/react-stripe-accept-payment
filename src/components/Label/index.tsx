interface LabelProps {
  name: string;
  label: string;
}

export default function Label(props: LabelProps) {
  const { name, label } = props;

  return (
    <label
      htmlFor={name}
      className="block text-sm font-medium leading-6 text-gray-900"
    >
      {label}
    </label>
  );
}
