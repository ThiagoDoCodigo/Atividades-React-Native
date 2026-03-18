import { useState } from 'react';
import { View, ScrollView, Keyboard, TouchableOpacity, StyleSheet } from 'react-native';
import { Plus, ListChecks, Trash2 } from 'lucide-react-native';
import InputField from '../../../../components/InputField';
import ActionButton from '../../../../components/ActionButton';
import ConfirmationModal from '../../../../components/ConfirmationModal';
import Typography from '../../../../components/Typography';
import EmptyState from '../../../../components/EmptyState';

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
    <View style={styles.container}>
      <ConfirmationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={confirmDelete}
        title="Excluir Item"
        message="Tem certeza que deseja apagar este item da sua lista? Esta ação não pode ser desfeita."
        confirmText="Excluir"
        isDestructive={true} 
      />

      <Typography variant="title" style={styles.title}>
        Ex. 3: Lista de itens dinâmica
      </Typography>
      
      <View style={styles.inputSection}>
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
        />
      </View>

      <View style={styles.listHeader}>
        <ListChecks size={16} color="#64748b" />
        <Typography variant="label">
          Meus Itens ({itens.length})
        </Typography>
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {itens.length === 0 ? (
          <EmptyState message="Sua lista está vazia." />
        ) : (
          <View style={styles.listContainer}>
            {itens.map((item, index) => (
              <View key={index} style={styles.listItem}>
                <View style={styles.avatar}>
                  <Typography variant="caption" color="#0284c7" weight="bold">
                    {index + 1}
                  </Typography>
                </View>
                
                <Typography variant="body" weight="medium" style={styles.itemText}>
                  {item}
                </Typography>

                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => requestDelete(index)}
                  style={styles.deleteButton}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    marginBottom: 8,
  },
  inputSection: {
    marginBottom: 16,
  },
  listHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    padding: 12,
  },
  scrollContent: {
    paddingBottom: 16,
  },
  listContainer: {
    gap: 8,
  },
  listItem: {
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#e0f2fe',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemText: {
    flex: 1,
    color: '#334155',
  },
  deleteButton: {
    width: 32,
    height: 32,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fef2f2',
  }
});