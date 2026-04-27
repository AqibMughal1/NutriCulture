# NutriCulture - Software Design Document

## Table of Contents
1. Design Methodology and Software Process Model
2. System Overview
3. Architectural Design
4. Process Flow/Representation
5. Design Models
6. Data Design
7. Data Dictionary
8. Algorithm & Implementation
9. Software Requirements Traceability Matrix
10. Human Interface Design

---

## 1. Design Methodology and Software Process Model

### 1.1 Design Methodology: Object-Oriented Programming (OOP)

**Justification for OOP:**

NutriCulture follows the Object-Oriented Programming (OOP) paradigm for the following reasons:

1. **Modularity & Encapsulation**: The application is built using React components that encapsulate their own state, logic, and UI. Each view (BMICalculatorView, NutritionAnalysisView, etc.) is a self-contained module with its own properties and methods.

2. **Reusability**: UI components from Shadcn/UI library are reused across the application. Custom components like Cards, Buttons, and Inputs are shared across multiple views, reducing code duplication.

3. **Inheritance & Composition**: React's component composition model allows building complex UIs from simpler components. Context providers (BMIContext) share state across the component tree following the provider pattern.

4. **Abstraction**: The AI integration abstracts complex API calls behind simple interfaces. Database operations are abstracted through DrizzleORM, hiding SQL complexity from the application layer.

5. **Maintainability**: OOP makes it easier to maintain and extend the codebase as new features can be added without modifying existing code. Each module can be updated independently.

**[INSERT DIAGRAM 1: OOP Principles Diagram]**

### 1.2 Software Process Model: Agile with Iterative Development

**Justification:**

NutriCulture follows an Agile Iterative Development model for the following reasons:

1. **Incremental Feature Development**: Features are developed incrementally in a logical sequence (BMI Calculator → Nutrition Analysis → Meal Suggestions → Recipes → AI Chat).

2. **Continuous Integration**: Next.js with Vercel enables continuous deployment and integration. Every code push triggers automatic builds and deployments.

3. **User Feedback Loops**: The AI chat feature allows real-time user feedback incorporation. Users can request modifications to meal plans instantly.

4. **Flexibility**: Easy to add new nutrition modules without disrupting existing functionality. The modular architecture supports rapid feature additions.

5. **Sprint-Based Development**: Features organized into independent modules allow parallel development by team members.

**[INSERT DIAGRAM 2: Agile Iterative Model Diagram]**

---

## 2. System Overview

### 2.1 General Description

NutriCulture is an AI-powered nutrition platform that provides personalized nutrition guidance, meal planning, and healthy lifestyle management. The system combines an interactive AI assistant with comprehensive nutrition analysis tools to help users achieve their health goals through intelligent meal recommendations, recipe customization, and dietary advice.

### 2.2 System Context

The NutriCulture platform operates within an ecosystem of external services and actors:

**External Actors:**
- **Users/Clients**: Primary users who access nutrition features
- **Administrators**: System administrators who manage users and content

**External Systems:**
- **OpenAI/OpenRouter API**: Provides AI-powered responses for nutrition chat and analysis
- **Stripe Payment Gateway**: Handles subscription payments and billing
- **Resend Email Service**: Manages transactional emails (verification, password reset)
- **Google OAuth**: Social authentication provider
- **GitHub OAuth**: Social authentication provider
- **Vercel Blob Storage**: Stores uploaded food images

**[INSERT DIAGRAM 3: System Context Diagram]**

### 2.3 Core Functionality

The NutriCulture platform provides the following core functionality areas:

**Health Assessment Module:**
- BMI Calculator with multiple unit support (cm, ft/in, kg, lb)
- Automatic goal determination (lose/gain/maintain weight)
- Health category assessment

**Nutrition Analysis Module (Premium):**
- Food image upload and recognition
- Detailed nutrient breakdown (proteins, fats, vitamins, minerals)
- AI-powered nutritional analysis

**Meal Planning Module:**
- AI-generated meal suggestions based on preferences
- Location-based restaurant recommendations
- Personalized meal plans based on BMI goals

**Recipe Management Module:**
- Healthy recipe suggestions
- Recipe customization for health goals
- Ingredient substitution recommendations

**AI Assistant Module:**
- Interactive nutrition chat
- Personalized dietary advice
- Meal plan recreation on request

**User Management Module:**
- User authentication and authorization
- Subscription management
- Dashboard and settings

**[INSERT DIAGRAM 4: Core Functionality Mind Map]**

### 2.4 Technology Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| Frontend | Next.js 15, React, TypeScript | Application framework and UI |
| Styling | Tailwind CSS | Utility-first CSS framework |
| UI Components | Shadcn/UI | Pre-built accessible components |
| Backend | Next.js API Routes | Server-side API endpoints |
| Database | PostgreSQL | Relational data storage |
| ORM | DrizzleORM | Type-safe database operations |
| Authentication | Better Auth | User authentication and sessions |
| AI Integration | OpenAI SDK, OpenRouter | AI-powered features |
| Email | Resend, React Email | Transactional emails |
| Payments | Stripe | Subscription management |
| Deployment | Vercel | Hosting and CI/CD |

