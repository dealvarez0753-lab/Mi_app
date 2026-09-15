import { useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Resultado() {
  const router = useRouter();
  const { nombre, destino, viajeros, telefono } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Cotización Recibida</Text>
      <Text style={styles.subtitulo}>
        Revisa los detalles enviados. Un asesor te responderá en breve.
      </Text>

      <View style={styles.card}>
        <Text style={styles.label}>Titular del viaje</Text>
        <Text style={styles.valor}>{nombre}</Text>

        <Text style={styles.label}>Destino seleccionado</Text>
        <Text style={styles.valor}>{destino}</Text>

        <Text style={styles.label}>Cantidad de pasajeros</Text>
        <Text style={styles.valor}>{viajeros}</Text>

        <Text style={styles.label}>Teléfono de contacto</Text>
        <Text style={styles.valor}>{telefono}</Text>
      </View>

      <Pressable style={styles.boton} onPress={() => router.replace("/")}>
        <Text style={styles.botonTexto}>Volver al inicio</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F7FA",
    justifyContent: "center",
    padding: 20,
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
    marginBottom: 22,
    marginTop: 4,
  },
  card: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#D4E6F1",
    marginBottom: 20,
    elevation: 3,
  },
  label: {
    color: "#7F8C8D",
    fontSize: 13,
    marginTop: 6,
  },
  valor: {
    color: "#1B3A4B",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 6,
  },
  boton: {
    backgroundColor: "#1A5276",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  botonTexto: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
  },
});