import { Link, useLocation, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, 
  DoorOpen, 
  ClipboardCheck, 
  Users, 
  Settings, 
  Bell, 
  Search,
  Building2,
  Shield
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

const navItems = [
  { icon: LayoutDashboard, label: '工作台', path: '/dashboard' },
  { icon: DoorOpen, label: '会议室管理', path: '/meeting-rooms' },
  { icon: ClipboardCheck, label: '会议预约审批', path: '/approvals' },
  { icon: Users, label: '参会人员管理', path: '/members' },
  { icon: Settings, label: '系统管理', path: '/settings' },
];

export default function Layout() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navigation Bar */}
      <header className="bg-white border-b border-surface-high shadow-sm fixed top-0 z-50 w-full flex justify-between items-center h-16 px-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 signature-gradient rounded-xl flex items-center justify-center text-white">
            <Building2 size={18} />
          </div>
          <span className="text-lg font-semibold text-on-surface">中铁建靖江会议管理系统</span>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="relative hidden md:flex items-center">
            <Search className="absolute left-3 text-outline" size={16} />
            <input 
              className="pl-10 pr-4 py-1.5 bg-surface-low border-none rounded-full text-xs focus:ring-2 focus:ring-primary w-64" 
              placeholder="搜索功能..." 
              type="text"
            />
          </div>
          <div className="flex items-center gap-4">
            <Bell className="text-outline cursor-pointer hover:text-primary transition-colors" size={20} />
            <div className="flex items-center gap-2 cursor-pointer">
              <img 
                className="w-8 h-8 rounded-full border-2 border-white shadow-sm" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdxBNr3X_eTLy_qhap4-Dp5EyDE07ssywBnWTH6RL_77FT6gow82eJrHkUxt-fC7HEf5jtEQ_dhxms6p9hfcZ0mnjpEje4-Bu06vuAJ52YkXDkjmR3CzkQ8D1Q6kOgS0exrJHGG_HXajfKhcTLFiuQex-ZjdB82gCuttwQF894-jrknZUi6j4v8VS5TEnNXrfxL3Owcmj5jzqus1CRdv3sRySlXApQBmp3zHNnPYmltt30CMtNIw-aJpqOyvWWYoPThs8qAUE-JPJf" 
                alt="Admin"
              />
              <span className="font-medium text-on-surface text-sm">管理员</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 pt-16">
        {/* Sidebar Navigation */}
        <aside className="h-screen w-64 fixed left-0 top-0 pt-16 bg-surface-low flex flex-col py-4 gap-2 z-40">
          <div className="px-6 py-4 mb-2">
            <div className="text-primary font-bold flex items-center gap-2">
              <Shield size={20} />
              后台管理
            </div>
            <div className="text-outline text-xs mt-1">管理员控制台</div>
          </div>
          <nav className="flex-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 px-6 py-3 transition-all cursor-pointer",
                    isActive 
                      ? "bg-white text-primary rounded-l-full ml-4 font-semibold shadow-sm" 
                      : "text-on-surface-variant hover:bg-white/50"
                  )}
                >
                  <item.icon size={20} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="ml-64 flex-1 p-8 flex flex-col min-h-[calc(100vh-64px)]">
          <Outlet />
          
          {/* Footer */}
          <footer className="mt-auto pt-12 pb-4 flex flex-col items-center justify-center gap-2 text-xs text-outline">
            <div>© 中铁建靖江会议管理系统</div>
            <div className="flex gap-4">
              <a className="hover:text-primary transition-colors" href="#">联系支持</a>
              <a className="hover:text-primary transition-colors" href="#">隐私政策</a>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
