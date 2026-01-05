'use client'

import { useEffect } from "react";
import  { useRouter } from "next/navigation";
import { useLoggedFlag } from "@/queries/loggedFlag";

export default function Home() {

  const { logged, toggle } = useLoggedFlag();

  const router = useRouter();

  useEffect(() => {
    if (!logged) {
      router.push('/login');
    } else {
      router.push('/contratos');
    }
  })
}
