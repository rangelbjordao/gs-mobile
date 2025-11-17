import { globalStyles } from "@/styles/global";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Categorias = "work" | "leisure" | "sleep" | "exercise";

type Props = {
  metas: Record<Categorias, Date>;
};

const metaLabels: Record<string, string> = {
  work: "Trabalho",
  leisure: "Lazer",
  sleep: "Sono",
  exercise: "Atividade Física",
};

const CardMetasDiaria = ({ metas }: Props) => {
  return (
    <View style={globalStyles.card}>
      {Object.entries(metas).map(([key, value]) => (
        <View key={key} style={styles.metaCard}>
          <Text style={styles.metaTitle}>{metaLabels[key]}</Text>
          <Text style={styles.metaValue}>{value.getHours()}h/dia</Text>
        </View>
      ))}
    </View>
  );
};

export default CardMetasDiaria;

const styles = StyleSheet.create({
  metaCard: {
    backgroundColor: "#fff",
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#cccccc",
  },
  metaTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  metaValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4f46e5",
  },
});
