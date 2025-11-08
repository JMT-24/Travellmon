import React from "react";
import {View, Text, ScrollView} from "react-native";
import {StyleSheet} from "react-native";
import { User } from "../Models/User";

import UserDataBox from "../Components/userDataBox";

interface Props {
    user: User | null;
}

const ProfileScreen: React.FC<Props> = ({user}) => {
    return (
        <View style={styles.body}>
            <View style={styles.background}>
                <ScrollView contentContainerStyle={styles.container}>
                    <View style={styles.section}>
                        <View style={styles.tempProfPic} />
                        <Text style={styles.usernameText}>{user?.username}</Text>
                        <Text style={styles.userLevelText}>Level 0</Text>
                    </View>
                    <View style={styles.section}>
                        <ScrollView horizontal={true} style={styles.userDetailCont} showsHorizontalScrollIndicator={false}>

                            <View style={styles.detailBox}>
                                <Text style={styles.detailBoxText}>Vita Skill</Text>
                            </View>

                            <View style={styles.detailBox}>
                                <Text style={styles.detailBoxText}>Login Streak</Text>
                            </View>

                            <View style={styles.detailBox}>
                                <Text style={styles.detailBoxText}>Monsters Owned</Text>
                            </View>

                            <View style={styles.detailBox}>
                                <Text style={styles.detailBoxText}>Totems earned</Text>
                            </View>

                            <View style={styles.detailBox}>
                                <Text style={styles.detailBoxText}>Player Rank</Text>
                            </View>
                        </ScrollView>
                    </View>

                    <View style={styles.section}>
                        <UserDataBox 
                        dataLabel={"Distance Covered Today"}
                        dataValue={"1 km"} />

                        <UserDataBox 
                        dataLabel={"Time Spent Moving Today"}
                        dataValue={"24m 11s"} />

                        <UserDataBox 
                        dataLabel={"Longest Distance Covered"}
                        dataValue={"10 km"} />

                        <UserDataBox 
                        dataLabel={"Longest Time Spent Moving"}
                        dataValue={"1h 11m 11s"} />
                        
                        <UserDataBox 
                        dataLabel={"Total Distance Covered"}
                        dataValue={"100 km"} />
                        
                        <UserDataBox 
                        dataLabel={"Total Time Spent Moving"}
                        dataValue={"10h 24m 11s"} />
                    </View>

                </ScrollView>
            </View>
        </View>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    body: {
        height: "100%",
        width: "100%",
        justifyContent: "flex-end",
        alignItems: "center",
        backgroundColor: "#1f1c1b",
        borderLeftWidth: 5,
        borderRightWidth: 5,
        borderTopWidth: 16,
        borderColor: "#FFA733",
    },
    background: {
        flex: 1,
        width: "100%",
    },
    container: {
        alignItems: "center",
        justifyContent: "flex-start",
        paddingVertical: 20,
        // backgroundColor: "aqua",
    },
    section: {
        width: "90%",
        marginVertical: 5,
        paddingTop: 5,
        paddingBottom: 5,
        // backgroundColor: "yellow",
        alignItems: "center",
        elevation: 2,
    },
    tempProfPic: {
        height: 120,
        width: 120,
        backgroundColor: "white",
        borderRadius: 90,
    },
    usernameText: {
        fontSize: 28,
        marginTop: 12,
        color: "#FFEA00",
    },
    userLevelText: {
        fontSize: 17,
        color: "#FFA733",
    },
    userDetailCont: {
        // backgroundColor: "gray",
        height: 100,
        width: "100%",
    },
    detailBox: {
        // backgroundColor: "white",
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#FFA733",
        height: "100%",
        width: 110,
        marginHorizontal: 5,
        justifyContent: "center",
        alignItems: "center",
    },
    detailBoxText: {
        color: "white",
        fontSize: 20,
    },
});