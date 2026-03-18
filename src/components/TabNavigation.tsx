import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

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
            <Text 
              style={[
                styles.text,
                isActive ? styles.textActive : styles.textInactive
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#f1f5f9',
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
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  text: {
    fontSize: 14,
  },
  textActive: {
    fontWeight: 'bold',
    color: '#0ea5e9',
  },
  textInactive: {
    fontWeight: '600',
    color: '#64748b',
  },
});