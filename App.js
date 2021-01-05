import * as React from 'react';
import {View} from 'react-native';
import HomeScreen from './Screens/HomeScreen';
import {Header} from 'react-native-elements';

export default class App extends React.Component{
  render(){
    return(
      <View>
        <Header
          backgroundColor={'blue'}
          centerComponent={{
          text: 'Dictionary App',
          style: { color: '#fff', fontSize: 20 , padding:40},
          }}
        />
        <HomeScreen/>
      </View>
    )
  }
}