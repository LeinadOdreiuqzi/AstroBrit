import { z } from "astro/zod";
import type { MemberSkin, GalleryItem, SiteConfig } from "../types";

/**
 * Zod schema for member skins
 */
export const memberSkinSchema = z.object({
  id: z.string().min(1),
  skinPath: z.string().min(1),
  animation: z.string().optional(),
  autoRotate: z.boolean().optional(),
  cameraLightIntensity: z.number().optional(),
  globalLightIntensity: z.number().optional(),
  cameraPositionX: z.number().optional(),
  cameraPositionY: z.number().optional(),
  cameraPositionZ: z.number().optional(),
  cameraLookAtX: z.number().optional(),
  cameraLookAtY: z.number().optional(),
  cameraLookAtZ: z.number().optional(),
  rank: z.string().optional(),
  rankTitle: z.string().optional(),
  username: z.string().optional(),
  userDescription: z.string().optional(),
  elogios: z.number().optional(),
});

/**
 * Zod schema for gallery items
 */
export const galleryItemSchema = z.object({
  id: z.string().min(1),
  src: z.union([
    z.string(),
    z.object({
      src: z.string(),
      width: z.number(),
      height: z.number(),
      format: z.string(),
    }),
  ]),
  title: z.string(),
  subtitle: z.string(),
  category: z.string().optional(),
});

/**
 * Zod schema for site configuration
 */
export const siteConfigSchema = z.object({
  server: z
    .object({
      networkName: z.string(),
      ip: z.string(),
      bedrockIp: z.string().optional(),
      bedrockPort: z.number().optional(),
      gameMode: z.string().optional(),
      version: z.string().optional(),
    })
    .optional(),
  community: z.object({
    discord: z.string(),
    twitter: z.string().optional(),
    youtube: z.string().optional(),
    tiktok: z.string().optional(),
  }),
  branding: z.object({
    name: z.string(),
    tagline: z.string(),
    copyright: z.string(),
  }),
  seo: z.object({
    siteName: z.string(),
    title: z.string(),
    description: z.string(),
    keywords: z.array(z.string()),
    author: z.string(),
    url: z.string(),
    ogImage: z.string(),
    locale: z.string(),
  }),
});

/**
 * Validation helper for member skins
 */
export function validateMemberSkins(data: unknown[]): MemberSkin[] {
  return z.array(memberSkinSchema).parse(data) as MemberSkin[];
}

/**
 * Validation helper for gallery items
 */
export function validateGalleryItems(data: unknown[]): GalleryItem[] {
  return z.array(galleryItemSchema).parse(data) as GalleryItem[];
}

/**
 * Validation helper for site config
 */
export function validateSiteConfig(data: unknown): SiteConfig {
  return siteConfigSchema.parse(data) as SiteConfig;
}
