"use client";

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

import { createJobFormSchema } from "@/lib/validation";
import { countries } from "@/utils/countriesData";
import SalaryRange from "./salary-range";
import JobDescriptionEditor from "./job-description-editor";
import BenefitsSelector from "./benefits-selector";
import JobListingDuration from "./job-listing-duration";
import { Button } from "../ui/button";
import { useState } from "react";
import { createJobPosting } from "@/app/actions/job/actions";
import { toast } from "sonner";
import { Loader2Icon } from "lucide-react";
import { RecruiterProfile } from "@/app/generated/prisma";

interface CreateJobFormProps {
  selectedRecruiterProfile: RecruiterProfile | null;
}

const CreateJobForm = ({ selectedRecruiterProfile }: CreateJobFormProps) => {
  const [pending, setPending] = useState(false);

  const form = useForm<z.infer<typeof createJobFormSchema>>({
    resolver: zodResolver(createJobFormSchema),
    defaultValues: {
      jobTitle: "",
      location: "",
      jobDescription: "",
      employmentType: "",
      experience: "",
      listingDuration: 30,
      minSalary: 50000,
      maxSalary: 200000,
      benefits: [],
    },
  });

  async function onSubmit(values: z.infer<typeof createJobFormSchema>) {
    if (!selectedRecruiterProfile) {
      return toast.error("You haven't selected a company");
    }

    try {
      setPending(true);
      await createJobPosting({
        data: values,
        selectedRecruiterProfile: selectedRecruiterProfile.id,
      });
      toast.success("Job posting created");
    } catch (error) {
      if (error instanceof Error && error.message !== "NEXT_REDIRECT") {
        console.log(error);
        toast.error("Something went wrong");
      }
    } finally {
      setPending(false);
    }
  }

  return (
    <Card className="mx-auto my-10 w-full">
      <CardHeader>
        <CardTitle className="text-3xl">Job details</CardTitle>
        <CardDescription>
          Recruit thousands of candidates for your startup or company.
        </CardDescription>
      </CardHeader>
      <CardContent className="mt-4">
        <Form {...form}>
          <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="jobTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">
                    Job Title
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. senior product designer"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col gap-8 lg:flex-row lg:gap-16">
              <FormField
                control={form.control}
                name="employmentType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold">
                      Employment type
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-[12rem]">
                          <SelectValue placeholder="select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="fulltime">Fulltime</SelectItem>

                        <SelectItem value="parttime">Parttime</SelectItem>
                        <SelectItem value="internship">Internship</SelectItem>
                      </SelectContent>
                    </Select>
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
                      Location
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
            </div>
            <div className="flex flex-col gap-8 lg:flex-row lg:gap-16">
              <FormField
                control={form.control}
                name="experience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold">
                      Experience required
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-[12rem]">
                          <SelectValue placeholder="select experience" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="<1 year">{"<1 Year"}</SelectItem>
                        <SelectItem value="1 year+">{"1 Year+"}</SelectItem>
                        <SelectItem value="2 years+">{"2 Years+"}</SelectItem>
                        <SelectItem value="3 years+">{"3 Years+"}</SelectItem>
                        <SelectItem value="5 years+">{"5 Years+"}</SelectItem>
                        <SelectItem value="7 years+">{"7 Years+"}</SelectItem>
                        <SelectItem value="10 years+">{"10 Years+"}</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <SalaryRange
                minSalary={10000}
                maxSalary={500000}
                control={form.control}
              />
            </div>

            <FormField
              control={form.control}
              name="jobDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">
                    Job Description
                  </FormLabel>
                  <FormControl>
                    <JobDescriptionEditor field={field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="benefits"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">
                    Select benefits
                  </FormLabel>
                  <FormControl>
                    <BenefitsSelector field={field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="listingDuration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">
                    Select Job Lisitng Duration
                  </FormLabel>
                  <FormControl>
                    <JobListingDuration field={field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="mt-6 w-full rounded-xl py-5" disabled={pending}>
              {" "}
              {pending ? <Loader2Icon className="animate-spin" /> : "Post Job"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CreateJobForm;
