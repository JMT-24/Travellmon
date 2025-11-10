import React, { useState, useEffect, useRef } from 'react';
import { getApp } from "@react-native-firebase/app";
import { getAuth, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword} from "@react-native-firebase/auth";
import { getFirestore, doc, getDoc, setDoc, serverTimestamp, addDoc, collection, updateDoc } from "@react-native-firebase/firestore";
import { Timestamp } from "@react-native-firebase/firestore";
import firestore from '@react-native-firebase/firestore';
import { increment } from '@react-native-firebase/firestore';

import { PathOfMotion, MotionLogs } from "../Models/LifePaths";
import { getUserLifePath } from './userService';

let localMotionLogs: MotionLogs[] = [];

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
    const timeDate = new Date().toISOString().replace("T", " ").replace(/\.\d+Z$/, "");
    const newLog = new MotionLogs({
        userID: uid,
        timestamp: timeDate,
        startDate: startDate,
        endDate: endDate,
        distanceCovered: distance,
        timeSpent: seconds,
        expGained: expGained
    });

    localMotionLogs.push(newLog);
}

export const uploadLogs = async () => {
    let totalDistance = 0;
    let totalTime = 0;
    let uid;
    const firestore = getFirestore(getApp());
        
    try {
        for(const log of localMotionLogs)
        {
            const data = log.data;

            await setDoc(doc(firestore, "users", data.userID, "lifePaths", "Path of Motion", "logs", data.timestamp), 
            {
                startDate: data.startDate,
                endDate: data.endDate,
                distanceCovered: data.distanceCovered,
                timeSpent: data.timeSpent,
                expGained: data.expGained
            });
            totalDistance += data.distanceCovered;
            totalTime += data.timeSpent;
            uid = data.userID;
            console.log(totalDistance, totalTime, uid);
        }
        console.log(totalDistance, totalTime);
        console.log("All logs uploaded successfully!");
        localMotionLogs = [];

        if (uid)
        {
            await updateUserPathData(uid, totalDistance, totalTime);
            console.log("should have been updated");
        }
    }
    catch
    {

    }
}

const updateUserPathData = async(uid:string, totalDistance:number, totalTime: number) => {
    const lifePath = getUserLifePath();
    const firestore = getFirestore(getApp());
    await updateDoc(doc(firestore, 'users', uid, 'lifePaths', lifePath),{
        totalDistanceCovered: increment(totalDistance),
        totalTimeSpent: increment(totalTime)
    });
}