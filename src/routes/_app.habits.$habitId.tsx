import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/habits/$habitId')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_app/habits/$habitId"!</div>;
}
