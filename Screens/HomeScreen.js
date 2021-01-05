import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

export default class HomeScreen extends Component {
  constructor() {
    super();
    this.state = {
      text: '',
      word: '',
      definition: '',
      lexicalCategory: '',
      isSearchPressed: true,
      examples: [],
    };
  }
  getWord = (word) => {
    var searchKeyWord = word.toLowerCase();
    var url =
      'https://rupinwhitehatjr.github.io/dictionary/' + searchKeyWord + '.json';
    console.log(url);
    return fetch(url)
      .then((data) => {
        if (data.status === 200) {
          return data.json();
        } else {
          return null;
        }
      })
      .then((response) => {
        var responseObject = response;
        var word = responseObject.word;
        //var lexicalCategory = responseObject.results[0].lexicalEntries[0].lexicalCategory.text
        if (responseObject) {
          var wordData = responseObject.definition[0];
          var definition = wordData.description;
          var lexicalCategory = wordData.wordType;
          console.log(lexicalCategory);

          this.setState({
            word: this.state.text,
            definition: definition,
            lexicalCategory: lexicalCategory,
          });
        } else {
          this.setState({
            word: this.state.text,
            definition: 'NotFound',
          });
        }
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.inputbox}
          onChangeText={(text) => {
            this.setState({
              text: text,
              isSearchPressed: false,
              word: 'Loading...',
              lexicalCategory: '',
              examples: [],
              defination: '',
            });
          }}
          value={this.state.text}
        />
        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => {
            this.setState({ isSearchPressed: true });
            this.getWord(this.state.text);
          }}>
          <Text style={{ fontSize: 20 }}>Search</Text>
        </TouchableOpacity>

        <View style={styles.detailsContainer}>
          <Text style={styles.detailsTitle}>word: </Text>
          <Text style={{ fontSize: 18, marginLeft: 60, marginTop: -27 }}>
            {this.state.word}
          </Text>
        </View>

        <View style={styles.detailsContainer}>
          <Text style={styles.detailsTitle}>Type: </Text>
          <Text style={{ fontSize: 18 }}>{this.state.lexicalCategory}</Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginTop: 50,
            marginLeft: 50,
          }}>
          <Text style={styles.detailsTitle}>Definition: </Text>
          <Text style={{ fontSize: 18, marginLeft: 20, marginTop: 23 }}>
            {this.state.definition}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputbox: {
    marginTop: 60,
    width: '80%',
    alignSelf: 'center',
    height: 60,
    textAlign: 'center',
    borderWidth: 4,
    borderRadius: 20,
  },
  searchButton: {
    marginTop: 30,
    width: 200,
    height: 70,
    marginLeft: 110,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  detailsContainer: {
    marginTop: 50,
    marginLeft: 50,
  },
  detailsTitle: {
    marginTop: 20,
    fontSize: 20,
  },
});
