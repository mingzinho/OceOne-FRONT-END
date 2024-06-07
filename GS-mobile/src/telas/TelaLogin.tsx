import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import { useState } from 'react';
import { auth } from '../services/firebaseConfig';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";

export default function TelaLogin(props) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const login = () => {
    signInWithEmailAndPassword(auth, email, senha)
      .then((userCredential) => {
        const user = userCredential.user;
        (props.navigation.navigate('TelaMapa'))
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
        alert("Usuário inexistente");
      });
  };

  const esqueceuSenha = async () => {
    await sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Email para resetar a senha enviado para " + email);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/caranguejo.png')} style={styles.logo} />
      <TextInput
        placeholder='Digite seu email'
        value={email}
        onChangeText={(valor) => setEmail(valor)}
        style={styles.input}
      />
      <TextInput
        placeholder='Digite sua senha'
        value={senha}
        secureTextEntry={true}
        onChangeText={(valor) => setSenha(valor)}
        style={styles.input}
      />

      <TouchableOpacity onPress={login} style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={esqueceuSenha} style={styles.button}>
        <Text style={styles.buttonText}>Esqueceu a senha</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  button: {
    backgroundColor: 'black',
    padding: 15,
    marginVertical: 10,
    borderRadius: 5,
    width: 420,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  logo: {
    width: 200, // Largura da logo
    height: 200, // Altura da logo
    marginBottom: 20, // Espaço abaixo da logo
},
});
