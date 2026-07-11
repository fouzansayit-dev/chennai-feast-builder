import { createServerFn } from '@tanstack/react-start';
import { isMessageRelatedToCatering } from '@/lib/chatbotValidation';
// @ts-ignore
import kbContent from '@/lib/website-knowledge.md?raw';

const SYSTEM_INSTRUCTION = `
You are the professional, friendly, and helpful AI assistant representing "My Chennai Catering (MCC)", a premium vegetarian catering service provider in Chennai established in 2006 (with over 20 years of experience).

Your job is to answer inquiries about wedding catering, engagement & reception catering, birthday parties, corporate catering, housewarming (Grihapravesam), live food counters, and special event menu planning.

Strict rules you MUST follow:
1. ONLY answer questions related to My Chennai Catering, its menus, booking processes, services, and events.
2. NEVER answer general knowledge, coding, jokes, politics, sports, health, finance, religion, or any unrelated questions.
3. Keep your answers brief, professional, polite, and to the point.
4. DO NOT invent numeric prices.
5. When a customer indicates they want to book or get a quote, guide them to provide the required details. You MUST ask for these details one-by-one:
   1. Customer's Name
   2. Contact Phone Number
   3. Event Date
   4. Event Location
   5. Expected Number of Guests (Guest Count)
6. Triggering Lead Capture Email:
   When you have successfully collected ALL 5 of the details listed above, you MUST append this exact hidden tag on a new line at the very end of your response:
   [TRIGGER_INQUIRY: {"name": "NAME", "phone": "PHONE", "eventDate": "EVENT_DATE", "location": "LOCATION", "guestCount": "GUEST_COUNT"}]
`;

const BLOCK_MESSAGE = "I'm the AI assistant for My Chennai Catering. I can only help with our catering services, menus, bookings, and event enquiries. How can I assist you with your event?";

const DEFAULT_RESPONSES: Record<string, string> = {
  "wedding": "We specialize in Wedding Catering! Our traditional South Indian wedding feasts start with authentic banana leaf service. Please call us at +91 99403 96005 to book your dates.",
  "marriage": "We specialize in Wedding Catering! Our traditional South Indian wedding feasts start with authentic banana leaf service. Please call us at +91 99403 96005 to book your dates.",
  "corporate": "For corporate events, we offer both buffet and executive lunch boxes tailored to your team's needs.",
  "office": "For corporate events, we offer both buffet and executive lunch boxes tailored to your team's needs.",
  "birthday": "Birthdays are special! We provide customized menus including live counters, chaat, and traditional dishes.",
  "party": "For parties, we provide customized menus including live counters, chaat, and traditional dishes.",
  "price": "Our pricing depends on the menu and guest count. Please use our 'Customize Menu' tool or call us for a custom quote.",
  "cost": "Our pricing depends on the menu and guest count. Please use our 'Customize Menu' tool or call us for a custom quote.",
  "rate": "Our pricing depends on the menu and guest count. Please use our 'Customize Menu' tool or call us for a custom quote.",
  "location": "We serve all across Chennai and its suburbs. We'd love to cater your event!",
  "where": "We serve all across Chennai and its suburbs. We'd love to cater your event!",
  "hi": "Hello! Welcome to My Chennai Catering. How can I help you plan your event today?",
  "hello": "Hello! Welcome to My Chennai Catering. How can I help you plan your event today?",
  "role": "I am the AI event assistant for My Chennai Catering. I can answer questions about our menus, packages, services, serving locations, and guide you through getting a catering quote.",
  "who": "I am the AI event assistant for My Chennai Catering. I can answer questions about our menus, packages, services, serving locations, and guide you through getting a catering quote.",
  "what": "I am the AI event assistant for My Chennai Catering. I can answer questions about our menus, packages, services, serving locations, and guide you through getting a catering quote.",
  "assistant": "I am the AI event assistant for My Chennai Catering. I can answer questions about our menus, packages, services, serving locations, and guide you through getting a catering quote.",
  "menu": "We offer extensive Traditional South Indian, North Indian, and specialized menus. Check out our 'Services' or 'Customize Menu' page!",
  "book": "To book our catering services, please contact our catering desk directly at +91 99403 96005.",
  "contact": "You can reach us anytime at +91 99403 96005 or +91 99408 32988.",
  "phone": "You can reach us anytime at +91 99403 96005 or +91 99408 32988.",
  "default": "Thank you for reaching out! For more specific details, please contact our catering desk directly at +91 99403 96005 or try our 'Customize Menu' tool."
};

