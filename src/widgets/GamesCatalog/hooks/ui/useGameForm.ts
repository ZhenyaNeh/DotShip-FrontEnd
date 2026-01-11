import {
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import {
  GameFormSchema,
  TypeGameFormSchema,
  TypeRuleFormSchema,
} from '../../schemas';

import { Difficulty, GameMode, GameWithRules } from '@/src/shared/lib/types';

export const useGameForm = (game?: GameWithRules) => {
  const [open, setOpen] = useState(false);
  const [rulesOpen, setRulesOpen] = useState(false);
  const [rules, setRules] = useState<TypeRuleFormSchema[]>([]);
  const [editingRuleOrder, setEditingRuleOrder] = useState<number | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const form = useForm<TypeGameFormSchema>({
    resolver: zodResolver(GameFormSchema),
    defaultValues: {
      displayName: game?.displayName || '',
      picture: game?.picture || '',
      minPlayers: game?.minPlayers || 2,
      maxPlayers: game?.maxPlayers || 2,
      description: game?.description || '',
      isVisible: game?.isVisible || true,
      gameMode: game?.gameMode || GameMode.CLASSIC,
      difficulty: game?.difficulty || Difficulty.EASY,
      estimatedTime: game?.estimatedTime || 30,
      rules: rules,
    },
  });

  // useEffect(() => {
  //   const defaultValues = {
  //     displayName: game?.displayName || '',
  //     picture: game?.picture || '',
  //     minPlayers: game?.minPlayers || 2,
  //     maxPlayers: game?.maxPlayers || 2,
  //     description: game?.description || '',
  //     isVisible: game?.isVisible ?? true,
  //     gameMode: game?.gameMode || GameMode.CLASSIC,
  //     difficulty: game?.difficulty || Difficulty.EASY,
  //     estimatedTime: game?.estimatedTime || 30,
  //     rules: game?.rules || [],
  //   };

  //   setRules(game?.rules || []);

  //   form.reset(defaultValues);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [open]);

  useEffect(() => {
    setRules(game?.rules || []);
    form.setValue('rules', rules);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game?.rules]);

  const handleOpenChange = () => {
    const defaultValues = {
      displayName: game?.displayName || '',
      picture: game?.picture || '',
      minPlayers: game?.minPlayers || 2,
      maxPlayers: game?.maxPlayers || 2,
      description: game?.description || '',
      isVisible: game?.isVisible ?? true,
      gameMode: game?.gameMode || GameMode.CLASSIC,
      difficulty: game?.difficulty || Difficulty.EASY,
      estimatedTime: game?.estimatedTime || 30,
      rules: game?.rules || [],
    };

    setRules(game?.rules || []);

    form.reset(defaultValues);

    setOpen(!open);
  };

  const handleEditRule = (order: number) => {
    setEditingRuleOrder(order);
    setRulesOpen(true);
  };

  const handleRuleSubmit = (rule: TypeRuleFormSchema) => {
    if (editingRuleOrder !== null) {
      handleUpdateRule(editingRuleOrder, rule);
    } else {
      handleAddRule(rule);
    }
    setEditingRuleOrder(null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    const oldIndex = rules.findIndex(
      rule => rule.order?.toString() === active.id
    );
    const newIndex = rules.findIndex(
      rule => rule.order?.toString() === over.id
    );

    if (oldIndex === -1 || newIndex === -1) {
      return;
    }

    const newRules = arrayMove(rules, oldIndex, newIndex);

    const reorderedRules = newRules.map((rule, index) => ({
      ...rule,
      order: index + 1,
    }));

    setRules(reorderedRules);

    form.setValue('rules', reorderedRules);
  };

  const handleAddRule = (rule: TypeRuleFormSchema) => {
    const newRules = [...rules, { ...rule, order: rules.length + 1 }];
    setRules(newRules);

    form.setValue('rules', newRules);
  };

  const handleUpdateRule = (order: number, updatedRule: TypeRuleFormSchema) => {
    const newRules = rules.map(rule =>
      rule.order === order ? { ...updatedRule, order } : rule
    );

    setRules(newRules);

    form.setValue('rules', newRules);
  };

  const handleDeleteRule = (index: number) => {
    const newRules = rules.filter(rule => rule.order !== index);
    const reorderedRules = newRules.map((rule, idx) => ({
      ...rule,
      order: idx + 1,
    }));

    setRules(reorderedRules);

    form.setValue('rules', reorderedRules);
  };

  return {
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
    handleAddRule,
    handleUpdateRule,
    handleDeleteRule,
    handleOpenChange,
    handleEditRule,
    handleRuleSubmit,
  };
};
