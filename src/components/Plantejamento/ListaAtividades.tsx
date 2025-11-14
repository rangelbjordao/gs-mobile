import { globalStyles } from "@/styles/global";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FormData } from "./FormularioAtividade";

type Categorias =
  | "work"
  | "break"
  | "exercise"
  | "leisure"
  | "family"
  | "meal"
  | "sleep";

type Atividade = FormData & {
  id: number;
  completed: boolean;
};

type Props = {
  atividades: Atividade[];
  onToggle: (id: number) => void;
};

const categoriaLabels: Record<Categorias, string> = {
  work: "Trabalho",
  break: "Pausa",
  exercise: "Exercício",
  leisure: "Lazer",
  family: "Família",
  meal: "Refeição",
  sleep: "Sono",
};

const categoriaCores: Record<Categorias, string> = {
  work: "#3b82f6",
  break: "#eab308",
  exercise: "#22c55e",
  leisure: "#a855f7",
  family: "#fb923c",
  meal: "#ef4444",
  sleep: "#1e3a8a",
};

const formatarHorario = (date: Date) => {
  return `${date.getHours().toString().padStart(2, "0")}:${date
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;
};

const ListaAtividades = ({ atividades, onToggle }: Props) => {
  return (
    <>
      {atividades.map((atividade) => (
        <View key={atividade.id} style={globalStyles.card}>
          <View
            style={[
              styles.indicadorCategoria,
              { backgroundColor: categoriaCores[atividade.categoria] },
            ]}
          />

          <View style={styles.cabecalho}>
            <Text
              style={[
                globalStyles.cardTitle,
                atividade.completed && styles.tituloConcluido,
              ]}
            >
              {atividade.titulo}
            </Text>

            <TouchableOpacity
              style={styles.botaoCheck}
              onPress={() => onToggle(atividade.id)}
            >
              <Ionicons
                name={atividade.completed ? "checkbox" : "square-outline"}
                size={28}
                color={atividade.completed ? "#22c55e" : "#64748b"}
              />
            </TouchableOpacity>
          </View>

          <Text>
            {formatarHorario(atividade.horarioInicio)} -{" "}
            {formatarHorario(atividade.horarioFim)}
          </Text>

          <Text style={styles.categoriaTexto}>
            Categoria: {categoriaLabels[atividade.categoria]}
          </Text>
        </View>
      ))}
    </>
  );
};

export default ListaAtividades;

const styles = StyleSheet.create({
  indicadorCategoria: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginBottom: 6,
  },
  cabecalho: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  botaoCheck: {
    padding: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  categoriaTexto: {
    fontSize: 12,
    marginTop: 4,
  },
  tituloConcluido: {
    textDecorationLine: "line-through",
    opacity: 0.5,
  },
});
