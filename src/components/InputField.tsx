import { type ComponentPropsWithoutRef } from 'react';
import { type AnyFieldApi } from '@tanstack/react-form';

import FieldInfo from '#/components/FieldInfo';
import clsx from 'clsx';

interface inputFieldProps extends ComponentPropsWithoutRef<'input'> {
  field: AnyFieldApi;
  label: string;
}

export default function InputField({
  field,
  label,
  type = 'text',
  ...delegated
}: inputFieldProps) {
  let handleOnChange: (
    e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => void;

  switch (type) {
    case 'number': {
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
        {...delegated}
        type={type}
        id={field.name}
        name={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={handleOnChange}
        className={clsx(
          'rounded-md border border-solid border-slate-300 bg-slate-50 p-2 text-xl dark:border-slate-600 dark:bg-slate-700',
          delegated.className,
        )}
      />
      <FieldInfo errors={field.state.meta.errors} />
    </div>
  );
}
