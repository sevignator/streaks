import clsx from 'clsx';
import { type ComponentPropsWithoutRef } from 'react';

interface PageTitleProps extends ComponentPropsWithoutRef<'h1'> {
  text: string;
}

export default function PageTitle({ text, ...delegated }: PageTitleProps) {
  return (
    <h1
      {...delegated}
      className={clsx(delegated.className, 'text-4xl font-black')}
    >
      {text}
    </h1>
  );
}
