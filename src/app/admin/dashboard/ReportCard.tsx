// ReportCard.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { report, user } from "@prisma/client";

type SerializedUser = {
    id: string;
    name?: string | null;
  };
  
  type SerializedReport = {
    id: string;
    type: string;
    reason: string;
    target_id: string;
    submitted_by: string | null;
    description?: string | null;
    created_at: string;
    resolved_by?: string | null;
    resolved_at?: string | null;
    submitter: SerializedUser | null;
    resolver: SerializedUser | null;
  };


export function ReportCard({ report }: { report: SerializedReport }) {
    const [isResolved, setIsResolved] = useState(Boolean(report.resolver));

    const handleResolve = async () => {
        const response = await fetch("/api/admin/dashboard", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            reportId: report.id,
          }),
        });
      
        if (response.ok) {
          setIsResolved(true);
        } else {
          console.error("Failed to resolve report");
        }
      };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Report #{report.id.toString()}</CardTitle>
        <div className="flex gap-2 mt-2">
          <Badge variant="secondary">{report.type}</Badge>
          <Badge>{report.reason}</Badge>
        </div>
        <CardDescription className="mt-2 text-black-500">Target ID: {report.target_id.toString()}</CardDescription>
      </CardHeader>
      <CardContent>
        <CardDescription><strong>Description:</strong> {report.description || ""}</CardDescription>
        <CardDescription><strong>Submitted by:</strong> [User {report.submitted_by}] {report.submitter?.name || "Unknown"}</CardDescription>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        {isResolved && (
          <p className="text-sm text-gray-500">
            Resolved by [Admin {report.resolver?.id }] {report.resolver?.name || "Unknown"}
          </p>
        )}
        {!isResolved && (
          <Button variant="outline" onClick={handleResolve}>
            Mark as Resolved
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
