import React from "react";
import { useState, useCallback } from "react";
import {View, Text, ScrollView} from "react-native";
import {StyleSheet} from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import { User } from "../Models/User";
import { DocumentData } from 'firebase/firestore';

import UserDataBox from "../Components/userDataBox";

import { getUserPathStats, getUserLifePaths } from "../Database/userService";

interface Props {
    user: User | null;
}

const ProfileScreen: React.FC<Props> = ({user}) => {
    const [userPathData, setUserPathData] = useState<DocumentData | undefined> (undefined);
    const [pathNames, setPathNames] = useState<string | null>(null);

    const handlePath = async () => {
        if (user)
        {
            let data = await getUserPathStats(user.uid);
            setUserPathData(data);
            let pathnames = await getUserLifePaths(user.uid);
            setPathNames(pathnames[0]);
        }
    }

    useFocusEffect(
        useCallback(() => {
            console.log("Profile screen is focused");
            handlePath();

            return () => {
                console.log("Unfocused");
            };
        }, [])
    );

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
                        <ScrollView horizontal={true} style={styles.userDetailCont} 
                        showsHorizontalScrollIndicator={false} 
                        contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
                        >

                            <View style={styles.detailBox}>
                                {/* <Text style={styles.detailBoxText}>Life Path</Text> */}
                                <Text style={styles.detailBoxText}>{`${pathNames}`}</Text>
                            </View>

                            <View style={styles.detailBox}>
                                <Text style={styles.detailBoxText}>Path Streak: 0</Text>
                            </View>

                            <View style={styles.detailBox}>
                                <Text style={styles.detailBoxText}>Monsters Owned: 0</Text>
                            </View>

                            <View style={styles.detailBox}>
                                <Text style={styles.detailBoxText}>Totems earned: 0</Text>
                            </View>

                            <View style={styles.detailBox}>
                                <Text style={styles.detailBoxText}>Player Rank: 0</Text>
                            </View>
                        </ScrollView>
                    </View>

                    <View style={styles.section}>
                        <UserDataBox 
                        dataLabel={"Distance Covered Today"}
                        dataValue={"---"} />

                        <UserDataBox 
                        dataLabel={"Time Spent Moving Today"}
                        dataValue={"---"} />

                        <UserDataBox 
                        dataLabel={"Longest Distance Covered"}
                        dataValue={"---"} />

                        <UserDataBox 
                        dataLabel={"Longest Time Spent Moving"}
                        dataValue={`---`} />
                        
                        <UserDataBox 
                        dataLabel={"Total Distance Covered"}
                        dataValue={`${Math.round((userPathData?.totalDistanceCovered ?? 0) * 1000)} meters`} />
                        
                        <UserDataBox 
                        dataLabel={"Total Time Spent Moving"}
                        dataValue={`${userPathData?.totalTimeSpent} seconds`} />
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
        paddingHorizontal: 10,
    },
    detailBoxText: {
        color: "white",
        fontSize: 20,
    },
});