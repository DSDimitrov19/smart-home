import { prisma } from "@/db";
import { NextResponse } from "next/server";

interface User {
    email: string
    password: string
}

export async function GET() {
    return NextResponse.json(await prisma.user.findMany());
}

export async function POST(request: Request) {
    const data: User = await request.json();

    await prisma.user.create({ data: { email: data.email, password: data.password } })

    return NextResponse.json(await prisma.user.findMany());
}