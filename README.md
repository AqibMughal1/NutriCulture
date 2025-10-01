# OptimalCloud.ai

OptimalCloud.ai is an innovative AI-powered platform that provides intelligent cloud deployment guidance and optimization recommendations. Our platform combines an interactive AI assistant with comprehensive project management tools to help developers and organizations deploy, optimize, and manage their cloud infrastructure efficiently.

## ✨ What We Offer

### 🤖 **AI-Powered Cloud Assistant**
- **Interactive Chat Interface**: Real-time conversation with AI assistant specialized in cloud deployment
- **Project-Specific Guidance**: Tailored recommendations based on your project type and requirements
- **File Upload & Analysis**: Upload configuration files, logs, and scripts for intelligent analysis
- **Multi-Cloud Expertise**: Support for AWS, Azure, and Google Cloud Platform

### 🚀 **Four Core Project Types**

#### 1. **New Deployment Guide** (Free)
- Step-by-step deployment instructions for new applications
- Cloud provider selection guidance
- Infrastructure setup recommendations
- Best practices for deployment architecture

#### 2. **Existing Project Optimization** (Premium)
- Analyze and optimize current cloud deployments
- Cost reduction strategies
- Performance improvement recommendations
- Security and compliance enhancements

#### 3. **Custom Deployment Requirements** (Premium)
- Submit detailed application requirements
- Receive AI-generated deployment strategies
- Customized configuration templates
- Architecture recommendations

#### 4. **Configuration Analysis** (Premium)
- Upload existing configuration files
- Automated optimization suggestions
- Cost and performance analysis
- Security vulnerability identification

### 💰 **Pricing Tiers**

#### Free Tier
- New Deployment Configuration Guide
- Basic cloud deployment recommendations
- Community support
- Limited to 5 configurations per month

#### OptimalCloud Pro ($299/month)
- All Free Tier features
- Existing Project Optimization
- Custom Deployment Requirements
- Configuration File Analysis
- Unlimited configurations
- Priority 24/7 support
- Advanced AI recommendations

### 🎯 **Key Features**

- **Project Management**: Create, organize, and track multiple cloud projects
- **Real-time Chat**: Interactive AI assistant with typing indicators and file sharing
- **Multi-Cloud Support**: AWS, Azure, and Google Cloud Platform integration
- **Modern UI**: Responsive design with gradient themes and smooth animations
- **Authentication**: Secure user accounts with role-based access control
- **Admin Dashboard**: Analytics and user management for administrators
- **File Upload**: Support for configuration files, logs, and documentation
- **Progressive Web App**: Optimized for desktop and mobile devices

## 🏗️ Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **UI Components**: Shadcn UI with custom animations and gradients
- **Database**: PostgreSQL with DrizzleORM
- **Authentication**: NextAuth.js with multiple providers
- **AI Integration**: Custom chat interface with streaming responses
- **Email**: React Email for transactional emails
- **Payments**: Stripe integration for subscriptions
- **Deployment**: Vercel-ready with modern CI/CD

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- pnpm, npm, or yarn
- Cloud provider account (AWS/Azure/GCP)

### Environment Setup

1. **Clone the repository:**
```bash
git clone https://github.com/aqibmughal/optimal-cloud-ai.git
cd optimal-cloud-ai
```

2. **Install dependencies:**
```bash
pnpm install
```

3. **Configure environment variables:**
```env
# Database Configuration
DATABASE_URL=postgresql://username:password@localhost:5432/optimal_cloud

# Authentication
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key

# AI Configuration
OPENAI_API_KEY=your-openai-api-key

# Email Configuration
RESEND_API_KEY=your-resend-api-key

# Stripe Configuration (for payments)
STRIPE_SECRET_KEY=your-stripe-secret-key
STRIPE_WEBHOOK_SECRET=your-stripe-webhook-secret
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
```

4. **Set up the database:**
```bash
pnpm drizzle-kit push
```

5. **Run the development server:**
```bash
pnpm run dev
```

Visit `http://localhost:3000` to access the application.

## 📁 Project Structure

```
├── app/                    # Next.js 14 app router
│   ├── (root)/            # Main application routes
│   │   ├── (routes)/      # Protected routes
│   │   │   ├── dashboard/ # Admin dashboard
│   │   │   ├── projects/  # Project management
│   │   │   ├── services/  # Services page
│   │   │   └── pricing/   # Pricing page
│   │   └── (auth)/        # Authentication pages
│   └── api/               # API routes
├── components/            # Reusable UI components
│   ├── ui/               # Shadcn UI components
│   └── ...               # Custom components
├── lib/                  # Utility functions and configurations
│   ├── db/               # Database schema and connection
│   ├── ai/               # AI model configuration
│   └── auth.ts           # Authentication setup
├── actions/              # Server actions
├── views/                # Page view components
└── schemas/              # Zod validation schemas
```

## 🔧 Core Features

### AI Assistant
- **Real-time Chat**: Interactive conversation with specialized AI
- **Context Awareness**: Maintains conversation history and project context
- **File Analysis**: Upload and analyze configuration files
- **Multi-format Support**: JSON, YAML, Terraform, Docker files

### Project Management
- **Project Types**: Four distinct deployment scenarios
- **Progress Tracking**: Monitor deployment progress and milestones
- **Team Collaboration**: Share projects with team members
- **Version Control**: Track changes and configurations

### Cloud Integration
- **Multi-Cloud Support**: AWS, Azure, Google Cloud Platform
- **Best Practices**: Industry-standard deployment patterns
- **Security Focus**: Built-in security recommendations
- **Cost Optimization**: Intelligent cost-saving suggestions

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
- **Projects**: Cloud deployment projects
- **Messages**: Chat conversation history
- **Purchases**: Subscription and payment records

### API Routes
- `/api/chat` - AI chat interface
- `/api/auth` - Authentication endpoints
- `/api/upload` - File upload handling
- `/api/emails` - Email notifications

## 🔐 Security

- **Authentication**: Secure user authentication with NextAuth.js
- **Authorization**: Role-based access control (admin/user)
- **Data Protection**: Encrypted data transmission and storage
- **File Upload**: Secure file handling with type validation
- **API Security**: Rate limiting and request validation

## 🚀 Deployment

The application is optimized for deployment on Vercel:

1. **Build the application:**
```bash
pnpm run build
```

2. **Deploy to Vercel:**
```bash
vercel --prod
```

3. **Configure environment variables** in your Vercel dashboard
4. **Set up database** and run migrations
5. **Configure domain** and SSL certificates

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

- **Email**: support@optimalcloud.ai
- **Documentation**: Comprehensive in-app documentation
- **Community**: Discord community for discussions
- **Issues**: GitHub issues for bug reports and feature requests

---

**Built with ❤️ by the OptimalCloud.ai Team**

Project Link: [https://github.com/aqibmughal/optimal-cloud-ai](https://github.com/aqibmughal/optimal-cloud-ai)
