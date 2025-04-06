// app/api/admin/dashboard/route.ts

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/client";
import { z } from "zod";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";

const resolveSchema = z.object({
  reportId: z.coerce.bigint(),
});

export async function PATCH(req: NextRequest) {
  try {
    const cookie = (await cookies()).get("session")?.value;
    const session = await decrypt(cookie) as { userId: string };

    if (!session?.userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const validation = resolveSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(validation.error.flatten().fieldErrors, { status: 400 });
    }

    const { reportId } = validation.data;

    const updatedReport = await prisma.report.update({
        where: { id: reportId },
        data: {
          resolved_by: BigInt(session.userId),
          resolved_at: new Date(),
        },
        include: {
          submitter: true,
          resolver: true,
        },
      });
      

    return NextResponse.json(serializeBigInts(updatedReport), { status: 200 });

  } catch (err) {
    console.error("Resolve API error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
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
  