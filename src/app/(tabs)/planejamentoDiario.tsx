import FormularioAtividade, {
  FormData,
} from "@/components/Plantejamento/FormularioAtividade";
import ListaAtividades from "@/components/Plantejamento/ListaAtividades";
import { globalStyles } from "@/styles/global";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity } from "react-native";

export type Atividade = FormData & {
  id: number;
  completed: boolean;
};

export default function PlanejamentoDiarioScreen() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const [atividades, setAtividades] = useState<Atividade[]>([]);

  const adicionarAtividade = (data: FormData) => {
    setAtividades((prev) => [
      ...prev,
      { id: Date.now(), completed: false, ...data },
    ]);
    setMostrarFormulario(false);
  };

  const alternarConcluida = (id: number) => {
    setAtividades((prev) =>
      prev.map((a) => (a.id === id ? { ...a, completed: !a.completed } : a))
    );
  };

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

      <ListaAtividades atividades={atividades} onToggle={alternarConcluida} />
    </ScrollView>
  );
}
