import { api } from "@/services/api";
import { Atividade, CategoriaBackend } from "@/types/goalTypes";
import { decodeToken } from "@/utils/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";

export function useMetas() {
  const [atividades, setAtividades] = useState<Atividade[]>([]);
  const [proximasAtividades, setProximasAtividades] = useState<Atividade[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const buscarMetas = useCallback(async () => {
    setIsLoading(true);
    try {
      const token = await AsyncStorage.getItem("@token");
      if (!token) {
        setIsLoading(false);
        return;
      }

      const decoded = decodeToken(token);
      const id = decoded?.userId;
      if (!id) {
        setIsLoading(false);
        return;
      }

      const response = await api.get(`/api/v1/goal/user/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const metas: Atividade[] = response.data.map((goal: any) => ({
        id: goal.id,
        categoria: goal.category as CategoriaBackend,
        horarioInicio: goal.startDate,
        horarioFim: goal.endDate,
        completed: goal.status === "COMPLETED" || goal.status === "CANCELLED",
      }));

      setAtividades(metas);

      const proximas = metas
        .filter((m) => !m.completed)
        .sort((a, b) => a.horarioInicio.localeCompare(b.horarioInicio))
        .slice(0, 3);

      setProximasAtividades(proximas);
    } catch (error: any) {
      console.error(
        "Erro ao buscar metas:",
        error.response?.data || error.message || error
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    buscarMetas();
  }, [buscarMetas]);

  return {
    atividades,
    proximasAtividades,
    setProximasAtividades,
    setAtividades,
    isLoading,
    buscarMetas,
  };
}
