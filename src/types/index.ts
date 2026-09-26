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
  skinPath?: string;
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
  category?: "monumentos" | "ciudades" | "spawns" | "arenas" | string;
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

/**
 * Milestone event in Britannia's historical timeline
 */
export interface HistoryMilestone {
  year: number | string;
  title: string;
  description: string;
  highlight?: boolean;
}

/**
 * Structured content for the community history and origins section
 */
export interface HistoryContent {
  title: string;
  subtitle: string;
  paragraphs: string[];
  foundationYear?: number;
  founders?: string[];
  veterans?: string[];
  milestones?: HistoryMilestone[];
}

/**
 * Server and Minecraft network configuration where Britannia is currently hosted
 */
export interface ServerConfig {
  networkName: string;
  ip?: string;
  bedrockIp?: string;
  bedrockPort?: number | string;
  gameMode?: string;
  version?: string;
}

/**
 * Community and social platforms links
 */
export interface CommunityLinks {
  discord: string;
  twitter?: string;
  youtube?: string;
  tiktok?: string;
}

/**
 * Season and timeline configuration
 */
export interface SeasonConfig {
  number: number;
  name: string;
  year: number;
  formatted: string;
}

/**
 * Global SEO and search engine optimization settings
 */
export interface SeoConfig {
  siteName: string;
  title: string;
  description: string;
  keywords: string[];
  author: string;
  url: string;
  ogImage: string;
  locale: string;
}

/**
 * Master site configuration schema
 */
export interface SiteConfig {
  server?: ServerConfig;
  community: CommunityLinks;
  branding: {
    name: string;
    tagline: string;
    copyright: string;
  };
  seo: SeoConfig;
}
