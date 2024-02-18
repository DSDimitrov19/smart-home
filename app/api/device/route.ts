import { prisma } from "@/db";
import { NextRequest, NextResponse } from "next/server";

interface Device {
    id: string
    ownerId: string
    name: string
    status: string
    createdAt: Date
    updatedAt: Date
}

export async function GET(request: NextRequest) {
    var ownerId = request.nextUrl.searchParams.get("ownerId");

    if (ownerId == null) {
        ownerId = "";
    }

    const devices = await prisma.device.findMany({
        where: { ownerId: ownerId },
        orderBy: {
            createdAt: "asc"
        }
    })

    return NextResponse.json(devices);
}

export async function POST(request: Request) {
    const data: Device = await request.json();
    var device: Device;

    try {
        device = await prisma.device.create({ data: { name: data.name, ownerId: data.ownerId, status: data.status } })
    } catch (error) {
        return NextResponse.json({error: error}, {status: 500})
    }

    return NextResponse.json(device);
}

export async function PUT(request: Request) {
    const data: Device = await request.json();

    const device = await prisma.device.update({
        where: {
            id: data.id,
        },
        data: {
            status: data.status,
            name: data.name
        },
    })

    return NextResponse.json(device);
}