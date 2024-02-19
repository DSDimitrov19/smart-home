"use client"

import Button from "@/components/button";
import Navbar from "@/components/navbar";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";

interface Notification {
    id: string
    receiverId: string
    title: string
    description: string
    status: string
    createdAt: Date
}

function formatDate(string: Date) {
    return new Date(string).toLocaleDateString("en-EN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
}

export default function Home() {
    const { data: session, status } = useSession({
        required: true,
        onUnauthenticated() {
          redirect("/login");
        },
    });
    const [notifications, setNotifications] = useState([]);

    const fetchNotifications = async () => {
      try {
        const response = await fetch(`/api/notification?receiverId=${session?.user.id}&count=false`);
        const newData = await response.json();
        setNotifications(newData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    useEffect(() => {
      fetchNotifications();
  
      const interval = setInterval(fetchNotifications, 1000);
  
      return () => clearInterval(interval);
    }, [status])

    const handleSubmit = async (notification: Notification) => {
        const res = await fetch("/api/notification", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: notification.id,
              status: "seen"
            }),
        });

        if (res.ok) {
            fetchNotifications();
            toast.success('Notification updated successfully!', { position: "bottom-left" })
        }
    };

    if (status === "loading") {
        return <></>
    }

    return <>
        <Navbar userId={session?.user.id}/>

        <div className="space-y-4 mx-auto w-1/2 p-4">
            {notifications.map((notification: Notification, index: number) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index / 5, duration: 0.5 }}
                    className={`${notification.status == "sent" ? "bg-zinc-900" : "bg-zinc-800"} border border-zinc-700 rounded-lg shadow-md p-4 mb-4 flex justify-between`}
                >
                    <div>
                        <h3 className="text-lg font-semibold text-zinc-100">{notification.title}</h3>
                        <p className="text-sm text-zinc-300 mb-2">{notification.description}</p>
                        <span className="text-xs text-zinc-400">{formatDate(notification.createdAt)}</span>
                    </div>
                    <div>
                        {notification.status == "sent" && (
                            <Button size={"md"} variant={"outline"} onClick={() => handleSubmit(notification)}>Mark as read</Button>
                        )}
                    </div>
                </motion.div>
            ))}
        </div>
    </>
}