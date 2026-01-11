'use client';

import { DndContext, closestCorners } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Loader2, Pen } from 'lucide-react';
import Image from 'next/image';
import React, { FC } from 'react';

import { GAME_ICONS } from '../../../../shared/lib/utils';
import { useGameForm, useUpdateGameMutation } from '../../hooks';
import { useCreateGameMutation } from '../../hooks/ui/useCreateGameMutation';
import { TypeGameFormSchema } from '../../schemas';
import { RuleFormDialog } from '../RuleSortableList/RuleFormDialog';
import { SortableRuleItem } from '../RuleSortableList/SortableRuleItem';

import { GameImageCrop } from './GameImageCrop';
import { getImage } from '@/src/shared/lib/get-image';
import { Difficulty, GameMode, GameWithRules } from '@/src/shared/lib/types';
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/src/shared/ui/Form/Form';
import { Input } from '@/src/shared/ui/Input/Input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/src/shared/ui/Select/Select';
import { Switch } from '@/src/shared/ui/Switch/Switch';
import { Textarea } from '@/src/shared/ui/Textarea/Textarea';

interface Props {
  game?: GameWithRules;
}

export const GameForm: FC<Props> = props => {
  const { game } = props;

  const { create, isLoading: isLoadingCreate } = useCreateGameMutation();
  const { update, isLoading: isLoadingUpdate } = useUpdateGameMutation();

  const {
    form,
    rules,
    open,
    rulesOpen,
    editingRuleOrder,
    sensors,
    setRules,
    setOpen,
    setRulesOpen,
    setEditingRuleOrder,
    handleDragEnd,
    handleDeleteRule,
    handleOpenChange,
    handleEditRule,
    handleRuleSubmit,
  } = useGameForm(game);

  const onSubmit = (values: TypeGameFormSchema) => {
    try {
      if (game) {
        update({ gameId: game.id, data: values });
      } else {
        create(values);
      }
    } finally {
      form.reset();
      setRules([]);
      setOpen(false);
    }
  };

  const handleClose = () => {
    form.reset();
    setRules([]);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant='outline'>{game ? <Pen /> : 'Add game'}</Button>
      </DialogTrigger>
      <DialogContent className='max-h-[90vh] max-w-2xl overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>{game ? 'Edit game' : 'Add game'}</DialogTitle>
          <DialogDescription>
            Fill out the game information. All fields are required.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <FormField
              control={form.control}
              name='displayName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Game name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Sea Battle: Classic'
                      disabled={isLoadingCreate || isLoadingUpdate}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {game && (
              <div className='space-y-4'>
                <FormLabel>Game Image</FormLabel>
                {game.picture ? (
                  <div className='relative h-60 w-full'>
                    <Image
                      src={getImage(game.picture)}
                      alt={game.displayName}
                      fill
                      className='object-cover'
                      sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                    />
                  </div>
                ) : (
                  <div className='flex h-60 w-full items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600'>
                    <span className='text-6xl'>
                      {GAME_ICONS[game.gameMode]}
                    </span>
                  </div>
                )}
                <div className='flex items-start gap-4'>
                  <FormField
                    control={form.control}
                    name='picture'
                    render={({ field }) => (
                      <FormItem className='flex-1'>
                        <FormControl>
                          <Input
                            placeholder='https://example.com/image.jpg'
                            disabled={isLoadingCreate || isLoadingUpdate}
                            value={field.value || ''}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <FormDescription>
                          Enter image URL or upload using the crop tool
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div>
                    <GameImageCrop game={game} />
                  </div>
                </div>
              </div>
            )}

            <div className='grid grid-cols-2 gap-4'>
              <FormField
                control={form.control}
                name='minPlayers'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Minimum number of players</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        min='1'
                        max='5'
                        disabled={isLoadingCreate || isLoadingUpdate}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='maxPlayers'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Maximum number of players</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        min='1'
                        max='10'
                        disabled={isLoadingCreate || isLoadingUpdate}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name='estimatedTime'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estimated playing time (minutes)</FormLabel>
                  <FormControl>
                    <Input
                      type='number'
                      min='1'
                      max='300'
                      disabled={isLoadingCreate || isLoadingUpdate}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='grid grid-cols-2 gap-4'>
              <FormField
                control={form.control}
                name='gameMode'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Game mode</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={isLoadingCreate || isLoadingUpdate}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select a game mode' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(GameMode).map(mode => (
                          <SelectItem key={mode} value={mode}>
                            {mode}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='difficulty'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Difficulty</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={isLoadingCreate || isLoadingUpdate}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select a difficulty' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(Difficulty).map(diff => (
                          <SelectItem key={diff} value={diff}>
                            {diff}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Describe the rules and features of the game...'
                      className='min-h-[100px]'
                      disabled={isLoadingCreate || isLoadingUpdate}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='isVisible'
              render={({ field }) => (
                <FormItem className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
                  <div className='space-y-0.5'>
                    <FormLabel>Is visible</FormLabel>
                    <FormDescription>
                      {
                        "You can change the game's visibility for all users who are not administrators."
                      }
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={isLoadingCreate || isLoadingUpdate}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className='space-y-4'>
              <div className='flex items-center justify-between'>
                <FormLabel className='text-base'>Game Rules</FormLabel>
                <RuleFormDialog
                  open={rulesOpen}
                  onOpenChange={open => {
                    setRulesOpen(open);
                    if (!open) setEditingRuleOrder(null);
                  }}
                  onSubmitRule={handleRuleSubmit}
                  editingRule={rules.find(
                    rule => rule.order === editingRuleOrder
                  )}
                  ruleCount={rules.length}
                />
              </div>

              {form.formState.errors.rules && (
                <p className='text-destructive text-sm font-medium'>
                  {form.formState.errors.rules.message}
                </p>
              )}

              {rules.length === 0 ? (
                <div className='rounded-lg border border-dashed p-8 text-center'>
                  <p className='text-muted-foreground'>No rules added yet</p>
                  <p className='text-muted-foreground mt-1 text-sm'>
                    {'Click \"Add Rule\" to add your first rule'}
                  </p>
                </div>
              ) : (
                <DndContext
                  sensors={sensors}
                  onDragEnd={handleDragEnd}
                  collisionDetection={closestCorners}
                >
                  <SortableContext
                    items={rules.map(rule => rule.order?.toString() || '')}
                    strategy={verticalListSortingStrategy}
                  >
                    <div className='space-y-2'>
                      {rules.map((rule, index) => (
                        <SortableRuleItem
                          key={rule.order}
                          rule={rule}
                          index={index}
                          onEdit={handleEditRule}
                          onDelete={handleDeleteRule}
                        />
                      ))}
                    </div>
                  </SortableContext>
                </DndContext>
              )}
            </div>

            <DialogFooter>
              <Button type='button' variant='outline' onClick={handleClose}>
                Cancel
              </Button>
              <Button type='submit'>
                {isLoadingCreate || isLoadingUpdate ? (
                  <Loader2 className='animate-spin' />
                ) : game ? (
                  'Save changes'
                ) : (
                  'Add game'
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
