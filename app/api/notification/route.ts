import { prisma } from "@/db";
import { NextRequest, NextResponse } from "next/server";

interface Notification {
    id: string
    receiverId: string
    title: string
    description: string
    status: string
    createdAt: Date
}

export async function GET(request: NextRequest) {
    var receiverId = request.nextUrl.searchParams.get("receiverId");
    var count = request.nextUrl.searchParams.get("count");

    if (receiverId == null) {
        receiverId = "";
    }

    if (count == null) {
        count = "false";
    }

    if (count == "true") {
        const notifications = await prisma.notification.findMany({
            where: { 
                receiverId: receiverId,
                status: "sent"
            },
            orderBy: {
                createdAt: "desc"
            }
        })

        return NextResponse.json(notifications.length);
    }

    const notifications = await prisma.notification.findMany({
        where: { receiverId: receiverId },
        orderBy: {
            createdAt: "desc"
        }
    })

    return NextResponse.json(notifications);
}

export async function POST(request: Request) {
    const data: Notification = await request.json();
    var notification: Notification;

    try {
        notification = await prisma.notification.create({ data: { receiverId: data.receiverId, title: data.title, description: data.description, status: data.status } })
    } catch (error) {
        return NextResponse.json({error: error}, {status: 500})
    }

    return NextResponse.json(notification);
}

export async function PUT(request: Request) {
    const data: Notification = await request.json();

    const notification = await prisma.notification.update({
        where: {
            id: data.id
        },
        data: {
            status: data.status
        }
    })

    return NextResponse.json(notification);
}