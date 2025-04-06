import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma/client"; 


const AdminLoginSchema = z.object({
    id: z.coerce.bigint(),
    email: z.string().min(1),
})
