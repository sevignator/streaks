import { createServerFn } from '@tanstack/react-start';

export const getServerDateFn = createServerFn({ method: 'GET' }).handler(
  async () => {
    return new Date();
  },
);
