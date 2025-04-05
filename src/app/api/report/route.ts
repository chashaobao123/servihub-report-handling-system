// import { NextRequest, NextResponse } from "next/server";
// import { z } from 'zod';
// import { prisma } from '../../../../prisma/client';
// import { ReportType } from '@prisma/client'

// const createReportSchema = z.object({
//     type: z.nativeEnum(ReportType),
//     target_id: z.coerce.bigint(),
//     reason: z.string().min(1, {message: "You need to provide a reason."}),
//     custom_reason: z.string().optional(),
//     description: z.string(),
//     submitted_by: z.coerce.bigint()
// })


// export const runtime = "nodejs"; // 👈 force Node.js runtime

// export async function POST(request: NextRequest) {
//     try {
//       const newReport = await prisma.report.create({
//         data: {
//           type: "review",
//           target_id: BigInt(123),
//           reason: "test reason",
//           description: "this is a test",
//           submitted_by: BigInt(1),
//         },
//       });
  
//       return NextResponse.json({ success: true, newReport });
//     } catch (error) {
//       console.error("🔥 Prisma insert failed:", error);
//       return NextResponse.json({ error: "Database error" }, { status: 500 });
//     }
//   }


// // export async function POST(request: NextRequest) {
// //     try {
// //       const body = await request.json();
// //       console.log("Incoming report:", body);
  
// //       const validation = createReportSchema.safeParse(body);
// //       if (!validation.success) {
// //         console.error("Validation failed:", validation.error.errors);
// //         return NextResponse.json(validation.error.errors, { status: 400 });
// //       }
  
// //       const data = validation.data;
  
// //       const newReport = await prisma.report.create({
// //         data: {
// //           type: data.type,
// //           target_id: data.target_id,
// //           reason: data.reason,
// //           description: data.description,
// //           submitted_by: data.submitted_by,
// //         },
// //       });
  
// //       return NextResponse.json(newReport, { status: 201 });
  
// //     } catch (error) {
// //       console.error("🚨 Server error in /api/report:", error);
// //       return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
// //     }
// //   }


  
// // export async function POST(request: NextRequest) {
// //     const body = await request.json();
// //     const validation = createReportSchema.safeParse(body);
// //     console.log("Received payload:", body);

// //     if (!validation.success)
// //         return NextResponse.json(validation.error.errors, { status: 400 })

// //     const newReport = await prisma.report.create({
// //         data: { 
// //             type: body.type, 
// //             target_id: body.target_id, 
// //             reason: body.reason,
// //             description: body.description,
// //             submitted_by: body.submitted_by
// //         }})

// //     return NextResponse.json(newReport, { status: 201 })

// // }// ✅ src/app/api/report/route.ts
export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma/client"; // or update to match your project path
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

    } catch (error) {
    console.error("Prisma error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ message: "GET is still alive" });
}
