import React, {useContext} from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import {CarrinhoContext} from '../../context/CarrinhoContext';

const Produto = ({route, navigation}) => {
  const {dadosDoProduto} = route.params;
  console.log('Entrou',dadosDoProduto);
  

  const {adicionarProduto} = useContext(CarrinhoContext);

  const handleAddProduto = () => {
    adicionarProduto(
      dadosDoProduto.sku,
      dadosDoProduto.nomeProduto,
      dadosDoProduto.descricaoProduto,
      dadosDoProduto.precoProduto ? dadosDoProduto.precoProduto : 0,
      dadosDoProduto.imagemProduto,
    );
  };
  return (
      <View style={styles.container}>
      <View>
        <Text style={styles.container_imagem}>Imagem</Text>
      </View>
      <View>
        <Text style={styles.container_produto}>{}</Text>
        <Text>{}</Text>
        <TouchableOpacity onPress={() => handleAddProduto()}>
          <Text>Comprar</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Favoritar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
    alignItems: 'stretch',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  container_imagem: {
    width: '50%',
  },
  container_produto: {
    width: '50%',
  },
});

export default Produto;