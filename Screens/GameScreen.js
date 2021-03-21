import React, { useEffect, useRef, useState } from 'react';
import {View, Text, StyleSheet, Button, Alert} from 'react-native';
import Card from '../components/Card';
import Number_Container from '../components/Number_Container';
import Default_styles from '../constants/Default_styles';
import Colors from '../constants/Colors';



const randomNumberGenerator = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const randNum = Math.floor((Math.random() * (max - min)) + min)
    if (randNum === exclude) {
        return randomNumberGenerator(min, max, exclude);
    } else {
        return randNum;
    }
    
};



const GameScreen = (props) => {
    const [currentGuess, setCurrentGuess] = useState(randomNumberGenerator(1, 100, props.chosenNum));
    const [rounds, setRounds] = useState(0);

    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const {chosenNum, onGameOver} = props

    useEffect(() => {
        if (currentGuess === chosenNum) {
            onGameOver(rounds);
        }
    }, [currentGuess, chosenNum, onGameOver])

    const nextGuessHandler = (direction) => {
        if (
            (direction === 'lower' && currentGuess < props.chosenNum) || 
            (direction === 'greater' && currentGuess > props.chosenNum)
        ) {
            Alert.alert(
                'Don\'t lie', 
                'You know its wrong...', 
                [{ text:'Okay', style:'cancel' }]
            );
            return;
        };
        
        if (direction == 'lower') {
            currentHigh.current = currentGuess;
        } else {
            currentLow.current = currentGuess;
        };
        const nextNum = randomNumberGenerator(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNum);
        setRounds(currentRound => currentRound + 1);
    };

    return(
        <View style={styles.screen}>
            <Text style={Default_styles.titleText}>Computer's Guess</Text>
            <Number_Container>{currentGuess}</Number_Container>
            <Card style = {styles.buttonContainer}>
                <Button title={'LOWER'} onPress={nextGuessHandler.bind(this, 'lower')}/>
                <Button title={'HIGHER'} onPress={nextGuessHandler.bind(this, 'greater')}/>
            </Card>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
        backgroundColor: Colors.screenBackgroundColor
    },
    buttonContainer: {
        alignItems: 'center',
        marginTop: 10,
        padding: 20,
        width: 300,
        maxWidth: '80%',
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
});

export default GameScreen;