import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (email === 'user@example.com' && password === 'password') {
      navigation.navigate('Profile');
    } else {
      Alert.alert('Error', 'Credenciales incorrectas. Inténtalo de nuevo.');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/poli-roomie.jpg')} style={styles.logo} />
      <Text style={styles.title}>POLI ROOMIE</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingresa correo..."
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Ingresa contraseña..."
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>INICIAR SESIÓN</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={styles.link}>¿Olvidaste tu contraseña?</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  logo: { width: 100, height: 100, borderRadius: 50, marginBottom: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: {
    width: '100%',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 12
  },
  button: {
    backgroundColor: '#004d40',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: '100%',
    marginBottom: 10
  },
  buttonText: { color: 'white', textAlign: 'center', fontWeight: 'bold' },
  link: { color: '#0077cc', marginTop: 10 }
});
