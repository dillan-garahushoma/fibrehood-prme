import React from "react";
import { LogIn } from "lucide-react";
import AuthPlaceholder from "@/components/AuthPlaceholder";

export default function Login() {
  return (
    <AuthPlaceholder
      icon={LogIn}
      title="Account access is coming soon"
      subtitle="We're building a self-service portal for Fibrehood customers."
    />
  );
}