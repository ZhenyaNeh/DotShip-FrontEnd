'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React, { FC, HTMLAttributes, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { IUser } from '../../Auth/types';
import { useUpdateProfileMutation } from '../hooks';
import { SettingsSchema, TypeSettingsSchema } from '../schemas';
import { profileSettingsFields } from '../templates';

import { cn } from '@/src/shared/lib/clsx';
import { Button } from '@/src/shared/ui/Button/Button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/src/shared/ui/Dialog/Dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/src/shared/ui/Form/Form';
import { Input } from '@/src/shared/ui/Input/Input';
import { Switch } from '@/src/shared/ui/Switch/Switch';

interface Props extends HTMLAttributes<HTMLDivElement> {
  user?: IUser;
}

export const ProfileSettings: FC<Props> = props => {
  const { user, className, ...otherProps } = props;
  const [open, setOpen] = useState<boolean>(false);
  const { update, isLoading } = useUpdateProfileMutation();

  const form = useForm<TypeSettingsSchema>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      name: user?.displayName || '',
      email: user?.email || '',
      isTwoFactorEnable: user?.isTwoFactorEnable || false,
    },
  });

  useEffect(() => {
    if (open && user) {
      form.reset({
        name: user.displayName || '',
        email: user.email || '',
        isTwoFactorEnable: user.isTwoFactorEnable || false,
      });
    }
  }, [open, user, form]);

  if (!user) {
    return null;
  }

  const onSubmit = (values: TypeSettingsSchema) => {
    if (
      values.email === user.email &&
      values.name === user.displayName &&
      values.isTwoFactorEnable === user.isTwoFactorEnable
    ) {
      toast('No changes detected.', {
        description: "You haven't made any changes to your profile.",
      });
      return;
    }

    if (values.email !== user.email) {
      toast('Your email address has been changed.', {
        description: 'Are you sure you want to apply the changes?',
        action: {
          label: 'Confirm',
          onClick: () => update(values),
        },
      });
      return;
    }

    update(values);
  };

  return (
    <div className={cn('space-y-4', className)} {...otherProps}>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant='outline' className='mt-5'>
            Edit profile
          </Button>
        </DialogTrigger>

        <DialogContent className='w-[430px] max-w-[90vw] space-y-4 rounded-2xl p-6'>
          <DialogHeader>
            <DialogTitle className='text-xl font-semibold'>
              Edit profile settings
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='grid gap-2 space-y-2'
            >
              {profileSettingsFields.map(fieldItem => (
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
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
              <FormField
                control={form.control}
                name='isTwoFactorEnable'
                render={({ field }) => (
                  <FormItem className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
                    <div className='space-y-0.5'>
                      <FormLabel>Two-factor authentication</FormLabel>
                      <FormDescription>
                        Enable two-factor authentication for your account.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className='flex gap-2 pt-2'>
                <DialogClose asChild>
                  <Button variant='outline' className='flex-1 rounded-xl'>
                    Cancel
                  </Button>
                </DialogClose>
                <Button
                  type='submit'
                  className='flex-1 rounded-xl'
                  size='lg'
                  disabled={isLoading}
                >
                  Save
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
