import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useForm } from "@tanstack/react-form";
import z from "zod";

import { userLoginFn } from "#/utils/users.functions";
import { inputEmailSchema, inputPasswordSchema } from "#/schemas/schemas";

import InputField from "#/components/InputField";
import SubmitButton from "#/components/SubmitButton";

export const Route = createFileRoute("/_user/login")({
  component: RouteComponent,
  validateSearch: z.object({
    message: z.string().optional(),
  }),
});

function RouteComponent() {
  const search = Route.useSearch();
  const loginUser = useServerFn(userLoginFn);
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      const { email, password } = value;
      await loginUser({ data: { email, password } });
    },
  });

  return (
    <div>
      {search.message === "account-created" && (
        <p className="p-2 bg-green-100 border-green-200 border rounded-md text-green-600 text-center mb-6">
          Your account has successfully been created.
        </p>
      )}

      {search.message === "password-reset" && (
        <p className="p-2 bg-green-100 border-green-200 border rounded-md text-green-600 text-center mb-6">
          A password reset email has been sent to the email address you
          provided.
        </p>
      )}

      {search.message === "password-updated" && (
        <p className="p-2 bg-green-100 border-green-200 border rounded-md text-green-600 text-center mb-6">
          Your password has successfully been updated.
        </p>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit(e);
        }}
        className="flex flex-col gap-6"
      >
        <form.Field
          name="email"
          validators={{
            onBlur: inputEmailSchema,
          }}
          children={(field) => (
            <InputField field={field} label="Email" type="email" />
          )}
        />

        <form.Field
          name="password"
          validators={{
            onBlur: inputPasswordSchema,
          }}
          children={(field) => (
            <InputField field={field} label="Password" type="password" />
          )}
        />

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <SubmitButton
              label="Log in"
              canSubmit={canSubmit}
              isSubmitting={isSubmitting}
            />
          )}
        />
      </form>

      <p className="text-center mt-4">
        <Link to="/login/reset">Reset password</Link>
      </p>
    </div>
  );
}
