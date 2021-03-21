import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Header from './components/Header';
import GameScreen from './Screens/GameScreen';
import GameStartingScreen from './Screens/GameStartingScreen';
import GameOverScreen from './Screens/GameOverScreen';
import AppLoading  from 'expo-app-loading';
import * as Font from 'expo-font';

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  const fetchFonts = () => {
    return Font.loadAsync({
      'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
      'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
      'valorant': require('./assets/fonts/Valorant.ttf')
    });
  }


  if (!dataLoaded) {
    return(
      <AppLoading 
        startAsync={fetchFonts} 
        onFinish={() => setDataLoaded(true)} 
        onError={(err) => console.log(err)}
      />);
  };


  const configureNewGameHandler = () => {
    setGuessRounds(0);
    setUserNumber(null);
  };

  const userNumberHandler = (selectedNumber) => {
    setUserNumber(selectedNumber)
  };

  const gameOverHandler = (numOfRounds) => {
    setGuessRounds(numOfRounds);
  };

  let content = <GameStartingScreen onStartGame={userNumberHandler} />;
  if (userNumber && guessRounds <= 0) {
    content = <GameScreen chosenNum={userNumber} onGameOver={gameOverHandler} />
  } else if (guessRounds > 0) {
    content = <GameOverScreen
      chosenNumber={userNumber}
      totalRounds={guessRounds}
      onRestartGame={configureNewGameHandler}
    />
  }

  return (
    <View style={styles.screen}>
      <Header title={"Guess a number"} />
      {content}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  }
});
