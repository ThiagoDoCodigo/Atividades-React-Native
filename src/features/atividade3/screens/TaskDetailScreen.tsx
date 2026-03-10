import React, { useEffect, useState } from 'react';
import { View, Text, Keyboard } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Save, Trash2, ClipboardList } from 'lucide-react-native';

import Header from '../../../components/Header';
import InputField from '../../../components/InputField';
import ActionButton from '../../../components/ActionButton';
import CustomButton from '../../../components/CustomButton';
import ConfirmationModal from '../../../components/ConfirmationModal';
import { useTaskDetailViewModel } from '../viewModel/taskDetail.viewModel';

export default function TaskDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute<any>();
  const taskId = route.params?.taskId;
  
  const { viewModel, title, description, error } = useTaskDetailViewModel();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    viewModel.loadTask(taskId);
    if (taskId) {
      navigation.setOptions({ title: 'Editar Tarefa' });
    } else {
      navigation.setOptions({ title: 'Nova Tarefa' });
    }
  }, [taskId, viewModel, navigation]);

  const handleSave = async () => {
    Keyboard.dismiss();
    const success = viewModel.saveTask(taskId);
    if (success) {
      await new Promise(resolve => setTimeout(resolve, 600)); 
      setTimeout(() => navigation.goBack(), 600);
    }else{
      throw new Error(error);
    }
  };

  const handleDelete = () => {
    viewModel.deleteTask(taskId);
    navigation.goBack();
  };

  return (
    <View className="flex-1">
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
        title="Excluir Tarefa"
        message="Tem certeza que deseja apagar esta tarefa? Esta ação não pode ser desfeita."
        confirmText="Sim, excluir"
        isDestructive={true}
      />

      <Header 
        title={taskId ? "Detalhes da Tarefa" : "Criar Tarefa"} 
        subtitle="Preencha os dados abaixo" 
        icon={ClipboardList} 
        iconColor="#0ea5e9" 
        iconBgColor="#e0f2fe" 
      />

      <View className="flex-1">
        <InputField 
          label="Título da Tarefa *" 
          placeholder="Ex: Estudar React Native" 
          value={title}
          onChangeText={(text) => viewModel.setTitle(text)}
        />
        {error ? <Text className="text-red-500 text-xs ml-1 mb-4 -mt-2 font-medium">{error}</Text> : null}

        <InputField 
          label="Descrição (Opcional)" 
          placeholder="Detalhes adicionais..." 
          value={description}
          onChangeText={(text) => viewModel.setDescription(text)}
          multiline
          numberOfLines={4}
          style={{ height: 100, textAlignVertical: 'top', paddingTop: 12 }}
        />
      </View>

      <View className="pb-8 gap-3">
        <ActionButton 
          label="Salvar Tarefa" 
          errorLabel='Erro ao salvar tarefa'
          icon={Save} 
          onPress={handleSave} 
        />
        
        {taskId && (
          <CustomButton 
            label="Excluir Tarefa" 
            icon={Trash2} 
            variant="danger" 
            onPress={() => setIsModalOpen(true)} 
          />
        )}
      </View>
    </View>
  );
}