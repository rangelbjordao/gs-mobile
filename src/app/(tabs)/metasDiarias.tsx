import CardMeta from "@/components/Metas/CardMeta";
import { globalStyles } from "@/styles/global";
import AsyncStorage from "@react-native-async-storage/async-storage";
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

  const salvarMetas = async () => {
    try {
      await AsyncStorage.setItem("@metas", JSON.stringify(metas));
      Alert.alert("Metas salvas com sucesso!");
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
