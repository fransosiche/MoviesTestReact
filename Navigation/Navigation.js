// Navigation/Navigation.js

import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Search from "../Components/Search";
import FilmDetail from "../Components/FilmDetail";


const SearchStackNavigator = createStackNavigator({
    Search: {
        screen: Search,
        navigationOptions: {
            title: "Rechercher"
        }
    },
    FilmDetail: {
        screen: FilmDetail
    }
})

const MoviesTabNavigator = createBottomTabNavigator({
    Search: {
        screen: SearchStackNavigator
    }
})

export default createAppContainer(MoviesTabNavigator)