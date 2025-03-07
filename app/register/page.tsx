'use client'

import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import { siteConfig } from "@/config/siteConfig";
import Link from "next/link";
import { toast } from "sonner";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [ isRegistered, setIsRegistered ] = useState(false);

  useEffect(() => {
    if (status === "authenticated" && !isRegistered) {
      redirect("/");
    }
  }, [isRegistered, status]);

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    if (password !== confirmPassword) {
      setPasswordError("Passwords don't match");
    } else {
      setPasswordError('');
    }
  }, [confirmPassword])

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (passwordError) return null;

    const res = await fetch("/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          firstName: firstName,
          lastName: lastName,
          password: password
        }),
    });

    if (res.ok && res.status == 200) {
        const status = await signIn("credentials", {
            redirect: false,
            email: email,
            password: password,
            callbackUrl: "/dashboard",
          });
      
        if (status?.ok) {
          if (status.url) {
            setIsRegistered(true);
            toast.dismiss();
            return router.push(status.url);
          }
        } else {
            toast.error('Oops! It seems there was an error with your login attempt. Please double-check your credentials and try again.', { position: "top-center" })
        }
    } else {
        toast.error('Oops! It seems there is already user with this email! Please change your credentials and try again.', { position: "top-center" })
    }
  };

  return (
    <div className="relative flex min-h-[88vh] items-center justify-center mb-10 px-5">
      <Image
        src={siteConfig.background}
        alt="backgorund"
        fill
        priority
        unoptimized
        className="-z-10 object-cover opacity-35"
      />
      <div className="absolute -z-10 size-full bg-gradient-to-t from-zinc-800" />

      <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="/" className="absolute top-3 left-3 cursor-pointer">{"<--"} Go back</motion.a>

      <motion.form
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleSubmit}
        className="flex flex-col space-y-4 w-96 mt-20 p-6 bg-zinc-700 rounded-lg shadow-lg"
      >
        <h2 className="text-3xl font-bold text-white text-center">Register</h2>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex flex-col space-y-2"
        >
          <label htmlFor="email" className="font-semibold text-white">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-600 rounded-lg px-4 py-3 bg-zinc-800 text-white"
            required
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex flex-col space-y-2"
        >
          <label htmlFor="firstName" className="font-semibold text-white">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="border border-gray-600 rounded-lg px-4 py-3 bg-zinc-800 text-white"
            required
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex flex-col space-y-2"
        >
          <label htmlFor="lastName" className="font-semibold text-white">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="border border-gray-600 rounded-lg px-4 py-3 bg-zinc-800 text-white"
            required
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex flex-col space-y-2"
        >
          <label htmlFor="password" className="font-semibold text-white">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-600 rounded-lg px-4 py-3 bg-zinc-800 text-white"
            required
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex flex-col space-y-2"
        >
          <label htmlFor="confirmPassword" className="font-semibold text-white">
            Confirm password
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border border-gray-600 rounded-lg px-4 py-3 bg-zinc-800 text-white"
            required
          />
          {passwordError && <p className="text-red-500">{passwordError}</p>} 
        </motion.div>
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-zinc-600 text-white font-semibold py-3 rounded-lg transition-all"
        >
          Register
        </motion.button>
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            className="text-center"
        >
          Already have an account? {" "}
          <Link href="/login" className="text-blue-400">Login</Link>
        </motion.div>
      </motion.form>
    </div>
  );
}
