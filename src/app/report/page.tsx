"use client";

import React, { useState } from 'react'
import axios from 'axios';
import { Button } from "@/components/ui/button"
import { useForm } from 'react-hook-form'
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { ReportType } from '@prisma/client';
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select"
import { Textarea } from '@/components/ui/textarea';
  

const createReportSchema = z.object({
    type: z.nativeEnum(ReportType),
    target_id: z.coerce.bigint(),
    reason: z.string().min(1, {message: "You need to provide a reason."}),
    custom_reason: z.string().optional(),
    description: z.string(),
    submitted_by: z.coerce.bigint()
})

const ReportPage = () => {
    const [selectedReason, setSelectedReason] = useState("")

    const ReportTypes = [{ value: "review", label: "Review" }, 
        { value: "user", label: "User" }, { value: "business", label: "Business" }, 
        { value: "service", label: "Service" }, { value: "other", label: "Other" }]
    const ReportReasons = [{ value: "spam", label: "Spam" },
        { value: "harrassment", label: "Harrassment" }, { value: "misleading", label:"Misleading"},
        { value: "inappropriate", label:"Inappropriate"}, { value:"others", label:"Others" }]

    const router = useRouter();
    const form = useForm<z.infer<typeof createReportSchema>>({
        resolver: zodResolver(createReportSchema),
        defaultValues: {
          reason: "",
          type: "review",
          description: "",
        },})

    const onSubmit = async (data: z.infer<typeof createReportSchema>) => {
        const finalReason = selectedReason === "others" && data.custom_reason
            ? data.custom_reason
            : data.reason

        try {
            console.log(data)
            await axios.post('/api/report', {
              ...data,
              reason: finalReason,
              target_id: data.target_id.toString(),
              submitted_by: data.submitted_by.toString(),
            });
            router.push('/report/report-submitted');
          } catch (error: any) {
            console.error("Submit error:", error.response?.data || error.message);
            alert("Submission failed. Check console for details.");
          }
          
        }


  return (
    <div className="min-h-screen flex items-center justify-center px-4">
    <div className="w-full max-w-xl bg-white p-6 rounded-xl shadow-md">
    <h1 className="text-2xl font-semibold mb-6 text-center">Submit a Report</h1>

    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem> 
            <FormLabel>Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a type of report" />
                    </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                    {ReportTypes.map(type => <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>)}
                    </SelectContent>
                </Select>
            </FormItem>
          )}/>

        <FormField
        control={form.control}
        name="target_id"
        render={({ field }) => (
            <FormItem>
            <FormLabel>Target ID</FormLabel>
            <FormControl>
            <Input
                type="number"
                value={field.value?.toString() ?? ""}
                onChange={(e) => field.onChange(BigInt(e.target.value))}
                placeholder='Please input the target ID...'
                />
            </FormControl>
            </FormItem>
        )}/>

        <FormField
        control={form.control}
        name="reason"
        render={({ field }) => (
            <FormItem>
            <FormLabel>Reason</FormLabel>
            <FormControl>
            <Select onValueChange={(value) => {
                field.onChange(value)
                setSelectedReason(value)    }}
                defaultValue={field.value}>

                    <FormControl>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a type of reason" />
                    </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                    {ReportReasons.map(reason => <SelectItem key={reason.value} value={reason.value}>{reason.label}</SelectItem>)}
                    </SelectContent>
                </Select>
            </FormControl>

                {selectedReason === "others" && (
                <FormField
                control={form.control}
                name="custom_reason"
                render={({ field }) => (
                    <FormItem>
                    <FormControl>
                        <Input placeholder="Please specify your reason..." {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}/>)}
            </FormItem>)}/>


        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit more..."
                  className="resize-none"
                  value={field.value ?? ""}
                  onChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
        control={form.control}
        name="submitted_by"
        render={({ field }) => (
            <FormItem>
            <FormLabel>Submitted By</FormLabel>
            <FormControl>
                <Input
                type="number"
                value={field.value?.toString() ?? ""}
                onChange={(e) => field.onChange(BigInt(e.target.value))}
                placeholder='Please input your user ID...'
                />
            </FormControl>
            </FormItem>
        )}/>

        <Button type="submit">Submit Report</Button>
      </form>
    </Form>
    </div>
    </div>
  )
  
}

export default ReportPage
