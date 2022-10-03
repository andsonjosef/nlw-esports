import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, SafeAreaView, TouchableOpacity, View, Text } from 'react-native';
import { GameParams } from '../../@types/navigation';
import { Background } from '../../components/Background';
import { Entypo } from '@expo/vector-icons';
import { styles } from './styles';
import { THEME } from '../../theme';
import logoImg from '../../assets/logo-nlw-esports.png';
import { Heading } from '../../components/Heading';
import { DuoCard, DuoCardProps } from '../../components/DuoCard';

export function Game() {

  const navigation = useNavigation();
  const route = useRoute();
  const game = route.params as GameParams;
  const [duos, setDuos] = useState<DuoCardProps[]>([]);

  function handleGOBack() {
    navigation.goBack();
  }

  useEffect(() => {
    fetch(`http://172.17.80.1:3333/games/${game.id}/ads`)
      .then(res => res.json())
      .then(data => setDuos(data))
      .catch(error => console.error(error));
  }, []);


  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGOBack}>
            <Entypo
              name='chevron-thin-left'
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>
          <Image
            style={styles.logo}
            source={logoImg} />
          <View style={styles.right} />
        </View>

        <Image style={styles.cover} source={{ uri: game.bannerUrl }} resizeMode="cover"></Image>

        <Heading title={game.title} subtitle="Connect and start playing!"></Heading>

        <FlatList
          data={duos}
          horizontal
          contentContainerStyle={[duos.length > 0 ? styles.contentList : styles.emptyListContent]}
          showsHorizontalScrollIndicator={false}
          style={styles.containerList}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <DuoCard
              data={item}
              onConnect={() => { }}
            />
          )}

          ListEmptyComponent={() => (
            <Text style={styles.emptyListText}>
              There are no ADs published.
            </Text>
          )}
        />

      </SafeAreaView>
    </Background>
  );
}