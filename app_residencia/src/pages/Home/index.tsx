import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity,ActivityIndicator } from 'react-native';
import { Card, Text } from 'react-native-elements';
import AxiosInstance from '../../api/AxiosInstance';
import { AutenticacaoContext } from '../../context/AutenticacaoContext'
import { CategoriaType } from '../../models/@types/CategoriaTypes';



const Home = ({ navigation }) => {
  //console.log('Token: ' + token);
  const { usuario } = useContext(AutenticacaoContext);
  const [categoria, setCategoria] = useState<CategoriaType[]>([]);
  

  useEffect(() => {
    getDadosCategoria();
  }, []);

  const getDadosCategoria = async () => {
    AxiosInstance.get(
      `/categoria`,
      { headers: { "Authorization": `Bearer ${usuario.token}` } }
    ).then(result => {
      console.log('Dados das categorias: ' + JSON.stringify(result.data));
      setCategoria(result.data);
    }).catch((error) => {
      console.log("Erro ao carregar a lista de categorias - " + JSON.stringify(error));
    });
  }

  return (
    <ScrollView style={styles.container}>
      <ScrollView style={styles.scroll_categorias} horizontal={true}>
        {
          categoria.map((k, i)=> (
          <TouchableOpacity key={i}
          
            onPress={() => console.log(`Categoria ${k.nomeCategoria} foi clicada`)}
            style={styles.botao_categoria}
            
            >
            <View style={styles.view_itens_categoria}>
              <Text style={styles.texto_nome_categoria}>{k.nomeCategoria}</Text>
            </View>
          </TouchableOpacity>
          ))
        }
      </ScrollView>
      <Text>{'Recentes'}</Text>
      <ScrollView horizontal={true}>
        <Card>
          <Card.Image source={require('../../assets/img.strogonoff.jpg')} />
          <Card.Divider />
          <Card.Title>Título</Card.Title>
          <Text>Descrição</Text>
        </Card>
        <Card>
          <Card.Image source={require('../../assets/img.strogonoff.jpg')} />
          <Card.Divider />
          <Card.Title>Título</Card.Title>
          <Text>Descrição</Text>
        </Card>
        <Card>
          <Card.Image source={require('../../assets/img.strogonoff.jpg')} />
          <Card.Divider />
          <Card.Title>Título</Card.Title>
          <Text>Descrição</Text>
        </Card>
        <Card>
          <Card.Image source={require('../../assets/img.strogonoff.jpg')} />
          <Card.Divider />
          <Card.Title>Título</Card.Title>
          <Text>Descrição</Text>
        </Card>
        <Card>
          <Card.Image source={require('../../assets/img.strogonoff.jpg')} />
          <Card.Divider />
          <Card.Title>Título</Card.Title>
          <Text>Descrição</Text>
        </Card>
      </ScrollView>
      <Card>
        <Card.Image source={require('../../assets/img.strogonoff.jpg')} />
        <Card.Divider />
        <Card.Title>Título</Card.Title>
        <Text>Descrição</Text>
      </Card>
    </ScrollView>
  );
};
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
});

export default Home;