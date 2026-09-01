import { useState } from 'react';

import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView, Modal, Platform,
  Pressable, ScrollView, StyleSheet,
  Switch,
  Text,
  TextInput,
  View
} from 'react-native';

import { StatusBar } from 'expo-status-bar';

export default function HomeScreen() {

  //estados
  const [nombre, setNombre]= useState('');
  const [destino, setDestino]= useState('');
  const [tipoTour, setTour]= useState('');
  const [cantidadViajeros, setCantidadViajeros]= useState('');
  const [fecha, setFecha]= useState('');
  const [incluirSeguro, setIncluirSeguro]= useState(false);
  const [metodoPago, setMetodoPago]= useState('');
  const [resultado, setResultado]= useState('');
  const [total, setTotal]= useState('');
  const [procesando, setProcesando]= useState(false);
  const [modalVisible, setModalVisible]= useState(false);

  //funcion de botones
  const realizarCompra = () => {

    //validamos que campos tengan informacion
    if(
      nombre.trim() === '' ||
      destino.trim() === '' ||
      tipoTour.trim() === '' ||
      cantidadViajeros.trim() === '' ||
      fecha.trim() === '' ||
      metodoPago.trim() === ''
    ){
      setResultado('Por favor completa todos los campos');
      setModalVisible(true);
    return;
  }

   //mostrar indicador de carga
  setProcesando(true);
  setResultado('');

  //simulacion de que el pedido se este procesando
 setTimeout (()=>{
  
  setProcesando(false);

      setResultado(
       `Cliente: ${nombre}
        Destino: ${destino}
        Tour: ${tipoTour}
        Cantidad: ${cantidadViajeros}
        Fecha:${fecha}
        Seguro: ${incluirSeguro ? 'Si' : 'No'}
        MetodoPago: ${metodoPago}
        Resultado: ${resultado}
        Total:${total}`
        
        );

        //abrimos el modal
        setModalVisible(true);    
    }, 1200);
  };

    return (
    <KeyboardAvoidingView
      style={styles.pantalla}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar style="dark" />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.contenido}>

        {/* ENCABEZADO ADAPTADO */}
        <View style={styles.header}>
          <Text style={styles.logo}>🛫🚌</Text>
          <Text style={styles.titulo}>Vuela.com</Text>
          <Text style={styles.subtitulo}>Agencia de turismo</Text>
        </View>

        {/* IMAGEN DE VIAJE */}
        <Image
          source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrybtgTF561wAwJsipPxqrpg2iZxxNkaLsievhxa_hhdp5oZgaVHQ3dQU&s=10' }}
          style={styles.imagenPrincipal}
        ></Image>

        <Text style={styles.tituloFormulario}>Planifica tus proximas vacaciones</Text>
        <Text style={styles.descripcionFormulario}>Descubre tu destino perfecto</Text>

        {/* FORMULARIO */}
        <Text style={styles.label}>Nombre completo</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej. Diana Alvarez"
          placeholderTextColor="#9E9E9E"
          value={nombre}
          onChangeText={setNombre}
        />

        <Text style={styles.label}>Destino</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej. Cartagena"
          placeholderTextColor="#9E9E9E"
          value={destino}
          onChangeText={setDestino}
        />

        <Text style={styles.label}>Tipo de Tour</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej. Acuarios, Histórico..."
          placeholderTextColor="#9E9E9E"
          value={tipoTour}
          onChangeText={setTour}
        />

        <Text style={styles.label}>Cantidad de Viajeros</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej. 2"
          placeholderTextColor="#9E9E9E"
          value={cantidadViajeros}
          onChangeText={setCantidadViajeros}
          keyboardType="numeric"
        />

        {/* SWITCH ADAPTADO A SEGURO DE VIAJE */}
        <View style={styles.filaSwitch}>
          <View>
            <Text style={styles.switchTitulo}>Seguro de viaje</Text>
            <Text style={styles.switchDescripcion}>Añade cobertura médica a tu ruta</Text>
          </View>
                    <Switch
            value={incluirSeguro}
            onValueChange={setIncluirSeguro}
          />
        </View>

        {/* BOTÓN */}
        <Pressable style={styles.boton} onPress={realizarCompra} disabled={procesando}>
          {procesando ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.botonTexto}>Confirmar Reserva</Text>
          )}
        </Pressable>

      </ScrollView>

      {/* MODAL FALTANTE AÑADIDO A LA ESTRUCTURA */}
      <Modal visible={modalVisible} transparent={true} animationType="fade">
        <View style={styles.modalFondo}>
          <View style={styles.modalCaja}>
            <Text style={styles.modalTexto}>{resultado}</Text>
            <Pressable style={styles.botonCerrar} onPress={() => setModalVisible(false)}>
              <Text style={styles.botonTexto}>Cerrar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

    </KeyboardAvoidingView>
  );
}

// 4. ESTILOS COMPLETOS AÑADIDOS
const styles = StyleSheet.create({
  pantalla: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  contenido: {
    padding: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    fontSize: 40,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  subtitulo: {
    fontSize: 16,
    color: '#7F8C8D',
  },
  imagenPrincipal: {
    width: '100%',
    height: 200,
    borderRadius: 15,
    marginBottom: 20,
  },
  tituloFormulario: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  descripcionFormulario: {
    fontSize: 14,
    color: '#7F8C8D',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#34495E',
    marginBottom: 8,
    marginTop: 10,
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    color: '#2C3E50',
  },
  filaSwitch: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 30,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  switchTitulo: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
  },
  switchDescripcion: {
    fontSize: 12,
    color: '#7F8C8D',
    marginTop: 4,
  },
  boton: {
    backgroundColor: '#27AE60', // Verde naturaleza para la agencia
    padding: 18,
    borderRadius: 10,
    alignItems: 'center',
  },
  botonCerrar: {
    backgroundColor: '#E74C3C',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  botonTexto: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalFondo: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCaja: {
    backgroundColor: 'white',
    padding: 25,
    borderRadius: 20,
    width: '85%',
  },
  modalTexto: {
    fontSize: 16,
    color: '#2C3E50',
    lineHeight: 24,
  }
});

//     <View style={styles.container}>
//       <Text style={styles.titulo}>
//         Desarrollo movil
//       </Text>

//       <Text style={styles.texto}>
//          Mi primera app
//       </Text>

//       <Text style={styles.texto}>
//         Ingenieria sistemas
//       </Text>
//       <Text style={styles.mensaje}>
//         Hola React-Native
//       </Text>

//       <Image source={{
//         uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrybtgTF561wAwJsipPxqrpg2iZxxNkaLsievhxa_hhdp5oZgaVHQ3dQU&s=10'
//       }}
//       style= {styles.imagen}
//       ></Image>

//       <Pressable style={styles.botonVamos}>
//         <Text style={styles.textoBoton}>
//           Vamos!
//         </Text>
//       </Pressable>

//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },

//   titulo: {
//     fontSize: 30,
//     fontWeight: 'bold',
//   },

//   texto: {
//     fontSize: 18,
//     marginTop: 10,
//   },

//   mensaje: {
//     fontSize: 18,
//     marginTop: 30,
  
// },

// imagen:{
//   width: 300, //ancho
//   height: 300, //alt
// },

// botonVamos: {
//     backgroundColor: '#007AFF', 
//     width: 100,
//     height: 100, 
//     justifyContent: 'center', 
//     alignItems: 'center', 
//     marginTop: 30,
//   },
//   textoBoton: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: 'bold',
//   }
// });