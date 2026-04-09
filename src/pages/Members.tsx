import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  ChevronLeft, 
  ChevronRight,
  UserPlus,
  Filter,
  Download,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import Modal from '@/src/components/Modal';

const members = [
  { id: 1, name: '张建国', gender: '男', phone: '13800138001', email: 'zhangjg@crcc.com', dept: '工程管理部', faceStatus: '已录入', faceColor: 'text-green-600 bg-green-50' },
  { id: 2, name: '李梅', gender: '女', phone: '13900139002', email: 'limei@crcc.com', dept: '行政办公室', faceStatus: '未录入', faceColor: 'text-error bg-error/10' },
  { id: 3, name: '王志强', gender: '男', phone: '13700137003', email: 'wangzq@crcc.com', dept: '技术研发部', faceStatus: '已录入', faceColor: 'text-green-600 bg-green-50' },
  { id: 4, name: '陈思语', gender: '女', phone: '13600136004', email: 'chensy@crcc.com', dept: '人力资源部', faceStatus: '已录入', faceColor: 'text-green-600 bg-green-50' },
];

export default function Members() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-semibold text-on-surface flex items-center gap-2">
            参会人员管理
            <span className="text-[10px] font-normal bg-secondary/10 text-secondary px-2 py-0.5 rounded-full uppercase tracking-wider">R02-012</span>
          </h1>
          <p className="text-on-surface-variant mt-1 text-sm">维护园区参会人员基本信息及人脸数据，支持会议预约快速选择。</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="signature-gradient text-white px-5 py-2.5 rounded-lg font-medium flex items-center gap-2 shadow-lg shadow-blue-500/20 active:scale-95 transition-transform"
        >
          <UserPlus size={20} />
          新增人员
        </button>
      </div>

      <section className="bg-surface-low p-6 rounded-lg flex flex-wrap gap-6 items-end">
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-semibold text-outline uppercase tracking-wider">人员姓名/手机号</label>
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
          <label className="text-[10px] font-semibold text-outline uppercase tracking-wider">所属部门</label>
          <select className="pl-4 pr-10 py-2 bg-white border-none rounded-lg text-sm focus:ring-2 focus:ring-primary w-48 shadow-sm appearance-none cursor-pointer">
            <option>全部部门</option>
            <option>工程管理部</option>
            <option>行政办公室</option>
            <option>技术研发部</option>
            <option>人力资源部</option>
          </select>
        </div>
        <button className="bg-primary text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors h-[38px]">
          查询
        </button>
        <button className="bg-white text-on-surface-variant ghost-border px-6 py-2 rounded-lg text-sm font-medium hover:bg-surface-high transition-colors h-[38px]">
          重置
        </button>
      </section>

      <section className="bg-white rounded-lg shadow-sm overflow-hidden flex-1 flex flex-col">
        <div className="px-6 py-4 flex items-center justify-between border-b border-surface-high">
          <h4 className="font-semibold text-on-surface">人员列表</h4>
          <button className="text-xs px-3 py-1.5 rounded-lg border border-outline-variant hover:bg-surface-low transition-colors flex items-center gap-2">
            <Download size={14} />
            导出名单
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-high/30">
                <th className="px-6 py-4 text-[10px] font-semibold text-outline uppercase tracking-wider">姓名</th>
                <th className="px-6 py-4 text-[10px] font-semibold text-outline uppercase tracking-wider">性别</th>
                <th className="px-6 py-4 text-[10px] font-semibold text-outline uppercase tracking-wider">联系方式</th>
                <th className="px-6 py-4 text-[10px] font-semibold text-outline uppercase tracking-wider">所属部门</th>
                <th className="px-6 py-4 text-[10px] font-semibold text-outline uppercase tracking-wider">人脸状态</th>
                <th className="px-6 py-4 text-[10px] font-semibold text-outline uppercase tracking-wider text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-low">
              {members.map((member) => (
                <tr key={member.id} className="hover:bg-surface-low/50 transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-surface-high flex items-center justify-center text-xs font-bold text-on-surface-variant">
                        {member.name[0]}
                      </div>
                      <span className="font-medium text-on-surface">{member.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-sm text-on-surface-variant">{member.gender}</td>
                  <td className="px-6 py-5 text-sm font-mono text-on-surface-variant">{member.phone}</td>
                  <td className="px-6 py-5 text-sm text-on-surface-variant">{member.dept}</td>
                  <td className="px-6 py-5">
                    <span className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold", member.faceColor)}>
                      {member.faceStatus === '已录入' ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                      {member.faceStatus}
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
        <div className="mt-auto px-6 py-4 flex items-center justify-between bg-surface-low/30 border-t border-surface-high">
          <span className="text-xs text-on-surface-variant">显示 1 到 4 条，共 4 条记录</span>
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

      {/* Add Member Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="新增参会人员"
        footer={
          <>
            <button 
              onClick={() => setIsAddModalOpen(false)}
              className="px-4 py-2 text-sm font-medium text-on-surface-variant hover:bg-surface-high rounded-lg transition-colors"
            >
              取消
            </button>
            <button 
              className="px-6 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-lg shadow-blue-500/10"
            >
              确认保存
            </button>
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
            <label className="text-xs font-semibold text-on-surface-variant">联系方式</label>
            <input className="w-full px-4 py-2 bg-surface-low border-none rounded-lg text-sm focus:ring-1 focus:ring-primary outline-none" placeholder="请输入11位手机号" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-on-surface-variant">电子邮箱</label>
            <input className="w-full px-4 py-2 bg-surface-low border-none rounded-lg text-sm focus:ring-1 focus:ring-primary outline-none" placeholder="请输入邮箱地址" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-on-surface-variant">所属部门</label>
            <select className="w-full px-4 py-2 bg-surface-low border-none rounded-lg text-sm focus:ring-1 focus:ring-primary outline-none appearance-none">
              <option>工程管理部</option>
              <option>行政办公室</option>
              <option>技术研发部</option>
              <option>人力资源部</option>
            </select>
          </div>
          <div className="pt-2">
            <label className="text-xs font-semibold text-on-surface-variant block mb-2">人脸录入</label>
            <div className="border-2 border-dashed border-outline-variant rounded-xl p-8 flex flex-col items-center justify-center gap-3 bg-surface-low/30 hover:bg-surface-low transition-colors cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-outline shadow-sm">
                <Plus size={24} />
              </div>
              <p className="text-xs text-outline">点击或拖拽照片进行人脸录入</p>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
}
