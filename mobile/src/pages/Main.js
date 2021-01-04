import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, Text } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';

    function Main({ navigation }) {
        const [ currentRegion, setCurrentRegion ] = useState(null);

            useEffect( () => {
                async function loadInitialPosition() {
                    const { granted } = await requestPermissionsAsync();

                        if(granted) {
                            const { coords } = await getCurrentPositionAsync({ enableHighAccuracy: true });
                            const { latitude, longitude } = coords;

                                setCurrentRegion ({ latitude, longitude, latitudeDelta: 0.04, longitudeDelta: 0.04 })
                        }
                }

                    loadInitialPosition();
            }, []);

                if(!currentRegion) {
                    return null;
                }

                    return (
                        <MapView initialRegion={ currentRegion } style={ styles.map }>
                            <Marker coordinate={{ latitude: -28.968055, longitude: -51.0509302 }} onLoad={ () => this.forceUpdate() } > 
                                <Image style={ styles.avatar } source={ { uri: 'https://avatars1.githubusercontent.com/u/52282116?s=460&u=4b1ca632b207c0133a3546fc41f5572f856b1065&v=4' } } />
                                    <Callout onPress={ () => { navigation.navigate('Profile', { github_username: 'alissonpratesperes' }) } }>
                                        <View style={ styles.callout }>
                                            <Text style={ styles.devName }> Alisson Prates Peres </Text>
                                            <Text style={ styles.devBio }> code the world </Text>
                                            <Text style={ styles.devTechs }> NodeJS, ReactJS, React Native </Text>
                                        </View>
                                    </Callout>
                            </Marker>
                        </MapView>
                    );
    }

        const styles = StyleSheet.create({
            map: { flex: 1 },
            avatar: { width: 60, height: 60, borderRadius: 50, borderWidth: 2, borderColor: '#6931CA' },
            callout: { width: 260 },
            devName: { fontWeight: 'bold', fontSize: 20, color: '#333333' },
            devBio: { color: "#666666", fontSize: 15, marginTop: 5 },
            devTechs: { marginTop: 5, fontSize: 16, color: '#999999' }
        })

            export default Main;