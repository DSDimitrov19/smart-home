import { motion } from "framer-motion";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "sonner";

interface Device {
    id: string
    ownerId: string
    name: string
    status: string
    createdAt: Date
    updatedAt: Date
}

const Modal = ({ isOpen, setIsOpen, device, fetchDevices }: { isOpen: boolean, setIsOpen: Dispatch<SetStateAction<boolean>>, device: Device, fetchDevices: () => void }) => {
    const [name, setName] = useState(device.name);

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const res = await fetch("/api/device", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: device.id,
              name: name,
              status: device.status
            }),
        });

        if (res.ok) {
            fetchDevices();
            toast.success('Device updated successfully!', { position: "bottom-left" })
            setIsOpen(false);
        }
    };

    return (
        <div className="fixed inset-0 overflow-y-auto z-50">
        <div className="flex items-center justify-center min-h-screen">
        <div className="fixed inset-0 bg-black opacity-50"></div>
        <motion.div
         initial={{ opacity: 0, scale: 0.8 }}
         animate={{ opacity: 1, scale: 1 }}
         transition={{ duration: 0.5 }}
         className="relative bg-zinc-700 text-white p-8 rounded-lg w-96">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="absolute top-2 right-2 text-gray-200 bg-zinc-600 p-1 rounded-md"
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
                d="M6 6l12 12m0-12L6 18"
              />
            </svg>
          </motion.button>
          <form onSubmit={handleSubmit}>
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="mb-4"
                >
              <label htmlFor="name" className="block text-gray-200 font-bold mb-2">
                Device Name
              </label>
              <input
                type="text"
                id="name"
                className="border border-gray-600 rounded-lg px-4 py-3 bg-zinc-800 text-white w-full"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </motion.div>
            <div className="flex justify-end">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              >
                Save
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
      );
}

export default Modal