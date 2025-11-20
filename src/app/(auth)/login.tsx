"use client";

import { api } from "@/services/api";
import { globalStyles } from "@/styles/global";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type FormData = {
  name?: string;
  email: string;
  password: string;
};

const LoginScreen = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmitRegister = async (data: FormData) => {
    setLoading(true);
    try {
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      const payload = {
        username: data.name,
        userEmail: data.email,
        password: data.password,
        timezone: timezone,
      };

      await api.post("/api/v1/auth/register", payload);

      Alert.alert("Sucesso", "Cadastro realizado com sucesso!");
      setIsLogin(true);
    } catch (error: any) {
      const backendMessage =
        error.response?.data?.message || error.response?.data;

      let mensagem = "Erro ao cadastrar. Verifique os dados.";

      const isDuplicate =
        typeof backendMessage === "string" &&
        backendMessage.toLowerCase().includes("unique constraint");

      if (isDuplicate) {
        mensagem = "Este e-mail já está cadastrado. Tente outro.";
      } else {
        console.log("Erro inesperado ao cadastrar:", backendMessage);
      }

      Alert.alert("Erro", mensagem);
    } finally {
      setLoading(false);
    }
  };

  const onSubmitLogin = async (data: FormData) => {
    setLoading(true);
    try {
      const payload = {
        userEmail: data.email,
        password: data.password,
      };

      const response = await api.post("/api/v1/auth/login", payload);

      const token = response.data?.token;
      if (!token) throw new Error("Token não retornado pelo backend");

      await AsyncStorage.setItem("@token", token);

      Alert.alert("Sucesso", "Login realizado!");
      router.replace("/(tabs)");
    } catch (error: any) {
      let mensagem = "E-mail ou senha inválidos.";

      if (error.response) {
        if (error.response.data) {
          mensagem =
            error.response.data.message || JSON.stringify(error.response.data);
        } else {
          mensagem = `Erro ${error.response.status}: ${error.response.statusText}`;
        }
      } else if (error.request) {
        mensagem = "Não foi possível conectar ao servidor. Verifique sua rede.";
      } else if (error.message) {
        mensagem = error.message;
      }

      console.log("Erro no login detalhado:", error);
      Alert.alert("Erro", mensagem);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={[
        globalStyles.container,
        { justifyContent: "center" },
      ]}
    >
      <View style={styles.header}>
        <Text style={styles.titleApp}>BalanceMe</Text>
      </View>

      <View style={globalStyles.card}>
        <Text style={globalStyles.cardTitle}>
          {isLogin ? "Login" : "Cadastro"}
        </Text>

        {!isLogin && (
          <View>
            <View style={styles.inputWrapper}>
              <Feather name="user" size={20} style={styles.inputIcon} />
              <Controller
                control={control}
                name="name"
                rules={{
                  required: !isLogin ? "Usuário é obrigatório" : false,
                  minLength: {
                    value: 3,
                    message: "O usuário deve ter no mínimo 3 caracteres",
                  },
                }}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={[globalStyles.input, styles.inputWithIcon]}
                    placeholder="Usuário"
                    value={value}
                    onChangeText={onChange}
                  />
                )}
              />
            </View>
            {errors.name && (
              <Text style={styles.errorText}>{errors.name.message}</Text>
            )}
          </View>
        )}

        <View>
          <View style={styles.inputWrapper}>
            <Feather name="mail" size={20} style={styles.inputIcon} />
            <Controller
              control={control}
              name="email"
              rules={{
                required: "E-mail é obrigatório",
                validate: (value) => value.includes("@") || "E-mail inválido",
              }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={[globalStyles.input, styles.inputWithIcon]}
                  placeholder="E-mail"
                  value={value}
                  onChangeText={onChange}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              )}
            />
          </View>
          {errors.email && (
            <Text style={styles.errorText}>{errors.email.message}</Text>
          )}
        </View>

        <View>
          <View style={styles.inputWrapper}>
            <Feather name="lock" size={20} style={styles.inputIcon} />
            <Controller
              control={control}
              name="password"
              rules={{
                required: "Senha é obrigatória",
                minLength: {
                  value: 6,
                  message: "A senha deve ter no mínimo 6 caracteres",
                },
              }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={[globalStyles.input, styles.inputWithIcon]}
                  placeholder="Senha"
                  value={value}
                  onChangeText={onChange}
                  secureTextEntry
                />
              )}
            />
          </View>
          {errors.password && (
            <Text style={styles.errorText}>{errors.password.message}</Text>
          )}
        </View>

        <TouchableOpacity
          style={[globalStyles.button, loading && { opacity: 0.6 }]}
          onPress={handleSubmit(isLogin ? onSubmitLogin : onSubmitRegister)}
          disabled={loading}
        >
          <Text style={globalStyles.buttonText}>
            {loading ? "Carregando..." : isLogin ? "Entrar" : "Cadastrar"}
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={() => setIsLogin(!isLogin)}
        style={styles.toggle}
      >
        <Text style={styles.toggleText}>
          {isLogin ? "Não tem uma conta? " : "Já tem uma conta? "}
          <Text style={styles.toggleLink}>
            {isLogin ? "Cadastre-se" : "Entrar"}
          </Text>
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    marginBottom: 32,
  },
  titleApp: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#007bff",
  },
  inputWrapper: {
    position: "relative",
    justifyContent: "center",
  },
  inputIcon: {
    position: "absolute",
    left: 10,
    zIndex: 10,
    color: "#888",
  },
  inputWithIcon: {
    paddingLeft: 40,
  },
  errorText: {
    color: "red",
    fontSize: 13,
    marginLeft: 4,
    marginTop: -6,
    marginBottom: 6,
  },
  toggle: {
    alignItems: "center",
  },
  toggleText: {
    color: "#6b7280",
  },
  toggleLink: {
    color: "#007bff",
    fontWeight: "bold",
  },
});
