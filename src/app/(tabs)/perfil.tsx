import { globalStyles } from "@/styles/global";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const PerfilScreen = () => {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [userName, setUserName] = useState("Usuário");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: { name: userName },
  });

  function onSubmit(data: { name: string }) {
    const formattedName = data.name.trim().replace(/\s+/g, " ");

    if (formattedName.length === 0) {
      return Alert.alert("Atenção", "O nome não pode ficar vazio.");
    }

    setUserName(formattedName);
    setValue("name", formattedName);
    setIsEditingProfile(false);

    Alert.alert("Sucesso!", "Nome atualizado.");
  }

  return (
    <ScrollView contentContainerStyle={globalStyles.container}>
      <View>
        <Text style={globalStyles.title}>Perfil</Text>
      </View>

      <View style={styles.profileCard}>
        <View style={styles.profileHeader}>
          <View style={styles.profileInfo}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatarTextContainer}>
                <Text style={styles.avatarText}>
                  {userName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .substring(0, 2)
                    .toUpperCase()}
                </Text>
              </View>
            </View>

            <View style={styles.nameContainer}>
              <Text
                style={styles.profileName}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {userName}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.editButton}
            onPress={() => {
              setValue("name", userName);
              setIsEditingProfile(true);
            }}
          >
            <Ionicons name="pencil" size={18} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.logoutButton}>
        <Ionicons name="log-out-outline" size={20} color="#b91c1c" />
        <Text style={styles.logoutText}>Sair da conta</Text>
      </TouchableOpacity>

      <Modal visible={isEditingProfile} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Editar Perfil</Text>

            <Text style={styles.modalLabel}>Nome</Text>

            <TextInput
              style={[
                globalStyles.input,
                errors.name && { borderColor: "red" },
              ]}
              placeholder="Seu nome"
              onChangeText={(value) => setValue("name", value)}
              {...register("name", {
                required: "O nome é obrigatório",
                maxLength: {
                  value: 40,
                  message: "O nome pode ter no máximo 40 caracteres",
                },
              })}
            />

            {errors.name && (
              <Text style={{ color: "red", marginBottom: 8 }}>
                {errors.name.message}
              </Text>
            )}

            <TouchableOpacity
              style={globalStyles.button}
              onPress={handleSubmit(onSubmit)}
            >
              <Text style={globalStyles.buttonText}>Salvar Alterações</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setIsEditingProfile(false)}>
              <Text style={{ textAlign: "center" }}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default PerfilScreen;

const styles = StyleSheet.create({
  profileCard: {
    backgroundColor: "#4f46e5",
    borderRadius: 24,
    padding: 24,
    marginBottom: 24,
  },
  profileHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    flex: 1,
  },
  avatarContainer: {
    position: "relative",
  },
  avatarTextContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#6b7280",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "700",
  },
  profileName: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
    flexShrink: 1,
  },
  nameContainer: {
    flex: 1,
    minWidth: 0,
  },
  editButton: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: "#6a63e4",
    justifyContent: "center",
    alignItems: "center",
  },
  logoutButton: {
    flexDirection: "row",
    height: 52,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: "#fecaca",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
  },
  logoutText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "500",
    color: "#b91c1c",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "#0000001c",
    justifyContent: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 16,
  },
  modalLabel: {
    fontSize: 14,
    color: "#444",
    marginBottom: 6,
  },
});
