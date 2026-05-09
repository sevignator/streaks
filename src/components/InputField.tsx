import { type AnyFieldApi } from '@tanstack/react-form'

import FieldInfo from '#/components/FieldInfo'

interface inputFieldProps {
  field: AnyFieldApi
  label: string
  type?: React.HTMLInputTypeAttribute
}

export default function InputField({
  field,
  label,
  type = 'text',
}: inputFieldProps) {
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
        onChange={(e) => field.handleChange(e.target.value)}
        className="border-solid border-2 border-slate-300 rounded-md text-2xl p-2"
      />
      <FieldInfo errors={field.state.meta.errors} />
    </div>
  )
}
