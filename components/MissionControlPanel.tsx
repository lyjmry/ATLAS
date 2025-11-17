
import React, { useState, useCallback } from 'react';
import { generateMissionPlan } from '../services/geminiService';
import { PlanStep, Ship } from '../types';

const LoadingSpinner: React.FC = () => (
    <div className="flex items-center justify-center space-x-2">
        <div className="w-4 h-4 rounded-full animate-pulse bg-cyan-400"></div>
        <div className="w-4 h-4 rounded-full animate-pulse bg-cyan-400 delay-200"></div>
        <div className="w-4 h-4 rounded-full animate-pulse bg-cyan-400 delay-400"></div>
        <span className="ml-2 text-gray-300">AI 正在思考...</span>
    </div>
);

interface MissionControlPanelProps {
    ships: Ship[];
}

const MissionControlPanel: React.FC<MissionControlPanelProps> = ({ ships }) => {
    const [objective, setObjective] = useState('');
    const [plan, setPlan] = useState<PlanStep[] | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [activeStep, setActiveStep] = useState<number | null>(null);

    const handleGeneratePlan = useCallback(async () => {
        if (!objective.trim()) {
            setError("请输入您的任务目标。");
            return;
        }
        setIsLoading(true);
        setError(null);
        setPlan(null);
        try {
            const generatedPlan = await generateMissionPlan(objective, ships);
            setPlan(generatedPlan);
        } catch (err) {
            setError(err instanceof Error ? err.message : "发生未知错误。");
        } finally {
            setIsLoading(false);
        }
    }, [objective, ships]);

    return (
        <div className="space-y-8">
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 hover:border-blue-500 transition-colors duration-300">
                <h2 className="text-2xl font-bold text-blue-300 mb-4">AI 任务规划中心</h2>
                <p className="text-gray-400 mb-4">在这里输入您的战略目标，AI 代理将为您制定详细的行动计划。</p>
                <div className="space-y-4">
                    <textarea
                        value={objective}
                        onChange={(e) => setObjective(e.target.value)}
                        placeholder="例如: '最大化本周的采矿利润' 或 '在邻近星区建立防御前哨'..."
                        className="w-full p-3 bg-slate-900 border border-slate-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-200 resize-none h-24"
                        disabled={isLoading}
                    />
                    <button
                        onClick={handleGeneratePlan}
                        disabled={isLoading}
                        className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-500 disabled:bg-slate-600 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-blue-500 transition-all duration-300 shadow-lg shadow-blue-500/20"
                    >
                        {isLoading ? <LoadingSpinner /> : '生成计划'}
                    </button>
                </div>
                {error && <p className="text-red-400 mt-4 text-center">{error}</p>}
            </div>

            {plan && (
                <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-white mb-4">行动计划: <span className="text-blue-400">{objective}</span></h3>
                    <div className="space-y-3">
                        {plan.map((step) => (
                            <div key={step.step} className="border border-slate-700 rounded-lg overflow-hidden">
                                <button
                                    onClick={() => setActiveStep(activeStep === step.step ? null : step.step)}
                                    className="w-full text-left p-4 bg-slate-700 hover:bg-slate-600 flex justify-between items-center transition-colors"
                                >
                                    <h4 className="font-semibold text-lg text-gray-200">
                                        <span className="text-blue-400 mr-3">步骤 {step.step}:</span> {step.title}
                                    </h4>
                                    <span className={`transform transition-transform duration-200 ${activeStep === step.step ? 'rotate-180' : ''}`}>▼</span>
                                </button>
                                {activeStep === step.step && (
                                    <div className="p-4 bg-slate-800 space-y-3">
                                        <p className="text-gray-300"><strong className="text-white">描述:</strong> {step.description}</p>
                                        <p className="text-gray-400 italic"><strong className="text-gray-200 not-italic">理由:</strong> {step.rationale}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MissionControlPanel;
