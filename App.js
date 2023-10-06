import * as React from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { Header } from '@rneui/themed';
import { SafeAreaProvider } from 'react-native-safe-area-context'
import db from './localdb'
import PhonicSoundButton from './components/phonicSoundButton'

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      text: '', 
      chunks : [],
      phonicSounds: []
    }
  }


  render() {
  return (
      <SafeAreaProvider>
        <View style={styles.container}>
          <Header
          backgroundColor={'#9c8210'}
          centerComponent={{
            text: "Monkey Chunkey",
            style: { color: "#fff", fontSize: 30}
          }}
          >
          </Header>

          <Image 
          style={styles.imageIcon} 
          source={{uri: "https://www.shareicon.net/data/128x128/2015/08/06/80805_face_512x512.png"}}>
          </Image>

          <TextInput
          style={styles.inputBox}
          onChangeText={text=>{
            this.setState({
               text: text})
          }}
          value={this.state.text}
          />
          <TouchableOpacity style={styles.goButton} onPress={()=>{
            word = this.state.text.toLowerCase().trim()
            db[word]
            ? (this.setState({ chunks: db[word].chunks }),
              this.setState({ phonicSounds: db[word].phones}))
              : alert('The word does not exist in our database')
            
          }}>
            <Text style={styles.buttonText}>GO</Text>
          </TouchableOpacity>
          <View>
            {this.state.chunks.map((item, index) => {
              return(
                <PhonicSoundButton
                wordChunk = {this.state.chunks[index]}
                soundChunk = {this.state.phonicSounds[index]}
                buttonIndex = {index}
                />
              )
            })}
          </View>
        </View>
      </SafeAreaProvider>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b8b8b8',

  },
  inputBox: {
    marginTop: 200,
    width: "80%",
    alignSelf: 'center',
    height: 40,
    textAlign: 'center',
    borderWidth: 4,
    outline: 'none',
  },
  buttonText: {
    textAlign: 'center', 
    fontSize: 30,
    fontWeight: 'bold'
  },
  goButton: {
    width: '50%',
    height: 55,
    alignSelf: 'center',
    padding: 10,
    margin: 10
  }, 
  displayText: {
    textAlign: 'center',
    fontSize: 30,
    color: "white"
  },
  imageIcon: {
    width: 150,
    height: 150,
    marginLeft: 95
  },
  chunkButton: {
    width: '60%',
    height: 50,
    justifyCOntent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    margin: 5,
    backgroundColor: 'red'
  }
});
