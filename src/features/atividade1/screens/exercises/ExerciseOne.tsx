import { useState } from 'react';
import { View, Text, Keyboard, Alert } from 'react-native';
import { Send } from 'lucide-react-native';
import InputField from '../../../../components/InputField';
import ActionButton from '../../../../components/ActionButton';

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
    <View className="flex-1">
      <Text className="font-bold text-slate-700 mb-2">Ex. 1: Input de usuário e alerta</Text>
      <Text className="text-sm text-slate-500 mb-6 leading-relaxed">
        Digite seu nome abaixo. Ao confirmar, o aplicativo exibirá um alerta com o nome capturado.
      </Text>
      <InputField label="Nome do Usuário" placeholder="Ex: Thiago Ferreira" value={nome} onChangeText={setNome} />
      <View className="mt-2">
        <ActionButton label="Exibir Nome" icon={Send} variant="primary" onPress={handleExibirAlerta} />
      </View>
    </View>
  );
}