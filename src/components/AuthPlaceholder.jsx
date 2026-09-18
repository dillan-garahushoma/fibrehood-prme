import React from "react";
import { Link } from "react-router-dom";
import AuthLayout from "@/components/AuthLayout";

/** Shared "coming soon" state for the auth pages. The site is a public
 *  marketing site; account access will launch with the client portal. */
export default function AuthPlaceholder({ icon: Icon, title, subtitle }) {
  return (
    <AuthLayout
      icon={Icon}
      title={title}
      subtitle={subtitle}
      footer={
        <Link to="/" className="text-primary font-medium hover:underline">
          Back to home
        </Link>
      }
    >
      <p className="text-sm text-muted-foreground text-center">
        Account access is on the way. For now, check your coverage, compare plans, or reach Fibrehood directly.
      </p>
      <div className="mt-6 flex flex-col gap-3">
        <Link to="/coverage" className="text-center text-sm font-medium text-primary hover:underline">
          Check coverage
        </Link>
        <Link to="/contact" className="text-center text-sm font-medium text-primary hover:underline">
          Contact Fibrehood
        </Link>
      </div>
    </AuthLayout>
  );
}