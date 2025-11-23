import { FormData } from "@/components/Plantejamento/FormularioAtividade";

export type CategoriaBackend =
  | "TRABALHO"
  | "DESCANSO"
  | "EXERCICIO"
  | "LAZER"
  | "FAMILIA"
  | "ALIMENTACAO"
  | "SONO";

export type Atividade = Omit<FormData, "horarioInicio" | "horarioFim"> & {
  id: number;
  completed: boolean;
  horarioInicio: string;
  horarioFim: string;
};

export const categoriaLabels: Record<CategoriaBackend, string> = {
  TRABALHO: "Trabalho",
  DESCANSO: "Pausa",
  EXERCICIO: "Exercício",
  LAZER: "Lazer",
  FAMILIA: "Família",
  ALIMENTACAO: "Refeição",
  SONO: "Sono",
};

export const categoriaCores: Record<CategoriaBackend, string> = {
  TRABALHO: "#3b82f6",
  DESCANSO: "#eab308",
  EXERCICIO: "#22c55e",
  LAZER: "#a855f7",
  FAMILIA: "#fb923c",
  ALIMENTACAO: "#ef4444",
  SONO: "#1e3a8a",
};
