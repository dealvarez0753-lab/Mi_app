import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#1A5276",
        },
        headerTintColor: "#ffffff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        contentStyle: {
          backgroundColor: "#F0F7FA",
        },
      }}
    >
      <Stack.Screen name="index" options={{ title: "Agencia de Viajes" }} />
      <Stack.Screen name="formulario" options={{ title: "Cotizar Paquete" }} />
      <Stack.Screen name="resultado" options={{ title: "Resumen de Reserva" }} />
      <Stack.Screen name="imagenes" options={{ title: "Destinos Destacados" }} />
      <Stack.Screen name="contacto" options={{ title: "Atención al Viajero" }} />
    </Stack>
  );
}