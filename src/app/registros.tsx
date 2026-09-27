import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { supabase } from "../lib/supabase";

// Estructura de una fila de la tabla clientes_agencia
type Viajero = {
  id: number;
  nombre: string;
  correo: string;
  telefono: string;
  ciudad: string;
  destino_favorito: string;
  tipo_viaje: string | null;
  created_at: string;
};

// Emoji según el tipo de viaje
const iconoTipo = (tipo: string | null) => {
  switch (tipo) {
    case "Playa":
      return "🏖️";
    case "Aventura":
      return "🧗";
    case "Cultural":
      return "🏛️";
    case "Gastronómico":
      return "🍽️";
    default:
      return "🧳";
  }
};

export default function Registros() {
  const [registros, setRegistros] = useState<Viajero[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    cargarRegistros();
  }, []);

  // SELECT * FROM clientes_agencia ORDER BY id DESC (Paso 11 y 12)
  const cargarRegistros = async () => {
    setCargando(true);

    const { data, error } = await supabase
      .from("clientes_agencia")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      console.error("ERROR SUPABASE:", error);
      Alert.alert("Error al consultar", error.message);
      setCargando(false);
      return;
    }

    setRegistros(data || []);
    setCargando(false);
  };

  if (cargando) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" color="#0E86D4" />
        <Text style={styles.cargandoTexto}>Consultando Supabase...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Viajeros Registrados</Text>
      <Text style={styles.subtitulo}>
        {registros.length} {registros.length === 1 ? "solicitud" : "solicitudes"} de
        viaje guardadas
      </Text>

      <FlatList
        data={registros}
        keyExtractor={(item) => item.id.toString()}
        onRefresh={cargarRegistros}
        refreshing={cargando}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={
          <Text style={styles.vacio}>
            Aún no hay viajeros registrados. ¡Registra el primero desde el
            formulario!
          </Text>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.iconoContainer}>
                <Text style={styles.icono}>{iconoTipo(item.tipo_viaje)}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.nombre}>{item.nombre}</Text>
                <Text style={styles.correo}>{item.correo}</Text>
              </View>
              <Text style={styles.id}>#{item.id}</Text>
            </View>

            <View style={styles.ruta}>
              <Text style={styles.rutaTexto}>{item.ciudad}</Text>
              <Text style={styles.rutaFlecha}>✈️</Text>
              <Text style={styles.rutaTexto}>{item.destino_favorito}</Text>
            </View>

            <View style={styles.cardFooter}>
              <Text style={styles.detalle}>📞 {item.telefono}</Text>
              <View style={styles.tipoBadge}>
                <Text style={styles.tipoTexto}>
                  {item.tipo_viaje || "Sin especificar"}
                </Text>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F7FA",
    padding: 18,
  },
  centro: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F0F7FA",
  },
  cargandoTexto: {
    marginTop: 10,
    color: "#526B84",
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
    marginTop: 4,
    marginBottom: 18,
  },
  vacio: {
    textAlign: "center",
    color: "#7F8C8D",
    marginTop: 40,
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 18,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#D4E6F1",
    elevation: 2,
    shadowColor: "#163A5F",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 8,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  iconoContainer: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "#E1F1FB",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  icono: {
    fontSize: 22,
  },
  nombre: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#1B3A4B",
  },
  correo: {
    color: "#5C768D",
    fontSize: 13,
    marginTop: 1,
  },
  id: {
    color: "#8C9CAE",
    fontWeight: "bold",
    fontSize: 12,
  },
  ruta: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F4F9FC",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginBottom: 12,
  },
  rutaTexto: {
    flex: 1,
    color: "#1A5276",
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
  },
  rutaFlecha: {
    fontSize: 16,
    marginHorizontal: 8,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  detalle: {
    color: "#47617B",
    fontSize: 13,
  },
  tipoBadge: {
    backgroundColor: "#FEF3C7",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  tipoTexto: {
    color: "#B45309",
    fontWeight: "bold",
    fontSize: 12,
  },
});
