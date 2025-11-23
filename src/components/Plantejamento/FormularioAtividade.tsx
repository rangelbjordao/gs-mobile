import { globalStyles } from "@/styles/global";
import { CategoriaBackend, categoriaLabels } from "@/types/goalTypes";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Alert,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const categoriasLista = Object.keys(categoriaLabels) as CategoriaBackend[];

export type FormData = {
  horarioInicio: string;
  horarioFim: string;
  categoria: CategoriaBackend;
};

type Props = {
  onSubmit: (data: FormData) => Promise<void>;
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
      categoria: "TRABALHO",
    },
  });

  const formatarHorarioParaExibir = (horarioString: string) => {
    return horarioString.substring(0, 5);
  };

  const enviar = async (data: FormData) => {
    try {
      await onSubmit(data);
      reset();
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
                  ? formatarHorarioParaExibir(value)
                  : "Selecione o horário de início"}
              </Text>
            </TouchableOpacity>

            {mostrarPickerInicio && (
              <DateTimePicker
                value={value ? new Date(`2000-01-01T${value}`) : new Date()}
                mode="time"
                is24Hour={true}
                display="spinner"
                onChange={(_, selectedDate) => {
                  setmostrarPickerInicio(Platform.OS === "ios");

                  if (selectedDate) {
                    const timeString = selectedDate.toLocaleTimeString(
                      "en-US",
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        hour12: false,
                      }
                    );

                    onChange(timeString);
                  }
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
                {value
                  ? formatarHorarioParaExibir(value)
                  : "Selecione o horário de fim"}
              </Text>
            </TouchableOpacity>

            {mostrarPickerFim && (
              <DateTimePicker
                value={value ? new Date(`2000-01-01T${value}`) : new Date()}
                mode="time"
                is24Hour={true}
                display="spinner"
                onChange={(_, selectedDate) => {
                  setmostrarPickerFim(Platform.OS === "ios");

                  if (selectedDate) {
                    const timeString = selectedDate.toLocaleTimeString(
                      "en-US",
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        hour12: false,
                      }
                    );

                    onChange(timeString);
                  }
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
