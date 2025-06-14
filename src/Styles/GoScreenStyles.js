import { timeConversion } from "geolib";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    body: {
        // backgroundColor: "lightblue",
        height: "100%",
        width: "100%",
        justifyContent: "flex-end",
        alignItems: "center",
        backgroundColor: "#1f1c1b",
        borderLeftWidth: 5,
        borderRightWidth: 5,
        borderTopWidth: 16,
        borderColor: "#FFA733",
    },
    

    monsterDisplayContainer: {
        // backgroundColor: "gray",
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
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    animation: {
        width: "60%",
        height: "60%",
        marginTop: 20,
    },
    botView: {
        // backgroundColor: "lightgreen",
        height: "20%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    timerText: {
        color: "#FFA733",
        // color: "black",
        fontSize: 30,
        fontWeight: "bold",
    },
    speedText: {
        color: "#FFA733",
        // color: "black",
        fontSize: 30,
    },
    distanceText: {
        color: "#FFA733",
        // color: "black",
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
        gap: "8%",
        marginBottom: 20,
    },
    btnStyle: {
        backgroundColor: '#FFA733',
        height: "100%",
        width: "25%",
        borderRadius: 80,
        alignItems: 'center',
        justifyContent: "center",
        borderWidth: 2,
        borderColor: '#FFD700',
        elevation: 5,
        shadowColor: "#5A3200",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 6,
    },
    disabledButton: {
        opacity: 0.5,
    },
    buttonText: {
        color: "#5A3200",
        fontSize: 24,
        fontWeight: 'bold',
    },
});

export default styles;