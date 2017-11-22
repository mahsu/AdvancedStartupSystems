import React from 'react';
import { View, StyleSheet,Text } from 'react-native';
import MyMap from './MyMap';
import MovingScreen  from './Move';
import HaulingScreen from './Haul';
import { TabNavigator } from 'react-navigation';




const EnterJob = TabNavigator({
    Moving: {screen: MovingScreen,},
    Hauling: {screen: HaulingScreen,},
}, {
    tabBarPosition: 'bottom',
    animationEnabled: true,
    tabBarOptions: {
        activeTintColor: '#ff8d8d',
        style: {
            backgroundColor: '#e5ecea',
        },
        inactiveTintColor: '#222',
    },

});

export default EnterJob;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: '#222'
    },

});