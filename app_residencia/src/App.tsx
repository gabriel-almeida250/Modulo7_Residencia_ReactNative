import 'react-native-gesture-handler';
import React from 'react';
import Routes from './routes';
import {AutenticacaoProvider} from './context/AutenticacaoContext';
import { PesquisaProvider } from './context/PesquisaContext';
import { CarrinhoProvider } from './context/CarrinhoContext';

export default () => {
  return (
    <AutenticacaoProvider>
      <PesquisaProvider>
        <CarrinhoProvider>
      <Routes />
      </CarrinhoProvider>
      </PesquisaProvider>
    </AutenticacaoProvider>
  );
};
