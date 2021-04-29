//This is the screen that loads the meals for chosen category
import React from 'react';
import { useSelector } from 'react-redux';

import MealList from '../components/MealList';
import { CATEGORIES } from '../data/dummy-data';
import { View, StyleSheet } from "react-native";
import DefaultText from '../components/DefaultText';
import Colors from '../constants/Colors';


const CategoryMealsScreen = props => {

    // .getParam() a method provided to extract parameters we recive 
    //( params:{} from NavLinks-NavToCategoryMealsScreen )
    const catId = props.navigation.getParam('categoryId')

    /* In App.js KEY from rootReducer. Meals that respect the filters set up by the user */
    const availableMeals = useSelector(state => state.meals.filteredMeals)


    // const selectedCategory = CATEGORIES.find(cat => cat.id === catId)
    const displayedMeals = availableMeals.filter(
        meal => meal.categoryIds.indexOf(catId) >= 0
    )

    if (displayedMeals.length === 0) {
        return (
            <View style={styles.content}>
                <DefaultText> No meals found. Maybe check your filters?</DefaultText>
            </View>
        )
    } else {

        return (
            <MealList
                listData={displayedMeals}
                navigation={props.navigation}
            />
        );
    }
}


//Dynamicly derive name of categorie in header
CategoryMealsScreen.navigationOptions = navigationData => {
    //   console.log(navigationData);
    const catId = navigationData.navigation.getParam('categoryId');
    const selectedCategory = CATEGORIES.find(cat => cat.id === catId);

    return {
        headerTitle: selectedCategory.title,

    }
}


export default CategoryMealsScreen

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.backgroundColor,
    }
})