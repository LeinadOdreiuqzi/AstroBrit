import type { MemberSkin } from "../types";

// Import assets
import Bondio from "../assets/Bondio.png";
import Paco from "../assets/paco.png";
import Deivi from "../assets/deivi.png";
import guiso from "../assets/guiso.png";
import tugfabrit from "../assets/tugfabrit.png";
import embio from "../assets/embio.png";
import papita from "../assets/papita.png";
import omsijepse from "../assets/OmsijepseBritannico.png";

export type { MemberSkin };

export const memberSkins: MemberSkin[] = [
  {
    id: "skin_bondio",
    skinPath: Bondio.src,
    animation: "WaveAnimation",
    autoRotate: false,
    cameraLightIntensity: 2.0,
    globalLightIntensity: 2.5,
    cameraPositionX: 0,
    cameraPositionY: 15,
    cameraPositionZ: 60,
    cameraLookAtX: 0,
    cameraLookAtY: 10,
    cameraLookAtZ: 0,
    rank: "11",
    rankTitle: "Leyenda",
    username: "Bondio",
    userDescription: "Temporada 28 // R30 // L329",
    elogios: 8500,
  },
  {
    id: "skin_paco",
    skinPath: Paco.src,
    animation: "HitAnimation",
    autoRotate: false,
    cameraLightIntensity: 2.0,
    globalLightIntensity: 2.5,
    cameraPositionX: 0,
    cameraPositionY: 15,
    cameraPositionZ: 60,
    cameraLookAtX: 0,
    cameraLookAtY: 10,
    cameraLookAtZ: 0,
    rank: "7",
    rankTitle: "Elite",
    username: "PacooooMC",
    userDescription: "Temporada 28 // R55 // L335",
    elogios: 1240,
  },
  {
    id: "skin_deivi",
    skinPath: Deivi.src,
    animation: "WaveAnimation",
    autoRotate: false,
    cameraLightIntensity: 2.0,
    globalLightIntensity: 2.5,
    cameraPositionX: 0,
    cameraPositionY: 15,
    cameraPositionZ: 60,
    cameraLookAtX: 0,
    cameraLookAtY: 10,
    cameraLookAtZ: 0,
    rank: "5",
    rankTitle: "Héroe",
    username: "iDeivid_2",
    userDescription: "Temporada 28 // R10 // L310",
    elogios: 420,
  },
  {
    id: "skin_omsijepse",
    skinPath: omsijepse.src,
    animation: "CrouchAnimation",
    autoRotate: false,
    cameraLightIntensity: 2.0,
    globalLightIntensity: 2.5,
    cameraPositionX: 0,
    cameraPositionY: 15,
    cameraPositionZ: 60,
    cameraLookAtX: 0,
    cameraLookAtY: 10,
    cameraLookAtZ: 0,
    rank: "11",
    rankTitle: "Leyenda",
    username: "Omsijepse",
    userDescription: "Temporada 28 // R100 // L340",
    elogios: 1448,
  },
  {
    id: "skin_guiso",
    skinPath: guiso.src,
    animation: "WaveAnimation",
    autoRotate: false,
    cameraLightIntensity: 2.0,
    globalLightIntensity: 2.5,
    cameraPositionX: 0,
    cameraPositionY: 15,
    cameraPositionZ: 60,
    cameraLookAtX: 0,
    cameraLookAtY: 10,
    cameraLookAtZ: 0,
    rank: "11",
    rankTitle: "Leyenda",
    username: "GuisoMaster",
    userDescription: "Temporada 28 // R100 // L340",
    elogios: 9001,
  },
  {
    id: "skin_embio",
    skinPath: embio.src,
    animation: "",
    autoRotate: false,
    cameraLightIntensity: 2.0,
    globalLightIntensity: 2.5,
    cameraPositionX: 0,
    cameraPositionY: 15,
    cameraPositionZ: 60,
    cameraLookAtX: 0,
    cameraLookAtY: 10,
    cameraLookAtZ: 0,
    rank: "11",
    rankTitle: "Leyenda",
    username: "MR3mbiozz",
    userDescription: "Temporada 28 // R100 // L340",
    elogios: 1457,
  },
  {
    id: "skin_papita",
    skinPath: papita.src,
    animation: "CrouchAnimation",
    autoRotate: false,
    cameraLightIntensity: 2.0,
    globalLightIntensity: 2.5,
    cameraPositionX: 0,
    cameraPositionY: 15,
    cameraPositionZ: 60,
    cameraLookAtX: 0,
    cameraLookAtY: 10,
    cameraLookAtZ: 0,
    rank: "7",
    rankTitle: "Elite",
    username: "Papitafritaxdd",
    userDescription: "Temporada 28 // R100 // L340",
    elogios: 124,
  },
  {
    id: "skin_tugfa",
    skinPath: tugfabrit.src,
    animation: "StandAnimation",
    autoRotate: false,
    cameraLightIntensity: 2.0,
    globalLightIntensity: 2.5,
    cameraPositionX: 0,
    cameraPositionY: 15,
    cameraPositionZ: 60,
    cameraLookAtX: 0,
    cameraLookAtY: 10,
    cameraLookAtZ: 0,
    rank: "4",
    rankTitle: "Aventurero",
    username: "Tugfalol",
    userDescription: "Temporada 28 // R100 // L340",
    elogios: 67,
  },
];

export const developmentSkin: MemberSkin[] = [
  {
    id: "omsijepse_dev",
    skinPath: omsijepse.src,
    animation: "CrouchAnimation",
    autoRotate: false,
    cameraLightIntensity: 2.0,
    globalLightIntensity: 2.5,
    cameraPositionX: 0,
    cameraPositionY: 15,
    cameraPositionZ: 60,
    cameraLookAtX: 0,
    cameraLookAtY: 10,
    cameraLookAtZ: 0,
    rank: "11",
    rankTitle: "Leyenda",
    username: "Omsijepse",
    userDescription: "Temporada 28 // R100 // L340",
    elogios: 9999,
  },
];

/**
 * Filter options for Britannia member ranks
 */
export interface RankFilterOption {
  id: string;
  label: string;
}

export const memberRanks: RankFilterOption[] = [
  { id: "all", label: "Todos" },
  { id: "leyenda", label: "Leyenda" },
  { id: "elite", label: "Élite" },
  { id: "heroe", label: "Héroe" },
  { id: "aventurero", label: "Aventurero" },
];

/**
 * Normalizes a rank title string for robust filtering and data matching.
 * Handles accents, uppercase, and trimming (e.g. "Élite" -> "elite").
 */
export function normalizeRank(rank?: string): string {
  return (rank || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

/**
 * Resolves the 3D skin texture URL from either local path or Minecraft username.
 * Supports hybrid resolution:
 * 1. Explicit local/imported or remote skinPath
 * 2. Automatic fallback using Minecraft username via Mineskin CDN
 * 3. Fallback placeholder texture
 */
export function resolveSkinUrl(skin: { skinPath?: string; username?: string }): string {
  if (skin.skinPath && skin.skinPath.trim() !== "") {
    return skin.skinPath;
  }
  if (skin.username && skin.username.trim() !== "") {
    return `https://mineskin.eu/skin/${encodeURIComponent(skin.username)}`;
  }
  return "/assets/servi.webp";
}
