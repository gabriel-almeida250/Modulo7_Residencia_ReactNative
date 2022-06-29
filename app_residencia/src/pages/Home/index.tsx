import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity,ActivityIndicator } from 'react-native';
import { Card, Text } from 'react-native-elements';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import AxiosInstance from '../../api/AxiosInstance';
import { AutenticacaoContext } from '../../context/AutenticacaoContext'
import { CategoriaType } from '../../models/@types/CategoriaTypes';
import { ProdutoType } from '../../models/@types/ProdutoTypes';
import {Icon} from 'react-native-elements';

const Home = ({ navigation }) => {
  const { usuario } = useContext(AutenticacaoContext);
  const [loading, setLoading] = useState(false)
  const [categoria, setCategoria] = useState<CategoriaType[]>([]);
  const [produto, setProduto] = useState<ProdutoType[]>([]);
  const [text, setText] = useState('');


  useEffect(() => {
    getDadosCategoria();
    getDadosProduto();
  }, []);

  const getDadosCategoria = async () => {
    setLoading(true)
    AxiosInstance.get(
      `/categoria`,
      { headers: { "Authorization": `Bearer ${usuario.token}` } }
    ).then(result => {
      console.log('Dados das categorias: ' + JSON.stringify(result.data));
      setCategoria(result.data);
     setLoading(false)
    }).catch((error) => {
      console.log("Erro ao carregar a lista de categorias - " + JSON.stringify(error));
    });
  }

  const getDadosProduto = async () => {
    AxiosInstance.get(
      `/produto`,
      { headers: { "Authorization": `Bearer ${usuario.token}` } }
    ).then(result => {
      console.log('Dados das produtos: ' + JSON.stringify(result.data));
      setProduto(result.data);
    }).catch((error) => {
      console.log("Erro ao carregar a listar produtos - " + JSON.stringify(error));
    });
  }

  function ListProduto({ produto }){
    return (
             <Card containerStyle={styles.card_style}>
            <Card.Image source={{uri:produto.imagemProduto}}></Card.Image>
             <Card.Divider />
             <Card.Title style={styles.titulo_cards}>{produto.nomeProduto}</Card.Title>
             <Text style={styles.descricao_cards}>{produto.descricaoProduto}</Text>
           </Card>
    )
  }

  function ListCategoria({ categoria }){
    return (
            <View style={styles.view_itens_categoria}>
              <Text style={styles.texto_nome_categoria}>{categoria.nomeCategoria}</Text>
            </View>
    )
  }

  return (
    <ScrollView style={styles.container} >
      <View style={styles.cabecalho}>
      <TextInput 
      style={styles.input}
      placeholder='Pesquisar'
      autoCapitalize='none'
      autoCorrect={false}
      value={text}
      onChangeText={(value) => setText(value)}
      />
      <Icon 
      name="search" 
      color="red" 
      type="ionocons" 
      size={40} 
      onPress={() =>{}}
      />
      </View>
        <FlatList 
        data={categoria}
        keyExtractor={(item, index) => String(item.idCategoria)}
        renderItem={({ item }) => <ListCategoria  categoria={item} />}
        horizontal={true}     
        //
        onEndReached={getDadosCategoria}
        onEndReachedThreshold={0.1}
        ListFooterComponent={ <FooterList load={loading}/>}
        //
        /> 
      <Text>{'Recentes'}</Text>
      <FlatList 
        data={produto}
        keyExtractor={(item, index) => String(item.idProduto)}
        renderItem={({ item }) => <ListProduto  produto={item} />}
        horizontal={true}     
        //
        onEndReached={getDadosProduto}
        onEndReachedThreshold={0.1}
        ListFooterComponent={ <FooterList load={loading}/>}
        //
        />
      <Card>
        <Card.Image source={require('../../assets/img.strogonoff.jpg')} />
        <Card.Divider />
        <Card.Title>Título</Card.Title>
        <Text>Descrição</Text>
      </Card>
    </ScrollView>
  );
};

function FooterList({load}) {
  if (!load) return null;
  return(
    <View style={styles.loading}>
      <ActivityIndicator size={25} color='red' />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8DDCA',
    padding: 30,
  },
  scroll_categorias: {
    //backgroundColor: '#333',
    flexGrow: 0,
  },
  view_itens_categoria: {
    width: 100,
    height: 100,
    marginRight: 20,
    backgroundColor: 'black',
    justifyContent: 'center',
  },
  botao_categoria: {
    alignItems: 'center',
    padding: 10,
  },
  texto_nome_categoria: {
    color: 'white',
    textAlign: 'center',
  },
  loading:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  }, card_style: {
    backgroundColor: 'pink',
    padding: 0,
    marginBottom: 20,
    width: 125,
    borderRadius: 5,
    borderWidth: 0,
  },
  imagens_cards: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderWidth: 0,
  },

  titulo_cards: {
    fontSize: 18,
    color: 'black',
  },
  descricao_cards: {
    marginBottom: 10,
    fontSize: 16,
    textAlign: 'center',
    color: '#181717',
  },
  cabecalho: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    flex: 1,
    backgroundColor: 'red',
    borderRadius: 25,
    fontSize: 20,
    paddingHorizontal: 20,
    marginBottom: 10
  }
});

export default Home;