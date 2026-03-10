import { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
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

  const styles = {
    success: {
      border: 'border-l-emerald-500',
      iconBg: 'bg-emerald-100',
      iconColor: '#10b981',
      barColor: 'bg-emerald-500',
      Icon: CheckCircle2,
    },
    error: {
      border: 'border-l-red-500',
      iconBg: 'bg-red-100',
      iconColor: '#ef4444',
      barColor: 'bg-red-500',
      Icon: XCircle,
    },
    warning: {
      border: 'border-l-amber-400',
      iconBg: 'bg-amber-100',
      iconColor: '#f59e0b',
      barColor: 'bg-amber-400',
      Icon: AlertTriangle,
    },
    info: {
      border: 'border-l-sky-500',
      iconBg: 'bg-sky-100',
      iconColor: '#0ea5e9',
      barColor: 'bg-sky-500',
      Icon: Info,
    },
  };

  const activeStyle = styles[type];
  const ActiveIcon = activeStyle.Icon;

  const isTop = position === 'top';
  const enteringAnimation = isTop ? SlideInUp.duration(400) : SlideInDown.duration(400);
  const exitingAnimation = isTop ? SlideOutUp.duration(300) : SlideOutDown.duration(300);

  return (
    <Animated.View
      entering={enteringAnimation}
      exiting={exitingAnimation}
      style={{
        position: 'absolute',
        left: 10,
        right: 10,
        zIndex: 100,
        top: isTop ? insets.top + 10 : undefined,
        bottom: !isTop ? insets.bottom + 20 : undefined,
      }}
      className={`bg-white rounded-xl shadow-lg overflow-hidden ${activeStyle.border}`}
    >
      <View className="flex-row items-start p-4 gap-3">
        <View className={`p-2 rounded-full shrink-0 ${activeStyle.iconBg}`}>
          <ActiveIcon size={20} color={activeStyle.iconColor} strokeWidth={2} />
        </View>

        <View className="flex-1 pt-0.5">
          <Text className="font-bold text-slate-800 text-[15px] mb-0.5">
            {title}
          </Text>
          <Text className="text-sm text-slate-500 leading-tight">
            {message}
          </Text>
        </View>

        <TouchableOpacity 
          onPress={onClose} 
          className="p-1.5 bg-slate-50 rounded-full active:bg-slate-100"
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <X size={16} color="#94a3b8" />
        </TouchableOpacity>
      </View>

      {duration > 0 && (
        <View className="h-1 w-full bg-slate-100">
          <Animated.View 
            style={progressStyle} 
            className={`h-full ${activeStyle.barColor}`} 
          />
        </View>
      )}
    </Animated.View>
  );
}