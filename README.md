# NutriCulture

NutriCulture is an innovative AI-powered nutrition platform that provides personalized nutrition guidance, meal planning, and healthy lifestyle management. Our platform combines an interactive AI assistant with comprehensive nutrition analysis tools to help users achieve their health goals through intelligent meal recommendations, recipe customization, and dietary advice.

## ✨ What We Offer

### 🎯 **5-Step Personalized Nutrition Workflow**

Start your personalized nutrition journey with our comprehensive workflow designed to guide you from health assessment to meal planning.

#### 1. **BMI Calculator** (FREE)
- Calculate your Body Mass Index with multiple unit support (cm, ft/in, kg, lb)
- Automatic goal determination (lose/gain/maintain weight)
- BMI data shared across all modules for personalized recommendations
- Health category assessment

#### 2. **Nutrition Analysis** (PREMIUM)
- Upload food pictures with optional weight estimation
- Get detailed nutrition breakdown (proteins, fats, vitamins, minerals)
- AI-powered image recognition and analysis
- Instant nutritional insights

#### 3. **AI Meal Suggestions** (FREE)
- Enter eating preferences and dietary restrictions
- Provide address and city for location-based restaurant recommendations
- Get personalized meal plans based on your BMI goal
- Restaurant recommendations with addresses

#### 4. **Recipe Customization & Healthy Recipes** (FREE)
- Enter ingredients you have available
- Get healthy recipe suggestions tailored to your BMI goal
- Recipes optimized for your health objectives
- Discover healthy South Asian and Middle Eastern dishes

#### 5. **Ingredient Substitution** (FREE)
- Enter minimum ingredients you have
- Get healthy substitute recipes with minimal ingredients
- Substitutions based on your health goal
- Simple recipes with minimal ingredients

### 💬 **Additional Features**

#### **Nutrition Chat** (FREE)
- Chat with AI about nutrition, meal planning, and dietary advice
- Recreate meal plans you don't like
- Get answers to nutrition questions
- Personalized dietary guidance based on your BMI and goals

### 💰 **Pricing Tiers**

#### Free Tier
- BMI Calculator
- AI Meal Suggestions
- Recipe Customization
- Healthy Recipes
- Ingredient Substitution
- Nutrition Chat
- Community support

#### Premium ($9.99/month)
- All Free Tier features
- Image Nutrition Analysis
- Priority AI support
- Advanced recommendations
- 30-day free trial
- Cancel anytime

## 🎯 **Key Features**

- **AI-Powered Nutrition Assistant**: Real-time conversation with specialized nutrition AI
- **BMI-Based Personalization**: All recommendations tailored to your health goals
- **Image Analysis**: Upload meal photos for instant nutrition breakdown (Premium)
- **Location-Based Recommendations**: Get restaurant suggestions near you
- **Recipe Generator**: Discover healthy recipes based on available ingredients
- **Ingredient Substitution**: Transform recipes into healthier versions
- **Multi-Unit Support**: Flexible measurement units (metric and imperial)
- **Modern UI**: Responsive design with gradient themes and smooth animations
- **Authentication**: Secure user accounts with email verification
- **Dashboard**: Track your nutrition goals and progress

## 🏗️ Tech Stack

- **Frontend**: Next.js 15 (App Router), TypeScript, Tailwind CSS
- **UI Components**: Shadcn UI with custom animations and gradients
- **Database**: PostgreSQL with DrizzleORM
- **Authentication**: Better Auth with email verification
- **AI Integration**: OpenAI SDK with streaming responses
- **Email**: React Email for transactional emails
- **Payments**: Stripe integration for subscriptions
- **Deployment**: Vercel-ready with modern CI/CD

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- pnpm, npm, or yarn
- OpenAI API key (for AI features)
- Stripe account (for payments)
- Resend API key (for emails)

### Environment Setup

1. **Clone the repository:**
```bash
git clone <repository-url>
cd Nutriculture
```

2. **Install dependencies:**
```bash
pnpm install
```

3. **Configure environment variables:**

Create a `.env` file in the root directory:

```env
# Database Configuration
DATABASE_URL=postgresql://username:password@localhost:5432/nutriculture

# Authentication (Better Auth)
BETTER_AUTH_SECRET=your-secret-key
BETTER_AUTH_URL=http://localhost:3000

# AI Configuration
OPENAI_API_KEY=your-openai-api-key
# OR use OpenRouter
OPENROUTER_API_KEY=your-openrouter-api-key

# Email Configuration
RESEND_API_KEY=your-resend-api-key

# Stripe Configuration (for payments)
STRIPE_SECRET_KEY=your-stripe-secret-key
STRIPE_WEBHOOK_SECRET=your-stripe-webhook-secret
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key

# File Upload (Vercel Blob)
BLOB_READ_WRITE_TOKEN=your-vercel-blob-token
```

4. **Set up the database:**
```bash
pnpm db:push
```

Or generate migrations:
```bash
pnpm db:generate
```

5. **Run the development server:**
```bash
pnpm dev
```

Visit `http://localhost:3000` to access the application.

