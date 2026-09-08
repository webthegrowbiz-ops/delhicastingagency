"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function StepTwoProfilePage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/profile/setup");
  }, [router]);

  return null;
}
