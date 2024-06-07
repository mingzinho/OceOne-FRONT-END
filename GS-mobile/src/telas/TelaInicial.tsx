import { Text, ImageBackground, StyleSheet, View, TouchableOpacity, Image} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const TelaInicial = (props) => {
    return (
        <SafeAreaView style={estilo.container}>
            <View style={estilo.centralizar}>
                <Image source={require('../../assets/caranguejo.png')} style={estilo.logo} />
                <Text style={estilo.titulo}>Bem vindo a OceOne</Text>
                <Text style={estilo.texto}>Sete mares, um objetivo</Text>
                <Text style={estilo.texto}>Primeiro acesso? Faça o cadastro</Text>
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity style={estilo.botaoContainer}
                        onPress={() => props.navigation.navigate('TelaCadastro')}
                    >
                        <Text style={estilo.botaoTexto}>Cadastro</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={estilo.botaoContainer}
                        onPress={() => props.navigation.navigate('TelaLogin')}
                    >
                        <Text style={estilo.botaoTexto}>Login</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </SafeAreaView>
    );
}

const estilo = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    centralizar: {
        alignItems: 'center',
    },
    texto: {
        fontSize: 18,
        marginBottom: 10,
    },
    titulo:{
        fontSize: 38,
        marginBottom: 10,
        fontWeight: 'bold',
    },
    botaoContainer: {
        width:100,
        height:50,
        borderWidth:3,
        borderColor:'black',
        borderRadius:10,
        backgroundColor:'black',
        margin:10,
        justifyContent:'center',
        alignItems:'center'
    },
    botaoTexto: {
        fontSize: 18,
        color: '#FFFF',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    logo: {
        width: 200, // Largura da logo
        height: 200, // Altura da logo
        marginBottom: 20, // Espaço abaixo da logo
    },
});

export default TelaInicial;