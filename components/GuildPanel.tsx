
import React from 'react';
import { GuildMember } from '../types';

const getRankColor = (rank: GuildMember['rank']) => {
    switch (rank) {
        case '公会领袖': return 'text-yellow-400';
        case '军官': return 'text-sky-400';
        case '成员': return 'text-gray-300';
        default: return 'text-gray-400';
    }
};

interface GuildPanelProps {
    members: GuildMember[];
}

const GuildPanel: React.FC<GuildPanelProps> = ({ members }) => {
    return (
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 hover:border-indigo-500 transition-colors duration-300">
            <h2 className="text-2xl font-bold text-indigo-300 mb-6">公会中心</h2>
            <ul className="divide-y divide-slate-700">
                <li className="flex justify-between items-center py-2 px-3 text-sm font-semibold text-gray-400">
                    <span>成员</span>
                    <span>贡献度</span>
                </li>
                {members.map((member) => (
                    <li key={member.id} className="flex justify-between items-center py-4 px-3 hover:bg-slate-800 rounded-lg transition-colors">
                        <div className="flex items-center space-x-4">
                            <span
                                className={`h-3 w-3 rounded-full ${member.online ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`}
                                title={member.online ? '在线' : '离线'}
                            ></span>
                            <div>
                                <p className="font-medium text-white">{member.name}</p>
                                <p className={`text-sm ${getRankColor(member.rank)}`}>{member.rank}</p>
                            </div>
                        </div>
                        <div className="text-right">
                           <p className="font-mono text-lg text-indigo-300">{member.contribution.toLocaleString()}</p>
                           <p className="text-xs text-gray-400">总贡献</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GuildPanel;
