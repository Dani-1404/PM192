import React, { useState, useEffect } from 'react';
import {
  View, TextInput, ScrollView, Text, ActivityIndicator,
  Image, StyleSheet, TouchableOpacity, ImageBackground, FlatList
} from 'react-native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';

// Diccionario de países
const paises = {
  MX: "México",
  US: "Estados Unidos",
  FR: "Francia",
  DE: "Alemania",
  IT: "Italia",
  GB: "Reino Unido",
  AR: "Argentina",
  BR: "Brasil",
  CA: "Canadá",
  JP: "Japón",
  KR: "Corea del Sur",
  CN: "China",
  RU: "Rusia",
  IN: "India",
  AU: "Australia",
  ES: "España",
  CO: "Colombia",
  PE: "Perú",
  CL: "Chile",
  VE: "Venezuela",
  NI: "Nicaragua",
  // Puedes agregar más si quieres
};

const API_KEY = '7661b9b23b13b8b07436f3857cc41f4c';

export default function App() {
  const [ciudad, setCiudad] = useState('');
  const [ciudadesSugeridas, setCiudadesSugeridas] = useState([]);
  const [ciudadSeleccionada, setCiudadSeleccionada] = useState(null);
  const [climas, setClimas] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const buscarSugerencias = async () => {
      if (ciudad.trim().length < 2) {
        setCiudadesSugeridas([]);
        return;
      }

      try {
        const res = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${ciudad}&limit=5&appid=${API_KEY}`);
        setCiudadesSugeridas(res.data);
      } catch (err) {
        console.log('Error al buscar sugerencias');
      }
    };

    buscarSugerencias();
  }, [ciudad]);

  const obtenerClima = async () => {
    if (!ciudadSeleccionada) {
      setError('Debes seleccionar una ciudad válida de la lista');
      return;
    }

    setCargando(true);
    setError('');

    const { lat, lon, name, country, state } = ciudadSeleccionada;
    const nombrePais = paises[country] || country;

    try {
      const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=es`);
      const nuevoClima = {
        id: Date.now(),
        nombre: `${name}, ${nombrePais}${state ? ` (${state})` : ''}`,
        temperatura: res.data.main.temp,
        icono: res.data.weather[0].icon,
        descripcion: res.data.weather[0].description
      };
      setClimas([...climas, nuevoClima]);
      setCiudad('');
      setCiudadSeleccionada(null);
      setCiudadesSugeridas([]);
    } catch (err) {
      setError('Error al obtener el clima');
    }

    setCargando(false);
  };

  const eliminarCiudad = (id) => {
    const nuevas = climas.filter((c) => c.id !== id);
    setClimas(nuevas);
  };

  return (
    <ImageBackground source={require('./assets/bg-clima.jpg')} style={styles.fondo}>
      <View style={styles.container}>
        <Text style={styles.titulo}>🌍 Consulta el Clima</Text>

        <TextInput
          placeholder="Empieza a escribir una ciudad..."
          value={ciudad}
          onChangeText={(text) => {
            setCiudad(text);
            setCiudadSeleccionada(null);
          }}
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.input}
          placeholderTextColor="#888"
        />

        {ciudadesSugeridas.length > 0 && (
          <FlatList
            data={ciudadesSugeridas}
            keyExtractor={(item, index) => index.toString()}
            style={styles.sugerenciasLista}
            renderItem={({ item }) => {
              const pais = paises[item.country] || item.country;
              const estado = item.state ? ` (${item.state})` : '';
              return (
                <TouchableOpacity
                  onPress={() => {
                    setCiudad(`${item.name}, ${pais}${estado}`);
                    setCiudadSeleccionada(item);
                    setCiudadesSugeridas([]);
                  }}
                  style={styles.sugerenciaItem}
                >
                  <Text>{item.name}, {pais}{estado}</Text>
                </TouchableOpacity>
              );
            }}
          />
        )}

        <TouchableOpacity style={styles.boton} onPress={obtenerClima}>
          <Text style={styles.botonTexto}>Buscar Clima</Text>
        </TouchableOpacity>

        {cargando && <ActivityIndicator size="large" color="#4CAF50" style={{ marginTop: 10 }} />}
        {error !== '' && <Text style={styles.error}>{error}</Text>}

        <ScrollView style={{ marginTop: 20 }}>
          {climas.map((clima) => (
            <View key={clima.id} style={styles.card}>
              <View style={styles.cardInfo}>
                <Text style={styles.cardTitle}>{clima.nombre}</Text>
                <Text style={styles.descripcion}>{clima.temperatura}°C - {clima.descripcion}</Text>
                <Image
                  source={{ uri: `https://openweathermap.org/img/wn/${clima.icono}@2x.png` }}
                  style={styles.icono}
                />
              </View>
              <TouchableOpacity onPress={() => eliminarCiudad(clima.id)} style={styles.eliminarBtn}>
                <Ionicons name="trash-outline" size={22} color="#c62828" />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
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
    padding: 24,
    paddingTop: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.88)',
  },
  titulo: {
    fontSize: 26,
    fontWeight: '600',
    textAlign: 'center',
    color: '#2e7d32',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    borderColor: '#c8e6c9',
    borderWidth: 1,
  },
  sugerenciasLista: {
    backgroundColor: '#f0f0f0',
    maxHeight: 150,
    borderRadius: 8,
    marginTop: 4,
    marginBottom: 8
  },
  sugerenciaItem: {
    padding: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1
  },
  boton: {
    backgroundColor: '#4CAF50',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10
  },
  botonTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  error: {
    color: '#c62828',
    marginTop: 12,
    textAlign: 'center',
    fontWeight: '500',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardInfo: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1b5e20',
  },
  descripcion: {
    fontSize: 15,
    color: '#444',
    marginTop: 4,
  },
  icono: {
    width: 50,
    height: 50,
    marginTop: 6,
  },
  eliminarBtn: {
    padding: 6,
    borderRadius: 50,
  },
});
