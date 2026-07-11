/**
 * Checks whether a user message is related to My Chennai Catering or catering services.
 * Allows simple greetings and introductory questions, but blocks general knowledge, coding,
 * jokes, politics, sports, health, finance, religion, and other unrelated topics.
 */
export function isMessageRelatedToCatering(message: string, historyLength: number = 0): boolean {
  const normalized = message.toLowerCase().trim();

  if (!normalized) {
    return false;
  }

  // 1. Explicitly block keywords associated with out-of-scope topics
  const blockedKeywords = [
    'joke', 'jokes', 'riddle', 'riddles', 'politics', 'politic', 'political', 
    'sport', 'sports', 'football', 'cricket', 'soccer', 'hockey', 'olympics',
    'news', 'weather', 'movie', 'movies', 'song', 'songs', 'music', 'game', 'games', 
    'gaming', 'stock', 'stocks', 'finance', 'crypto', 'bitcoin', 'investment', 
    'health', 'disease', 'diseases', 'medicine', 'medical', 'hospital',
    'religion', 'god', 'bible', 'quran', 'gita', 'temple', 'church', 'mosque', 
    'code', 'coding', 'program', 'programming', 'javascript', 'python', 'java', 'html', 
    'css', 'react', 'developer', 'software', 'algorithm', 'math', 'science', 'physics',
    'chemistry', 'biology', 'history', 'geography', 'astronomy', 'space'
  ];

  for (const blocked of blockedKeywords) {
    const regex = new RegExp(`\\b${blocked}\\b`, 'i');
    if (regex.test(normalized)) {
      return false;
    }
  }

  // 2. Bypassing check if this is an ongoing chat thread to allow single-word replies (like names or counts)
  if (historyLength > 0) {
    return true;
  }

  // 3. Allow common greetings / introductions (so conversation can start)
  const greetings = [
    'hi', 'hello', 'hey', 'namaste', 'vanakkam', 'greeting', 'greetings',
    'good morning', 'good afternoon', 'good evening', 'good day',
    'who are you', 'what are you', 'how can you help', 'what do you do',
    'is anyone there', 'hello bot', 'hi bot', 'howdy', 'yo', 'hi there',
    'anybody there', 'help'
  ];

  const isGreeting = greetings.some(greet => {
    const regex = new RegExp(`^${greet}\\b|\\b${greet}$|\\b${greet}\\b`, 'i');
    return regex.test(normalized);
  });

  // If the message is short and is a greeting, allow it
  if (normalized.length <= 25 && isGreeting) {
    return true;
  }

  // 3. Match catering, food, events, locations, and booking keywords
  const coreKeywords = [
    // Brand MCC
    'mcc', 'chennai catering', 'my chennai catering',
    
    // Catering services & styles
    'cater', 'catering', 'caterer', 'caterers', 'service', 'services', 
    'hospitality', 'outdoor catering', 'live counter', 'live counters', 
    'buffet', 'buffets', 'leaf meal', 'leaf meals', 'banana leaf', 'elai sappadu', 
    'dining', 'host', 'setup',
    
    // Event types
    'wedding', 'weddings', 'marriage', 'marriages', 'reception', 'receptions', 
    'engagement', 'engagements', 'nischayathartham', 'muhurtham', 'muhurthams',
    'birthday', 'birthdays', 'corporate', 'housewarming', 'housewarmings', 
    'grihapravesam', 'party', 'parties', 'event', 'events', 'celebration', 'celebrations', 
    'seminar', 'seminars', 'meeting', 'meetings', 'anniversary', 'anniversaries', 
    'function', 'functions', 'valaikappu', 'baby shower', 'cradle ceremony', 
    'gathering', 'gatherings', 'festival', 'get-together', 'kitty party',
    
    // Food & Menus
    'menu', 'menus', 'food', 'foods', 'dish', 'dishes', 'cuisine', 'cuisines', 
    'flavour', 'flavours', 'taste', 'cook', 'chef', 'chefs', 'breakfast', 'lunch', 
    'dinner', 'meal', 'meals', 'tiffin', 'starter', 'starters', 'main course', 
    'main courses', 'dessert', 'desserts', 'sweet', 'sweets', 'beverage', 'beverages', 
    'drink', 'drinks', 'mocktail', 'mocktails', 'coffee', 'tea', 'veg', 'vegetarian', 
    'dosa', 'dosas', 'idli', 'idlis', 'biryani', 'biryanis', 'payasam', 'halwa', 
    'appam', 'appams', 'jigarthanda', 'poori', 'pooris', 'sambar', 'rasam', 
    'poriyal', 'kootu', 'vadai', 'vada', 'pongal', 'kesari', 'kichadi',
    
    // Booking & Inquiry
    'price', 'prices', 'cost', 'costs', 'budget', 'budgets', 'quote', 'quotes', 
    'rate', 'rates', 'pricing', 'charge', 'charges', 'bill', 'how much', 
    'book', 'booking', 'bookings', 'reserve', 'reservation', 'reservations', 
    'hire', 'order', 'ordering', 'enquiry', 'enquiries', 'inquiry', 'inquiries', 
    'guest', 'guests', 'people', 'count', 'head', 'pax', 'date', 'dates',
    
    // Location & Areas
    'location', 'locations', 'area', 'areas', 'place', 'places', 'chennai', 
    'kanchipuram', 'thiruvallur', 'chengalpattu', 'tambaram', 'mylapore', 
    'adyar', 'velachery', 'anna nagar', 'guindy', 'chromepet', 'porur', 
    't nagar', 'nanganallur', 'medavakkam', 'omr', 'ecr'
  ];

  const hasCoreKeyword = coreKeywords.some(keyword => {
    const regex = new RegExp(`\\b${keyword}\\w*\\b`, 'i');
    return regex.test(normalized);
  });

  return hasCoreKeyword;
}
