import { useState } from 'react';
import { View, TextInput, TextInputProps, StyleSheet } from 'react-native';
import { colors } from '../config/theme';
import Typography from './Typography';

interface InputFieldProps extends TextInputProps {
  label: string;
  error?: string;
}

export default function InputField({ label, error, onFocus, onBlur, style, ...rest }: InputFieldProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      <Typography variant="label" style={styles.label}>
        {label}
      </Typography>
      <TextInput
        style={[
          styles.input,
          isFocused && styles.inputFocused,
          error ? styles.inputError : null,
          style 
        ]}
        placeholderTextColor={colors.text.muted}
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
      {error ? <Typography style={styles.errorText} color={colors.danger.main}>{error}</Typography> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: '100%',
  },
  label: {
    marginBottom: 6,
    marginLeft: 4,
  },
  input: {
    width: '100%',
    backgroundColor: colors.surfaceHighlight,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 48,
    color: colors.text.primary,
    fontSize: 14,
  },
  inputFocused: {
    borderColor: colors.primary.main,
    backgroundColor: colors.surface,
  },
  inputError: {
    borderColor: colors.danger.main,
  },
  errorText: {
    fontSize: 11,
    marginLeft: 4,
    marginTop: 4,
    fontWeight: '500',
  }
});