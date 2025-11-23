import { api } from "@/services/api";
import { Atividade } from "@/types/goalTypes";
import { decodeToken } from "@/utils/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useState } from "react";
import { Alert } from "react-native";

export function useAtividades() {
  const [atividades, setAtividades] = useState<Atividade[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState<number | null>(null);

  const carregarAtividades = useCallback(async () => {
    setIsLoading(true);
    try {
      const token = await AsyncStorage.getItem("@token");
      if (!token) return;

      const decoded = decodeToken(token);
      const id = decoded?.userId;
      if (!id) return setIsLoading(false);

      setUserId(id);

      const response = await api.get(`/api/v1/goal/user/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const metasFormatadas: Atividade[] = response.data
        .filter((goal: any) => goal.status !== "CANCELLED")
        .map((goal: any) => ({
          id: goal.id,
          categoria: goal.category,
          horarioInicio: goal.startDate,
          horarioFim: goal.endDate,
          completed: goal.status === "COMPLETED",
        }));

      setAtividades(metasFormatadas);
    } catch (error: any) {
      console.error("Erro ao carregar atividades:", error);
      Alert.alert("Erro", "Não foi possível carregar suas metas.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const adicionarAtividade = async (
    atividade: Omit<Atividade, "id" | "completed">
  ) => {
    if (!userId) return;

    try {
      const token = await AsyncStorage.getItem("@token");
      if (!token) return;

      const response = await api.post(
        "/api/v1/goal",
        {
          category: atividade.categoria,
          frequency: "DIARIA",
          unitMeasure: "MINUTOS",
          startDate: atividade.horarioInicio,
          endDate: atividade.horarioFim,
          user: { id: userId },
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const novaAtividade: Atividade = {
        ...atividade,
        id: response.data.id,
        completed: false,
      };

      setAtividades((prev) => [...prev, novaAtividade]);
      Alert.alert("", "Atividade adicionada com sucesso!");
    } catch (error: any) {
      console.error("Erro ao adicionar atividade:", error);
      Alert.alert(
        "Erro",
        error.response?.data?.message || "Não foi possível adicionar atividade."
      );
    }
  };

  const alternarConcluida = async (id: number) => {
    if (!userId) return;

    try {
      const token = await AsyncStorage.getItem("@token");
      if (!token) return;

      const atividade = atividades.find((a) => a.id === id);
      if (!atividade) return;

      await api.patch(`/api/v1/goal/${id}/complete`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setAtividades((prev) =>
        prev.map((a) => (a.id === id ? { ...a, completed: true } : a))
      );
    } catch (error: any) {
      console.error("Erro ao concluir atividade:", error);
      Alert.alert(
        "Erro",
        error.response?.data?.message ||
          "Não foi possível concluir a atividade."
      );
    }
  };

  const deletarAtividade = async (id: number) => {
    if (!userId) return;

    try {
      const token = await AsyncStorage.getItem("@token");
      if (!token) return;

      const atividade = atividades.find((a) => a.id === id);
      if (!atividade) return;

      await api.delete(`/api/v1/goal/${id}/delete`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setAtividades((prev) => prev.filter((a) => a.id !== id));
      Alert.alert("", "Atividade deletada com sucesso!");
    } catch (error: any) {
      console.error("Erro ao deletar atividade:", error);
      Alert.alert(
        "Erro",
        error.response?.data?.message || "Não foi possível deletar a atividade."
      );
    }
  };

  return {
    atividades,
    isLoading,
    carregarAtividades,
    adicionarAtividade,
    alternarConcluida,
    deletarAtividade,
  };
}
