interface FormFieldConfig {
  name: 'name' | 'email';
  label: string;
  placeholder: string;
  type: string;
}

export const profileSettingsFields: FormFieldConfig[] = [
  {
    name: 'name',
    label: 'Name',
    placeholder: 'John',
    type: 'text',
  },
  {
    name: 'email',
    label: 'Email',
    placeholder: 'john@example.com',
    type: 'email',
  },
];
