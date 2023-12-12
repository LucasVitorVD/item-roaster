import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginFormSchema, TLoginFormSchema } from "@/schemas/loginFormSchema";
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
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const form = useForm<TLoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
  });

  const navigate = useNavigate()

  async function onSubmit(data: TLoginFormSchema) {
    const { email, password } = data

    try {
      const response = await fetch(`${import.meta.env.VITE_AUTH_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      console.log(data)

      localStorage.setItem('token', data.token)

      navigate("/")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <section className="flex flex-1 justify-center items-center">
      <Card className="py-6 bg-white rounded-md w-1/2 shadow-lg border border-primaryBlue">
        <CardContent className="flex flex-col items-center gap-6">
          <h1 className="text-2xl">Login</h1>

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
              </div>

              <Button type="submit" variant={"filter"} className="w-full">
                Login
              </Button>
            </form>
          </Form>

          <p className="text-muted-foreground">
            Não possui uma conta? <Link to="/register" className="underline text-primaryBlue">Registre-se</Link>
          </p>
        </CardContent>
      </Card>
    </section>
  );
};

export default Login;