### Available Scripts

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm db:generate` - Generate database migrations
- `pnpm db:push` - Push database schema changes
- `pnpm db:studio` - Open Drizzle Studio
- `pnpm email` - Start React Email dev server

## 📁 Project Structure

```
├── app/                          # Next.js 15 app router
│   ├── (root)/                   # Main application routes
│   │   ├── (routes)/             # Protected routes
│   │   │   ├── dashboard/        # User dashboard
│   │   │   ├── settings/         # User settings
│   │   │   ├── services/         # Services page
│   │   │   └── pricing/          # Pricing page
│   │   └── (auth)/               # Authentication pages
│   │       ├── login/            # Login page
│   │       ├── register/         # Registration page
│   │       └── forgot-password/  # Password reset
│   ├── api/                      # API routes
│   │   ├── auth/                 # Authentication endpoints
│   │   ├── bmi/                  # BMI calculation
│   │   ├── nutrition-chat/       # Nutrition chat API
│   │   └── upload/               # File upload handling
│   ├── bmi-calculator/           # BMI calculator page
│   ├── nutrition-analysis/       # Nutrition analysis page
│   ├── ai-meal-suggestions/      # AI meal suggestions page
│   ├── recipe-customization/     # Recipe customization page
│   ├── healthy-recipes/          # Healthy recipes page
│   ├── ingredient-substitution/  # Ingredient substitution page
│   ├── nutrition-chat/           # Nutrition chat page
│   └── get-started/              # Get started page
├── app/src/
│   ├── components/               # Reusable UI components
│   │   ├── ui/                   # Shadcn UI components
│   │   ├── auth/                 # Authentication components
│   │   └── ...                   # Custom components
│   ├── lib/                      # Utility functions and configurations
│   │   ├── db/                   # Database schema and connection
│   │   ├── ai/                   # AI model configuration
│   │   └── auth-client.ts        # Authentication client
│   ├── actions/                  # Server actions
│   ├── views/                    # Page view components
│   ├── schemas/                  # Zod validation schemas
│   ├── contexts/                 # React contexts
│   └── hooks/                   # Custom React hooks
└── public/                       # Static assets
```

## 🔧 Core Features

### AI Nutrition Assistant
- **Real-time Chat**: Interactive conversation with specialized nutrition AI
- **Context Awareness**: Maintains conversation history and user BMI/goals
- **Image Analysis**: Upload meal photos for nutrition breakdown (Premium)
- **Personalized Advice**: Recommendations based on BMI and health goals

### Nutrition Tools
- **BMI Calculator**: Multi-unit support with goal determination
- **Meal Suggestions**: Location-based restaurant recommendations
- **Recipe Generator**: Healthy recipes based on available ingredients
- **Ingredient Substitution**: Transform recipes into healthier versions
- **Nutrition Analysis**: Detailed breakdown of proteins, vitamins, fats

### User Management
- **Authentication**: Secure user accounts with email verification
- **Dashboard**: Track nutrition goals and progress
- **Settings**: Manage profile and preferences
- **Premium Access**: Stripe-powered subscription management

## 🎨 UI/UX Features

- **Modern Design**: Gradient-based theme with smooth animations
- **Responsive Layout**: Mobile-first design approach
- **Dark/Light Mode**: Theme switching with system preference
- **Interactive Elements**: Hover effects, loading states, and transitions
- **Accessibility**: WCAG compliant components and navigation

## 🛠️ Development

### Database Schema
The application uses PostgreSQL with DrizzleORM for type-safe database operations:

- **Users**: User accounts and authentication
- **BMI Data**: User BMI calculations and health goals
- **Messages**: Chat conversation history
- **Purchases**: Subscription and payment records

### API Routes
- `/api/auth` - Authentication endpoints (Better Auth)
- `/api/bmi` - BMI calculation endpoint
- `/api/nutrition-chat` - Nutrition chat interface
- `/api/upload` - File upload handling

## 🔐 Security

- **Authentication**: Secure user authentication with Better Auth
- **Authorization**: Role-based access control (admin/user)
- **Data Protection**: Encrypted data transmission and storage
- **File Upload**: Secure file handling with type validation
- **API Security**: Rate limiting and request validation
- **Email Verification**: Required for full feature access

## 🚀 Deployment

The application is optimized for deployment on Vercel:

1. **Build the application:**
```bash
pnpm build
```

2. **Deploy to Vercel:**
```bash
vercel --prod
```

3. **Configure environment variables** in your Vercel dashboard
4. **Set up database** and run migrations
5. **Configure domain** and SSL certificates

### Environment Variables for Production

Make sure to set all required environment variables in your Vercel project settings:
- Database URL
- Better Auth secret and URL
- OpenAI/OpenRouter API key
- Resend API key
- Stripe keys
- Vercel Blob token

## 🤝 Contributing

We welcome contributions! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

- **Email**: support@nutriculture.com
- **Documentation**: Comprehensive in-app documentation
- **Issues**: GitHub issues for bug reports and feature requests

---

**Built with ❤️ by the NutriCulture Team**

Project Link: [GitHub Repository](https://github.com/yourusername/nutriculture)
