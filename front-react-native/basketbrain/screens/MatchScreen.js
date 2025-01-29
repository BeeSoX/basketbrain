import {StyleSheet, Text, View} from 'react-native';
import {React} from 'react';

const MatchScreen = ({route}) => {
    const {game} = route.params;
    console.log(game);
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{game.home_team.name} VS. {game.visitor_team.name}</Text>
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
        fontSize: 32,
        color: '#E76F51',
        fontWeight: 'bold',
        borderBottomWidth: 3,
        borderBottomColor: '#F4A261',
        paddingBottom: 8,
        textAlign: 'center',
    },
});

export default MatchScreen;
