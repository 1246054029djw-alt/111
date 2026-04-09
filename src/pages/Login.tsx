import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Lock, 
  ShieldCheck, 
  Eye, 
  EyeOff, 
  LogIn,
  Building2,
  Cpu,
  Cloud
} from 'lucide-react';
import { motion } from 'motion/react';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex overflow-hidden">
      {/* Brand Section (Left Side) */}
      <div className="hidden lg:flex lg:w-3/5 xl:w-2/3 relative flex-col justify-center p-16 signature-gradient overflow-hidden">
        {/* Abstract Architectural Background Pattern */}
        <div className="absolute inset-0 opacity-15">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBngdRkprLVWevbeQ3uq_gHZ_OZD2aZ3x8XVFzDMcIORsT8tOzyONTqKuK1IUbA07cX1IddTuM_FTVFLKkFUFhNSSf-JeyczK-pNA5ymVPigy2Gfatf-fwmPNQ3q_toEzD7f1fgAiJkBrfqWERvf2ZBXR1R50-6U330hT4-NFI5Bg_sIAIcX3kNxgXR42QnodYkCUwwxyKUVIcs-fXHJYu7ZVMk12XjCF80o3uw4-zriLi4g4hGePSH_UPiQgd_fAJbgvwE_ZIfQwAk" 
            alt="Blueprint" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        
        <div className="relative z-10 max-w-2xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 flex items-center gap-3"
          >
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-lg">
              <Building2 className="text-primary" size={32} />
            </div>
            <h1 className="text-white text-3xl font-bold tracking-tight">中铁建靖江会议管理系统</h1>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="text-white text-6xl font-extrabold leading-tight tracking-wide drop-shadow-md">
              智慧协作<br />赋能建筑管理新篇章
            </h2>
            <p className="text-white/80 mt-6 text-xl font-light tracking-widest uppercase">
              INTELLIGENT COLLABORATION • EMPOWERING CONSTRUCTION
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-20 grid grid-cols-2 gap-8"
          >
            <div className="glass-overlay rounded-lg p-6 border border-white/10">
              <Cpu className="text-white mb-2" size={24} />
              <h3 className="text-white text-sm font-semibold mb-1">数字化协同</h3>
              <p className="text-white/60 text-xs">实时管理会议资源，优化办公流程</p>
            </div>
            <div className="glass-overlay rounded-lg p-6 border border-white/10">
              <Cloud className="text-white mb-2" size={24} />
              <h3 className="text-white text-sm font-semibold mb-1">高标准基建</h3>
              <p className="text-white/60 text-xs">依托中铁建品牌，打造智慧管理平台</p>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-12 left-16 z-10">
          <p className="text-white/40 text-xs font-mono">PRD R02-001 | CRCC MEETING MANAGEMENT SYSTEM</p>
        </div>
      </div>

      {/* Login Form Section (Right Side) */}
      <div className="w-full lg:w-2/5 xl:w-1/3 bg-white flex flex-col justify-center px-8 sm:px-16 md:px-24 lg:px-12 xl:px-20 relative shadow-2xl z-20">
        <div className="w-full max-w-md mx-auto">
          <div className="mb-10 text-center lg:text-left">
            <h3 className="text-2xl font-bold text-on-surface mb-2">后台管理登录</h3>
            <p className="text-on-surface-variant text-sm">请输入您的管理账户和密码以继续</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-on-surface-variant ml-1">管理账号</label>
              <div className="relative group">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors" size={20} />
                <input 
                  className="w-full pl-10 pr-4 py-3 bg-surface-low border-transparent border-0 rounded-lg text-on-surface placeholder:text-outline focus:ring-1 focus:ring-primary focus:bg-white transition-all text-sm outline-none" 
                  placeholder="请输入账号" 
                  type="text" 
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-on-surface-variant ml-1">登录密码</label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors" size={20} />
                <input 
                  className="w-full pl-10 pr-12 py-3 bg-surface-low border-transparent border-0 rounded-lg text-on-surface placeholder:text-outline focus:ring-1 focus:ring-primary focus:bg-white transition-all text-sm outline-none" 
                  placeholder="请输入密码" 
                  type={showPassword ? "text" : "password"} 
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-on-surface-variant ml-1">图形验证码</label>
              <div className="flex gap-4">
                <div className="relative group flex-1">
                  <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors" size={20} />
                  <input 
                    className="w-full pl-10 pr-4 py-3 bg-surface-low border-transparent border-0 rounded-lg text-on-surface placeholder:text-outline focus:ring-1 focus:ring-primary focus:bg-white transition-all text-sm outline-none" 
                    placeholder="验证码" 
                    type="text" 
                    required
                  />
                </div>
                <div className="w-32 h-11 bg-surface-high rounded-lg overflow-hidden cursor-pointer active:opacity-80 transition-opacity">
                  <img 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAiZnEVr_NiSe8Na9hbZl0ZEJlvhkV5cw9ztV6IFyW1auZWOZX8uKNQoVZ1HOQAh6Gkg04SrPGOeW3poLUA_FflELmMhlYxbpYaECDtx9bu9YnS0WragTfHLsUplw7TnV92MF0RDZJFBUu-y5D-lOqwq1CkJeXJDDpgk2a8ugPUvPYGt5s4J6lfA2uRtz30MXDJ65Rk5TmtdJW-VizcNYiPtw6d3W_7IzplRnAAZRXUL0rZ-SZvahcoa3u8gRXNWG6TwBYQDYJ2rRXz" 
                    alt="Captcha" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary" type="checkbox" />
                <span className="text-xs text-on-surface-variant">记住账号</span>
              </label>
              <a className="text-xs text-primary hover:underline font-medium" href="#">忘记密码？</a>
            </div>

            <button 
              type="submit"
              className="w-full py-4 signature-gradient text-white font-semibold rounded-lg shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-8"
            >
              <span>立即登录</span>
              <LogIn size={20} />
            </button>
          </form>

          <div className="mt-20 text-center">
            <p className="text-xs text-outline">© 2024 中铁建靖江会议管理系统</p>
            <div className="flex justify-center gap-4 mt-2">
              <a className="text-xs text-outline hover:text-primary transition-colors" href="#">联系支持</a>
              <span className="text-outline-variant">|</span>
              <a className="text-xs text-outline hover:text-primary transition-colors" href="#">隐私政策</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
