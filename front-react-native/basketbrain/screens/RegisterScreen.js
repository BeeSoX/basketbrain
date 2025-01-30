import { StyleSheet, Text, View, TouchableOpacity, TextInput, Platform, ScrollView } from 'react-native';
import { React, useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';

const RegisterScreen = ({ navigation }) => {
    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const [email, onChangeEmail] = useState('');
    const [password, onChangePassword] = useState('');
    const [firstname, onChangeFirstname] = useState('');
    const [lastname, onChangeLastname] = useState('');

    const toggleDatePicker = () => {
        setShowPicker(!showPicker);
    };

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowPicker(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const registerUser = async () => {
        try {
            const response = await fetch('http://192.168.1.15:8000/api/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    firstname: firstname,
                    lastname: lastname,
                    birthdate: date.toISOString().split('T')[0],
                }),
            });

            const data = await response.json();
            if (response.ok) {
                alert(data.message);
                navigation.navigate('Connexion');
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.log(error);
            alert('Erreur lors de la connexion');
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Sign up</Text>

            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Prénom</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Prénom"
                    placeholderTextColor="#a19595"
                    value={firstname}
                    onChangeText={onChangeFirstname}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Nom</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nom"
                    placeholderTextColor="#a19595"
                    value={lastname}
                    onChangeText={onChangeLastname}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Date de Naissance</Text>
                <TouchableOpacity onPress={toggleDatePicker}>
                    <TextInput
                        style={styles.input}
                        placeholder="Date de Naissance"
                        placeholderTextColor="#a19595"
                        value={date.toLocaleDateString()}
                        editable={true}
                    />
                </TouchableOpacity>

                {showPicker && (
                    <DateTimePicker
                        value={date}
                        mode="date"
                        display="default"
                        onChange={onChange}
                        maximumDate={new Date()}
                        minimumDate={new Date(1900, 0, 1)}
                        style={{ backgroundColor: '#2A9D8F' }}
                    />
                )}
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Email</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#a19595"
                    value={email}
                    onChangeText={onChangeEmail}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Mot de passe</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Mot de passe"
                    placeholderTextColor="#a19595"
                    secureTextEntry
                    value={password}
                    onChangeText={onChangePassword}
                />
            </View>

            <TouchableOpacity style={styles.loginButton} onPress={registerUser}>
                <Text style={styles.loginButtonText}>S'inscrire</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
        padding: 20,
        paddingBottom: 100,
    },
    title: {
        color: '#264653',
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
    },
    inputContainer: {
        marginBottom: 20,
    },
    inputLabel: {
        color: '#264653',
        fontSize: 16,
        marginBottom: 8,
        fontWeight: '500',
    },
    input: {
        backgroundColor: '#F5F5F5',
        borderWidth: 1,
        borderColor: '#2A9D8F',
        borderRadius: 8,
        padding: 15,
        fontSize: 16,
        color: '#264653',
    },
    loginButton: {
        backgroundColor: '#2A9D8F',
        padding: 15,
        borderRadius: 8,
        marginBottom: 50,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    loginButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default RegisterScreen;
