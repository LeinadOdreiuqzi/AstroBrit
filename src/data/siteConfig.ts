import type { SiteConfig } from "../types";

export const siteConfig: SiteConfig = {
  /**
   * Servidor actual donde reside Britannia.
   * Cambiar estos valores actualizará automáticamente todas las menciones en la web.
   */
  server: {
    networkName: "Cococraft",
    ip: "",
    bedrockIp: "",
    bedrockPort: 19132,
    gameMode: "Towny",
    version: "",
  },
  community: {
    discord: "https://discord.gg/zcuwAhbWxR",
  },
  branding: {
    name: "Britannia",
    tagline: "Comunidad de Minecraft Towny",
    copyright: `© ${new Date().getFullYear()} BritanniaMC`,
  },
  seo: {
    siteName: "BritanniaMC",
    title: "BritanniaMC - Comunidad de Minecraft Towny",
    description:
      "Explora Britannia: Galería de construcciones, miembros destacados, proyectos y trayectoria de la comunidad.",
    keywords: [
      "Minecraft",
      "BritanniaMC",
      "Comunidad Minecraft",
      "Construcción Minecraft",
      "Minecraft Towny",
      "Towny",
    ],
    author: "BritanniaMC Team",
    url: "https://britanniamc.com",
    ogImage: "https://britanniamc.com/assets/Theeye.png",
    locale: "es_ES",
  },
};
