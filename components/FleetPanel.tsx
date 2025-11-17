
import React from 'react';
import { Ship } from '../types';

const HealthBar: React.FC<{ health: number }> = ({ health }) => {
    const getColor = (h: number) => {
        if (h > 70) return 'bg-green-500';
        if (h > 40) return 'bg-yellow-500';
        return 'bg-red-500';
    };

    return (
        <div className="w-full bg-slate-700 rounded-full h-2.5">
            <div className={`${getColor(health)} h-2.5 rounded-full`} style={{ width: `${health}%` }}></div>
        </div>
    );
};

const getStatusChipClasses = (status: Ship['status']) => {
    switch (status) {
        case '待命':
            return 'bg-green-500/20 text-green-300';
        case '任务中':
            return 'bg-blue-500/20 text-blue-300';
        case '维修中':
            return 'bg-yellow-500/20 text-yellow-300';
        default:
            return 'bg-gray-500/20 text-gray-300';
    }
}

interface FleetPanelProps {
    ships: Ship[];
}

const FleetPanel: React.FC<FleetPanelProps> = ({ ships }) => {
    return (
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 hover:border-cyan-500 transition-colors duration-300">
            <h2 className="text-2xl font-bold text-cyan-300 mb-6">舰队管理</h2>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="border-b border-slate-600 text-sm text-gray-400">
                        <tr>
                            <th className="p-3">名称</th>
                            <th className="p-3">类型</th>
                            <th className="p-3">状态</th>
                            <th className="p-3">位置</th>
                            <th className="p-3 w-1/4">健康度</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700">
                        {ships.map((ship) => (
                            <tr key={ship.id} className="hover:bg-slate-800 transition-colors">
                                <td className="p-3 font-medium text-white">{ship.name}</td>
                                <td className="p-3 text-gray-300">{ship.type}</td>
                                <td className="p-3">
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusChipClasses(ship.status)}`}>
                                        {ship.status}
                                    </span>
                                </td>
                                <td className="p-3 text-gray-300">{ship.location}</td>
                                <td className="p-3">
                                    <div className="flex items-center space-x-2">
                                        <HealthBar health={ship.health} />
                                        <span className="text-sm font-mono text-gray-300">{ship.health}%</span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default FleetPanel;
