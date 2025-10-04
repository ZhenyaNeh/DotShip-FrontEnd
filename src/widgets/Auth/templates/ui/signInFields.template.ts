import { TypeSignInSchema } from '../../schemas';

interface FormFieldConfig {
  name: keyof TypeSignInSchema;
  label: string;
  placeholder: string;
  type: string;
}

export const signInFormFields: FormFieldConfig[] = [
  {
    name: 'email',
    label: 'Email',
    placeholder: 'john@example.com',
    type: 'email',
  },
  {
    name: 'password',
    label: 'Password',
    placeholder: '******',
    type: 'password',
  },
];
