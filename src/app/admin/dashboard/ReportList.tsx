// app/admin/dashboard/ReportList.tsx
import { ReportCard } from "./ReportCard";
import { prisma } from "../../../../prisma/client";

export default async function ReportList() {
  const reports = await prisma.report.findMany({
    include: {
      submitter: true,
      resolver: true,
    },
    orderBy: {
      created_at: "desc",
    },
  });
  
  const safeReports = serializeBigInts(reports) as SerializedReport[];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {safeReports.map((safeReport) => (
        <ReportCard key={safeReport.id} report={safeReport} />
      ))}
    </div>
  );
}


function serializeBigInts(value: any): any {
    if (typeof value === "bigint") {
      return value.toString();
    }
  
    if (Array.isArray(value)) {
      return value.map(serializeBigInts);
    }
  
    if (value !== null && typeof value === "object") {
      return Object.fromEntries(
        Object.entries(value).map(([key, val]) => [key, serializeBigInts(val)])
      );
    }
  
    return value;
  }
  
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
    submitter: {
      id: string;
      name?: string | null;
    } | null;
    resolver: {
      id: string;
      name?: string | null;
    } | null;
  };
  