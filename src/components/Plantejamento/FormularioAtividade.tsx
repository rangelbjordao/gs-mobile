import { globalStyles } from "@/styles/global";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Alert,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type Categorias =
  | "work"
  | "break"
  | "exercise"
  | "leisure"
  | "family"
  | "meal"
  | "sleep";

const categoriaLabels: Record<Categorias, string> = {
  work: "Trabalho",
  break: "Pausa",
  exercise: "Exercício",
  leisure: "Lazer",
  family: "Família",
  meal: "Refeição",
  sleep: "Sono",
};

const categoriasLista = Object.keys(categoriaLabels) as Categorias[];

export type FormData = {
  titulo: string;
  horarioInicio: Date;
  horarioFim: Date;
  categoria: Categorias;
};

type Props = {
  onSubmit: (data: FormData) => void;
};

const FormularioAtividade = ({ onSubmit }: Props) => {
  const [mostrarCategorias, setMostrarCategorias] = useState(false);
  const [mostrarPickerInicio, setmostrarPickerInicio] = useState(false);
  const [mostrarPickerFim, setmostrarPickerFim] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      categoria: "work",
    },
  });

  const formatarHorario = (date: Date) => {
    return `${date.getHours().toString().padStart(2, "0")}:${date
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
  };

  const enviar = async (data: FormData) => {
    try {
      await onSubmit(data);
      reset();
      Alert.alert("Atividade salva com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar Atividade:", error);
      Alert.alert(
        "Erro",
        "Não foi possível salvar sua Atividade. Tente novamente."
      );
    }
  };

  return (
    <View>
      <Text>Título</Text>
      <Controller
        control={control}
        name="titulo"
        rules={{ required: "Título é obrigatório" }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={globalStyles.input}
            placeholder="Nova atividade"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.titulo && (
        <Text style={styles.errorText}>{errors.titulo.message}</Text>
      )}

      <Text>Categoria</Text>
      <Controller
        control={control}
        name="categoria"
        rules={{ required: "Categoria é obrigatória" }}
        render={({ field: { onChange, value } }) => (
          <View style={styles.categoriaWrapper}>
            <TouchableOpacity
              style={[globalStyles.input, styles.categoriaBotao]}
              onPress={() => setMostrarCategorias(!mostrarCategorias)}
            >
              <Text>
                {value ? categoriaLabels[value] : "Selecione a categoria"}
              </Text>
            </TouchableOpacity>

            {mostrarCategorias && (
              <View style={styles.dropdown}>
                {categoriasLista.map((cat) => (
                  <TouchableOpacity
                    key={cat}
                    onPress={() => {
                      onChange(cat);
                      setMostrarCategorias(false);
                    }}
                    style={[
                      styles.dropdownItem,
                      value === cat && styles.itemSelecionado,
                    ]}
                  >
                    <Text>{categoriaLabels[cat]}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {errors.categoria && (
              <Text style={styles.errorText}>{errors.categoria.message}</Text>
            )}
          </View>
        )}
      />

      <Text>Início</Text>
      <Controller
        control={control}
        name="horarioInicio"
        rules={{ required: "Horário de início é obrigatório" }}
        render={({ field: { onChange, value } }) => (
          <>
            <TouchableOpacity
              style={globalStyles.input}
              onPress={() => setmostrarPickerInicio(true)}
            >
              <Text>
                {value
                  ? formatarHorario(value)
                  : "Selecione o horário de início"}
              </Text>
            </TouchableOpacity>

            {mostrarPickerInicio && (
              <DateTimePicker
                value={value || new Date()}
                mode="time"
                is24Hour={true}
                display="spinner"
                onChange={(_, selectedDate) => {
                  setmostrarPickerInicio(Platform.OS === "ios");
                  if (selectedDate) onChange(selectedDate);
                }}
              />
            )}
          </>
        )}
      />

      <Text>Fim</Text>
      <Controller
        control={control}
        name="horarioFim"
        rules={{ required: "Horário de fim é obrigatório" }}
        render={({ field: { onChange, value } }) => (
          <>
            <TouchableOpacity
              style={globalStyles.input}
              onPress={() => setmostrarPickerFim(true)}
            >
              <Text>
                {value ? formatarHorario(value) : "Selecione o horário de fim"}
              </Text>
            </TouchableOpacity>

            {mostrarPickerFim && (
              <DateTimePicker
                value={value || new Date()}
                mode="time"
                is24Hour={true}
                display="spinner"
                onChange={(_, selectedDate) => {
                  setmostrarPickerFim(Platform.OS === "ios");
                  if (selectedDate) onChange(selectedDate);
                }}
              />
            )}
          </>
        )}
      />

      <TouchableOpacity
        style={globalStyles.button}
        onPress={handleSubmit(enviar)}
      >
        <Text style={globalStyles.buttonText}>Salvar Atividade</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FormularioAtividade;

const styles = StyleSheet.create({
  errorText: {
    color: "red",
  },
  categoriaWrapper: {
    position: "relative",
  },
  categoriaBotao: {
    justifyContent: "center",
  },
  dropdown: {
    position: "absolute",
    top: 55,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 6,
    borderWidth: 1,
    borderColor: "#ddd",
    zIndex: 9999,
    elevation: 10,
  },
  dropdownItem: {
    padding: 10,
    borderRadius: 6,
  },
  itemSelecionado: {
    backgroundColor: "#e5e7eb",
  },
});
