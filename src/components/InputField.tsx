import { View, Text, TextInput, TextInputProps } from 'react-native';

interface InputFieldProps extends TextInputProps {
  label: string;
}

export default function InputField({ label, ...rest }: InputFieldProps) {
  return (
    <View className="mb-4 w-full">
      <Text className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 ml-1">
        {label}
      </Text>
      <TextInput
        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 h-12 text-slate-700 text-sm focus:border-sky-500 focus:bg-white transition-colors"
        placeholderTextColor="#94a3b8"
        {...rest}
      />
    </View>
  );
}