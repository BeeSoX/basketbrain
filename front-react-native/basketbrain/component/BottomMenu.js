import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const BottomMenu = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.menu}>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Profil')}>
                <Text style={styles.menuText}>Profil</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Home')}>
                <Text style={styles.menuText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Credit')}>
                <Text style={styles.menuText}>Crédit</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    menu: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#2A9D8F',
        paddingVertical: 10,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    menuItem: {
        flex: 1,
        alignItems: 'center',
    },
    menuText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
});

export default BottomMenu;