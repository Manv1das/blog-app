import * as z from "zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";

import {Button} from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SignupValidation } from "@/lib/validation";

const formSchema = z.object({
  firstname: z.string().min(2, "Firstname must be at least 2 characters").max(50, "Firstname must be 50 characters or less"),
  lastname: z.string().min(2, "Lastname must be at least 2 characters").max(50, "Lastname must be 50 characters or less"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const SignupForm = () => {

  const navigate = useNavigate();
  const isLoading = false;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    },
  })
 

  const onSubmit = async(values: z.infer<typeof formSchema>) => {
    try {
      console.log("Submitted User:", values);

      // Send the User object to the backend API
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response:", errorData);
        throw new Error(errorData.message || "Failed to create user");
      }

      console.log("User successfully registered!");
      alert("Registration successful!");

      // Redirect to a different page (e.g., login page)
      navigate("/sign-in");
    } catch (error) {
      console.error("Error submitting user:", error);
      alert("Failed to create user. Please try again.");
    }
  }

  return (
    <div>
          <Form {...form}>

      <div className="sm:w-420 flex-center flex-col"></div>
      <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">Create a new account</h2>
      <p className="text-light-3 small-medium md:base-regular mt-2">To use app enter your account details</p>
      

      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
        
        <FormField
          control={form.control}
          name="firstname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Firstname</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lastname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lastname</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
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
                <Input type="password" className="shad-input" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />


        <Button type="submit" className="shad-button_primary">
          {isLoading ? (
            <div className="flex-center gap-2">Loading...</div>
          ) : "Sign up"}
        </Button>

        <p className="text-small-regular text-light-2 text-center mt-2">Already have an account? <Link to="/sign-in" className="text-primary-500 text-small-semibold ml-1">Log in</Link></p>

      </form>
      <div/>
    </Form>
    </div>
  )
}

export default SignupForm
