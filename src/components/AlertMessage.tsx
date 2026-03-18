import { useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
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
import { colors } from '../config/theme';
import Typography from './Typography';

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
      iconBg: { backgroundColor: colors.success.light },
      iconColor: colors.success.main,
      barColor: { backgroundColor: colors.success.main },
      Icon: CheckCircle2,
    },
    error: {
      iconBg: { backgroundColor: colors.danger.light },
      iconColor: colors.danger.main,
      barColor: { backgroundColor: colors.danger.main },
      Icon: XCircle,
    },
    warning: {
      iconBg: { backgroundColor: colors.warning.light },
      iconColor: colors.warning.main,
      barColor: { backgroundColor: colors.warning.main },
      Icon: AlertTriangle,
    },
    info: {
      iconBg: { backgroundColor: colors.info.light },
      iconColor: colors.info.main,
      barColor: { backgroundColor: colors.info.main },
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
          <Typography variant="title" style={styles.title}>
            {title}
          </Typography>
          <Typography variant="body" color={colors.text.secondary} style={styles.message}>
            {message}
          </Typography>
        </View>

        <TouchableOpacity 
          onPress={onClose} 
          style={styles.closeButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <X size={16} color={colors.text.muted} />
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
    backgroundColor: colors.surface,
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
    fontSize: 15,
    marginBottom: 2,
  },
  message: {
    lineHeight: 18,
  },
  closeButton: {
    padding: 6,
    backgroundColor: colors.surfaceHighlight,
    borderRadius: 9999,
  },
  progressBarContainer: {
    height: 4,
    width: '100%',
    backgroundColor: colors.surfaceHighlight,
  },
  progressBar: {
    height: '100%',
  },
});