import { globalStyles } from "@/styles/global";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  completed: number;
  total: number;
};

const CardProgresso = ({ completed, total }: Props) => {
  const progressPercentage = total ? (completed / total) * 100 : 0;

  return (
    <View style={styles.progressCard}>
      <Text style={styles.progressTitle}>Progresso Diário</Text>
      <Text style={styles.progressText}>
        {completed} de {total} atividades concluídas
      </Text>
      <View style={styles.progressBarBackground}>
        <View
          style={[styles.progressBarFill, { width: `${progressPercentage}%` }]}
        />
      </View>
    </View>
  );
};

export default CardProgresso;

const styles = StyleSheet.create({
  progressCard: {
    ...globalStyles.card,
    backgroundColor: "#4f46e5",
  },
  progressTitle: {
    color: "#fff",
    fontWeight: "600",
    marginBottom: 4,
  },
  progressText: {
    color: "#fff",
    marginBottom: 8,
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 4,
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#fff",
    borderRadius: 4,
  },
});
