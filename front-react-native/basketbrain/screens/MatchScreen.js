import {StyleSheet, View} from 'react-native';
import {React} from 'react';


const MatchScreen = ({route}) => {
    const {idTeams} = route.params;
    console.log(idTeams);
    return (
        <View style={styles.container}>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
        padding: 20,
    },
});

export default MatchScreen;
