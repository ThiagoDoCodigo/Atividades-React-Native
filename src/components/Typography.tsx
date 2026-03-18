import { Text, TextProps, TextStyle } from 'react-native';
import { colors } from '../config/theme';

type Variant = 'h1' | 'h2' | 'title' | 'subtitle' | 'body' | 'caption' | 'label';
type Weight = 'normal' | 'medium' | 'semibold' | 'bold';
type Align = 'left' | 'center' | 'right' | 'justify';

interface TypographyProps extends TextProps {
  variant?: Variant;
  weight?: Weight;
  align?: Align;
  color?: string;
  italic?: boolean;
}

export default function Typography({
  variant = 'body',
  weight,
  align = 'left',
  color,
  italic = false,
  style,
  children,
  ...rest
}: TypographyProps) {
  
  const getVariantStyle = (): TextStyle => {
    switch (variant) {
      case 'h1': return { fontSize: 24, fontWeight: 'bold', color: colors.text.primary };
      case 'h2': return { fontSize: 20, fontWeight: 'bold', color: colors.text.primary };
      case 'title': return { fontSize: 16, fontWeight: 'bold', color: colors.text.primary };
      case 'subtitle': return { fontSize: 14, color: colors.text.secondary };
      case 'body': return { fontSize: 14, color: colors.text.secondary, lineHeight: 20 };
      case 'caption': return { fontSize: 12, color: colors.text.muted };
      case 'label': return { fontSize: 10, fontWeight: 'bold', color: colors.text.muted, textTransform: 'uppercase', letterSpacing: 0.5 };
      default: return {};
    }
  };

  const baseStyle = getVariantStyle();

  return (
    <Text
      style={[
        baseStyle,
        weight && { fontWeight: weight },
        align && { textAlign: align },
        color && { color },
        italic && { fontStyle: 'italic' },
        style,
      ]}
      {...rest}
    >
      {children}
    </Text>
  );
}