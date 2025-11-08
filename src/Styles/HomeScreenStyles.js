import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    body: {
        justifyContent: "flex-end",
        alignItems: "center",
        backgroundColor: "#1f1c1b",
        borderLeftWidth: 5,
        borderRightWidth: 5,
        borderTopWidth: 16,
        borderColor: "#FFA733",
        height: "100%",
    },
    container: {
        // backgroundColor: "#1f1c1b",
        width: "98%",
        height: "98%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: "4%",
        paddingTop: 70,
        // borderWidth: 2,
    },
    nameContainer: {
        backgroundColor: "#FFA733",
        width: "80%",
        height: "5%",
        alignItems: "center",
        justifyContent: "center",
    },
    nameText: {
        fontSize: 27,
        fontWeight: "bold",
        color: "#5A3200",
    },

    imageContainer: {
        height: "40%",
        width: "80%",
        backgroundColor: "gray",
        margin: 15,
        borderWidth: 1,
        borderColor: "black",
    },
    monsterPic: {
        height: "100%",
        width: "100%",
    },
    placeholderWarningText: {
        position: "absolute",
        color: "white",
        fontSize: 40,
        top: "20%",    
        fontWeight: "bold",
        textAlign: "center",
        textShadowColor: 'black',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 1,
        // To simulate stroke better, you can repeat shadow in multiple directions
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 3,
        opacity: 0.25,
    },
    btnStyle: {
        backgroundColor: '#FFA733',
        height: "10%",
        width: "50%",
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: "center",
        borderWidth: 2,
        borderColor: '#FFD700',
        elevation: 5,
        shadowColor: "#5A3200",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 6,
        marginTop: 20,
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