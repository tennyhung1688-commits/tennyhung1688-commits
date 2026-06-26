'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, Package, Palette, Puzzle, Cpu, GitBranch,
  FolderOpen, Upload, BarChart3, Bot, Store, Settings,
  ChevronLeft, Plus, Sparkles
} from 'lucide-react';
import { useLang } from '@/lib/i18n';

interface NavItem {
  icon: React.ElementType;
  label: string;
  labelZh: string;
  href: string;
  badge?: string;
}

const mainNav: NavItem[] = [
  { icon: LayoutDashboard, label: 'Workspace', labelZh: '工作台', href: '/workspace' },
  { icon: Package, label: 'Product Center', labelZh: '商品中心', href: '/products' },
  { icon: Palette, label: 'Brand Center', labelZh: '品牌中心', href: '/brands' },
];

const createNav: NavItem[] = [
  { icon: Puzzle, label: 'Knowledge Engine', labelZh: '知识引擎', href: '/skills' },
  { icon: Cpu, label: 'AI Models', labelZh: 'AI 模型', href: '/models' },
  { icon: GitBranch, label: 'Workflow Orchestrator', labelZh: '工作流编排', href: '/workflow' },
];

const manageNav: NavItem[] = [
  { icon: FolderOpen, label: 'Content Hub', labelZh: '内容中心', href: '/assets' },
  { icon: Upload, label: 'Publish', labelZh: '一键发布', href: '/publish' },
  { icon: BarChart3, label: 'Commerce Intelligence', labelZh: '智能分析', href: '/analytics' },
];

const intelNav: NavItem[] = [
  { icon: Bot, label: 'AI Agents', labelZh: 'AI 代理', href: '/agents', badge: 'New' },
  { icon: Store, label: 'Ecosystem', labelZh: '生态', href: '/marketplace' },
];

export default function AppSidebar() {
  const pathname = usePathname();
  const { t } = useLang();

  const NavSection = ({ title, titleZh, items }: { title: string; titleZh: string; items: NavItem[] }) => (
    <div className="mb-5">
      <p className="px-3 mb-1.5 text-[10px] font-semibold text-[#9CA3AF] uppercase tracking-wider">
        {t(title, titleZh)}
      </p>
      <nav className="space-y-0.5">
        {items.map(item => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 group ${
                isActive
                  ? 'bg-[#7C3AED]/10 text-[#7C3AED]'
                  : 'text-[#6B7280] hover:text-[#111827] hover:bg-[#F5F5F5]'
              }`}
            >
              <item.icon className={`w-4 h-4 ${isActive ? 'text-[#7C3AED]' : 'text-[#9CA3AF] group-hover:text-[#6B7280]'}`} />
              <span className="flex-1">{t(item.label, item.labelZh)}</span>
              {item.badge && (
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-[#7C3AED]/10 text-[#7C3AED]">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );

  return (
    <aside className="fixed inset-y-0 left-0 z-40 w-60 bg-white border-r border-[#E5E7EB] flex flex-col">
      {/* Logo */}
      <div className="h-15 flex items-center gap-2.5 px-5 border-b border-[#E5E7EB]">
        <div className="w-7 h-7 rounded-lg bg-[#7C3AED] flex items-center justify-center shadow-sm">
          <span className="text-white text-[9px] font-bold tracking-tight">COS</span>
        </div>
        <div>
          <Link href="/workspace" className="font-bold text-sm text-[#111827] tracking-tight">
            CommerceOS
          </Link>
          <p className="text-[10px] text-[#9CA3AF] leading-none -mt-0.5">Studio</p>
        </div>
      </div>

      {/* New Project Button */}
      <div className="px-4 py-3">
        <Link
          href="/workspace/new"
          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-[#7C3AED] text-white text-sm font-semibold shadow-sm hover:bg-[#6D28D9] transition-all"
        >
          <Plus className="w-4 h-4" />
          <Sparkles className="w-3.5 h-3.5" />
          {t('New Project', '新项目')}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-2">
        <NavSection title="Input" titleZh="输入" items={mainNav} />
        <NavSection title="Intelligence" titleZh="智能引擎" items={createNav} />
        <NavSection title="Output" titleZh="输出" items={manageNav} />
        <NavSection title="Ecosystem" titleZh="生态" items={intelNav} />

        {/* Settings at bottom */}
        <div className="mt-3 pt-3 border-t border-[#E5E7EB]">
          <Link
            href="/settings"
            className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
              pathname === '/settings'
                ? 'bg-[#7C3AED]/10 text-[#7C3AED]'
                : 'text-[#6B7280] hover:text-[#111827] hover:bg-[#F5F5F5]'
            }`}
          >
            <Settings className="w-4 h-4" />
            {t('Settings', '设置')}
          </Link>
        </div>
      </nav>

      {/* User area */}
      <div className="px-4 py-3 border-t border-[#E5E7EB]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#A78BFA] flex items-center justify-center text-white text-xs font-bold">
            T
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-[#111827] truncate">Tenny</p>
            <p className="text-[11px] text-[#9CA3AF] truncate">Free Plan</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
