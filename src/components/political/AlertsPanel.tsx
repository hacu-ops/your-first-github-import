import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Info, AlertCircle, Bell } from "lucide-react";
import { PoliticalMetrics } from "@/utils/politicalData";

interface AlertsPanelProps {
  alerts: PoliticalMetrics['alerts'];
}

const AlertsPanel = ({ alerts }: AlertsPanelProps) => {
  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical': return <AlertTriangle className="h-5 w-5 text-red-300" />;
      case 'warning': return <AlertCircle className="h-5 w-5 text-yellow-300" />;
      case 'info': return <Info className="h-5 w-5 text-blue-300" />;
      default: return <Bell className="h-5 w-5 text-gray-300" />;
    }
  };

  const getAlertStyle = (type: string) => {
    switch (type) {
      case 'critical': 
        return 'bg-gradient-to-br from-red-500/20 to-red-500/10 border-red-500/30 hover:border-red-500/50 shadow-lg shadow-red-900/20';
      case 'warning': 
        return 'bg-gradient-to-br from-yellow-500/20 to-yellow-500/10 border-yellow-500/30 hover:border-yellow-500/50';
      case 'info': 
        return 'bg-gradient-to-br from-blue-500/20 to-blue-500/10 border-blue-500/30 hover:border-blue-500/50';
      default: 
        return 'bg-gradient-to-br from-gray-500/20 to-gray-500/10 border-gray-500/30 hover:border-gray-500/50';
    }
  };

  const getIconBg = (type: string) => {
    switch (type) {
      case 'critical': return 'bg-red-500/20';
      case 'warning': return 'bg-yellow-500/20';
      case 'info': return 'bg-blue-500/20';
      default: return 'bg-gray-500/20';
    }
  };

  const getAlertTypeLabel = (type: string) => {
    switch (type) {
      case 'critical': return 'Alerta Crítico';
      case 'warning': return 'Atenção Necessária';
      case 'info': return 'Informativo';
      default: return 'Alerta';
    }
  };

  const getPriorityOrder = (type: string) => {
    switch (type) {
      case 'critical': return 1;
      case 'warning': return 2;
      case 'info': return 3;
      default: return 4;
    }
  };

  const sortedAlerts = [...alerts].sort((a, b) => 
    getPriorityOrder(a.type) - getPriorityOrder(b.type)
  );

  return (
    <Card className="glass-card border-white/10 h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-white flex items-center gap-2 text-lg font-bold">
          <Bell className="h-5 w-5 text-yellow-400" />
          Alertas Inteligentes
        </CardTitle>
        <p className="text-sm text-white/70">
          Sistema de monitoramento em tempo real
        </p>
      </CardHeader>
      
      <CardContent className="pt-2">
        <div className="space-y-3">
          {sortedAlerts.map((alert, index) => (
            <div 
              key={index}
              className={`relative overflow-hidden p-4 rounded-xl border transition-all duration-300 ${getAlertStyle(alert.type)}`}
            >
              <div className="flex items-start gap-4">
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${getIconBg(alert.type)}`}>
                  {getAlertIcon(alert.type)}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-white mb-1">{getAlertTypeLabel(alert.type)}</h4>
                    <div className={`text-sm font-bold ${alert.value > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                      {alert.value > 0 ? '+' : ''}{alert.value}%
                    </div>
                  </div>
                  <p className="text-sm text-white/80 mb-2">
                    {alert.message}
                  </p>
                  <div className="text-xs text-white/60">
                    Tendência: {alert.trend > 0 ? '+' : ''}{alert.trend}%
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="p-3 rounded-xl bg-red-900/30 border border-red-500/30 text-center">
            <p className="text-lg font-bold text-red-300">
              {alerts.filter(a => a.type === 'critical').length}
            </p>
            <p className="text-xs text-red-400/80 font-semibold">Críticos</p>
          </div>
          <div className="p-3 rounded-xl bg-yellow-900/30 border border-yellow-500/30 text-center">
            <p className="text-lg font-bold text-yellow-300">
              {alerts.filter(a => a.type === 'warning').length}
            </p>
            <p className="text-xs text-yellow-400/80 font-semibold">Atenção</p>
          </div>
          <div className="p-3 rounded-xl bg-blue-900/30 border border-blue-500/30 text-center">
            <p className="text-lg font-bold text-blue-300">
              {alerts.filter(a => a.type === 'info').length}
            </p>
            <p className="text-xs text-blue-400/80 font-semibold">Informativos</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AlertsPanel;