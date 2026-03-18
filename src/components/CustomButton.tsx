import { TouchableOpacity, Text, View, StyleSheet, StyleProp, ViewStyle } from 'react-native';

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
  
  const getColors = () => {
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

  const iconColor = disabled 
    ? '#94a3b8'
    : colors.text === '#ffffff' 
      ? '#ffffff' 
      : colors.text === '#dc2626' 
        ? '#dc2626' 
        : '#334155';

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.container,
        disabled ? styles.disabledContainer : { backgroundColor: colors.bg, borderColor: colors.border },
        style
      ]}
    >
      <View style={[styles.innerContainer, !isLeftIcon && styles.rowReverse]}>
        
        {Icon && (
          <View style={styles.iconWrapper}>
            <Icon size={18} color={iconColor} strokeWidth={2.5} />
          </View>
        )}

        <Text style={[styles.label, { color: disabled ? '#94a3b8' : colors.text }]}>
          {label}
        </Text>

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
    backgroundColor: '#f1f5f9',
    borderColor: '#e2e8f0',
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
    fontWeight: 'bold',
    fontSize: 15,
  },
});