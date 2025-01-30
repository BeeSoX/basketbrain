
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import BottomMenu from '../component/BottomMenu';

const CreditScreen = ({ navigation }) => {
    const [credit, setCredit] = useState(0);
    const [amount, setAmount] = useState('');

    const addCredit = () => {
        const newCredit = credit + parseInt(amount, 10);
        setCredit(newCredit);
        setAmount('');
    };

    const removeCredit = () => {
        const newCredit = credit - parseInt(amount, 10);
        setCredit(newCredit >= 0 ? newCredit : 0);
        setAmount('');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Crédits disponibles: {credit}</Text>
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