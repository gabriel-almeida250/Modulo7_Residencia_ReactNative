import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { Card } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AxiosInstance from '../../api/AxiosInstance';
import { AutenticacaoContext } from '../../context/AutenticacaoContext';
import { usePesquisar } from '../../context/PesquisaContext';
import { ProdutoType } from '../../models/@types/ProdutoTypes';

export function ProdutoCategoria({route}) {

  const [produto, setProduto] = useState<ProdutoType[]>([]);
  const {navigation} = route.params;
  const [loading, setLoading] = useState(false)
  const [semProduto, setSemProduto] = useState(false)
  const {usuario} = useContext(AutenticacaoContext);
  const pesquisar = usePesquisar();

  useEffect(() => {
    getDadosProduto();
  }, []);

  const getDadosProduto = async () => {
    AxiosInstance.get(
      `/produto`,
      { headers: { "Authorization": `Bearer ${usuario.token}` } }
    ).then(result => {
      const ListaProduto = result.data;
        let ListaTemporaria: any = [];
        ListaProduto.filter(produto => {
          if (produto.nomeCategoria === pesquisar.pesquisa.nomeCategoria) {
            ListaTemporaria.push(produto);
            setProduto(ListaTemporaria);
            setSemProduto(false)
          } else {
            setSemProduto(true)
          }
        });
    }).catch((error) => {
      console.log("Erro ao carregar a listar produtos - " + JSON.stringify(error));
    });
  }

  function redirectProduto() {
    console.log('Entrou');
    // navigation.navigate({
    //   name: 'ProdutoScreen',
    //   params: {
    //     produto: produto,
    //   },
    // });
  }
  function ListProduto( {produto} ){
    
    return (
      <Text
      onPress={() => {
        navigation.navigate({
          name: 'ProdutoScreen',
          params: {
            dadosDoProduto: produto,
          },
        });
      }}>
      <Card
      containerStyle={styles.card_style}>
        <Card.Image
          style={styles.imagens_cards}
          source={{uri: produto.imagemProduto}}
        />
        <Card.Divider />
        <Card.Title style={styles.titulo_cards}>
          {produto.nomeProduto}
        </Card.Title>
        <Text style={styles.descricao_cards}>
          {produto.descricaoProduto}
        </Text>
      </Card>
    </Text>
    )
  }


  return (
    <View style={styles.container}>
      <Text>{pesquisar.pesquisa.nomeCategoria}</Text>
      {!semProduto &&(
       <FlatList 
        data={produto}
        keyExtractor={(item, index) => String(item.idProduto)}
        renderItem={({ item }) => <ListProduto  produto={item} />}
        // onEndReached={getDadosProduto}
        // onEndReachedThreshold={0.1}
        // ListFooterComponent={ <FooterList load={loading}/>}
        />
        )}
        {semProduto &&(
          <View>
            <Text>
              {'Nenhum Produto encotrado'}
            </Text>
          </View>
        )}
    </View>
  );
}

// function FooterList({load}) {
//   if (!load) return null;
//   return(
//     <View style={styles.loading}>
//       <ActivityIndicator size={25} color='red' />
//     </View>
//   )
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d68800',
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  card_style: {
    backgroundColor: 'blue',
    padding: 0,
    marginBottom: 20,
    width: 260,
    borderRadius: 5,
    borderWidth: 0,
  },
  imagens_cards: {
    height: 300,
    borderRadius: 5,

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