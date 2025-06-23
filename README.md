
# 🤖 Smart Task Assistant - AI-Powered Task Automation

[![Built with Lovable](https://img.shields.io/badge/Built%20with-Lovable-ff69b4.svg)](https://lovable.dev)
[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Latest-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-Latest-38bdf8.svg)](https://tailwindcss.com/)

> **Describe any task in plain English and let AI handle the complete workflow automatically**

## 📋 Project Overview

Smart Task Assistant is an innovative AI-powered web application that revolutionizes task automation. Users can describe complex tasks in natural language (like "Find top-rated dentists nearby and book the earliest available appointment"), and the system automatically plans and executes the complete workflow using advanced AI agents powered by OmniDimension.

This is a **fully automated experience** - no manual steps required by the user after task submission.

## ✨ Key Features

### 🗣️ Natural Language Processing
- **Intuitive Task Input**: Large, user-friendly textarea for describing tasks in plain English
- **Smart Understanding**: AI breaks down complex requests into actionable steps
- **Example Prompts**: Pre-built examples to guide users on task descriptions

### 🔄 Real-Time Task Execution
- **Live Progress Updates**: Real-time feedback during task execution
- **Status Tracking**: Visual progress indicators with animated icons
- **Step-by-Step Monitoring**: Detailed breakdown of each automation step
- **Error Handling**: Comprehensive error reporting with user-friendly messages

### 🤖 AI Agent Integration
- **OmniDimension Integration**: Powered by advanced AI agents
- **Multi-Step Automation**: Handles complex workflows automatically
- **Provider Search**: Intelligent search for service providers
- **Booking Automation**: Automatic appointment scheduling
- **Calendar Integration**: Seamless calendar management

### 📱 Modern User Interface
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Clean Aesthetics**: Modern, minimalist design with blue and white theme
- **Smooth Animations**: Engaging transitions and loading states
- **Accessible UI**: Built with accessibility best practices

### 📊 Task Management
- **Task History**: Comprehensive history of all completed tasks
- **Status Badges**: Visual indicators for task completion status
- **Result Display**: Detailed results with actionable next steps
- **Export Options**: Calendar integration and external links

## 🛠️ Technology Stack

### Frontend Framework
- **React 18.3.1** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development with full IntelliSense
- **Vite** - Lightning-fast build tool and development server

### UI/UX Technologies
- **Tailwind CSS** - Utility-first CSS framework for rapid styling
- **shadcn/ui** - High-quality, customizable React components
- **Lucide React** - Beautiful, customizable SVG icons
- **Sonner** - Elegant toast notifications

### State Management & Data
- **React Query (@tanstack/react-query)** - Powerful data fetching and caching
- **React Hook Form** - Performant forms with easy validation
- **Zod** - TypeScript-first schema validation

### AI & External Services
- **OmniDimension AI** - Advanced AI agent platform for task automation
- **Real-time WebSocket** - Live updates during task execution

### Development Tools
- **ESLint** - Code linting and quality assurance
- **PostCSS** - CSS processing and optimization
- **React Router** - Client-side routing

## 📁 Project Structure

```
smart-task-assistant/
├── public/
│   ├── favicon.ico
│   ├── placeholder.svg
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── ui/                    # shadcn/ui components
│   │   ├── TaskInput.tsx          # Main task input component
│   │   ├── StatusFeed.tsx         # Real-time status display
│   │   └── TaskHistory.tsx        # Task history management
│   ├── hooks/
│   │   ├── use-mobile.tsx         # Mobile detection hook
│   │   └── use-toast.ts           # Toast notification hook
│   ├── lib/
│   │   └── utils.ts               # Utility functions
│   ├── pages/
│   │   ├── Index.tsx              # Main application page
│   │   └── NotFound.tsx           # 404 error page
│   ├── App.tsx                    # Root application component
│   ├── main.tsx                   # Application entry point
│   └── index.css                  # Global styles
├── index.html                     # HTML template with OmniDimension script
├── package.json                   # Project dependencies
├── tailwind.config.ts             # Tailwind CSS configuration
├── tsconfig.json                  # TypeScript configuration
└── vite.config.ts                 # Vite build configuration
```

## 🚀 Installation & Setup

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** or **yarn** package manager
- **Modern web browser** (Chrome, Firefox, Safari, Edge)

### Quick Start

1. **Clone the repository**
```bash
git clone <your-repository-url>
cd smart-task-assistant
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Start the development server**
```bash
npm run dev
# or
yarn dev
```

4. **Open your browser**
Navigate to `http://localhost:5173` to see the application running.

## 📖 Usage Guide

### Basic Task Submission

1. **Describe Your Task**: Enter a natural language description in the main textarea
   ```
   Example: "Find top-rated dentists nearby and book the earliest available appointment"
   ```

2. **Submit the Task**: Click the "Start Task" button or use `Cmd/Ctrl + Enter`

3. **Monitor Progress**: Watch real-time updates as the AI processes your request

4. **Review Results**: Get detailed results with actionable next steps

### Example Tasks

The application can handle various types of tasks:

- **Healthcare**: "Find a dermatologist and schedule a consultation"
- **Dining**: "Search for Italian restaurants with good reviews and make a reservation for tonight"
- **Automotive**: "Find a reliable car mechanic and schedule a brake inspection"
- **Fitness**: "Look for yoga classes in my area and sign me up for a beginner session"

### Task Status Types

- **🔍 Analyzing**: AI is understanding your request
- **🔎 Searching**: Finding suitable service providers  
- **📅 Booking**: Making appointments or reservations
- **✅ Completed**: Task successfully finished
- **❌ Error**: Issue encountered during execution

## 🔌 API Integration

### OmniDimension Agent Integration

The application integrates with OmniDimension's AI agent platform:

```javascript
// OmniDimension script is loaded in index.html
<script 
  id="omnidimension-web-widget" 
  async 
  src="https://backend.omnidim.io/web_widget.js?secret_key=4a58e0045c30d9803669858709b067e4"
></script>

// JavaScript integration
window.OmniDimensionAgent.handleTask(taskDescription, {
  onStart: () => updateStatus("Agent is working on your request..."),
  onProgress: (step) => updateStatus(`Step: ${step}`),
  onComplete: (result) => updateStatus(`Completed: ${result}`),
  onError: (err) => updateStatus(`Error: ${err.message || err}`)
});
```

### Extensible API Hooks

The codebase includes stubs for additional integrations:
- **Google Calendar API** - Automatic calendar event creation
- **Booking Systems** - Integration with various appointment platforms
- **Notification Services** - Email/SMS confirmations
- **Payment Processing** - Automated payment handling

## 🧩 Component Documentation

### TaskInput Component
**Location**: `src/components/TaskInput.tsx`
- Handles user task input with validation
- Provides example task suggestions
- Manages form submission and loading states
- Supports keyboard shortcuts (Cmd/Ctrl + Enter)

### StatusFeed Component
**Location**: `src/components/StatusFeed.tsx`
- Displays real-time task execution progress
- Shows animated status indicators
- Handles task completion and error states
- Provides action buttons for completed tasks

### TaskHistory Component
**Location**: `src/components/TaskHistory.tsx`
- Maintains history of completed tasks
- Displays task status and results
- Supports task result export
- Provides scrollable interface for multiple tasks

### Main Page Component
**Location**: `src/pages/Index.tsx`
- Orchestrates the entire application flow
- Manages global state for tasks
- Handles OmniDimension agent communication
- Provides responsive layout management

## 🎨 Design System

### Color Palette
- **Primary Blue**: `#2563eb` - Action buttons and highlights
- **Success Green**: `#16a34a` - Completed tasks
- **Warning Yellow**: `#ca8a04` - In-progress tasks  
- **Error Red**: `#dc2626` - Failed tasks
- **Neutral Gray**: `#6b7280` - Text and borders

### Typography
- **Headers**: Bold, clean sans-serif fonts
- **Body Text**: Readable font sizes with proper line spacing
- **Code**: Monospace fonts for technical content

### Animations
- **Smooth Transitions**: 200-300ms duration for state changes
- **Loading Spinners**: Animated icons during processing
- **Progress Indicators**: Visual feedback for task completion

## 🚀 Deployment

### Build for Production

```bash
npm run build
# or
yarn build
```

### Deployment Options

1. **Lovable Platform** (Recommended)
   - Click "Publish" button in Lovable interface
   - Automatic deployment with custom domain support

2. **Vercel**
   ```bash
   npm install -g vercel
   vercel --prod
   ```

3. **Netlify**
   ```bash
   npm run build
   # Upload dist/ folder to Netlify
   ```

4. **Traditional Web Hosting**
   ```bash
   npm run build
   # Upload dist/ folder contents to your web server
   ```

## 🔮 Future Enhancements

### Planned Features
- [ ] **Voice Input**: Speech-to-text for hands-free task submission
- [ ] **Task Templates**: Pre-built templates for common task types
- [ ] **Multi-language Support**: Internationalization for global users
- [ ] **Advanced Scheduling**: Recurring tasks and smart scheduling
- [ ] **Integration Hub**: Connect with more third-party services
- [ ] **Analytics Dashboard**: Task completion metrics and insights
- [ ] **Collaboration**: Team task management and sharing
- [ ] **Mobile App**: Native iOS and Android applications

### Technical Improvements
- [ ] **Offline Support**: PWA capabilities for offline task queuing
- [ ] **Performance Optimization**: Lazy loading and code splitting
- [ ] **Advanced Error Recovery**: Retry mechanisms and fallbacks
- [ ] **Real-time Collaboration**: Multi-user task coordination
- [ ] **API Rate Limiting**: Smart request throttling
- [ ] **Caching Strategy**: Optimized data caching

## 🐛 Troubleshooting

### Common Issues

**Task Not Starting**
- Ensure OmniDimension script is loaded
- Check browser console for JavaScript errors
- Verify internet connection

**Real-time Updates Not Working**
- Check WebSocket connection
- Ensure browser supports modern JavaScript features
- Try refreshing the page

**UI Not Responsive**
- Clear browser cache
- Ensure JavaScript is enabled
- Try different browser

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines
- Follow TypeScript best practices
- Use existing component patterns
- Write descriptive commit messages
- Test on multiple devices/browsers
- Update documentation as needed

## 📄 License

This project is built with [Lovable](https://lovable.dev) and follows their terms of service.

## 🙏 Credits & Acknowledgments

- **[Lovable](https://lovable.dev)** - AI-powered development platform
- **[OmniDimension](https://omnidim.io)** - AI agent platform
- **[shadcn/ui](https://ui.shadcn.com)** - UI component library
- **[Tailwind CSS](https://tailwindcss.com)** - CSS framework
- **[Lucide](https://lucide.dev)** - Icon library

## 📞 Support

For questions, issues, or feature requests:
- **Documentation**: [Lovable Docs](https://docs.lovable.dev/)
- **Community**: [Lovable Discord](https://discord.com/channels/1119885301872070706/1280461670979993613)
- **YouTube**: [Lovable Tutorials](https://www.youtube.com/watch?v=9KHLTZaJcR8&list=PLbVHz4urQBZkJiAWdG8HWoJTdgEysigIO)

---

**Built with ❤️ using [Lovable](https://lovable.dev) - The AI-powered web development platform**
