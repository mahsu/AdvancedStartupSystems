import React from 'react';
import {StyleSheet, View} from 'react-native';

import MapView from 'react-native-maps';
import {setLoc} from "./redux/actions";
import {connect} from "react-redux";

const styles = StyleSheet.create({
    // This tells the wrapping element to stretch to fill the width
    // of the parent element.  I choose a background color for debugging
    wrapper: {
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: '#222'
    },

    // This style tells the map element to fill the entire space of its parent
    map: {
        ...StyleSheet.absoluteFillObject
    },
});

const mapStateToProps = function (state) {
    return {
        currentLoc: state.loc,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setCoordinates: (lon, lat) => {
            dispatch(setLoc([lon, lat]))
        }
    }
};

class MyMap extends React.Component {

    componentDidMount() {
        // TODO: Get this from the Device GPS
        let [lon, lat] = [-73.956097, 40.755644];
        this.props.setCoordinates(lon, lat);
    }

    render() {
        let [lon, lat] = this.props.currentLoc;
        return (
            <View style={styles.wrapper}>
                {lat && lon &&
                <MapView
                    style={styles.map}
                    customMapStyle={require('../gmap_style.json')}
                    region={{
                        latitude: lat,
                        longitude: lon,
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.0121,
                    }}
                >
                    <MapView.Circle center={{latitude: lat, longitude: lon}} radius={100} strokeWidth={10}
                                    strokeColor={'rgba(200, 200, 255, .4)'}/>
                </MapView>
                }
            </View>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyMap);