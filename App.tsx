import React, {useEffect, useState} from 'react';
import {NativeModules} from 'react-native';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Voice, {
  SpeechErrorEvent,
  SpeechResultsEvent,
} from '@react-native-voice/voice';

function App(): JSX.Element {
  const [error, setError] = useState('');
  const [end, setEnd] = useState('');
  const [started, setStarted] = useState('');
  const [results, setResults] = useState([]);
  const [partialResults, setPartialResults] = useState([]);
  const [language, setLanguage] = useState('en-IN');

  const SpeechToText = NativeModules.SpeechToText;

  async function startSpeechToText() {
    console.log('start speach recogination');
    try {
      const result = await SpeechToText.startRecognition(language); // <-- pass language here , in which you want the output.
      console.log('Speech recognized: ', result.text);
    } catch (error) {
      console.error(error);
    }
  }

  // useEffect(() => {
  //   Voice.onSpeechStart = onSpeechStart;
  //   Voice.onSpeechEnd = onSpeechEnd;
  //   Voice.onSpeechError = onSpeechError;
  //   Voice.onSpeechResults = onSpeechResults;

  //   return () => {
  //     Voice.destroy().then(Voice.removeAllListeners);
  //   };
  // }, []);

  // const onSpeechStart = (e: any) => {
  //   console.log('onSpeechStart: ', e);
  //   setStarted('√');
  // };

  // const onSpeechEnd = (e: any) => {
  //   console.log('onSpeechEnd: ', e);
  //   setEnd('√');
  // };

  // const onSpeechError = (e: SpeechErrorEvent) => {
  //   console.log('onSpeechError: ', e);
  //   setError(JSON.stringify(e.error));
  // };

  // const onSpeechResults = (e: SpeechResultsEvent) => {
  //   console.log('onSpeechResults: ', e);
  //   setResults(e.value);
  // };

  // const startRecognizing = async () => {
  //   try {
  //     await Voice.start('en-Us');
  //     setStarted('');
  //     setEnd('');
  //     setResults([]);
  //   } catch (err) {
  //     console.log('err start: ', err);
  //   }
  // };

  // const stopRecognizing = async () => {
  //   try {
  //     await Voice.stop();
  //     await Voice.destroy();
  //     Voice.removeAllListeners();
  //     setStarted('');
  //     setEnd('');
  //     setResults([]);
  //   } catch (err) {
  //     console.log('err start: ', err);
  //   }

  return (
    <View style={styles.sectionContainer}>
      <Text style={{textAlign: 'center'}}>Voice</Text>
      <TouchableOpacity style={styles.btn} onPress={startSpeechToText}>
        <Image source={require('./mic2.png')} style={{width: 60, height: 60}} />
      </TouchableOpacity>
      <View style={styles.box}>
        <Text>Started: {started}</Text>
        <Text>Ended: {end}</Text>
      </View>
      <ScrollView horizontal>
        {results.map((item, i) => {
          return (
            <Text key={item + i} style={{textAlign: 'center'}}>
              {item}
            </Text>
          );
        })}
      </ScrollView>

      <TouchableOpacity style={styles.btn2} onPress={() => console.log('work')}>
        <Text style={{color: 'white'}}>Stop List</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 20,
    flex: 1,
    color: 'black',
    alignSelf: 'center',
    fontSize: 20,
  },
  btn: {
    alignSelf: 'center',
    marginTop: 50,
  },
  box: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 50,
    justifyContent: 'space-evenly',
  },
  btn2: {
    width: '100%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
    position: 'absolute',
    bottom: 0,
  },
});

export default App;
