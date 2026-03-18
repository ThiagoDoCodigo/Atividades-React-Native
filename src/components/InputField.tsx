import { useState } from 'react';
import { View, Text, TextInput, TextInputProps, StyleSheet } from 'react-native';

interface InputFieldProps extends TextInputProps {
  label: string;
}

export default function InputField({ label, onFocus, onBlur, style, ...rest }: InputFieldProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label}
      </Text>
      <TextInput
        style={[
          styles.input,
          isFocused && styles.inputFocused,
          style 
        ]}
        placeholderTextColor="#94a3b8"
        onFocus={(e) => {
          setIsFocused(true);
          onFocus?.(e);
        }}
        onBlur={(e) => {
          setIsFocused(false);
          onBlur?.(e);
        }}
        {...rest}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: '100%',
  },
  label: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 6,
    marginLeft: 4,
  },
  input: {
    width: '100%',
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 48,
    color: '#334155',
    fontSize: 14,
  },
  inputFocused: {
    borderColor: '#0ea5e9',
    backgroundColor: '#ffffff',
  },
});