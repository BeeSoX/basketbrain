import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = ({ navigation }) => {
    const [user, setUser] = useState(null);

     useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await AsyncStorage.getItem('userData');
                if (userData) {
                    setUser(JSON.parse(userData));
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des données utilisateur:", error);
            }
        };

        fetchUserData();
    }, []);

     const logout = async () => {
        try {
            await AsyncStorage.removeItem('userData');
            Alert.alert("Déconnexion", "Vous avez été déconnecté.");
            navigation.navigate('Login');
        } catch (error) {
            console.error("Erreur lors de la déconnexion:", error);
        }
    };

    if (!user) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Pas de données disponible , veuillez vous connecter...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Mon Profil</Text>

            <View style={styles.profileBox}>
                <Text style={styles.label}>Prénom :</Text>
                <Text style={styles.value}>{user.firstname}</Text>

                <Text style={styles.label}>Nom :</Text>
                <Text style={styles.value}>{user.lastname}</Text>

                <Text style={styles.label}>Email :</Text>
                <Text style={styles.value}>{user.email}</Text>

                <Text style={styles.label}>Credit :</Text>
                <Text style={styles.value}>{user.credit}</Text>

            </View>



            <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={logout}>
                <Text style={styles.buttonText}>Se déconnecter</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#264653',
        marginBottom: 20,
    },
    profileBox: {
        width: '100%',
        backgroundColor: '#FFFFFF',
        padding: 20,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2A9D8F',
        marginTop: 10,
    },
    value: {
        fontSize: 18,
        color: '#264653',
        marginBottom: 5,
    },
    button: {
        backgroundColor: '#2A9D8F',
        padding: 15,
        borderRadius: 8,
        width: '100%',
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    logoutButton: {
        backgroundColor: '#E63946',
    },
});

export default ProfileScreen;
