import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {Text, Input, Icon, Button} from 'react-native-elements';
import { LoginService } from '../../services/LoginService';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async (email:string, senha:string) => {
    console.log(`Email: ${email} - Senha: ${senha}`);

    const responseLogin = await LoginService(email, senha);
    if (!responseLogin) {
      Alert.alert(
        "Erro",
        "",
      [
        {text:"Ok"},
        {text: "Não foi possível realizar o login"}
      ]
      );
    } else {
      navigation.navigate('Home', {
        screen: 'TabNavigationScreen',
        params: {
          screen: 'HomeTab',
          params: {
            token: responseLogin.token,
          }
        },
      });
    }

  };

  return (
    <View style={styles.container}>
      <Text style={styles.texto_entrada}>{'Bem-vindo'}</Text>
      <Input
        placeholder="E-mail"
        onChangeText={setEmail}
        value={email}
        leftIcon={
          <Icon name="menu" color="red" type="ionocons" size={26} />
        }
        inputStyle={styles.inputs}
        placeholderTextColor={'red'}
      />
      <Input
        placeholder="Senha"
        onChangeText={setSenha}
        value={senha}
        leftIcon={
          <Icon name="key" color="red" type="font-awesome" size={26} />
        }
        inputStyle={styles.inputs}
        placeholderTextColor={'red'}
      />
      <TouchableOpacity style={styles.hoverDiferente}>
      <Button
        title="Entrar"
        onPress={() => handleLogin(email, senha)}
        titleStyle={styles.titulobotao}
        buttonStyle={styles.botaostyle}
      /></TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0d0e',
    padding: 16,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  texto_entrada: {
    fontWeight: 'bold',
    fontSize: 35,
    marginBottom: 60,
    textAlign: 'center',
    color: 'red',
  },
  inputs: {
    color: 'white',
  },
  hoverDiferente: {
     borderRadius: 50 , 
     marginTop:30 ,
     backgroundColor: "#00ff4c",
     padding: 10
  },
  titulobotao: {
    color: '#0d0d0e',
    margin: 5,
    fontSize:25
  },
  botaostyle: {
    backgroundColor: 'red',
    borderRadius: 50,
  },
});

export default Login;