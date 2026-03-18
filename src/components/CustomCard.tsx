import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../config/theme';
import Typography from './Typography';

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
    <View style={styles.card}>
      <View style={styles.rowStart}>
        {image && (
          <Image
            source={{ uri: image }}
            style={[styles.image, { width: 64, height: 64, borderRadius: 32 }]}
            resizeMode="contain"
           />
        )}
        <View style={styles.flex1}>
          <View style={styles.titleRow}>
            <Typography variant="title" style={styles.title} numberOfLines={1}>
              {title}
            </Typography>
            {RightIcon && onPressRight && (
              <TouchableOpacity onPress={onPressRight} style={styles.rightIconButton}>
                <RightIcon size={16} color={colors.text.muted} />
              </TouchableOpacity>
            )}
          </View>
          <Typography variant="body" color={colors.text.secondary} style={styles.description} numberOfLines={2}>
            {description || 'Sem descrição'}
          </Typography>
          {subDescription && SubIcon && (
            <View style={styles.subDescriptionRow}>
              <SubIcon size={14} color={colors.primary.main} />
              <Typography variant="caption" weight="semibold" color={colors.primary.main} style={styles.subDescriptionText} numberOfLines={1}>
                {subDescription}
              </Typography>
            </View>
          )}
        </View>
      </View>
      {onPressBottom && (
        <TouchableOpacity
          onPress={onPressBottom}
          activeOpacity={0.7}
          style={styles.bottomButton}
        >
          <Typography variant="body" weight="bold" color={colors.text.primary}>
            {bottomButtonText}
          </Typography>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  rowStart: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  image: {
    backgroundColor: colors.surfaceHighlight,
    marginRight: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  flex1: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    marginBottom: 4,
    flex: 1,
    paddingRight: 8,
  },
  rightIconButton: {
    padding: 4,
    backgroundColor: colors.background,
    borderRadius: 9999,
  },
  description: {
    marginBottom: 8,
  },
  subDescriptionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
  },
  subDescriptionText: {
    flex: 1,
  },
  bottomButton: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.surfaceHighlight,
    alignItems: 'center',
  },
});