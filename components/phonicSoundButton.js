import * as React from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { Audio } from 'expo-av'

export default class PhonicSoundButton extends React.Component {
    playSound = async (soundChunk) => {
        var soundLink = "https://s3-whitehatjrcontent.whjr.online/phones/" + soundChunk + ".mp3"
        console.log(soundChunk)
        await Audio.Sound.createAsync(
            {
                uri: soundLink,
            },
            {shouldPlay: true}
        )
    }
    
    constructor(props){
        super(props)
        this.state = {
            pressedButtonIndex: ''
        }
    }

    render(){
        return(
            <TouchableOpacity style={
                this.props.buttonIndex === this.state.pressedButtonIndex 
                ? [styles.chunkButton, {backgroundColor: 'white'}]
                : [styles.chunkButton, {backgroundColor: 'red' }]
            } 
            onPress={()=>{
                this.setState({ pressedButtonIndex: this.props.buttonIndex})
                this.playSound(this.props.soundChunk)
            }}>
                <Text style={
                    this.props.buttonIndex === this.state.pressedButtonIndex 
                    ? [styles.displayText, {color: 'red'}]
                    : [styles.displayText, {color: 'white' }]
                }>{this.props.wordChunk}</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    displayText: {
        textAlign: 'center',
        fontSize: 30,
        color: 'white'
    },
    chunkButton: {
        width: '60%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 10,
        margin: 5,
        backgroundColor: 'red'
    }
})