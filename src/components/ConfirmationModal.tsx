import { useEffect, useRef } from 'react';
import { Modal, View, TouchableOpacity, Pressable, Animated, StyleSheet } from 'react-native';
import { AlertCircle, X, AlertTriangle } from 'lucide-react-native';
import { colors } from '../config/theme';
import Typography from './Typography';
import Button from './CustomButton';

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
                    <AlertTriangle size={24} color={colors.danger.main} strokeWidth={2} />
                  ) : (
                    <AlertCircle size={24} color={colors.warning.main} strokeWidth={2} />
                  )}
                </View>
                <Typography variant="title" style={styles.titleText}>
                  {title}
                </Typography>
              </View>

              <TouchableOpacity
                onPress={onClose}
                style={styles.closeButton}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <X size={20} color={colors.text.muted} />
              </TouchableOpacity>
            </View>

            <View style={styles.body}>
              <Typography variant="body" color={colors.text.secondary}>
                {message}
              </Typography>
            </View>

            <View style={styles.footer}>
              
              <Button 
                label={cancelText}
                onPress={onClose}
                variant="outline"
                style={styles.flexButton}
              />

              <Button 
                label={confirmText}
                onPress={() => {
                  onConfirm();
                  onClose();
                }}
                variant={isDestructive ? 'danger' : 'primary'}
                style={styles.flexButton}
              />

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
    backgroundColor: colors.surface,
    borderRadius: 16,
    width: '100%',
    borderWidth: 1,
    borderColor: colors.border,
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
    borderBottomColor: colors.border,
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
    backgroundColor: colors.danger.faded,
    borderColor: colors.danger.light,
  },
  iconNormal: {
    backgroundColor: colors.warning.faded,
    borderColor: colors.warning.light,
  },
  titleText: {
    fontSize: 18, 
  },
  closeButton: {
    padding: 6,
    borderRadius: 8,
    backgroundColor: colors.surfaceHighlight,
  },
  body: {
    padding: 24,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    padding: 20,
    backgroundColor: colors.surfaceHighlight,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  flexButton: {
    paddingHorizontal: 16, 
  }
});