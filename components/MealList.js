//BASE TEMPLATE FOR DIFFERENT PAGES
import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import Colors from '../constants/Colors';
import MealItem from "./MealItem";
import { useSelector } from "react-redux";


const MealList = props => {

    const favoriteMeals = useSelector(state => state.meals.favoriteMeals)

    const renderMealItem = itemData => {
        const isFavorite = favoriteMeals.some(meal => meal.id === itemData.item.id)
        return (
            <MealItem
                title={itemData.item.title}
                image={itemData.item.imageUrl}
                duration={itemData.item.duration}
                complexity={itemData.item.complexity}
                affordability={itemData.item.affordability}
                onSelectMeal={() => {
                    props.navigation.navigate({
                        routeName: 'MealsDetail',
                        params: {
                            mealId: itemData.item.id,
                            mealTitle: itemData.item.title,
                            isFav: isFavorite
                        }
                    })
                }}
            />
        )
    }


    return (
        <View style={styles.list}>
            <FlatList
                data={props.listData}
                keyExtractor={(item, index) => item.id}
                renderItem={renderMealItem}
                style={{ width: '100%' }}
            />

        </View>

    );
}

const styles = StyleSheet.create({
    list: {
        flex: 1,
        backgroundColor: Colors.background,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15
    },
    text: {
        color: Colors.textcolor,
        fontSize: 30
    }
});

export default MealList





