import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';

const MainButton = (props) => {
    return (
        <TouchableOpacity onPress={props.onClick}>
            <View style={styles.buttonContainer}>
                <Text style={styles.buttonText}>{props.children}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        backgroundColor: Colors.themeColor,
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 30
    },
    buttonText: {
        fontFamily: 'open-sans-bold',
        textAlign: 'center',
        fontSize: 18,
        color: 'white'
    }

});

export default MainButton;