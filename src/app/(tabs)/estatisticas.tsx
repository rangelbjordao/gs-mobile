import CardResumo from "@/components/Estatisticas/CardResumo";
import GraficoDistribuicao from "@/components/Estatisticas/GraficoDistribuicao";
import { useAtividades } from "@/hooks/useAtividades";
import { globalStyles } from "@/styles/global";
import { useFocusEffect } from "expo-router";
import React, { useCallback } from "react";
import { ActivityIndicator, ScrollView, Text } from "react-native";

const EstatisticasScreen = () => {
  const { atividades, isLoading, carregarAtividades } = useAtividades();

  useFocusEffect(
    useCallback(() => {
      carregarAtividades();
    }, [])
  );

  const total = atividades.length;
  const concluido = atividades.filter((a) => a.completed).length;
  const pendente = total - concluido;

  const categoriasMap = atividades.reduce((acc, a) => {
    acc[a.categoria] = (acc[a.categoria] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const dadosGrafico = Object.entries(categoriasMap).map(
    ([nome, quantidade], i) => {
      const cores = ["#fb923c", "#3b82f6", "#a855f7", "#22c55e", "#f43f5e"];
      return {
        name: nome,
        population: quantidade,
        color: cores[i % cores.length],
      };
    }
  );

  if (isLoading) {
    return (
      <ActivityIndicator size="large" color="#007bff" style={{ flex: 1 }} />
    );
  }

  return (
    <ScrollView contentContainerStyle={globalStyles.container}>
      <Text style={globalStyles.title}>Estatísticas</Text>

      <CardResumo total={total} concluido={concluido} pendente={pendente} />

      <GraficoDistribuicao dados={dadosGrafico} />
    </ScrollView>
  );
};

export default EstatisticasScreen;
