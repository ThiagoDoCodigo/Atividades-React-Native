import { View, Text, StyleSheet } from 'react-native';

interface HeaderProps {
  title: string;
  subtitle: string;
  icon: any;
  iconColor: string;
  iconBgColor: string;
}

export default function Header({ title, subtitle, icon: Icon, iconColor, iconBgColor }: HeaderProps) {
  return (
    <View style={styles.container}>
      <View style={[styles.iconContainer, { backgroundColor: iconBgColor }]}>
        <Icon size={24} color={iconColor} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
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
    color: '#1e293b',
  },
  subtitle: {
    fontSize: 13,
    color: '#64748b',
    marginTop: 2,
  },
});