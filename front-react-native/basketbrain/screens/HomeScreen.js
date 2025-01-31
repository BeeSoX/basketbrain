import {StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';
import {React, useEffect, useState} from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import BottomMenu from "../component/BottomMenu";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import AsyncStorage from '@react-native-async-storage/async-storage';


const HomeScreen = ({navigation}) => {
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

    const stackLogin = () => {
        navigation.navigate('Login', {});
    };
    const [data, setData] = useState([]);
    const getMatches = async () => {
        try {
            const currentDate = new Date();
            const day = String(currentDate.getDate()).padStart(2, '0');
            const month = String(currentDate.getMonth() + 1).padStart(2, '0');
            const year = currentDate.getFullYear();
            const fullDate = `${year}-${month}-${day}`;
            const response = await fetch(`https://api.balldontlie.io/nba/v1/games?start_date=${fullDate}`, {
                headers: {
                    'Authorization': '272bb744-076e-4d8e-b7d9-886b4f577124',
                }
            });
            const json = await response.json();
            setData(json.data);
        } catch (e) {
            console.error(e);
        }
    }
    useEffect(() => {
        getMatches()
    }, []);
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.credit}><FontAwesome6 name="coins" size={15} color="black" />{user && (<Text>{user.credit}</Text>)}</TouchableOpacity>
                <Text style={[styles.title, styles.text]}>BasketBrain</Text>
                <TouchableOpacity style={styles.primaryButton} onPress={stackLogin}><FontAwesome name="user" size={24} color="white" /></TouchableOpacity>
            </View>
            <View style={styles.body}>
                <Text style={styles.bodyTitle}>Upcoming matches</Text>
                {user && (
                    <Text style={styles.textSecondaryButton}>
                        Bonjour {user.firstname} {user.lastname} 👋
                    </Text>
                )}
                <FlatList data={data} scrollEnabled={true}
                          renderItem={({item}) =>
                              <View style={styles.bodyMatch}>
                                  <Text style={styles.matchDate}>{item.date}</Text>
                                  <View style={styles.matchContent}>
                                      <Text style={styles.matchText}>
                                          {item.home_team.name} VS. {item.visitor_team.name}
                                      </Text>
                                      <TouchableOpacity
                                          style={styles.secondaryButton}
                                          onPress={() => navigation.navigate('Match', {
                                              game: {
                                                  id: item.id, // id du match
                                                  home_team: item.home_team, // objet equipe domicile
                                                  visitor_team: item.visitor_team,
                                                  home_team_score: 0,
                                                  visitor_team_score: 0,
                                              } // objet equipe visiteur
                                          })}
                                      >
                                          <Text style={styles.textSecondaryButton}>Bet</Text>
                                      </TouchableOpacity>
                                  </View>
                              </View>}
                          keyExtractor={(item) => item.id}
                          contentContainerStyle={{ paddingBottom: 100 }}
                          showsVerticalScrollIndicator={false}/>
            </View>
            <BottomMenu />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
        padding: 20,
        paddingTop: 50,
    },
    text: {
        color: '#264653',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        position: 'relative',
    },
    primaryButton: {
        backgroundColor: '#2A9D8F',
        padding: 15,
        borderRadius: 30,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    textPrimaryButton: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        borderBottomWidth: 3,
        borderBottomColor: '#2A9D8F',
        paddingBottom: 8,
    },
    body: {
        alignItems: 'center',
    },
    bodyTitle: {
        fontSize: 24,
        fontWeight: '400',
        color: '#2A9D8F',
    },
    bodyMatch: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 20,
        marginVertical: 10,
        borderLeftWidth: 4,
        borderLeftColor: '#2A9D8F',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        marginBottom: '30',
    },
    secondaryButton: {
        backgroundColor: '#F4A261',
        padding: 15,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#F4A261',
        alignItems: 'center',
    },
    textSecondaryButton: {
        color: '#264653',
        fontSize: 16,
        fontWeight: '600',
    },
    matchDate: {
        fontWeight: '100',
        color: '#264653',
    },
    matchContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 10,
    },
    credit: {
        flexDirection: 'row',
        gap: 10,
        backgroundColor: '#F4A261',
        padding: 15,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#F4A261',
        alignItems: 'center',
    }
});

export default HomeScreen;