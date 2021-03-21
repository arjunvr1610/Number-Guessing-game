import React, {useState} from 'react';
import {View, Text, StyleSheet, Button, TouchableWithoutFeedback, Keyboard, Alert} from 'react-native';

import Card from '../components/Card';
import Colors from '../constants/Colors';
import Input from '../components/Input';
import Number_Container from '../components/Number_Container';
import Default_styles from '../constants/Default_styles'

const GameStartingScreen = (props) => {
    const [userInput, setUserInput] = useState('');
    const [confirmInput, setConfirmInput] = useState(false);
    const [selectedNumber, setselectedNumber] = useState();

    
    const numberInputHandler = (textInput) => {
        setUserInput(textInput.replace(/[^0-9]/g, ''));
    };

    const resetInputHandler = () => {
        setUserInput('');
        setConfirmInput(false);
    };


    const confirmInputHandler = () => {
        const chosenNumber = parseInt(userInput);
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert(
                'Invalid Number', 
                'Number should be between 1 to 99', 
                [ { text:'Okay', style:'destructive', onPress:resetInputHandler } ]
            );
            return;
        };

        setConfirmInput(true);
        setselectedNumber(parseInt(userInput));
        setUserInput('');
    };

    let confirmedOutput;
    
    if (confirmInput) {
        confirmedOutput = (
            <Card style={styles.confirmContainer}>
                <Text>You Selected</Text>
                <Number_Container>{selectedNumber}</Number_Container>
                <Button title='START GAME' onPress={() => props.onStartGame(selectedNumber)}/>                
            </Card> 
        ); 
    };

    return(
        <TouchableWithoutFeedback 
            onPress={() => {
                Keyboard.dismiss();
            }}
        >
            <View style={styles.screen}>
                <Text style={Default_styles.titleText}>New Game</Text>
                <Card style={styles.inputContainer}>
                    <Text style={Default_styles.bodyText}>Enter a number</Text>
                    <Input 
                        style={styles.input} 
                        blurOnSubmit={true} 
                        keyboardType={'number-pad'} 
                        maxLength={2}
                        onChangeText={numberInputHandler}
                        value={userInput}
                    />
                    <View style={styles.buttonContainer}>
                        <View style={styles.button}>
                            <Button 
                                title={'Reset'} 
                                color={Colors.accent} 
                                onPress={resetInputHandler}
                            />
                        </View>
                        <View style={styles.button}>
                            <Button 
                                title={'Confirm'} 
                                color={Colors.themeColor}
                                onPress={confirmInputHandler}
                            />
                        </View>
                    </View>
                </Card>
                {confirmedOutput}
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        backgroundColor: Colors.screenBackgroundColor
    },
    
    inputContainer: {
        alignItems: 'center',
        width: 300,
        maxWidth: '80%',
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 15,
        paddingHorizontal: 15

    },
    button: {
        width: 90,
    },
    input: {
       width:50 
    },
    confirmContainer: {
        marginTop: 60,
        alignItems: 'center',
        padding:20,
        width: 300,
        maxWidth: '80%'
    }
});

export default GameStartingScreen;