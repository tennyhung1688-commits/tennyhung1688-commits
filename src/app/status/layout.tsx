import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'System Status — CommerceOS',
  description: 'Current operational status of all CommerceOS services. Check uptime, incidents, and maintenance schedules.',
};

export default function StatusLayout({ children }: { children: React.ReactNode }) {
  return children;
}
