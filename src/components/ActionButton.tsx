import { useState } from 'react';
import { TouchableOpacity, Text, View, ActivityIndicator } from 'react-native';
import Animated, { FadeIn, FadeOut, ZoomIn } from 'react-native-reanimated';
import { Check, X, CheckCheck, ArrowRight } from 'lucide-react-native';

export type ButtonVariant = 'primary' | 'outline' | 'danger';

interface ActionButtonProps {
  onPress: () => Promise<void> | void;
  icon?: any;
  label?: string;
  loadingLabel?: string;
  successLabel?: string;
  errorLabel?: string;
  iconPosition?: 'right' | 'left';
  className?: string;
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
  className = '',
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
    if (status === 'success') return { bg: 'bg-emerald-500', border: 'border-emerald-500', text: 'text-white' };
    if (status === 'error') return { bg: 'bg-red-500', border: 'border-red-500', text: 'text-white' };

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

  const iconColor = colors.text.includes('white') ? '#ffffff' : 
                    colors.text.includes('red') ? '#dc2626' : '#334155';

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={handlePress}
      disabled={status === 'loading'}
      className={`
        flex-row items-center justify-center
        h-12 px-5 rounded-xl border
        ${colors.bg} ${colors.border}
        ${status === 'loading' ? 'opacity-90' : 'opacity-100'}
        ${className}
      `}
    >
      <View className={`flex-row items-center justify-center gap-2 ${!isLeftIcon ? 'flex-row-reverse' : ''}`}>
        
        <View className="w-5 h-5 items-center justify-center">
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

        <View className="justify-center items-center overflow-hidden">
          {status === 'idle' && (
            <Animated.Text entering={FadeIn.duration(200)} className={`font-bold text-[15px] ${colors.text}`}>
              {label}
            </Animated.Text>
          )}
          {status === 'loading' && (
            <Animated.Text entering={FadeIn.duration(200)} className={`font-bold text-[15px] ${colors.text}`}>
              {loadingLabel}
            </Animated.Text>
          )}
          {status === 'success' && (
            <Animated.Text entering={FadeIn.duration(200)} className="font-bold text-[15px] text-white">
              {successLabel}
            </Animated.Text>
          )}
          {status === 'error' && (
            <Animated.Text entering={FadeIn.duration(200)} className="font-bold text-[15px] text-white">
              {errorLabel}
            </Animated.Text>
          )}
        </View>

      </View>
    </TouchableOpacity>
  );
}