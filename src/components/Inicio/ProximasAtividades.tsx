import { globalStyles } from "@/styles/global";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Categorias = "work" | "leisure" | "sleep" | "exercise";

export type Atividade = {
  id: string;
  titulo: string;
  horarioInicio: Date;
  horarioFim: Date;
  categoria: Categorias;
  completed: boolean;
};

type Props = {
  atividades: Atividade[];
  toggleComplete: (id: string) => void;
};

const ProximasAtividades = ({ atividades, toggleComplete }: Props) => {
  const categoryColors: Record<Categorias, string> = {
    work: "#3b82f6",
    exercise: "#10b981",
    leisure: "#ec4899",
    sleep: "#6366f1",
  };

  if (atividades.length === 0) {
    return (
      <View style={globalStyles.card}>
        <Text style={styles.noActivitiesText}>Nenhuma atividade pendente</Text>
      </View>
    );
  }

  return (
    <>
      {atividades.map((a) => (
        <View key={a.id} style={styles.activityCard}>
          <View
            style={[
              styles.activityColorBar,
              { backgroundColor: categoryColors[a.categoria] },
            ]}
          />
          <View style={{ flex: 1 }}>
            <Text style={styles.activityTitle}>{a.titulo}</Text>
            <Text style={styles.activityTime}>
              {a.horarioInicio.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}{" "}
              -
              {a.horarioFim.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => toggleComplete(a.id)}
            style={styles.botaoCheck}
          >
            <Ionicons name="square-outline" size={28} color="#64748b" />
          </TouchableOpacity>
        </View>
      ))}
    </>
  );
};

export default ProximasAtividades;

const styles = StyleSheet.create({
  noActivitiesText: {
    color: "#6b7280",
    textAlign: "center",
  },
  activityCard: {
    ...globalStyles.card,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  activityColorBar: {
    width: 6,
    height: 50,
    borderRadius: 3,
    marginRight: 12,
  },
  activityTitle: {
    fontWeight: "600",
    color: "#111827",
  },
  activityTime: {
    color: "#6b7280",
  },
  botaoCheck: {
    padding: 4,
    justifyContent: "center",
    alignItems: "center",
  },
});
