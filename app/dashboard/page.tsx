/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Card from "@/components/card";
import Navbar from "@/components/navbar";
import { useSession } from "next-auth/react";
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
      const response = await fetch(`/api/device?ownerId=${session?.user?.id}`);
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
  }, [status])

  if (status === "loading") {
    return <></>
  }

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center flex-row flex-wrap gap-4 py-10 px-4">
        {devices.map((device, index) => {
          return <Card key={index} device={device} fetchDevices={fetchDevices}/>
        })}
      </div>
    </>
  )
}
