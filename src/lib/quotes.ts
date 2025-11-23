export const motivationalQuotes = [
  {
    quote: "Success is the sum of small efforts repeated day in and day out.",
    author: "Robert Collier",
    topic: "consistency"
  },
  {
    quote: "The secret of getting ahead is getting started.",
    author: "Mark Twain",
    topic: "growth"
  },
  {
    quote: "Love yourself first and everything else falls into line.",
    author: "Lucille Ball",
    topic: "love"
  },
  {
    quote: "The soul always knows what to do to heal itself. The challenge is to silence the mind.",
    author: "Caroline Myss",
    topic: "spirituality"
  },
  {
    quote: "Life is 10% what happens to you and 90% how you react to it.",
    author: "Charles R. Swindoll",
    topic: "life"
  },
  {
    quote: "Happiness is not something ready made. It comes from your own actions.",
    author: "Dalai Lama",
    topic: "happiness"
  },
  {
    quote: "Joy is not in things; it is in us.",
    author: "Richard Wagner",
    topic: "joy"
  },
  {
    quote: "Family is not an important thing. It's everything.",
    author: "Michael J. Fox",
    topic: "family"
  },
  {
    quote: "A real friend is one who walks in when the rest of the world walks out.",
    author: "Walter Winchell",
    topic: "friends"
  },
  {
    quote: "Take care of your body. It's the only place you have to live.",
    author: "Jim Rohn",
    topic: "health"
  },
  {
    quote: "Wealth is the ability to fully experience life.",
    author: "Henry David Thoreau",
    topic: "wealth"
  },
  {
    quote: "Small daily improvements over time lead to stunning results.",
    author: "Robin Sharma",
    topic: "consistency"
  },
  {
    quote: "Growth is painful. Change is painful. But nothing is as painful as staying stuck somewhere you don't belong.",
    author: "Mandy Hale",
    topic: "growth"
  },
  {
    quote: "Where there is love there is life.",
    author: "Mahatma Gandhi",
    topic: "love"
  },
  {
    quote: "The spiritual life does not remove us from the world but leads us deeper into it.",
    author: "Henri J.M. Nouwen",
    topic: "spirituality"
  },
  {
    quote: "In the end, it's not the years in your life that count. It's the life in your years.",
    author: "Abraham Lincoln",
    topic: "life"
  },
  {
    quote: "The happiness of your life depends upon the quality of your thoughts.",
    author: "Marcus Aurelius",
    topic: "happiness"
  },
  {
    quote: "Find ecstasy in life; the mere sense of living is joy enough.",
    author: "Emily Dickinson",
    topic: "joy"
  },
  {
    quote: "In family life, love is the oil that eases friction, the cement that binds closer together.",
    author: "Friedrich Nietzsche",
    topic: "family"
  },
  {
    quote: "Friendship is born at that moment when one person says to another: 'What! You too? I thought I was the only one.'",
    author: "C.S. Lewis",
    topic: "friends"
  },
  {
    quote: "The greatest wealth is health.",
    author: "Virgil",
    topic: "health"
  },
  {
    quote: "It's not how much we have, but how much we enjoy, that makes happiness.",
    author: "Charles Spurgeon",
    topic: "wealth"
  },
  {
    quote: "You don't have to be great to start, but you have to start to be great.",
    author: "Zig Ziglar",
    topic: "consistency"
  },
  {
    quote: "The only impossible journey is the one you never begin.",
    author: "Tony Robbins",
    topic: "growth"
  },
  {
    quote: "Love is the bridge between you and everything.",
    author: "Rumi",
    topic: "love"
  },
  {
    quote: "Your inner peace is the greatest gift you can give yourself.",
    author: "Bryant McGill",
    topic: "spirituality"
  },
  {
    quote: "Life isn't about finding yourself. Life is about creating yourself.",
    author: "George Bernard Shaw",
    topic: "life"
  },
  {
    quote: "Happiness is when what you think, what you say, and what you do are in harmony.",
    author: "Mahatma Gandhi",
    topic: "happiness"
  },
  {
    quote: "Joy does not simply happen to us. We have to choose joy and keep choosing it every day.",
    author: "Henri J.M. Nouwen",
    topic: "joy"
  },
  {
    quote: "The love of family and the admiration of friends is much more important than wealth and privilege.",
    author: "Charles Kuralt",
    topic: "family"
  },
  {
    quote: "True friendship comes when the silence between two people is comfortable.",
    author: "David Tyson",
    topic: "friends"
  },
  {
    quote: "He who has health, has hope; and he who has hope, has everything.",
    author: "Thomas Carlyle",
    topic: "health"
  },
  {
    quote: "Wealth consists not in having great possessions, but in having few wants.",
    author: "Epictetus",
    topic: "wealth"
  },
  {
    quote: "It's not about perfect. It's about effort. And when you bring that effort every single day, that's where transformation happens.",
    author: "Jillian Michaels",
    topic: "consistency"
  },
  {
    quote: "Be not afraid of growing slowly; be afraid only of standing still.",
    author: "Chinese Proverb",
    topic: "growth"
  },
  {
    quote: "The best and most beautiful things in this world cannot be seen or even heard, but must be felt with the heart.",
    author: "Helen Keller",
    topic: "love"
  },
  {
    quote: "Peace comes from within. Do not seek it without.",
    author: "Buddha",
    topic: "spirituality"
  },
  {
    quote: "Life is really simple, but we insist on making it complicated.",
    author: "Confucius",
    topic: "life"
  },
  {
    quote: "Happiness is not a goal; it is a by-product.",
    author: "Eleanor Roosevelt",
    topic: "happiness"
  },
  {
    quote: "The most wasted of days is one without laughter.",
    author: "E.E. Cummings",
    topic: "joy"
  },
];

export function getDailyQuote(date: Date) {
  // Use date as seed to get consistent quote for each day
  const dateString = date.toISOString().split('T')[0];
  const seed = dateString.split('-').reduce((acc, val) => acc + parseInt(val), 0);
  const index = seed % motivationalQuotes.length;
  return motivationalQuotes[index];
}
