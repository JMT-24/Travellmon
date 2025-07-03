import { getApp } from "@react-native-firebase/app";
import { getAuth, signOut} from "@react-native-firebase/auth";
import { getFirestore, doc, getDoc } from "@react-native-firebase/firestore";
import { Timestamp } from "@react-native-firebase/firestore";

import { User } from "../Models/User";

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