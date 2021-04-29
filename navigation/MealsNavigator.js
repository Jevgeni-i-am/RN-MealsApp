// Here will be set up gonfiguration for navigation
import React from "react";
import { Platform, Text } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import CategoriesScreen from "./../screens/CategoriesScreen";
import MealsDetailScreen from "./../screens/MealsDetailScreen";
import CategoryMealsScreen from "./../screens/CategoryMealsScreen";
import FavoritesScreen from "./../screens/FavoritesScreen";
import { createDrawerNavigator } from "react-navigation-drawer";
import FiltersScreen from "./../screens/FiltersScreen";


const defaultStackNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === "android" ? Colors.headerBackground : ''
    },

    headerTitleStyle: {
        fontFamily: 'robotobold'
    },
    //  IOS only
    headerBackTitleStyle: {
        fontFamily: "robotomedium"
    },

    headerTintColor: Platform.OS === "android" ? Colors.textcolor : ''
}


//These are the screens will be able to move between ({key:property})
const MealsNavigator = createStackNavigator({
    //First argument
    Categories: {
        screen: CategoriesScreen
    },
    CategoryMeals: {
        screen: CategoryMealsScreen,
    },
    MealsDetail: MealsDetailScreen
}, {
    //Second argument
    defaultNavigationOptions: defaultStackNavOptions
})

//Stack navigator for FAVORITES stack. Will be used in tabScreenConfig
const FavoriteStackNavigator = createStackNavigator({
    Favorites: {
        screen: FavoritesScreen,
    },
    MealDetails: MealsDetailScreen
}, {
    //Second argument
    //defaultNavigationOptions will apply to every screen in createStackNavigator navigator
    defaultNavigationOptions: defaultStackNavOptions
})

//this BOTTOM NAVIGATION config is re-used in MealsFavTabNavigator
const tabScreenConfig = {
    Meals: {
        screen: MealsNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return <Ionicons
                    name="ios-restaurant"
                    size={25}
                    color={tabInfo.tintColor} />
            },
            tabBarColor: Colors.primary,
            // tabBarLabel: Platform.OS = "android" ? (<Text style={{ fontFamily: 'robotobold' }}>Meals</Text>) : ('Meals')
        }
    },
    Favorites: {
        screen: FavoriteStackNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return <Ionicons
                    name="ios-star"
                    size={25}
                    color={tabInfo.tintColor}
                // color={Colors.danger}
                />
            },
            tabBarColor: Colors.accentB,
            //  tabBarLabel: Platform.OS = "android" ? <Text style={{ fontFamily: 'robotobold' }}>Favorites</Text> : 'Favorites'
        }
    }
}


// MealsNavigator is used in MealsFavTabNavigator. 
// That's why MealsFavTabNavigator used in createAppContainer

const MealsFavTabNavigator =
    Platform.OS === 'android'
        ? createMaterialBottomTabNavigator(tabScreenConfig, {
            activeTintColor: 'white',
            shifting: true,
            barStyle: {
                backgroundColor: Colors.primaryColor
            }
        })
        : createBottomTabNavigator(tabScreenConfig, {
            tabBarOptions: {
                labelStyle: {
                    fontFamily: "RobotoMediumItalic"
                },
                activeTintColor: Colors.danger
            }
        });


const FiltersNavigator = createStackNavigator({
    Filters: FiltersScreen
}, {
    //Second argument
    //defaultNavigationOptions will apply to every screen in createStackNavigator navigator
    // new name in drawer::: navigationOptions:{ drawerLabel:'Filters!!!'},
    defaultNavigationOptions: defaultStackNavOptions
})



// DRAWER NAVIGATOR IS OUR MAIN NAVIGATOR.
const MainNavigator = createDrawerNavigator({
    MealsFav: {
        screen: MealsFavTabNavigator,
        navigationOptions: {
            drawerLabel: "Meals"
        }
    },
    Filters: FiltersNavigator,

}, {

    contentOptions: {
        activeTintColor: Colors.textcolor,
        activeBackgroundColor: Colors.accentB,
        labelStyle: {
            fontFamily: "robotobold",
            fontSize: 18,

        }
    }
})

//need to wrap most important navigator with that and use return react component 
export default createAppContainer(MainNavigator)


