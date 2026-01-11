'use client';

import { Crown, Gamepad2, History, TrendingUp, Users } from 'lucide-react';
import React from 'react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import { AdminDashboardStats } from '../types';

import { Badge } from '@/src/shared/ui/Badge/Badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/src/shared/ui/Card/Card';
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/src/shared/ui/Chart/chart';
// Импортируем компоненты графиков shadcn

import { Skeleton } from '@/src/shared/ui/Skeleton/Skeleton';

interface AdminDashboardTabProps {
  adminDashboardStats: AdminDashboardStats | undefined;
  isLoading: boolean;
}

const activityChartConfig = {
  active: {
    label: 'Active Rooms',
    color: 'var(--chart-1)',
  },
  finished: {
    label: 'Finished Games',
    color: 'var(--chart-2)',
  },
} satisfies ChartConfig;

const popularityChartConfig = {
  totalStarts: {
    label: 'Total Starts',
    color: 'var(--chart-3)',
  },
} satisfies ChartConfig;

export const AdminDashboardTab: React.FC<AdminDashboardTabProps> = ({
  adminDashboardStats,
  isLoading,
}) => {
  if (isLoading) return <DashboardSkeleton />;
  if (!adminDashboardStats) return <EmptyState />;

  const { users, currentActivity, globalHistory, popularity } =
    adminDashboardStats;

  const totalActiveRooms =
    currentActivity.classicActiveRooms + currentActivity.battleRoyalActiveRooms;
  const totalFinishedGames =
    globalHistory.classicFinishedTotal + globalHistory.battleRoyalFinishedTotal;

  const activityData = [
    {
      name: 'Classic',
      active: currentActivity.classicActiveRooms,
      finished: globalHistory.classicFinishedTotal,
    },
    {
      name: 'Battle Royal',
      active: currentActivity.battleRoyalActiveRooms,
      finished: globalHistory.battleRoyalFinishedTotal,
    },
  ];

  return (
    <div className='space-y-6'>
      {/* Summary Cards */}
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <StatCard
          title='Total Users'
          value={users.total}
          icon={<Users className='text-muted-foreground h-4 w-4' />}
          footer={
            <div className='text-muted-foreground flex items-center text-xs'>
              <TrendingUp className='mr-1 h-3 w-3 text-green-500' />
              <span className='text-green-500'>+{users.newLast24h}</span>
              <span className='ml-1'>in last 24h</span>
            </div>
          }
        />
        <StatCard
          title='Active Rooms'
          value={totalActiveRooms}
          icon={<Gamepad2 className='text-muted-foreground h-4 w-4' />}
          footer={
            <div className='flex gap-2'>
              <Badge variant='outline' className='text-[10px]'>
                {currentActivity.classicActiveRooms} Classic
              </Badge>
              <Badge variant='outline' className='text-[10px]'>
                {currentActivity.battleRoyalActiveRooms} BR
              </Badge>
            </div>
          }
        />
        <StatCard
          title='Games Finished'
          value={totalFinishedGames}
          icon={<History className='text-muted-foreground h-4 w-4' />}
          footer={
            <div className='text-muted-foreground text-xs'>
              {globalHistory.classicFinishedTotal} Classic •{' '}
              {globalHistory.battleRoyalFinishedTotal} BR
            </div>
          }
        />
        <StatCard
          title='Most Popular'
          value={popularity[0]?.name || 'N/A'}
          icon={<Crown className='text-muted-foreground h-4 w-4' />}
          footer={
            <div className='text-muted-foreground text-xs'>
              {popularity[0]?.totalStarts || 0} total starts
            </div>
          }
        />
      </div>

      <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
        {/* Game Activity Chart - Shadcn Style */}
        <Card>
          <CardHeader>
            <CardTitle>Game Activity</CardTitle>
            <CardDescription>Active vs Finished Games by Type</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={activityChartConfig}
              className='h-[300px] w-full'
            >
              <BarChart accessibilityLayer data={activityData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey='name'
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                />
                <ChartTooltip
                  content={<ChartTooltipContent />}
                  cursor={false}
                />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey='active' fill='var(--color-active)' radius={4} />
                <Bar
                  dataKey='finished'
                  fill='var(--color-finished)'
                  radius={4}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Game Popularity</CardTitle>
            <CardDescription>Total starts per game mode</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={popularityChartConfig}
              className='h-[300px] w-full'
            >
              <BarChart accessibilityLayer data={popularity}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey='name'
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                />
                <ChartTooltip
                  content={<ChartTooltipContent />}
                  cursor={false}
                />
                <Bar
                  dataKey='totalStarts'
                  fill='var(--color-totalStarts)'
                  radius={8}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Таблица остается без изменений, она уже в стиле shadcn */}
        <RankingTable popularity={popularity} />
      </div>
    </div>
  );
};

