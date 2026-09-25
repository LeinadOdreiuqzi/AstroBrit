import type { HistoryContent } from "../types";

export const historyData: HistoryContent = {
  title: "¡Bienvenidos a Britannia!",
  subtitle: "Un poco de historia.",
  foundationYear: 2017,
  founders: ["ElGabyMC", "Bondio"],
  veterans: [
    "Moonky",
    "daremill",
    "DaxterRecord",
    "DogGamer",
    "Lunei",
    "Deixol",
    "Tioupi",
  ],
  paragraphs: [
    "La comunidad de Britannia nace en el año 2017, cuando ElGabyMC junto a su hermano Bondio crearon una ciudad legendaria: Britannia.",
    "Rápidamente la ciudad formó grandes amistades e integró a personas fundamentales para la identidad de la comunidad. Entre las figuras históricas más destacadas se encuentran Moonky, daremill, DaxterRecord, DogGamer, Lunei, Deixol y Tioupi, varios de los cuales continúan activos hoy en día.",
    `Estas personas fueron clave para forjar el sentido de pertenencia y los valores de la ciudad. Hoy, en pleno ${new Date().getFullYear()}, mantenemos vivo ese legado, fortaleciendo la hermandad y compartiendo aventuras cada temporada.`,
  ],
};
