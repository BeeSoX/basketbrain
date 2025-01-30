import {StyleSheet, Text, View, TouchableOpacity, TextInput, Platform, ScrollView} from 'react-native';
import {React, useState} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';

const RegisterScreen = ({navigation}) => {
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
            const response = await fetch('http://localhost:8000/api/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    firstname: firstname,
                    lastname: lastname,
                    birthdate: date.toISOString().split('T')[0], // format the date correctly
                }),
            });

            const data = await response.json();
            if (response.ok) {
                alert(data.message);
                navigation.navigate('Login');
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error(error);
            alert('Error during registration');
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Sign up</Text>

            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>First name</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter first name"
                    placeholderTextColor="#a19595"
                    value={firstname}
                    onChangeText={onChangeFirstname}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Last name</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter last name"
                    placeholderTextColor="#a19595"
                    value={lastname}
                    onChangeText={onChangeLastname}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Birth date</Text>
                <TouchableOpacity onPress={toggleDatePicker}>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter birth date"
                        placeholderTextColor="#a19595"
                        value={date.toLocaleDateString()}
                        editable={false}
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
                    placeholder="Enter email"
                    placeholderTextColor="#a19595"
                    value={email}
                    onChangeText={onChangeEmail}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Password</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter password"
                    placeholderTextColor="#a19595"
                    secureTextEntry
                    value={password}
                    onChangeText={onChangePassword}
                />
            </View>

            <TouchableOpacity style={styles.loginButton} onPress={registerUser}>
                <Text style={styles.loginButtonText}>Sign up</Text>
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
        marginTop: 20,
    },
    loginButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default RegisterScreen;
