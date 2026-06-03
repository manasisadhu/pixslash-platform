"use client";

import { authClient } from "@/lib/auth-client";
import { LoginSchemaType } from "@/lib/type";
import { loginSchema } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Route } from "next";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Button } from "../shadcnui/button";
import {
  Field,
  FieldError,
  FieldLabel,
  FieldSeparator,
} from "../shadcnui/field";
import { Input } from "../shadcnui/input";
import { Spinner } from "../shadcnui/spinner";

const isSafeRedirect = (dest: string): boolean =>
  dest.startsWith("/") &&
  !dest.startsWith("//") &&
  !dest.includes("://") &&
  !dest.includes("@");

const LoginForm = ({ returnTo }: { returnTo?: string }) => {
  const { replace } = useRouter();

  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),

    defaultValues: {
      emailAddress: "",
      password: "",
      rememberMe: false,
    },

    mode: "onSubmit",
  });

  const submitLoginData = async ({
    emailAddress,
    password,
    rememberMe,
  }: LoginSchemaType) => {
    try {
      const { error } = await authClient.signIn.email({
        email: emailAddress,
        password,
        rememberMe,
      });

      if (error) {
        console.error(error);
        toast.error("Login failed. Please try again.");
      } else {
        toast.success("Login successful!");

        reset();

        replace(
          (returnTo && isSafeRedirect(returnTo) ? returnTo : (
            "/contribution"
          )) as Route,
        );
      }
    } catch (err) {
      console.error(err);
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submitLoginData)}
      className="space-y-4"
      noValidate>
      {/* user email address field  */}
      <Controller
        name="emailAddress"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Email Address </FieldLabel>
            <Input
              {...field}
              type="email"
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder=" Email address"
              autoComplete="email"
            />

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* user password field  */}
      <Controller
        name="password"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Password</FieldLabel>
            <Input
              {...field}
              type="password"
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder="Password"
              autoComplete="off"
            />

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* Remember Me checkbox */}
      <Controller
        name="rememberMe"
        control={control}
        render={({ field }) => (
          <label className="text-muted-foreground flex cursor-pointer items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={field.value}
              onChange={field.onChange}
              className="border-border bg-background text-primary accent-primary size-4 rounded"
            />
            Remember me
          </label>
        )}
      />

      {/* submit button  */}
      <Button
        type="submit"
        className="w-full py-4"
        disabled={isSubmitting}>
        {isSubmitting ?
          <Spinner />
        : "Login"}
      </Button>

      <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card my-1">
        Or continue with
      </FieldSeparator>
    </form>
  );
};

export default LoginForm;
