import { useEffect, useRef } from 'react';
import { Modal, View, Text, TouchableOpacity, Pressable, Animated, ScrollView, StyleSheet } from 'react-native';
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
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable onPress={(e) => e.stopPropagation()} style={styles.container}>
          <Animated.View
            style={[
              styles.modal,
              { transform: [{ scale: scaleAnim }], opacity: opacityAnim }
            ]}
          >
            <View style={styles.header}>
              <View style={styles.headerLeft}>
                <View style={styles.iconContainer}>
                  <Info size={24} color="#0ea5e9" strokeWidth={2} />
                </View>
                <Text style={styles.title}>{title}</Text>
              </View>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <X size={20} color="#94a3b8" />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.body}>
              <Text style={styles.message}>
                {message || "Nenhuma mensagem foi informada."}
              </Text>
            </ScrollView>
            <View style={styles.footer}>
              <TouchableOpacity
                onPress={onClose}
                activeOpacity={0.7}
                style={styles.actionButton}
              >
                <Text style={styles.buttonText}>{buttonText}</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.4)',
    paddingHorizontal: 20,
  },
  container: {
    width: '100%',
  },
  modal: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    width: '100%',
    borderWidth: 1,
    borderColor: '#f1f5f9',
    height: 'auto',
    maxHeight: '90%',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 25 },
    shadowOpacity: 0.25,
    shadowRadius: 50,
    elevation: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconContainer: {
    padding: 8,
    borderRadius: 9999,
    borderWidth: 1,
    backgroundColor: '#f0f9ff',
    borderColor: '#e0f2fe',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  closeButton: {
    padding: 6,
    borderRadius: 8,
    backgroundColor: '#f8fafc',
  },
  body: {
    padding: 24,
  },
  message: {
    fontSize: 14,
    color: '#475569',
    lineHeight: 22,
    textAlign: 'justify',
    marginBottom: 16,
  },
  footer: {
    padding: 20,
    backgroundColor: '#f8fafc',
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  actionButton: {
    width: '100%',
    paddingVertical: 12,
    backgroundColor: '#0ea5e9',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#bae6fd',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 2,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});