---

## 3. Architectural Design

### 3.1 High-Level Architecture

NutriCulture follows a Layered Architecture with Client-Server model. The system is decomposed into the following layers:

**Presentation Layer:**
- React Components & Views
- Shadcn/UI Components
- Handles user interface and user interactions

**Application Layer:**
- Server Actions
- API Routes
- Context Providers
- Manages application logic and state

**Business Logic Layer:**
- AI Service Layer
- Authentication Service
- Payment Service
- Contains core business rules and logic

**Data Access Layer:**
- DrizzleORM
- Schema Definitions
- Handles database operations

**Data Layer:**
- PostgreSQL Database
- Blob Storage
- Stores persistent data

**[INSERT DIAGRAM 5: High-Level Architecture Diagram]**

### 3.2 Module Decomposition

The system is decomposed into the following major modules:

**Authentication Module:**
- Login functionality
- User registration
- Forgot password
- Email verification

**Core Nutrition Module:**
- BMI Calculator
- Nutrition Analysis
- Meal Suggestions
- Healthy Recipes
- Recipe Customization
- Ingredient Substitution

**AI Module:**
- Nutrition Chat interface
- AI Prompts management
- AI Model Handler

**User Management Module:**
- Dashboard
- Settings
- Profile management

**Payment Module:**
- Subscription management
- Payment processing
- Webhook handlers

**[INSERT DIAGRAM 6: Module Decomposition Diagram]**

### 3.3 Component Diagram

The component diagram shows how the major software components interact with each other and external services.

**[INSERT DIAGRAM 7: Component Diagram]**

### 3.4 Deployment Architecture

The application is deployed using Vercel's serverless architecture:

- **Client**: Web browsers accessing the application
- **Vercel Edge Network**: CDN and serverless function execution
- **External Services**: PostgreSQL (Neon/Supabase), Vercel Blob, OpenRouter/OpenAI, Stripe, Resend

**[INSERT DIAGRAM 8: Deployment Architecture Diagram]**

---

## 4. Process Flow/Representation

### 4.1 Main User Journey Activity Diagram

The main user journey follows this process:

1. User authenticates (login/register)
2. User calculates their BMI
3. BMI data is stored in context and shared across modules
4. User chooses a module to explore:
   - Nutrition Analysis (Premium)
   - Meal Suggestions
   - Healthy Recipes
   - Recipe Customization
   - Ingredient Substitution
   - Nutrition Chat
5. Each module uses the BMI data to provide personalized recommendations
6. User can navigate between modules or use the AI chat for additional help

**[INSERT DIAGRAM 9: Main User Journey Activity Diagram]**

### 4.2 Nutrition Analysis Process Flow

The nutrition analysis process follows these steps:

1. Check if user has premium subscription
2. If not premium, show upgrade prompt
3. If premium, allow image upload
4. Validate uploaded image
5. Optionally accept weight input
6. Send image to AI for analysis
7. AI identifies the food item
8. Calculate nutritional values
9. Generate and display analysis report
10. Show macronutrients, vitamins, and minerals

**[INSERT DIAGRAM 10: Nutrition Analysis Process Flow Diagram]**

### 4.3 AI Chat Process Flow

The AI chat process follows these steps:

1. Check if BMI data is available
2. Load BMI context or use default
3. Display chat interface
4. Wait for user input
5. Validate user message
6. Save user message to database
7. Build system prompt with BMI context
8. Send to AI model (OpenAI/OpenRouter)
9. Stream AI response
10. Display response and save to database
11. Repeat for additional queries

**[INSERT DIAGRAM 11: AI Chat Process Flow Diagram]**

---

## 5. Design Models

### 5.1 Class Diagram

The class diagram shows the main entities and their relationships in the NutriCulture system.

**Main Entities:**

**User Class:**
- Attributes: id, name, email, emailVerified, image, role, banned, stripeCustomerId, createdAt, updatedAt
- Methods: createSession(), updateProfile(), verifyEmail()

**Session Class:**
- Attributes: id, expiresAt, token, ipAddress, userAgent, userId, createdAt, updatedAt
- Methods: validate(), refresh(), revoke()

**Account Class:**
- Attributes: id, accountId, providerId, userId, accessToken, refreshToken, password, createdAt, updatedAt
- Methods: linkProvider(), unlinkProvider()

**Subscription Class:**
- Attributes: id, plan, referenceId, stripeCustomerId, stripeSubscriptionId, status, periodStart, periodEnd, cancelAtPeriodEnd, seats
- Methods: activate(), cancel(), renew()

**Project Class:**
- Attributes: id, name, userId, type, cloudProvider, additionalNotes, generatedDeploymentGuide, createdAt, updatedAt
- Methods: generateGuide(), updateConfig()

**Message Class:**
- Attributes: id, projectId, role, parts, attachments, createdAt
- Methods: send(), formatContent()

**Purchase Class:**
- Attributes: id, userId, amount, createdAt, updatedAt
- Methods: process(), refund()

**Verification Class:**
- Attributes: id, identifier, value, expiresAt, createdAt
- Methods: validate(), expire()

