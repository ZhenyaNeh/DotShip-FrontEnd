import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/src/shared/ui/Button/Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/src/shared/ui/Dialog/Dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/src/shared/ui/Form/Form';
import { Input } from '@/src/shared/ui/Input/Input';
import { Textarea } from '@/src/shared/ui/Textarea/Textarea';
import {
  RuleFormSchema,
  TypeRuleFormSchema,
} from '@/src/widgets/GamesCatalog/schemas';

interface RuleFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmitRule: (rule: TypeRuleFormSchema) => void;
  editingRule?: TypeRuleFormSchema | null;
  ruleCount: number;
}

export const RuleFormDialog: FC<RuleFormDialogProps> = props => {
  const { open, onOpenChange, onSubmitRule, editingRule, ruleCount } = props;

  const form = useForm<TypeRuleFormSchema>({
    resolver: zodResolver(RuleFormSchema),
    defaultValues: {
      title: editingRule?.title || '',
      description: editingRule?.description || '',
      order: editingRule?.order || ruleCount + 1,
    },
  });

  useEffect(() => {
    if (open) {
      if (editingRule) {
        form.reset({
          title: editingRule.title,
          description: editingRule.description,
          order: editingRule.order,
        });
      } else {
        form.reset({
          title: '',
          description: '',
          order: ruleCount + 1,
        });
      }
    }
  }, [open, editingRule, ruleCount, form]);

  const handleSubmit = (values: TypeRuleFormSchema) => {
    onSubmitRule(values);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button type='button' variant='outline' className='gap-2'>
          <Plus className='h-4 w-4' />
          Add Rule
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>
            {editingRule ? 'Edit Rule' : 'Add New Rule'}
          </DialogTitle>
          <DialogDescription>
            {editingRule
              ? 'Update the rule details'
              : 'Enter the rule details below'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className='space-y-4'>
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rule Title</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter rule title' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Describe the rule in detail'
                      className='min-h-[100px]'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type='button'
                variant='outline'
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type='button' onClick={form.handleSubmit(handleSubmit)}>
                {editingRule ? 'Update Rule' : 'Add Rule'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
