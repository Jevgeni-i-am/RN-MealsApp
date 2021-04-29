//BASE TEMPLATE FOR DIFFERENT PAGES
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import Colors from '../constants/Colors';

const DefaultText = props => {
    return <Text style={styles.text}>{props.children}</Text>
}

const styles = StyleSheet.create({
    text: {
        // flex: 1,
        // backgroundColor: Colors.background,
        // alignItems: 'center',
        // justifyContent: 'center',
        color: Colors.textcolor,
        fontSize: 15,
        fontFamily: "robotomedium"

    },

});

export default DefaultText





