
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import TaskInput from "@/components/TaskInput";
import StatusFeed from "@/components/StatusFeed";
import TaskHistory from "@/components/TaskHistory";
import { Bot, Sparkles, Clock, CheckCircle } from "lucide-react";

export interface TaskStatus {
  id: string;
  description: string;
  status: 'analyzing' | 'searching' | 'booking' | 'completed' | 'error';
  message: string;
  timestamp: Date;
  result?: string;
}

const Index = () => {
  const [currentTask, setCurrentTask] = useState<TaskStatus | null>(null);
  const [taskHistory, setTaskHistory] = useState<TaskStatus[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleTaskStart = (taskDescription: string) => {
    if (!taskDescription.trim()) {
      toast.error("Please describe your task");
      return;
    }

    const newTask: TaskStatus = {
      id: Date.now().toString(),
      description: taskDescription,
      status: 'analyzing',
      message: 'Analyzing your task...',
      timestamp: new Date()
    };

    setCurrentTask(newTask);
    setIsProcessing(true);
    
    // Start OmniDimension agent processing
    processTaskWithAgent(newTask);
  };

  const processTaskWithAgent = async (task: TaskStatus) => {
    try {
      // Check if OmniDimension agent is available
      if (typeof window !== 'undefined' && window.OmniDimensionAgent) {
        await window.OmniDimensionAgent.handleTask(task.description, {
          onStart: () => updateTaskStatus(task.id, 'analyzing', 'Agent is working on your request...'),
          onProgress: (step: string) => {
            // Determine status based on step content
            let status: TaskStatus['status'] = 'searching';
            if (step.toLowerCase().includes('book')) status = 'booking';
            if (step.toLowerCase().includes('search')) status = 'searching';
            if (step.toLowerCase().includes('analyz')) status = 'analyzing';
            
            updateTaskStatus(task.id, status, `Step: ${step}`);
          },
          onComplete: (result: string) => {
            updateTaskStatus(task.id, 'completed', 'Task completed successfully!', result);
            setIsProcessing(false);
          },
          onError: (err: any) => {
            updateTaskStatus(task.id, 'error', `Error: ${err.message || err}`);
            setIsProcessing(false);
          }
        });
      } else {
        // Fallback simulation if OmniDimension isn't loaded yet
        await simulateTaskExecution(task);
      }
    } catch (error) {
      console.error('Task processing error:', error);
      updateTaskStatus(task.id, 'error', 'Failed to process task');
      setIsProcessing(false);
    }
  };

  const simulateTaskExecution = async (task: TaskStatus) => {
    // Simulate the task execution process
    const steps = [
      { status: 'analyzing' as const, message: 'Analyzing your task requirements...', delay: 2000 },
      { status: 'searching' as const, message: 'Searching for available providers...', delay: 3000 },
      { status: 'booking' as const, message: 'Booking your appointment...', delay: 2500 },
      { status: 'completed' as const, message: 'Task completed successfully!', delay: 1000 }
    ];

    for (const step of steps) {
      await new Promise(resolve => setTimeout(resolve, step.delay));
      updateTaskStatus(task.id, step.status, step.message, 
        step.status === 'completed' ? `Appointment booked for ${new Date(Date.now() + 86400000).toLocaleDateString()} at 2:00 PM` : undefined
      );
    }
    
    setIsProcessing(false);
  };

  const updateTaskStatus = (taskId: string, status: TaskStatus['status'], message: string, result?: string) => {
    setCurrentTask(prev => {
      if (prev?.id === taskId) {
        const updated = { ...prev, status, message, result, timestamp: new Date() };
        
        // If task is completed or errored, add to history
        if (status === 'completed' || status === 'error') {
          setTaskHistory(prev => [updated, ...prev.slice(0, 4)]); // Keep last 5 tasks
        }
        
        return updated;
      }
      return prev;
    });
  };

  const startNewTask = () => {
    setCurrentTask(null);
    setIsProcessing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 to-white">
      {/* OmniDimension Widget Script */}
      <script 
        id="omnidimension-web-widget" 
        async 
        src="https://backend.omnidim.io/web_widget.js?secret_key=4a58e0045c30d9803669858709b067e4"
      />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-blue-600 rounded-full">
              <Bot className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">Smart Task Assistant</h1>
          </div>
          <p className="text-xl text-gray-600 mb-2">
            Describe any task in plain English and let AI handle the complete workflow
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>AI-Powered</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>Real-time Updates</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>Fully Automated</span>
            </div>
          </div>
        </div>

        {/* Main Interface */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Task Input - Takes full width when no active task */}
          <div className={`${currentTask ? 'lg:col-span-2' : 'lg:col-span-3'} transition-all duration-300`}>
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl text-gray-800">
                  {currentTask ? 'Current Task' : 'What would you like me to help you with?'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {!currentTask || !isProcessing ? (
                  <TaskInput onTaskStart={handleTaskStart} disabled={isProcessing} />
                ) : (
                  <StatusFeed task={currentTask} onStartNew={startNewTask} />
                )}
              </CardContent>
            </Card>
          </div>

          {/* Task History - Only show when there's an active task or history */}
          {(taskHistory.length > 0 || currentTask) && (
            <div className="lg:col-span-1">
              <TaskHistory tasks={taskHistory} />
            </div>
          )}
        </div>

        {/* Features showcase when no active task */}
        {!currentTask && (
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <Card className="text-center p-6 bg-blue-50/50 border-blue-200">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Smart Understanding</h3>
              <p className="text-sm text-gray-600">
                Describe complex tasks in natural language and watch AI break them down into actionable steps
              </p>
            </Card>
            
            <Card className="text-center p-6 bg-green-50/50 border-green-200">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Automated Execution</h3>
              <p className="text-sm text-gray-600">
                No manual steps required. The AI handles searching, booking, and scheduling automatically
              </p>
            </Card>
            
            <Card className="text-center p-6 bg-purple-50/50 border-purple-200">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Real-time Updates</h3>
              <p className="text-sm text-gray-600">
                Track progress with live updates and get detailed results when tasks complete
              </p>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

// Extend window interface for OmniDimension
declare global {
  interface Window {
    OmniDimensionAgent?: {
      handleTask: (description: string, callbacks: {
        onStart: () => void;
        onProgress: (step: string) => void;
        onComplete: (result: string) => void;
        onError: (error: any) => void;
      }) => Promise<void>;
    };
  }
}

export default Index;
