import { logout } from "../actions";
import ReportList from "./ReportList";
import { prisma } from "../../../../prisma/client";
import { serializeBigInts } from "../../../lib/utils";
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

