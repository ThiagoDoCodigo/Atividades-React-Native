import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { TouchableOpacity, View } from 'react-native';
import { Menu } from 'lucide-react-native';
import Sidebar from '../components/Sidebar';

import Atividade1Screen from '../screens/atividade1/Atividade1Screen';
import Atividade2Screen from '../screens/atividade2/Atividade2Screen';

const Drawer = createDrawerNavigator();

export default function AppNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <Sidebar {...props} />}
      screenOptions={({ navigation }) => ({
        headerStyle: { 
          backgroundColor: '#f9fafb',
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: '#f1f5f9'
        },
        headerTitleAlign: 'center',
        headerTintColor: '#334155',
        headerTitleStyle: { 
          fontWeight: 'bold',
          fontSize: 16,
        },
        headerLeft: () => (
          <TouchableOpacity 
            onPress={() => navigation.toggleDrawer()} 
            className="ml-4 p-2 bg-white border border-gray-200 rounded-lg shadow-sm active:bg-gray-50"
          >
            <Menu size={20} color="#64748b" />
          </TouchableOpacity>
        ),
        drawerType: 'slide',
        drawerStyle: { width: '75%' },
        sceneContainerStyle: { backgroundColor: '#f9fafb' },
      })}
    >
      <Drawer.Screen 
        name="Atividade1" 
        component={Atividade1Screen} 
        options={{ title: 'Atividade 1' }} 
      />
      <Drawer.Screen 
        name="Atividade2" 
        component={Atividade2Screen} 
        options={{ title: 'Atividade 2' }} 
      />
    </Drawer.Navigator>
  );
}