import React, { useState } from 'react';
import { View, Text, ScrollView, Keyboard, TouchableOpacity } from 'react-native';
import { Plus, ListChecks, Trash2 } from 'lucide-react-native';
import InputField from '../../../components/InputField';
import ActionButton from '../../../components/ActionButton';
import ConfirmationModal from '../../../components/ConfirmationModal';

interface ExerciseThreeProps {
  onShowAlert: Function;
}

export default function ExerciseThree({ onShowAlert }: ExerciseThreeProps) {
  const [itens, setItens] = useState<string[]>([]);
  const [texto, setTexto] = useState('');
  
  const [showModal, setShowModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);

  const handleAdicionarItem = async () => {
    if (!texto.trim()) {
      onShowAlert('Atenção', 'Digite algo para adicionar à lista.', 'warning');
      return;
    }
    
    await new Promise(resolve => setTimeout(resolve, 400));
    setItens([...itens, texto]);
    setTexto('');
    Keyboard.dismiss();
  };

  const requestDelete = (index: number) => {
    setItemToDelete(index);
    setShowModal(true);
  };

  const confirmDelete = () => {
    if (itemToDelete !== null) {
      setItens(itens.filter((_, i) => i !== itemToDelete));
      onShowAlert('Deletado', 'Item removido com sucesso!', 'success');
    }
    setItemToDelete(null);
  };

  return (
    <View className="flex-1">
      <ConfirmationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={confirmDelete}
        title="Excluir Item"
        message="Tem certeza que deseja apagar este item da sua lista? Esta ação não pode ser desfeita."
        confirmText="Excluir"
        isDestructive={true} 
      />

      <Text className="font-bold text-slate-700 mb-2">Ex. 3: Lista de itens dinâmica</Text>
      
      <View className="flex-col mb-4">
        <InputField 
            label="Novo Item" 
            placeholder="O que você precisa fazer?" 
            value={texto}
            onChangeText={setTexto}
            onSubmitEditing={handleAdicionarItem}
        />
        
        <ActionButton 
            label="Adicionar" 
            icon={Plus} 
            variant="primary" 
            onPress={handleAdicionarItem}
            className="w-full" 
        />
     </View>

      <View className="flex-row items-center gap-2 mb-3">
        <ListChecks size={16} color="#64748b" />
        <Text className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          Meus Itens ({itens.length})
        </Text>
      </View>

      <ScrollView 
        className="flex-1 bg-slate-50 rounded-xl border border-slate-200 p-3"
        showsVerticalScrollIndicator={false}
      >
        {itens.length === 0 ? (
          <View className="py-10 items-center justify-center">
            <Text className="text-slate-400 text-sm italic">Sua lista está vazia.</Text>
          </View>
        ) : (
          <View className="gap-2 pb-4 mb-2">
            {itens.map((item, index) => (
              <View 
                key={index} 
                className="bg-white p-3 rounded-lg border border-slate-100 shadow-sm flex-row items-center gap-3"
              >
                <View className="w-6 h-6 rounded-full bg-sky-100 items-center justify-center">
                  <Text className="text-sky-600 font-bold text-xs">{index + 1}</Text>
                </View>
                
                <Text className="text-slate-700 font-medium flex-1">{item}</Text>

                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => requestDelete(index)}
                  className="w-8 h-8 rounded-md items-center justify-center bg-red-50 border border-transparent active:bg-red-100 active:border-red-200 transition-colors"
                >
                  <Trash2 size={16} color="#ef4444" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}