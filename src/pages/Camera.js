import React, { Component } from 'react';

import { View, TouchableOpacity, Text, StyleSheet, Image, Dimensions} from 'react-native';
import { RNCamera } from 'react-native-camera';

const { width } = Dimensions.get('screen');

// import { Container } from './styles';

export default class Camera extends Component {
  state = {
    show: false,
    img: require('../assets/hand.png')
  }
  takePicture = async() => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const img = await this.camera.takePictureAsync(options);
      console.log(img.uri);
      this.setState({ img, show: false });
    }
  };

  upload = () => {
    const body = new FormData();
     //pegar a imagem da store e passar para o state
     body.append('img', {uri: this.state.img.uri, name: 'img.png', type: 'image/png' });
     fetch('http://192.168.1.200:3333/posts', {
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      body
     }).then(a => a.json()).then(res => alert(res));
  }

  render() {
    return this.state.show ?
      <View style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          //ref='this.camera'
          //style={styles.preview}
          style={StyleSheet.absoluteFill}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.off}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
        />
        <TouchableOpacity style={styles.capture} onPress={() => this.takePicture()} />
      </View>
      :
      <View style={styles.container}>
        <Image source={this.state.img} style={styles.img} />
        <Text style={styles.button} onPress={() => this.setState({ show: true })}>Take Photo</Text>
        <Text style={styles.button} onPress={() => this.upload()}>Upload Photo</Text>
      </View>
      ;
      
    
    //return <View />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  button: {
    padding: 10,
    textAlign: "center",
    paddingHorizontal: 20,
    margin: 20,
    width: 140,
    backgroundColor: 'orange',
    color: 'white',
    borderRadius: 10,
  },
  img: {
    width: 300,
    height: 300,
    borderRadius: 150,
    marginBottom: 50,
  },
  capture: {
    width: 60,
    height: 60,
    position: 'absolute',
    bottom: 10,
    left: (width / 2) - 30,
    backgroundColor: 'white',
    borderRadius: 30
  }
});
