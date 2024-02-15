import { prisma } from "@/db";
import { NextResponse } from "next/server";

interface Door {
    id: string
    name: string
    status: string
}

export async function GET() {
    // await prisma.user.create({ data: { email: "dimi1004@gmail.com", password: "password123" } })
    return NextResponse.json(await prisma.door.findMany({
        orderBy: {
            id: "asc"
        }
    }));
}

export async function POST(request: Request) {
    const data: Door = await request.json();

    await prisma.door.create({ data: { name: data.name, status: data.status } })

    return NextResponse.json(await prisma.door.findMany());
}

export async function PUT(request: Request) {
    const data: Door = await request.json();

    await prisma.door.update({
        where: {
            id: data.id,
        },
        data: {
            status: data.status,
            name: data.name
        },
    })

    return NextResponse.json(await prisma.door.findMany());
}