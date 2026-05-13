import { createFileRoute, notFound } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useForm } from "@tanstack/react-form";
import z from "zod";

import { inputPasswordSchema } from "#/schemas/schemas";
import {
  getPasswordResetTokenDataFn,
  updateUserPasswordWithTokenFn,
} from "#/utils/auth.functions";

import InputField from "#/components/InputField";
import SubmitButton from "#/components/SubmitButton";

export const Route = createFileRoute("/_user/login_/reset_/$token")({
  component: RouteComponent,
  loader: async ({ params }) => {
    const { token } = params;
    const data = await getPasswordResetTokenDataFn({ data: token });

    if (!data) throw notFound();

    return { data, token };
  },
});

function RouteComponent() {
  const updateUserPasswordWithToken = useServerFn(
    updateUserPasswordWithTokenFn,
  );
  const { data, token } = Route.useLoaderData();
  const form = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    onSubmit: async ({ value }) => {
      const userId = data.user.id;
      const newPassword = value.password;
      await updateUserPasswordWithToken({
        data: { token, userId, newPassword },
      });
    },
  });

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit(e);
        }}
        className="flex flex-col gap-6"
      >
        <form.Field
          name="password"
          validators={{
            onBlur: inputPasswordSchema,
          }}
          children={(field) => (
            <InputField field={field} label="New password" type="password" />
          )}
        />

        <form.Field
          name="confirmPassword"
          validators={{
            onBlur: z
              .string()
              .refine((input) => input === form.getFieldValue("password"), {
                message: "Passwords do not match",
                path: ["confirmPassword"],
              }),
          }}
          children={(field) => (
            <InputField
              field={field}
              label="Confirm password"
              type="password"
            />
          )}
        />

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <SubmitButton
              label="Update password"
              canSubmit={canSubmit}
              isSubmitting={isSubmitting}
            />
          )}
        />
      </form>
    </div>
  );
}
