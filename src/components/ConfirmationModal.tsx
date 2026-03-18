import { useEffect, useRef } from 'react';
import { Modal, View, Text, TouchableOpacity, Pressable, Animated, StyleSheet } from 'react-native';
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
        style={styles.backdrop}
        onPress={onClose}
      >
        <Pressable onPress={(e) => e.stopPropagation()} style={styles.container}>
          
          <Animated.View
            style={[
              styles.modal,
              { transform: [{ scale: scaleAnim }], opacity: opacityAnim }
            ]}
          >
            
            <View style={styles.header}>
              <View style={styles.headerLeft}>
                <View 
                  style={[
                    styles.iconContainer,
                    isDestructive ? styles.iconDestructive : styles.iconNormal
                  ]}
                >
                  {isDestructive ? (
                    <AlertTriangle size={24} color="#ef4444" strokeWidth={2} />
                  ) : (
                    <AlertCircle size={24} color="#f59e0b" strokeWidth={2} />
                  )}
                </View>
                <Text style={styles.title}>
                  {title}
                </Text>
              </View>

              <TouchableOpacity
                onPress={onClose}
                style={styles.closeButton}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <X size={20} color="#94a3b8" />
              </TouchableOpacity>
            </View>

            <View style={styles.body}>
              <Text style={styles.message}>
                {message}
              </Text>
            </View>

            <View style={styles.footer}>
              
              <TouchableOpacity
                onPress={onClose}
                activeOpacity={0.7}
                style={styles.cancelButton}
              >
                <Text style={styles.cancelText}>
                  {cancelText}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  onConfirm();
                  onClose();
                }}
                activeOpacity={0.7}
                style={[
                  styles.confirmButton,
                  isDestructive ? styles.confirmDestructive : styles.confirmNormal
                ]}
              >
                <Text style={styles.confirmText}>
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
    overflow: 'hidden',
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: { width: 0, height: 25 },
    shadowOpacity: 1,
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
  },
  iconDestructive: {
    backgroundColor: '#fef2f2',
    borderColor: '#fee2e2',
  },
  iconNormal: {
    backgroundColor: '#fffbeb',
    borderColor: '#fef3c7',
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
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    padding: 20,
    backgroundColor: '#f8fafc',
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  cancelButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelText: {
    color: '#475569',
    fontWeight: 'bold',
    fontSize: 14,
  },
  confirmButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmDestructive: {
    backgroundColor: '#ef4444',
    shadowColor: '#fecaca',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 2,
  },
  confirmNormal: {
    backgroundColor: '#0ea5e9',
    shadowColor: '#bae6fd',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 2,
  },
  confirmText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});