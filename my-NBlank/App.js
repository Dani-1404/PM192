import { StatusBar } from 'expo-status-bar';
import React,{ useState} from 'react';
import { StyleSheet, Text, View,TextInput,Button, Alert,Switch,ImageBackground,Image } from 'react-native';

export default function App() {
  const[nombre,setNombre] = useState('');
  const[correo,setCorreo] = useState('');
  const[aceptarTerminos, SetAceptarTerminos] =useState(false);

  const registro = () => {
    if (!nombre  || !correo ) {
      Alert.alert('Error', 'Por favor llena todos los campos');
      return;
    }
    if(!aceptarTerminos) {
       Alert.alert('Error', 'Debes de aceptar los terminos codiciones');
       return
    }
    Alert.alert('¡Registro exitoso!', `Nombre: ${nombre}\nCorreo: ${correo}`);
  
  };

  return (

    <ImageBackground
  source={require('./assets/fondo.jpg')}
>
  <View style={styles.container}>
    <Image source={require('./assets/logo.png')} style={styles.logo} />
    



    <Text style={styles.titulo}>Registro de Usuario</Text>

    <TextInput
          style={styles.input}
          placeholder="Nombre completo"
          onChangeText={setNombre}
          value={nombre}
        />
      
       <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          keyboardType="email-address"
          onChangeText={setCorreo}
          value={correo}
        />
      
       <View style={styles.switchContainer}>
          <Text>Acepto términos y condiciones</Text>
          <Switch
            value={aceptarTerminos}
            onValueChange={SetAceptarTerminos}
          />
        </View>

        <Button title="Registrarse" onPress={registro}color="#008080" />
        <StatusBar style="auto" />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  fondo: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
});
        




   
 

