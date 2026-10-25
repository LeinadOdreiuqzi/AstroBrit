import type { GalleryItem, GalleryLayoutEntry, GalleryCollection } from "../types";

// Import assets
import Cocospawn from "../assets/Cocospawn.webp";
import CentroPlots from "../assets/centroplots.webp";
import EstatuaLaus from "../assets/estatuaLaus.webp";
import TorreBrujo from "../assets/torrebrujo.webp";
import Bar from "../assets/bar.webp";
import Dragones from "../assets/dragones.webp";
import PolloWow from "../assets/pollowow.webp";
import Ramdis from "../assets/ramdis.webp";
import Erebor from "../assets/erebor.webp";
import ElArbol from "../assets/elarbol.webp";
import Coliseo from "../assets/coliseo.webp";
import Caballero from "../assets/caballero.webp";
import MortySpawn from "../assets/mortySpawn.webp";
import Centro from "../assets/centro.webp";
import servi from "../assets/spawnServicraft.png";

export type { GalleryItem, GalleryLayoutEntry, GalleryCollection };

export const galleryCategories = [
  { id: "todos", label: "Todas" },
  { id: "spawns", label: "Spawns" },
  { id: "ciudades", label: "Ciudades" },
  { id: "monumentos", label: "Monumentos" },
  { id: "arenas", label: "Arenas" },
] as const;

export const galleryItems: GalleryItem[] = [
  {
    id: "hero-image",
    src: Cocospawn,
    title: "EL CORAZÓN DE BRITANNIA",
    subtitle:
      "Los años pasan, pero el Ojo sigue siendo el símbolo eterno en el centro de la ciudad. Bajo su mirada incansable, Britannia se mantiene viva: veteranos y recién llegados se encuentran aquí para comenzar nuevas aventuras y fortalecer la historia de la comunidad. Hay lugar para todos: los relatos compartidos entre amigos y las tradiciones que nos mantienen unidos cada año. El Ojo observa y protege, inspirando a todos los que pisan esta ciudad legendaria.",
    category: "spawns",
  },
  {
    id: "gallery-1",
    src: CentroPlots,
    title: "Centro de la ciudad",
    subtitle: "Núcleo comercial y plots residenciales",
    category: "ciudades",
  },
  {
    id: "gallery-2",
    src: EstatuaLaus,
    title: "Estatua de Laus",
    subtitle: "Monumento conmemorativo histórico",
    category: "monumentos",
  },
  {
    id: "gallery-3",
    src: TorreBrujo,
    title: "Torre del Brujo",
    subtitle: "Bastión místico en las alturas",
    category: "monumentos",
  },
  {
    id: "gallery-4",
    src: Bar,
    title: "Taverna & Bar",
    subtitle: "Área de recreación y encuentro social",
    category: "ciudades",
  },
  {
    id: "gallery-5",
    src: Dragones,
    title: "Estatuas de Dragones",
    subtitle: "Guardianes ancestrales del antiguo spawn",
    category: "monumentos",
  },
  {
    id: "gallery-6",
    src: PolloWow,
    title: "El Secreto Interior",
    subtitle: "Misterio arquitectónico oculto",
    category: "monumentos",
  },
  {
    id: "gallery-7",
    src: Ramdis,
    title: "Ramdis",
    subtitle: "Ciudad flotante entre las nubes",
    category: "ciudades",
  },
  {
    id: "gallery-8",
    src: Erebor,
    title: "Erebor",
    subtitle: "La montaña solitaria fortificada",
    category: "monumentos",
  },
  {
    id: "gallery-9",
    src: ElArbol,
    title: "El Árbol",
    subtitle: "Naturaleza ancestral y mística",
    category: "monumentos",
  },
  {
    id: "gallery-10",
    src: Coliseo,
    title: "Coliseo de Gladiadores",
    subtitle: "Arena de combate y torneos",
    category: "arenas",
  },
  {
    id: "gallery-11",
    src: Caballero,
    title: "Caballero Guardián",
    subtitle: "Estatua en honor a la guardia real",
    category: "monumentos",
  },
];

export const galleryLayout: GalleryLayoutEntry[] = [
  { index: 0, className: "ms-3" }, // Imagen principal más grande
  { index: 1, className: "ms-2" }, // Imagen secundaria
  { index: 2, className: "ms-1" }, // Imagen pequeña
  { index: 3, className: "ms-2" }, // Imagen mediana
  { index: 4, className: "ms-1" }, // Imagen pequeña
  { index: 5, className: "ms-2" }, // Imagen mediana
];

/**
 * Helper to filter items by category
 */
export function getItemsByCategory(category?: string): GalleryItem[] {
  if (!category || category === "todos") return galleryItems;
  return galleryItems.filter((item) => item.category === category);
}

/**
 * Colecciones de galerías para el carrusel de la antesala.
 * Permite alternar entre diferentes servidores y épocas de Britannia.
 */
export const galleryCollections: GalleryCollection[] = [
  {
    id: "cococraft",
    title: "Britannia en Cococraft",
    caption: "Spawn Britannia Cococraft",
    heroImage: Cocospawn,
    layout: galleryLayout,
    items: galleryItems,
  },
  {
    id: "mortycraft",
    title: "Britannia en Mortycraft",
    caption: "Spawn Britannia Mortycraft",
    heroImage: MortySpawn,
    layout: galleryLayout,
    items: [],
  },
  {
    id: "servicraft",
    title: "Britannia en Servicraft",
    caption: "Spawn Britannia Servicraft",
    heroImage: servi,
    layout: galleryLayout,
    items: [],
  },
];
