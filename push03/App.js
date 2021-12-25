/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform, View,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ImagePicker from 'react-native-image-picker';
import Tflite from 'tflite-react-native';

let tflite = new Tflite();
var modelFile = 'models/CIFAR10_model.tflite';
var labelsFile = 'models/CIFAR_labels.txt';

function App() {
  const [recognition, setRecognition] = useState(null);
  const [source, setSource] = useState();

  function runModel(path) {
    tflite.runModelOnImage(
      {path: path}, (err, ress) => {
        if (err) {console.log(err);}
        else {
          console.log(ress);
          setRecognition(ress);
        }
      });
  }
  function selectGallaryImage() {
    const options = {};
    ImagePicker.launchImageLibrary(options, res => {
      if (res.didCancel) {console.log('caneled');}
      else if (res.error) {console.log('error');}
      else if (res.customButton) {console.log('custom butt');}
      else {
        console.log('Libaray open');
        var path = Platform.OS === 'ios' ? res.uri : 'file://' + res.path;
        setSource(path);
        console.log('path is : ' + path);
        runModel(path);
      }
    });
  }

  useEffect(() => {
    console.log('using tflite load model');
    tflite.loadModel(
      {model: modelFile, labels: labelsFile},
      (err, res) => {
        if (err) {console.log(err);}
        else {console.log('useEffect respose: ' + res);}
      });
  }, []);




  return (
    <LinearGradient colors={['rgba(255, 255, 255, 0)', 'rgba(0, 0, 0, 0.8)']} style={styles.main}>
      <LinearGradient colors={['rgba(0,0,0, 0.6)', 'rgba(255, 255, 255, 0)']} style={styles.header}>
        <Text style={[styles.text, {fontSize: 24, color: '#fff'}]}>CIFAR10 Application</Text>
        <Text style={styles.text}>This is an a presentetion of prediction of neural network that was train on CIFAR10 dataset</Text>

      </LinearGradient>


      <TouchableOpacity style={styles.button} onPress={() => selectGallaryImage()}>
        <Text style={styles.WT}>Camera Roll</Text>
      </TouchableOpacity>


      {
        recognition ?
          <View>
            <Image source={source} />
            {recognition.length === 1 ?
              <Text style={[styles.text, {fontSize: 24, color: '#fff'}]}>first peak: {recognition[0].label + ' - ' + (recognition[0].confidence * 100).toFixed(0) + '%'}</Text>
              :
              <Text>sec</Text>
            }
          </View> : <View />
      }

    </LinearGradient >
  );
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#981',
    padding: 15,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    flex: 1,
    width: Dimensions.get('screen').width,
  },
  header: {
    height: Dimensions.get('screen').height * 25 / 100,
    backgroundColor: '#ef6',
    padding: 10,
    position: 'absolute',
    top: 0,
    width: Dimensions.get('screen').width,
    borderBottomWidth: 3,
    borderBottomColor: '#444'
  },
  button: {
    backgroundColor: '#5dd',
    borderWidth: 5,
    padding: 30,
    alignItems: 'center',
    borderRadius: 15,
  },
  WT: {
    color: '#fff',
    fontSize: 23,
  },
  text: {fontSize: 16, fontWeight: 'bold', margin: 10, padding: 10},

});

export default App;
