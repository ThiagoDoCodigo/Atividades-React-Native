import { View, Text, ScrollView, Image } from 'react-native';
import { Image as ImageIcon } from 'lucide-react-native';

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
    <View className="flex-1 pb-2">
      <View className="flex-row items-center justify-between mb-4">
        <View>
          <Text className="font-bold text-slate-700">Ex. 2: Galeria com ScrollView</Text>
          <Text className="text-sm text-slate-500 mt-1">Exibindo 6 imagens sequenciais.</Text>
        </View>
        <View className="p-2 bg-slate-100 rounded-lg">
          <ImageIcon size={18} color="#64748b" />
        </View>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        className="flex-1 rounded-xl bg-slate-50 border border-slate-100 p-3"
      >
        <View className="gap-3 pb-4 mb-2">
          {images.map((img) => (
            <View key={img.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <Image 
                source={{ uri: img.uri }} 
                className="w-full h-60"
                resizeMode="cover"
              />
              <View className="p-2 bg-white">
                <Text className="text-[10px] font-bold text-slate-400 uppercase text-center">
                  Imagem {img.id}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}