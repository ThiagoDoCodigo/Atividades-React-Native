import { useEffect, useRef } from 'react';
import { Modal, View, Text, TouchableOpacity, Pressable, Animated, ScrollView } from 'react-native';
import { Info, X } from 'lucide-react-native';

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  buttonText?: string;
}

export default function AlertModal({
  isOpen,
  onClose,
  title = 'Informação',
  message = '',
  buttonText = 'Entendi',
}: AlertModalProps) {
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isOpen) {
      Animated.parallel([
        Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true, speed: 20 }),
        Animated.timing(opacityAnim, { toValue: 1, duration: 200, useNativeDriver: true })
      ]).start();
    } else {
      scaleAnim.setValue(0.8);
      opacityAnim.setValue(0);
    }
  }, [isOpen]);

  return (
    <Modal visible={isOpen} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable className="flex-1 justify-center items-center bg-slate-900/40 px-5" onPress={onClose}>
        <Pressable onPress={(e) => e.stopPropagation()} className="w-full">
          <Animated.View
            style={{ transform: [{ scale: scaleAnim }], opacity: opacityAnim }}
            className="bg-white rounded-2xl shadow-2xl overflow-hidden w-full border border-slate-100 max-h-[80vh]"
          >
            <View className="flex-row items-center justify-between p-5 border-b border-slate-100">
              <View className="flex-row items-center gap-3">
                <View className="p-2 rounded-full border bg-sky-50 border-sky-100">
                  <Info size={24} color="#0ea5e9" strokeWidth={2} />
                </View>
                <Text className="text-lg font-bold text-slate-800">{title}</Text>
              </View>
              <TouchableOpacity onPress={onClose} className="p-1.5 rounded-lg bg-slate-50 active:bg-slate-100">
                <X size={20} color="#94a3b8" />
              </TouchableOpacity>
            </View>
            <ScrollView className="p-6">
              <Text className="text-sm text-slate-600 leading-relaxed text-justify mb-4">
                {message}
              </Text>
            </ScrollView>
            <View className="p-5 bg-slate-50 border-t border-slate-100">
              <TouchableOpacity
                onPress={onClose}
                activeOpacity={0.7}
                className="w-full py-3 bg-sky-500 rounded-xl justify-center items-center shadow-sm shadow-sky-200"
              >
                <Text className="text-white font-bold text-sm">{buttonText}</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}