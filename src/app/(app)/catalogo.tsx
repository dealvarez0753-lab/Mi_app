import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    Pressable,
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

export default function Catalogo() {
  const router = useRouter();

  const [items, setItems] = useState<Item[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);
  const [errorTexto, setErrorTexto] = useState("");

  const cargarCatalogo = async () => {
    try {
      setCargando(true);
      setErrorTexto("");

      const { data, error } = await supabase
        .from("catalogo_qr")
        .select("codigo, titulo, descripcion, detalle, precio")
        .order("codigo", { ascending: true });

      if (error) {
        console.error("Error Supabase:", error);
        throw error;
      }

      console.log("Destinos recibidos:", data);
      setItems((data as Item[]) || []);
    } catch (error: unknown) {
      console.error("Error al cargar catálogo:", error);
      const mensaje =
        error instanceof Error
          ? error.message
          : typeof error === "object" &&
            error !== null &&
            "message" in error
          ? String((error as { message: unknown }).message)
          : String(error);

      setErrorTexto("No fue posible cargar: " + mensaje);
      setItems([]);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarCatalogo();
  }, []);

  if (cargando) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" color="#0E86D4" />
        <Text style={styles.cargandoTexto}>
          Consultando destinos en Supabase...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Explora nuestro catálogo</Text>
      <Text style={styles.subtitulo}>
        Descubre nuestros destinos y planes turísticos
      </Text>

      {errorTexto ? (
        <View style={styles.errorCaja}>
          <Text style={styles.errorTexto}>{errorTexto}</Text>
          <Pressable style={styles.botonReintentar} onPress={cargarCatalogo}>
            <Text style={styles.botonTexto}>Reintentar conexión</Text>
          </Pressable>
        </View>
      ) : null}

      <FlatList
        data={items}
        keyExtractor={(item) => String(item.codigo)}
        contentContainerStyle={styles.lista}
        ListEmptyComponent={() =>
          errorTexto ? null : (
            <View style={styles.centro}>
              <Text style={styles.vacio}>No hay destinos registrados.</Text>
            </View>
          )
        }
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() =>
              router.push({
                pathname: "/detalle" as any,
                params: {
                  codigo: item.codigo,
                },
              })
            }
          >
            <View style={styles.iconoCaja}>
              <Text style={styles.icono}>✈️</Text>
            </View>

            <View style={styles.info}>
              <Text style={styles.nombre}>{item.titulo}</Text>

              <Text style={styles.descripcion}>{item.descripcion}</Text>

              {item.precio !== null && item.precio !== undefined && (
                <Text style={styles.precio}>
                  ${Number(item.precio).toLocaleString("es-CO")}
                </Text>
              )}

              <Text style={styles.enlace}>Ver detalles →</Text>
            </View>
          </Pressable>
        )}
      />

      {!errorTexto && (
        <Pressable style={styles.botonActualizar} onPress={cargarCatalogo}>
          <Text style={styles.botonTexto}>Actualizar catálogo</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F7FA",
    padding: 16,
  },
  centro: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F0F7FA",
    padding: 20,
  },
  cargandoTexto: {
    marginTop: 10,
    color: "#526B84",
    fontSize: 14,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1A5276",
    textAlign: "center",
  },
  subtitulo: {
    fontSize: 13,
    color: "#566573",
    textAlign: "center",
    marginTop: 4,
    marginBottom: 16,
  },
  errorCaja: {
    backgroundColor: "#FDEDEC",
    borderColor: "#F5B7B1",
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    alignItems: "center",
  },
  errorTexto: {
    color: "#922B21",
    fontSize: 13,
    textAlign: "center",
    marginBottom: 10,
  },
  botonReintentar: {
    backgroundColor: "#C0392B",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 10,
  },
  lista: {
    paddingBottom: 20,
  },
  vacio: {
    color: "#7F8C8D",
    fontSize: 14,
    textAlign: "center",
    marginTop: 30,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D4E6F1",
    elevation: 2,
  },
  iconoCaja: {
    width: 50,
    height: 50,
    borderRadius: 14,
    backgroundColor: "#E1F1FB",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  icono: {
    fontSize: 24,
  },
  info: {
    flex: 1,
  },
  nombre: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1B3A4B",
  },
  descripcion: {
    fontSize: 13,
    color: "#566573",
    marginTop: 2,
  },
  precio: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#1A5276",
    marginTop: 6,
  },
  enlace: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#0E86D4",
    marginTop: 6,
  },
  botonActualizar: {
    backgroundColor: "#1A5276",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
  },
  botonTexto: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 14,
  },
});