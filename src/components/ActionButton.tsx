import { useState } from 'react';
import { TouchableOpacity, View, ActivityIndicator, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import Animated, { FadeIn, ZoomIn } from 'react-native-reanimated';
import { Check, X, ArrowRight } from 'lucide-react-native';

export type ButtonVariant = 'primary' | 'outline' | 'danger';

interface ActionButtonProps {
  onPress: () => Promise<void> | void;
  icon?: any;
  label?: string;
  loadingLabel?: string;
  successLabel?: string;
  errorLabel?: string;
  iconPosition?: 'right' | 'left';
  style?: StyleProp<ViewStyle>;
  variant?: ButtonVariant;
}

export default function ActionButton({
  onPress,
  icon: Icon = ArrowRight,
  label = 'Confirmar',
  loadingLabel = 'Processando...',
  successLabel = 'Sucesso!',
  errorLabel = 'Erro!',
  iconPosition = 'left',
  style,
  variant = 'primary',
}: ActionButtonProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handlePress = async () => {
    if (status !== 'idle') return;

    setStatus('loading');

    try {
      await Promise.resolve(onPress());

      setStatus('success');
      setTimeout(() => setStatus('idle'), 2500);
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 2500);
    }
  };

  const getColors = () => {
    if (status === 'success') return { bg: '#10b981', border: '#10b981', text: '#ffffff' };
    if (status === 'error') return { bg: '#ef4444', border: '#ef4444', text: '#ffffff' };

    switch (variant) {
      case 'danger':
        return { bg: '#fef2f2', border: '#fecaca', text: '#dc2626' };
      case 'outline':
        return { bg: 'transparent', border: '#cbd5e1', text: '#334155' };
      case 'primary':
      default:
        return { bg: '#0ea5e9', border: '#0ea5e9', text: '#ffffff' };
    }
  };

  const colors = getColors();
  const isLeftIcon = iconPosition === 'left';

  const iconColor = colors.text === '#ffffff' ? '#ffffff' : 
                    colors.text === '#dc2626' ? '#dc2626' : '#334155';

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={handlePress}
      disabled={status === 'loading'}
      style={[
        styles.container,
        { backgroundColor: colors.bg, borderColor: colors.border },
        status === 'loading' ? styles.opacity90 : styles.opacity100,
        style
      ]}
    >
      <View style={[styles.innerContainer, !isLeftIcon && styles.rowReverse]}>
        
        <View style={styles.iconContainer}>
          {status === 'idle' && (
            <Animated.View entering={ZoomIn.duration(200)}>
              <Icon size={18} color={iconColor} strokeWidth={2.5} />
            </Animated.View>
          )}

          {status === 'loading' && (
            <Animated.View entering={FadeIn.duration(200)}>
              <ActivityIndicator size="small" color={iconColor} />
            </Animated.View>
          )}

          {status === 'success' && (
            <Animated.View entering={ZoomIn.springify()}>
              <Check size={20} color="#ffffff" strokeWidth={3} />
            </Animated.View>
          )}

          {status === 'error' && (
            <Animated.View entering={ZoomIn.springify()}>
              <X size={20} color="#ffffff" strokeWidth={3} />
            </Animated.View>
          )}
        </View>

        <View style={styles.textContainer}>
          {status === 'idle' && (
            <Animated.Text entering={FadeIn.duration(200)} style={[styles.text, { color: colors.text }]}>
              {label}
            </Animated.Text>
          )}
          {status === 'loading' && (
            <Animated.Text entering={FadeIn.duration(200)} style={[styles.text, { color: colors.text }]}>
              {loadingLabel}
            </Animated.Text>
          )}
          {status === 'success' && (
            <Animated.Text entering={FadeIn.duration(200)} style={[styles.text, { color: '#ffffff' }]}>
              {successLabel}
            </Animated.Text>
          )}
          {status === 'error' && (
            <Animated.Text entering={FadeIn.duration(200)} style={[styles.text, { color: '#ffffff' }]}>
              {errorLabel}
            </Animated.Text>
          )}
        </View>

      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1,
  },
  opacity90: {
    opacity: 0.9,
  },
  opacity100: {
    opacity: 1,
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  rowReverse: {
    flexDirection: 'row-reverse',
  },
  iconContainer: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 15,
  },
});