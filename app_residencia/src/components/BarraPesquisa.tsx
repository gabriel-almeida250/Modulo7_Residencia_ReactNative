import React, {useState, useEffect, useContext} from 'react';
import {StatusBar, View, TextInput, FlatList, StyleSheet, Alert} from 'react-native';
import {Text} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';
import AxiosInstance from '../api/AxiosInstance';
import {AutenticacaoContext} from '../context/AutenticacaoContext';
import {usePesquisar} from '../context/PesquisaContext';
import {CategoriaType} from '../models/@types/CategoriaTypes';

export default function BarraPesquisa(props) {
  const [pesquisa, setPesquisa] = useState('');
  const [categoria, setCategoria] = useState<CategoriaType[]>([]);
  const [loading, setLoading] = useState(false)
  const {usuario} = useContext(AutenticacaoContext);
  const pesquisar = usePesquisar();

  const selecionaPesquisa = async (categoria: any) => {
    pesquisar.Buscar(categoria);
    props.navigation.navigate('ProdutoCategoriaScreen')
    console.log('Categoria clicaca', pesquisar.pesquisa);
  };

  useEffect(() => {
    getDadosCategoria();
  }, []);

  const getDadosCategoria = async () => {
    AxiosInstance.get(`/categoria`, {
      headers: {Authorization: `Bearer ${usuario.token}`},
    })
      .then(result => {
        // console.log('Dados das categorias:' + JSON.stringify(result.data));

        setCategoria(result.data);
      })
      .catch(error => {
        console.log(
          'Erro ao carregar a lista de categoria - ' + JSON.stringify(error),
        );
      });
  };

  return (
    <View style={{marginBottom: 20}}>
      <TextInput 
      placeholder="Pesquisar..." 
      onChangeText={setPesquisa} 
      autoCapitalize='none'
      autoCorrect={false}
      style={styles.input} 
      />    
      <ScrollView contentContainerStyle={styles.MenuSanfona}>
        {categoria
          .filter(val => {
            if (pesquisa.length <= 0) {
              return;
            } else if (
              val.nomeCategoria.toLowerCase().includes(pesquisa.toLowerCase())
            ) {
              return val;
            }
          })
          .map((categoria, indice) => (
            <Text onPress={e => selecionaPesquisa(categoria)} key={indice} style={{fontSize: 20,  padding: 20}}>
              {categoria.nomeCategoria}
            </Text>
          ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
    input: {
      flex: 1,
      backgroundColor: 'red',
      borderRadius: 25,
      fontSize: 20,
      paddingHorizontal: 20,
      marginBottom: 10
    },
    MenuSanfona: {
      backgroundColor: 'red',
      borderRadius: 25,
      justifyContent: 'center',
    }
  });