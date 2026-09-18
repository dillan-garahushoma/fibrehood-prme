import React from "react";
import { UserPlus } from "lucide-react";
import AuthPlaceholder from "@/components/AuthPlaceholder";

export default function Register() {
  return (
    <AuthPlaceholder
      icon={UserPlus}
      title="Sign-ups open soon"
      subtitle="Customer accounts launch with the Fibrehood client portal."
    />
  );
}