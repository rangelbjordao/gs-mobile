import CardMetasDiaria from "@/components/Inicio/CardMetasDiaria";
import CardProgresso from "@/components/Inicio/CardProgresso";
import ProximasAtividades, {
  Atividade,
} from "@/components/Inicio/ProximasAtividades";
import { globalStyles } from "@/styles/global";
import React, { useState } from "react";
import { ScrollView, Text } from "react-native";

type Categorias = "work" | "leisure" | "sleep" | "exercise";

const HomeScreen = () => {
  const [atividades, setAtividades] = useState<Atividade[]>([
    {
      id: "1",
      titulo: "Trabalho",
      horarioInicio: new Date(),
      horarioFim: new Date(),
      categoria: "work",
      completed: false,
    },
    {
      id: "2",
      titulo: "Exercício",
      horarioInicio: new Date(),
      horarioFim: new Date(),
      categoria: "exercise",
      completed: true,
    },
    {
      id: "3",
      titulo: "Lazer",
      horarioInicio: new Date(),
      horarioFim: new Date(),
      categoria: "leisure",
      completed: false,
    },
  ]);

  const [metas, setMetas] = useState<Record<Categorias, Date>>({
    work: new Date(new Date().setHours(8, 0)),
    exercise: new Date(new Date().setHours(1, 0)),
    leisure: new Date(new Date().setHours(2, 0)),
    sleep: new Date(new Date().setHours(7, 0)),
  });

  const toggleComplete = (id: string) => {
    setAtividades((prev) =>
      prev.map((a) => (a.id === id ? { ...a, completed: true } : a))
    );
  };

  const todayActivities = atividades.filter((a) => !a.completed);
  const completedActivities = atividades.filter((a) => a.completed);

  return (
    <ScrollView contentContainerStyle={globalStyles.container}>
      <Text style={globalStyles.title}>Olá, Usuário!</Text>

      <Text style={globalStyles.subtitle}>Como está seu progresso hoje?</Text>

      <CardProgresso
        completed={completedActivities.length}
        total={atividades.length}
      />

      <Text style={globalStyles.subtitle}>Próximas Atividades</Text>
      <ProximasAtividades
        atividades={todayActivities}
        toggleComplete={toggleComplete}
      />

      <Text style={globalStyles.subtitle}>Suas Metas Diárias</Text>
      <CardMetasDiaria metas={metas} />
    </ScrollView>
  );
};

export default HomeScreen;
