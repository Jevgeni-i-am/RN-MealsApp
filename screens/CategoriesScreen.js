// Here we can select food category
import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import Colors from '../constants/Colors';
import { CATEGORIES } from '../data/dummy-data';
import CategoryGridTile from "../components/CategoryGridTile";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { HeaderButton } from "../components/HeaderButton"


const CategoriesScreen = props => {
    const renderGridItem = (itemData) => {
        //  params {key:id} allows to use that data in new screen 
        return (
            <CategoryGridTile
                title={itemData.item.title}
                color={itemData.item.color}
                onSelect={() => {
                    props.navigation.navigate({
                        routeName: 'CategoryMeals',
                        params: {
                            categoryId: itemData.item.id
                        }
                    })
                }}
            />
        )
    }
    // logging here may show us what props are coming into
    // console.log(props)

    //newer versions of RN doesn't need keyExtractor
    return (
        <FlatList
            keyExtractor={(item, index) => item.id}
            data={CATEGORIES}
            renderItem={renderGridItem}
            numColumns={2}
        />

    );
}

CategoriesScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Meals Categories',
        headerLeft: () =>
            <HeaderButtons HeaderButtonComponent={HeaderButton} >
                <Item 
                title="Menu" 
                iconName="grid-sharp" 
                onPress={() => {
                    navData.navigation.toggleDrawer()

                }} />
            </HeaderButtons>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        alignItems: 'center',
        justifyContent: 'center',
    },



});

export default CategoriesScreen