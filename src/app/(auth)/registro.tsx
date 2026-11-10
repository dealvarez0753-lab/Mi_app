import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { supabase } from "../../lib/supabase";

export default function Registro() {
  const router = useRouter();
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [guardando, setGuardando] = useState(false);

  const crearCuenta = async () => {
    if (!correo.trim() || !password) {
      Alert.alert("Campos incompletos", "Ingrese correo y contraseña");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Contraseña", "Debe tener mínimo 6 caracteres");
      return;
    }

    try {
      setGuardando(true);

      const { error } = await supabase.auth.signUp({
        email: correo.trim(),
        password,
      });

      if (error) {
        Alert.alert("Error", error.message);
        return;
      }

      // Para practicar el login, cerramos la sesión creada por signUp.
      await supabase.auth.signOut();

      Alert.alert("Cuenta creada", "Ahora puede iniciar sesión en la agencia");
      router.replace("./login");
    } finally {
      setGuardando(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>🌍</Text>
      <Text style={styles.titulo}>Crear cuenta de viajero</Text>

      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={correo}
        onChangeText={setCorreo}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Pressable
        style={styles.boton}
        onPress={crearCuenta}
        disabled={guardando}
      >
        {guardando ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.botonTexto}>Crear cuenta</Text>
        )}
      </Pressable>

      <Pressable onPress={() => router.replace("./login")}>
        <Text style={styles.enlace}>Ya tengo una cuenta</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#F0F7FA",
  },
  logo: {
    fontSize: 56,
    textAlign: "center",
    marginBottom: 8,
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1A5276",
    textAlign: "center",
    marginBottom: 24,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D4E6F1",
    borderRadius: 14,
    padding: 14,
    marginBottom: 14,
    color: "#1B3A4B",
  },
  boton: {
    backgroundColor: "#0E86D4",
    padding: 15,
    borderRadius: 14,
    alignItems: "center",
  },
  botonTexto: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  enlace: {
    color: "#1A5276",
    textAlign: "center",
    marginTop: 18,
    fontWeight: "600",
  },
});