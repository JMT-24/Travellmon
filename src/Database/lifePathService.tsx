import { getApp } from "@react-native-firebase/app";
import { getAuth, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword} from "@react-native-firebase/auth";
import { getFirestore, doc, getDoc, setDoc, serverTimestamp, addDoc, collection } from "@react-native-firebase/firestore";
import { Timestamp } from "@react-native-firebase/firestore";
import firestore from '@react-native-firebase/firestore';

import { PathOfMotion } from "../Models/LifePaths";

export const newLifePath = (pathName: string) => {
    switch (pathName)
    {
        case "Path of Motion":
            return createPathofMotion(pathName);
    }
}

const createPathofMotion = (pathName: string): PathOfMotion => {
    const path = new PathOfMotion({
        name: pathName,
        pathStreak: 0,
        totalTimeSpent: 0,
        totalDistanceCovered: 0,
        longestDistanceCovered: 0,
        longestTimeSpent: 0,
    });

    return path;
}


export const createMotionLog = async (uid: string, distance: number, seconds: number) => {
    const firestore = getFirestore(getApp());
    await addDoc(collection(firestore, "users", uid, "lifePaths", "Path of Motion", "logs"), 
    {
        distanceCovered: distance,
        timeSpend: seconds,
        createdAt: new Date(),
    });
}