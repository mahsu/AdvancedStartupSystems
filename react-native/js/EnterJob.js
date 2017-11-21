import React from 'react';
import { View, StyleSheet,Text } from 'react-native';
import MyMap from './MyMap';

export default class EnterJob extends React.Component {


        render() {
            var {navigate} = this.props.navigation;
            return (
            <View style={styles.container}>
                <View style={styles.map}>
                    <MyMap/>
                </View>
                <View style={{flex: 3}}>
                    <Text>Other Components to go here</Text>
                </View>
            </View>
            );
        };
}
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