'use client';

import { TrendingDown, TrendingUp } from 'lucide-react';
import { FC } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, XAxis, YAxis } from 'recharts';

import { UserStats } from '../types';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/src/shared/ui/Card/Card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/src/shared/ui/Chart/chart';

interface Props {
  userStats?: UserStats;
  isLoading?: boolean;
}

export const UserStatsTab: FC<Props> = ({ userStats, isLoading }) => {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className='text-2xl'>Wins/Losses Statistics</CardTitle>
        </CardHeader>
        <CardContent className='flex h-[300px] items-center justify-center'>
          <div className='text-muted-foreground'>Loading statistics...</div>
        </CardContent>
      </Card>
    );
  }

  if (!userStats) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className='text-2xl'>Wins/Losses Statistics</CardTitle>
        </CardHeader>
        <CardContent className='flex h-[300px] items-center justify-center'>
          <div className='text-muted-foreground'>No statistics available</div>
        </CardContent>
      </Card>
    );
  }

  // Подготавливаем данные для графика
  const chartData = [
    {
      name: 'Classic',
      Wins: userStats.classic.wins,
      Losses: userStats.classic.losses,
      winRate:
        userStats.classic.wins + userStats.classic.losses > 0
          ? Math.round(
              (userStats.classic.wins /
                (userStats.classic.wins + userStats.classic.losses)) *
                100
            )
          : 0,
    },
    {
      name: 'Battle Royal',
      Wins: userStats.battleRoyal.wins,
      Losses: userStats.battleRoyal.losses,
      winRate:
        userStats.battleRoyal.wins + userStats.battleRoyal.losses > 0
          ? Math.round(
              (userStats.battleRoyal.wins /
                (userStats.battleRoyal.wins + userStats.battleRoyal.losses)) *
                100
            )
          : 0,
    },
  ];

  const totalWins = userStats.classic.wins + userStats.battleRoyal.wins;
  const totalLosses = userStats.classic.losses + userStats.battleRoyal.losses;
  const totalWinRate =
    totalWins + totalLosses > 0
      ? Math.round((totalWins / (totalWins + totalLosses)) * 100)
      : 0;

  const chartConfig = {
    Wins: {
      label: 'Wins',
      color: 'var(--chart-1)',
    },
    Losses: {
      label: 'Losses',
      color: 'var(--chart-2)',
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-2xl'>Wins/Losses Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='grid gap-4 md:grid-cols-2'>
          <div>
            <ChartContainer config={chartConfig}>
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray='3 3' vertical={false} />
                <XAxis
                  dataKey='name'
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'currentColor' }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'currentColor' }}
                />
                <Legend />
                <ChartTooltip
                  content={<ChartTooltipContent />}
                  cursor={false}
                />
                <Bar
                  dataKey='Wins'
                  fill='var(--color-Wins)'
                  radius={[4, 4, 0, 0]}
                  stackId='a'
                />
                <Bar
                  dataKey='Losses'
                  fill='var(--color-Losses)'
                  radius={[4, 4, 0, 0]}
                  stackId='a'
                />
              </BarChart>
            </ChartContainer>
          </div>

          <div className='space-y-4'>
            <div className='space-y-2'>
              <h3 className='text-lg font-semibold'>Game Mode Details</h3>

              {/* Classic Stats */}
              <div className='bg-card rounded-lg border p-4'>
                <div className='mb-2 flex items-center justify-between'>
                  <span className='font-medium'>Classic</span>
                  <span
                    className={`text-sm font-semibold ${chartData[0].winRate >= 50 ? 'text-chart-1' : 'text-chart-2'}`}
                  >
                    {chartData[0].winRate}% WR
                  </span>
                </div>
                <div className='grid grid-cols-2 gap-2 text-sm'>
                  <div className='text-center'>
                    <div className='text-chart-1 text-2xl font-bold'>
                      {userStats.classic.wins}
                    </div>
                    <div className='text-muted-foreground'>Wins</div>
                  </div>
                  <div className='text-center'>
                    <div className='text-chart-2 text-2xl font-bold'>
                      {userStats.classic.losses}
                    </div>
                    <div className='text-muted-foreground'>Losses</div>
                  </div>
                </div>
              </div>

              {/* Battle Royal Stats */}
              <div className='bg-card rounded-lg border p-4'>
                <div className='mb-2 flex items-center justify-between'>
                  <span className='font-medium'>Battle Royal</span>
                  <span
                    className={`text-sm font-semibold ${chartData[1].winRate >= 50 ? 'text-chart-1' : 'text-chart-2'}`}
                  >
                    {chartData[1].winRate}% WR
                  </span>
                </div>
                <div className='grid grid-cols-2 gap-2 text-sm'>
                  <div className='text-center'>
                    <div className='text-chart-1 text-2xl font-bold'>
                      {userStats.battleRoyal.wins}
                    </div>
                    <div className='text-muted-foreground'>Wins</div>
                  </div>
                  <div className='text-center'>
                    <div className='text-chart-2 text-2xl font-bold'>
                      {userStats.battleRoyal.losses}
                    </div>
                    <div className='text-muted-foreground'>Losses</div>
                  </div>
                </div>
              </div>

              {/* Total Stats */}
              <div className='bg-primary/5 rounded-lg border p-4'>
                <div className='mb-2 flex items-center justify-between'>
                  <span className='font-medium'>Total</span>
                  <div className='flex items-center gap-1'>
                    <span
                      className={`text-sm font-semibold ${totalWinRate >= 50 ? 'text-chart-1' : 'text-chart-2'}`}
                    >
                      {totalWinRate}% Win Rate
                    </span>
                    {totalWinRate >= 50 ? (
                      <TrendingUp className='text-chart-1 h-4 w-4' />
                    ) : (
                      <TrendingDown className='text-chart-2 h-4 w-4' />
                    )}
                  </div>
                </div>
                <div className='grid grid-cols-2 gap-2 text-sm'>
                  <div className='text-center'>
                    <div className='text-chart-1 text-2xl font-bold'>
                      {totalWins}
                    </div>
                    <div className='text-muted-foreground'>Total Wins</div>
                  </div>
                  <div className='text-center'>
                    <div className='text-chart-2 text-2xl font-bold'>
                      {totalLosses}
                    </div>
                    <div className='text-muted-foreground'>Total Losses</div>
                  </div>
                </div>
                <div className='text-muted-foreground mt-2 text-center text-sm'>
                  {totalWins + totalLosses} games played
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
