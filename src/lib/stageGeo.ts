// Verified endpoint coordinates for each Coastal Camino stage, used by
// StageMap.astro to centre an OpenStreetMap orientation view on the stage.
//
// Galician town coordinates reuse the verified values already in
// src/content/towns/* (a-guarda, oia, baiona, vigo, redondela, pontevedra,
// padron); Caminha reuses the verified crossing coordinate from
// src/content/crossing/ferry.yml. The three remaining non-town endpoints
// (Viana do Castelo, Caldas de Reis, Santiago de Compostela) are town-centre
// coordinates from OpenStreetMap.
//
// IMPORTANT: these locate the stage on a map — they are NOT the walking track.
// The exact route + elevation + downloadable GPX live in the external pilgrim
// resources linked beneath the map (Gronze, Wikiloc). No route geometry is
// fabricated here.

export interface GeoPoint {
  lat: number;
  lng: number;
  name: string;
}
export interface StageEndpoints {
  from: GeoPoint;
  to: GeoPoint;
}

const P = (lat: number, lng: number, name: string): GeoPoint => ({ lat, lng, name });

export const STAGE_GEO: Record<string, StageEndpoints> = {
  'viana-do-castelo-caminha': { from: P(41.6932, -8.8329, 'Viana do Castelo'), to: P(41.8734, -8.8358, 'Caminha') },
  'caminha-a-guarda': { from: P(41.8734, -8.8358, 'Caminha'), to: P(41.9026, -8.873, 'A Guarda') },
  'a-guarda-oia': { from: P(41.9026, -8.873, 'A Guarda'), to: P(42.0009, -8.8689, 'Oia') },
  'oia-baiona': { from: P(42.0009, -8.8689, 'Oia'), to: P(42.1196, -8.8497, 'Baiona') },
  'baiona-vigo': { from: P(42.1196, -8.8497, 'Baiona'), to: P(42.2406, -8.7207, 'Vigo') },
  'vigo-redondela': { from: P(42.2406, -8.7207, 'Vigo'), to: P(42.2837, -8.6093, 'Redondela') },
  'redondela-pontevedra': { from: P(42.2837, -8.6093, 'Redondela'), to: P(42.431, -8.6444, 'Pontevedra') },
  'pontevedra-caldas-de-reis': { from: P(42.431, -8.6444, 'Pontevedra'), to: P(42.6049, -8.6418, 'Caldas de Reis') },
  'caldas-de-reis-padron': { from: P(42.6049, -8.6418, 'Caldas de Reis'), to: P(42.7395, -8.6605, 'Padrón') },
  'padron-santiago': { from: P(42.7395, -8.6605, 'Padrón'), to: P(42.8805, -8.5446, 'Santiago de Compostela') },
};
