import React from 'react';
import { Text, View } from 'react-native';
import MainLayout from '../../layouts/MainLayout';

export default function Atividade1Screen() {
  return (
    <MainLayout>
      <View className="flex-1">
        <Text className="text-2xl font-bold text-gray-800 mb-2">Segunda Atividade</Text>
        <Text className="text-sm text-gray-500 leading-relaxed">
          Já vem nas próximas semanas Thiagão!
        </Text>
      </View>
    </MainLayout>
  );
}