**BMIData Class:**
- Attributes: bmi, category, goal, height, weight, heightUnit, weightUnit
- Methods: calculate(), determineGoal()

**Relationships:**
- User has many Sessions (1:N)
- User has many Accounts (1:N)
- User owns many Projects (1:N)
- User makes many Purchases (1:N)
- User has one Subscription (1:1)
- Project contains many Messages (1:N)
- Verification verifies one User (1:1)

**[INSERT DIAGRAM 12: Class Diagram]**

### 5.2 Component Class Diagram (React Components)

This diagram shows the React view components and their properties/methods.

**BMICalculatorView:**
- Properties: heightValue, heightUnit, weightValue, weightUnit, bmi, category, goal
- Methods: calculateBMI(), convertHeightToMeters(), convertWeightToKg(), getCategoryColor(), getGoalText()

**NutritionAnalysisView:**
- Properties: image, preview, estimatedWeight, analysis, loading
- Methods: handleImageChange(), handleRemoveImage(), handleAnalyze()

**AIMealSuggestionsView:**
- Properties: preferences, address, city, suggestions, loading
- Methods: handleGetSuggestions()

**NutritionChatView:**
- Properties: chatId, messages, input, isLoading
- Methods: handleFormSubmit(), handleSuggestionClick(), copyToClipboard(), getMessageContent()

**RecipeCustomizationView:**
- Properties: availableIngredients, substitutedRecipes, loading
- Methods: handleGenerateSubstitutes()

**BMIContext:**
- Properties: bmiData
- Methods: setBMIData(), getBMIData()

All view components use the BMIContext for accessing shared BMI data.

**[INSERT DIAGRAM 13: Component Class Diagram]**

### 5.3 Sequence Diagram - BMI Calculation and Storage

This sequence diagram shows the interaction between components during BMI calculation:

1. User enters height and weight in the UI
2. BMICalculatorView converts units to standard format
3. BMICalculatorView calculates BMI and determines category/goal
4. BMICalculatorView stores data in BMIContext
5. BMICalculatorView sends POST request to /api/bmi
6. API stores BMI data in database
7. UI displays result and continue button
8. User navigates to next step

**[INSERT DIAGRAM 14: BMI Calculation Sequence Diagram]**

### 5.4 Sequence Diagram - Nutrition Chat

This sequence diagram shows the nutrition chat flow:

1. User enters chat message
2. NutritionChatView submits via useChat hook
3. API route validates session
4. API finds or creates chat project
5. API saves user message to database
6. API builds system prompt with BMI context
7. API streams response from AI model
8. Streaming chunks displayed to user
9. Complete response saved to database

**[INSERT DIAGRAM 15: Nutrition Chat Sequence Diagram]**

### 5.5 Sequence Diagram - Subscription Flow

This sequence diagram shows the subscription process:

1. User clicks Subscribe on pricing page
2. UI checks authentication
3. API creates Stripe checkout session
4. User redirected to Stripe Checkout
5. User completes payment
6. Stripe sends webhook notification
7. Webhook handler creates subscription record
8. User redirected to success page

**[INSERT DIAGRAM 16: Subscription Sequence Diagram]**

### 5.6 State Transition Diagram - User Authentication

This state diagram shows the possible states during user authentication:

**States:**
- Unauthenticated
- Registering
- PendingVerification
- EmailVerified
- Authenticated
- Active
- Premium
- PasswordReset
- Banned

**Transitions:**
- Unauthenticated → Registering (Click Register)
- Registering → PendingVerification (Submit valid form)
- PendingVerification → EmailVerified (Click verification link)
- EmailVerified → Authenticated (Auto sign-in)
- Unauthenticated → Authenticated (Login with credentials or OAuth)
- Authenticated → Active (Access granted)
- Active → Premium (Subscribe to Pro)
- Premium → Active (Subscription ends)
- Active → PasswordReset (Request reset)
- PasswordReset → Active (Password changed)
- Authenticated → Unauthenticated (Logout)
- Authenticated → Banned (Admin action)

**[INSERT DIAGRAM 17: User Authentication State Diagram]**

### 5.7 State Transition Diagram - BMI Workflow

This state diagram shows the BMI calculation workflow:

**States:**
- NoBMI
- InputHeight
- InputWeight
- Calculating
- Underweight
- NormalWeight
- Overweight
- Obese
- GoalGain
- GoalMaintain
- GoalLose
- ContextUpdated

**Transitions:**
- NoBMI → InputHeight (Start BMI Calculator)
- InputHeight → InputWeight (Height entered)
- InputWeight → Calculating (Weight entered)
- Calculating → Underweight/NormalWeight/Overweight/Obese (Based on BMI value)
- Category states → Goal states (Auto-set goal)
- Goal states → ContextUpdated (Save to context)
- ContextUpdated → Next modules (Continue)

**[INSERT DIAGRAM 18: BMI Workflow State Diagram]**

### 5.8 Data Flow Diagram - Level 0 (Context Diagram)

This is the highest level DFD showing the system boundary and external entities:

**External Entities:**
- User
- Admin
- AI Service
- Payment Service
- Email Service

