import { Button } from "@/components/ui/button";
import { logout } from "../actions";
import ReportList from "./ReportList";
import { prisma } from "../../../../prisma/client";
import type { SerializedReport } from "./types";

export default async function Dashboard() {
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
    <div className="p-6 space-y-6">
      <ReportList reports={safeReports} />
    </div>
  );
}


function serializeBigInts(value: any): any {
  if (typeof value === "bigint") return value.toString();
  if (value instanceof Date) return value.toISOString();
  if (Array.isArray(value)) return value.map(serializeBigInts);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, val]) => [key, serializeBigInts(val)])
    );
  }
  return value;
}
