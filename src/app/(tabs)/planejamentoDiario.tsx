import FormularioAtividade from "@/components/Plantejamento/FormularioAtividade";
import ListaAtividades from "@/components/Plantejamento/ListaAtividades";
import { useAtividades } from "@/hooks/useAtividades";
import { globalStyles } from "@/styles/global";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";

const PlanejamentoDiarioScreen = () => {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const {
    atividades,
    isLoading,
    carregarAtividades,
    adicionarAtividade,
    alternarConcluida,
    deletarAtividade,
  } = useAtividades();

  useEffect(() => {
    carregarAtividades();
  }, []);

  return (
    <ScrollView contentContainerStyle={globalStyles.container}>
      <Text style={globalStyles.title}>Planejamento Diário</Text>

      <TouchableOpacity
        style={globalStyles.button}
        onPress={() => setMostrarFormulario(!mostrarFormulario)}
      >
        <Text style={globalStyles.buttonText}>
          {mostrarFormulario ? "Cancelar" : "Adicionar Atividade"}
        </Text>
      </TouchableOpacity>

      {mostrarFormulario && (
        <FormularioAtividade onSubmit={adicionarAtividade} />
      )}

      {isLoading ? (
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={{ marginTop: 20 }}
        />
      ) : atividades.length === 0 ? (
        <Text style={{ marginTop: 20, fontSize: 16 }}>
          Nenhuma meta encontrada. Adicione uma para começar!
        </Text>
      ) : (
        <ListaAtividades
          atividades={atividades}
          onToggle={alternarConcluida}
          onDelete={deletarAtividade}
        />
      )}
    </ScrollView>
  );
};

export default PlanejamentoDiarioScreen;
