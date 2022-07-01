import React, {useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Button, Card, Text} from 'react-native-elements';
import {FlatList, TextInput} from 'react-native-gesture-handler';
import AxiosInstance from '../../api/AxiosInstance';
import {AutenticacaoContext} from '../../context/AutenticacaoContext';
import {CategoriaType} from '../../models/@types/CategoriaTypes';
import {ProdutoType} from '../../models/@types/ProdutoTypes';
import {Icon} from 'react-native-elements';
import BarraPesquisa from '../../components/BarraPesquisa';
import CardProduto from '../../components/CardProduto';
import { usePesquisar } from '../../context/PesquisaContext';

const Home = ({navigation}) => {
  const {usuario} = useContext(AutenticacaoContext);
  //const [loading, setLoading] = useState(false)
  const [categoria, setCategoria] = useState<CategoriaType[]>([]);
  const [produto, setProduto] = useState<ProdutoType[]>([]);

  const [text, setText] = useState('');
  const pesquisar = usePesquisar();


  useEffect(() => {
    getDadosCategoria();
    getDadosProduto();
  }, []);

  const selecionaPesquisa = async (categoria: any) => {
    pesquisar.Buscar(categoria);
    navigation.navigate({
      name: 'ProdutoCategoriaScreen',
      params: {
        navigation: navigation,
      },
    });
    console.log('Categoria clicaca', pesquisar.pesquisa);
  };

  const getDadosCategoria = async () => {
    //setLoading(true)
    AxiosInstance.get(`/categoria`, {
      headers: {Authorization: `Bearer ${usuario.token}`},
    })
      .then(result => {
        console.log('Dados das categorias: ' + JSON.stringify(result.data));
        setCategoria(result.data);
        //setLoading(false)
      })
      .catch(error => {
        console.log(
          'Erro ao carregar a lista de categorias - ' + JSON.stringify(error),
        );
      });
  };

  const getDadosProduto = async () => {
    AxiosInstance.get(`/produto`, {
      headers: {Authorization: `Bearer ${usuario.token}`},
    })
      .then(result => {
        console.log('Dados das produtos: ' + JSON.stringify(result.data));
        setProduto(result.data);
      })
      .catch(error => {
        console.log(
          'Erro ao carregar a listar produtos - ' + JSON.stringify(error),
        );
      });
  };

  function ListProduto({produto}) {
    return (
    <CardProduto  navigation={navigation} dados={produto}/>
    );
  }

  function ListCategoria({categoria}) {
    return (
     <TouchableOpacity  onPress={e => selecionaPesquisa(categoria)
     }>
     <View style={styles.view_itens_categoria} >
        <Text style={styles.texto_nome_categoria}
       
         >
          {categoria.nomeCategoria}
        </Text>
      </View>
      </TouchableOpacity>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <BarraPesquisa navigation={navigation} />
      <FlatList
        data={categoria}
        keyExtractor={(item, index) => String(item.idCategoria)}
        renderItem={({item}) => <ListCategoria categoria={item} />}
        horizontal={true}
        
        //
        //onEndReached={getDadosCategoria}
        //onEndReachedThreshold={0.1}
        //ListFooterComponent={ <FooterList load={loading}/>}
        //
      ></FlatList>
      <Text>{'Recentes'}</Text>
      <FlatList
        data={produto}
        keyExtractor={(item, index) => String(item.idProduto)}
        renderItem={({item}) => <ListProduto produto={item} />}
        horizontal={true}
        //
        //onEndReached={getDadosProduto}
        //onEndReachedThreshold={0.1}
        //ListFooterComponent={ <FooterList load={loading}/>}
        //
      />
      <Text>Destaques</Text>
      <View style={styles.containerCard}>
      <Card 
      containerStyle={styles.card_style}>
        <Card.Image source={require('../../assets/img.strogonoff.jpg')} />
        <Card.Divider />
        <Card.Title style={styles.titulo_cards}>Título</Card.Title>
        <Text style={styles.descricao_cards}>Descrição</Text>
      </Card>
      </View>

    </ScrollView>
  );
};

// import React, {useContext} from 'react';
// import {
//   StyleSheet,
//   ScrollView,
//   View,
//   TouchableOpacity,
//   FlatList,
//   ActivityIndicator,
// } from 'react-native';
// import {Card, Text} from 'react-native-elements';
// import {useEffect, useState} from 'react';
// import AxiosInstance from '../../api/AxiosInstance';
// import CardProduto from '../../components/cardProduto';
// import {AutenticacaoContext} from '../../context/AutenticacaoContext';
// import Loader from '../../components/Loader';
// import BarraPesquisa from '../../components/BarraPesquisa';
// import {Categoriatype} from '../../models/CategoriaType';
// import { ProdutoType } from '../../models/ProdutoType';

// const Home = ({navigation}) => {
//   //console.log('Params:' + JSON.stringify(route));
//   //console.log('token: ' + token);
//   const {usuario} = useContext(AutenticacaoContext);
//   console.log('Usuario: ' + JSON.stringify(usuario));
//   const [categoria, setCategoria] = useState<Categoriatype[]>([]);
//   const [produtos, setProdutos] = useState<ProdutoType[]>([]);
//   const [carregando, setCarregando] = useState(true);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     getDadosCategoria();
//     getProdutos();
//   }, []);

//   const getDadosCategoria = async () => {
//     // setLoading(true);
//     AxiosInstance.get(`/categoria`, {
//       headers: {Authorization: `Bearer ${usuario.token}`},
//     })
//       .then(result => {
//         //  console.log('Dados das categorias:' + JSON.stringify(result.data));
//         setCategoria(result.data);
//         // setLoading(false);
//       })
//       .catch(error => {
//         console.log(
//           'Erro ao carregar a lista de categoria - ' + JSON.stringify(error),
//         );
//       });
//   };
//   function ListCategoria({categoria}) {
//     return (
//          <Card containerStyle={styles.card_style}>
//       <Card.Image
//         style={styles.imagens_cards}
//         source={{uri:categoria.nomeImagem}}
//       />
//       <Card.Title style={styles.texto_nome_categoria}>{categoria.nomeCategoria}</Card.Title>
//     </Card>
//     );
//   }
//   const getProdutos = async () => {
//     // setLoading(true);
//     AxiosInstance.get(`/produto`, {
//       headers: {Authorization: `Bearer ${usuario.token}`},
//     })
//       .then(result => {
//         console.log('Dados dos produtos:' + JSON.stringify(result.data));
//         setProdutos(result.data);
//         // setLoading(false);
//       })
//       .catch(error => {
//         console.log(
//           'Erro ao carregar a lista de produtos - ' + JSON.stringify(error),
//         );
//       });
//   };
//   function ListProduto({produtos}) {
//     return <CardProduto navigation={navigation} dados={produtos} />;
//   }
//   setTimeout(() => {
//     if (produtos && categoria) {
//       setCarregando(false);
//     }
//   }, 2000);

//   return (
//     <ScrollView style={styles.container}>
//       <BarraPesquisa navigation={navigation}/>
//       {carregando && (
//         <View style={styles.containerLoader}>
//           <Loader cor="pink" />
//           <Text style={styles.nomeLoader}>Carregando</Text>
//         </View>
//       )}
//       {!carregando && (
//         <View>
//           <Text style={styles.titulo_secao}>{'Categorias'}</Text>
//           <FlatList 
//             data={categoria}
//             keyExtractor={(item, index) => String(item.idCategoria)}
//             renderItem={({item}) => <ListCategoria categoria={item} />}
//             horizontal={true}
//             // onEndReached={getDadosCategoria}
//             // onEndReachedThreshold={0.1}
//             // ListFooterComponent={ <FooterList load={loading}/>}
//           />
//           {/* <ScrollView style={styles.scroll_categorias} horizontal={true}>
//             {categoria.map((categoria, indice) => (
//               <TouchableOpacity
//                 key={indice}
//                 onPress={() =>
//                   console.log(
//                     `Categoria ${categoria.nomeCategoria} foi clicada`,
//                   )
//                 }
//                 style={styles.botao_categoria}>
//                 <View style={styles.view_itens_categoria}>
//                   <Text style={styles.texto_nome_categoria}>
//                     {categoria.nomeCategoria}
//                   </Text>
//                 </View>
//               </TouchableOpacity>
//             ))}
//           </ScrollView> */}
//           <Text style={styles.titulo_secao}>{'CardÃ¡pio'}</Text>

//           <FlatList
//             data={produtos}
//             keyExtractor={(item, index) => String(item.idProduto)}
//             renderItem={({item}) => <ListProduto produtos={item} />}
//             horizontal={true}
//             // onEndReached={getDadosCategoria}
//             // onEndReachedThreshold={0.1}
//             // ListFooterComponent={ <FooterList load={loading}/>}
//           />
//           {/* <ScrollView horizontal={true}>
//             {produtos.map((produto, indice) => (
//               <TouchableOpacity key={indice}>
//                 <CardProduto dados={produto} />
//               </TouchableOpacity>
//             ))}
//           </ScrollView> */}
//           <Text style={styles.titulo_secao}>{'Mais vendido'}</Text>
//           <Card containerStyle={styles.card_grande}>
//             <Card.Image
//               style={styles.imagens_cards}
//               source={require('../../assets/picanha.jpg')}
//             />
//             <Card.Divider />
//             <Card.Title style={styles.titulo_card}>Picanha</Card.Title>
//             <Text style={styles.descricao_card}>Carne de churrasco!</Text>
//           </Card>
//         </View>
//       )}
//     </ScrollView>
//   );
// };

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
    marginBottom: 10
  },
  botao_categoria: {
    alignItems: 'center',
    padding: 10,
  },
  texto_nome_categoria: {
    color: 'white',
    textAlign: 'center',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  containerCard:{
    justifyContent: 'center',
    marginBottom: 30
  },
  card_style: {
    backgroundColor: 'red',
    padding: 0,
    marginBottom: 20,
    width: 260,
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
  }
  
});

export default Home;
