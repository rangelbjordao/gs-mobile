import { globalStyles } from "@/styles/global";
import { StyleSheet, Text, View } from "react-native";

const CardResumo = () => {
  return (
    <View style={globalStyles.card}>
      <Text style={globalStyles.cardTitle}>Resumo de Atividades</Text>

      <View style={styles.row}>
        <View style={styles.col}>
          <Text style={styles.value}>32</Text>
          <Text style={styles.label}>Atividades</Text>
        </View>

        <View style={styles.col}>
          <Text style={styles.value}>12</Text>
          <Text style={styles.label}>Concluídas</Text>
        </View>

        <View style={styles.col}>
          <Text style={styles.value}>20</Text>
          <Text style={styles.label}>Pendentes</Text>
        </View>
      </View>
    </View>
  );
};

export default CardResumo;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  col: {
    alignItems: "center",
  },
  value: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#007bff",
  },
  label: {
    fontSize: 14,
    color: "#444",
  },
});
