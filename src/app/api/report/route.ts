export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma/client"; 
import { z } from "zod";
import { ReportType } from "@prisma/client";

const createReportSchema = z.object({
  type: z.nativeEnum(ReportType),
  target_id: z.coerce.bigint(),
  reason: z.string().min(1),
  description: z.string(),
  submitted_by: z.coerce.bigint(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validation = createReportSchema.safeParse(body);
    if (!validation.success) {
      console.error("Validation failed:", validation.error.errors);
      return NextResponse.json(validation.error.errors, { status: 400 });
    }

    const data = validation.data;

    const report = await prisma.report.create({
      data: {
        type: data.type,
        target_id: data.target_id,
        reason: data.reason,
        description: data.description,
        submitted_by: data.submitted_by,
      },
    });

    return NextResponse.json({
        ...report,
        target_id: report.target_id.toString(),
        submitted_by: report.submitted_by?.toString(),
        resolved_by: report.resolved_by?.toString(),
        id: report.id.toString(),
      }, { status: 201 });

    } catch (error : any) {
      if (error.code === "P2003") {
        return NextResponse.json({ error: "Submitted user does not exist. Please resubmit using a valid ID."}, { status: 400 });
      }

    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ message: "GET is still alive" });
}
