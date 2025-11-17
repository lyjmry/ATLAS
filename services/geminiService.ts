import { GoogleGenAI, Type } from "@google/genai";
import { Ship, PlanStep } from '../types';

// Fix: Per coding guidelines, initialize GoogleGenAI directly with process.env.API_KEY
// and assume it is always available in the environment.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const planSchema = {
    type: Type.OBJECT,
    properties: {
        plan: {
            type: Type.ARRAY,
            description: "The detailed mission plan steps.",
            items: {
                type: Type.OBJECT,
                properties: {
                    step: { type: Type.INTEGER, description: "The step number." },
                    title: { type: Type.STRING, description: "A concise title for the step." },
                    description: { type: Type.STRING, description: "A detailed explanation of what to do in this step." },
                    rationale: { type: Type.STRING, description: "Why this step is important for the overall objective." }
                },
                required: ["step", "title", "description", "rationale"]
            }
        }
    },
    required: ["plan"]
};


export const generateMissionPlan = async (objective: string, ships: Ship[]): Promise<PlanStep[]> => {
    const shipDetails = ships.map(s => `- ${s.name} (${s.type}), Status: ${s.status}, Health: ${s.health}%`).join('\n');
    
    const prompt = `
        您是一位经验丰富的星际地图（Star Atlas）舰队指挥官和战略家。
        根据玩家当前的状态和目标，生成一个详细的、分步的任务计划。

        玩家状态:
        - 舰队:
        ${shipDetails}
        - 资源: 充足的燃料、弹药和食物。
        - 公会: 隶属于一个活跃的中型公会。

        玩家目标:
        "${objective}"

        您的回复必须是一个JSON对象，其中包含一个名为 'plan' 的键，该键的值是一个对象数组。数组中的每个对象代表计划中的一个步骤，并且必须具有以下结构：
        {
          "step": number,
          "title": "此步骤的简洁标题 (例如, '舰队配置')",
          "description": "关于此步骤该做什么的详细说明。",
          "rationale": "为什么此步骤对总体目标很重要。"
        }
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-pro",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: planSchema,
            },
        });
        
        // Fix: Added .trim() to response text before parsing as per guidelines for JSON responses.
        const jsonText = response.text.trim();
        const parsedResponse = JSON.parse(jsonText);
        
        if (parsedResponse && Array.isArray(parsedResponse.plan)) {
            return parsedResponse.plan;
        } else {
            console.error("Invalid plan structure received:", parsedResponse);
            throw new Error("AI未能生成有效的任务计划。");
        }

    } catch (error) {
        console.error("Error generating mission plan with Gemini:", error);
        throw new Error("与AI代理通信失败。请检查您的API密钥和网络连接。");
    }
};