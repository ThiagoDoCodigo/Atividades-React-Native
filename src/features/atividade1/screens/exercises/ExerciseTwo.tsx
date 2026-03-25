import { View, ScrollView, Image, StyleSheet } from 'react-native';
import { Image as ImageIcon } from 'lucide-react-native';
import { Typography } from 'react-native-th-components';

export default function ExerciseTwo() {
  const images = [
    { id: 1, uri: 'https://lncimg.lance.com.br/cdn-cgi/image/width=950,quality=75,fit=pad,format=webp/uploads/2025/12/Filipe-Luis-Flamengo-Festa-do-titulo-scaled-aspect-ratio-512-320.jpg' },
    { id: 2, uri: 'https://i.ytimg.com/vi/dvhlTo4dr2E/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBi6kWYOY3GjdvxAqgU_f6PucJ4Dg' },
    { id: 3, uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2KrGopQGUbLTsiXOagCmn5I-y7rdgDpB1-g&s'},
    { id: 4, uri: 'https://picsum.photos/seed/4/400/200' },
    { id: 5, uri: 'https://picsum.photos/seed/5/400/200' },
    { id: 6, uri: 'https://picsum.photos/seed/6/400/200' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View>
          <Typography variant="title">Ex. 2: Galeria com ScrollView</Typography>
          <Typography variant="caption" style={styles.subtitle}>Exibindo 6 imagens sequenciais.</Typography>
        </View>
        <View style={styles.iconContainer}>
          <ImageIcon size={18} color="#64748b" />
        </View>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {images.map((img) => (
          <View key={img.id} style={styles.card}>
            <Image 
              source={{ uri: img.uri }} 
              style={styles.image}
              resizeMode="cover"
            />
            <View style={styles.cardFooter}>
              <Typography variant="label" align="center">
                Imagem {img.id}
              </Typography>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 8,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  subtitle: {
    marginTop: 4,
  },
  iconContainer: {
    padding: 8,
    backgroundColor: '#f1f5f9',
    borderRadius: 8,
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    padding: 12,
  },
  scrollContent: {
    gap: 12,
    paddingBottom: 16,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  image: {
    width: '100%',
    height: 240,
  },
  cardFooter: {
    padding: 8,
    backgroundColor: '#ffffff',
  }
});