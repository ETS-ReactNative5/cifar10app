/* eslint-disable prettier/prettier */
/**
 * This App is for academic purpose only.
 * Created by Ben Sagir.
 * in this app there will be a predict from a neoral network that happends localy on the device.
 * the net was train on Google Colab.
 * the net is MobileNetV2.
 * train accuracy achived: 98%
 * validation accuracy achived: 87%
 */

import React, {useState, useEffect} from 'react';
import {Dimensions, StyleSheet, Text, TouchableOpacity, Platform, View, Image} from 'react-native';
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
    <LinearGradient colors={['#5829A7', '#3D0E61']} style={styles.main}>
      <LinearGradient colors={['#93CAF6', '#97DFFC']} style={styles.header}>
        <Text style={styles.headText}>CIFAR10 Application</Text>
        <Text style={styles.headSmallText}>This is an a presentetion of prediction of neural network that was train on CIFAR10 dataset</Text>
      </LinearGradient>

      <TouchableOpacity onPress={() => selectGallaryImage()}>
        <LinearGradient colors={['#858AE3', '#97DFFC']} style={styles.button}>
          <Text style={styles.WT}>Camera Roll</Text>
        </LinearGradient>
      </TouchableOpacity>

      {
        recognition ?
          <View>
            {/* <Image source={source} /> */}
            {recognition.length === 1 ?
              <View style={styles.reconV}>
                {/* <Text style={styles.text}>first peak:</Text> */}
                <Text style={styles.reconText}>{recognition[0].label + ' - ' + (recognition[0].confidence * 100).toFixed(0) + '%'}</Text>
              </View>
              :
              <View>
                <View style={styles.reconV}>
                  <Text style={styles.text}>1st peak:</Text>
                  <Text style={styles.reconText}>{recognition[0].label + ' - ' + (recognition[0].confidence * 100).toFixed(0) + '%'}</Text>
                </View>
                {recognition[1] ?
                  <View style={styles.reconV}>
                    <Text style={styles.text}>2nd peak:</Text>
                    <Text style={styles.reconText}>{recognition[1].label + ' - ' + (recognition[1].confidence * 100).toFixed(0) + '%'}</Text>
                  </View>
                  : <View />}
                {recognition[2] ?
                  <View style={styles.reconV}>
                    <Text style={styles.text}>3rd peak:</Text>
                    <Text style={styles.reconText}>{recognition[2].label + ' - ' + (recognition[2].confidence * 100).toFixed(0) + '%'}</Text>
                  </View>
                  : <View />}
              </View>
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
    padding: 10,
    position: 'absolute',
    top: 0,
    width: Dimensions.get('screen').width,
    borderBottomWidth: 3,
    borderBottomColor: '#444',
  },
  button: {
    borderWidth: 3,
    paddingHorizontal: 45,
    paddingVertical: 25,
    alignItems: 'center',
    borderRadius: 15,
    borderColor: '#461177',
    shadowColor: '#3D0E61',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
  },
  WT: {
    color: '#4E148C',
    fontSize: 23,
    fontWeight: 'bold',
  },
  reconV: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reconText: {
    fontWeight: 'bold',
    margin: 10,
    padding: 10,
    fontSize: 24,
    color: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 10,
    padding: 10,
    color: '#fff',
  },
  headText: {
    fontSize: 24,
    color: '#3D0E61',
    fontWeight: 'bold',
    margin: 10,
    padding: 10,
  },
  headSmallText: {
    fontSize: 16,
    color: '#3D0E61',
    fontWeight: 'bold',
    margin: 10,
    padding: 10,
  },
});

export default App;
