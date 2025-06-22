"use client";

import { recruiterFormSchema } from "@/lib/validation";
import { useForm } from "react-hook-form";
import { z } from "zod/v4";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { countries } from "@/utils/countriesData";

const RecruiterForm = () => {
  const form = useForm<z.infer<typeof recruiterFormSchema>>({
    resolver: zodResolver(recruiterFormSchema),
    defaultValues: {
      companyName: "",
      location: "",
      about: "",
      logo: "",
      websiteURL: "",
      linkedInProfile: "",
    },
  });

  function onSubmit(values: z.infer<typeof recruiterFormSchema>) {
    console.log(values);
  }

  return (
    <Card className="mx-auto mt-16 w-full max-w-xl">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl">Create your profile</CardTitle>
        <CardDescription>
          Recruit thousands of candidates for your startup or company.
        </CardDescription>
      </CardHeader>
      <CardContent className="mt-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">
                    What is your company name?
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. omegaCorp" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">
                    Where is your company based?
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="select a country" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {countries.map((item) => (
                        <SelectItem key={item.name} value={item.name}>
                          {item.name}
                        </SelectItem>
                      ))}
                      m@support.com
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="about"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">
                    Describe your company
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="a fintech startup" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="logo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">
                    Upload your company logo
                  </FormLabel>
                  <FormControl>
                    <Input type="file" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center gap-8">
              <FormField
                control={form.control}
                name="linkedInProfile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold">
                      LinkedIn profile
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="https://linkedin.com/" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="websiteURL"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold">
                      Website URL
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="https://mywebsite.com/" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default RecruiterForm;
