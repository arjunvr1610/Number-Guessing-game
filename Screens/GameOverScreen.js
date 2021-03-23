import React from 'react';
import {View, Text, StyleSheet, Button, Image} from 'react-native';
import Default_styles from '../constants/Default_styles';
import Colors from '../constants/Colors'
import MainButton from '../components/MainButton'

const GameOverScreen = (props) => {
    return(
        <View style={styles.screen}>
            <Text style={Default_styles.titleText}>Game Over!!!</Text>
            <View style = {styles.imageContainer}>
            <Image 
            // source={require('../assets/success.png')} 
            fadeDuration={1000}
            source={{uri: 'https://kryptografen.com/wp-content/uploads/2020/04/Mount-Everest.jpg'}} 
            resizeMode='contain' 
            style={styles.image}
            />
            </View>
            <Text style={Default_styles.bodyText}>
                Your phone took <Text style={styles.highlightText}>{props.totalRounds}</Text> turns to find the number <Text style={styles.highlightText}>{props.chosenNumber}</Text>.
            </Text>
            <View style={{marginVertical: 30}}>
            <MainButton onClick={props.onRestartGame}>RESTART GAME</MainButton>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        backgroundColor: Colors.screenBackgroundColor
    },
    imageContainer: {
        width: 297,
        height: 170,
        borderRadius: 160,
        borderColor: 'black',
        borderWidth: 3,
        overflow: 'hidden',
        marginVertical: 30

    },
    image: {
        width: '100%',
        height: '100%',
    },
    highlightText: {
       color: Colors.accent,
       fontFamily: 'open-sans-bold'
    }
});

export default GameOverScreen;