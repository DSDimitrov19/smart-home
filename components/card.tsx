import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Device {
  id: string
  ownerId: string
  name: string
  status: string
  createdAt: Date
  updatedAt: Date
}


const Card = ({ device, fetchDevices }: { device: Device, fetchDevices: any }) => {
  const toggleCard = async () => {
    var status;

    if (device.status == 'opened') {
        status = 'closed'
    } else {
        status = 'opened'
    }

    const res = await fetch("/api/device", {
        method: "PUT",
        body: JSON.stringify({
          id: device.id,
          name: device.name,
          status: status
        }),
        headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
        fetchDevices();
    }
  };

  return (
    <div className="min-w-[15vw] mx-auto rounded-md overflow-hidden shadow-lg bg-zinc text-white">
      <div className="bg-zinc-700 px-6 py-4 flex items-center justify-center flex-col gap-2 relative">
        <h2 className="font-bold text-2xl">{device.name}</h2>
        <motion.div
          className={`w-6 h-6 rounded-full my-4 ${device.status == 'opened' ? 'bg-green-500' : 'bg-red-500'}`}
          animate={{ opacity: [0, 1, 0], scale: [1, 1.5, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.button
          className={`inline-block rounded-md px-4 py-2 text-lg font-semibold ${
            device.status == 'opened' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleCard}
        >
          {device.status == 'opened' ? 'Opened' : 'Closed'}
        </motion.button>
      </div>
    </div>
  );
};

export default Card;
