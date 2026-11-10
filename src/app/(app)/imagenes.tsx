import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

export default function Imagenes() {
  const destinos = [
    {
      id: 1,
      titulo: "San Andrés Islas - Playas de arena blanca",
      uri: "https://static.vecteezy.com/system/resources/thumbnails/054/858/870/small/awesome-spratt-bight-beach-in-san-andres-providencia-y-santa-catalina-colombia-photo.jpg",
    },
    {
      id: 2,
      titulo: "Cartagena - Ciudad amurallada y atardeceres",
      uri: "https://media.staticontent.com/media/pictures/9495889e-54f9-40d2-939d-b04bf30b47c7",
    },
    {
      id: 3,
      titulo: "Valle del Cocora - Montañas y palmas de cera",
      uri: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1d/79/85/98/caption.jpg?w=1200&h=-1&s=1",
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Destinos Soñados</Text>
      <Text style={styles.subtitulo}>
        Inspírate para tu próximo viaje por los mejores rincones del mundo.
      </Text>

      {destinos.map((item) => (
        <View style={styles.card} key={item.id}>
          <Image source={{ uri: item.uri }} style={styles.imagen} />
          <Text style={styles.descripcion}>{item.titulo}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#F0F7FA",
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
    marginBottom: 20,
    marginTop: 4,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    overflow: "hidden",
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#D4E6F1",
    elevation: 3,
  },
  imagen: {
    width: "100%",
    height: 200,
  },
  descripcion: {
    padding: 14,
    color: "#1B3A4B",
    fontWeight: "600",
    fontSize: 14,
  },
});