/* eslint-disable prettier/prettier */
/**
 * This App is for academic purpose only.
 * Created by Ben Sagir.
 * in this app there will be a predict from a neural network that happends localy on the device.
 * the net was train on Google Colab.
 * the net is DenseNet201.
 * train accuracy achived: 98%
 * validation accuracy achived: 90%
 */

import React, {useState, useEffect, useCallback} from 'react';
import {Dimensions, StyleSheet, Text, TouchableOpacity, Platform, View, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ImagePicker from 'react-native-image-picker';
import Tflite from 'tflite-react-native';
import {RNCamera} from 'react-native-camera';



let tflite = new Tflite();
var modelFile = 'models/densenet201_model_run47.tflite';
var labelsFile = 'models/gng_labels.txt';

function App() {
  const [recognition, setRecognition] = useState(null);
  const [source, setSource] = useState();
  const [camera, setCamera] = useState();
  const [open, setOpen] = useState(false);
  const [score, setScore] = useState(0);
  const [grades, setGrades] = useState([]);

  function updateScore(s) {
    let temp = parseInt(score);
    temp += parseInt(s);
    setScore(temp);
    const tempg = grades;
    tempg.push(parseInt(s));
    setGrades(tempg);
    console.log(tempg, 'max index val:', tempg.indexOf(Math.max(...tempg)))
  }
  function runModel(path) {
    tflite.runModelOnImage(
      {path: path}, (err, ress) => {
        if (err) {console.log(err);}
        else {
          console.log(ress);

          console.log(ress[0]['confidence'], ress[0].index);
          if (ress[0].index == 0) {
            updateScore((ress[0].confidence * 100).toFixed(0));
          }
          else
            updateScore(0)
          console.log((ress[0].confidence * 100).toFixed(0))
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
  function selectCamera() {
    const options = {};
    ImagePicker.launchCamera(options, res => {
      if (res.didCancel) {console.log('caneled');}
      else if (res.error) {console.log('error');}
      else if (res.customButton) {console.log('custom butt');}
      else {
        console.log('Camera open');
        var path = Platform.OS === 'ios' ? res.uri : 'file://' + res.path;
        setSource(path);
        console.log('path is : ' + path);
        runModel(path);
      }
    });
  }
  async function takePic() {
    const data = [];
    const options = {fixOrientation: true, quality: 0.5, writeExif: false};
    let path = (await camera.takePictureAsync(options)).uri;
    runModel(path)
  }


  useEffect(() => {
    tflite.loadModel(
      {model: modelFile, labels: labelsFile},
      (err, res) => {
        if (err) {console.log(err);}
        else {console.log('useEffect load ' + modelFile + ' model respose: ' + res);}
      });
  }, []);




  return (
    <View style={styles.main}>
      <View style={styles.header}>
        <Text style={styles.headText}>Gum - Not Gum Application</Text>
        <Text style={styles.headSmallText}>This is an a presentetion of prediction of neural network that was train on GNG dataset</Text>
      </View>
      {
        recognition ?
          <View style={styles.recognition}>
            <Image source={{uri: source}} style={styles.img} />
            {recognition.length === 1 ?
              <View style={styles.reconV}>
                <Text style={styles.reconText}>{recognition[0].label + ' - ' + (recognition[0].confidence * 100).toFixed(0) + '%'}</Text>
                <Text style={styles.reconText}>Score - {score}</Text>
              </View>
              :
              <View>
                <View style={styles.reconV}>
                  <Text style={styles.reconText}>Score - {score}</Text>

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
      {
        open ?
          <RNCamera
            ref={(ref) => setCamera(ref)}
            captureAudio={false}
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.on}
            androidCameraPermissionOptions={{
              title: 'Permission to use camera',
              message: 'We need your permission to use your camera',
              buttonPositive: 'Ok',
              buttonNegative: 'Cancel',
              forceUpOrientation: true,
            }} ><View style={styles.buttons}>
              <TouchableOpacity
                style={[styles.snap, styles.button]}
                onPress={() => takePic()}>
                <Text>click</Text>
              </TouchableOpacity>
            </View></RNCamera>
          :
          null
      }
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity onPress={() => selectGallaryImage()}>
          <View style={styles.button}>
            <Text style={styles.WT}>Camera Roll</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => selectCamera()}>
          <View style={styles.button}>
            <Text style={styles.WT}>Take a Photo</Text>
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => setOpen(!open)}>
        <View style={styles.button}>
          <Text style={styles.WT}>Premission</Text>
        </View>
      </TouchableOpacity>
    </View >
  );
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#F3F9FF',
    padding: 15,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    flex: 1,
    width: Dimensions.get('screen').width,
  },
  header: {
    padding: 10,
    position: 'absolute',
    top: 0,
    width: Dimensions.get('screen').width,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 7.49,
    elevation: 12,
  },
  button: {
    backgroundColor: '#56AAFF',
    paddingHorizontal: 25,
    paddingVertical: 12,
    margin: 10,
    alignItems: 'center',
    borderRadius: 11,
    shadowColor: '#229BD5',
    shadowOffset: {
      width: 9,
      height: 11,
    },
    shadowOpacity: 0.43,
    shadowRadius: 16,
    elevation: 12,
  },
  WT: {
    color: '#FFF',
    fontSize: 21,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Helvetica',

  },
  recognition: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  img: {
    width: 180,
    height: 180,
    margin: 15,
    borderRadius: 10,
    padding: 0,
    borderColor: '#461177',
    shadowColor: '#3D0E61',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
  },
  reconV: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  reconText: {
    fontWeight: 'bold',
    margin: 10,
    padding: 10,
    fontSize: 24,
    color: '#273746',
    fontFamily: 'Helvetica',

  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 10,
    padding: 10,
    color: '#273746',
    fontFamily: 'Helvetica',

  },
  headText: {
    fontSize: 24,
    color: '#273746',
    fontWeight: 'bold',
    padding: 10,
    fontFamily: 'Helveticas',

  },
  headSmallText: {
    fontSize: 16,
    color: '#79A8D8',
    fontWeight: 'bold',
    padding: 8,
    fontFamily: 'Helvetica',

  },
});

export default App;
