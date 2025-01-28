import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';
import {React, useEffect, useState} from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';


const LoginScreen = ({navigation}) => {

    return (
        // exemple navigation avec btn <TouchableOpacity style={{ marginRight: 10}} onPress={() => {
        //                         navigation.navigate('Home', {});
        //                     }}><FontAwesome name='sign-out' size={24} color='white'/></TouchableOpacity>
        <View style={styles.container}>
            <Text>TEST</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
        padding: 20,
        paddingTop: 50,
    },
    text: {
        color: '#264653',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        position: 'relative',
    },
    primaryButton: {
        position: 'absolute',
        right: 0,
        backgroundColor: '#2A9D8F', // Turquoise
        padding: 15,
        borderRadius: 30,
        elevation: 3,    // Android shadow
        shadowColor: '#000', // iOS shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    textPrimaryButton: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        borderBottomWidth: 3,
        borderBottomColor: '#2A9D8F',
        paddingBottom: 8,
    },
    body: {
        alignItems: 'center',
    },
    bodyTitle: {
        fontSize: 24,
        fontWeight: '400',
        color: '#2A9D8F',
    },
    bodyMatch: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 20,
        marginVertical: 10,
        borderLeftWidth: 4,
        borderLeftColor: '#2A9D8F',
        // Shadow
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        marginBottom: '30',
    },
    secondaryButton: {
        backgroundColor: '#F4A261',
        padding: 15,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#F4A261',
        alignItems: 'center',
    },
    textSecondaryButton: {
        color: '#264653',
        fontSize: 16,
        fontWeight: '600',
    },
    matchDate: {
        fontWeight: '100',
        color: '#264653',
    },
    matchContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 10,
    }
});

export default LoginScreen;