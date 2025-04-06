"use client";

import React, { startTransition } from "react";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormStatus } from "react-dom";
import { useActionState } from "react";
import { login, LoginState } from "./actions";

const AdminLoginSchema = z.object({
  id: z.coerce.bigint(),
  email: z.string().email(),
});

export default function AdminLoginPage() {
  const [state, loginAction] = useActionState<LoginState, FormData>(
    login,
    undefined
  );

  const form = useForm<z.infer<typeof AdminLoginSchema>>({
    resolver: zodResolver(AdminLoginSchema),
    defaultValues: {
      id: BigInt(0),
      email: "",
    },
  });

  async function onSubmit(data: z.infer<typeof AdminLoginSchema>) {
    const formData = new FormData();
    formData.append("id", data.id.toString());
    formData.append("email", data.email);
    startTransition(() => {
      loginAction(formData);
    });
  }

  function SubmitButton() {
    const { pending } = useFormStatus();
    return (
      <Button disabled={pending} type="submit">
        {pending ? "Logging in..." : "Login"}
      </Button>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-2xl font-semibold mb-6 text-center">Admin Login</h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="id"
              render={({ field }) => {
                const error = state?.errors?.id?.[0];
                return (
                  <FormItem>
                    <FormLabel>Admin ID</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        value={field.value?.toString() ?? ""}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value === "" ? undefined : BigInt(e.target.value)
                          )
                        }
                      />
                    </FormControl>
                    <FormMessage />
                    {error && <p className="text-red-500">{error}</p>}
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => {
                const error = state?.errors?.email?.[0];
                return (
                  <FormItem>
                    <FormLabel>Admin Email</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                    {error && <p className="text-red-500">{error}</p>}
                  </FormItem>
                );
              }}
            />

            <SubmitButton />
          </form>
        </Form>
      </div>
    </div>
  );
}
