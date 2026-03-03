import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

interface CustomCardProps {
  title: string;
  description: string;
  image?: string;
  subDescription?: string;
  subIcon?: any;
  onPressBottom?: () => void;
  bottomButtonText?: string;
  onPressRight?: () => void;
  rightIcon?: any;
}

export default function CustomCard({
  title,
  description,
  image,
  subDescription,
  subIcon: SubIcon,
  onPressBottom,
  bottomButtonText = 'Ver Detalhes',
  onPressRight,
  rightIcon: RightIcon,
}: CustomCardProps) {
  return (
    <View className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 mb-4">
      <View className="flex-row items-start">
        {image && (
          <Image
            source={{ uri: image }}
            style={{ width: 64, height: 64, borderRadius: 32 }}
            className="bg-slate-100 mr-4 border border-slate-200"
            resizeMode="contain"
           />
        )}
        <View className="flex-1">
          <View className="flex-row items-start justify-between">
            <Text className="text-lg font-bold text-slate-800 mb-1 flex-1 pr-2" numberOfLines={1}>
              {title}
            </Text>
            {RightIcon && onPressRight && (
              <TouchableOpacity onPress={onPressRight} className="p-1 bg-slate-50 rounded-full active:bg-slate-100">
                <RightIcon size={16} color="#64748b" />
              </TouchableOpacity>
            )}
          </View>
          <Text className="text-sm text-slate-500 leading-snug mb-2" numberOfLines={2}>
            {description}
          </Text>
          {subDescription && SubIcon && (
            <View className="flex-row items-center gap-1.5 mt-1">
              <SubIcon size={14} color="#0ea5e9" />
              <Text className="text-xs font-semibold text-sky-600 flex-1" numberOfLines={1}>
                {subDescription}
              </Text>
            </View>
          )}
        </View>
      </View>
      {onPressBottom && (
        <TouchableOpacity
          onPress={onPressBottom}
          activeOpacity={0.7}
          className="mt-4 pt-4 border-t border-slate-100 items-center"
        >
          <Text className="text-sm font-bold text-slate-700">{bottomButtonText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}