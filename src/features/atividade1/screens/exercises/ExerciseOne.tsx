import { useState } from 'react';
import { View, Keyboard, StyleSheet } from 'react-native';
import { Send } from 'lucide-react-native';
import InputField from '../../../../components/InputField';
import ActionButton from '../../../../components/ActionButton';
import Typography from '../../../../components/Typography';

export default function ExerciseOne({ onShowAlert }: any) {
  const [nome, setNome] = useState('');

  const handleExibirAlerta = async () => {
    Keyboard.dismiss();
    if (!nome.trim()) {
      onShowAlert('Atenção', 'Por favor, digite seu nome primeiro.', 'warning');
      return;
    }
    onShowAlert('Sucesso!', `Nome capturado: ${nome}`, 'success');
    setNome('');
  };

  return (
    <View style={styles.container}>
      <Typography variant="title" style={styles.title}>
        Ex. 1: Input de usuário e alerta
      </Typography>
      <Typography variant="subtitle" style={styles.description}>
        Digite seu nome abaixo. Ao confirmar, o aplicativo exibirá um alerta com o nome capturado.
      </Typography>
      
      <InputField label="Nome do Usuário" placeholder="Ex: Thiago Ferreira" value={nome} onChangeText={setNome} />
      
      <View style={styles.buttonContainer}>
        <ActionButton label="Exibir Nome" icon={Send} variant="primary" onPress={handleExibirAlerta} />
      </View>
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
  description: {
    marginBottom: 24,
  },
  buttonContainer: {
    marginTop: 8,
  }
});