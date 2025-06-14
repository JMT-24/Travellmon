import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface Props {
    state: any;
    descriptors: any;
    navigation: any;
}

const CustomTabBar: React.FC<Props> = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route: any, index: any) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          if (!isFocused) {
            navigation.navigate(route.name);
          }
        };

        const color = isFocused ? '#FFD700' : "#5A3200";
        const size = 30;

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={styles.tabButton}
          >
            {/* Render icon if available */}
            {options.tabBarIcon
              ? options.tabBarIcon({ color, size, focused: isFocused })
              : <Text style={{ color }}>{route.name}</Text>
            }
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default CustomTabBar;

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    backgroundColor: "#1f1c1b",
    elevation: 5,
    paddingBottom: "3%",
    height: "13%", 
    paddingHorizontal: 5, 
    alignItems: 'center',
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderBottomWidth: 10,
    borderColor: "#FFA733",
  },
  tabButton: {
    flex: 1,
    height: '95%',
    backgroundColor: "#A0522D",
    marginHorizontal: 4,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: "#FFA733",
    borderWidth: 2,
  },
});