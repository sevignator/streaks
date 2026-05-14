import { createFileRoute } from '@tanstack/react-router';

import PageTitle from '#/components/PageTitle';

export const Route = createFileRoute('/_app/stats')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <PageTitle text="Stats" />
    </div>
  );
}
