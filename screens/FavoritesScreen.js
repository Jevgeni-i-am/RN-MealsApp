//Screen shows only favorited meals
import React from 'react';
import MealList from '../components/MealList';
import { MEALS } from '../data/dummy-data';
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { HeaderButton } from "../components/HeaderButton"
import { useSelector } from "react-redux";
import { View, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';
import DefaultText from '../components/DefaultText';


const FavoritesScreen = props => {

    /* In App.js KEY from rootReducer */
    const favMeals = useSelector(state => state.meals.favoriteMeals)
    /* 
    Dummy filtering for develope mode
    const favMeals = MEALS.filter(meal => meal.id === 'm1' || meal.id === 'm2') 
    */

    if (favMeals.length === 0 || !favMeals) {
        return (
            <View style={styles.empty}>
                <DefaultText>No Favorite meals found. Start adding some!</DefaultText>
            </View>
        )
    }
    return (
        <MealList listData={favMeals}
            navigation={props.navigation} />
    )
}

FavoritesScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Your Favorites',
        headerLeft: () =>
            <HeaderButtons HeaderButtonComponent={HeaderButton} >
                <Item title="Menu" iconName="grid-sharp" onPress={() => {
                    navData.navigation.toggleDrawer()

                }} />
            </HeaderButtons>
    }
}


export default FavoritesScreen

const styles = StyleSheet.create({
    empty: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:Colors.backgroundColor
    },
    emptyText: {

    }
})