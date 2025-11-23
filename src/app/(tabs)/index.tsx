import CardMetasDiaria from "@/components/Inicio/CardMetasDiaria";
import CardProgresso from "@/components/Inicio/CardProgresso";
import ListaAtividades from "@/components/Plantejamento/ListaAtividades";
import { useMetas } from "@/hooks/useMetas";
import { api } from "@/services/api";
import { globalStyles } from "@/styles/global";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";
import React, { useCallback } from "react";
import { ActivityIndicator, Alert, ScrollView, Text, View } from "react-native";

const HomeScreen = () => {
  const {
    proximasAtividades,
    setProximasAtividades,
    setAtividades,
    atividades,
    isLoading,
    buscarMetas,
  } = useMetas();

  useFocusEffect(
    useCallback(() => {
      const carregarMetas = async () => {
        const metasSalvas = await AsyncStorage.getItem("@metas");
        if (metasSalvas) {
          const metasObj = JSON.parse(metasSalvas);
          setMetasDiarias({
            work: new Date(metasObj.trabalho),
            exercise: new Date(metasObj.atividadeFisica),
            leisure: new Date(metasObj.lazer),
            sleep: new Date(metasObj.sono),
          });
        }
      };

      carregarMetas();
      buscarMetas();
    }, [buscarMetas])
  );

  const [metasDiarias, setMetasDiarias] = React.useState({
    work: new Date(new Date().setHours(8, 0)),
    exercise: new Date(new Date().setHours(1, 0)),
    leisure: new Date(new Date().setHours(2, 0)),
    sleep: new Date(new Date().setHours(7, 0)),
  });

  const alternarConcluida = async (id: number) => {
    try {
      const token = await AsyncStorage.getItem("@token");
      if (!token) return;

      await api.patch(`/api/v1/goal/${id}/complete`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setAtividades((prev) =>
        prev.map((a) => (a.id === id ? { ...a, completed: true } : a))
      );

      setProximasAtividades((prev) => {
        const todasPendentes = atividades
          .map((a) => (a.id === id ? { ...a, completed: true } : a))
          .filter((a) => !a.completed);

        return todasPendentes.slice(0, 3);
      });
    } catch (error: any) {
      console.error("Erro ao alternar concluída:", error);
      Alert.alert(
        "Erro",
        error.response?.data?.message || "Não foi possível concluir a meta."
      );
    }
  };

  const completedCount = atividades.filter((a) => a.completed).length;

  return (
    <ScrollView contentContainerStyle={globalStyles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#3b82f6" />
      ) : (
        <>
          <Text style={globalStyles.title}>Olá, Usuário!</Text>
          <Text style={globalStyles.subtitle}>
            Como está seu progresso hoje?
          </Text>

          <CardProgresso completed={completedCount} total={atividades.length} />

          <Text style={globalStyles.subtitle}>Próximas Atividades</Text>
          {proximasAtividades.length === 0 ? (
            <View style={{ ...globalStyles.card, padding: 16 }}>
              <Text style={{ color: "#6b7280", textAlign: "center" }}>
                Nenhuma atividade pendente
              </Text>
            </View>
          ) : (
            <ListaAtividades
              atividades={proximasAtividades}
              onToggle={alternarConcluida}
            />
          )}

          <Text style={globalStyles.subtitle}>Suas Metas Diárias</Text>
          <CardMetasDiaria metas={metasDiarias} />
        </>
      )}
    </ScrollView>
  );
};

export default HomeScreen;
