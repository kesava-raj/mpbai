MPBx AI Labs Website Implementation
===================================

I have successfully built the modern, futuristic AI startup website for MPBx AI Labs as requested.

## Key Features Implemented

### 1. Futuristic Design System
- **Theme**: Dark/Light mode support with a default futuristic dark aesthetic preference.
- **Colors**: Implemented the specific brand palette (Primary Red #ef3e25, Dark Orange #e04108, Purple #5d248f) with custom gradients.
- **Micro-interactions**: Added hover effects, floating animations, and glassmorphism cards throughout the site.

### 2. Core Pages
- **Home**: 
  - **Hero Section**: Recreated the ChatGPT-style interaction with a "Tell us what you want to build..." input that transitions to a lead capture form.
  - **Why Choose Us**: 4 animated cards highlighting "Workflow-first AI", "Production-grade delivery", etc.
  - **Services Preview**: Abstract cards for Chatbots, Voicebots, Agents, and Automation.
  - **Testimonials**: Auto-playing carousel with client success stories.
- **About Us**: Mission, Vision, and Values sections with "Powered by MyProBuddy" ecosystem integration.
- **Services**: Detailed breakdown of 4 core service areas with "What we build" and "How AI is used" details.
- **Case Studies**: Expandable accordions detailing 5 specific anonymized case studies (Tender Automation, HealthTech, etc.).
- **Contact**: A futuristic intake form with smooth transitions and conditional success state.

### 3. Technical Stack
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4 + Custom configuration for glassmorphism and animations.
- **Animations**: Framer Motion for complex page transitions and scroll reveals.
- **Icons**: Lucide React for consistent, modern iconography.

## How to Run
The project is set up and dependencies are installed. You can run the development server with:

```bash
npm run dev
```

The site will be available at `http://localhost:3000`.

## Next Steps
- **Logo**: The site uses the `logo.svg` found in your `public` folder. Ensure this file contains your actual brand logo.
- **Deployment**: The site is production-ready. You can deploy to Vercel or any other Next.js compatible host.
