import { NextRequest, NextResponse } from "next/server";
import { z } from 'zod';
import { prisma } from '../../../../prisma/client';
import { ReportType } from '@prisma/client'

const createReportSchema = z.object({
    type: z.nativeEnum(ReportType),
    target_id: z.bigint(),
    reason: z.string().min(1, {message: "You need to provide a reason."}),
    description: z.string(),
    submitted_by: z.bigint()
})

export async function POST(request: NextRequest) {
    const body = await request.json();
    const validation = createReportSchema.safeParse(body);
    if (!validation.success)
        return NextResponse.json(validation.error.errors, { status: 400 })

    const newReport = await prisma.report.create({
        data: { 
            type: body.type, 
            target_id: body.target_id, 
            reason: body.reason,
            description: body.description,
            submitted_by: body.submitted_by
        }})

    return NextResponse.json(newReport, { status: 201 })

}

