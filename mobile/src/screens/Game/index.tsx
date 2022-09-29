import { useRoute } from '@react-navigation/native';
import React from 'react';
import { SafeAreaView } from 'react-native';
import { GameParams } from '../../@types/navigation';
import { Background } from '../../components/Background';

import { styles } from './styles';


export function Game() {

  const route = useRoute();
  const game = route.params as GameParams;
  console.log("game", game)
  return (
    <Background>
      <SafeAreaView style={styles.container}>

      </SafeAreaView>
    </Background>
  );
}