/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import type {Node} from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
  Image,
} from 'react-native';

import ImagePicker from 'react-native-image-picker'
import CameraRoll from "@react-native-community/cameraroll";




const App: () => Node = () => {
  const [recognition, setRecognition] = useState()
  const [source, setSource] = useState()

  function selectGallaryImage() {
    const options = {}
    ImagePicker.launchImageLibrary(options, res => {
      if (res.didCancel) console.log('caneled')
      else if (res.error) console.log('error')
      else if (res.customButton) console.log('custom butt')
      else {
        console.log('Libaray open')
      }
    })
  }


  return (
    <View style={styles.main}>
      <Image
        source={require('./mnist/all.png')}
      />
      <TouchableOpacity style={styles.button} onPress={() => selectGallaryImage()}>
        <Text style={styles.WT}>Camera Roll</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => {
        console.log('_handlePressImage.');

        var promise = CameraRoll.save('/mnist/all.png');
        promise.then(function (result) {
          console.log('save succeeded ' + result);
        }).catch(function (error) {
          console.log('save failed ' + error);
        });

      }}>
        <Text style={styles.WT}>Take a Photo</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#888',
    padding: 15,
    justifyContent: 'center',
    alignSelf: 'center',
    flex: 1,
    width: Dimensions.get('screen').width
  },
  button: {
    backgroundColor: '#aaa',
    borderWidth: 5,
    padding: 10,
    alignItems: 'center',
    borderRadius: 15,
  },
  WT: {
    color: '#fff',
    fontSize: 23
  },

});

export default App;
