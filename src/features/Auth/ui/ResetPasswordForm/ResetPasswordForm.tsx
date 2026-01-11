'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { FC, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { useResetPasswordMutation } from '../../hooks';
import { ResetPasswordSchema, TypeResetPasswordSchema } from '../../schemas';
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

  const form = useForm<TypeResetPasswordSchema>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const { reset, isLoadingReset } = useResetPasswordMutation();

  const onSubmit = (values: TypeResetPasswordSchema) => {
    if (recaptchaValue) {
      reset({ values, recaptcha: recaptchaValue });
    } else {
      toast.error('Пожалуйста, завершите reCAPTCHA');
    }
  };
  return (
    <AuthWrapper
      heading='Reset password'
      description='To reset your password, enter your email'
      backButtonLabel='Sign in'
      backButtonHref='/auth/sign-in'
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='grid gap-2 space-y-2'
        >
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder='john@example.com'
                    disabled={isLoadingReset}
                    type='email'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='flex justify-center'>
            <ReCAPTCHA
              sitekey={process.env.GOOGLE_RECAPTCHA_SITE_KEY as string}
              onChange={setRecaptchaValue}
              theme={'light'}
            />
          </div>
          <Button type='submit' disabled={isLoadingReset}>
            {!isLoadingReset ? (
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
