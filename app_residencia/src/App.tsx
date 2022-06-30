import 'react-native-gesture-handler';
import React from 'react';
import Routes from './routes';
import {AutenticacaoProvider} from './context/AutenticacaoContext';
import { PesquisaProvider } from './context/PesquisaContext';

export default () => {
  return (
    <AutenticacaoProvider>
      <PesquisaProvider>
      <Routes />
      </PesquisaProvider>
    </AutenticacaoProvider>
  );
};
