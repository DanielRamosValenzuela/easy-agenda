"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Send } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/lib/utils";
import {
  contactSchema,
  type ContactFormValues,
} from "../model/contact-schema";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function onSubmit(_data: ContactFormValues) {
    // Simulate async submission (no server call yet)
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-xl border border-border bg-muted/30 px-6 py-12 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
          <CheckCircle2 className="h-7 w-7 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">¡Mensaje enviado!</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Gracias por contactarnos. Te responderemos a la brevedad posible,
            normalmente en menos de 24 horas hábiles.
          </p>
        </div>
        <Button
          variant="outline"
          className="mt-2"
          onClick={() => {
            form.reset();
            setSubmitted(false);
          }}
        >
          Enviar otro mensaje
        </Button>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        {/* Nombre */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input placeholder="Tu nombre completo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo electrónico</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="tu@correo.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Asunto */}
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Asunto</FormLabel>
              <FormControl>
                <Input
                  placeholder="¿En qué podemos ayudarte?"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Mensaje */}
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mensaje</FormLabel>
              <FormControl>
                <textarea
                  rows={5}
                  placeholder="Escribe tu mensaje aquí..."
                  className={cn(
                    "flex w-full resize-none rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm",
                    "placeholder:text-muted-foreground",
                    "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                    "disabled:cursor-not-allowed disabled:opacity-50"
                  )}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full gap-2"
          disabled={form.formState.isSubmitting}
        >
          <Send className="h-4 w-4" />
          Enviar mensaje
        </Button>
      </form>
    </Form>
  );
}
