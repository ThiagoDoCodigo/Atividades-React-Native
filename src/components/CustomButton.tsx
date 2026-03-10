import { TouchableOpacity, Text, View } from 'react-native';
export type ButtonVariant = 'primary' | 'outline' | 'danger';

interface ButtonProps {
  onPress: () => void;
  icon?: any;
  label: string;
  iconPosition?: 'right' | 'left';
  className?: string;
  variant?: ButtonVariant;
  disabled?: boolean;
}

export default function Button({
  onPress,
  icon: Icon,
  label,
  iconPosition = 'left',
  className = '',
  variant = 'primary',
  disabled = false,
}: ButtonProps) {
  
  const getColors = () => {
    switch (variant) {
      case 'danger':
        return { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-600' };
      case 'outline':
        return { bg: 'bg-transparent', border: 'border-slate-300', text: 'text-slate-700' };
      case 'primary':
      default:
        return { bg: 'bg-sky-500', border: 'border-sky-500', text: 'text-white' };
    }
  };

  const colors = getColors();
  const isLeftIcon = iconPosition === 'left';

  const iconColor = disabled 
    ? '#94a3b8'
    : colors.text.includes('white') 
      ? '#ffffff' 
      : colors.text.includes('red') 
        ? '#dc2626' 
        : '#334155';

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      disabled={disabled}
      className={`
        flex-row items-center justify-center
        h-12 px-5 rounded-xl border
        ${disabled ? 'bg-slate-100 border-slate-200 opacity-70' : `${colors.bg} ${colors.border}`}
        ${className}
      `}
    >
      <View className={`flex-row items-center justify-center gap-2 ${!isLeftIcon ? 'flex-row-reverse' : ''}`}>
        
        {Icon && (
          <View className="items-center justify-center">
            <Icon size={18} color={iconColor} strokeWidth={2.5} />
          </View>
        )}

        <Text 
          className={`font-bold text-[15px] ${disabled ? 'text-slate-400' : colors.text}`}
        >
          {label}
        </Text>

      </View>
    </TouchableOpacity>
  );
}