import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Button, Alert, ScrollView, FlatList } from 'react-native';
import Card from '../components/Card';
import Number_Container from '../components/Number_Container';
import Default_styles from '../constants/Default_styles';
import Colors from '../constants/Colors';
import MainButton from '../components/MainButton';
import { Ionicons } from '@expo/vector-icons';




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

const renderListItems = (listLength, itemData) => {
    return (<View style={styles.listItem}>
        <Text style={Default_styles.bodyText}>#{listLength - itemData.index}</Text>
        <Text style={Default_styles.bodyText}>{itemData.item}</Text>
    </View>
    );
};

const GameScreen = (props) => {
    initialGuess = randomNumberGenerator(1, 100, props.chosenNum)
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);

    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const { chosenNum, onGameOver } = props

    // check winning condition
    useEffect(() => {
        if (currentGuess === chosenNum) {
            onGameOver(pastGuesses.length);
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
                [{ text: 'Okay', style: 'cancel' }]
            );
            return;
        };

        if (direction == 'lower') {
            currentHigh.current = currentGuess;
        } else {
            currentLow.current = currentGuess + 1;
        };
        const nextNum = randomNumberGenerator(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNum);
        //setCurrentRounds(curRounds => curRounds + 1)
        setPastGuesses((curPastGuess) => [nextNum.toString(), ...curPastGuess]);
    };



    return (
        <View style={styles.screen}>
            <Text style={Default_styles.titleText}>Computer's Guess</Text>
            <Number_Container>{currentGuess}</Number_Container>
            <Card style={styles.buttonContainer}>
                <MainButton onClick={nextGuessHandler.bind(this, 'lower')}>
                    <Ionicons name='md-remove-circle' size={30} />
                </MainButton>
                <MainButton onClick={nextGuessHandler.bind(this, 'greater')}>
                    <Ionicons name='add-circle' size={30} />
                </MainButton>
            </Card>
            <View style={styles.listContainer}>
                {/* <ScrollView contentContainerStyle={styles.list}>
                {pastGuesses.map((guess, index) => renderListItems(guess, pastGuesses.length - index))}
            </ScrollView> */}
                <FlatList
                data={pastGuesses}
                renderItem={renderListItems.bind(this, pastGuesses.length)}
                keyExtractor={item => item}
                contentContainerStyle={styles.list}
                />
            </View>
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
        width: 600,
        maxWidth: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    listItem: {
                borderColor: 'gray',
        padding: 20,
        marginVertical: 20,
        borderWidth: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    listContainer: {
        flex: 1,
        width: '60%',

    },
    list: {
        // alignItems: 'center',
        justifyContent: 'flex-end',
        flexGrow: 1,
    }
});

export default GameScreen;