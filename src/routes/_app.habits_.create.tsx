import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useForm } from "@tanstack/react-form";

import {
  inputHabitIntervalSchema,
  inputHabitTitleSchema,
} from "#/utils/schemas";
import { createHabitFn } from "#/utils/habits.functions";

import PageTitle from "#/components/PageTitle";
import InputField from "#/components/InputField";
import SubmitButton from "#/components/SubmitButton";

export const Route = createFileRoute("/_app/habits_/create")({
  component: RouteComponent,
});

function RouteComponent() {
  const { user } = Route.useRouteContext();

  const createHabit = useServerFn(createHabitFn);
  const form = useForm({
    defaultValues: {
      title: "",
      interval: 1,
    },
    onSubmit: async ({ value }) => {
      if (!user) return;

      const { title, interval } = value;
      const { id: userId } = user;

      await createHabit({ data: { title, userId, interval } });
    },
  });

  return (
    <div>
      <PageTitle text="New habit" />

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
              label="Create"
              canSubmit={canSubmit}
              isSubmitting={isSubmitting}
            />
          )}
        />
      </form>
    </div>
  );
}
