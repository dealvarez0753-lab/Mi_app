import { useRouter } from "expo-router";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

function BotonHorizontal({
  icono,
  titulo,
  colorFondo,
  onPress,
}: {
  icono: string;
  titulo: string;
  colorFondo: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.botonColumna,
        { backgroundColor: colorFondo },
        pressed && styles.botonPresionado,
      ]}
      onPress={onPress}
    >
      <View style={styles.iconoContenedor}>
        <Text style={styles.iconoTexto}>{icono}</Text>
      </View>
      <Text style={styles.botonTitulo} numberOfLines={2}>
        {titulo}
      </Text>
    </Pressable>
  );
}

export default function Inicio() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      /* PORTADA PRINCIPAL */
      <View style={styles.hero}>
        <Image
          source={{
            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmgH_-VdYHnqlPiN5SgllK3g0CZuJ20xH7-khBky9k0VddSju72qC8k4o&s=10https://images.unsplash.com/photo-1488646953014-85cb44e25828",
          }}
          style={styles.imagenHero}
        />
        <View style={styles.overlay}>
          <Text style={styles.etiqueta}>AGENCIA DE VIAJES</Text>
          <Text style={styles.titulo}>Viajes.com</Text>
          <Text style={styles.subtitulo}>
            Planea tus vacaciones ahora....
          </Text>
        </View>
      </View>

      /* BIENVENIDA */
      <View style={styles.saludoBox}>
        <View>
          <Text style={styles.saludoTitulo}>¡Hola viajero!</Text>
          <Text style={styles.saludoTexto}>¿Cuál es tu proximo destino?</Text>
        </View>
        <View style={styles.avatar}>
          <Text style={styles.avatarTexto}>✈️</Text>
          <Text style={styles.avatarTexto}>🚌</Text>
        </View>
      </View>

      /* RESUMEN */
      <View style={styles.resumen}>
        <View style={styles.resumenItem}>
          <Text style={styles.resumenNumero}>+40</Text>
          <Text style={styles.resumenTexto}>Destinos</Text>
        </View>
        <View style={styles.separador} />
        <View style={styles.resumenItem}>
          <Text style={styles.resumenNumero}>24/7</Text>
          <Text style={styles.resumenTexto}>Soporte</Text>
        </View>
        <View style={styles.separador} />
        <View style={styles.resumenItem}>
          <Text style={styles.resumenNumero}>100%</Text>
          <Text style={styles.resumenTexto}>Seguro</Text>
        </View>
      </View>

      <Text style={styles.seccionTitulo}>Servicios de Viaje</Text>

      /* LOS 3 BOTONES ALINEADOS EN UNA FILA */
      <View style={styles.filaBotones}>
        <BotonHorizontal
          icono="📝"
          titulo="Formulario de reservas"
          colorFondo="#1A5276" // Azul Marino
          onPress={() => router.push("/formulario")}
        />

        <BotonHorizontal
          icono="🏝️"
          titulo="Galeria de destinos"
          colorFondo="#0E86D4" // Azul Caribe
          onPress={() => router.push("/imagenes")}
        />

        <BotonHorizontal
          icono="📍"
          titulo="Contacto"
          colorFondo="#D97706" // Naranja Sol
          onPress={() => router.push("/contacto")}
        />
      </View>

      /* VIAJEROS REGISTRADOS (consulta a Supabase) */
      <Pressable
        style={({ pressed }) => [
          styles.destacado,
          pressed && styles.botonPresionado,
        ]}
        onPress={() => router.push("/registros")}
      >
        <View style={styles.destacadoIcono}>
          <Text style={styles.destacadoEmoji}>🧳</Text>
        </View>
        <View style={styles.destacadoInfo}>
          <Text style={styles.destacadoTitulo}>Viajeros Registrados</Text>
          <Text style={styles.destacadoTexto}>
            Consulta las personas registradas y sus destinos soñados.
          </Text>
        </View>
      </Pressable>

      <Text style={styles.footer}>Viajes.com · Desarrollo Móvil</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F0F7FA",
    padding: 16,
  },
  hero: {
    height: 250,
    borderRadius: 22,
    overflow: "hidden",
    marginBottom: 16,
    elevation: 4,
  },
  imagenHero: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    padding: 18,
    backgroundColor: "rgba(16, 44, 66, 0.78)",
  },
  etiqueta: {
    color: "#7FD5FF",
    fontSize: 11,
    fontWeight: "bold",
    letterSpacing: 1.6,
    marginBottom: 4,
  },
  titulo: {
    color: "#FFFFFF",
    fontSize: 27,
    fontWeight: "bold",
    marginBottom: 4,
  },
  subtitulo: {
    color: "#E1F2FB",
    fontSize: 13,
    lineHeight: 18,
  },
  saludoBox: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
    elevation: 2,
  },
  saludoTitulo: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#1B3A4B",
  },
  saludoTexto: {
    marginTop: 2,
    color: "#5C768D",
    fontSize: 13,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#E1F1FB",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarTexto: {
    fontSize: 20,
  },
  resumen: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 18,
    elevation: 2,
  },
  resumenItem: {
    flex: 1,
    alignItems: "center",
  },
  resumenNumero: {
    color: "#1A5276",
    fontSize: 17,
    fontWeight: "bold",
  },
  resumenTexto: {
    color: "#607274",
    fontSize: 12,
    marginTop: 2,
  },
  separador: {
    width: 1,
    height: 26,
    backgroundColor: "#DCEBF2",
  },
  seccionTitulo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1B3A4B",
    marginBottom: 12,
  },
  // BOTONES ALINEADOS EN FILA
  filaBotones: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    gap: 10,
  },
  botonColumna: {
    flex: 1,
    height: 98,
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 6,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  botonPresionado: {
    opacity: 0.85,
    transform: [{ scale: 0.96 }],
  },
  iconoContenedor: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 6,
  },
  iconoTexto: {
    fontSize: 20,
  },
  botonTitulo: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
  },
  // DESTACADO Y PIE
  destacado: {
    backgroundColor: "#E3F2FD",
    borderRadius: 18,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  destacadoIcono: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  destacadoEmoji: {
    fontSize: 20,
  },
  destacadoInfo: {
    flex: 1,
  },
  destacadoTitulo: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#0D47A1",
    marginBottom: 2,
  },
  destacadoTexto: {
    color: "#37474F",
    fontSize: 12,
    lineHeight: 16,
  },
  footer: {
    textAlign: "center",
    color: "#78909C",
    fontSize: 12,
    marginTop: 20,
    marginBottom: 8,
  },
});