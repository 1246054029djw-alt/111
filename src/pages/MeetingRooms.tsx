import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  ChevronLeft, 
  ChevronRight,
  Monitor,
  Video,
  Mic,
  Cast,
  Layout,
  Smartphone,
  Settings2,
  Activity,
  Link2
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import Modal from '@/src/components/Modal';

const rooms = [
  {
    id: 1,
    name: '江海厅 (VIP)',
    location: '行政楼 A座 801',
    capacity: 50,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAWidp5e5uEXe8PN0upFrRI0jRMwvqVNatEJDI5EqCOLe8V5llxFyJK5jQ-KvSx-AUPWbI2WB1M7IRI02f6vwvpEjTJeprenNs_o9T66aIW77_r09stIoTHWmLL2Iag4djOaBSPAJxvy4XeiWiBkRgNlc2UiNwgiDarXGmCWj6oICslDWrqRtWiv4z7ngxDOKPIq1ET8BDhGoaWySeoy4kdZGC33AXMCpvOkd-MADIZVMcqjgN0irBvnfe2AQztd-YwlPSSx8s1rKsx',
    equipment: ['投影仪', '白板', '麦克风', '视频终端'],
    status: '可用',
    statusColor: 'bg-green-50 text-green-700',
    dotColor: 'bg-green-500'
  },
  {
    id: 2,
    name: '靖江阁',
    location: '科研楼 B座 204',
    capacity: 12,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQdxh9TfS6HLze_qP2dcforFM8zRTRB2mUszyaZSsrUWnKIMFett8L2hnm-jrlH5bTXVIrLcjfpEBRSpaxFAfdJEeTFbkH9-ibNb6wGvh1m7JMZlS0HXquugOT_-eo-IyAsTNoTYzCzlttziVJeaBgABlhTK4yOBpQFBAL-awyhqAcItQG1lWjs175QJutjNXi71Fn43SOk4bAfWaqtcgC7bXBKe7BDfiHdlyPVdRs_51lHGn3OPzFqk_iatMk8-gDK8rD5g_8aBuv',
    equipment: ['白板', '显示屏'],
    status: '已占用',
    statusColor: 'bg-blue-50 text-blue-700',
    dotColor: 'bg-blue-500'
  },
  {
    id: 3,
    name: '讨论间 03',
    location: '行政楼 C座 102',
    capacity: 6,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC5W75zR60IWvvaEf-hn2AHopnuqHhqMZ3GjoW97C_hOhWN8mhfGIxok4HWhM0EeWgJkDqKsCMs_ihpEiv9_4rsyEmq65XNejMARJ_gN3A1qTa8ROyaPZdj0w1msZpZwKAPRa05EqohQ7Mq-UaT9-qhAM_6uR32UYCBBkRczLME4jzqrWo5rVovVfPUBmzmlOCV8W2AMJ3QWUCQAWKJ2Ps2ntGgBPuEccpXolW51iZjocMcDVbJR5zuMmZlXcxRqSS31PaofKS6Z2oG',
    equipment: ['无线投屏'],
    status: '维修中',
    statusColor: 'bg-amber-50 text-amber-700',
    dotColor: 'bg-amber-500'
  }
];

const devices = [
  { id: 'DP-001', name: '门牌-江海厅', room: '江海厅 (VIP)', status: '在线', statusColor: 'text-green-600 bg-green-50', ip: '192.168.1.101' },
  { id: 'DP-002', name: '门牌-靖江阁', room: '靖江阁', status: '离线', statusColor: 'text-error bg-error/10', ip: '192.168.1.102' },
  { id: 'DP-003', name: '门牌-讨论间03', room: '讨论间 03', status: '在线', statusColor: 'text-green-600 bg-green-50', ip: '192.168.1.103' },
];

