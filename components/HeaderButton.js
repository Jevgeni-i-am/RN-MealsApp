//Righd header button
import React from 'react';
import { HeaderButton } from 'react-navigation-header-buttons'
import { Ionicons } from '@expo/vector-icons'
import { Platform, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';

const CustomHeaderButton = props => {
    //Forvard all the  {...props} . Othervise it will not working correctly
    return (
        <HeaderButton
            {...props} 
            IconComponent={Ionicons}
            iconSize={23}
            color={Platform.OS === "android" ? Colors.textcolor : Colors.primary}
        />
    );
}


export default CustomHeaderButton





