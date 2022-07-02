import React, {useContext} from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import {CarrinhoContext} from '../../context/CarrinhoContext';

const Produto = ({route, navigation}) => {
  const {dadosDoProduto} = route.params;
  console.log('Entrou', dadosDoProduto);

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
        <Text style={styles.container_imagem}>
          {dadosDoProduto.imagemProduto}
        </Text>
      </View>
      <View style={styles.container_produto}>
        <Text>{dadosDoProduto.nomeProduto}</Text>
        <Text style={styles.nome_produto}>
          {dadosDoProduto.descricaoProduto}
        </Text>
        <Text style={styles.preco_produto}></Text>
        <TouchableOpacity
          style={styles.btt_comprar}
          onPress={() => handleAddProduto()}>
          <Text style={styles.txt_btt_comprar}>Comprar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btt_favoritar}>
          <Text style={styles.txt_btt_favoritar}>Favoritar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 20,
    marginTop: 20,
  },
  container_imagem: {
    width: '50%',
  },
  container_produto: {
    width: '50%',
  },
  nome_produto: {
    fontSize: 24,
    color: '#000',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  preco_produto: {
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  btt_comprar: {
    backgroundColor: 'black',
    padding: 10,
    marginBottom: 20,
    width: '70%',
  },
  txt_btt_comprar: {
    color: '#fff',
    textAlign: 'center',
  },
  btt_favoritar: {
    padding: 10,
    borderBottomWidth: 2,
    borderColor: '#000',
    width: '70%',
  },
  txt_btt_favoritar: {
    color: '#000',
    textAlign: 'center',
  },
});

export default Produto;
