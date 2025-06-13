/* zona 1, aqui van importaciones  */
import { StatusBar } from 'expo-status-bar';
import { Children } from 'react';
import { StyleSheet, Text, View,Button } from 'react-native';
import React, {useState} from 'react';

const Texto=({style})=>{ //pasamo el parametro style 
  const[contenido, setContenido]=useState('Hola mundo React')
  const actualizarTexto=()=>{setContenido('Estado actualizado')}
  return(
        <Text style={[styles.text, style]} onPress={actualizarTexto}>{contenido}</Text>) //lo definimos en el componente padre 
}

/* zona 2 , el main*/
export default function App() {
  return (
    <View style={styles.container}>
      <Texto style={styles.red}>  </Texto>
      <Texto style={styles.blue}> </Texto>
      <Texto style={styles.green}>  </Texto>
      
      <StatusBar style="auto" />
    </View>
  );
}


/* zona 3, estilos */ 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'base-line',
    justifyContent: 'center',
    flexDirection: 'colum', //cambiamos la posicion de nuestros componentes 
  },
text:{
  color:'white',
  fontSize:25,
  //height:100, /*de lo que se tenga disponible*/
  /*nos va a crear el alto y ancho para cada texto*/

},
red:{backgroundColor:'red'},
green:{backgroundColor:'green'},// se creo una clase para que sea de diferente como cada texto 
blue:{backgroundColor:'blue'}, //agregamos el flex en cada clase 
});