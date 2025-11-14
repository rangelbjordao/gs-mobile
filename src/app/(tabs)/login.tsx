import { globalStyles } from "@/styles/global";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
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

type LoginScreenProps = {
  onLogin: () => void;
};

const LoginScreen = ({ onLogin }: LoginScreenProps) => {
  const [isLogin, setIsLogin] = useState(true);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log("Dados enviados:", data);
    onLogin();
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
          style={globalStyles.button}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={globalStyles.buttonText}>
            {isLogin ? "Entrar" : "Cadastrar"}
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
