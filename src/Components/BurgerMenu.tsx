import React, { useState} from 'react';
import { View, Text, TouchableOpacity, Image, ImageSourcePropType, Modal } from 'react-native';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

const menuIcon: ImageSourcePropType = require('../Assets/Icons/menuIcon.png');

type RootStackParamList = {
  Login: undefined;
  MainApp: undefined;
};

const BurgerMenu = () => {
    const [visible, setVisible] = useState(false);
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    
    const handleLogout = () => {
        setVisible(false);
        navigation.replace('Login');
        console.log("Logout is pressed")
    }
    return (
        <View>
            <TouchableOpacity onPress={()=> setVisible(true)}>
                <Image source={menuIcon} style={styles.menuIcon} />
            </TouchableOpacity>
            <Modal
                transparent
                visible={visible}
                animationType='fade'
                onRequestClose={()=>setVisible(false)}
            >
            <TouchableOpacity style={styles.overlay} onPress={()=>setVisible(false)}>
                <View style={styles.menu}>
                    <TouchableOpacity onPress={()=>console.log("Profile is pressed")}>
                        <Text style={styles.menuItem}>Profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleLogout}>
                        <Text style={styles.menuItem}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>

            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
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
        marginRight: 16,
    },
    menuItem: {
        padding: 12,
        fontSize: 16,
    }
});

export default BurgerMenu;