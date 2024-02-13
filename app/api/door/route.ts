import { prisma } from "@/db";
import { NextResponse } from "next/server";

interface Door {
    name: string
}

export async function GET() {
    // await prisma.user.create({ data: { email: "dimi1004@gmail.com", password: "password123" } })
    return NextResponse.json(await prisma.door.findMany());
}

export async function POST(request: Request) {
    const data: Door = await request.json();

    await prisma.door.create({ data: { name: data.name } })

    return NextResponse.json(await prisma.door.findMany());
}