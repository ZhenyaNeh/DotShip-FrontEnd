'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { FC, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { useSignUpMutation } from '../../hooks';
import { SignUpSchema, TypeSignUpSchema } from '../../schemas';
import { signUpFormFields } from '../../templates';
import { AuthWrapper } from '../AuthWrapper/AuthWrapper';

import { Button } from '@/src/shared/ui/Button/Button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/src/shared/ui/Form/Form';
import { Input } from '@/src/shared/ui/Input/Input';

export const SignUpForm: FC = () => {
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);

  const form = useForm<TypeSignUpSchema>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      passwordRepeat: '',
    },
  });

  const { signUp, isLoadingSignUp } = useSignUpMutation();

  const onSubmit = (values: TypeSignUpSchema) => {
    if (recaptchaValue) {
      signUp({ values, recaptcha: recaptchaValue });
    } else {
      toast.error('Please complete reCAPTCHA');
    }
  };

  return (
    <AuthWrapper
      heading='Sign Up'
      description='Register with your Google or Yandex account'
      backButtonLabel='Already have an account? Sign In'
      backButtonHref='/auth/sign-in'
      isShowSocialAuth
    >
      <div className='mt-6 grid gap-6'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='grid gap-2 space-y-2'
          >
            {signUpFormFields.map(fieldItem => (
              <FormField
                key={fieldItem.name}
                control={form.control}
                name={fieldItem.name}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{fieldItem.label}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={fieldItem.placeholder}
                        type={fieldItem.type}
                        disabled={isLoadingSignUp}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <div className='flex justify-center'>
              <ReCAPTCHA
                sitekey={process.env.GOOGLE_RECAPTCHA_SITE_KEY as string}
                onChange={setRecaptchaValue}
                theme={'light'}
              />
            </div>
            <Button type='submit' disabled={isLoadingSignUp}>
              {!isLoadingSignUp ? (
                'Sign Up'
              ) : (
                <Loader2 className='animate-spin' />
              )}
            </Button>
          </form>
        </Form>
      </div>
    </AuthWrapper>
  );
};
