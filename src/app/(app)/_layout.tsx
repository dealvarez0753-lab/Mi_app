import { Stack } from "expo-router";

export default function AppLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#1A5276" },
        headerTintColor: "#FFFFFF",
        headerTitleStyle: { fontWeight: "bold" },
        contentStyle: { backgroundColor: "#F0F7FA" },
      }}
    >
      
      <Stack.Screen name="index" options={{ title: "Agencia de Viajes" }} />
      <Stack.Screen name="catalogo" options={{ title: "Catálogo" }} />
      <Stack.Screen name="detalle" options={{ title: "Detalle" }} />
      <Stack.Screen name="escanear" options={{ title: "Escanear" }} />
      <Stack.Screen name="formulario" options={{ title: "Cotizar Viaje" }} />
      <Stack.Screen name="resultado" options={{ title: "Resumen de Cotización" }} />
      <Stack.Screen name="registros" options={{ title: "Viajeros Registrados" }} />
      <Stack.Screen name="imagenes" options={{ title: "Destinos Destacados" }} />
      <Stack.Screen name="contacto" options={{ title: "Atención al Viajero" }} />
    </Stack>
  );
}
