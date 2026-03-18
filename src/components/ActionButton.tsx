import { useState } from 'react';
import { TouchableOpacity, View, ActivityIndicator, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import Animated, { FadeIn, ZoomIn } from 'react-native-reanimated';
import { Check, X, ArrowRight } from 'lucide-react-native';
import { colors } from '../config/theme';
import Typography from './Typography';

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

  const getThemeColors = () => {
    if (status === 'success') return { bg: colors.success.main, border: colors.success.main, text: colors.text.inverse };
    if (status === 'error') return { bg: colors.danger.main, border: colors.danger.main, text: colors.text.inverse };

    switch (variant) {
      case 'danger':
        return { bg: colors.danger.faded, border: colors.danger.light, text: colors.danger.main };
      case 'outline':
        return { bg: 'transparent', border: colors.borderFocus, text: colors.text.secondary };
      case 'primary':
      default:
        return { bg: colors.primary.main, border: colors.primary.main, text: colors.text.inverse };
    }
  };

  const currentColors = getThemeColors();
  const isLeftIcon = iconPosition === 'left';
  const iconColor = currentColors.text;

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={handlePress}
      disabled={status === 'loading'}
      style={[
        styles.container,
        { backgroundColor: currentColors.bg, borderColor: currentColors.border },
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
              <Check size={20} color={colors.text.inverse} strokeWidth={3} />
            </Animated.View>
          )}

          {status === 'error' && (
            <Animated.View entering={ZoomIn.springify()}>
              <X size={20} color={colors.text.inverse} strokeWidth={3} />
            </Animated.View>
          )}
        </View>

        <View style={styles.textContainer}>
          {status === 'idle' && (
            <Animated.View entering={FadeIn.duration(200)}>
              <Typography weight="bold" color={currentColors.text} style={styles.textLabel}>
                {label}
              </Typography>
            </Animated.View>
          )}
          {status === 'loading' && (
            <Animated.View entering={FadeIn.duration(200)}>
              <Typography weight="bold" color={currentColors.text} style={styles.textLabel}>
                {loadingLabel}
              </Typography>
            </Animated.View>
          )}
          {status === 'success' && (
            <Animated.View entering={FadeIn.duration(200)}>
              <Typography weight="bold" color={colors.text.inverse} style={styles.textLabel}>
                {successLabel}
              </Typography>
            </Animated.View>
          )}
          {status === 'error' && (
            <Animated.View entering={FadeIn.duration(200)}>
              <Typography weight="bold" color={colors.text.inverse} style={styles.textLabel}>
                {errorLabel}
              </Typography>
            </Animated.View>
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
  textLabel: {
    fontSize: 15,
  },
});