// Screen where we do filtering of meals (items)
import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import Colors from '../constants/Colors';
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { HeaderButton } from "../components/HeaderButton"
import { Switch } from 'react-native-gesture-handler';
import { useDispatch } from "react-redux";
import { setFilters } from '../store/actions/meals';



const FilterSwitch = props => {
    return (
        <View style={styles.filterContainer}>

            <Text style={styles.filterText}>{props.label}</Text>
            <Switch
                trackColor={{ true: Colors.textcolor }}
                thumbColor={Platform.OS === "android" ? Colors.textcolor : ""}
                value={props.state}
                onValueChange={props.onChange}
            />
        </View>
    )
}

const FiltersScreen = props => {
    const { navigation } = props;

    const [isGlutenFree, setIsGlutenFree] = useState(false);
    const [isLactoseFree, setIsLactoseFree] = useState(false);
    const [isVegan, setIsVegan] = useState(false);
    const [isVegetarian, setIsVegetarian] = useState(false);

    const dispatch = useDispatch()

    const saveFilters = useCallback(() => {
        const appliedFilters = {
            glutenFree: isGlutenFree,
            lactoseFree: isLactoseFree,
            vegan: isVegan,
            isVegetarian: isVegetarian
        }
        console.log(appliedFilters);
        dispatch(setFilters(appliedFilters))

    }, [isGlutenFree, isLactoseFree, isVegetarian, isVegan])

    useEffect(() => {
        navigation.setParams({ save: saveFilters })
    }, [saveFilters])

    return (
        <View style={styles.container}>
            <Text style={styles.title}>  Available Filters / Restrictions</Text>
            <FilterSwitch
                label="Gluten-free"
                state={isGlutenFree}
                onChange={newValue => setIsGlutenFree(newValue)}
            />
            <FilterSwitch
                label="Lactose-free"
                state={isLactoseFree}
                onChange={newValue => setIsLactoseFree(newValue)}
            />
            <FilterSwitch
                label="Vegan"
                state={isVegan}
                onChange={newValue => setIsVegan(newValue)}
            />
            <FilterSwitch
                label="Vegetarian"
                state={isVegetarian}
                onChange={newValue => setIsVegetarian(newValue)}
            />
        </View >
    );
}



FiltersScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Filter Meals',
        headerLeft: (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="Menu"
                    iconName="menu-sharp"
                    onPress={() => {
                        navData.navigation.toggleDrawer();
                    }}
                />
            </HeaderButtons>
        ),
        headerRight: (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="Save"
                    iconName="save"
                    onPress={navData.navigation.getParam('save')}
                />
            </HeaderButtons>
        )
    };
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        alignItems: 'center',
    },
    title: {
        fontFamily: "robotobold",
        color: Colors.textcolor,
        fontSize: 25,
        margin: 20,
        textAlign: "center"
    },
    filterContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "80%",
        marginVertical: 15,
    },
    filterText: {
        fontSize: 25,
        color: Colors.textcolor
    }
});

export default FiltersScreen