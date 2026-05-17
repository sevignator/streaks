import { type AnyFieldApi } from "@tanstack/react-form";

import FieldInfo from "#/components/FieldInfo";

interface inputFieldProps {
  field: AnyFieldApi;
  label: string;
  type?: React.HTMLInputTypeAttribute;
}

export default function InputField({
  field,
  label,
  type = "text",
}: inputFieldProps) {
  let handleOnChange: (
    e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => void;

  switch (type) {
    case "number": {
      handleOnChange = (e) => field.handleChange(e.target.valueAsNumber);
      break;
    }
    default: {
      handleOnChange = (e) => field.handleChange(e.target.value);
    }
  }

  return (
    <div className="flex flex-col">
      <label htmlFor={field.name} className="text-md font-semibold">
        {label}
      </label>
      <input
        type={type}
        id={field.name}
        name={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={handleOnChange}
        className="dark: rounded-md border border-solid border-slate-300 bg-slate-50 p-2 text-2xl dark:border-slate-600 dark:bg-slate-700"
      />
      <FieldInfo errors={field.state.meta.errors} />
    </div>
  );
}
