import React , {useState, useEffect}from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import { loginUser } from "../Database/userService";


const LoginScreen = ({navigation}: any) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        // This effect can be used to handle any side effects related to the login screen
        // For example, you could check if the user is already logged in and redirect accordingly
    }, []);

    const handleEmailChange = (text: string) => {
        setEmail(text);
    };
    const handlePasswordChange = (text: string) => {
        setPassword(text);
    };

    const handleRegBtn = () => {
        navigation.replace("Register");
    }

    const login = async () => {
        console.log("login button is clicked");
        try {
            await loginUser(email, password);
            handleLogin();
        } catch (error: any) {
            console.error("login error: ", error.message);
        }
    }

    const handleLogin = () => {
        // Handle login logic here
        console.log("Email:", email);
        console.log("Password:", password);
        navigation.replace("MainApp"); // Navigate to the main app screen after login
    };

    return (
        <View style={styles.container}>
            <View style={styles.loginContainer}>
                <View style={styles.topContainer}>
                    <Text style={styles.appText}>Travellmon</Text>
                </View>
                <View style={styles.middleContainer}>

                    <Text style={styles.titleText}>Login Screen</Text>
                    <View style={styles.inputContainer}>
                        <View style={styles.emailContainer}>
                            <TextInput
                                placeholder="Email"
                                style={styles.input}
                                onChangeText={handleEmailChange}
                            />
                        </View>
                        <View style={styles.passwordContainer}>
                            <TextInput
                                placeholder="Password"
                                secureTextEntry={true}
                                style={styles.input}
                                onChangeText={handlePasswordChange}
                            />
                        </View>
                        <TouchableOpacity onPress={login} style={styles.loginButton}>
                            <Text style={styles.buttonText}>Login</Text>   
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleRegBtn} style={styles.registerButton}>
                            <Text style={styles.regBtnText}>     Register     </Text>   
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "#FFF4E1",
    },
    loginContainer: {
        width: "80%",
        height: "60%",
        backgroundColor: "#fff",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        justifyContent: "center",
    },
    topContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFA733", // Orange color
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    appText: {
        fontSize: 30,
        color: "#5A3200", // Dark brown color
        fontWeight: "bold",
    },
    middleContainer: {
        flex: 2,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    titleText: {
        fontSize: 27,
        color: "#5A3200",
        fontWeight: "bold",
    },
    inputContainer: {
        width: "80%",
        marginTop: 20,
    },
    emailContainer: {
        marginBottom: 15,
    },
    input: {
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    loginButton: {
        backgroundColor: "#5A3200",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
    },
    buttonText: {
        color: "#FFA733",
        fontSize: 18,
        fontWeight: "bold",
    },
    registerButton: {
        alignItems: "center",
        // backgroundColor: "purple",
        marginTop: 5,
    },
    regBtnText: {
        textDecorationLine: "underline",
    },
    passwordContainer: {
        marginBottom: 15,
    },
});

export default LoginScreen;