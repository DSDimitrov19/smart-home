import { prisma } from "@/db";
import { NextResponse } from "next/server";

interface User {
    email: string
    firstName: string
    lastName: string
    password: string
    createdAt: Date
    updatedAt: Date
}

export async function GET() {
    return NextResponse.json(await prisma.user.findMany());
}

export async function POST(request: Request) {
    const data: User = await request.json();
    var user: User;

    try {
        user = await prisma.user.create({ data: { email: data.email, firstName: data.firstName, lastName: data.lastName, password: data.password } })
    } catch (error) {
        return NextResponse.json({error: 'User already exists!'}, {status: 500})
    }

    return NextResponse.json(user);
}