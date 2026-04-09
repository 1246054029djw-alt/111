import React from 'react';
import { 
  Calendar, 
  PieChart, 
  Clock, 
  CheckCircle2, 
  TrendingUp, 
  MapPin, 
  AlertCircle,
  ChevronRight,
  Activity
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

const stats = [
  { label: '今日会议数', value: '12', trend: '+2', trendLabel: '较昨日', icon: Calendar, color: 'text-primary', bg: 'bg-primary/10' },
  { label: '会议室使用率', value: '78%', progress: 78, icon: PieChart, color: 'text-secondary', bg: 'bg-secondary/10' },
  { label: '待审批申请', value: '05', sub: '紧急待办申请 2 项', icon: Clock, color: 'text-error', bg: 'bg-error/10' },
  { label: '今日签到率', value: '92%', sub: '实到 156 人 / 应到 170 人', icon: CheckCircle2, color: 'text-tertiary', bg: 'bg-tertiary/10' },
];

const timeline = [
  { time: '09:00 - 10:30', title: '靖江枢纽工程进度周例会', location: '1号综合会议室', status: '进行中', statusColor: 'bg-green-50 text-green-600', active: true },
  { time: '11:00 - 12:00', title: '三季度财务结算工作部署', location: '4号多功能厅', status: '待开始', statusColor: 'bg-blue-50 text-blue-600', active: false },
  { time: '14:30 - 16:00', title: '安全文明施工管理培训', location: '中型报告厅', status: '待开始', statusColor: 'bg-blue-50 text-blue-600', active: false },
];

const ranking = [
  { name: '1号综合会议室', value: 24, max: 25, unit: '场/月', percent: 95 },
  { name: '4号多功能厅', value: 18, max: 25, unit: '场/月', percent: 72 },
  { name: '中型报告厅', value: 15, max: 25, unit: '场/月', percent: 60 },
  { name: '党建活动室', value: 12, max: 25, unit: '场/月', percent: 48 },
];

const alerts = [
  { type: '紧急审批', time: '10分钟前', title: '年度工程总结汇报会议', applicant: '工程管理部 - 张建国', border: 'border-error', tagColor: 'text-error' },
  { type: '普通预约', time: '2小时前', title: '工会季度研讨会', applicant: '行政办公室 - 李梅', border: 'border-primary', tagColor: 'text-primary' },
];

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold text-on-surface">工作台概览</h1>
        <p className="text-on-surface-variant mt-1">欢迎回来，今日共有 12 场会议安排。</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white rounded-lg p-6 ghost-border shadow-sm flex flex-col justify-between h-40">
            <div className="flex justify-between items-start">
              <span className="text-on-surface-variant font-medium text-sm">{stat.label}</span>
              <div className={cn("p-2 rounded-lg", stat.bg, stat.color)}>
                <stat.icon size={20} />
              </div>
            </div>
            <div>
              <p className="text-4xl font-bold font-mono">{stat.value}</p>
              {stat.trend && (
                <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                  <TrendingUp size={14} />
                  {stat.trendLabel} {stat.trend}
                </p>
              )}
              {stat.progress !== undefined && (
                <div className="w-full bg-surface-low h-1.5 rounded-full mt-3">
                  <div className="signature-gradient h-1.5 rounded-full" style={{ width: `${stat.progress}%` }}></div>
                </div>
              )}
              {stat.sub && (
                <p className="text-xs text-on-surface-variant mt-2">{stat.sub}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Today's Meetings Timeline */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg p-6 ghost-border shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">今日会议动态</h2>
              <button className="text-primary text-xs font-medium hover:underline">查看全天日程</button>
            </div>
            <div className="space-y-8 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[1px] before:bg-outline-variant/30">
              {timeline.map((item, i) => (
                <div key={i} className="relative pl-10">
                  <div className={cn(
                    "absolute left-0 top-1 w-[22px] h-[22px] rounded-full bg-white border-4 z-10",
                    item.active ? "border-primary" : "border-outline-variant"
                  )}></div>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <p className={cn("font-mono font-bold mb-1", item.active ? "text-primary" : "text-on-surface-variant")}>
                        {item.time}
                      </p>
                      <h3 className="font-medium text-on-surface">{item.title}</h3>
                      <p className="text-xs text-on-surface-variant mt-1 flex items-center gap-1">
                        <MapPin size={14} />
                        {item.location}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={cn("px-2.5 py-1 text-[10px] font-bold rounded uppercase", item.statusColor)}>
                        {item.status}
                      </span>
                      <button className="ghost-border px-3 py-1.5 text-xs rounded-lg hover:bg-surface-low transition-colors">详情</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Ranking List */}
          <div className="bg-white rounded-lg p-6 ghost-border shadow-sm">
            <h2 className="text-lg font-semibold mb-6">会议室使用频率排行榜</h2>
            <div className="space-y-5">
              {ranking.map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between items-center text-xs mb-2">
                    <span className="font-medium">{item.name}</span>
                    <span className="text-on-surface-variant">{item.value} {item.unit}</span>
                  </div>
                  <div className="w-full bg-surface-low h-2 rounded-full overflow-hidden">
                    <div 
                      className="signature-gradient h-full rounded-full transition-all duration-1000" 
                      style={{ width: `${item.percent}%`, opacity: 1 - (i * 0.2) }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Side Panels */}
        <div className="space-y-8">
          {/* Pending Approvals */}
          <div className="bg-white rounded-lg p-6 ghost-border shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">待审批提醒</h2>
              <span className="bg-error text-white text-[10px] font-bold px-2 py-0.5 rounded-full">5</span>
            </div>
            <div className="space-y-4">
              {alerts.map((alert, i) => (
                <div key={i} className={cn("bg-surface-low/50 p-4 rounded-lg border-l-4", alert.border)}>
                  <div className="flex justify-between items-start mb-2">
                    <span className={cn("text-[10px] font-bold uppercase", alert.tagColor)}>{alert.type}</span>
                    <span className="text-[10px] text-on-surface-variant font-mono">{alert.time}</span>
                  </div>
                  <h4 className="text-sm font-semibold mb-1">{alert.title}</h4>
                  <p className="text-xs text-on-surface-variant line-clamp-1">申请人：{alert.applicant}</p>
                  <div className="mt-3 flex gap-2">
                    {alert.type === '紧急审批' ? (
                      <>
                        <button className="flex-1 bg-white ghost-border py-1.5 text-xs rounded hover:bg-green-50 hover:text-green-600 transition-all">通过</button>
                        <button className="flex-1 bg-white ghost-border py-1.5 text-xs rounded hover:bg-error/10 hover:text-error transition-all">驳回</button>
                      </>
                    ) : (
                      <button className="flex-1 bg-white ghost-border py-1.5 text-xs rounded hover:bg-primary/10 hover:text-primary transition-all">查看</button>
                    )}
                  </div>
                </div>
              ))}
              <button className="w-full py-3 text-primary text-xs font-medium border border-dashed border-primary/30 rounded-lg hover:bg-primary/5 transition-all">
                进入审批中心处理更多
              </button>
            </div>
          </div>

          {/* System Status */}
          <div className="bg-surface-high rounded-lg p-6 shadow-sm overflow-hidden relative">
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
            <h2 className="text-sm font-semibold mb-4 relative z-10 flex items-center gap-2">
              <Activity size={16} className="text-primary" />
              设备运行状态
            </h2>
            <div className="space-y-4 relative z-10">
              {[
                { label: '中控系统', status: '运行正常', color: 'bg-green-500', text: 'text-green-600', bg: 'bg-green-50' },
                { label: '视频采集端', status: '运行正常', color: 'bg-green-500', text: 'text-green-600', bg: 'bg-green-50' },
                { label: '签到一体机', status: '负载较高', color: 'bg-yellow-500', text: 'text-yellow-600', bg: 'bg-yellow-50' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={cn("w-2 h-2 rounded-full", item.color)}></div>
                    <span className="text-xs font-medium">{item.label}</span>
                  </div>
                  <span className={cn("text-[10px] px-2 py-0.5 rounded", item.text, item.bg)}>{item.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
