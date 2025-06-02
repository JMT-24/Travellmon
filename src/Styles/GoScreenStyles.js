import { timeConversion } from "geolib";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    body: {
        // backgroundColor: "lightblue",
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: "space-around",
    },
    

    monsterDisplayContainer: {
        backgroundColor: "gray",
        height: "80%",
        width: "95%",
        justifyContent: "space-around"
    },
    topView: {
        // backgroundColor: "pink",
        height: "10%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
    midView: {
        // backgroundColor: "violet",
        height: "60%",
        width: "100%"

    },
    botView: {
        // backgroundColor: "lightgreen",
        height: "20%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    timerText: {
        color: "white",
        fontSize: 27,
        fontWeight: "bold",
    },
    speedText: {
        color: "white",
        fontSize: 30,
    },
    distanceText: {
        color: "white",
        fontSize: 23,
    },

    
    controls: {
        width: "100%",
        height: "13%",
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: 'teal',
        margin: 10,
        gap: "3%",
    },
    startButton: {
        backgroundColor: 'lightgreen',
        height: "95%",
        width: "30%",
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "green",
    },
    endButton: {
        backgroundColor: '#ff6666',
        height: "95%",
        width: "30%",
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "red",
    },
    disabledButton: {
        opacity: 0.5,
    },
    resetButton: {
        backgroundColor: 'lightblue',
        height: "95%",
        width: "30%",
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "blue",
    },
    
    buttonText: {
        color: 'white',
        fontSize: 26,
        fontWeight: 'bold',
    },
});

export default styles;