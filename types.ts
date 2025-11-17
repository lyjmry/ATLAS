
export interface Ship {
    id: string;
    name: string;
    type: '战斗机' | '运输机' | '护卫舰' | '探索船';
    status: '待命' | '任务中' | '维修中';
    location: string;
    health: number;
}

export interface GuildMember {
    id: string;
    name: string;
    rank: '公会领袖' | '军官' | '成员';
    contribution: number;
    online: boolean;
}

export interface Mission {
    id: string;
    title: string;
    type: '运输' | '战斗' | '探索';
    status: '进行中' | '可用' | '已完成';
    reward: string;
}

export interface PlanStep {
    step: number;
    title: string;
    description: string;
    rationale: string;
}
