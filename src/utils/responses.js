import { OFFICER_INFO, SAFETY_TIPS, RESPONSES } from './constants';

export const getRandomResponse = (category) => {
  const responses = RESPONSES[category] || RESPONSES.encouragement;
  return responses[Math.floor(Math.random() * responses.length)];
};

export const getRandomSafetyTip = () => {
  return SAFETY_TIPS[Math.floor(Math.random() * SAFETY_TIPS.length)];
};

export const getRandomCatchphrase = () => {
  return OFFICER_INFO.catchphrases[Math.floor(Math.random() * OFFICER_INFO.catchphrases.length)];
};

export const generateResponse = (userInput) => {
  const input = userInput.toLowerCase();
  
  // Greeting responses
  if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
    return getRandomResponse('greeting');
  }
  
  // Safety-related questions
  if (input.includes('safe') || input.includes('danger') || input.includes('help')) {
    return `${getRandomResponse('safety')} ${getRandomSafetyTip()}`;
  }
  
  // Questions about the officer
  if (input.includes('name') || input.includes('who are you')) {
    return `I'm ${OFFICER_INFO.name}, badge number ${OFFICER_INFO.badgeNumber}. I work in ${OFFICER_INFO.department} and I love helping kids like you!`;
  }
  
  // Goodbye responses
  if (input.includes('bye') || input.includes('goodbye') || input.includes('see you')) {
    return getRandomResponse('goodbye');
  }
  
  // Games and activities
  if (input.includes('game') || input.includes('play') || input.includes('fun')) {
    return "I love playing games! We could play a safety quiz, or I could tell you a story about helping people in our community. What sounds fun to you?";
  }
  
  // Stories
  if (input.includes('story') || input.includes('tell me')) {
    return "Here's one of my favorite stories: Yesterday, I helped a little kitten that was stuck in a tree. The fire department and I worked together to get the kitten down safely. Teamwork makes everything better!";
  }
  
  // Default encouraging response
  return `${getRandomCatchphrase()} ${getRandomResponse('encouragement')} Is there anything about safety you'd like to learn about?`;
};