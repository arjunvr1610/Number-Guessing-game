import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import Colors from '../constants/Colors';
import Default_styles from '../constants/Default_styles'


const Header = (props) => {
    return(
        <View style ={styles.headerBar}>
            <Text style = {Default_styles.titleText}>{props.title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    headerBar: {
        paddingTop: 20,
        backgroundColor: Colors.themeColor,
        width: '100%',
        height: 90,
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerTitle: {
        color: 'black',
        fontSize: 18
    }
});

export default Header;