
import React, { useState } from 'react';
import Header from './components/Header';
import MissionControlPanel from './components/MissionControlPanel';
import FleetPanel from './components/FleetPanel';
import GuildPanel from './components/GuildPanel';
import Dashboard from './components/Dashboard';
import { Ship, GuildMember, Mission } from './types';

const App: React.FC = () => {
    const [activeView, setActiveView] = useState('dashboard');

    // Mock Data
    const mockShips: Ship[] = [
        { id: '1', name: 'Pearce X4', type: '战斗机', status: '待命', location: '空间站 A', health: 100 },
        { id: '2', name: 'Opal Jet', type: '运输机', status: '任务中', location: '小行星带 B', health: 85 },
        { id: '3', name: 'Calico Guardian', type: '护卫舰', status: '维修中', location: '空间站 A', health: 40 },
        { id: '4', name: 'VZUS Sol', type: '探索船', status: '待命', location: '星云 C', health: 95 },
    ];

    const mockGuildMembers: GuildMember[] = [
        { id: 'g1', name: '指挥官 Alex', rank: '公会领袖', contribution: 12500, online: true },
        { id: 'g2', name: '飞行员 Sarah', rank: '军官', contribution: 8700, online: true },
        { id: 'g3', name: '工程师 Mike', rank: '成员', contribution: 4200, online: false },
        { id: 'g4', name: '导航员 Chloe', rank: '成员', contribution: 5100, online: true },
    ];

    const mockMissions: Mission[] = [
      {id: 'm1', title: '小行星带货物运输', type: '运输', status: '进行中', reward: '1500 ATLAS'},
      {id: 'm2', title: '清除海盗前哨', type: '战斗', status: '可用', reward: '5000 ATLAS'},
      {id: 'm3', title: '星云勘探', type: '探索', status: '可用', reward: '2200 ATLAS'},
    ];


    const renderContent = () => {
        switch (activeView) {
            case 'mission':
                return <MissionControlPanel ships={mockShips} />;
            case 'fleet':
                return <FleetPanel ships={mockShips} />;
            case 'guild':
                return <GuildPanel members={mockGuildMembers} />;
            case 'dashboard':
            default:
                return <Dashboard ships={mockShips} missions={mockMissions} members={mockGuildMembers} setActiveView={setActiveView} />;
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0f1f] text-gray-200 font-sans">
            <Header activeView={activeView} setActiveView={setActiveView} />
            <main className="p-4 sm:p-6 lg:p-8">
                {renderContent()}
            </main>
        </div>
    );
};

export default App;
