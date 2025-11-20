import { Meta } from "@/types/meta";
import { api } from "./api";

export type GoalPayload = {
  user: { id: number };
  category:
    | "TRABALHO"
    | "LAZER"
    | "DESCANSO"
    | "SONO"
    | "EXERCICIO"
    | "ALIMENTACAO"
    | "FAMILIA";
  frequency: "DIARIA" | "SEMANAL" | "MENSAL";
  unitMeasure: string;
  startDate: string;
  endDate?: string | null;
};

const ENDPOINT = "/api/v1/goal";

export async function criarMeta(data: GoalPayload) {
  const response = await api.post(ENDPOINT, data);
  return response.data;
}

export async function listarMetas(): Promise<Meta[]> {
  const response = await api.get<Meta[]>(ENDPOINT);
  return response.data;
}
