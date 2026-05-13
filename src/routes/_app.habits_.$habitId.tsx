import { createFileRoute, notFound } from "@tanstack/react-router";
import { useForm } from "@tanstack/react-form";

import {
  deleteHabitFn,
  editHabitFn,
  getHabitByUserIdFn,
} from "#/utils/habits.functions";
import { getCurrentUserFn } from "#/utils/users.functions";

import PageTitle from "#/components/PageTitle";
import InputField from "#/components/InputField";
import SubmitButton from "#/components/SubmitButton";
import { useServerFn } from "@tanstack/react-start";

export const Route = createFileRoute("/_app/habits_/$habitId")({
  component: RouteComponent,
  loader: async ({ params }) => {
    const user = await getCurrentUserFn();

    if (!user) {
      throw notFound();
    }

    const habit = await getHabitByUserIdFn({
      data: { userId: user.id, habitId: Number.parseInt(params.habitId) },
    });

    return { user, habit };
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
    <div className="container">
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
          children={(field) => <InputField field={field} label="Title" />}
        />

        <form.Field
          name="interval"
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
        className="text-red-600 dark:text-red-400 mx-auto block cursor-pointer mt-4 text-lg"
        onClick={handleDelete}
      >
        Delete habit
      </button>
    </div>
  );
}
