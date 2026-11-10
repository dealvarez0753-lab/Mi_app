import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { supabase } from "../../lib/supabase";

type Item = {
  codigo: string;
  titulo: string;
  descripcion: string;
  detalle: string;
  precio: number | null;
};

export default function Detalle() {
  const router = useRouter();
  const { codigo } = useLocalSearchParams<{ codigo?: string }>();

  const [item, setItem] = useState<Item | null>(null);
  const [cargando, setCargando] = useState(true);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    let activo = true;
    async function consultar() {
      try {
        const { data, error } = await supabase
          .from("catalogo_qr")
          .select("codigo,titulo,descripcion,detalle,precio")
          .eq("codigo", codigo)
          .maybeSingle();
        if (error) throw error;
        if (activo) {
          setItem(data);
          if (!data) setMensaje("Destino no encontrado");
        }
      } catch (e) {
        if (activo) setMensaje("Error al consultar el destino");
      } finally {
        if (activo) setCargando(false);
      }
    }
    if (codigo) consultar();
    else {
      setMensaje("Falta código del destino");
      setCargando(false);
    }
    return () => {
      activo = false;
    };
  }, [codigo]);

  if (cargando) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" color="#0E86D4" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {item ? (
        <View style={styles.card}>
          <Text style={styles.titulo}>✈️ {item.titulo}</Text>
          <Text style={styles.codigo}>Código: {item.codigo}</Text>
          <Text style={styles.descripcion}>{item.descripcion}</Text>
          <Text style={styles.detalle}>{item.detalle}</Text>
          {item.precio != null && (
            <Text style={styles.precio}>
              ${Number(item.precio).toLocaleString("es-CO")}
            </Text>
          )}
        </View>
      ) : (
        <Text style={styles.mensaje}>{mensaje}</Text>
      )}
      <Pressable style={styles.boton} onPress={() => router.back()}>
        <Text style={{ color: "white", fontWeight: "bold" }}>
          Volver al catálogo
        </Text>
      </Pressable>
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
  centro: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F0F7FA",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 20,
    borderWidth: 1,
    borderColor: "#D4E6F1",
    marginBottom: 20,
    elevation: 3,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1A5276",
    marginBottom: 6,
  },
  codigo: {
    fontSize: 13,
    color: "#7F8C8D",
    fontWeight: "bold",
    marginBottom: 12,
  },
  descripcion: {
    fontSize: 15,
    color: "#1B3A4B",
    fontWeight: "600",
    marginBottom: 10,
  },
  detalle: {
    fontSize: 14,
    color: "#566573",
    lineHeight: 20,
    marginBottom: 16,
  },
  precio: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0E86D4",
  },
  mensaje: {
    textAlign: "center",
    color: "#922B21",
    fontSize: 15,
    marginBottom: 20,
  },
  boton: {
    backgroundColor: "#1A5276",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
  },
});