// State Machine Questions
const Q0 = "Hello! Welcome to My Chennai Catering. Would you like to get a catering quote for your event?";
const Q1 = "I'd love to help you get a quote! First, what is your name?";
const Q2 = "Thanks! What type of event is it (e.g., Wedding, Birthday, Corporate)?";
const Q3 = "Got it! What is the date of the event?";
const Q4 = "Wonderful! Approximately how many guests are you expecting?";
const Q5 = "Lastly, what is your contact phone number?";

function extractAnswer(history: any[], questionText: string): string | null {
  for (let i = 0; i < history.length - 1; i++) {
    const msg = history[i];
    if ((msg.role === 'assistant' || msg.role === 'model') && msg.content && msg.content.includes(questionText)) {
       const nextMsg = history[i+1];
       if (nextMsg && nextMsg.role === 'user') {
         return nextMsg.content;
       }
    }
  }
  return null;
}

let cachedKnowledgeBase = kbContent;
function getKnowledgeBase(): string {
  return cachedKnowledgeBase || "";
}

const getSystemInstruction = () => {
  const kbContent = getKnowledgeBase();
  return `You are the professional, friendly, and helpful AI assistant representing "My Chennai Catering (MCC)", a premium vegetarian catering service provider in Chennai established in 2006 (with over 20 years of experience).

Your job is to answer inquiries about wedding catering, engagement & reception catering, birthday parties, corporate catering, housewarming (Grihapravesam), live food counters, and special event menu planning.

Here is the official website content and information for your reference. You MUST answer everything asked by referencing this knowledge base:
${kbContent || "My Chennai Catering provides vegetarian catering in Chennai led by D. Venkat. Serving weddings, corporate, birthday parties, etc."}

Strict rules you MUST follow:
1. ONLY answer questions related to My Chennai Catering, its menus, booking processes, services, and events.
2. NEVER answer general knowledge, coding, jokes, politics, sports, health, finance, religion, or any unrelated questions.
3. Keep your answers brief, professional, polite, and to the point.
4. DO NOT invent numeric prices. If pricing is not in the knowledge base, explain that pricing depends on menus and guest counts and direct them to call +91 99403 96005 or use the 'Customize Menu' tool.
5. When a customer indicates they want to book or get a quote, guide them to provide the required details. You MUST ask for these details one-by-one:
   1. Customer's Name
   2. Contact Phone Number
   3. Event Date
   4. Event Location
   5. Expected Number of Guests (Guest Count)
6. Triggering Lead Capture Email:
   When you have successfully collected ALL 5 of the details listed above, you MUST append this exact hidden tag on a new line at the very end of your response:
   [TRIGGER_INQUIRY: {"name": "NAME", "phone": "PHONE", "eventDate": "EVENT_DATE", "location": "LOCATION", "guestCount": "GUEST_COUNT"}]
   Replace NAME, PHONE, EVENT_DATE, LOCATION, GUEST_COUNT with the actual values supplied by the user. Do not show the trigger tag to the user.
`;
};

