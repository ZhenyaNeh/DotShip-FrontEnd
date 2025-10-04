'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { FC, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { useSignInMutation } from '../../hooks';
import { SignInSchema, TypeSignInSchema } from '../../schemas';
import { signInFormFields } from '../../templates';
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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/src/shared/ui/InputOtp/InputOtp';

export const SignInForm: FC = () => {
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);
  const [isShowTwoFactor, setIsShowFactor] = useState(false);

  const form = useForm<TypeSignInSchema>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { signIn, isLoadingSignIn } = useSignInMutation(setIsShowFactor);

  const onSubmit = (values: TypeSignInSchema) => {
    if (recaptchaValue) {
      signIn({ values, recaptcha: recaptchaValue });
    } else {
      toast.error('Please complete reCAPTCHA');
    }
  };

  return (
    <AuthWrapper
      heading='Sign In'
      description='Login with your Google or Yandex account'
      backButtonLabel="Don't have an account? Sign Up"
      backButtonHref='/auth/sign-up'
      isShowSocialAuth
    >
      <div className='mt-6 grid gap-6'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='grid gap-2 space-y-2'
          >
            {isShowTwoFactor && (
              <FormField
                control={form.control}
                name='code'
                render={({ field }) => (
                  <FormItem className='flex flex-wrap justify-center'>
                    <FormLabel>One-Time Code</FormLabel>
                    <FormControl>
                      {/* <Input
                        placeholder='123456'
                        disabled={isLoadingSignIn}
                        {...field}
                      /> */}
                      <InputOTP
                        maxLength={6}
                        disabled={isLoadingSignIn}
                        {...field}
                      >
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {!isShowTwoFactor &&
              signInFormFields.map(fieldItem => (
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
                          disabled={isLoadingSignIn}
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
            <Button type='submit' disabled={isLoadingSignIn}>
              {!isLoadingSignIn ? (
                'Sign In'
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
