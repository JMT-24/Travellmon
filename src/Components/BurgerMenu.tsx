import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Modal, Dimensions, Animated, Easing } from 'react-native';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { signOutUser } from '../Database/userService';
import { fetchCurrentUser } from '../Database/userService';


import { menuIcon } from '../Assets/Icons';

type RootStackParamList = {
  Login: undefined;
  MainApp: undefined;
  Settings: undefined;
  MonsterList: undefined;
};

const BurgerMenu = () => {
    const [visible, setVisible] = useState(false);
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const slideAnim = useRef(new Animated.Value(sideMenuWidth)).current;
    const [username, setUsername] = useState<String>();

    const openMenu = () => {
        console.log('open clicked');
        setVisible(true);
        slideAnim.setValue(sideMenuWidth);
        Animated.timing(slideAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
            easing: Easing.out(Easing.ease),
        }).start();
    };

    const closeMenu = ():Promise<void> => {
        return new Promise<void>(resolve => {
            Animated.timing(slideAnim, {
            toValue: sideMenuWidth,
            duration: 300,
            useNativeDriver: true,
            easing: Easing.in(Easing.ease),
            }).start(() => {
            setVisible(false);
            resolve();
            });
        });
    };


    const handleLogout = async () => {
        try {
            await signOutUser();
            setTimeout(() => {
            closeMenu();
            navigation.replace('Login');
            }, 0);
        } catch (error: any) {
            console.error("Logout error:", error.message);
        }
    };


    const handleSettingsPress = async () => {
        await closeMenu();
        navigation.replace('Settings');
    };

    const handleMonsterListPress = async () => {
        await closeMenu();
        navigation.replace('MonsterList');
    };

    useEffect(() => {
          const loadUser = async() => {
            const user = await fetchCurrentUser();
            if (user) {
                setUsername(user.username);
            }
            else {
                console.log('No user fetched');
            }
          };
          loadUser();
      }, []);

    return (
        <View style={styles.floatingIcon}>
            <TouchableOpacity onPress={openMenu} style={styles.iconButton}>
                <Image source={menuIcon} style={styles.menuIcon} />
            </TouchableOpacity>

            <Modal
                transparent
                visible={visible}
                animationType='none'
                onRequestClose={closeMenu}
            >
                <TouchableOpacity style={styles.backdrop} onPress={closeMenu} />

                <View style={styles.sideMenuContainer}>
                    <Animated.View
                        style={[
                            styles.sideMenu,
                            { transform: [{ translateX: slideAnim }] }
                        ]}
                    >
                        <View style={styles.sideMenuTitleCont}>
                            <Text style={styles.sideMenuTitle}>{username}</Text>
                        </View>
                        <TouchableOpacity onPress={handleMonsterListPress} style={styles.sectionBtn}>
                            <Text style={styles.menuItem}>VitaMonsters</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleSettingsPress} style={styles.sectionBtn}>
                            <Text style={styles.menuItem}>Settings</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleLogout} style={styles.sectionBtn}>
                            <Text style={styles.menuItem}>Logout</Text>
                        </TouchableOpacity>
                    </Animated.View>
                </View>
            </Modal>
        </View>
    );
};

const screenWidth = Dimensions.get('window').width;
const sideMenuWidth = screenWidth * 0.35; // 10% of screen width

const styles = StyleSheet.create({
    floatingIcon: {
        position: 'absolute',
        top: 40,
        right: 20,
        zIndex: 999,
        backgroundColor: "#FFA733",
    },
    iconButton: {
        width: 60,
        height: 60,
        justifyContent: "center",
        alignItems: "center",
    },
    menuIcon: {
        width: 25,
        height: 26,
    },
    backdrop: {
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
    sideMenuContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    sideMenu: {
        width: sideMenuWidth,
        height: '50%',
        backgroundColor: '#FFA733',
        justifyContent: 'flex-start',
        alignItems: "center",
        elevation: 5,
        borderWidth: 2,
        borderColor: '#5A3200',
    },
    sideMenuTitleCont: {
        backgroundColor: "#5A3200",
        width: '100%',
        height: "15%",
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    sideMenuTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#FFA733',
    },
    menuItem: {
        paddingVertical: 12,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFA733',
    },
    sectionBtn: {
        backgroundColor: "#A0522D",
        width: '95%',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
        borderRadius: 7,
        borderWidth: 2,
    },
});

export default BurgerMenu;
