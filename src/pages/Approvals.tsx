import React, { useState } from 'react';
import { 
  ClipboardCheck, 
  Hourglass, 
  CheckCircle2, 
  AlertTriangle, 
  Search, 
  Filter, 
  Download,
  Check,
  X,
  ChevronLeft,
  ChevronRight,
  AlarmClock,
  User,
  MapPin,
  Calendar,
  Clock,
  Users as UsersIcon,
  FileText
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import Modal from '@/src/components/Modal';

const stats = [
  { label: '待审批预约', value: '12', icon: ClipboardCheck, color: 'text-primary', bg: 'bg-primary/10', sub: '3项预约已超时', subIcon: AlertTriangle, subColor: 'text-error' },
  { label: '处理中', value: '08', icon: Hourglass, color: 'text-secondary', bg: 'bg-secondary/10', sub: '当前正常流转中', subColor: 'text-outline' },
  { label: '今日已完成', value: '24', icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50', sub: '相比昨日 +15%', subIcon: CheckCircle2, subColor: 'text-green-600' },
];

const pendingList = [
  {
    id: 1,
    applicant: '张明远',
    department: '工程部',
    room: '第二会议室 (2F)',
    subject: '靖江大桥施工进度汇报周会',
    time: '2024-05-20',
    duration: '14:00 - 16:30',
    attendees: 12,
    submitTime: '2024-05-18 09:15',
    status: '待审批',
    timeout: true,
    reason: '项目阶段性总结及下阶段施工计划对齐，需要使用大屏幕展示BIM模型。'
  },
  {
    id: 2,
    applicant: '李华芳',
    department: '财务部',
    room: '圆桌室 (3F)',
    subject: 'Q2季度财务审计预沟通会',
    time: '2024-05-21',
    duration: '09:00 - 10:30',
    attendees: 6,
    submitTime: '2024-05-19 14:40',
    status: '待审批',
    timeout: false,
    reason: '季度审计前置沟通，核对账目明细。'
  },
  {
    id: 3,
    applicant: '陈思语',
    department: '人事部',
    room: '多功能厅 (1F)',
    subject: '2024年校招宣讲会培训',
    time: '2024-05-22',
    duration: '15:00 - 18:00',
    attendees: 45,
    submitTime: '2024-05-20 08:30',
    status: '待审批',
    timeout: false,
    reason: '针对校招宣讲人员进行统一话术及流程培训。'
  }
];

export default function Approvals() {
  const [selectedItem, setSelectedItem] = useState<typeof pendingList[0] | null>(null);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <header>
        <h1 className="text-2xl font-semibold text-on-surface mb-2">会议预约审批</h1>
        <p className="text-on-surface-variant text-sm">查看并处理待审核的会议室预约申请，优化会议资源分配。</p>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-sm flex items-center justify-between ghost-border">
            <div>
              <p className="text-on-surface-variant text-xs mb-1 font-medium">{stat.label}</p>
              <h3 className={cn("text-3xl font-bold font-mono", stat.color)}>{stat.value}</h3>
              <div className={cn("mt-2 text-[10px] font-medium flex items-center gap-1", stat.subColor)}>
                {stat.subIcon && <stat.subIcon size={14} />}
                <span>{stat.sub}</span>
              </div>
            </div>
            <div className={cn("w-12 h-12 rounded-full flex items-center justify-center", stat.bg, stat.color)}>
              <stat.icon size={24} />
            </div>
          </div>
        ))}
      </div>

      {/* Main Table Section */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col">
        <div className="px-6 py-4 flex items-center justify-between border-b border-surface-high">
          <div className="flex items-center gap-4">
            <h4 className="font-semibold text-on-surface">待处理列表</h4>
            <span className="bg-primary/10 text-primary text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">R02-009</span>
          </div>
          <div className="flex gap-2">
            <button className="text-xs px-3 py-1.5 rounded-lg border border-outline-variant hover:bg-surface-low transition-colors flex items-center gap-2">
              <Filter size={14} />
              筛选
            </button>
            <button className="text-xs px-3 py-1.5 rounded-lg bg-surface-low text-on-surface-variant hover:bg-surface-high transition-colors flex items-center gap-2">
              <Download size={14} />
              导出报表
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-low/30">
                <th className="px-6 py-4 text-[10px] font-semibold text-on-surface-variant uppercase tracking-wider">申请人</th>
                <th className="px-6 py-4 text-[10px] font-semibold text-on-surface-variant uppercase tracking-wider">会议室</th>
                <th className="px-6 py-4 text-[10px] font-semibold text-on-surface-variant uppercase tracking-wider">会议主题</th>
                <th className="px-6 py-4 text-[10px] font-semibold text-on-surface-variant uppercase tracking-wider">预约时间段</th>
                <th className="px-6 py-4 text-[10px] font-semibold text-on-surface-variant uppercase tracking-wider text-center">人数</th>
                <th className="px-6 py-4 text-[10px] font-semibold text-on-surface-variant uppercase tracking-wider">提交时间</th>
                <th className="px-6 py-4 text-[10px] font-semibold text-on-surface-variant uppercase tracking-wider">状态</th>
                <th className="px-6 py-4 text-[10px] font-semibold text-on-surface-variant uppercase tracking-wider text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-low">
              {pendingList.map((item) => (
                <tr 
                  key={item.id} 
                  className="hover:bg-primary/5 transition-colors group cursor-pointer"
                  onClick={() => setSelectedItem(item)}
                >
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-surface-high flex items-center justify-center text-xs font-bold text-on-surface-variant">
                        {item.applicant[0]}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-on-surface">{item.applicant}</p>
                        <p className="text-[10px] text-outline">{item.department}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-sm text-on-surface-variant">{item.room}</span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-on-surface">{item.subject}</span>
                      {item.timeout && (
                        <span className="inline-flex items-center px-2 py-0.5 mt-1 rounded text-[10px] font-medium bg-error/10 text-error w-fit">
                          <AlarmClock size={12} className="mr-1" />
                          审批超时 (24h+)
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-xs font-mono text-on-surface-variant leading-relaxed">
                      {item.time}<br />
                      <span className="font-bold text-on-surface">{item.duration}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className="text-sm text-on-surface-variant font-mono">{item.attendees}</span>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-[11px] font-mono text-outline">{item.submitTime}</span>
                  </td>
                  <td className="px-6 py-5">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-primary/10 text-primary">
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex justify-end gap-2" onClick={e => e.stopPropagation()}>
                      <button className="p-2 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition-colors shadow-sm" title="通过">
                        <Check size={18} />
                      </button>
                      <button className="p-2 rounded-lg bg-error/10 text-error hover:bg-error/20 transition-colors shadow-sm" title="拒绝">
                        <X size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 bg-surface-low/10 flex items-center justify-between border-t border-surface-high">
          <span className="text-xs text-on-surface-variant">显示 1 到 3 条，共 12 条待审批预约</span>
          <div className="flex items-center gap-1">
            <button className="p-1.5 rounded-lg border border-outline-variant disabled:opacity-30" disabled>
              <ChevronLeft size={16} />
            </button>
            <button className="w-8 h-8 rounded-lg bg-primary text-white text-xs font-bold">1</button>
            <button className="w-8 h-8 rounded-lg hover:bg-surface-low text-xs transition-colors">2</button>
            <button className="w-8 h-8 rounded-lg hover:bg-surface-low text-xs transition-colors">3</button>
            <button className="p-1.5 rounded-lg border border-outline-variant hover:bg-surface-low transition-colors">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Approval Detail Modal */}
      <Modal
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        title="预约申请详情"
        className="max-w-2xl"
        footer={
          <>
            <button 
              onClick={() => setSelectedItem(null)}
              className="px-4 py-2 text-sm font-medium text-on-surface-variant hover:bg-surface-high rounded-lg"
            >
              返回列表
            </button>
            <div className="flex gap-3">
              <button className="px-6 py-2 bg-error/10 text-error text-sm font-medium rounded-lg hover:bg-error/20">驳回申请</button>
              <button className="px-6 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary/90 shadow-lg shadow-blue-500/10">批准预约</button>
            </div>
          </>
        }
      >
        {selectedItem && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-surface-low rounded-lg text-primary"><User size={18} /></div>
                  <div>
                    <p className="text-[10px] text-outline uppercase tracking-wider">申请人信息</p>
                    <p className="text-sm font-bold text-on-surface">{selectedItem.applicant}</p>
                    <p className="text-xs text-on-surface-variant">{selectedItem.department}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-surface-low rounded-lg text-primary"><MapPin size={18} /></div>
                  <div>
                    <p className="text-[10px] text-outline uppercase tracking-wider">预约会议室</p>
                    <p className="text-sm font-bold text-on-surface">{selectedItem.room}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-surface-low rounded-lg text-primary"><Calendar size={18} /></div>
                  <div>
                    <p className="text-[10px] text-outline uppercase tracking-wider">预约日期</p>
                    <p className="text-sm font-bold text-on-surface font-mono">{selectedItem.time}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-surface-low rounded-lg text-primary"><Clock size={18} /></div>
                  <div>
                    <p className="text-[10px] text-outline uppercase tracking-wider">会议时间段</p>
                    <p className="text-sm font-bold text-on-surface font-mono">{selectedItem.duration}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-surface-low rounded-xl space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-white rounded-lg text-primary shadow-sm"><FileText size={18} /></div>
                <div className="flex-1">
                  <p className="text-[10px] text-outline uppercase tracking-wider">会议主题</p>
                  <p className="text-sm font-bold text-on-surface mb-2">{selectedItem.subject}</p>
                  <p className="text-[10px] text-outline uppercase tracking-wider">申请事由</p>
                  <p className="text-xs text-on-surface-variant leading-relaxed">{selectedItem.reason}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 pt-2 border-t border-white/50">
                <div className="p-2 bg-white rounded-lg text-primary shadow-sm"><UsersIcon size={18} /></div>
                <div>
                  <p className="text-[10px] text-outline uppercase tracking-wider">预计参会人数</p>
                  <p className="text-sm font-bold text-on-surface">{selectedItem.attendees} 人</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[10px] text-outline">
              <AlarmClock size={12} />
              提交于 {selectedItem.submitTime}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
