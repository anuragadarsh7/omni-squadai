
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Sparkles } from "lucide-react";

interface TaskInputProps {
  onTaskStart: (task: string) => void;
  disabled?: boolean;
}

const TaskInput = ({ onTaskStart, disabled = false }: TaskInputProps) => {
  const [task, setTask] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!task.trim() || disabled) return;
    
    setIsSubmitting(true);
    try {
      onTaskStart(task.trim());
      setTask("");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const exampleTasks = [
    "Find top-rated dentists nearby and book the earliest available appointment",
    "Search for Italian restaurants with good reviews and make a reservation for tonight",
    "Find a reliable car mechanic and schedule a brake inspection",
    "Look for yoga classes in my area and sign me up for a beginner session"
  ];

  return (
    <div className="space-y-4">
      <div className="relative">
        <Textarea
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Describe your task (e.g., 'Find top-rated dentists nearby and book the earliest available appointment')"
          className="min-h-[120px] text-base resize-none border-2 border-gray-200 focus:border-blue-500 transition-colors"
          disabled={disabled}
        />
        <div className="absolute bottom-3 right-3 text-xs text-gray-400">
          Press Cmd/Ctrl + Enter to submit
        </div>
      </div>

      <Button 
        onClick={handleSubmit}
        disabled={!task.trim() || disabled || isSubmitting}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 text-base"
        size="lg"
      >
        {isSubmitting ? (
          <>
            <Sparkles className="w-4 h-4 mr-2 animate-spin" />
            Starting Task...
          </>
        ) : (
          <>
            <Send className="w-4 h-4 mr-2" />
            Start Task
          </>
        )}
      </Button>

      {/* Example tasks */}
      <div className="pt-4 border-t border-gray-100">
        <p className="text-sm font-medium text-gray-700 mb-3">Try these examples:</p>
        <div className="grid gap-2">
          {exampleTasks.map((example, index) => (
            <button
              key={index}
              onClick={() => setTask(example)}
              className="text-left text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-2 rounded-md transition-colors"
              disabled={disabled}
            >
              "{example}"
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskInput;
