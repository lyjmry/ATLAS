import React from 'react';
import { Ship, Mission, GuildMember } from '../types';

// Fix: Replaced JSX.Element with React.ReactNode to resolve "Cannot find namespace 'JSX'" error.
const StatCard: React.FC<{ title: string; value: string | number; icon: React.ReactNode; onClick?: () => void, color: string }> = ({ title, value, icon, onClick, color }) => (
    <div 
        className={`bg-slate-800/50 border border-slate-700 rounded-lg p-6 flex flex-col justify-between hover:border-${color}-500 hover:shadow-lg hover:shadow-${color}-500/20 transition-all duration-300 cursor-pointer`}
        onClick={onClick}
    >
        <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-400">{title}</p>
            <div className={`text-${color}-400`}>{icon}</div>
        </div>
        <p className="text-3xl font-bold text-white mt-2">{value}</p>
    </div>
);

const ShipIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12V3H3v9a2 2 0 002 2h14a2 2 0 002-2V3h-2v9M5 12H3m2 0h14m0 0H5m14 0v3a2 2 0 01-2 2H7a2 2 0 01-2-2v-3" /></svg>;
const MissionIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13v-6m0 6l5.447-2.724A1 1 0 0015 16.382V5.618a1 1 0 00-1.447-.894L9 7m0 0l6 3m-6-3V4a1 1 0 011-1h2a1 1 0 011 1v3m-3 0l6 3m6 0l-6-3m6 3v6.382a1 1 0 01-.553.894L15 20m0-13v6m0 0l-6-3" /></svg>;
const GuildIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a3.004 3.004 0 015.288 0M12 14a3 3 0 100-6 3 3 0 000 6z" /></svg>;

interface DashboardProps {
    ships: Ship[];
    missions: Mission[];
    members: GuildMember[];
    setActiveView: (view: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ ships, missions, members, setActiveView }) => {
    const readyShips = ships.filter(s => s.status === '待命').length;
    const activeMissions = missions.filter(m => m.status === '进行中').length;
    const onlineMembers = members.filter(m => m.online).length;

    return (
        <div>
            <h2 className="text-3xl font-bold text-white mb-6">指挥官仪表盘</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <StatCard title="可用舰船" value={`${readyShips} / ${ships.length}`} icon={<ShipIcon />} onClick={() => setActiveView('fleet')} color="cyan" />
                <StatCard title="进行中任务" value={activeMissions} icon={<MissionIcon />} onClick={() => setActiveView('mission')} color="blue" />
                <StatCard title="在线公会成员" value={`${onlineMembers} / ${members.length}`} icon={<GuildIcon />} onClick={() => setActiveView('guild')} color="indigo" />
            </div>

            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 hover:border-cyan-500 transition-colors duration-300">
                <h3 className="text-xl font-semibold text-cyan-300 mb-4">快速行动</h3>
                <p className="text-gray-400 mb-6">选择一个目标，让AI代理为您规划最佳行动方案。</p>
                <button
                    onClick={() => setActiveView('mission')}
                    className="w-full bg-cyan-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-cyan-500 transition-all duration-300 shadow-lg shadow-cyan-500/20"
                >
                    前往任务控制中心
                </button>
            </div>
        </div>
    );
};

export default Dashboard;