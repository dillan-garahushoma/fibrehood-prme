import React from "react";
import { Mail } from "lucide-react";
import AuthPlaceholder from "@/components/AuthPlaceholder";

export default function ForgotPassword() {
  return (
    <AuthPlaceholder
      icon={Mail}
      title="Password reset unavailable"
      subtitle="Account access is coming soon."
    />
  );
}