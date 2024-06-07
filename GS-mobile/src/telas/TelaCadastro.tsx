import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image} from 'react-native';
import { useState } from 'react';
import { auth } from '../services/firebaseConfig';
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function TelaCadastro(props) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const cadastrar = () => {
    createUserWithEmailAndPassword(auth, email, senha)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        alert("Usuário criado");
        (props.navigation.navigate('TelaMapa'))
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
        alert("Informações Faltantes")
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
      <TextInput
        placeholder='Digite seu Telefone'
        style={styles.input}
      />
      <TouchableOpacity onPress={cadastrar} style={styles.button} >
        <Text style={styles.buttonText}>Cadastrar</Text>
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
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  logo: {
    width: 200, // Largura da logo
    height: 200, // Altura da logo
    marginBottom: 20, // Espaço abaixo da logo
},
});