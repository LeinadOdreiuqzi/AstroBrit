import { z } from "astro/zod";
import type { MemberSkin, GalleryItem } from "../types";

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
