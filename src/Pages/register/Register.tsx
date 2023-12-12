import { useState } from "react"
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerFormSchema, TRegisterFormSchema } from "@/schemas/registerFormSchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Facebook } from "lucide-react"
import GoogleIcon from "@/assets/google-icon.png"
import { Link, useNavigate } from "react-router-dom";

interface StatusMessage {
  type: 'error' | 'success'
  message: string
}

const Register = () => {
  const [statusMessage, setStatusMessage] = useState<StatusMessage | null>(null)

  const navigate = useNavigate()

  const form = useForm<TRegisterFormSchema>({
    resolver: zodResolver(registerFormSchema),
  });

  async function onSubmit(data: TRegisterFormSchema) {
    setStatusMessage(null)
    
    const { email, password, confirmPassword } = data

    try {
      const response = await fetch(`${import.meta.env.VITE_AUTH_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password, confirmPassword }),
      })

      const data = await response.json()

      setStatusMessage({ type: 'success', message: data.msg })

      navigate('/login')
    } catch (error) { 
      const message = error instanceof Error ? error.message : String(error)

      setStatusMessage({ type: 'error', message })
    }
  }

  return (
    <section className="flex flex-1 justify-center items-center">
      <Card className="py-6 bg-white rounded-md w-1/2 shadow-lg border border-primaryBlue">
        <CardContent className="flex flex-col items-center gap-6">
          <h1 className="text-2xl">Registrar funcionário</h1>

          <div className="space-x-6">
            <Button variant={"facebook"}>
              <Facebook size={25} />
              <p>Facebook</p>
            </Button>
            <Button variant={"google"}>
              <img src={GoogleIcon} alt="google icon" width={25} />
              <p>Google</p>
            </Button>
          </div>

          {statusMessage?.message && <p data-type={statusMessage.type} className="text-center py-4 px-2 my-4 w-full opacity-95 text-white data-[type='error']:bg-red-500 data-[type='success']:bg-green-500">{statusMessage.message}</p>}

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-6 w-3/4"
              role="employeeForm"
            >
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email:</FormLabel>
                      <FormControl>
                        <Input autoFocus type="email" {...field} />
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
                      <FormLabel>Senha:</FormLabel>
                      <FormControl>
                        <Input type="password" autoComplete="off" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirmar Senha:</FormLabel>
                      <FormControl>
                        <Input type="password" autoComplete="off" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" variant={"filter"} className="w-full">
                Criar conta
              </Button>
            </form>
          </Form>

          <p className="text-muted-foreground">
            Já possui uma conta? <Link to="/login" className="underline text-primaryBlue">Login</Link>
          </p>
        </CardContent>
      </Card>
    </section>
  );
};

export default Register;
