import { useEffect, useRef } from 'react';
import { Modal, View, TouchableOpacity, Pressable, Animated, ScrollView, StyleSheet } from 'react-native';
import { Info, X } from 'lucide-react-native';
import { colors } from '../config/theme';
import Typography from './Typography';
import Button from './CustomButton';

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
                  <Info size={24} color={colors.info.main} strokeWidth={2} />
                </View>
                <Typography variant="title" style={styles.titleText}>
                  {title}
                </Typography>
              </View>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <X size={20} color={colors.text.muted} />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.body}>
              <Typography variant="body" align="justify" style={styles.message}>
                {message || "Nenhuma mensagem foi informada."}
              </Typography>
            </ScrollView>
            
            <View style={styles.footer}>
              <Button 
                label={buttonText} 
                onPress={onClose} 
                variant="primary" 
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
    backgroundColor: colors.primary.faded,
    borderColor: colors.primary.light,
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
  message: {
    marginBottom: 28,
  },
  footer: {
    padding: 20,
    backgroundColor: colors.surfaceHighlight,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
});