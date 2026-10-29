export interface ChronicleHighlight {
  label: string;
  value: string;
}

export interface ChronicleMedia {
  src: string;
  alt: string;
  caption?: string;
}

export interface ChroniclePoint {
  id: string;
  /** Identificador, año o fecha (ej: "Hito I", "2017", "Cap. I") */
  year: string;
  /** Etiqueta superior corta opcional */
  era?: string;
  /** Título del hito */
  title: string;
  /** Breve descripción para el timeline */
  summary: string;
  /** Subtítulo en la vista de detalle */
  subtitle?: string;
  /** Metadatos opcionales */
  highlights?: ChronicleHighlight[];
  /** Párrafos del relato en el visor detallado */
  paragraphs: string[];
  /** Imágenes opcionales */
  media?: ChronicleMedia[];
}

/**
 * ARCHIVO HISTÓRICO - DATOS BASE (LOREM IPSUM)
 * -------------------------------------------------------------------------
 * Relleno limpio y estructurado con Lorem Ipsum, listo para reemplazar
 * por la historia definitiva a medida que se recopile.
 */
export const chroniclesData: ChroniclePoint[] = [
  {
    id: "hito-1",
    year: "Hito I",
    title: "Lorem Ipsum",
    summary: "Consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore.",
    subtitle: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet.",
    highlights: [
      { label: "Status", value: "Lorem" },
      { label: "Ordo", value: "Ipsum" },
      { label: "Aevum", value: "Dolor" },
    ],
    paragraphs: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      "Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida.",
    ],
  },
  {
    id: "hito-2",
    year: "Hito II",
    title: "Dolor Sit Amet",
    summary: "Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip.",
    subtitle: "Duis aute irure dolor in reprehenderit in voluptate velit esse.",
    highlights: [
      { label: "Status", value: "Amet" },
      { label: "Ordo", value: "Consectetur" },
      { label: "Aevum", value: "Adipiscing" },
    ],
    paragraphs: [
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
      "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est.",
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.",
    ],
  },
  {
    id: "hito-3",
    year: "Hito III",
    title: "Consectetur",
    summary: "Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt.",
    subtitle: "Quis autem vel eum iure reprehenderit qui in ea voluptate velit.",
    highlights: [
      { label: "Status", value: "Elit" },
      { label: "Ordo", value: "Tempor" },
      { label: "Aevum", value: "Incididunt" },
    ],
    paragraphs: [
      "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.",
      "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus.",
    ],
  },
  {
    id: "hito-4",
    year: "Hito IV",
    title: "Adipiscing Elit",
    summary: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.",
    subtitle: "Vel illum qui dolorem eum fugiat quo voluptas nulla pariatur.",
    highlights: [
      { label: "Status", value: "Labore" },
      { label: "Ordo", value: "Dolore" },
      { label: "Aevum", value: "Magna" },
    ],
    paragraphs: [
      "Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus.",
      "Omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.",
    ],
  },
  {
    id: "hito-5",
    year: "Hito V",
    title: "Tempor Incididunt",
    summary: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.",
    subtitle: "Totam rem aperiam eaque ipsa quae ab illo inventore veritatis.",
    highlights: [
      { label: "Status", value: "Aliqua" },
      { label: "Ordo", value: "Veniam" },
      { label: "Aevum", value: "Nostrud" },
    ],
    paragraphs: [
      "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur.",
      "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur.",
    ],
  },
];
