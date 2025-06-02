import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    body: {
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "yellow",
        height: "100%",
    },
    container: {
        // backgroundColor: "lightblue",
        width: "95%",
        height: "90%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        borderBlockColor: "black",
        paddingHorizontal: "4%",
        // borderWidth: 2,
    },
    nameContainer: {
        // backgroundColor: "pink",
        width: "80%",
        height: "5%",
        alignItems: "center",
        justifyContent: "center",
    },
    nameText: {
        fontSize: 27,
        fontWeight: "bold",
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

    });

export default styles;