const StatCard = ({
  title,
  value,
  icon,
  footer,
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  footer: React.ReactNode;
}) => (
  <Card>
    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
      <CardTitle className='text-sm font-medium'>{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className='text-2xl font-bold'>{value}</div>
      {footer}
    </CardContent>
  </Card>
);

const EmptyState = () => (
  <div className='flex h-64 items-center justify-center rounded-lg border border-dashed p-8'>
    <p className='text-muted-foreground'>No dashboard data available</p>
  </div>
);

const RankingTable = ({
  popularity,
}: {
  popularity: {
    name: string;
    totalStarts: number;
  }[];
}) => (
  <Card className='lg:col-span-2'>
    <CardHeader>
      <CardTitle>Game Popularity Ranking</CardTitle>
      <CardDescription>Sorted by total starts</CardDescription>
    </CardHeader>
    <CardContent>
      <div className='overflow-hidden rounded-md border'>
        <table className='w-full text-sm'>
          <thead>
            <tr className='bg-muted/50 border-b'>
              <th className='p-4 text-left font-medium'>Rank</th>
              <th className='p-4 text-left font-medium'>Game Mode</th>
              <th className='p-4 text-left font-medium'>Total Starts</th>
              <th className='p-4 text-left font-medium'>Popularity</th>
            </tr>
          </thead>
          <tbody>
            {popularity.map((game, index) => {
              const maxStarts = Math.max(...popularity.map(p => p.totalStarts));
              const percentage = Math.round(
                (game.totalStarts / maxStarts) * 100
              );
              return (
                <tr
                  key={game.name}
                  className='hover:bg-muted/50 border-b last:border-0'
                >
                  <td className='p-4'>
                    <div className='flex items-center gap-2'>
                      {index === 0 && (
                        <Crown className='h-4 w-4 text-yellow-500' />
                      )}
                      <span className={index < 3 ? 'font-bold' : ''}>
                        #{index + 1}
                      </span>
                    </div>
                  </td>
                  <td className='p-4 font-medium'>{game.name}</td>
                  <td className='p-4'>{game.totalStarts.toLocaleString()}</td>
                  <td className='w-1/3 p-4'>
                    <div className='flex items-center gap-2'>
                      <div className='bg-secondary h-2 flex-1 overflow-hidden rounded-full'>
                        <div
                          className='bg-primary h-full transition-all'
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className='text-muted-foreground min-w-[35px] text-right'>
                        {percentage}%
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </CardContent>
  </Card>
);

const DashboardSkeleton = () => (
  <div className='space-y-6'>
    <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
      {[...Array(4)].map((_, i) => (
        <Card key={i}>
          <CardHeader className='pb-2'>
            <Skeleton className='h-4 w-24' />
          </CardHeader>
          <CardContent>
            <Skeleton className='mb-2 h-8 w-16' />
            <Skeleton className='h-3 w-32' />
          </CardContent>
        </Card>
      ))}
    </div>
    <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
      {[...Array(2)].map((_, i) => (
        <Card key={i}>
          <CardHeader>
            <Skeleton className='h-6 w-32' />
            <Skeleton className='h-4 w-48' />
          </CardHeader>
          <CardContent>
            <Skeleton className='h-[300px] w-full' />
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);
