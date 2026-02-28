import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export default function MainLayout({ children, className = '' }: MainLayoutProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <SafeAreaView className="flex-1 bg-white px-2 py-3" edges={['bottom', 'left', 'right']}>
      <Animated.View 
        style={{ flex: 1, opacity: fadeAnim }} 
        className={`px-2 py-2 ${className}`}
      >
        {children}
      </Animated.View>
    </SafeAreaView>
  );
}