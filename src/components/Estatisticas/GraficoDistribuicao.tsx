import { globalStyles } from "@/styles/global";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { PieChart } from "react-native-chart-kit";

type GraficoDistribuicaoProps = {
  dados: { name: string; population: number; color: string }[];
};

const GraficoDistribuicao = ({ dados }: GraficoDistribuicaoProps) => {
  return (
    <View style={globalStyles.card}>
      <Text style={globalStyles.cardTitle}>Distribuição de Atividades</Text>
      <View style={styles.chartWrapper}>
        <PieChart
          data={dados}
          width={Dimensions.get("window").width - 40}
          height={220}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="16"
          chartConfig={{ color: () => "#333" }}
          style={styles.chart}
        />
      </View>
    </View>
  );
};

export default GraficoDistribuicao;

const styles = StyleSheet.create({
  chartWrapper: {
    alignItems: "center",
  },
  chart: {
    borderRadius: 12,
  },
});
