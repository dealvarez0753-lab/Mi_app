import { Stack } from "expo-router";

// Navegación principal de la app (Paso 13 de la guía)
export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#1A5276" },
        headerTintColor: "#FFFFFF",
        headerTitleStyle: { fontWeight: "bold" },
        contentStyle: { backgroundColor: "#F0F7FA" },
      }}
    >
      <Stack.Screen name="index" options={{ title: "Viajes.com" }} />
      <Stack.Screen name="formulario" options={{ title: "Reseserva tu viaje" }} />
      <Stack.Screen name="resultado" options={{ title: "Reservación recibida" }} />
      <Stack.Screen name="registros" options={{ title: "Viajeros Registrados" }} />
      <Stack.Screen name="imagenes" options={{ title: "Destinos" }} />
      <Stack.Screen name="contacto" options={{ title: "Contacto" }} />
    </Stack>
  );
}