**Data Flows:**
- User → System: User Data, Queries
- System → User: Nutrition Info, Recommendations
- Admin → System: Admin Commands
- System → Admin: System Status, Reports
- System ↔ AI Service: AI Prompts / AI Responses
- System ↔ Payment Service: Payment Requests / Confirmations
- System ↔ Email Service: Email Requests / Delivery Status

**[INSERT DIAGRAM 19: DFD Level 0]**

### 5.9 Data Flow Diagram - Level 1

This DFD shows the major processes within the system:

**Processes:**
- 1.0 Authentication
- 2.0 BMI Processing
- 3.0 Nutrition Analysis
- 4.0 Meal Suggestions
- 5.0 AI Chat
- 6.0 Subscription Management

**Data Stores:**
- D1: User Store
- D2: Session Store
- D3: Project Store
- D4: Message Store
- D5: Subscription Store

**[INSERT DIAGRAM 20: DFD Level 1]**

### 5.10 Data Flow Diagram - Level 2 (AI Chat Process)

This DFD expands the AI Chat process (5.0):

**Sub-Processes:**
- 5.1 Validate Session
- 5.2 Load/Create Chat Project
- 5.3 Save User Message
- 5.4 Build System Prompt
- 5.5 Stream AI Response
- 5.6 Save AI Response

**[INSERT DIAGRAM 21: DFD Level 2 - AI Chat]**

---

## 6. Data Design

### 6.1 Entity-Relationship Diagram

The ER diagram shows the database schema with all entities and their relationships.

**Entities and Attributes:**

**USERS:**
- id (PK, text)
- name (text)
- email (text, unique)
- emailVerified (boolean)
- image (text)
- role (text)
- banned (boolean)
- banReason (text)
- banExpires (timestamp)
- stripeCustomerId (text)
- createdAt (timestamp)
- updatedAt (timestamp)

**SESSIONS:**
- id (PK, text)
- expiresAt (timestamp)
- token (text, unique)
- ipAddress (text)
- userAgent (text)
- impersonatedBy (text)
- userId (FK, text)
- createdAt (timestamp)
- updatedAt (timestamp)

**ACCOUNTS:**
- id (PK, text)
- accountId (text)
- providerId (text)
- userId (FK, text)
- accessToken (text)
- refreshToken (text)
- idToken (text)
- accessTokenExpiresAt (timestamp)
- refreshTokenExpiresAt (timestamp)
- scope (text)
- password (text)
- createdAt (timestamp)
- updatedAt (timestamp)

**SUBSCRIPTIONS:**
- id (PK, text)
- plan (text)
- referenceId (text)
- stripeCustomerId (text)
- stripeSubscriptionId (text)
- status (text)
- periodStart (timestamp)
- periodEnd (timestamp)
- cancelAtPeriodEnd (boolean)
- seats (integer)

**PROJECTS:**
- id (PK, uuid)
- name (text)
- userId (FK, text)
- cloudProvider (text)
- additionalNotes (text)
- type (text)
- configFileContent (text)
- optimizationType (text)
- applicationType (text)
- language (text)
- framework (text)
- generatedDeploymentGuide (text)
- createdAt (timestamp)
- updatedAt (timestamp)

**MESSAGES:**
- id (PK, uuid)
- projectId (FK, uuid)
- role (text)
- parts (json)
- attachments (json)
- createdAt (timestamp)

**PURCHASES:**
- id (PK, uuid)
- userId (FK, text)
- amount (numeric)
- createdAt (timestamp)
- updatedAt (timestamp)

**VERIFICATIONS:**
- id (PK, text)
- identifier (text)
- value (text)
- expiresAt (timestamp)
- createdAt (timestamp)
- updatedAt (timestamp)

