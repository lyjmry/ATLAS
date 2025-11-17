
import React from 'react';

interface HeaderProps {
    activeView: string;
    setActiveView: (view: string) => void;
}

const NavLink: React.FC<{
    isActive: boolean;
    onClick: () => void;
    children: React.ReactNode;
}> = ({ isActive, onClick, children }) => {
    const activeClasses = 'bg-slate-700 text-cyan-300';
    const inactiveClasses = 'text-gray-400 hover:bg-slate-700 hover:text-white';
    return (
        <button
            onClick={onClick}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${isActive ? activeClasses : inactiveClasses}`}
        >
            {children}
        </button>
    );
};

const Header: React.FC<HeaderProps> = ({ activeView, setActiveView }) => {
    return (
        <header className="bg-slate-900/80 backdrop-blur-sm shadow-lg shadow-cyan-500/10 sticky top-0 z-50">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                             <h1 className="text-2xl font-bold text-white tracking-wider">
                                STAR ATLAS <span className="text-cyan-400">AI 代理</span>
                            </h1>
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <NavLink isActive={activeView === 'dashboard'} onClick={() => setActiveView('dashboard')}>仪表盘</NavLink>
                            <NavLink isActive={activeView === 'mission'} onClick={() => setActiveView('mission')}>任务控制</NavLink>
                            <NavLink isActive={activeView === 'fleet'} onClick={() => setActiveView('fleet')}>舰队管理</NavLink>
                            <NavLink isActive={activeView === 'guild'} onClick={() => setActiveView('guild')}>公会中心</NavLink>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
