import { CATEGORIES } from "../data/dummy-data";



//Logic of navigation links
export const GoBack = props => {
    props.navigation.goBack()
    console.log('pressed GO BACK');
}
// export const NavToCategoryMealsScreen = props => {

//        console.log(props)
//        params {key:id} allows to use that data in new screen 

//     props.navigation.navigate({
//         routeName: 'CategoryMeals',
//         params: {
//             categoryId: itemData.item.id
//         }
//     })
//     console.log('pressed NAV TO CATEGORY MEALS');
// }


export const NavToCategories = props => {
    props.navigation.navigate({ routeName: 'Categories' })
    console.log('pressed GO TO CATEGORIES');
}
export const PopToTop = props => {
    props.navigation.popToTop()
    console.log('pressed Pop to top');
}
export const NavLinkToMealsDetailScreen = props => {
    props.navigation.navigate({ routeName: 'MealsDetail' })
    console.log('pressed GO TO Meals Detail Screen');
}

//NavToCategoryMealsScreen

export default {
    GoBack,

    NavToCategories,
    PopToTop,
    NavLinkToMealsDetailScreen
}
