import { View, StyleSheet } from 'react-native';
import { colors } from '../config/theme';
import Typography from './Typography';

interface EmptyStateProps {
  message?: string;
}

export default function EmptyState({ message = 'Nenhum item encontrado.' }: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <Typography 
        variant="caption" 
        color={colors.text.muted} 
        italic 
        align="center"
      >
        {message}
      </Typography>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});