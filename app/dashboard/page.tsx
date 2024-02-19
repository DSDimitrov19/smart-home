/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Card from "@/components/card";
import Modal from "@/components/creation-modal";
import Navbar from "@/components/navbar";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Home() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/login");
    },
  });
  const [ devices, setDevices ] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

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

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-8 right-8 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full shadow-lg"
        onClick={toggleModal}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      </motion.button>
        {isModalOpen && <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen} ownerId={session.user.id} fetchDevices={fetchDevices} />}
      </div>
    </>
  )
}
