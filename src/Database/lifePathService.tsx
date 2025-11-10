import React, { useState, useEffect, useRef } from 'react';
import { getApp } from "@react-native-firebase/app";
import { getAuth, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword} from "@react-native-firebase/auth";
import { getFirestore, doc, getDoc, setDoc, serverTimestamp, addDoc, collection } from "@react-native-firebase/firestore";
import { Timestamp } from "@react-native-firebase/firestore";
import firestore from '@react-native-firebase/firestore';

import { PathOfMotion } from "../Models/LifePaths";

let localMotionLogs = [];

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


export const createMotionLog = async (uid: string, distance: number, seconds: number, expGained: number,
    startDate: Date, endDate: Date
) => {
    const firestore = getFirestore(getApp());
    await addDoc(collection(firestore, "users", uid, "lifePaths", "Path of Motion", "logs"), 
    {
        startDate: startDate,
        endDate: endDate,
        distanceCovered: distance,
        timeSpend: seconds,
        expGained: expGained
    });
}

export const uploadLogs = async (distance: number, seconds: number, expGained: number,
    startDate: Date, endDate: Date) => {
        
    //make an array for the motion logs
    //iterate on the array and then upload each logs one by one
    //empty array
}