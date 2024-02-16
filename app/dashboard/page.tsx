"use client";

import Card from "@/components/card";
import { signIn, signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/login");
    },
  });
  const [ devices, setDevices ] = useState([]);

  const fetchDevices = async () => {
    try {
      const response = await fetch('/api/door');
      const newData = await response.json();
      setDevices(newData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchDevices();

    const interval = setInterval(fetchDevices, 1000);

    return () => clearInterval(interval);
  }, [])

  if (status === "loading") {
    return <></>
  }

  return (
    <>
      <h1 className="text-center text-3xl font-bold my-4">{session.user?.email?.slice(0, 8)}'s Home</h1>
      <div className="flex justify-center items-center flex-row flex-wrap gap-4 p-4">
        {devices.map((device, index) => {
          return <Card key={index} device={device} fetchDevices={fetchDevices}/>
        })}
      </div>
    </>
  )
}
