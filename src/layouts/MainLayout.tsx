import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export default function MainLayout({ children, className = '' }: MainLayoutProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  
  const insets = useSafeAreaInsets();

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View 
      style={{ 
        flex: 1, 
        opacity: fadeAnim,
        paddingBottom: insets.bottom,
        paddingLeft: Math.max(insets.left, 16),
        paddingRight: Math.max(insets.right, 16), 
      }} 
      className={`bg-white pt-3 ${className}`}
    >
      {children}
    </Animated.View>
  );
}