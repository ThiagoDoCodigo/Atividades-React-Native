import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

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
    <View style={{ flexDirection: 'row', backgroundColor: '#f1f5f9', padding: 4, borderRadius: 12, marginBottom: 24 }}>
      {tabs.map((tab) => {
        const isActive = currentTab === tab.id;
        return (
          <TouchableOpacity
            key={tab.id}
            activeOpacity={0.8}
            onPress={() => setCurrentTab(tab.id)}
            style={{
              flex: 1,
              paddingVertical: 10,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 8,
              backgroundColor: isActive ? '#ffffff' : 'transparent',
              ...(isActive ? { shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 2, elevation: 1 } : {})
            }}
          >
            <Text 
              style={{ 
                fontSize: 14, 
                fontWeight: isActive ? 'bold' : '600', 
                color: isActive ? '#0ea5e9' : '#64748b' 
              }}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}