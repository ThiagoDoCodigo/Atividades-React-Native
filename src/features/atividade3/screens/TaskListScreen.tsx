import { useCallback } from 'react';
import { View, FlatList, Text } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { ListTodo, Clock, Plus, ChevronRight } from 'lucide-react-native';

import Header from '../../../components/Header';
import CustomCard from '../../../components/CustomCard';
import CustomButton from '../../../components/CustomButton';
import { useTaskListViewModel } from '../viewModel/taskList.viewModel';

export default function TaskListScreen() {
  const { viewModel, tasks } = useTaskListViewModel();
  const navigation = useNavigation<any>();

  useFocusEffect(
    useCallback(() => {
      viewModel.loadTasks();
    }, [viewModel])
  );

  const handleCreateTask = () => {
    navigation.navigate('TaskDetail');
  };

  const handleEditTask = (id: string) => {
    navigation.navigate('TaskDetail', { taskId: id });
  };

  return (
    <View className="flex-1">
      <Header 
        title="Minhas Tarefas" 
        subtitle="Organize seu dia a dia" 
        icon={ListTodo} 
        iconColor="#0ea5e9" 
        iconBgColor="#e0f2fe" 
      />

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListEmptyComponent={() => (
          <View className="py-10 items-center justify-center">
            <Text className="text-slate-400 text-sm italic">Nenhuma tarefa encontrada.</Text>
          </View>
        )}
        renderItem={({ item }) => (
          <CustomCard
            title={item.title}
            description={item.description || 'Sem descrição'}
            subDescription={`Criado às ${item.createdAt}`}
            subIcon={Clock}
            bottomButtonText="Visualizar Tarefa"
            onPressBottom={() => handleEditTask(item.id)}
            rightIcon={ChevronRight}
            onPressRight={() => handleEditTask(item.id)}
          />
        )}
      />

      <View className="absolute bottom-6 w-full">
        <CustomButton 
          label="Nova Tarefa" 
          icon={Plus} 
          onPress={handleCreateTask}
          className="w-full"
          disabled={false}
        />
      </View>
    </View>
  );
}