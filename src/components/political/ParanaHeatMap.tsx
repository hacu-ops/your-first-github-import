import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, TrendingUp, Users, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { getParanaGeoJson } from "@/data/mapData";

interface RegionData {
  name: string;
  popularity: number;
  trend: number;
  coordinates: { lat: number; lng: number };
  population: number;
  activeUsers: number;
}

const ParanaHeatMap = () => {
  const [selectedRegion, setSelectedRegion] = useState<RegionData | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const heatLayerRef = useRef<any>(null);

  // Dados das regiões do Paraná com coordenadas geográficas reais
  const regions: RegionData[] = [
    { name: "Curitiba", popularity: 95, trend: 12, coordinates: { lat: -25.429, lng: -49.271 }, population: 1963726, activeUsers: 156782 },
    { name: "Londrina", popularity: 78, trend: 8, coordinates: { lat: -23.310, lng: -51.163 }, population: 575377, activeUsers: 89342 },
    { name: "Maringá", popularity: 72, trend: -3, coordinates: { lat: -23.425, lng: -51.938 }, population: 436472, activeUsers: 67234 },
    { name: "Ponta Grossa", popularity: 68, trend: 15, coordinates: { lat: -25.095, lng: -50.163 }, population: 355336, activeUsers: 52891 },
    { name: "Cascavel", popularity: 65, trend: 6, coordinates: { lat: -24.955, lng: -53.456 }, population: 332333, activeUsers: 48123 },
    { name: "São José dos Pinhais", popularity: 62, trend: 9, coordinates: { lat: -25.532, lng: -49.206 }, population: 329058, activeUsers: 45672 },
    { name: "Foz do Iguaçu", popularity: 58, trend: -8, coordinates: { lat: -25.548, lng: -54.585 }, population: 258823, activeUsers: 38934 },
    { name: "Colombo", popularity: 55, trend: 11, coordinates: { lat: -25.290, lng: -49.224 }, population: 254829, activeUsers: 36782 },
    { name: "Guarapuava", popularity: 52, trend: 4, coordinates: { lat: -25.395, lng: -51.458 }, population: 183755, activeUsers: 28456 },
    { name: "Paranaguá", popularity: 48, trend: -5, coordinates: { lat: -25.520, lng: -48.508 }, population: 156174, activeUsers: 24123 },
    { name: "Araucária", popularity: 45, trend: 7, coordinates: { lat: -25.593, lng: -49.308 }, population: 144967, activeUsers: 21234 },
    { name: "Toledo", popularity: 42, trend: -2, coordinates: { lat: -24.713, lng: -53.743 }, population: 142645, activeUsers: 19876 },
    { name: "Apucarana", popularity: 38, trend: 3, coordinates: { lat: -23.550, lng: -51.461 }, population: 136234, activeUsers: 17892 },
    { name: "Pinhais", popularity: 35, trend: 8, coordinates: { lat: -25.445, lng: -49.192 }, population: 133047, activeUsers: 16743 },
    { name: "Campo Largo", popularity: 32, trend: -1, coordinates: { lat: -25.460, lng: -49.527 }, population: 132960, activeUsers: 15234 }
  ];

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    let map: L.Map;
    const updateHeatmapForZoom = () => {
      if (!heatLayerRef.current || !map) return;
      const zoom = map.getZoom();
      let radius = 15;
      let blur = 12;

      if (zoom >= 8) {
          radius = 30;
          blur = 25;
      } else if (zoom === 7) {
          radius = 20;
          blur = 15;
      } else if (zoom <= 5) {
          radius = 10;
          blur = 8;
      }
      
      heatLayerRef.current.setOptions({ radius, blur });
    };

    const initializeMap = async () => {
      (window as any).L = L;
      await import('leaflet.heat');

      map = L.map(mapRef.current!, { zoomControl: false }).setView([-24.5, -51.5], 6);
      mapInstance.current = map;

      L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png',
        { attribution: '&copy;OpenStreetMap & Carto' }
      ).addTo(map);

      try {
        const geo = await getParanaGeoJson();
        const muniLayer = L.geoJSON(geo, {
          style: { color: '#7af', weight: 0.8, fillOpacity: 0.1 },
          onEachFeature: (feat, layer) => {
            layer.bindTooltip(feat.properties.NM_MUN, { sticky: true });
            layer.on('click', () => {
              const municipioNome = feat.properties.NM_MUN;
              const regionData = regions.find(r => r.name === municipioNome);
              if (regionData) setSelectedRegion(regionData);
            });
          }
        }).addTo(map);
        map.fitBounds(muniLayer.getBounds());
      } catch (err) {
        console.error('Erro ao carregar GeoJSON:', err);
      }

      const heatData = regions.map(region => [
        region.coordinates.lat,
        region.coordinates.lng,
        region.popularity / 100
      ]);

      const heatLayer = (L as any).heatLayer(heatData, {
        radius: 15,
        blur: 12,
        maxZoom: 10
      }).addTo(map);
      heatLayerRef.current = heatLayer;

      map.on('zoomend', updateHeatmapForZoom);

      (window as any).updateHeat = (newData: [number, number, number][]) => {
        if (heatLayerRef.current) {
          heatLayerRef.current.setLatLngs(newData);
        }
      };
    };

    initializeMap();

    return () => {
      if (mapInstance.current) {
        mapInstance.current.off('zoomend', updateHeatmapForZoom);
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  return (
    <div className="relative w-full h-full bg-background">
      <div 
        ref={mapRef}
        className="w-full h-full"
      />

      {/* Header */}
      <div className="absolute top-4 left-4 z-[1000] p-4 glass-card max-w-md">
        <h2 className="text-white flex items-center gap-2 text-xl font-bold">
          <MapPin className="h-6 w-6 text-red-400" />
          Mapa de Calor - Estado do Paraná
        </h2>
        <div className="flex items-center gap-4 text-sm text-white/70 mt-2">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-blue-400" />
            <span>11.5M habitantes</span>
          </div>
          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4 text-emerald-400" />
            <span>892K usuários ativos</span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-emerald-400" />
            <span className="text-emerald-400 font-semibold">+14% vs mês anterior</span>
          </div>
        </div>
      </div>

      {/* Informações da região selecionada */}
      {selectedRegion && (
        <div className="absolute top-4 right-28 z-[1000] w-80 p-4 glass-card border border-white/20 rounded-xl animate-fade-in">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-white text-lg">{selectedRegion.name}</h3>
            <Button
              size="sm"
              variant="ghost"
              className="h-6 w-6 p-0 text-white/60 hover:text-white"
              onClick={() => setSelectedRegion(null)}
            >
              ×
            </Button>
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-white/70">Popularidade:</span>
              <span className="text-white font-semibold">{selectedRegion.popularity}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/70">Tendência:</span>
              <span className={`font-semibold ${
                selectedRegion.trend >= 0 ? 'text-emerald-400' : 'text-red-400'
              }`}>
                {selectedRegion.trend >= 0 ? '+' : ''}{selectedRegion.trend}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/70">População:</span>
              <span className="text-white">{selectedRegion.population.toLocaleString('pt-BR')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/70">Usuários ativos:</span>
              <span className="text-white">{selectedRegion.activeUsers.toLocaleString('pt-BR')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/70">Taxa de engajamento:</span>
              <span className="text-white">
                {((selectedRegion.activeUsers / selectedRegion.population) * 100).toFixed(1)}%
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Legenda */}
      <div className="absolute bottom-4 left-4 z-[1000] p-4 rounded-lg bg-gradient-to-r from-black/50 to-black/30 backdrop-blur-md border border-white/10">
        <p className="text-xs text-white/70 mb-3 font-semibold">Intensidade da Popularidade:</p>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-white/70">0-20%</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-500"></div>
            <span className="text-white/70">20-40%</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <span className="text-white/70">40-60%</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-white/70">60-80%</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
            <span className="text-white/70">80-100%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParanaHeatMap;