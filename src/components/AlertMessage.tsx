import { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  Easing, 
  SlideInUp, 
  SlideOutUp,
  SlideInDown,
  SlideOutDown
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CheckCircle2, XCircle, AlertTriangle, Info, X } from 'lucide-react-native';

type AlertType = 'success' | 'error' | 'warning' | 'info';
type Position = 'top' | 'bottom';

interface AlertMessageProps {
  title: string;
  message: string;
  type?: AlertType;
  duration?: number;
  position?: Position;
  onClose: () => void;
}

export default function AlertMessage({ 
  title, 
  message, 
  type = 'warning', 
  duration = 3000, 
  position = 'top',
  onClose 
}: AlertMessageProps) {
  const insets = useSafeAreaInsets();
  
  const progress = useSharedValue(100);

  useEffect(() => {
    if (duration > 0) {
      progress.value = withTiming(0, { 
        duration, 
        easing: Easing.linear 
      });

      const timer = setTimeout(() => {
        onClose();
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const progressStyle = useAnimatedStyle(() => ({
    width: `${progress.value}%`,
  }));

  const variantStyles = {
    success: {
      iconBg: { backgroundColor: '#d1fae5' },
      iconColor: '#10b981',
      barColor: { backgroundColor: '#10b981' },
      Icon: CheckCircle2,
    },
    error: {
      iconBg: { backgroundColor: '#fee2e2' },
      iconColor: '#ef4444',
      barColor: { backgroundColor: '#ef4444' },
      Icon: XCircle,
    },
    warning: {
      iconBg: { backgroundColor: '#fef3c7' },
      iconColor: '#f59e0b',
      barColor: { backgroundColor: '#fbbf24' },
      Icon: AlertTriangle,
    },
    info: {
      iconBg: { backgroundColor: '#e0f2fe' },
      iconColor: '#0ea5e9',
      barColor: { backgroundColor: '#0ea5e9' },
      Icon: Info,
    },
  };

  const activeStyle = variantStyles[type];
  const ActiveIcon = activeStyle.Icon;

  const isTop = position === 'top';
  const enteringAnimation = isTop ? SlideInUp.duration(400) : SlideInDown.duration(400);
  const exitingAnimation = isTop ? SlideOutUp.duration(300) : SlideOutDown.duration(300);

  return (
    <Animated.View
      entering={enteringAnimation}
      exiting={exitingAnimation}
      style={[
        styles.container,
        {
          top: isTop ? insets.top + 10 : undefined,
          bottom: !isTop ? insets.bottom + 20 : undefined,
        }
      ]}
    >
      <View style={styles.content}>
        <View style={[styles.iconContainer, activeStyle.iconBg]}>
          <ActiveIcon size={20} color={activeStyle.iconColor} strokeWidth={2} />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.title}>
            {title}
          </Text>
          <Text style={styles.message}>
            {message}
          </Text>
        </View>

        <TouchableOpacity 
          onPress={onClose} 
          style={styles.closeButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <X size={16} color="#94a3b8" />
        </TouchableOpacity>
      </View>

      {duration > 0 && (
        <View style={styles.progressBarContainer}>
          <Animated.View 
            style={[
              styles.progressBar,
              progressStyle,
              activeStyle.barColor
            ]} 
          />
        </View>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 10,
    right: 10,
    zIndex: 100,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 16,
    gap: 12,
  },
  iconContainer: {
    padding: 8,
    borderRadius: 9999,
    flexShrink: 0,
  },
  textContainer: {
    flex: 1,
    paddingTop: 2,
  },
  title: {
    fontWeight: 'bold',
    color: '#1e293b',
    fontSize: 15,
    marginBottom: 2,
  },
  message: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 18,
  },
  closeButton: {
    padding: 6,
    backgroundColor: '#f8fafc',
    borderRadius: 9999,
  },
  progressBarContainer: {
    height: 4,
    width: '100%',
    backgroundColor: '#f1f5f9',
  },
  progressBar: {
    height: '100%',
  },
});