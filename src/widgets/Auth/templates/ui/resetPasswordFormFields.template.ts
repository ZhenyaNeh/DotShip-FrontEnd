interface FormFieldConfig {
  name: 'password' | 'passwordRepeat';
  label: string;
  placeholder: string;
  type: string;
}

export const resetPasswordFormFields: FormFieldConfig[] = [
  {
    name: 'password',
    label: 'Password',
    placeholder: '******',
    type: 'password',
  },
  {
    name: 'passwordRepeat',
    label: 'Password repeat',
    placeholder: '******',
    type: 'password',
  },
];
