import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { TrendingUp, Calendar, CalendarDays } from 'lucide-react';
import { Habit } from '../App';
import { getIconComponent } from './ManageHabits';

interface HabitData {
  [date: string]: {
    [habitId: string]: boolean;
  };
}

interface HabitStatsProps {
  habitData: HabitData;
  selectedDate: Date;
  habits: Habit[];
}

export function HabitStats({ habitData, selectedDate, habits }: HabitStatsProps) {
  const getWeekRange = (date: Date) => {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
    const monday = new Date(date);
    monday.setDate(diff);
    monday.setHours(0, 0, 0, 0);
    
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    sunday.setHours(23, 59, 59, 999);
    
    return { start: monday, end: sunday };
  };

  const getMonthRange = (date: Date) => {
    const start = new Date(date.getFullYear(), date.getMonth(), 1);
    const end = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999);
    return { start, end };
  };

  const calculateStats = (startDate: Date, endDate: Date) => {
    const stats: { [key: string]: number } = {};
    habits.forEach(habit => {
      stats[habit.id] = 0;
    });

    const current = new Date(startDate);
    while (current <= endDate) {
      const dateKey = current.toISOString().split('T')[0];
      const dayData = habitData[dateKey];
      
      if (dayData) {
        habits.forEach(habit => {
          if (dayData[habit.id]) {
            stats[habit.id]++;
          }
        });
      }
      
      current.setDate(current.getDate() + 1);
    }

    return stats;
  };

  const weekRange = getWeekRange(selectedDate);
  const monthRange = getMonthRange(selectedDate);
  
  const weekStats = calculateStats(weekRange.start, weekRange.end);
  const monthStats = calculateStats(monthRange.start, monthRange.end);

  const formatDateRange = (start: Date, end: Date) => {
    return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Weekly Stats */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Weekly Summary
              </CardTitle>
              <CardDescription>{formatDateRange(weekRange.start, weekRange.end)}</CardDescription>
            </div>
            <TrendingUp className="w-5 h-5 text-blue-500" />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {habits.map((habit) => {
            const count = weekStats[habit.id];
            const percentage = (count / 7) * 100;
            const Icon = getIconComponent(habit.icon);
            
            return (
              <div key={habit.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-gray-600" />
                    <span className="text-sm">{habit.label}</span>
                  </div>
                  <span className="text-sm">
                    <span>{count}</span>
                    <span className="text-gray-400">/7 days</span>
                  </span>
                </div>
                <Progress value={percentage} className="h-2" />
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Monthly Stats */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <CalendarDays className="w-5 h-5" />
                Monthly Summary
              </CardTitle>
              <CardDescription>
                {selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </CardDescription>
            </div>
            <TrendingUp className="w-5 h-5 text-purple-500" />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {habits.map((habit) => {
            const daysInMonth = new Date(
              selectedDate.getFullYear(),
              selectedDate.getMonth() + 1,
              0
            ).getDate();
            const count = monthStats[habit.id];
            const percentage = (count / daysInMonth) * 100;
            const Icon = getIconComponent(habit.icon);
            
            return (
              <div key={habit.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-gray-600" />
                    <span className="text-sm">{habit.label}</span>
                  </div>
                  <span className="text-sm">
                    <span>{count}</span>
                    <span className="text-gray-400">/{daysInMonth} days</span>
                  </span>
                </div>
                <Progress value={percentage} className="h-2" />
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}