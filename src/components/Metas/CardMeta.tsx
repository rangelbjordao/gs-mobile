import { globalStyles } from "@/styles/global";
import DateTimePicker from "@react-native-community/datetimepicker";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface CardMetaProps {
  titulo: string;
  valor: Date;
  aoMudar: (novaHora: Date) => void;
}

const CardMeta: React.FC<CardMetaProps> = ({ titulo, valor, aoMudar }) => {
  const [mostrarPicker, setMostrarPicker] = React.useState(false);

  const selecionarHora = (_: any, novaHora?: Date) => {
    setMostrarPicker(false);
    if (novaHora) aoMudar(novaHora);
  };

  return (
    <View style={globalStyles.card}>
      <Text style={globalStyles.cardTitle}>{titulo}</Text>

      <TouchableOpacity
        style={globalStyles.input}
        onPress={() => setMostrarPicker(true)}
      >
        <Text style={{ fontSize: 16 }}>
          {valor.toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Text>
      </TouchableOpacity>

      {mostrarPicker && (
        <DateTimePicker
          value={valor}
          mode="time"
          is24Hour
          display="spinner"
          onChange={selecionarHora}
        />
      )}
    </View>
  );
};

export default CardMeta;
