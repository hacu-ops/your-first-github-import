// Este módulo garante que os dados do mapa sejam buscados apenas uma vez.
let geoJsonPromise: Promise<any> | null = null;

// Função para iniciar o pré-carregamento dos dados
export const preloadParanaGeoJson = () => {
  if (!geoJsonPromise) {
    console.log("Iniciando pré-carregamento do GeoJSON do Paraná...");
    geoJsonPromise = fetch('https://piniscsenbrruquxjtim.supabase.co/storage/v1/object/public/maps/PR_Municipios_2024%20(1).json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Falha ao buscar dados do mapa');
        }
        return response.json();
      })
      .catch(error => {
        console.error("Erro no pré-carregamento do mapa:", error);
        geoJsonPromise = null; // Permite tentar novamente em caso de erro
        throw error;
      });
  }
};

// Função para obter os dados (usa o cache se já estiver carregado)
export const getParanaGeoJson = (): Promise<any> => {
  if (!geoJsonPromise) {
    preloadParanaGeoJson();
  }
  return geoJsonPromise!;
};