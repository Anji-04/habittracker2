import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  Apple,
  Salad,
  Drumstick,
  Dumbbell,
  Weight,
  Music,
  Sparkles,
  Heart,
  Book,
  Coffee,
  Moon,
  Smile,
  Target,
  Zap,
  Trophy,
  Star,
  Check,
  Brain,
  Droplet,
  Pill,
  Users,
  Home,
  Pencil,
  Trash2,
  Plus,
} from 'lucide-react';
import { Habit } from '../App';

interface ManageHabitsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  habits: Habit[];
  setHabits: (habits: Habit[]) => void;
}

export const iconOptions = [
  { value: 'Apple', label: 'Apple', icon: Apple },
  { value: 'Salad', label: 'Salad', icon: Salad },
  { value: 'Drumstick', label: 'Drumstick', icon: Drumstick },
  { value: 'Dumbbell', label: 'Dumbbell', icon: Dumbbell },
  { value: 'Weight', label: 'Weight', icon: Weight },
  { value: 'Music', label: 'Music', icon: Music },
  { value: 'Sparkles', label: 'Sparkles', icon: Sparkles },
  { value: 'Heart', label: 'Heart', icon: Heart },
  { value: 'Book', label: 'Book', icon: Book },
  { value: 'Coffee', label: 'Coffee', icon: Coffee },
  { value: 'Moon', label: 'Moon', icon: Moon },
  { value: 'Smile', label: 'Smile', icon: Smile },
  { value: 'Target', label: 'Target', icon: Target },
  { value: 'Zap', label: 'Zap', icon: Zap },
  { value: 'Trophy', label: 'Trophy', icon: Trophy },
  { value: 'Star', label: 'Star', icon: Star },
  { value: 'Check', label: 'Check', icon: Check },
  { value: 'Brain', label: 'Brain', icon: Brain },
  { value: 'Droplet', label: 'Droplet', icon: Droplet },
  { value: 'Pill', label: 'Pill', icon: Pill },
  { value: 'Users', label: 'Users', icon: Users },
  { value: 'Home', label: 'Home', icon: Home },
];

export function getIconComponent(iconName: string) {
  const iconOption = iconOptions.find(opt => opt.value === iconName);
  return iconOption?.icon || Check;
}

export function ManageHabits({ open, onOpenChange, habits, setHabits }: ManageHabitsProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editLabel, setEditLabel] = useState('');
  const [editIcon, setEditIcon] = useState('');
  const [newHabitLabel, setNewHabitLabel] = useState('');
  const [newHabitIcon, setNewHabitIcon] = useState('Check');

  const startEdit = (habit: Habit) => {
    setEditingId(habit.id);
    setEditLabel(habit.label);
    setEditIcon(habit.icon);
  };

  const saveEdit = () => {
    if (editingId && editLabel.trim()) {
      setHabits(
        habits.map(h =>
          h.id === editingId ? { ...h, label: editLabel.trim(), icon: editIcon } : h
        )
      );
      setEditingId(null);
      setEditLabel('');
      setEditIcon('');
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditLabel('');
    setEditIcon('');
  };

  const deleteHabit = (id: string) => {
    if (confirm('Are you sure you want to delete this habit?')) {
      setHabits(habits.filter(h => h.id !== id));
    }
  };

  const addHabit = () => {
    if (newHabitLabel.trim()) {
      const newHabit: Habit = {
        id: `habit_${Date.now()}`,
        label: newHabitLabel.trim(),
        icon: newHabitIcon,
      };
      setHabits([...habits, newHabit]);
      setNewHabitLabel('');
      setNewHabitIcon('Check');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Manage Habits</DialogTitle>
          <DialogDescription>
            Add, edit, or remove your daily habits
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Existing Habits */}
          <div className="space-y-3">
            <h3 className="font-medium">Your Habits</h3>
            {habits.length === 0 ? (
              <p className="text-sm text-gray-500">No habits yet. Add one below!</p>
            ) : (
              habits.map(habit => {
                const Icon = getIconComponent(habit.icon);
                const isEditing = editingId === habit.id;

                return (
                  <div
                    key={habit.id}
                    className="flex items-center gap-3 p-3 border rounded-lg"
                  >
                    {isEditing ? (
                      <>
                        <div className="flex-1 space-y-3">
                          <div>
                            <Label htmlFor={`edit-label-${habit.id}`}>Label</Label>
                            <Input
                              id={`edit-label-${habit.id}`}
                              value={editLabel}
                              onChange={(e) => setEditLabel(e.target.value)}
                              placeholder="Habit name"
                            />
                          </div>
                          <div>
                            <Label htmlFor={`edit-icon-${habit.id}`}>Icon</Label>
                            <Select value={editIcon} onValueChange={setEditIcon}>
                              <SelectTrigger id={`edit-icon-${habit.id}`}>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {iconOptions.map(option => {
                                  const OptionIcon = option.icon;
                                  return (
                                    <SelectItem key={option.value} value={option.value}>
                                      <div className="flex items-center gap-2">
                                        <OptionIcon className="w-4 h-4" />
                                        {option.label}
                                      </div>
                                    </SelectItem>
                                  );
                                })}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="flex gap-2">
                            <Button onClick={saveEdit} size="sm">
                              Save
                            </Button>
                            <Button onClick={cancelEdit} variant="outline" size="sm">
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <Icon className="w-5 h-5 text-gray-600 flex-shrink-0" />
                        <span className="flex-1">{habit.label}</span>
                        <Button
                          onClick={() => startEdit(habit)}
                          variant="ghost"
                          size="icon"
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          onClick={() => deleteHabit(habit.id)}
                          variant="ghost"
                          size="icon"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Add New Habit */}
          <div className="space-y-3 pt-4 border-t">
            <h3 className="font-medium">Add New Habit</h3>
            <div className="space-y-3">
              <div>
                <Label htmlFor="new-label">Label</Label>
                <Input
                  id="new-label"
                  value={newHabitLabel}
                  onChange={(e) => setNewHabitLabel(e.target.value)}
                  placeholder="e.g., Meditate for 10 minutes"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      addHabit();
                    }
                  }}
                />
              </div>
              <div>
                <Label htmlFor="new-icon">Icon</Label>
                <Select value={newHabitIcon} onValueChange={setNewHabitIcon}>
                  <SelectTrigger id="new-icon">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {iconOptions.map(option => {
                      const OptionIcon = option.icon;
                      return (
                        <SelectItem key={option.value} value={option.value}>
                          <div className="flex items-center gap-2">
                            <OptionIcon className="w-4 h-4" />
                            {option.label}
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={addHabit} className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Add Habit
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
