import React from 'react';
import { View, Text } from 'react-native';

interface HeaderProps {
  title: string;
  subtitle: string;
  icon: any;
  iconColor: string;
  iconBgColor: string;
}

export default function Header({ title, subtitle, icon: Icon, iconColor, iconBgColor }: HeaderProps) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#f1f5f9', paddingBottom: 20, marginBottom: 20 }}>
      <View style={{ padding: 12, backgroundColor: iconBgColor, borderRadius: 12, marginRight: 12 }}>
        <Icon size={24} color={iconColor} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#1e293b' }}>{title}</Text>
        <Text style={{ fontSize: 13, color: '#64748b', marginTop: 2 }}>{subtitle}</Text>
      </View>
    </View>
  );
}