import { getApp } from "@react-native-firebase/app";
import { getAuth, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword} from "@react-native-firebase/auth";
import { getFirestore, doc, getDoc, setDoc, serverTimestamp, addDoc, collection } from "@react-native-firebase/firestore";
import { Timestamp } from "@react-native-firebase/firestore";
import firestore from '@react-native-firebase/firestore';

import { User } from "../Models/User";
import { VitaMonster } from "../Models/VitaMonster";

import { newUserMonster } from "./monsterService";

export const getCurrentUser = () => {
  const auth = getAuth(getApp());
  return auth.currentUser;
};

export const fetchUserbyUID = async (uid: string): Promise<User | null> => {
    try {
        const firestore = getFirestore(getApp());
        const userDocumentRef = doc(firestore, 'users', uid);
        const userSnapshot = await getDoc(userDocumentRef);

        if (!userSnapshot.exists()) {
            console.log('usernapshot does not exist');
            return null;
        }
        console.log('usernapshot exist');
        const data = userSnapshot.data();
        return {
            uid: userSnapshot.id,
            username: data?.username,
            email: data?.email,
            createdAt: (data?.createdAt as Timestamp).toDate(),
        };
    }
    catch(error) {
        console.error('Error fetching user', error);
        return null;
    }
};

export const fetchCurrentUser = async (): Promise<User | null> => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
        console.log('No current user found');
        return null;
    }
    return await fetchUserbyUID(currentUser.uid);
};

export const signOutUser = async (): Promise<void> => {
    const app = getApp();
    const authInstance = getAuth(app);
    await signOut(authInstance);
};

export const loginUser = async (email: string, password: string) => {
    const app = getApp();
    const authInstance = getAuth(app);
    const userCredentials = await signInWithEmailAndPassword(authInstance, email, password);
    console.log("logged in: ", userCredentials.user.email); 
};

export const registerUser = async (username: string, email: string, password: string) => {
    const app = getApp();
    const authInstance = getAuth(app);
    const firestore = getFirestore(app); // use same app instance
    const userCredentials = await createUserWithEmailAndPassword(authInstance, email, password);
    const user = userCredentials.user;

    const userData: User = {
        uid: user.uid,
        email: user.email ?? "",
        username: username,
        createdAt: serverTimestamp() as any,
    };

    console.log("userData:", userData);
    console.log("newUserMonster:", newUserMonster());

    // Firestore entry for user
    await setDoc(doc(firestore, "users", user.uid), userData);
    await addDoc(collection(firestore, "users", user.uid, "vitamonsters"), newUserMonster())
};