export const chatFn = createServerFn({ method: 'POST' })
  .validator((data: { message: string; history: any[] }) => data)
  .handler(async ({ data }) => {
    const { message, history } = data;

    if (!message || typeof message !== 'string') {
      throw new Error('Message is required');
    }

    // Check if we have any LLM API keys configured.
    const hasKeys = !!(
      process.env.GEMINI_API_KEY_1 ||
      process.env.GEMINI_API_KEY_2 ||
      process.env.GEMINI_API_KEY ||
      process.env.OPENAI_API_KEY_1 ||
      process.env.OPENAI_API_KEY_2 ||
      process.env.OPENAI_API_KEY
    );

    if (hasKeys) {
      try {
        const { getLLMResponse } = await import('@/lib/llmService');
        
        // Prepare chat history for the LLM
        // We append the current user message to the history since the model needs the entire context.
        const fullHistory = [
          ...(history || []).map(h => ({
            role: h.role === 'model' || h.role === 'assistant' ? 'assistant' as const : 'user' as const,
            content: h.content
          })),
          { role: 'user' as const, content: message }
        ];

        // Retrieve response from the LLM (handles fallbacks automatically)
        const systemPrompt = getSystemInstruction();
        const llmResponse = await getLLMResponse(fullHistory, systemPrompt);

        // Process response for inquiry trigger
        let replyText = llmResponse;
        let inquiryDetails = null;
        const inquiryMatch = replyText.match(/\[TRIGGER_INQUIRY:\s*(\{.*?\})\]/);
        
        if (inquiryMatch) {
          try {
            inquiryDetails = JSON.parse(inquiryMatch[1]);
            // Remove the trigger tag from the user-visible reply text
            replyText = replyText.replace(/\[TRIGGER_INQUIRY:\s*\{.*?\}\]/, "").trim();
          } catch (e) {
            console.error('[Chatbot Action] Failed to parse TRIGGER_INQUIRY JSON:', e);
          }
        }

        return {
          success: true,
          text: replyText,
          inquiryDetails: inquiryDetails,
          blocked: false
        };
      } catch (err) {
        console.error('[Chatbot Action] LLM call failed, falling back to static state machine:', err);
      }
    }

    // Fallback: Static State Machine Logic
    const isRelated = isMessageRelatedToCatering(message, (history || []).length);
    if (!isRelated) {
      return { success: true, text: BLOCK_MESSAGE, blocked: true };
    }

    // Wait a brief moment to simulate typing/processing
    await new Promise(resolve => setTimeout(resolve, 800));

    const lowerMsg = message.toLowerCase();
    
    // Find the last message sent by the assistant
    let lastAssistantMessage = "";
    for (let i = (history || []).length - 1; i >= 0; i--) {
      if (history[i].role === 'assistant' || history[i].role === 'model') {
        lastAssistantMessage = history[i].content || "";
        break;
      }
    }

    let replyText = "";
    let inquiryDetails = null;

    // Check if user query matches any predefined static response keywords
    let matchedResponse = "";
    for (const key of Object.keys(DEFAULT_RESPONSES)) {
      if (lowerMsg.includes(key)) {
        matchedResponse = DEFAULT_RESPONSES[key];
        break;
      }
    }

    if (matchedResponse) {
      replyText = matchedResponse;
    } else if (lastAssistantMessage.includes(Q0)) {
      const positiveWords = ['yes', 'yeah', 'sure', 'ok', 'quote', 'book', 'please', 'yep', 'y', 'of course'];
      if (positiveWords.some(w => lowerMsg.match(new RegExp(`\\b${w}\\b`)))) {
        replyText = Q1;
      } else {
        replyText = "No problem! Feel free to ask if you have any questions about our menus or services, or type 'quote' anytime to start the booking process.";
      }
    } else if (lastAssistantMessage.includes(Q1)) {
      replyText = Q2;
    } else if (lastAssistantMessage.includes(Q2)) {
      replyText = Q3;
    } else if (lastAssistantMessage.includes(Q3)) {
      replyText = Q4;
    } else if (lastAssistantMessage.includes(Q4)) {
      replyText = Q5;
    } else if (lastAssistantMessage.includes(Q5)) {
      // Final State - Extract all answers
      const name = extractAnswer(history, Q1) || "Unknown";
      const eventType = extractAnswer(history, Q2) || "Unknown";
      const date = extractAnswer(history, Q3) || "Unknown";
      const guests = extractAnswer(history, Q4) || "Unknown";
      const phone = message; // Current message is the answer to Q5

      inquiryDetails = {
        name: name,
        phone: phone,
        eventDate: date,
        location: eventType, // Pass eventType in the location field for email
        guestCount: guests
      };

      replyText = `Thank you, ${name}! Generating your quote request for your ${eventType} event...`;
    } else {
      // Start flow if any trigger keyword is found
      const triggers = ["quote", "book", "price", "plan", "catering", "wedding", "corporate", "birthday", "party", "menu", "cost"];
      if (triggers.some(t => lowerMsg.includes(t))) {
        replyText = Q1;
      } else {
        replyText = Q0;
      }
    }

    return {
      success: true,
      text: replyText,
      inquiryDetails: inquiryDetails,
      blocked: false
    };
  });

export const sendEmailFn = createServerFn({ method: 'POST' })
  .validator((data: { name: string; phone: string; eventDate: string; location: string; guestCount: string }) => data)
  .handler(async ({ data }) => {
    try {
      // Dynamic import to prevent SSR top-level crash
      const nodemailer = (await import('nodemailer')).default;
      
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      const mailOptions = {
        from: process.env.SMTP_USER,
        to: process.env.MAIL_TO || process.env.SMTP_USER,
        subject: `New Catering Enquiry from ${data.name}`,
        html: `
          <h2>New Event Enquiry via Chatbot</h2>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Phone:</strong> ${data.phone}</p>
          <p><strong>Event Date:</strong> ${data.eventDate}</p>
          <p><strong>Event Type:</strong> ${data.location}</p>
          <p><strong>Guest Count:</strong> ${data.guestCount}</p>
        `,
      };

      await transporter.sendMail(mailOptions);
      return { success: true };
    } catch (error) {
      console.error('Email API Error:', error);
      throw new Error('Failed to send email');
    }
  });
