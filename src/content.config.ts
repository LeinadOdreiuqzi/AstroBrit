import { defineCollection } from "astro:content";
import { memberSkinSchema, galleryItemSchema } from "./schemas";

// Define Astro Content Collections for Britannia
export const collections = {
  skins: defineCollection({
    schema: memberSkinSchema,
  }),
  gallery: defineCollection({
    schema: galleryItemSchema,
  }),
};
