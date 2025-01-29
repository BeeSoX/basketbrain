import {StyleSheet, Text, View, TouchableOpacity, TextInput} from 'react-native';
import {React, useState} from 'react';

const LoginScreen = ({navigation}) => {
    const stackRegister = () => {
        navigation.navigate('Register', {});
    };
    const [email, onChangeEmail] = useState('');
    const [password, onChangePassword] = useState('');
    console.log(email, password);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign in</Text>

            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Email</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Email"
                    placeholderTextColor="#a19595"
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Mot de passe</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter password"
                    placeholderTextColor="#a19595"
                    secureTextEntry
                />
            </View>

            <TouchableOpacity style={styles.loginButton}>
                <Text style={styles.loginButtonText}>Log in</Text>
            </TouchableOpacity>

            <TouchableOpacity>
                <Text style={styles.register} onPress={stackRegister}>
                    No account yet ? Sign up there
                </Text>
            </TouchableOpacity>
        </View>
    );
}


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
    inputFocused: {
        borderColor: '#E9C46A',
        borderWidth: 2,
    },
    loginButton: {
        backgroundColor: '#2A9D8F',
        padding: 15,
        borderRadius: 8,
        marginTop: 20,
        // Shadow
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


    register: {
        color: '#F4A261',
        textAlign: 'center',
        marginTop: 15,
        fontSize: 14,
    }
});

export default LoginScreen;