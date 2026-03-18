import { View, StyleSheet } from 'react-native';
import { colors } from '../config/theme';
import Typography from './Typography';

interface HeaderProps {
  title: string;
  subtitle: string;
  icon: any;
  iconColor?: string;
  iconBgColor?: string;
}

export default function Header({ 
  title, 
  subtitle, 
  icon: Icon, 
  iconColor = colors.primary.main, 
  iconBgColor = colors.primary.faded 
}: HeaderProps) {
  return (
    <View style={styles.container}>
      <View style={[styles.iconContainer, { backgroundColor: iconBgColor }]}>
        <Icon size={24} color={iconColor} />
      </View>
      <View style={styles.textContainer}>
        <Typography variant="h2" color={colors.text.primary} style={styles.title}>
          {title}
        </Typography>
        <Typography variant="subtitle" color={colors.text.secondary} style={styles.subtitle}>
          {subtitle}
        </Typography>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingTop: 10,
    paddingBottom: 20,
    marginBottom: 20,
  },
  iconContainer: {
    padding: 12,
    borderRadius: 12,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 13,
    marginTop: 2,
  },
});