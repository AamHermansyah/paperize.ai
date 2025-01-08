'use client'

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import InputPassword from "@/components/core/input-password"
import { FormError } from "@/components/core/form-error"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"
import { users } from "@/constans/users"
import { useRouter } from "next/navigation"

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

function LoginPage() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useRouter();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof loginSchema>) {
    setLoading(true);
    setError('');

    setTimeout(() => {
      const user = users.find((account) => account.email === values.email);

      if (user) {
        setLoading(false);
        toast.success('Login successfully!');
        navigate.push(user.redirect);
      } else {
        setLoading(false);
        setError('Invalid email or password.');
      }
    }, 1000);
  }

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Card className="w-full max-w-lg shadow-none border-0">
        <CardHeader className="space-y-4">
          <div className="relative w-40 aspect-[8/3] mx-auto">
            <Image
              src="/images/logo.png"
              alt="logo"
              fill
              className="object-contain"
            />
          </div>
          <CardTitle className="text-center text-xl">
            Login to your Account
          </CardTitle>
        </CardHeader>
        <CardContent className="max-w-[450px] mx-auto pb-10">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="username@email.xyz"
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <InputPassword
                        {...field}
                        placeholder="Enter password"
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <CardFooter className="p-0 block space-y-2">
                <FormError message={error} />
                <Button className="w-full rounded-full gap-2" disabled={loading}>
                  {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                  Login
                </Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

export default LoginPage;
