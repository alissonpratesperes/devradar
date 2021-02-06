import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';
import api from '../services/api';
import { subscribeToNewDevs, connect, disconnect } from '../services/socket';

    function Main({ navigation }) {
        const [ devs, setDevs ] = useState([]);
        const [ currentRegion, setCurrentRegion ] = useState(null);
        const [techs, setTechs] = useState('');

                useEffect(() => {
                    async function loadInitialPosition() {
                        const { granted } = await requestPermissionsAsync();
                            if(granted) { 
                                const { coords } = await getCurrentPositionAsync({ enableHighAccuracy: true }); 
                                const { latitude, longitude } = coords;

                                    setCurrentRegion({ latitude, longitude, latitudeDelta: 0.04, longitudeDelta: 0.04 });
                            }
                    }
                        loadInitialPosition();
                }, []);

                useEffect(() => {
                    subscribeToNewDevs(dev => setDevs([ ...devs, dev ]));
                }, [devs]);

                    function setupWebsocket(){
                        disconnect();
                            const { latitude, longitude } = currentRegion;
                                connect(latitude, longitude, techs);
                    }

                        async function loadDevs() {
                            const { latitude, longitude } = currentRegion;
                            const response = await api.get('/search', { params: { latitude, longitude, techs } });
                                setDevs(response.data.devs);
                                    setupWebsocket();
                        }

                        function handleRegionChanged(region) {
                            setCurrentRegion(region);
                        }

                            if(!currentRegion) { return null; }

            return (
                <>
                    <MapView onRegionChangeComplete={handleRegionChanged} initialRegion={currentRegion} style={styles.map}>
                        {devs.map(dev => (
                            <Marker key={dev._id} coordinate={{ longitude: dev.location.coordinates[0], latitude: dev.location.coordinates[1] }}>
                                <Image style={styles.avatar} source={{ uri: dev.avatar_url }}/>
                                    <Callout onPress={() => { navigation.navigate('Profile', { github_username: dev.github_username }); }}>
                                        <View style={styles.callout}>
                                            <Text style={styles.devName}> {dev.name} </Text>
                                            <Text style={styles.devBio}> {dev.bio} </Text>
                                            <Text style={styles.devTechs}> {dev.techs.join(', ')} </Text>
                                        </View>
                                    </Callout>
                            </Marker>
                        ))}
                    </MapView>
                        <View style={styles.searchForm}>
                            <TextInput style={styles.searchInput} placeholder="Buscar devs por techs..." placeholderTextColor="#999999" autocapitalize="words" autoCorrect={false} value={techs} onChangeText={setTechs}/>
                            <TouchableOpacity onPress={loadDevs} style={styles.loadButton}>
                                <MaterialIcons name="my-location" size={30} color="#FFFFFF"/>
                            </TouchableOpacity>
                        </View>
                </>
            );
    }

        const styles = StyleSheet.create({
            map: {
                flex: 1
            },
            avatar: {
                width: 60,
                height: 60,
                borderRadius: 50,
                borderWidth: 2,
                borderColor: '#000000'
            },
            callout: {
                width: 260
            },
            devName: {
                fontWeight: 'bold',
                fontSize: 17,
                color: '#333333'
            },
            devBio: {
                fontSize: 15,
                color: '#666666',
                marginTop: 7
            },
            devTechs: {
                fontSize: 15,
                color: '#999999',
                marginTop: 5
            },
            searchForm: {
                position: 'absolute',
                left: 20,
                right: 20,
                top: 20,
                zIndex: 5,
                flexDirection: 'row',
                borderRadius: 50,
                shadowColor: '#000000',
                shadowOpacity: 0.15,
                shadowOffset: {
                    width: 2,
                    height: 2
                },
                elevation: 2
            },
            searchInput: {
                flex: 1,
                height: 50,
                backgroundColor: '#FFFFFF',
                color: '#333333',
                borderTopLeftRadius: 10,
                borderBottomLeftRadius: 10,
                paddingHorizontal: 20,
                fontSize: 14
            },
            loadButton: {
                width: 50,
                height: 50,
                backgroundColor: '#8E4DFF',
                borderTopRightRadius: 10,
                borderBottomRightRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
            }
        });

            export default Main;