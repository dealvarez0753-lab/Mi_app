import { useRouter } from "expo-router";
import { useState } from "react";

import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { supabase } from "../lib/supabase";

// Opciones para el campo "Tipo de viaje"
const TIPOS_VIAJE = [
  "Playa",
  "Aventura",
  "Cultural",
  "Gastronómico",
  "Otro",
];

export default function FormularioViaje() {
  const router = useRouter();

  // Estados del formulario
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [viajeros, setViajeros] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [destino, setDestino] = useState("");
  const [tipoViaje, setTipoViaje] = useState("");
  const [otroTipo, setOtroTipo] = useState("");

  // Estado para controlar el proceso de guardado
  const [guardando, setGuardando] = useState(false);

  // Función para validar el correo electrónico
  const validarCorreo = (email: string) => {
    const expresion = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return expresion.test(email);
  };

  // Función para guardar los datos en Supabase
  const guardar = async () => {
    // Si elige "Otro", se guarda lo que escriba el usuario
    const tipoFinal =
      tipoViaje === "Otro" ? otroTipo.trim() : tipoViaje;

    // Validar campos vacíos
    if (
      !nombre.trim() ||
      !correo.trim() ||
      !telefono.trim() ||
      !viajeros.trim() ||
      !ciudad.trim() ||
      !destino.trim() ||
      !tipoFinal
    ) {
      Alert.alert("Atención", "Todos los campos son obligatorios");
      return;
    }

    // Validar correo
    if (!validarCorreo(correo)) {
      Alert.alert(
        "Error",
        "Ingrese un correo electrónico válido"
      );
      return;
    }

    // Validar teléfono (solo dígitos)
    if (!/^\d+$/.test(telefono.trim())) {
      Alert.alert(
        "Error",
        "El teléfono debe contener solamente números"
      );
      return;
    }

    // Validar longitud mínima del teléfono
    if (telefono.trim().length < 7) {
      Alert.alert(
        "Error",
        "Ingrese un número de teléfono válido (mínimo 7 dígitos)"
      );
      return;
    }

    try {
      setGuardando(true);

      // Inserción en la tabla clientes_agencia de Supabase
      const { error } = await supabase
        .from("clientes_agencia")
        .insert([
          {
            nombre: nombre.trim(),
            correo: correo.trim(),
            telefono: telefono.trim(),
            viajeros: viajeros.trim(),
            ciudad: ciudad.trim(),
            destino_favorito: destino.trim(),
            tipo_viaje: tipoFinal,
          },
        ]);

      // Si Supabase devuelve un error, se muestra
      if (error) {
        console.error("ERROR SUPABASE:", error);
        Alert.alert("Error al guardar", error.message);
        return;
      }

      // Navegar a la pantalla de confirmación/itinerario
      // utilizando directamente los datos que acabamos de guardar
      router.push({
        pathname: "/resultado",
        params: {
          nombre: nombre.trim(),
          correo: correo.trim(),
          telefono: telefono.trim(),
          viajeros: viajeros.trim(),
          ciudad: ciudad.trim(),
          destino: destino.trim(),
          tipoViaje: tipoFinal,
        },
      });

      // Limpiar formulario
      setNombre("");
      setCorreo("");
      setTelefono("");
      setViajeros("");
      setCiudad("");
      setDestino("");
      setTipoViaje("");
      setOtroTipo("");
    } catch (error) {
      console.error("ERROR INESPERADO:", error);

      Alert.alert(
        "Error",
        "No fue posible registrar tu solicitud de viaje"
      );
    } finally {
      setGuardando(false);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      {/* ENCABEZADO */}
      <View style={styles.encabezado}>
        <View style={styles.iconoContainer}>
          <Text style={styles.iconoViaje}>✈️</Text>
        </View>

        <Text style={styles.titulo}>VIAJES.COM</Text>

        <Text style={styles.subtitulo}>
          Planifica tus próximas vacaciones con los mejores planes y tarifas.
        </Text>
      </View>

      {/* FORMULARIO */}
      <View style={styles.card}>
        <Text style={styles.cardTitulo}>
          Reserva tu proxima aventura
        </Text>

      /* NOMBRE */
        <Text style={styles.label}>Nombre completo</Text>

        <TextInput
          style={styles.input}
          placeholder="Ej: Diana Alvarez"
          placeholderTextColor="#8C9CAE"
          value={nombre}
          onChangeText={setNombre}
          autoCapitalize="words"
        />

        /* CORREO */
        <Text style={styles.label}>Correo electrónico</Text>

        <TextInput
          style={styles.input}
          placeholder="Ej: diana@correo.com"
          placeholderTextColor="#8C9CAE"
          value={correo}
          onChangeText={setCorreo}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        /* TELÉFONO */
        <Text style={styles.label}>Teléfono / WhatsApp</Text>

        <TextInput
          style={styles.input}
          placeholder="Ej: 3122011725"
          placeholderTextColor="#8C9CAE"
          value={telefono}
          onChangeText={setTelefono}
          keyboardType="phone-pad"
          maxLength={15}
        />

        /*VIAJEROS*/

         <Text style={styles.label}>Número de viajeros</Text>

        <TextInput
          style={styles.input}
          placeholder="Ej: 2"
          placeholderTextColor="#8C9CAE"
          value={viajeros}
          onChangeText={setViajeros}
          autoCapitalize="words"
        />


        /* CIUDAD DE ORIGEN */
        <Text style={styles.label}>Ciudad de origen</Text>

        <TextInput
          style={styles.input}
          placeholder="Ej: Pasto, Bogotá..."
          placeholderTextColor="#8C9CAE"
          value={ciudad}
          onChangeText={setCiudad}
          autoCapitalize="words"
        />

        /* DESTINO */
        <Text style={styles.label}>Destino deseado</Text>

        <TextInput
          style={styles.input}
          placeholder="Ej: San Andrés, Cancún, Roma..."
          placeholderTextColor="#8C9CAE"
          value={destino}
          onChangeText={setDestino}
          autoCapitalize="words"
        />

        /* TIPO DE VIAJE */
        <Text style={styles.label}>Tipo de viaje</Text>

        <View style={styles.chipsContainer}>
          {TIPOS_VIAJE.map((tipo) => {
            const seleccionado = tipoViaje === tipo;

            return (
              <Pressable
                key={tipo}
                style={[
                  styles.chip,
                  seleccionado && styles.chipSeleccionado,
                ]}
                onPress={() => setTipoViaje(tipo)}
              >
                <Text
                  style={[
                    styles.chipTexto,
                    seleccionado &&
                      styles.chipTextoSeleccionado,
                  ]}
                >
                  {tipo}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {tipoViaje === "Otro" && (
          <TextInput
            style={styles.input}
            placeholder="Ej: Crucero, Ecoturismo, Religioso..."
            placeholderTextColor="#8C9CAE"
            value={otroTipo}
            onChangeText={setOtroTipo}
            autoCapitalize="sentences"
          />
        )}

        /* BOTÓN REGISTRAR */
        <Pressable
          style={({ pressed }) => [
            styles.boton,
            pressed && styles.botonPresionado,
            guardando && styles.botonDesactivado,
          ]}
          onPress={guardar}
          disabled={guardando}
        >
          {guardando ? (
            <View style={styles.cargandoContainer}>
              <ActivityIndicator color="#FFFFFF" />

              <Text style={styles.botonTexto}>
                Reservando tu viaje...
              </Text>
            </View>
          ) : (
            <Text style={styles.botonTexto}>
              Reservar viaje
            </Text>
          )}
        </Pressable>
      </View>

/* PIE */
      <Text style={styles.footer}>
        VIAJES.COM
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F0F5FA",
    padding: 20,
  },

  encabezado: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 25,
  },

  iconoContainer: {
    width: 75,
    height: 75,
    borderRadius: 38,
    backgroundColor: "#DCE9F6",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },

  iconoViaje: {
    fontSize: 38,
  },

  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#163A5F",
    textAlign: "center",
  },

  subtitulo: {
    fontSize: 14,
    color: "#526B84",
    textAlign: "center",
    marginTop: 7,
    lineHeight: 21,
    paddingHorizontal: 20,
  },

  card: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#D2E2F0",
    elevation: 4,
    shadowColor: "#163A5F",
    shadowOpacity: 0.08,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 10,
  },

  cardTitulo: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#163A5F",
    marginBottom: 4,
  },

  cardDescripcion: {
    color: "#627B94",
    fontSize: 13,
    lineHeight: 19,
    marginBottom: 20,
  },

  label: {
    color: "#1E4773",
    fontWeight: "600",
    fontSize: 14,
    marginBottom: 7,
  },

  input: {
    backgroundColor: "#F8FAFD",
    borderWidth: 1,
    borderColor: "#CBDCEB",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 13,
    marginBottom: 17,
    color: "#163A5F",
    fontSize: 15,
  },

  chipsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 17,
  },

  chip: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#CBDCEB",
    backgroundColor: "#F8FAFD",
  },

  chipSeleccionado: {
    backgroundColor: "#0284C7",
    borderColor: "#0284C7",
  },

  chipTexto: {
    color: "#1E4773",
    fontSize: 13,
    fontWeight: "600",
  },

  chipTextoSeleccionado: {
    color: "#FFFFFF",
  },

  boton: {
    backgroundColor: "#0284C7",
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 6,
    elevation: 2,
  },

  botonPresionado: {
    opacity: 0.85,
    backgroundColor: "#0369A1",
  },

  botonDesactivado: {
    opacity: 0.65,
  },

  botonTexto: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 15,
  },

  cargandoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  infoBox: {
    backgroundColor: "#E2EEF9",
    padding: 17,
    borderRadius: 20,
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },

  infoIcono: {
    width: 46,
    height: 46,
    borderRadius: 15,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 13,
  },

  infoEmoji: {
    fontSize: 23,
  },

  infoContenido: {
    flex: 1,
  },

  infoTitulo: {
    color: "#163A5F",
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: 3,
  },

  infoTexto: {
    color: "#47617B",
    fontSize: 13,
    lineHeight: 18,
  },

  footer: {
    textAlign: "center",
    color: "#839BB3",
    fontSize: 12,
    marginTop: 24,
    marginBottom: 10,
  },
});