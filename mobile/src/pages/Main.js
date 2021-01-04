import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';
import api from '../services/api';
import socket, { connect, disconnect } from '../services/socket';

    function Main({ navigation }) {
        const [ devs, setDevs ] = useState([]);
        const [ currentRegion, setCurrentRegion ] = useState(null);
        const [ techs, setTechs ] = useState('');

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

                function setupWebSocket() {
                    connect();
                }

                async function loadDevs() {
                    const { latitude, longitude } = currentRegion;
                    const response = await api.get('/search', { params: { latitude, longitude, techs } });
                        setDevs(response.data.devs);
                            setupWebSocket();
                }

                async function handleRegionChanged(region) {
                    setCurrentRegion(region);
                }

                    if(!currentRegion) { return null; }

                        return (
                            <>
                                <MapView onRegionChangeComplete={ handleRegionChanged } initialRegion={ currentRegion } style={ styles.map }>
                                    { devs.map( dev => (
                                        <Marker key={ dev._id } coordinate={ { longitude: dev.location.coordinates[0], latitude: dev.location.coordinates[1] } } onLoad={ () => this.forceUpdate() }> 
                                            <Image style={ styles.avatar } source={ { uri: dev.avatar_url } }/>
                                            
                                                <Callout onPress={ () => { navigation.navigate('Profile', { github_username: dev.github_username }) } }>
                                                    <View style={ styles.callout }>
                                                        <Text style={ styles.devName }> { dev.name } </Text>
                                                        <Text style={ styles.devBio }> { dev.bio } </Text>
                                                        <Text style={ styles.devTechs }> { dev.techs.join(', ') } </Text>
                                                    </View>
                                                </Callout>
                                        </Marker>
                                    ) ) }
                                </MapView>

                                    <View style={ styles.searchForm }>
                                        <TextInput style={ styles.searchInput } placeholder="Buscar desenvolvedores por tecnologias" placeholderTextColor="#ACACAC" autoCapitalize="words" autoCorrect={ false } value={techs}  onChangeText={setTechs}/>
                                            <TouchableOpacity onPress={ loadDevs } style={ styles.loadButton }>
                                                <MaterialIcons name="my-location" size={ 20 } color="#FFFFFF"/>
                                            </TouchableOpacity>
                                    </View>
                            </>
                        );
    }

        const styles = StyleSheet.create({
            map: { flex: 1 },
            avatar: { width: 60, height: 60, borderRadius: 50, borderWidth: 2, borderColor: '#6931CA' },
            callout: { width: 260 },
            devName: { fontWeight: 'bold', fontSize: 20, color: '#333333' },
            devBio: { color: "#666666", fontSize: 15, marginTop: 5 },
            devTechs: { marginTop: 5, fontSize: 16, color: '#999999' },
            searchForm: { position: 'absolute', left: 20, right: 20, top: 20, zIndex: 5, flexDirection: 'row' },
            searchInput: { flex: 1, height: 50, backgroundColor: '#FFFFFF', color: '#666666', borderRadius: 25, paddingHorizontal: 20, fontSize: 15, shadowColor: '#000000', shadowOpacity: 0.2, shadowOffset: { width: 0, height: 0 }, elevation: 2  },
            loadButton: { width: 50, height: 50, backgroundColor: '#8E4DFF', borderRadius: 25, justifyContent: 'center', alignItems: 'center', marginLeft: 15, shadowColor: '#000000', shadowOpacity: 0.2, shadowOffset: { width: 0, height: 0 }, elevation: 2  }
        })

            export default Main;