//This shows us detailed steps for chosen meal
import React, { useEffect, useCallback } from 'react';
import {
    ScrollView, Image,
    StyleSheet,
    Text,
    View
} from 'react-native';
import Colors from '../constants/Colors';
import HeaderButton from "../components/HeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import DefaultText from "./../components/DefaultText";
import { useSelector, useDispatch } from "react-redux";
import { toggleFavorite } from '../store/actions/meals';





const ListItem = props => {
    return (
        <View style={styles.listItem}>
            <DefaultText>{props.children}</DefaultText>
        </View>
    )
}


const MealsDetailScreen = props => {

    const availableMeals = useSelector(state => state.meals.meals)
    const currentmealIsFavorite = useSelector(state =>
        state.meals.favoriteMeals.some(meal => meal.id === mealId))

    const mealId = props.navigation.getParam('mealId')
    const selectedMeal = availableMeals.find(meal => meal.id === mealId)

    /* Need to use useDispatch here because we not allowed to use function in navigation component */
    const dispatch = useDispatch()
    const toggleFavoriteHandler = useCallback(() => {
        dispatch(toggleFavorite(mealId))
    }, [dispatch, mealId])

    useEffect(() => {
        // props.navigation.setParams({ mealTitle:selectedMeal.title })
        props.navigation.setParams({ toggleFav: toggleFavoriteHandler })
    }, [toggleFavoriteHandler])

    useEffect(() => {
        props.navigation.setParams({ isFav: currentmealIsFavorite })
    }, [currentmealIsFavorite])

    return (
        <ScrollView>
            <View style={styles.container} >
                <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
                <View style={styles.details}>
                    <DefaultText >{selectedMeal.duration} min</DefaultText>
                    <DefaultText >{selectedMeal.complexity.toUpperCase()}</DefaultText>
                    <DefaultText >{selectedMeal.affordability.toUpperCase()}</DefaultText>
                </View>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Ingridients</Text>
                    {selectedMeal.ingredients.map(ingredient =>
                        <ListItem key={ingredient}>{ingredient}</ListItem>
                    )}
                    <Text style={styles.title}>Steps</Text>
                    {selectedMeal.steps.map(steps =>
                        <ListItem key={steps}>{steps}</ListItem>
                    )}
                </View>
            </View>
        </ScrollView>
    );
}

MealsDetailScreen.navigationOptions = (navigationData) => {
    // const mealId = navigationData.navigation.getParam('mealId')
    const mealTitle = navigationData.navigation.getParam('mealTitle')
    const toggleFavorite = navigationData.navigation.getParam('toggleFav')
    const isFavorite = navigationData.navigation.getParam('isFav')
    //const selectedMeal = MEALS.find(meal => meal.id === mealId)
    return {
        headerTitle: mealTitle,
        headerRight: () =>
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title='Favorite'
                    iconName={isFavorite ? "ios-star" : "ios-star-outline"}
                    onPress={toggleFavorite}
                />
            </HeaderButtons>


    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // height: 500,
        backgroundColor: Colors.background,
        // alignItems: "flex-start",
        // justifyContent: "flex-start",
    },

    titleContainer: {
        paddingHorizontal: 10,
    },
    image: {
        width: "100%",
        height: 200,
    },
    details: {
        flexDirection: "row",
        padding: 15,
        justifyContent: "space-around",
        width: "90%"
    },
    title: {
        fontSize: 22,
        fontFamily: "robotomedium",
        textAlign: "center",
    },
    listItem: {
        marginVertical: 10,
        marginHorizontal: 12,
        borderColor: "#ccc",
        borderWidth: 1,
        padding: 10

    },



});

export default MealsDetailScreen