import { useCallback } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { ListTodo, Clock, Plus, ChevronRight } from 'lucide-react-native';

import Header from '../../../components/Header';
import CustomCard from '../../../components/CustomCard';
import CustomButton from '../../../components/CustomButton';
import EmptyState from '../../../components/EmptyState';
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
    <View style={styles.container}>
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
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={() => <EmptyState message="Nenhuma tarefa encontrada." />}
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

      <View style={styles.floatingButtonContainer}>
        <CustomButton 
          label="Nova Tarefa" 
          icon={Plus} 
          onPress={handleCreateTask}
          disabled={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 100,
  },
  floatingButtonContainer: {
    position: 'absolute',
    bottom: 24,
    width: '100%',
  }
});