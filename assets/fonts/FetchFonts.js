import * as Font from 'expo-font'

export const fetchFonts = () => {


    return Font.loadAsync({
        'robotobold': require('./Roboto-Bold.ttf'),
        'robotomedium': require('./Roboto-Medium.ttf'),
        'RobotoMediumItalic': require('./RobotoMediumItalic.ttf'),
        'robotothinitalic': require('./Roboto-ThinItalic.ttf'),
    })
}