import React, { useState} from 'react';
import { View, Text, TouchableOpacity, Image, ImageSourcePropType, Modal } from 'react-native';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { getApp } from '@react-native-firebase/app';
import { getAuth, signOut } from '@react-native-firebase/auth';

const menuIcon: ImageSourcePropType = require('../Assets/Icons/menuIcon.png');

type RootStackParamList = {
  Login: undefined;
  MainApp: undefined;
};

const BurgerMenu = () => {
    const [visible, setVisible] = useState(false);
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    
    const handleLogout = async () => {
        console.log("Logout is pressed")
        try {
            const app = getApp();
            const authInstance = getAuth(app);
            await signOut(authInstance);
            console.log("User signed out");
            setVisible(false);
            navigation.replace('Login');
        } catch (error: any) {
            console.error("Logout error:", error.message);
        }
        console.log("should be done");
    }
    return (
        <View style={styles.floatingIcon}>
            <TouchableOpacity onPress={()=> setVisible(true)} style={styles.iconButton}>
                <Image source={menuIcon} style={styles.menuIcon} />
            </TouchableOpacity>
            <Modal
                transparent
                visible={visible}
                animationType='fade'
                onRequestClose={()=>setVisible(false)}
            >
                <View style={styles.overlay}>
                    <TouchableOpacity style={styles.backdrop} onPress={() => setVisible(false)} />
                    <View style={styles.menu}>
                        <TouchableOpacity onPress={()=>console.log("Profile is pressed")}>
                            <Text style={styles.menuItem}>Profile</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleLogout}>
                            <Text style={styles.menuItem}>Logout</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    floatingIcon: {
        position: 'absolute',
        top: 40,
        right: 20,
        zIndex: 999,
        backgroundColor: "#FFA733",
    },
    iconButton: {
        width: 50,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor:"brown",
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.2)',
        justifyContent: "flex-start",
        alignItems: "flex-end",
    },
    menu: {
        backgroundColor: "white",
        marginTop: 50,
        marginRight: 5,
        borderRadius: 8,
        padding: 8,
        elevation: 4,
    },
    menuIcon: {
        width: 25,
        height: 26,
    },
    menuItem: {
        padding: 12,
        fontSize: 16,
    },
    backdrop: {
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
});

export default BurgerMenu;