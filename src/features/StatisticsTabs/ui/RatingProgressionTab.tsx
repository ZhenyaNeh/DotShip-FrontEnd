'use client';

import { Minus, TrendingDown, TrendingUp } from 'lucide-react';
import * as React from 'react';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';

import { RatingProgression } from '../types';

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/src/shared/ui/Select/Select';

interface RatingProgressionTabProps {
  ratingProgression?: RatingProgression;
  isLoading?: boolean;
}

interface ChartDataPoint {
  date: string;
  classic?: number;
  battleRoyal?: number;
  timestamp: number;
}

interface ModeStats {
  current: number;
  change: number;
  percentageChange: number;
  maxRating: number;
  minRating: number;
  totalGames: number;
  direction: 'up' | 'down' | 'flat';
}

type SelectedMode = 'classic' | 'battleRoyal' | 'both';

type TimeRange = 'all' | '90' | '30' | '7';

export const RatingProgressionTab: React.FC<RatingProgressionTabProps> = ({
  ratingProgression,
  isLoading,
}) => {
  const [timeRange, setTimeRange] = React.useState<TimeRange>('all');
  const [selectedMode, setSelectedMode] = React.useState<SelectedMode>('both');

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Rating Progression</CardTitle>
        </CardHeader>
        <CardContent className='flex h-[400px] items-center justify-center'>
          <div className='text-muted-foreground'>
            Loading rating progression...
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!ratingProgression) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Rating Progression</CardTitle>
        </CardHeader>
        <CardContent className='flex h-[400px] items-center justify-center'>
          <div className='text-muted-foreground'>No rating data available</div>
        </CardContent>
      </Card>
    );
  }

  const prepareChartData = (): ChartDataPoint[] => {
    let classicData = [...ratingProgression.classic];
    let battleRoyalData = [...ratingProgression.battleRoyal];

    if (timeRange !== 'all') {
      const daysToKeep = parseInt(timeRange);
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);

      classicData = classicData.filter(
        item => new Date(item.createdAt) >= cutoffDate
      );
      battleRoyalData = battleRoyalData.filter(
        item => new Date(item.createdAt) >= cutoffDate
      );
    }

    const combinedData: Record<string, ChartDataPoint> = {};

    classicData.forEach((item, index) => {
      const date = new Date(item.createdAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        ...(timeRange === 'all' && { year: '2-digit' }),
      });

      const key = `${date}-${index}`;
      combinedData[key] = {
        ...combinedData[key],
        date: key,
        classic: item.newRating,
        timestamp: new Date(item.createdAt).getTime(),
      };
    });

    battleRoyalData.forEach((item, index) => {
      const date = new Date(item.createdAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        ...(timeRange === 'all' && { year: '2-digit' }),
      });

      const key = `${date}-${index}`;
      combinedData[key] = {
        ...(combinedData[key] || {}),
        date: key,
        battleRoyal: item.newRating,
        timestamp:
          combinedData[key]?.timestamp || new Date(item.createdAt).getTime(),
      };
    });

    return (
      Object.values(combinedData)
        .sort((a, b) => a.timestamp - b.timestamp)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .map(({ timestamp, ...rest }) => rest as ChartDataPoint)
    );
  };

  const chartData = prepareChartData();

  // Вычисляем статистику
  const getModeStats = (mode: 'classic' | 'battleRoyal'): ModeStats | null => {
    const data = ratingProgression[mode];
    if (data.length === 0) return null;

    const firstRating = data[0].newRating;
    const lastRating = data[data.length - 1].newRating;
    const change = lastRating - firstRating;
    const percentageChange = firstRating > 0 ? (change / firstRating) * 100 : 0;

    const maxRating = Math.max(...data.map(item => item.newRating));
    const minRating = Math.min(...data.map(item => item.newRating));

    return {
      current: lastRating,
      change,
      percentageChange,
      maxRating,
      minRating,
      totalGames: data.length,
      direction: change > 0 ? 'up' : change < 0 ? 'down' : 'flat',
    };
  };

  const classicStats = getModeStats('classic');
  const battleRoyalStats = getModeStats('battleRoyal');

  const chartConfig = {
    classic: {
      label: 'Classic Rating',
      color: 'var(--chart-1)',
    },
    battleRoyal: {
      label: 'Battle Royal Rating',
      color: 'var(--chart-2)',
    },
  } satisfies ChartConfig;

  interface FilteredChartData {
    date: string;
    classic?: number;
    battleRoyal?: number;
  }

  const filteredChartData: FilteredChartData[] =
    selectedMode === 'both'
      ? chartData
      : chartData.map(item => ({
          date: item.date,
          ...(selectedMode === 'classic'
            ? { classic: item.classic }
            : { battleRoyal: item.battleRoyal }),
        }));

  return (
    <Card className='pt-0'>
      <CardHeader className='flex flex-col gap-4 space-y-0 border-b py-5 sm:flex-row sm:items-center sm:justify-between'>
        <div className='grid flex-1 gap-1'>
          <CardTitle>Rating Progression</CardTitle>
          <CardDescription>Track your rating changes over time</CardDescription>
        </div>

        <div className='flex flex-col gap-2 sm:flex-row sm:items-center'>
          <Select
            value={selectedMode}
            onValueChange={(value: SelectedMode) => setSelectedMode(value)}
          >
            <SelectTrigger className='w-full rounded-lg sm:w-[180px]'>
              <SelectValue placeholder='Select mode' />
            </SelectTrigger>
            <SelectContent className='rounded-xl'>
              <SelectItem value='both' className='rounded-lg'>
                Both Modes
              </SelectItem>
              <SelectItem value='classic' className='rounded-lg'>
                Classic Only
              </SelectItem>
              <SelectItem value='battleRoyal' className='rounded-lg'>
                Battle Royal Only
              </SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={timeRange}
            onValueChange={(value: TimeRange) => setTimeRange(value)}
          >
            <SelectTrigger className='w-full rounded-lg sm:w-[160px]'>
              <SelectValue placeholder='Time range' />
            </SelectTrigger>
            <SelectContent className='rounded-xl'>
              <SelectItem value='all' className='rounded-lg'>
                All Time
              </SelectItem>
              <SelectItem value='90' className='rounded-lg'>
                Last 90 Days
              </SelectItem>
              <SelectItem value='30' className='rounded-lg'>
                Last 30 Days
              </SelectItem>
              <SelectItem value='7' className='rounded-lg'>
                Last 7 Days
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent className='px-2 pt-4 sm:px-6 sm:pt-6'>
        <div className='mb-6 grid gap-6 md:grid-cols-3'>
          {/* Classic Stats Card */}
          {classicStats && (
            <div className='rounded-lg border p-4'>
              <div className='mb-2 flex items-center justify-between'>
                <span className='text-muted-foreground text-sm font-medium'>
                  Classic
                </span>
                <div className='flex items-center gap-1'>
                  {classicStats.direction === 'up' && (
                    <TrendingUp className='h-4 w-4 text-green-600' />
                  )}
                  {classicStats.direction === 'down' && (
                    <TrendingDown className='h-4 w-4 text-red-600' />
                  )}
                  {classicStats.direction === 'flat' && (
                    <Minus className='h-4 w-4 text-gray-600' />
                  )}
                  <span
                    className={`text-sm font-semibold ${
                      classicStats.direction === 'up'
                        ? 'text-green-600'
                        : classicStats.direction === 'down'
                          ? 'text-red-600'
                          : 'text-gray-600'
                    }`}
                  >
                    {classicStats.change >= 0 ? '+' : ''}
                    {classicStats.change}
                  </span>
                </div>
              </div>
              <div className='text-2xl font-bold'>{classicStats.current}</div>
              <div className='text-muted-foreground mt-1 text-sm'>
                Peak: {classicStats.maxRating} • Low: {classicStats.minRating}
              </div>
              <div className='text-muted-foreground mt-2 text-xs'>
                {classicStats.totalGames} games
              </div>
            </div>
          )}

          {/* Battle Royal Stats Card */}
          {battleRoyalStats && (
            <div className='rounded-lg border p-4'>
              <div className='mb-2 flex items-center justify-between'>
                <span className='text-muted-foreground text-sm font-medium'>
                  Battle Royal
                </span>
                <div className='flex items-center gap-1'>
                  {battleRoyalStats.direction === 'up' && (
                    <TrendingUp className='h-4 w-4 text-green-600' />
                  )}
                  {battleRoyalStats.direction === 'down' && (
                    <TrendingDown className='h-4 w-4 text-red-600' />
                  )}
                  {battleRoyalStats.direction === 'flat' && (
                    <Minus className='h-4 w-4 text-gray-600' />
                  )}
                  <span
                    className={`text-sm font-semibold ${
                      battleRoyalStats.direction === 'up'
                        ? 'text-green-600'
                        : battleRoyalStats.direction === 'down'
                          ? 'text-red-600'
                          : 'text-gray-600'
                    }`}
                  >
                    {battleRoyalStats.change >= 0 ? '+' : ''}
                    {battleRoyalStats.change}
                  </span>
                </div>
              </div>
              <div className='text-2xl font-bold'>
                {battleRoyalStats.current}
              </div>
              <div className='text-muted-foreground mt-1 text-sm'>
                Peak: {battleRoyalStats.maxRating} • Low:{' '}
                {battleRoyalStats.minRating}
              </div>
              <div className='text-muted-foreground mt-2 text-xs'>
                {battleRoyalStats.totalGames} games
              </div>
            </div>
          )}

          {/* Summary Card */}
          <div className='bg-primary/5 rounded-lg border p-4'>
            <div className='mb-2 text-sm font-medium'>Summary</div>
            <div className='text-muted-foreground space-y-1 text-sm'>
              <div>• {chartData.length} rating updates shown</div>
              {classicStats && (
                <div>• Classic: {classicStats.current} rating</div>
              )}
              {battleRoyalStats && (
                <div>• Battle Royal: {battleRoyalStats.current} rating</div>
              )}
              {classicStats && battleRoyalStats && (
                <div className='mt-2 font-medium'>
                  Total Change:{' '}
                  {classicStats.change + battleRoyalStats.change >= 0
                    ? '+'
                    : ''}
                  {classicStats.change + battleRoyalStats.change}
                </div>
              )}
            </div>
          </div>
        </div>

        <ChartContainer
          config={chartConfig}
          className='aspect-auto h-[300px] w-full'
        >
          <AreaChart data={filteredChartData}>
            <defs>
              <linearGradient id='fillClassic' x1='0' y1='0' x2='0' y2='1'>
                <stop
                  offset='5%'
                  stopColor='var(--color-classic)'
                  stopOpacity={0.3}
                />
                <stop
                  offset='95%'
                  stopColor='var(--color-classic)'
                  stopOpacity={0}
                />
              </linearGradient>
              <linearGradient id='fillBattleRoyal' x1='0' y1='0' x2='0' y2='1'>
                <stop
                  offset='5%'
                  stopColor='var(--color-battleRoyal)'
                  stopOpacity={0.3}
                />
                <stop
                  offset='95%'
                  stopColor='var(--color-battleRoyal)'
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray='3 3' />
            <XAxis
              dataKey='date'
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value: string) => {
                // Убираем индекс для отображения
                const datePart = value.split('-').slice(0, -1).join('-');
                return datePart;
              }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tickMargin={8}
              domain={['dataMin - 50', 'dataMax + 50']}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value: string) => {
                    const datePart = value.split('-').slice(0, -1).join('-');
                    return `Date: ${datePart}`;
                  }}
                  formatter={(value, name) => [
                    value ? `${value} rating` : 'N/A',
                    chartConfig[name as keyof typeof chartConfig]?.label ||
                      name,
                  ]}
                  indicator='dot'
                />
              }
            />
            {(selectedMode === 'both' || selectedMode === 'battleRoyal') && (
              <Area
                dataKey='battleRoyal'
                type='monotone'
                fill='url(#fillBattleRoyal)'
                stroke='var(--color-battleRoyal)'
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />
            )}
            {(selectedMode === 'both' || selectedMode === 'classic') && (
              <Area
                dataKey='classic'
                type='monotone'
                fill='url(#fillClassic)'
                stroke='var(--color-classic)'
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />
            )}
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
