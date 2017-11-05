/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

import ComponenteText from './componenteTexto';

export class Loading extends Component{

  render(){
    return(
      <Text> Loading... </Text>
    )
  }
}

export class ChildComponent extends Component{
  render(){
    if (this.props.result){
      var res= this.props.result.map((item, i)=>{
        return(
          <Text key={i}> {item.title} </Text>
        )
      })
    }

    return (
      <View>
        {this.props.result ? res: <Loading/>}
        <View style={this.props.status ? styles.on: styles.off}/>
      </View>
    )
  }
}

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component<{}> {
  constructor(){
      super()
      this.state = {
        status: false,
        data: null
      }
  }

  componentDidMount(){
      fetch('https://facebook.github.io/react-native/movies.json')
        .then((response)=> response.json())
        .then((responseJson)=>{
          this.setState({
            data: responseJson.movies
          })
        })
  }

  clicked(){
      this.setState({
          status: !this.state.status
      })

}

  render() {

    return (
      <View style={styles.container}>
      <ChildComponent status={this.state.status} result={this.state.data}/>
      <Button
        onPress={this.clicked.bind(this)}
        title='Click here'
      />
        <ComponenteText/>
        <Text style={styles.welcome}>
          Welcome to PuliProject!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit App.js
        </Text>
        <Text style={styles.instructions}>
          {instructions}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  on: {
      width: 100,
      height: 100,
      backgroundColor: 'yellow',
  },
  off: {
      width: 100,
      height: 100,
      backgroundColor: 'black',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },

});
