import { globalStyles } from "@/styles/global";
import { Atividade, categoriaCores } from "@/types/goalTypes";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  atividades: Atividade[];
  onToggle: (id: number) => void;
  onDelete?: (id: number) => void;
};

const formatarHorario = (dataHora: string | undefined): string => {
  if (!dataHora) {
    return "--:--";
  }

  if (dataHora.length >= 5) {
    return dataHora.substring(0, 5);
  }

  return dataHora;
};

const ListaAtividades = ({ atividades, onToggle, onDelete }: Props) => {
  const atividadesOrdenadas = [...atividades].sort((a, b) => {
    if (a.completed !== b.completed) return a.completed ? 1 : -1;
    return (a.horarioInicio || "00:00:00").localeCompare(
      b.horarioInicio || "00:00:00"
    );
  });

  return (
    <>
      {atividadesOrdenadas.map((atividade) => (
        <View key={atividade.id} style={globalStyles.card}>
          <View
            style={[
              styles.indicadorCategoria,
              { backgroundColor: categoriaCores[atividade.categoria] },
            ]}
          />

          <View style={styles.cabecalho}>
            <Text
              style={[
                globalStyles.cardTitle,
                atividade.completed && styles.categoriaConcluido,
              ]}
            >
              {atividade.categoria}
            </Text>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {onDelete && (
                <TouchableOpacity
                  style={{ marginRight: 8 }}
                  onPress={() => onDelete(atividade.id)}
                >
                  <Ionicons name="trash-outline" size={24} color="#ef4444" />
                </TouchableOpacity>
              )}

              <TouchableOpacity
                style={styles.botaoCheck}
                onPress={() => onToggle(atividade.id)}
              >
                <Ionicons
                  name={atividade.completed ? "checkbox" : "square-outline"}
                  size={28}
                  color={atividade.completed ? "#22c55e" : "#64748b"}
                />
              </TouchableOpacity>
            </View>
          </View>

          <Text>
            {formatarHorario(atividade.horarioInicio)} -{" "}
            {formatarHorario(atividade.horarioFim)}
          </Text>
        </View>
      ))}
    </>
  );
};

export default ListaAtividades;

const styles = StyleSheet.create({
  indicadorCategoria: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginBottom: 6,
  },
  cabecalho: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  botaoCheck: {
    padding: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  categoriaConcluido: {
    textDecorationLine: "line-through",
    opacity: 0.5,
  },
});
