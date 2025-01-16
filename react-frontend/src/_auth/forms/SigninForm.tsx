import React from 'react'
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
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(2, "Password must be at least 2 characters"),
});



function SigninForm() {
  const navigate = useNavigate();
  const isLoading = false;
  const wrong = false;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })
 

  const onSubmit = async(values: z.infer<typeof formSchema>) => {
    try {
      console.log("Submitted User:", values);

      // Construct the URL with query parameters
      const queryParams = new URLSearchParams({
        email: values.email,
        password: values.password,
      });
  
      const url = `http://localhost:3000/login?${queryParams.toString()}`;
  
      // Send the GET request to the backend API
      const response = await fetch(url, {
        method: "POST", // Use GET when sending data as query params
        headers: { "Content-Type": "application/json" },
        credentials: "include"
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response:", errorData);
        throw new Error(errorData.message || "Failed to log in");
      }

      console.log("User successfully loged in!");
      alert("Log in successfull!");

      // Redirect to a different page (e.g., login page)
      navigate("/");
    } catch (error) {
      console.error("Error submitting user:", error);
      alert("Failed to log in. Please try again.");
      form.reset({
        email: "",
        password: "",
      });
    }
  }

  return (
    <div>
          <Form {...form}>

      <div className="sm:w-420 flex-center flex-col"></div>
      <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">Log into your account</h2>
      <p className="text-light-3 small-medium md:base-regular mt-2">To use app enter your account details</p>
      {wrong ? (
            <div className="flex-center text-light-3 small-medium md:base-regular mt-2">Try again!</div>
          ) : null}
      

      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">

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
          ) : "Log in"}
        </Button>

        <p className="text-small-regular text-light-2 text-center mt-2">Do not have an account? <Link to="/sign-up" className="text-primary-500 text-small-semibold ml-1">Sign up</Link></p>

      </form>
      <div/>
    </Form>
    </div>
  )
}

export default SigninForm
