'use client';

import { createContext } from 'react';

import { NotificationContextType } from '../types/NotificationContextType';

export const NotificationContext =
  createContext<NotificationContextType | null>(null);
