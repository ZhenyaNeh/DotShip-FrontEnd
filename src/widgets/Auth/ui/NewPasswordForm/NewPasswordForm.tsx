'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { FC, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { useNewPasswordMutation } from '../../hooks';
import { NewPasswordSchema, TypeNewPasswordSchema } from '../../schemas';
import { resetPasswordFormFields } from '../../templates';
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

export const ResetPasswordForm: FC = () => {
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);

  const form = useForm<TypeNewPasswordSchema>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: '',
      passwordRepeat: '',
    },
  });

  const { newPassword, isLoadingNew } = useNewPasswordMutation();

  const onSubmit = (values: TypeNewPasswordSchema) => {
    if (recaptchaValue) {
      newPassword({ values, recaptcha: recaptchaValue });
    } else {
      toast.error('Пожалуйста, завершите reCAPTCHA');
    }
  };
  return (
    <AuthWrapper
      heading='Enter new password'
      description='Create a new password for your account.'
      backButtonLabel='Sign in'
      backButtonHref='/auth/sign-in'
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='grid gap-2 space-y-2'
        >
          {resetPasswordFormFields.map(fieldItem => (
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
                      disabled={isLoadingNew}
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
          <Button type='submit' disabled={isLoadingNew}>
            {!isLoadingNew ? (
              'Reset password'
            ) : (
              <Loader2 className='animate-spin' />
            )}
          </Button>
        </form>
      </Form>
    </AuthWrapper>
  );
};
