import { useState, useEffect } from 'react';
import { Calendar } from './components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Checkbox } from './components/ui/checkbox';
import { Badge } from './components/ui/badge';
import { Button } from './components/ui/button';
import { Textarea } from './components/ui/textarea';
import { Apple, Salad, Drumstick, Dumbbell, Weight, Music, Sparkles, Settings, Quote, Wifi, WifiOff } from 'lucide-react';
import { HabitStats } from './components/HabitStats';
import { ManageHabits } from './components/ManageHabits';
import { getDailyQuote } from './lib/quotes';
import { InstallPrompt } from './components/InstallPrompt';

interface HabitData {
  [date: string]: {
    [habitId: string]: boolean;
  };
}

interface NotesData {
  [date: string]: string;
}

export interface Habit {
  id: string;
  label: string;
  icon: string;
}

const defaultHabits: Habit[] = [
  { id: 'fruit', label: 'Ate a fruit', icon: 'Apple' },
  { id: 'veggies', label: 'Ate veggies', icon: 'Salad' },
  { id: 'protein3x', label: 'Had protein 3x a day', icon: 'Drumstick' },
  { id: 'workout30min', label: 'Worked out for at least 30 mins', icon: 'Dumbbell' },
  { id: 'weightTraining', label: 'Weight training', icon: 'Weight' },
  { id: 'music', label: 'Practised music', icon: 'Music' },
  { id: 'aiTime', label: 'Spent time with AI', icon: 'Sparkles' },
];

export default function App() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [habitData, setHabitData] = useState<HabitData>(() => {
    const saved = localStorage.getItem('habitData');
    return saved ? JSON.parse(saved) : {};
  });
  const [notesData, setNotesData] = useState<NotesData>(() => {
    const saved = localStorage.getItem('notesData');
    return saved ? JSON.parse(saved) : {};
  });
  const [habits, setHabits] = useState<Habit[]>(() => {
    const saved = localStorage.getItem('habits');
    return saved ? JSON.parse(saved) : defaultHabits;
  });
  const [showManageHabits, setShowManageHabits] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // Register service worker for offline support
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then((registration) => {
          console.log('Service Worker registered:', registration);
        })
        .catch((error) => {
          console.log('Service Worker registration failed:', error);
        });
    }
  }, []);

  // Monitor online/offline status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('habitData', JSON.stringify(habitData));
  }, [habitData]);

  useEffect(() => {
    localStorage.setItem('notesData', JSON.stringify(notesData));
  }, [notesData]);

  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habits));
  }, [habits]);

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const dateKey = formatDate(selectedDate);
  const todayHabits = habitData[dateKey] || {};
  const todayNotes = notesData[dateKey] || '';
  const dailyQuote = getDailyQuote(selectedDate);

  const toggleHabit = (habitId: string) => {
    setHabitData(prev => ({
      ...prev,
      [dateKey]: {
        ...todayHabits,
        [habitId]: !todayHabits[habitId],
      },
    }));
  };

  const updateNotes = (notes: string) => {
    setNotesData(prev => ({
      ...prev,
      [dateKey]: notes,
    }));
  };

  const completedToday = habits.filter(h => todayHabits[h.id]).length;
  const totalHabits = habits.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-2">
            <h1 className="text-4xl">Daily Habit Tracker</h1>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowManageHabits(true)}
              className="rounded-full"
            >
              <Settings className="w-5 h-5" />
            </Button>
            {/* Offline indicator */}
            {!isOnline && (
              <Badge variant="outline" className="gap-2">
                <WifiOff className="w-4 h-4" />
                Offline Mode
              </Badge>
            )}
          </div>
          <p className="text-gray-600">Build healthy habits, one day at a time</p>
        </div>

        {/* Daily Quote */}
        <Card className="mb-6 bg-gradient-to-r from-purple-100 via-pink-100 to-blue-100 border-none">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <Quote className="w-8 h-8 text-purple-600 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <p className="text-lg italic mb-2">"{dailyQuote.quote}"</p>
                <p className="text-sm text-gray-700">— {dailyQuote.author}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* Calendar Card */}
          <Card>
            <CardHeader>
              <CardTitle>Select Date</CardTitle>
              <CardDescription>Choose a date to track your habits</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && setSelectedDate(date)}
                className="rounded-md border"
                modifiers={{
                  completed: (date) => {
                    const key = formatDate(date);
                    const dayHabits = habitData[key];
                    return dayHabits ? habits.every(h => dayHabits[h.id]) : false;
                  },
                  partial: (date) => {
                    const key = formatDate(date);
                    const dayHabits = habitData[key];
                    if (!dayHabits) return false;
                    const completed = habits.filter(h => dayHabits[h.id]).length;
                    return completed > 0 && completed < habits.length;
                  },
                }}
                modifiersClassNames={{
                  completed: 'bg-green-500 text-white hover:bg-green-600',
                  partial: 'bg-yellow-200 hover:bg-yellow-300',
                }}
              />
            </CardContent>
          </Card>

          {/* Today's Habits Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>
                    {selectedDate.toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </CardTitle>
                  <CardDescription>Track your daily habits</CardDescription>
                </div>
                <Badge variant={completedToday === totalHabits ? 'default' : 'secondary'} className="text-lg px-4 py-2">
                  {completedToday}/{totalHabits}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {habits.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p>No habits yet. Click the settings icon to add some!</p>
                </div>
              ) : (
                habits.map((habit) => {
                  return (
                    <div
                      key={habit.id}
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Checkbox
                        id={habit.id}
                        checked={todayHabits[habit.id] || false}
                        onCheckedChange={() => toggleHabit(habit.id)}
                      />
                      <label
                        htmlFor={habit.id}
                        className="flex items-center space-x-3 flex-1 cursor-pointer"
                      >
                        <span>{habit.label}</span>
                      </label>
                    </div>
                  );
                })
              )}
              
              {/* Daily Notes Section */}
              <div className="pt-4 border-t">
                <label htmlFor="daily-notes" className="block mb-2 text-sm">
                  Daily Notes
                </label>
                <Textarea
                  id="daily-notes"
                  placeholder="How was your day? Any thoughts, reflections, or wins to note down..."
                  value={todayNotes}
                  onChange={(e) => updateNotes(e.target.value)}
                  className="min-h-[100px] resize-none"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Statistics */}
        {habits.length > 0 && (
          <HabitStats habitData={habitData} selectedDate={selectedDate} habits={habits} />
        )}
      </div>

      <ManageHabits
        open={showManageHabits}
        onOpenChange={setShowManageHabits}
        habits={habits}
        setHabits={setHabits}
      />
      
      <InstallPrompt />
    </div>
  );
}