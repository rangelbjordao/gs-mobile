import CardMeta from "@/components/Metas/CardMeta";
import { criarMeta, GoalPayload } from "@/services/metasService";
import { globalStyles } from "@/styles/global";
import { format } from "date-fns";
import { useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity } from "react-native";

const MetasScreen = () => {
  const [metas, setMetas] = useState({
    trabalho: new Date(),
    lazer: new Date(),
    sono: new Date(),
    atividadeFisica: new Date(),
  });

  const handleChange = (campo: keyof typeof metas, valor: Date) => {
    setMetas((prev) => ({ ...prev, [campo]: valor }));
  };

  const USER_ID = 1;
  const FREQUENCY: "DIARIA" = "DIARIA";
  const UNIT_MEASURE = "MINUTES";

  const salvarMetas = async () => {
    try {
      const metasPayload: GoalPayload[] = [
        {
          user: { id: USER_ID },
          category: "TRABALHO",
          frequency: FREQUENCY,
          unitMeasure: UNIT_MEASURE,
          startDate: format(metas.trabalho, "yyyy-MM-dd"),
          endDate: null,
        },
        {
          user: { id: USER_ID },
          category: "LAZER",
          frequency: FREQUENCY,
          unitMeasure: UNIT_MEASURE,
          startDate: format(metas.lazer, "yyyy-MM-dd"),
          endDate: null,
        },
        {
          user: { id: USER_ID },
          category: "SONO",
          frequency: FREQUENCY,
          unitMeasure: UNIT_MEASURE,
          startDate: format(metas.sono, "yyyy-MM-dd"),
          endDate: null,
        },
        {
          user: { id: USER_ID },
          category: "EXERCICIO",
          frequency: FREQUENCY,
          unitMeasure: UNIT_MEASURE,
          startDate: format(metas.atividadeFisica, "yyyy-MM-dd"),
          endDate: null,
        },
      ];

      for (const meta of metasPayload) {
        await criarMeta(meta);
      }

      Alert.alert("Sucesso", "Metas salvas com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar metas:", error);
      Alert.alert(
        "Erro",
        "Não foi possível salvar suas metas. Tente novamente."
      );
    }
  };

  return (
    <ScrollView contentContainerStyle={globalStyles.container}>
      <Text style={globalStyles.title}>Metas Diárias</Text>

      <CardMeta
        titulo="Trabalho"
        valor={metas.trabalho}
        aoMudar={(hora) => handleChange("trabalho", hora)}
      />

      <CardMeta
        titulo="Lazer"
        valor={metas.lazer}
        aoMudar={(hora) => handleChange("lazer", hora)}
      />

      <CardMeta
        titulo="Sono"
        valor={metas.sono}
        aoMudar={(hora) => handleChange("sono", hora)}
      />

      <CardMeta
        titulo="Atividade Física"
        valor={metas.atividadeFisica}
        aoMudar={(hora) => handleChange("atividadeFisica", hora)}
      />

      <TouchableOpacity style={globalStyles.button} onPress={salvarMetas}>
        <Text style={globalStyles.buttonText}>Salvar Metas</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default MetasScreen;
