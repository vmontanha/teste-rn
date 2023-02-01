import * as React from 'react';
import { View, Text, Button } from 'react-native';
import {
  TextTitle
} from '../components/stylesSearch'

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TextTitle>Abril Comunicações</TextTitle>
      <Button
        title="Iniciar APP"
        onPress={() => navigation.navigate('Busca')}
      />
    </View>
  );
}


export default HomeScreen;