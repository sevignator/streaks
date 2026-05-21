import { useServerFn } from '@tanstack/react-start';
import { createFileRoute, notFound } from '@tanstack/react-router';
import { useForm } from '@tanstack/react-form';

import {
  inputHabitIntervalSchema,
  inputHabitTitleSchema,
} from '#/utils/schemas';
import { deleteHabitFn, editHabitFn } from '#/utils/habits.functions';

import InputField from '#/components/InputField';
import PageTitle from '#/components/PageTitle';
import SubmitButton from '#/components/SubmitButton';

export const Route = createFileRoute('/_app/habits_/$habitId')({
  component: RouteComponent,
  loader: async ({ context, params }) => {
    const { habits } = context;
    const { habitId } = params;

    const habit = habits.find((habit) => habit.id === Number.parseInt(habitId));

    if (!habit) {
      throw notFound();
    }

    return { habit };
  },
});

function RouteComponent() {
  const { habit } = Route.useLoaderData();

  const deleteHabit = useServerFn(deleteHabitFn);
  const editHabit = useServerFn(editHabitFn);

  const form = useForm({
    defaultValues: {
      title: habit.title,
      interval: habit.interval,
    },
    onSubmit: async ({ value }) => {
      const { id: habitId } = habit;
      const { title, interval } = value;

      await editHabit({ data: { habitId, title, interval } });
    },
  });

  async function handleDelete() {
    await deleteHabit({ data: habit.id });
  }

  return (
    <div>
      <PageTitle text={`Edit "${habit.title}"`} />

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

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <SubmitButton
              label="Save changes"
              canSubmit={canSubmit}
              isSubmitting={isSubmitting}
            />
          )}
        />
      </form>

      <button
        className="mx-auto mt-4 block cursor-pointer text-lg text-red-600 dark:text-red-400"
        onClick={handleDelete}
      >
        Delete habit
      </button>
    </div>
  );
}
