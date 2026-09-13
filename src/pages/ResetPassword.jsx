import React from "react";
import { Lock } from "lucide-react";
import AuthPlaceholder from "@/components/AuthPlaceholder";

export default function ResetPassword() {
  return (
    <AuthPlaceholder
      icon={Lock}
      title="Account access is coming soon"
      subtitle="Password reset will be available once accounts launch."
    />
  );
}