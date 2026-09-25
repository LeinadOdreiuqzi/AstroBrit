import type { ImageMetadata } from "astro";

/**
 * Predefined 3D animation names supported by skinview3d
 */
export type SkinAnimationName =
  | "IdleAnimation"
  | "WalkingAnimation"
  | "RunningAnimation"
  | "WaveAnimation"
  | "HitAnimation"
  | "CrouchAnimation"
  | "StandAnimation"
  | ""
  | string;

/**
 * Member skin 3D representation and metadata
 */
export interface MemberSkin {
  id: string;
  skinPath: string;
  animation?: SkinAnimationName;
  autoRotate?: boolean;
  cameraLightIntensity?: number;
  globalLightIntensity?: number;
  cameraPositionX?: number;
  cameraPositionY?: number;
  cameraPositionZ?: number;
  cameraLookAtX?: number;
  cameraLookAtY?: number;
  cameraLookAtZ?: number;
  rank?: string;
  rankTitle?: string;
  username?: string;
  userDescription?: string;
  elogios?: number;
}

/**
 * Item displayed in the Britannia gallery
 */
export interface GalleryItem {
  id: string;
  src: ImageMetadata | string;
  title: string;
  subtitle: string;
}

/**
 * Grid layout configuration for gallery items
 */
export interface GalleryLayoutEntry {
  index: number;
  className: string;
}

/**
 * Ranks and progression hierarchy in BritanniaMC
 */
export interface DestinyRank {
  rankNumber: string;
  title: string;
  minElogios: number;
  description?: string;
}

/**
 * Player data displayed in the Destiny 2-styled modal
 */
export interface DestinyPlayerData {
  src: string;
  rank?: string;
  rankTitle?: string;
  username?: string;
  userDescription?: string;
  elogios?: number | string;
}
