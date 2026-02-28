import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { User, LogOut } from 'lucide-react-native';
import { APP_ROUTES } from '../config/routes';
import LogoApp from '../../assets/logo-react.png';

export default function Sidebar(props: any) {
  const { state, navigation } = props;
  const currentRouteName = state.routeNames[state.index];
  
  //Ja deixei essa func para o futuro!
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const userName = "Thiago Ferreira Goncalves";
  const userEmail = "@thiagodocodigo";

  return (
    <View className="flex-1 bg-gray-50">
      <DrawerContentScrollView {...props} contentContainerStyle={{ flexGrow: 1 }}>
        
        <View className="px-6 py-2 border-b border-gray-200 items-center justify-center">
          <Image 
            source={LogoApp} 
            resizeMode="contain"
            className="w-40 h-40" 
          />
        </View>

        <View className="flex-1 pt-4 px-2">
          {APP_ROUTES.map((route) => {
            const isActive = currentRouteName === route.name;
            const Icon = route.icon;

            return (
              <DrawerItem
                key={route.name}
                label={route.label}
                focused={isActive}
                onPress={() => navigation.navigate(route.name)}
                activeTintColor="#ffffff"
                activeBackgroundColor="#0ea5e9" 
                inactiveTintColor="#64748b"
                labelStyle={{
                  fontWeight: isActive ? 'bold' : '600',
                  marginLeft: 2,
                  fontSize: 14,
                  letterSpacing: 0.3,
                }}
                icon={({ color }) => (
                  <Icon size={22} color={color} strokeWidth={isActive ? 2 : 1.5} />
                )}
                style={{
                  borderRadius: 12,
                  paddingHorizontal: 4,
                  marginBottom: 4,
                }}
              />
            );
          })}
        </View>
      </DrawerContentScrollView>

      <View className="p-4 border-t border-gray-200 bg-gray-50 z-50 mb-4">
        
        {isDropdownOpen && (
          <View className="absolute bottom-20 left-4 right-4 bg-white shadow-xl rounded-xl p-1.5 border border-slate-100 z-50">
            <TouchableOpacity 
              activeOpacity={0.7}
              className="flex-row items-center gap-3 px-3 py-3 rounded-lg active:bg-slate-50"
            >
              <User size={18} color="#334155" />
              <Text className="text-sm font-medium text-slate-700">Meu perfil</Text>
            </TouchableOpacity>
            
            <View className="h-px bg-slate-100 my-1" />
            
            <TouchableOpacity 
              activeOpacity={0.7}
              className="flex-row items-center gap-3 px-3 py-3 rounded-lg active:bg-red-50"
            >
              <LogOut size={18} color="#dc2626" />
              <Text className="text-sm font-medium text-red-600">Sair</Text>
            </TouchableOpacity>
          </View>
        )}

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setDropdownOpen(!isDropdownOpen)}
          className={`flex-row items-center gap-3 p-2 rounded-xl border transition-colors ${
            isDropdownOpen 
              ? 'bg-white border-slate-200' 
              : 'border-transparent bg-transparent'
          }`}
        >
          <View className="w-10 h-10 items-center justify-center bg-sky-500 rounded-lg shadow-sm shrink-0">
            <Text className="text-white text-base font-bold">
              {userName.charAt(0)}
            </Text>
          </View>

          <View className="flex-1">
            <Text 
              className="text-slate-800 font-semibold text-sm" 
              numberOfLines={1}
            >
              {userName}
            </Text>
            <Text 
              className="text-gray-500 text-xs" 
              numberOfLines={1}
            >
              {userEmail}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      
    </View>
  );
}