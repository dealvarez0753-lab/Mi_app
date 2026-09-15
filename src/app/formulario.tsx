import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

export default function Formulario() {
  const router = useRouter();
  const [nombre, setNombre] = useState("");
  const [destino, setDestino] = useState("");
  const [viajeros, setViajeros] = useState("");
  const [telefono, setTelefono] = useState("");

  const enviar = () => {
    if (!nombre || !destino || !viajeros || !telefono) {
      alert("Por favor completa todos los campos para solicitar la cotización.");
      return;
    }

    router.push({
      pathname: "/resultado",
      params: {
        nombre,
        destino,
        viajeros,
        telefono,
      },
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Reserva tu Viaje</Text>
      <Text style={styles.subtitulo}>
        Ingresa tus datos y planifiquemos tus próximas vacaciones.
      </Text>

      <View style={styles.card}>
        <Text style={styles.label}>Nombre completo</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: Laura Gómez"
          value={nombre}
          onChangeText={setNombre}
        />

        <Text style={styles.label}>Destino deseado</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: Cartagena, Cancún, Madrid..."
          value={destino}
          onChangeText={setDestino}
        />

        <Text style={styles.label}>Número de viajeros</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: 2 personas"
          keyboardType="numeric"
          value={viajeros}
          onChangeText={setViajeros}
        />

        <Text style={styles.label}>Teléfono de contacto</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: 3101234567"
          keyboardType="phone-pad"
          value={telefono}
          onChangeText={setTelefono}
        />

        <Pressable style={styles.boton} onPress={enviar}>
          <Text style={styles.botonTexto}>Reservar</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F0F7FA",
    padding: 20,
    justifyContent: "center",
  },
  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#1A5276",
    textAlign: "center",
  },
  subtitulo: {
    color: "#566573",
    textAlign: "center",
    marginBottom: 20,
    marginTop: 4,
  },
  card: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#D4E6F1",
    elevation: 3,
  },
  label: {
    color: "#2C3E50",
    fontWeight: "600",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#F9FCFD",
    borderWidth: 1,
    borderColor: "#BDC3C7",
    borderRadius: 12,
    padding: 12,
    marginBottom: 14,
  },
  boton: {
    backgroundColor: "#1A5276",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 6,
  },
  botonTexto: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
  },
});