import { TypeSignUpSchema } from '../../schemas';

interface FormFieldConfig {
  name: keyof TypeSignUpSchema;
  label: string;
  placeholder: string;
  type: string;
}

export const signUpFormFields: FormFieldConfig[] = [
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
