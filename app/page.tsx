'use client'

import FeaturesGrid from "@/components/features-grid";
import Hero from "@/components/hero";
import { signIn, useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <div>
      <Hero/>
      <FeaturesGrid />
    </div>
  )
}
