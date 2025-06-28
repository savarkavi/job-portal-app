"use client";

import { jobSeekerFormSchema } from "@/lib/validation";
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
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { countries } from "@/utils/countriesData";
import { UploadDropzone } from "@/utils/uploadthingReexporting";
import { createJobSeekerProfile } from "@/app/actions/onboarding/actions";
import { toast } from "sonner";
import Image from "next/image";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import { Loader2Icon } from "lucide-react";
import { jobRoles } from "@/utils/jobRolesData";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

const JobSekkerForm = () => {
  const [pending, setPending] = useState(false);

  const form = useForm<z.infer<typeof jobSeekerFormSchema>>({
    resolver: zodResolver(jobSeekerFormSchema),
    defaultValues: {
      location: "",
      about: "",
      avatar: "",
      role: "",
      experience: 0,
      isStudent: false,
      websiteURL: undefined,
      linkedInProfile: undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof jobSeekerFormSchema>) {
    try {
      setPending(true);
      await createJobSeekerProfile(values);
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
          Apply to thousands of companies & startups with one profile.
        </CardDescription>
      </CardHeader>
      <CardContent className="mt-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">
                    Where are you based?
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
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">
                    What best describes your current role?
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="select a role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {jobRoles.map((item) => (
                        <SelectGroup key={item.category}>
                          <SelectLabel className="text-lg font-bold">
                            {item.category}
                          </SelectLabel>
                          {item.roles.map((role) => (
                            <SelectItem key={role} value={role}>
                              {role}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="experience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">
                    How many years of experience do you have?
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      value={field.value}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      placeholder="e.g. 3"
                      min={0}
                      className="w-[100px]"
                    />
                  </FormControl>
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
                    Write a bio about yourself
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g. a 3rd year student looking to exapand my skills"
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
              name="isStudent"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Are you a student?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={(value) =>
                        field.onChange(value === "yes" ? true : false)
                      }
                      defaultValue={"no"}
                      className="flex"
                    >
                      <FormItem className="flex items-center gap-3">
                        <FormControl>
                          <RadioGroupItem value="yes" />
                        </FormControl>
                        <FormLabel className="font-normal">Yes</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center gap-3">
                        <FormControl>
                          <RadioGroupItem value="no" />
                        </FormControl>
                        <FormLabel className="font-normal">No</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="avatar"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">
                    Upload your profile avatar
                  </FormLabel>
                  <FormControl>
                    <div>
                      {field.value ? (
                        <div className="relative h-24 w-24">
                          <Image
                            src={field.value}
                            alt="user avatar"
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

export default JobSekkerForm;
