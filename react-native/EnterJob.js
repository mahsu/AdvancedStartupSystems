import React from 'react';
import { View, Text } from 'react-native';


export default function() {
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
}
