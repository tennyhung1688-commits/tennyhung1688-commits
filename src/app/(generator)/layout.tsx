import { AuthProvider } from "@/lib/auth";

export default function GeneratorLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}
