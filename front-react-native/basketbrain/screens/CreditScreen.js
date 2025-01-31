import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import BottomMenu from '../component/BottomMenu';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CreditScreen = ({ navigation }) => {
    const [amount, setAmount] = useState('');
    const [user, setUser] = useState(null);
    const connected = async () => {
        const userData = await AsyncStorage.getItem('userData');
        if (userData) {
            const parsedUser = JSON.parse(userData);
            setUser(parsedUser);
            console.log(parsedUser.firstname);
            console.log("User connecté", parsedUser);
        }
    }
    useEffect(() => {
        connected();
    }, []);

    const addCredit = async () => {
        if (amount !== '') {
            try {
                const response = await fetch('http://192.168.1.41:8000/api/user/add/credit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: user.email,
                        credit: amount,
                    }),
                });
                const data = await response.json();
                console.log(data);
                if (data.user) {
                    await AsyncStorage.setItem('userData', JSON.stringify(data.user));
                    setUser(data.user);
                    console.log(user);
                }
                alert(data.message);
            } catch (error) {
                console.error(error);
                alert('Login failed');
            }
            setAmount('');
        }

    };
    const removeCredit = async () => {
        if (amount !== '') {
            try {
                const response = await fetch('http://192.168.1.41:8000/api/user/remove/credit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: user.email,
                        credit: amount,
                    }),
                });
                const data = await response.json();
                if (data.user) {
                    await AsyncStorage.setItem('userData', JSON.stringify(data.user));
                    setUser(data.user);
                }
                alert(data.message);
            } catch (error) {
                console.error(error);
                alert('Login failed');
            }
            setAmount('');
        }

    };

    return (
        <View style={styles.container}>
            {user ? (
                <Text style={styles.title}>
                    Crédits disponibles: {user.credit}
                </Text>
            ) : (
                <Text style={styles.textSecondaryButton}>
                    Veuillez vous connecter !
                </Text>
            )}
            <TextInput
                style={styles.input}
                placeholder="Entrez un montant"
                keyboardType="numeric"
                value={amount}
                onChangeText={setAmount}
            />
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={addCredit}>
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={removeCredit}>
                    <Text style={styles.buttonText}>-</Text>
                </TouchableOpacity>
            </View>

            <BottomMenu />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    input: {
        width: '80%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '50%',
    },
    button: {
        backgroundColor: '#2A9D8F',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 20,
    },
});

export default CreditScreen;