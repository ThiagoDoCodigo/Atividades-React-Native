import { useEffect, useRef } from 'react';
import { Modal, View, Text, TouchableOpacity, Pressable, Animated } from 'react-native';
import { AlertCircle, X, AlertTriangle } from 'lucide-react-native';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  isDestructive?: boolean;
}

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title = 'Atenção',
  message = 'Tem certeza que deseja realizar essa ação?',
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  isDestructive = false,
}: ConfirmationModalProps) {
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
    <Modal
      visible={isOpen}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable
        className="flex-1 justify-center items-center bg-slate-900/40 px-5"
        onPress={onClose}
      >
        <Pressable onPress={(e) => e.stopPropagation()} className="w-full">
          
          <Animated.View
            style={{ transform: [{ scale: scaleAnim }], opacity: opacityAnim }}
            className="bg-white rounded-2xl shadow-2xl shadow-black/20 overflow-hidden w-full border border-slate-100"
          >
            
            <View className="flex-row items-center justify-between p-5 border-b border-slate-100">
              <View className="flex-row items-center gap-3">
                <View 
                  className={`p-2 rounded-full border ${
                    isDestructive ? 'bg-red-50 border-red-100' : 'bg-amber-50 border-amber-100'
                  }`}
                >
                  {isDestructive ? (
                    <AlertTriangle size={24} color="#ef4444" strokeWidth={2} />
                  ) : (
                    <AlertCircle size={24} color="#f59e0b" strokeWidth={2} />
                  )}
                </View>
                <Text className="text-lg font-bold text-slate-800">
                  {title}
                </Text>
              </View>

              <TouchableOpacity
                onPress={onClose}
                className="p-1.5 rounded-lg bg-slate-50 active:bg-slate-100"
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <X size={20} color="#94a3b8" />
              </TouchableOpacity>
            </View>

            <View className="p-6">
              <Text className="text-sm text-slate-600 leading-relaxed">
                {message}
              </Text>
            </View>

            <View className="flex-row justify-end gap-3 p-5 bg-slate-50 border-t border-slate-100">
              
              <TouchableOpacity
                onPress={onClose}
                activeOpacity={0.7}
                className="px-5 py-3 bg-white border border-slate-200 rounded-xl justify-center items-center"
              >
                <Text className="text-slate-600 font-bold text-sm">
                  {cancelText}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  onConfirm();
                  onClose();
                }}
                activeOpacity={0.7}
                className={`px-5 py-3 rounded-xl justify-center items-center shadow-sm ${
                  isDestructive ? 'bg-red-500 shadow-red-200' : 'bg-sky-500 shadow-sky-200'
                }`}
              >
                <Text className="text-white font-bold text-sm">
                  {confirmText}
                </Text>
              </TouchableOpacity>

            </View>
          </Animated.View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}