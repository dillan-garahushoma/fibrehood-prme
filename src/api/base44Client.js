// Standalone client stub — NO Base44 SDK dependency.
// The platform-managed AuthContext.jsx must keep `import { base44 } from '@/api/base44Client'`,
// so this module provides that named export as a thin no-op / fetch proxy.
// Nothing here imports or depends on the Base44 SDK package.

const base44 = {
  auth: {
    isAuthenticated: async () => false,
    me: async () => null,
    updateMe: async () => null,
    loginViaEmailPassword: async () => {
      throw new Error("Account access is coming soon.");
    },
    loginWithProvider: () => {},
    register: async () => {
      throw new Error("Account access is coming soon.");
    },
    verifyOtp: async () => ({ access_token: null }),
    setToken: () => {},
    resendOtp: async () => {},
    resetPasswordRequest: async () => {},
    resetPassword: async () => {},
    logout: () => {}
  },
  functions: {
    invoke: async (name, payload) => {
      const res = await fetch(`/api/${name}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Request failed.");
      return { data };
    }
  },
  entities: {},
  analytics: { track: () => {} }
};

export { base44 };