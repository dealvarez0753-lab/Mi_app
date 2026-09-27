import { useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export default function Resultado() {
  const router = useRouter();

  // Datos devueltos por Supabase después del INSERT (Paso 10)
  const {nombre, correo, telefono, viajeros, ciudad, destino, tipoViaje } =
    useLocalSearchParams();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.icono}>✅</Text>
      <Text style={styles.titulo}>Reservación Recibida</Text>
      <Text style={styles.subtitulo}>
        Tu solicitud quedó guardada. Un asesor te responderá en breve.
      </Text>

      <View style={styles.card}>

        <Text style={styles.label}>Titular del viaje</Text>
        <Text style={styles.valor}>{nombre}</Text>

        <Text style={styles.label}>Correo electrónico</Text>
        <Text style={styles.valor}>{correo}</Text>

        <Text style={styles.label}>Teléfono / WhatsApp</Text>
        <Text style={styles.valor}>{telefono}</Text>

        <Text style={styles.label}>Número de viajeros</Text>
        <Text style={styles.valor}>{viajeros}</Text>


        <Text style={styles.label}>Ciudad de origen</Text>
        <Text style={styles.valor}>{ciudad}</Text>

        <Text style={styles.label}>Destino deseado</Text>
        <Text style={styles.valor}>{destino}</Text>

        <Text style={styles.label}>Tipo de viaje</Text>
        <Text style={styles.valor}>{tipoViaje}</Text>
      </View>

      <Pressable
        style={({ pressed }) => [styles.boton, pressed && styles.presionado]}
        onPress={() => router.push("/registros")}
      >
        <Text style={styles.botonTexto}>Ver Viajeros Registrados</Text>
      </Pressable>

      <Pressable
        style={({ pressed }) => [
          styles.botonSecundario,
          pressed && styles.presionado,
        ]}
        onPress={() => router.replace("/")}
      >
        <Text style={styles.botonSecundarioTexto}>Volver al inicio</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F0F7FA",
    justifyContent: "center",
    padding: 20,
  },
  icono: {
    fontSize: 40,
    textAlign: "center",
    marginBottom: 6,
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
  badge: {
    alignSelf: "flex-start",
    backgroundColor: "#E1F1FB",
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  badgeTexto: {
    color: "#0E86D4",
    fontWeight: "bold",
    fontSize: 13,
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
    backgroundColor: "#0E86D4",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 10,
  },
  botonTexto: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 15,
  },
  botonSecundario: {
    borderWidth: 1.5,
    borderColor: "#1A5276",
    padding: 13,
    borderRadius: 12,
    alignItems: "center",
  },
  botonSecundarioTexto: {
    color: "#1A5276",
    fontWeight: "bold",
    fontSize: 15,
  },
  presionado: {
    opacity: 0.85,
  },
});
