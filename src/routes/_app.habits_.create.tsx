import { useServerFn } from '@tanstack/react-start';
import { createFileRoute, Link, useRouter } from '@tanstack/react-router';
import { useForm } from '@tanstack/react-form';

import { appRoute } from '#/utils/routeApis';
import {
  inputHabitIntervalSchema,
  inputHabitTitleSchema,
} from '#/utils/schemas';
import { createHabitFn } from '#/utils/habits.functions';

import InputField from '#/components/InputField';
import PageTitle from '#/components/PageTitle';
import SubmitButton from '#/components/SubmitButton';

export const Route = createFileRoute('/_app/habits_/create')({
  component: RouteComponent,
});

function RouteComponent() {
  const { user } = appRoute.useLoaderData();

  const router = useRouter();
  const createHabit = useServerFn(createHabitFn);
  const form = useForm({
    defaultValues: {
      title: '',
      interval: 1,
    },
    onSubmit: async ({ value }) => {
      if (!user) return;

      const { title, interval } = value;
      const { userId } = user;

      await createHabit({ data: { title, userId, interval } });
      await router.invalidate();
    },
  });

  return (
    <>
      <PageTitle text="New habit" className="mb-8" />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit(e);
        }}
        className="flex flex-col gap-6"
      >
        <form.Field
          name="title"
          validators={{
            onBlur: inputHabitTitleSchema,
          }}
          children={(field) => <InputField field={field} label="Title" />}
        />

        <form.Field
          name="interval"
          validators={{
            onBlur: inputHabitIntervalSchema,
          }}
          children={(field) => (
            <InputField
              field={field}
              label="Interval (in days)"
              type="number"
            />
          )}
        />

        <div className="btn-group">
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <SubmitButton
                label="Create habit"
                canSubmit={canSubmit}
                isSubmitting={isSubmitting}
              />
            )}
          />

          <Link to="/habits" className="btn">
            Cancel
          </Link>
        </div>
      </form>
    </>
  );
}