**Relationships:**
- USERS ||--o{ SESSIONS (one-to-many)
- USERS ||--o{ ACCOUNTS (one-to-many)
- USERS ||--o{ PROJECTS (one-to-many)
- USERS ||--o{ PURCHASES (one-to-many)
- USERS ||--o| SUBSCRIPTIONS (one-to-one)
- PROJECTS ||--o{ MESSAGES (one-to-many)

**[INSERT DIAGRAM 22: Entity-Relationship Diagram]**

### 6.2 Data Storage Organization

| Data Store | Type | Purpose |
|------------|------|---------|
| PostgreSQL | Relational Database | Primary data storage for users, sessions, projects, messages, subscriptions |
| Vercel Blob | Object Storage | File uploads (food images for nutrition analysis) |
| React Context | In-memory | BMI data shared across components during session |
| Local Storage | Browser Storage | Session persistence, theme preferences |

### 6.3 Data Flow Organization

Data flows through the system in the following manner:

1. **Data Sources**: User input, AI responses, payment events
2. **Processing**: API routes and server actions process the data
3. **Storage**: Data is persisted in PostgreSQL, Vercel Blob, or React Context based on type

---

## 7. Data Dictionary

### 7.1 Database Entities

| Entity | Attribute | Type | Description |
|--------|-----------|------|-------------|
| **users** | id | text | Primary key, unique user identifier |
| | name | text | User's full name |
| | email | text | User's email address (unique) |
| | emailVerified | boolean | Whether email is verified |
| | image | text | URL to profile image |
| | role | text | User role (user/admin) |
| | banned | boolean | Account ban status |
| | stripeCustomerId | text | Stripe customer ID for payments |
| | createdAt | timestamp | Account creation time |
| | updatedAt | timestamp | Last update time |
| **sessions** | id | text | Primary key, session identifier |
| | expiresAt | timestamp | Session expiration time |
| | token | text | Session token (unique) |
| | ipAddress | text | Client IP address |
| | userAgent | text | Client browser/device info |
| | userId | text | Foreign key to users table |
| **accounts** | id | text | Primary key, account identifier |
| | accountId | text | OAuth provider account ID |
| | providerId | text | OAuth provider name (google, github) |
| | userId | text | Foreign key to users table |
| | password | text | Hashed password (for credential auth) |
| | accessToken | text | OAuth access token |
| **subscriptions** | id | text | Primary key, subscription ID |
| | plan | text | Subscription plan name (pro) |
| | status | text | Subscription status (active, cancelled) |
| | stripeSubscriptionId | text | Stripe subscription ID |
| | periodStart | timestamp | Billing period start |
| | periodEnd | timestamp | Billing period end |
| **projects** | id | uuid | Primary key, project identifier |
| | name | text | Project name (e.g., "Nutrition Chat") |
| | userId | text | Foreign key to users table |
| | type | text | Project type (nutrition-chat) |
| | generatedDeploymentGuide | text | AI-generated content |
| **messages** | id | uuid | Primary key, message identifier |
| | projectId | uuid | Foreign key to projects table |
| | role | text | Message role (user/assistant) |
| | parts | json | Message content parts |
| | attachments | json | File attachments |
| **purchases** | id | uuid | Primary key, purchase identifier |
| | userId | text | Foreign key to users table |
| | amount | numeric | Purchase amount in currency |

### 7.2 Application Objects

| Object | Attribute | Type | Description |
|--------|-----------|------|-------------|
| **BMIData** | bmi | number | Calculated BMI value (e.g., 22.5) |
| | category | string | BMI category (Underweight/Normal weight/Overweight/Obese) |
| | goal | string | Health goal (lose/gain/maintain) |
| | height | number | Height in centimeters |
| | weight | number | Weight in kilograms |
| | heightUnit | string | Height unit used (cm/ft/in) |
| | weightUnit | string | Weight unit used (kg/lb) |
| **NutritionAnalysis** | dishName | string | AI-identified dish name |
| | weight | string | Estimated or provided weight |
| | nutrition | object | Macronutrient breakdown (calories, protein, carbs, fats, fiber, sodium) |
| | vitamins | object | Vitamin content (A, C, D, E, K) |
| | minerals | object | Mineral content (calcium, iron, potassium, magnesium) |
| **MealSuggestion** | name | string | Restaurant name |
| | dish | string | Recommended dish name |
| | address | string | Restaurant street address |
| | distance | string | Distance from user (e.g., "0.5 miles") |
| | cuisine | string | Cuisine type (e.g., Mediterranean, Asian) |
| | price | string | Price range ($/$$/$$$) |
| | rating | number | Restaurant rating (1-5) |

### 7.3 Functions/Methods Dictionary

| Component | Method | Parameters | Return Type | Description |
|-----------|--------|------------|-------------|-------------|
| **BMICalculatorView** | calculateBMI | - | void | Calculates BMI from height/weight and sets goal |
| | convertHeightToMeters | - | number | Converts height to meters based on unit |
| | convertWeightToKg | - | number | Converts weight to kg based on unit |
| | getCategoryColor | - | string | Returns CSS color class based on category |
| | getGoalText | - | string | Returns formatted goal text |
| **NutritionAnalysisView** | handleImageChange | event: ChangeEvent | void | Handles image file upload |
| | handleRemoveImage | - | void | Clears uploaded image |
| | handleAnalyze | - | Promise<void> | Sends image for AI analysis |
| **NutritionChatView** | handleFormSubmit | event: FormEvent | void | Submits chat message to API |
| | handleSuggestionClick | suggestion: string | void | Inserts suggestion into input |
| | copyToClipboard | text: string, id: string | Promise<void> | Copies message to clipboard |
| | getMessageContent | message: Message | string | Extracts text content from message |
| **Auth Service** | signIn | credentials: object | Promise<Session> | Authenticates user and creates session |
| | signUp | userData: object | Promise<User> | Creates new user account |
| | signOut | - | Promise<void> | Ends user session |
| **AI Service** | streamText | model, messages, system | ReadableStream | Streams AI response tokens |

---

## 8. Algorithm & Implementation

### 8.1 BMI Calculation Algorithm

**Algorithm: CalculateBMI**

**Input:** height, heightUnit, weight, weightUnit

**Output:** bmi, category, goal

**Pseudocode:**

```
BEGIN CalculateBMI

    // Step 1: Convert height to meters
    IF heightUnit == "cm" THEN
        heightInMeters = height / 100
    ELSE IF heightUnit == "ft" THEN
        heightInMeters = (feet × 12 + inches) × 0.0254
    ELSE IF heightUnit == "in" THEN
        heightInMeters = height × 0.0254
    END IF
    
    // Step 2: Convert weight to kg
    IF weightUnit == "kg" THEN
        weightInKg = weight
    ELSE IF weightUnit == "lb" THEN
        weightInKg = weight × 0.453592
    END IF
    
    // Step 3: Calculate BMI using formula
    bmi = weightInKg / (heightInMeters × heightInMeters)
    bmi = ROUND(bmi, 1)
    
    // Step 4: Determine category and goal
    IF bmi < 18.5 THEN
        category = "Underweight"
        goal = "gain"
    ELSE IF bmi >= 18.5 AND bmi < 25 THEN
        category = "Normal weight"
        goal = "maintain"
    ELSE IF bmi >= 25 AND bmi < 30 THEN
        category = "Overweight"
        goal = "lose"
    ELSE
        category = "Obese"
        goal = "lose"
    END IF
    
    // Step 5: Store in context for sharing across modules
    CALL setBMIData(bmi, category, goal, height, weight)
    
    // Step 6: Send to backend for persistence
    CALL POST("/api/bmi", {bmi, category, goal, height, weight})
    
    RETURN bmi, category, goal

END CalculateBMI
```

### 8.2 Nutrition Chat Processing Algorithm

**Algorithm: ProcessNutritionChat**

**Input:** chatId, userMessage, bmiData

**Output:** aiResponse (streamed)

**Pseudocode:**

```
BEGIN ProcessNutritionChat

    // Step 1: Validate user session
    session = CALL currentSession()
    IF session == NULL THEN
        REDIRECT to "/login"
        RETURN
    END IF
    
    // Step 2: Find or create chat project
    chat = QUERY projects 
           WHERE id == chatId 
           AND userId == session.user.id 
           AND type == "nutrition-chat"
    
    IF chat == NULL THEN
        chat = INSERT INTO projects 
               VALUES (chatId, "Nutrition Chat", session.user.id, "nutrition-chat")
    END IF
    
    // Step 3: Save user message to database
    INSERT INTO messages 
    VALUES (messageId, "user", messageParts, [], NOW(), chat.id)
    
    // Step 4: Build system prompt with BMI context
    systemPrompt = NUTRITION_CHAT_SYSTEM_PROMPT
    IF bmiData IS NOT NULL THEN
        bmiContext = FORMAT("BMI: {0}, Category: {1}, Goal: {2}", 
                           bmiData.bmi, bmiData.category, bmiData.goal)
        systemPrompt = systemPrompt + bmiContext
    END IF
    
    // Step 5: Stream AI response
    result = CALL streamText(
        model: chatModel,
        messages: conversationHistory,
        system: systemPrompt
    )
    
    // Step 6: On completion, save assistant response
    ON result.finish DO
        assistantMessage = result.response.messages
        INSERT INTO messages 
        VALUES (assistantId, "assistant", assistantParts, [], NOW(), chat.id)
    END ON
    
    RETURN result.toDataStreamResponse()

END ProcessNutritionChat
```

### 8.3 Meal Suggestions Algorithm

**Algorithm: GenerateMealSuggestions**

**Input:** preferences, address, city, bmiData

**Output:** restaurantSuggestions

**Pseudocode:**

```
BEGIN GenerateMealSuggestions

    // Step 1: Validate inputs
    IF preferences IS EMPTY OR address IS EMPTY OR city IS EMPTY THEN
        SHOW ERROR "Please fill all required fields"
        RETURN EMPTY
    END IF
    
    // Step 2: Fetch restaurants near location
    restaurants = FETCH_RESTAURANTS(address, city)
    
    // Step 3: Filter based on user's health goal
    IF bmiData.goal == "lose" THEN
        filteredRestaurants = FILTER restaurants WHERE
            dish CONTAINS "salad" OR
            dish CONTAINS "bowl" OR
            cuisine == "Healthy"
    ELSE IF bmiData.goal == "gain" THEN
        filteredRestaurants = FILTER restaurants WHERE
            dish CONTAINS "protein" OR
            dish CONTAINS "beef" OR
            cuisine == "American"
    ELSE
        filteredRestaurants = restaurants
    END IF
    
    // Step 4: Sort by rating and distance
    sortedRestaurants = SORT filteredRestaurants 
                        BY rating DESCENDING, distance ASCENDING
    
    // Step 5: Return top 5 recommendations
    RETURN sortedRestaurants[0:5]

END GenerateMealSuggestions
```

### 8.4 Authentication Flow Algorithm

**Algorithm: AuthenticateUser**

**Input:** email, password OR oauthProvider

**Output:** session, user

**Pseudocode:**

```
BEGIN AuthenticateUser

    // Path 1: Credential authentication
    IF email AND password ARE PROVIDED THEN
        account = QUERY accounts WHERE email == email
        
        IF account IS NULL THEN
            RETURN ERROR "User not found"
        END IF
        
        IF NOT VERIFY_PASSWORD(password, account.password) THEN
            RETURN ERROR "Invalid password"
        END IF
        
        user = QUERY users WHERE id == account.userId
        
    // Path 2: OAuth authentication
    ELSE IF oauthProvider IS PROVIDED THEN
        oauthData = CALL oauthProvider.authenticate()
        
        account = QUERY accounts 
                  WHERE providerId == oauthProvider 
                  AND accountId == oauthData.id
        
        IF account IS NULL THEN
            // Create new user for first-time OAuth
            user = INSERT INTO users 
                   VALUES (oauthData.name, oauthData.email, TRUE)
            account = INSERT INTO accounts 
                      VALUES (oauthProvider, oauthData.id, user.id)
        ELSE
            user = QUERY users WHERE id == account.userId
        END IF
    END IF
    
    // Create new session
    session = INSERT INTO sessions 
              VALUES (GENERATE_TOKEN(), user.id, NOW() + 7_DAYS)
    
    // Check email verification status
    IF NOT user.emailVerified THEN
        SHOW BANNER "Please verify your email"
    END IF
    
    RETURN session, user

END AuthenticateUser
```

---

## 9. Software Requirements Traceability Matrix

| Req. No. | Requirement Description | Design Component | Component Items |
|----------|------------------------|------------------|-----------------|
| FR01 | User shall be able to register | Class Diagram | User, Account, Verification classes |
| FR02 | User shall be able to login | Sequence Diagram | AuthenticateUser() method |
| FR03 | User shall be able to calculate BMI | Class Diagram, Activity Diagram | BMICalculatorView, calculateBMI() |
| FR04 | System shall store BMI data for personalization | Class Diagram | BMIContext, setBMIData() |
| FR05 | User shall be able to analyze food nutrition | Class Diagram, DFD L2 | NutritionAnalysisView, handleAnalyze() |
| FR06 | System shall provide AI meal suggestions | Class Diagram | AIMealSuggestionsView, handleGetSuggestions() |
| FR07 | System shall display healthy recipes | Class Diagram | HealthyRecipesView |
| FR08 | User shall be able to customize recipes | Class Diagram | RecipeCustomizationView, handleGenerateSubstitutes() |
| FR09 | System shall suggest ingredient substitutions | Class Diagram | IngredientSubstitutionView |
| FR10 | User shall be able to chat with AI nutrition assistant | Sequence Diagram, DFD L2 | NutritionChatView, ProcessNutritionChat() |
| FR11 | User shall be able to subscribe to premium | Sequence Diagram | Subscription class, SubscriptionFlow |
| FR12 | User shall have access to dashboard | Class Diagram | DashboardView |
| FR13 | User shall be able to update settings | Class Diagram | SettingsView, updateProfile() |
| FR14 | System shall verify user email | State Diagram | Verification class, EmailVerified state |
| FR15 | User shall be able to reset password | State Diagram | PasswordReset state |
| NFR01 | System shall persist data reliably | ERD | PostgreSQL schema |
| NFR02 | System shall authenticate users securely | Sequence Diagram | Auth Service, Session class |
| NFR03 | System shall integrate with AI services | Component Diagram | AI Module, OpenRouter integration |
| NFR04 | System shall be responsive on all devices | Architecture Diagram | React Components, Tailwind CSS |
| NFR05 | System shall process payments securely | Sequence Diagram | Stripe Integration |

---

## 10. Human Interface Design

### 10.1 User Interface Overview

The NutriCulture interface is designed following modern UX principles:

- **Responsive Design**: Mobile-first approach with full desktop support. All components adapt to screen sizes from 320px to 2560px.
- **Dark/Light Mode**: Theme switching with automatic system preference detection.
- **Gradient Themes**: Modern gradient-based color scheme using green/emerald palette representing health and wellness.
- **Interactive Elements**: Hover effects, loading states, and smooth CSS transitions enhance user experience.
- **Accessibility**: WCAG 2.1 compliant components with proper ARIA labels and keyboard navigation.

### 10.2 Screen Flow Diagram

The application consists of public and protected pages:

**Public Pages:**
- Home Page: Landing page with feature highlights
- Login Page: User authentication
- Register Page: New user registration
- Forgot Password: Password recovery
- Pricing Page: Subscription plans
- Services Page: Feature descriptions

**Protected Pages (Require Authentication):**
- Get Started: Onboarding flow
- BMI Calculator: Health assessment
- Nutrition Analysis: Food image analysis
- AI Meal Suggestions: Restaurant recommendations
- Healthy Recipes: Recipe browser
- Recipe Customization: Recipe modifier
- Ingredient Substitution: Healthy alternatives
- Nutrition Chat: AI assistant
- Dashboard: User overview
- Settings: Profile management

**[INSERT DIAGRAM 23: Screen Flow Diagram]**

### 10.3 Screen Objects and Actions

#### 10.3.1 Home Page

| Object | Type | Action |
|--------|------|--------|
| Navigation Bar | Component | Navigate between sections, login/register links |
| Hero Section | Component | Display main value proposition with CTA |
| "Get Started" Button | Primary Button | Navigate to /get-started or /register |
| Features Cards | Card Grid | Display 6 core feature highlights |
| "How It Works" Section | Steps Component | Show 5-step workflow |
| Pricing Cards | Card Grid | Display Free vs Premium comparison |
| Testimonials | Carousel | Show user testimonials |
| Footer | Component | Display links, social media, copyright |

#### 10.3.2 BMI Calculator

| Object | Type | Action |
|--------|------|--------|
| Height Unit Select | Dropdown | Switch between cm, ft/in, or inches |
| Height Input | Text Field(s) | Enter height value(s) |
| Weight Unit Select | Dropdown | Switch between kg or lb |
| Weight Input | Text Field | Enter weight value |
| Calculate Button | Primary Button | Trigger BMI calculation |
| BMI Result Alert | Alert Box | Display BMI value, category, and goal |
| Goal Badge | Badge | Show lose/gain/maintain goal |
| Continue Button | Secondary Button | Navigate to nutrition analysis |

#### 10.3.3 Nutrition Analysis

| Object | Type | Action |
|--------|------|--------|
| Premium Banner | Alert | Show upgrade prompt for free users |
| Image Upload Zone | Dropzone | Click or drag to upload food image |
| Image Preview | Image Container | Show uploaded image with remove option |
| Remove Image Button | Icon Button | Clear uploaded image |
| Weight Input | Text Field | Enter estimated food weight |
| Weight Unit Select | Dropdown | Switch between g, oz, or lb |
| Analyze Button | Primary Button | Trigger AI nutrition analysis |
| Results Card | Card | Display analysis results |
| Macro Cards | Card Grid | Show calories, protein, carbs, fats, fiber, sodium |
| Vitamins Section | List | Display vitamin A, C, D, E, K content |
| Minerals Section | List | Display calcium, iron, potassium, magnesium |
| Chat Link Button | Link Button | Navigate to AI chat for questions |
| Continue Button | Primary Button | Navigate to meal suggestions |

#### 10.3.4 Nutrition Chat

| Object | Type | Action |
|--------|------|--------|
| Chat Header | Header | Display assistant info and goal badge |
| Messages Area | Scroll Area | Display conversation history |
| Welcome Screen | Empty State | Show when no messages, with suggestions |
| Suggestion Buttons | Button List | Click to insert suggested queries |
| User Message Bubble | Message Card | Display user messages (right-aligned) |
| Assistant Message Bubble | Message Card | Display AI responses (left-aligned) |
| Copy Button | Icon Button | Copy message content to clipboard |
| Typing Indicator | Animation | Show when AI is generating response |
| Message Input | Text Field | Type chat message |
| Send Button | Icon Button | Submit message to AI |
| Regenerate Button | Icon Button | Regenerate last AI response |
| Keyboard Hint | Badge | Show Enter key hint |

#### 10.3.5 Dashboard

| Object | Type | Action |
|--------|------|--------|
| Welcome Header | Text | Personalized greeting with user name |
| BMI Stats Card | Stats Card | Display current BMI and category |
| Goal Progress | Progress Bar | Visual representation of goal progress |
| Quick Actions | Button Grid | Navigate to main features |
| Recent Activity | Activity List | Show recent chat conversations |
| Subscription Status | Badge | Show Free or Premium status |
| Upgrade Button | CTA Button | Navigate to pricing (for free users) |

### 10.4 UI Component Architecture

The UI is built using a hierarchical component structure:

**Layout Components:**
- Navbar: Site-wide navigation
- Sidebar: Dashboard navigation
- Footer: Site-wide footer

**UI Primitives (Shadcn/UI):**
- Button: Primary, secondary, outline, ghost variants
- Input: Text, number, file inputs
- Card: Content containers
- Alert: Status messages
- Dropdown/Select: Selection menus
- Textarea: Multi-line input
- ScrollArea: Scrollable containers

**Feature Components:**
- BMI Calculator Form
- Nutrition Analysis Form
- Chat Interface
- Recipe Cards

**Context Providers:**
- ThemeProvider: Dark/light mode
- BMIProvider: Shared BMI data
- LoadingProvider: Global loading states

---

## Appendix A: Technology Justification

| Technology | Justification |
|------------|---------------|
| **Next.js 15** | Server-side rendering for SEO, API routes for backend logic, App Router for modern React patterns, automatic code splitting |
| **TypeScript** | Type safety reduces runtime errors, better IDE support, improved developer experience, self-documenting code |
| **Tailwind CSS** | Utility-first approach enables rapid development, consistent design system, small bundle size with purging |
| **Shadcn/UI** | Accessible components out of the box, fully customizable, follows Radix UI primitives |
| **DrizzleORM** | Type-safe database queries, better performance than Prisma, SQL-like syntax |
| **Better Auth** | Modern authentication with built-in OAuth, email verification, session management |
| **OpenRouter** | Access to multiple AI models (GPT-4, Claude), cost-effective, easy model switching |
| **Stripe** | Industry-standard payment processing, subscription management, webhook support |
| **Vercel** | Seamless Next.js deployment, edge functions, automatic SSL, global CDN |

---

**Document Version:** 1.0

**Last Updated:** December 2024

**Project:** NutriCulture - AI-Powered Nutrition Platform



