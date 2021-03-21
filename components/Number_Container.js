import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import Colors from '../constants/Colors';

const Number_Container = (props) => {
    return(
        <View style={styles.container}>
            <Text style={styles.number}>{props.children}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 20,
        alignItems: 'center',
        borderColor: Colors.accent,
        borderRadius: 10,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    },
    number: {
        fontSize: 22,
        color: Colors.accent
    }
});

export default Number_Container;