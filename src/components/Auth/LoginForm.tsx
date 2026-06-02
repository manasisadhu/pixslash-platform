"use client";

import { LoginSchemaType } from "@/lib/type";
import { loginSchema } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
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

const LoginForm = () => {
  const { push } = useRouter();

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
    },

    mode: "onSubmit",
  });

  const submitLoginData = async (lData: LoginSchemaType) => {
    await new Promise<void>((r) => setTimeout(r, 1800)); // test spinner

    // test the workflow of user login form
    if (!lData) {
      console.error("User login failed!");
      toast.error("User login failed!");
    } else {
      console.log(lData);
      console.log("User login successfully!");
      toast.success("User login successfully!");
      reset();
      push("/contribution");
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
