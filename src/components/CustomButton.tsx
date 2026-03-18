import { TouchableOpacity, View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { colors } from '../config/theme';
import Typography from './Typography';

export type ButtonVariant = 'primary' | 'outline' | 'danger';

interface ButtonProps {
  onPress: () => void;
  icon?: any;
  label: string;
  iconPosition?: 'right' | 'left';
  style?: StyleProp<ViewStyle>;
  variant?: ButtonVariant;
  disabled?: boolean;
}

export default function Button({
  onPress,
  icon: Icon,
  label,
  iconPosition = 'left',
  style,
  variant = 'primary',
  disabled = false,
}: ButtonProps) {
  
  const getThemeColors = () => {
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

  const themeColors = getThemeColors();
  const isLeftIcon = iconPosition === 'left';

  const iconColor = disabled ? colors.text.muted : themeColors.text;

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.container,
        disabled ? styles.disabledContainer : { backgroundColor: themeColors.bg, borderColor: themeColors.border },
        style
      ]}
    >
      <View style={[styles.innerContainer, !isLeftIcon && styles.rowReverse]}>
        
        {Icon && (
          <View style={styles.iconWrapper}>
            <Icon size={18} color={iconColor} strokeWidth={2.5} />
          </View>
        )}

        <Typography 
          weight="bold" 
          color={disabled ? colors.text.muted : themeColors.text}
          style={styles.label}
        >
          {label}
        </Typography>

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
  disabledContainer: {
    backgroundColor: colors.surfaceHighlight,
    borderColor: colors.border,
    opacity: 0.7,
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
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 15,
  },
});