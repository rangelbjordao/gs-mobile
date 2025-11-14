import CardResumo from "@/components/Estatisticas/CardResumo";
import GraficoDistribuicao from "@/components/Estatisticas/GraficoDistribuicao";
import { globalStyles } from "@/styles/global";
import { ScrollView, Text } from "react-native";

const EstatisticasScreen = () => {
  return (
    <ScrollView contentContainerStyle={globalStyles.container}>
      <Text style={globalStyles.title}>Estatísticas</Text>

      <CardResumo />

      <GraficoDistribuicao />
    </ScrollView>
  );
};

export default EstatisticasScreen;
