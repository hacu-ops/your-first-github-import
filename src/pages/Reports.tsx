import { useState } from "react";
import { useSidebarState } from "@/hooks/useSidebarState";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Hash, ArrowUp, ArrowDown, Minus, Download } from "lucide-react";

const generateTop100Topics = () => {
    const baseTopics = [
        'Reforma da Saúde', 'Segurança Pública', 'Educação Técnica', 'Economia Regional', 
        'Meio Ambiente', 'Transporte Público', 'Habitação Popular', 'Cultura Paranaense',
        'Infraestrutura Viária', 'Geração de Empregos', 'Turismo Local', 'Saneamento Básico',
        'Apoio ao Agronegócio', 'Inovação e Tecnologia', 'Combate à Corrupção', 'Esporte e Lazer'
    ];
    const sentiments: ('positive' | 'negative' | 'neutral')[] = ['positive', 'negative', 'neutral'];
    const topics = [];
    for (let i = 0; i < 100; i++) {
        topics.push({
            topic: `${baseTopics[i % baseTopics.length]} #${Math.floor(i / baseTopics.length) + 1}`,
            mentions: Math.floor(Math.random() * 2000) + 500,
            sentiment: sentiments[Math.floor(Math.random() * sentiments.length)],
            change: Math.floor(Math.random() * 60) - 30,
        });
    }
    return topics.sort((a, b) => b.mentions - a.mentions);
};

const Reports = () => {
    const { isCollapsed, toggleSidebar } = useSidebarState();
    const topics = generateTop100Topics();

    const getTrendIcon = (change: number) => {
        if (change > 0) return <ArrowUp className="h-3 w-3 text-emerald-400" />;
        if (change < 0) return <ArrowDown className="h-3 w-3 text-red-400" />;
        return <Minus className="h-3 w-3 text-gray-400" />;
    };

    const getSentimentColor = (sentiment: string) => {
        switch (sentiment) {
            case 'positive': return 'text-emerald-400 bg-emerald-400/20 border-emerald-400/30';
            case 'negative': return 'text-red-400 bg-red-400/20 border-red-400/30';
            default: return 'text-gray-400 bg-gray-400/20 border-gray-400/30';
        }
    };

    return (
        <div className="flex min-h-screen">
            <Sidebar isCollapsed={isCollapsed} onToggle={toggleSidebar} />
            <div className={`flex-1 min-w-0 transition-all duration-300 ${isCollapsed ? 'ml-28' : 'ml-72'}`}>
                <div className="p-6 max-w-screen-2xl mx-auto space-y-6">
                    {/* Header */}
                    <div className="flex items-center justify-between animate-fade-in-up">
                        <div>
                            <h1 className="text-3xl font-bold text-white">Relatórios de Assuntos</h1>
                            <p className="text-white/70 mt-1">Análise detalhada dos 100 tópicos mais discutidos.</p>
                        </div>
                        <Button variant="outline" className="glass-card border-white/20">
                            <Download className="h-4 w-4 mr-2" />
                            Exportar Relatório
                        </Button>
                    </div>

                    {/* Topics List */}
                    <Card className="glass-card border-white/10 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-2">
                                <Hash className="h-5 w-5 text-orange-400" />
                                TOP 100 Assuntos em Alta
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3 max-h-[70vh] overflow-y-auto">
                                {topics.map((topic, index) => (
                                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
                                        <div className="flex items-center gap-3 flex-1">
                                            <div className="text-sm font-bold text-white/50 w-8 text-center">
                                                #{index + 1}
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-semibold text-white">{topic.topic}</h4>
                                                <p className="text-xs text-white/60">{topic.mentions.toLocaleString('pt-BR')} menções</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className={`px-2 py-1 rounded-md text-xs font-medium border ${getSentimentColor(topic.sentiment)}`}>
                                                {topic.sentiment === 'positive' ? 'Positivo' : topic.sentiment === 'negative' ? 'Negativo' : 'Neutro'}
                                            </span>
                                            <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-white/5 border border-white/10">
                                                {getTrendIcon(topic.change)}
                                                <span className={`text-xs font-semibold ${topic.change > 0 ? 'text-emerald-400' : topic.change < 0 ? 'text-red-400' : 'text-gray-400'}`}>
                                                    {topic.change > 0 ? '+' : ''}{topic.change}%
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Reports;