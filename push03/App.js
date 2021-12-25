/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import type {Node} from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform, View,
  Image,
} from 'react-native';
import Cifar from './cifar_test_data/cifar';
import ImagePicker from 'react-native-image-picker'
import Tflite from 'tflite-react-native'

let tflite = new Tflite()
var modelFile = 'models/CIFAR10_model.tflite'
var labelsFile = 'models/CIFAR_labels.txt'

function App() {
  const [recognition, setRecognition] = useState(null)
  const [source, setSource] = useState()
  const [input, setInput] = useState()

  function runModel(path) {
    tflite.runModelOnImage(
      {path: path}, (err, ress) => {
        if (err) console.log(err);
        else {
          console.log(ress);
          setRecognition(ress[0]);
        }
      });
  }
  function selectGallaryImage() {
    const options = {};
    ImagePicker.launchImageLibrary(options, res => {
      if (res.didCancel) console.log('caneled');
      else if (res.error) console.log('error');
      else if (res.customButton) console.log('custom butt');
      else {
        console.log('Libaray open');
        var path = Platform.OS === 'ios' ? res.uri : 'file://' + res.path;
        setSource(path);
        console.log(path)
        runModel(path)
      }
    });
  }

  useEffect(() => {
    console.log('using tflite load model');
    tflite.loadModel(
      {model: modelFile, labels: labelsFile},
      (err, res) => {
        if (err) console.log(err);
        else console.log(res);
      });
  }, []);

  const AIR_PATH = './cifar_test_data/airplane1.png'


  return (
    <View style={styles.main}>
      <Text style={styles.text}>CIFAR10 app</Text>

      <TouchableOpacity style={styles.button} onPress={() => selectGallaryImage()}>
        <Text style={styles.WT}>Camera Roll</Text>
      </TouchableOpacity>

      <Cifar setImage={item => setInput(item)} />
      <TouchableOpacity style={styles.button} onPress={() => runModel('file://./cifar_test_data/airplane1.png')}>
        <Text style={styles.WT}>from internet</Text>
      </TouchableOpacity>
      {
        recognition ?
          <View>
            <Image source={source}></Image>
            <Text style={styles.text}>{recognition['label'] + ' - ' + (recognition['confidence'] * 100).toFixed(0) + '%'}</Text>
          </View> : null
      }

    </View >
  );
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#981',
    padding: 15,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    flex: 1,
    width: Dimensions.get('screen').width
  },
  button: {
    backgroundColor: '#aaa',
    borderWidth: 5,
    padding: 30,
    alignItems: 'center',
    borderRadius: 15,
  },
  WT: {
    color: '#fff',
    fontSize: 23
  },
  text: {fontSize: 22, fontWeight: 'bold', margin: 10},

});

export default App;