export default function MeetingRooms() {
  const [activeTab, setActiveTab] = useState<'info' | 'devices'>('info');
  const [isAddRoomModalOpen, setIsAddRoomModalOpen] = useState(false);
  const [isAddDeviceModalOpen, setIsAddDeviceModalOpen] = useState(false);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-semibold text-on-surface flex items-center gap-2">
            会议室管理
            <span className="text-[10px] font-normal bg-secondary/10 text-secondary px-2 py-0.5 rounded-full uppercase tracking-wider">R02-002 - R02-008</span>
          </h1>
          <p className="text-on-surface-variant mt-1 text-sm">管理和更新系统内所有会议室的基础设施、容纳能力及门牌设备状态。</p>
        </div>
        <div className="flex bg-surface-low p-1 rounded-lg">
          <button 
            onClick={() => setActiveTab('info')}
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-md transition-all flex items-center gap-2",
              activeTab === 'info' ? "bg-white text-primary shadow-sm" : "text-on-surface-variant hover:text-on-surface"
            )}
          >
            <Layout size={18} />
            信息维护
          </button>
          <button 
            onClick={() => setActiveTab('devices')}
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-md transition-all flex items-center gap-2",
              activeTab === 'devices' ? "bg-white text-primary shadow-sm" : "text-on-surface-variant hover:text-on-surface"
            )}
          >
            <Smartphone size={18} />
            门牌管理
          </button>
        </div>
      </div>

      {activeTab === 'info' ? (
        <div className="space-y-6">
          {/* Search & Filter Section */}
          <section className="bg-surface-low p-6 rounded-lg flex flex-wrap gap-6 items-end">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-semibold text-outline uppercase tracking-wider">会议室名称</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" size={16} />
                <input 
                  className="pl-10 pr-4 py-2 bg-white border-none rounded-lg text-sm focus:ring-2 focus:ring-primary w-64 shadow-sm" 
                  placeholder="输入名称关键字..." 
                  type="text"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-semibold text-outline uppercase tracking-wider">使用状态</label>
              <select className="pl-4 pr-10 py-2 bg-white border-none rounded-lg text-sm focus:ring-2 focus:ring-primary w-48 shadow-sm appearance-none cursor-pointer">
                <option>全部状态</option>
                <option>可用</option>
                <option>维修中</option>
                <option>已占用</option>
              </select>
            </div>
            <button className="bg-primary text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors h-[38px]">
              查询
            </button>
            <button 
              onClick={() => setIsAddRoomModalOpen(true)}
              className="signature-gradient text-white px-5 py-2 rounded-lg text-sm font-medium shadow-lg shadow-blue-500/20 active:scale-95 transition-transform h-[38px] flex items-center gap-2"
            >
              <Plus size={18} />
              新增会议室
            </button>
          </section>

          {/* Table Section */}
          <section className="bg-white rounded-lg shadow-sm overflow-hidden flex-1 flex flex-col">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-high/30">
                    <th className="px-6 py-4 text-[10px] font-semibold text-outline uppercase tracking-wider">会议室名称</th>
                    <th className="px-6 py-4 text-[10px] font-semibold text-outline uppercase tracking-wider">位置</th>
                    <th className="px-6 py-4 text-[10px] font-semibold text-outline uppercase tracking-wider">容纳人数</th>
                    <th className="px-6 py-4 text-[10px] font-semibold text-outline uppercase tracking-wider">设备配置</th>
                    <th className="px-6 py-4 text-[10px] font-semibold text-outline uppercase tracking-wider">当前状态</th>
                    <th className="px-6 py-4 text-[10px] font-semibold text-outline uppercase tracking-wider text-right">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-low">
                  {rooms.map((room) => (
                    <tr key={room.id} className="hover:bg-surface-low/50 transition-colors group">
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                            <img 
                              className="w-full h-full object-cover" 
                              src={room.image} 
                              alt={room.name}
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <span className="font-medium text-on-surface">{room.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-sm text-on-surface-variant">{room.location}</td>
                      <td className="px-6 py-5">
                        <span className="font-mono text-base font-semibold text-primary">{room.capacity}</span>
                        <span className="text-xs text-outline ml-1">人</span>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex flex-wrap gap-2">
                          {room.equipment.map((item, i) => (
                            <span key={i} className="px-2 py-0.5 bg-secondary/10 text-secondary text-[10px] rounded-full">
                              {item}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold", room.statusColor)}>
                          <span className={cn("w-1.5 h-1.5 rounded-full", room.dotColor)}></span>
                          {room.status}
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
          <section className="bg-surface-low p-6 rounded-lg flex flex-wrap gap-6 items-end">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-semibold text-outline uppercase tracking-wider">设备编号/名称</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" size={16} />
                <input 
                  className="pl-10 pr-4 py-2 bg-white border-none rounded-lg text-sm focus:ring-2 focus:ring-primary w-64 shadow-sm" 
                  placeholder="搜索设备..." 
                  type="text"
                />
              </div>
            </div>
            <button className="bg-primary text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors h-[38px]">
              查询
            </button>
            <button 
              onClick={() => setIsAddDeviceModalOpen(true)}
              className="signature-gradient text-white px-5 py-2 rounded-lg text-sm font-medium shadow-lg shadow-blue-500/20 active:scale-95 transition-transform h-[38px] flex items-center gap-2"
            >
              <Plus size={18} />
              添加设备
            </button>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {devices.map((device) => (
              <div key={device.id} className="bg-white p-6 rounded-xl shadow-sm ghost-border hover:shadow-md transition-shadow group">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-xl bg-surface-low text-primary flex items-center justify-center">
                    <Smartphone size={24} />
                  </div>
                  <span className={cn("px-2 py-0.5 rounded text-[10px] font-bold", device.statusColor)}>
                    {device.status}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-on-surface mb-1">{device.name}</h3>
                <p className="text-xs text-outline mb-4 flex items-center gap-1">
                  <Link2 size={12} />
                  绑定：{device.room}
                </p>
                <div className="space-y-3 border-t border-surface-high pt-4">
                  <div className="flex justify-between text-xs">
                    <span className="text-outline">设备编号</span>
                    <span className="font-mono text-on-surface">{device.id}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-outline">IP 地址</span>
                    <span className="font-mono text-on-surface">{device.ip}</span>
                  </div>
                </div>
                <div className="mt-6 flex gap-2">
                  <button className="flex-1 py-2 bg-primary/5 text-primary text-xs font-medium rounded-lg hover:bg-primary/10 transition-colors flex items-center justify-center gap-2">
                    <Settings2 size={14} />
                    配置
                  </button>
                  <button className="flex-1 py-2 bg-surface-low text-on-surface-variant text-xs font-medium rounded-lg hover:bg-surface-high transition-colors flex items-center justify-center gap-2">
                    <Activity size={14} />
                    监控
                  </button>
                </div>
              </div>
            ))}
          </section>
        </div>
      )}

      {/* Add Room Modal */}
      <Modal
        isOpen={isAddRoomModalOpen}
        onClose={() => setIsAddRoomModalOpen(false)}
        title="新增会议室"
        footer={
          <>
            <button onClick={() => setIsAddRoomModalOpen(false)} className="px-4 py-2 text-sm font-medium text-on-surface-variant hover:bg-surface-high rounded-lg">取消</button>
            <button className="px-6 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary/90 shadow-lg shadow-blue-500/10">确认保存</button>
          </>
        }
      >
        <form className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-on-surface-variant">会议室名称</label>
            <input className="w-full px-4 py-2 bg-surface-low border-none rounded-lg text-sm focus:ring-1 focus:ring-primary outline-none" placeholder="如：江海厅 (VIP)" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-on-surface-variant">容纳人数</label>
              <input className="w-full px-4 py-2 bg-surface-low border-none rounded-lg text-sm focus:ring-1 focus:ring-primary outline-none" type="number" placeholder="1-200" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-on-surface-variant">位置</label>
              <input className="w-full px-4 py-2 bg-surface-low border-none rounded-lg text-sm focus:ring-1 focus:ring-primary outline-none" placeholder="如：行政楼 A座 801" />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-on-surface-variant block mb-2">设备配置</label>
            <div className="flex flex-wrap gap-3">
              {['投影仪', '白板', '麦克风', '视频终端', '无线投屏', '显示屏'].map((item, i) => (
                <label key={i} className="flex items-center gap-2 cursor-pointer group">
                  <input type="checkbox" className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary" />
                  <span className="text-sm text-on-surface-variant group-hover:text-on-surface transition-colors">{item}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="pt-2">
            <label className="text-xs font-semibold text-on-surface-variant block mb-2">会议室照片</label>
            <div className="border-2 border-dashed border-outline-variant rounded-xl p-8 flex flex-col items-center justify-center gap-3 bg-surface-low/30 hover:bg-surface-low transition-colors cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-outline shadow-sm">
                <Plus size={24} />
              </div>
              <p className="text-xs text-outline">上传会议室实景照片</p>
            </div>
          </div>
        </form>
      </Modal>

      {/* Add Device Modal */}
      <Modal
        isOpen={isAddDeviceModalOpen}
        onClose={() => setIsAddDeviceModalOpen(false)}
        title="添加门牌设备"
        footer={
          <>
            <button onClick={() => setIsAddDeviceModalOpen(false)} className="px-4 py-2 text-sm font-medium text-on-surface-variant hover:bg-surface-high rounded-lg">取消</button>
            <button className="px-6 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary/90 shadow-lg shadow-blue-500/10">确认绑定</button>
          </>
        }
      >
        <form className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-on-surface-variant">设备编号</label>
            <input className="w-full px-4 py-2 bg-surface-low border-none rounded-lg text-sm font-mono focus:ring-1 focus:ring-primary outline-none" placeholder="如：DP-004" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-on-surface-variant">设备名称</label>
            <input className="w-full px-4 py-2 bg-surface-low border-none rounded-lg text-sm focus:ring-1 focus:ring-primary outline-none" placeholder="如：门牌-行政楼801" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-on-surface-variant">绑定会议室</label>
            <select className="w-full px-4 py-2 bg-surface-low border-none rounded-lg text-sm focus:ring-1 focus:ring-primary outline-none appearance-none">
              <option>请选择会议室</option>
              {rooms.map(r => <option key={r.id}>{r.name}</option>)}
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-on-surface-variant">IP 地址</label>
            <input className="w-full px-4 py-2 bg-surface-low border-none rounded-lg text-sm font-mono focus:ring-1 focus:ring-primary outline-none" placeholder="如：192.168.1.104" />
          </div>
        </form>
      </Modal>
    </div>
  );
}
