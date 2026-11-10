import { StyleSheet, Text, View } from "react-native";

export default function Contacto() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Atención al Viajero</Text>
      <Text style={styles.subtitulo}>
        Canales oficiales de comunicación y soporte turístico.
      </Text>

      <View style={styles.card}>
        <Text style={styles.label}>Agencia</Text>
        <Text style={styles.valor}></Text>

        <Text style={styles.label}>Línea de WhatsApp</Text>
        <Text style={styles.valor}>+57 312 2011725</Text>

        <Text style={styles.label}>Correo de Reservas</Text>
        <Text style={styles.valor}>reservas@mundoyrutas.com</Text>

        <Text style={styles.label}>Sede Principal</Text>
        <Text style={styles.valor}>Pasto, Nariño</Text>

        <Text style={styles.label}>Institución</Text>
        <Text style={styles.valor}>Universidad CESMAG</Text>

        <Text style={styles.label}>Asignatura</Text>
        <Text style={styles.valor}>Desarrollo Móvil</Text>
      </View>
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
    textAlign: "center",
    color: "#1A5276",
  },
  subtitulo: {
    textAlign: "center",
    color: "#566573",
    marginBottom: 22,
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
    color: "#7F8C8D",
    fontSize: 12,
    marginTop: 8,
  },
  valor: {
    color: "#1B3A4B",
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 2,
  },
});