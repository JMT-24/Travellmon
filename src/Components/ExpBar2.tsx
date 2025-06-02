import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

interface Props {
    currentExp: number,
    maxExp: number,
}

const ExpBar2: React.FC<Props> = ({ currentExp, maxExp }) => {
  const expPercent = currentExp / maxExp;
  const animatedWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedWidth, {
      toValue: expPercent,
      duration: 800,
      useNativeDriver: false, // false because we animate width
    }).start();
  }, [expPercent]);

  const widthInterpolated = animatedWidth.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.barContainer}>
      <Animated.View style={[styles.barFill, { width: widthInterpolated }]} />
      <Text style={styles.label}>{`${Math.floor(expPercent * 100)}%`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  barContainer: {
    width: '90%',
    height: 20,
    backgroundColor: '#ccc',
    borderRadius: 10,
    overflow: 'hidden',
    marginVertical: 10,
    alignSelf: 'center',
  },
  barFill: {
    height: '100%',
    backgroundColor: 'green',
  },
  label: {
    position: 'absolute',
    top: 0,
    left: '45%',
    fontWeight: 'bold',
    color: '#000',
  },
});

export default ExpBar2;
