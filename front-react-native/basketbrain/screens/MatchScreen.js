import {ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {React, useEffect, useState} from 'react';
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

const MatchScreen = ({route}) => {
    let win;
    const [amount, setAmount] = useState(0);
    const {game} = route.params;
    const [data, setData] = useState([]);
    const [homeTeamWins, setHomeTeamWins] = useState(0);
    const [visitorTeamWins, setVisitorTeamWins] = useState(0);
    const [homeTeamLooses, setHomeTeamLooses] = useState(0);
    const [visitorTeamLooses, setVisitorTeamLooses] = useState(0);
    const [homeTeamScore, setHomeTeamScore] = useState(0);
    const [visitorTeamScore, setVisitorTeamScore] = useState(0);
    const [amountHomeTeam, onChangeAmountHomeTeam] = useState(0);
    const [amountVisitorTeam, onChangeAmountVisitorTeam] = useState(0);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const stats = async () => {
        try {
            const currentDate = new Date();
            currentDate.setDate(currentDate.getDate() -1)
            const dateOneWeekAgo = new Date();
            dateOneWeekAgo.setDate(currentDate.getDate() - 14);
            // one week ago date formated
            const dayAgo = String(dateOneWeekAgo.getDate()).padStart(2, '0');
            const monthAgo = String(dateOneWeekAgo.getMonth() + 1).padStart(2, '0');
            const yearAgo = dateOneWeekAgo.getFullYear();
            const fullDateOneWeekAgo = `${yearAgo}-${monthAgo}-${dayAgo}`;
            // current date formated
            const day = String(currentDate.getDate()).padStart(2, '0');
            const month = String(currentDate.getMonth() + 1).padStart(2, '0');
            const year = currentDate.getFullYear();
            const fullDateCurrent = `${year}-${month}-${day}`;
            const responseHomeTeam = await fetch(`https://api.balldontlie.io/nba/v1/games?team_ids[]=${game.home_team.id}&per_page=10&end_date=${fullDateCurrent}&start_date=${fullDateOneWeekAgo}`, {
                headers: {
                    'Authorization': '272bb744-076e-4d8e-b7d9-886b4f577124',
                }
            });
            const responseVisitorTeam = await fetch(`https://api.balldontlie.io/nba/v1/games?team_ids[]=${game.home_team.id}&per_page=10&end_date=${fullDateCurrent}&start_date=${fullDateOneWeekAgo}`, {
                headers: {
                    'Authorization': '272bb744-076e-4d8e-b7d9-886b4f577124',
                }
            });
            const jsonHomeTeam = await responseHomeTeam.json();
            const jsonVisitorTeam = await responseVisitorTeam.json();
            const datas = [{homeTeamStats: jsonHomeTeam.data}, {visitorTeamStats: jsonVisitorTeam.data}];
            setData(datas);
        } catch (e) {
            console.error(e);
        }
    }
    useEffect(() => {
        stats()
    }, []);

    useEffect(() => {
        if (data.length === 0) return;

        let homeWins = 0;
        let homeLosses = 0;
        let visitorWins = 0;
        let visitorLosses = 0;

        data.forEach(teamStats => {
            if (teamStats.homeTeamStats) {
                teamStats.homeTeamStats.forEach(match => {
                    // donc la home_team de ce match corresond à la home team du match que le user va parier sur
                    // trouver score le plus élever de ce match entre visiteur et domicile
                    if (match.home_team.name === game.home_team.name) {
                        if (match.home_team_score > match.visitor_team_score) {
                            homeWins++;
                            // si domicile : +1 à win sinon +1 à loose
                        } else {
                            homeLosses++;
                        }
                    } else {
                        if (match.visitor_team_score > match.home_team_score) {
                            homeWins++;
                        } else {
                            homeLosses++;
                        }
                    }
                });
            }
            // pareil pour la visitor_team
            if (teamStats.visitorTeamStats) {
                teamStats.visitorTeamStats.forEach(match => {
                    if (match.visitor_team.name === game.visitor_team.name) {
                        if (match.visitor_team_score > match.home_team_score) {
                            visitorWins++;
                        } else {
                            visitorLosses++;
                        }
                    } else {
                        if (match.home_team_score > match.visitor_team_score) {
                            visitorWins++;
                        } else {
                            visitorLosses++;
                        }
                    }
                });
            }
        });
        setHomeTeamWins(homeWins);
        setHomeTeamLooses(homeLosses);
        setVisitorTeamWins(visitorWins);
        setVisitorTeamLooses(visitorLosses);

    }, [data]);
    let oddHomeTeam = homeTeamWins === 0 ? 1/(1/(homeTeamLooses-1)) : 1/(homeTeamWins/(homeTeamWins+homeTeamLooses));
    oddHomeTeam = oddHomeTeam.toFixed(2);
    let oddVisitorTeam = visitorTeamWins === 0 ? 1/(1/(visitorTeamLooses)) : 1/(visitorTeamWins/(visitorTeamWins+visitorTeamLooses));
    oddVisitorTeam = oddVisitorTeam.toFixed(2);

    const simulationGame = async (amountHome, amountVisitor) => {
        console.log(amountHome, amountVisitor);
        let finalHomeScore = 0;
        let finalVisitorScore = 0;
        setVisitorTeamScore(0);
        setHomeTeamScore(0);
        onChangeAmountHomeTeam(0);
        onChangeAmountVisitorTeam(0);
        for (let i = 0; i <= 100; i++) {
            await new Promise(resolve => setTimeout(resolve, 50));
            let randomPoint = Math.floor(Math.random() * 3) + 1;
            let randomChoose = Math.floor(Math.random() * 2);
            switch (randomChoose) {
                case 0:
                    // 0 pour la home_team
                    finalHomeScore += randomPoint;
                    setHomeTeamScore(prevScore => prevScore + randomPoint);
                    break;
                case 1:
                    // 1 pour la visitor team
                    finalVisitorScore += randomPoint
                    setVisitorTeamScore(prevScore => prevScore + randomPoint);
                    break;
            }
        }
        setTimeout(() => {
            if (finalHomeScore > finalVisitorScore) {
                win = game.home_team.name;
                setAmount(prevAmount => prevAmount + amountHome * oddHomeTeam);
            } else {
                win = game.visitor_team.name;
                setAmount(prevAmount => prevAmount + amountVisitor * oddVisitorTeam);
            }

        }, 100);
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>{game.home_team.name} VS. {game.visitor_team.name}</Text>
            <View style={styles.headerBody}>
                <TouchableOpacity style={styles.credit}><FontAwesome6 name="coins" size={15} color="black" /><Text>{amount}</Text></TouchableOpacity>
                <View style={styles.score}>
                    <Text style={styles.textScore}>Score</Text>
                    <Text style={[styles.secondaryButton, styles.textSecondaryButton]}>{homeTeamScore} - {visitorTeamScore}</Text>
                </View>
            </View>
            <View style={styles.teamBlock}>
                <View style={styles.header}>
                    <Text style={styles.teamName}>
                    {game.home_team.name}
                </Text>
                <Text style={styles.odd}>Odd for this team | {oddHomeTeam}</Text>
                </View>
                <View style={styles.body}>
                    <Text style={styles.stats}>On the last 14 days</Text>
                    <Text>{homeTeamWins} Win(s)</Text>
                    <Text>{homeTeamLooses} Loose(s)</Text>
                </View>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your amount"
                    placeholderTextColor="#a19595"
                    value={amountHomeTeam}
                    onChangeText={onChangeAmountHomeTeam}
                    keyboardType='numeric'
                />
            </View>

            <View style={styles.teamBlock}>
                <View style={styles.header}>
                    <Text style={styles.teamName}>
                    {game.visitor_team.name}
                </Text>
                    <Text style={styles.odd}>Odd for this team | {oddVisitorTeam}</Text>
                </View>
                <View style={styles.body}>
                    <Text style={styles.stats}>On the last 14 days</Text>
                    <Text>{visitorTeamWins} Win(s)</Text>
                    <Text>{visitorTeamLooses} Loose(s)</Text>
                </View>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your amount"
                    placeholderTextColor="#a19595"
                    value={amountVisitorTeam}
                    onChangeText={onChangeAmountVisitorTeam}
                    keyboardType='numeric'
                />
            </View>
            <TouchableOpacity
                style={[styles.secondaryButtonLauncher, isButtonDisabled && { opacity: 0.5 }]}
                onPress={() => {
                    if (!isButtonDisabled) {
                        setIsButtonDisabled(true);
                        simulationGame(amountHomeTeam, amountVisitorTeam);
                    }
                }}
                disabled={isButtonDisabled}
            >
                <Text style={styles.textSecondaryButton}>Launch bet</Text>
            </TouchableOpacity>

        </ScrollView>
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
    input: {
        backgroundColor: '#F5F5F5',
        borderWidth: 1,
        borderColor: '#2A9D8F',
        borderRadius: 8,
        padding: 15,
        fontSize: 16,
        color: '#264653',
    },
    headerBody :{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 5,
    },
    teamBlock: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        marginVertical: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    header: {
        backgroundColor: '#264653',
        padding: 15,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    teamName: {
        color: 'white',
        fontSize : 18,
        fontWeight: 'bold',
    },
    odd: {
        color: 'white',
        fontWeight: '100',
    },
    body: {
        padding: 10,
    },
    secondaryButton: {
        backgroundColor: '#F4A261',
        padding: 15,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#F4A261',
        alignItems: 'center',
        marginTop: 20,
    },
    secondaryButtonLauncher: {
        backgroundColor: '#F4A261',
        padding: 15,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#F4A261',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 50,
    },
    textSecondaryButton: {
        color: '#264653',
        fontSize: 16,
        fontWeight: '600',
    },
    stats: {
        borderBottomWidth: 1,
        borderBottomColor: '#2A9D8F',
        alignSelf: 'flex-start',
        marginBottom: 5,
    },
    score: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    textScore: {
        color: '#264653',
        fontSize: 18,
        marginRight: 15,
        borderBottomWidth: 2,
        borderBottomColor: '#F4A261',
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
        alignSelf: 'flex-start',
    }
});

export default MatchScreen;
