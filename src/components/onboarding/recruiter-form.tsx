"use client";

import { recruiterFormSchema } from "@/lib/validation";
import { useForm } from "react-hook-form";
import { z } from "zod/v4";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
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
import { UploadDropzone } from "@/utils/uploadthingReexporting";
import { createRecruiterProfile } from "@/app/actions/onboarding/actions";
import { toast } from "sonner";
import Image from "next/image";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import { Loader2Icon } from "lucide-react";

const RecruiterForm = () => {
  const [pending, setPending] = useState(false);

  const form = useForm<z.infer<typeof recruiterFormSchema>>({
    resolver: zodResolver(recruiterFormSchema),
    defaultValues: {
      companyName: "",
      location: "",
      about: "",
      logo: "",
      websiteURL: undefined,
      linkedInProfile: undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof recruiterFormSchema>) {
    try {
      setPending(true);
      await createRecruiterProfile(values);
      toast("Profile created");
    } catch (error) {
      if (error instanceof Error && error.message !== "NEXT_REDIRECT") {
        console.log(error);
        throw new Error("Something went wrong");
      }
    } finally {
      setPending(false);
    }
  }

  return (
    <Card className="mx-auto mt-10 w-full max-w-xl">
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
                    <Textarea
                      placeholder="e.g. a fintech startup"
                      {...field}
                      className="h-24"
                    />
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
                    <div>
                      {field.value ? (
                        <div className="relative h-24 w-24">
                          <Image
                            src={field.value}
                            alt="company logo"
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <UploadDropzone
                          endpoint="imageUploader"
                          onClientUploadComplete={(res) => {
                            console.log("Files: ", res);
                            field.onChange(res[0].ufsUrl);
                          }}
                          onUploadError={(error: Error) => {
                            alert(`ERROR! ${error.message}`);
                          }}
                          className="ut-button:bg-primary ut-button:w-32 ut-button:hover:cursor-pointer ut-button:p-4 p-4"
                        />
                      )}
                    </div>
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
            <Button
              className="mt-4 flex w-full items-center justify-center rounded-lg p-5"
              disabled={pending}
            >
              {pending ? (
                <Loader2Icon className="animate-spin" />
              ) : (
                "Save & Continue"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default RecruiterForm;
