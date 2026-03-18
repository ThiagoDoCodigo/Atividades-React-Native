import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../config/theme';
import Typography from './Typography';

interface Tab {
  id: number;
  label: string;
}

interface TabNavigationProps {
  tabs: Tab[];
  currentTab: number;
  setCurrentTab: (id: number) => void;
}

export default function TabNavigation({ tabs, currentTab, setCurrentTab }: TabNavigationProps) {
  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = currentTab === tab.id;
        return (
          <TouchableOpacity
            key={tab.id}
            activeOpacity={0.8}
            onPress={() => setCurrentTab(tab.id)}
            style={[
              styles.tab,
              isActive && styles.tabActive
            ]}
          >
            <Typography 
              variant="body"
              weight={isActive ? 'bold' : 'semibold'}
              color={isActive ? colors.primary.main : colors.text.secondary}
            >
              {tab.label}
            </Typography>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.surfaceHighlight,
    padding: 4,
    borderRadius: 12,
    marginBottom: 24,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: 'transparent',
  },
  tabActive: {
    backgroundColor: colors.surface,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
});