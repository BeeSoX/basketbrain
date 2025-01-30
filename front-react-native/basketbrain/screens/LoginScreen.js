import {StyleSheet, Text, View, TouchableOpacity, TextInput} from 'react-native';
import {React, useState} from 'react';

const LoginScreen = ({navigation}) => {
    const [email, onChangeEmail] = useState('');
    const [password, onChangePassword] = useState('');

    const loginUser = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });

            const data = await response.json();
            if (response.ok) {
                alert(data.message);
                console.log(data.user);
                navigation.navigate('Home');
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error(error);
            alert('Login failed');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign in</Text>

            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Email</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Email"
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

            <TouchableOpacity style={styles.loginButton} onPress={loginUser}>
                <Text style={styles.loginButtonText}>Log in</Text>
            </TouchableOpacity>

            <TouchableOpacity>
                <Text style={styles.register} onPress={() => navigation.navigate('Register')}>
                    No account yet? Sign up there
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
        padding: 20,
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
    register: {
        color: '#F4A261',
        textAlign: 'center',
        marginTop: 15,
        fontSize: 14,
    },
});

export default LoginScreen;
