import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import List from './List'
import DummyDetail from './DummyDetail'


function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        style = {{marginTop:16}}
        title="Go to List"
        onPress={() => navigation.navigate('list')}
      />
      <Button
        style = {{marginTop:16}}
        title="Go to Detail"
        margin={16}
        onPress={() => navigation.navigate('detail')}
      />
    </View>
  );
}

const Stack = createStackNavigator();

function Main() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="list" component={List} />
        <Stack.Screen name="detail" component={DummyDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Main