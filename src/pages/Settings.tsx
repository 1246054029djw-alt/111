import React, { useState } from 'react';
import { 
  UserCog, 
  ShieldCheck, 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  ChevronLeft, 
  ChevronRight,
  UserPlus,
  Lock,
  MoreVertical,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import Modal from '@/src/components/Modal';

const users = [
  { id: 1, name: '管理员', phone: '13800138000', dept: '信息技术部', role: '系统管理员', status: '启用', statusColor: 'text-green-600 bg-green-50' },
  { id: 2, name: '张建国', phone: '13800138001', dept: '工程管理部', role: '会议室管理员', status: '启用', statusColor: 'text-green-600 bg-green-50' },
  { id: 3, name: '李梅', phone: '13900139002', dept: '行政办公室', role: '会议室管理员', status: '禁用', statusColor: 'text-outline bg-surface-high' },
];

const roles = [
  { id: 1, name: '系统管理员', code: 'ROLE_ADMIN', permissions: 48, users: 1, time: '2024-01-01' },
  { id: 2, name: '会议室管理员', code: 'ROLE_ROOM_ADMIN', permissions: 32, users: 12, time: '2024-01-05' },
  { id: 3, name: '普通员工', code: 'ROLE_USER', permissions: 12, users: 450, time: '2024-01-10' },
  { id: 4, name: '保洁人员', code: 'ROLE_CLEANER', permissions: 4, users: 8, time: '2024-02-15' },
];

export default function Settings() {
  const [activeTab, setActiveTab] = useState<'users' | 'roles'>('users');
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [isAddRoleModalOpen, setIsAddRoleModalOpen] = useState(false);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-semibold text-on-surface flex items-center gap-2">
            系统管理
            <span className="text-[10px] font-normal bg-secondary/10 text-secondary px-2 py-0.5 rounded-full uppercase tracking-wider">R02-013 / R02-014</span>
          </h1>
          <p className="text-on-surface-variant mt-1 text-sm">配置系统用户账号、角色权限及全局参数，确保系统安全运行。</p>
        </div>
        <div className="flex bg-surface-low p-1 rounded-lg">
          <button 
            onClick={() => setActiveTab('users')}
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-md transition-all flex items-center gap-2",
              activeTab === 'users' ? "bg-white text-primary shadow-sm" : "text-on-surface-variant hover:text-on-surface"
            )}
          >
            <UserCog size={18} />
            用户管理
          </button>
          <button 
            onClick={() => setActiveTab('roles')}
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-md transition-all flex items-center gap-2",
              activeTab === 'roles' ? "bg-white text-primary shadow-sm" : "text-on-surface-variant hover:text-on-surface"
            )}
          >
            <ShieldCheck size={18} />
            角色管理
          </button>
        </div>
      </div>

      {activeTab === 'users' ? (
        <div className="space-y-6">
          <section className="bg-surface-low p-6 rounded-lg flex flex-wrap gap-6 items-end">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-semibold text-outline uppercase tracking-wider">用户姓名/手机号</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" size={16} />
                <input 
                  className="pl-10 pr-4 py-2 bg-white border-none rounded-lg text-sm focus:ring-2 focus:ring-primary w-64 shadow-sm" 
                  placeholder="搜索姓名或手机号..." 
                  type="text"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-semibold text-outline uppercase tracking-wider">账号状态</label>
              <select className="pl-4 pr-10 py-2 bg-white border-none rounded-lg text-sm focus:ring-2 focus:ring-primary w-40 shadow-sm appearance-none cursor-pointer">
                <option>全部状态</option>
                <option>启用</option>
                <option>禁用</option>
              </select>
            </div>
            <button className="bg-primary text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors h-[38px]">
              查询
            </button>
            <button 
              onClick={() => setIsAddUserModalOpen(true)}
              className="signature-gradient text-white px-5 py-2 rounded-lg text-sm font-medium shadow-lg shadow-blue-500/20 active:scale-95 transition-transform h-[38px] flex items-center gap-2"
            >
              <UserPlus size={18} />
              新增用户
            </button>
          </section>

          <section className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-high/30">
                    <th className="px-6 py-4 text-[10px] font-semibold text-outline uppercase tracking-wider">姓名</th>
                    <th className="px-6 py-4 text-[10px] font-semibold text-outline uppercase tracking-wider">联系方式</th>
                    <th className="px-6 py-4 text-[10px] font-semibold text-outline uppercase tracking-wider">所属部门</th>
                    <th className="px-6 py-4 text-[10px] font-semibold text-outline uppercase tracking-wider">角色</th>
                    <th className="px-6 py-4 text-[10px] font-semibold text-outline uppercase tracking-wider">账号状态</th>
                    <th className="px-6 py-4 text-[10px] font-semibold text-outline uppercase tracking-wider text-right">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-low">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-surface-low/50 transition-colors group">
                      <td className="px-6 py-5">
                        <span className="font-medium text-on-surface">{user.name}</span>
                      </td>
                      <td className="px-6 py-5 text-sm font-mono text-on-surface-variant">{user.phone}</td>
                      <td className="px-6 py-5 text-sm text-on-surface-variant">{user.dept}</td>
                      <td className="px-6 py-5">
                        <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] rounded-full font-medium">
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <span className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold", user.statusColor)}>
                          <span className={cn("w-1.5 h-1.5 rounded-full", user.status === '启用' ? 'bg-green-500' : 'bg-outline')}></span>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-2 hover:bg-white rounded-lg text-primary transition-colors" title="编辑">
                            <Edit2 size={18} />
                          </button>
                          <button className="p-2 hover:bg-white rounded-lg text-error transition-colors" title="删除">
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-4 flex items-center justify-between bg-surface-low/30 border-t border-surface-high">
              <span className="text-xs text-on-surface-variant">显示 1 到 3 条，共 3 条记录</span>
              <div className="flex items-center gap-2">
                <button className="p-1 hover:bg-white rounded-md text-outline disabled:opacity-50" disabled>
                  <ChevronLeft size={20} />
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-md bg-primary text-white text-xs font-bold">1</button>
                <button className="p-1 hover:bg-white rounded-md text-outline">
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </section>
        </div>
      ) : (
        <div className="space-y-6">
          <section className="flex justify-end">
            <button 
              onClick={() => setIsAddRoleModalOpen(true)}
              className="signature-gradient text-white px-5 py-2.5 rounded-lg font-medium flex items-center gap-2 shadow-lg shadow-blue-500/20 active:scale-95 transition-transform"
            >
              <Plus size={20} />
              新增角色
            </button>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {roles.map((role) => (
              <div key={role.id} className="bg-white p-6 rounded-xl shadow-sm ghost-border hover:shadow-md transition-shadow group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-1.5 hover:bg-surface-low rounded-lg text-outline">
                    <MoreVertical size={16} />
                  </button>
                </div>
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <ShieldCheck size={24} />
                </div>
                <h3 className="text-lg font-bold text-on-surface mb-1">{role.name}</h3>
                <p className="text-xs font-mono text-outline mb-4">{role.code}</p>
                <div className="grid grid-cols-2 gap-4 border-t border-surface-high pt-4">
                  <div>
                    <p className="text-[10px] text-outline uppercase tracking-wider mb-1">权限项</p>
                    <p className="text-sm font-bold text-primary">{role.permissions}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-outline uppercase tracking-wider mb-1">关联用户</p>
                    <p className="text-sm font-bold text-on-surface">{role.users}</p>
                  </div>
                </div>
                <div className="mt-6 flex gap-2">
                  <button className="flex-1 py-2 bg-surface-low text-primary text-xs font-medium rounded-lg hover:bg-primary/10 transition-colors">权限配置</button>
                  <button className="p-2 bg-surface-low text-on-surface-variant rounded-lg hover:bg-surface-high transition-colors">
                    <Edit2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </section>
        </div>
      )}

      {/* Add User Modal */}
      <Modal
        isOpen={isAddUserModalOpen}
        onClose={() => setIsAddUserModalOpen(false)}
        title="新增用户账号"
        footer={
          <>
            <button onClick={() => setIsAddUserModalOpen(false)} className="px-4 py-2 text-sm font-medium text-on-surface-variant hover:bg-surface-high rounded-lg">取消</button>
            <button className="px-6 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary/90 shadow-lg shadow-blue-500/10">确认创建</button>
          </>
        }
      >
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-on-surface-variant">姓名</label>
              <input className="w-full px-4 py-2 bg-surface-low border-none rounded-lg text-sm focus:ring-1 focus:ring-primary outline-none" placeholder="请输入姓名" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-on-surface-variant">性别</label>
              <select className="w-full px-4 py-2 bg-surface-low border-none rounded-lg text-sm focus:ring-1 focus:ring-primary outline-none appearance-none">
                <option>男</option>
                <option>女</option>
              </select>
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-on-surface-variant">手机号 (登录账号)</label>
            <input className="w-full px-4 py-2 bg-surface-low border-none rounded-lg text-sm focus:ring-1 focus:ring-primary outline-none" placeholder="请输入11位手机号" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-on-surface-variant">所属部门</label>
            <select className="w-full px-4 py-2 bg-surface-low border-none rounded-lg text-sm focus:ring-1 focus:ring-primary outline-none appearance-none">
              <option>信息技术部</option>
              <option>工程管理部</option>
              <option>行政办公室</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-on-surface-variant">分配角色</label>
            <select className="w-full px-4 py-2 bg-surface-low border-none rounded-lg text-sm focus:ring-1 focus:ring-primary outline-none appearance-none">
              <option>系统管理员</option>
              <option>会议室管理员</option>
              <option>领导</option>
              <option>普通员工</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-on-surface-variant">初始密码</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" size={16} />
              <input className="w-full pl-10 pr-4 py-2 bg-surface-low border-none rounded-lg text-sm focus:ring-1 focus:ring-primary outline-none" placeholder="默认 12345678" type="password" />
            </div>
          </div>
        </form>
      </Modal>

      {/* Add Role Modal */}
      <Modal
        isOpen={isAddRoleModalOpen}
        onClose={() => setIsAddRoleModalOpen(false)}
        title="新增系统角色"
        footer={
          <>
            <button onClick={() => setIsAddRoleModalOpen(false)} className="px-4 py-2 text-sm font-medium text-on-surface-variant hover:bg-surface-high rounded-lg">取消</button>
            <button className="px-6 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary/90 shadow-lg shadow-blue-500/10">确认保存</button>
          </>
        }
      >
        <form className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-on-surface-variant">角色名称</label>
            <input className="w-full px-4 py-2 bg-surface-low border-none rounded-lg text-sm focus:ring-1 focus:ring-primary outline-none" placeholder="如：财务审批员" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-on-surface-variant">角色标识</label>
            <input className="w-full px-4 py-2 bg-surface-low border-none rounded-lg text-sm font-mono focus:ring-1 focus:ring-primary outline-none" placeholder="如：ROLE_FINANCE" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-on-surface-variant block mb-2">权限分配</label>
            <div className="space-y-3 bg-surface-low/30 p-4 rounded-lg max-h-60 overflow-y-auto">
              {['工作台查看', '会议室管理', '会议室CRUD', '门牌管理', '预约审批', '人员管理', '系统设置'].map((perm, i) => (
                <label key={i} className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary" />
                  <span className="text-sm text-on-surface-variant group-hover:text-on-surface transition-colors">{perm}</span>
                </label>
              ))}
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
}
