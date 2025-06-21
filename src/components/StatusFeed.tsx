
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  Bot, 
  Search, 
  Calendar, 
  CheckCircle, 
  AlertCircle, 
  Clock,
  Plus,
  ExternalLink 
} from "lucide-react";
import { TaskStatus } from "@/pages/Index";

interface StatusFeedProps {
  task: TaskStatus;
  onStartNew: () => void;
}

const StatusFeed = ({ task, onStartNew }: StatusFeedProps) => {
  const getStatusIcon = (status: TaskStatus['status']) => {
    switch (status) {
      case 'analyzing':
        return <Bot className="w-5 h-5 text-blue-600 animate-pulse" />;
      case 'searching':
        return <Search className="w-5 h-5 text-yellow-600 animate-spin" />;
      case 'booking':
        return <Calendar className="w-5 h-5 text-purple-600 animate-pulse" />;
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Clock className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: TaskStatus['status']) => {
    switch (status) {
      case 'analyzing':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'searching':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'booking':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'error':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatStatus = (status: TaskStatus['status']) => {
    switch (status) {
      case 'analyzing':
        return 'Analyzing';
      case 'searching':
        return 'Searching';
      case 'booking':
        return 'Booking';
      case 'completed':
        return 'Completed';
      case 'error':
        return 'Error';
      default:
        return 'Processing';
    }
  };

  return (
    <div className="space-y-6">
      {/* Task Description */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="font-medium text-gray-900 mb-2">Your Task:</h3>
        <p className="text-gray-700">{task.description}</p>
      </div>

      {/* Current Status */}
      <div className="flex items-center gap-3">
        {getStatusIcon(task.status)}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="outline" className={getStatusColor(task.status)}>
              {formatStatus(task.status)}
            </Badge>
            <span className="text-sm text-gray-500">
              {task.timestamp.toLocaleTimeString()}
            </span>
          </div>
          <p className="text-gray-800">{task.message}</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className={`h-2 rounded-full transition-all duration-500 ${
            task.status === 'analyzing' ? 'w-1/4 bg-blue-600' :
            task.status === 'searching' ? 'w-2/4 bg-yellow-600' :
            task.status === 'booking' ? 'w-3/4 bg-purple-600' :
            task.status === 'completed' ? 'w-full bg-green-600' :
            task.status === 'error' ? 'w-full bg-red-600' : 'w-0'
          }`}
        />
      </div>

      {/* Result */}
      {task.result && (
        <>
          <Separator />
          <Card className="bg-green-50/50 border-green-200">
            <CardContent className="pt-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-green-900 mb-2">Task Result:</h4>
                  <p className="text-green-800">{task.result}</p>
                  {task.status === 'completed' && (
                    <div className="mt-3 flex gap-2">
                      <Button size="sm" variant="outline" className="text-green-700 border-green-300">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                      <Button size="sm" variant="outline" className="text-green-700 border-green-300">
                        <Calendar className="w-4 h-4 mr-2" />
                        Add to Calendar
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* Actions */}
      {(task.status === 'completed' || task.status === 'error') && (
        <>
          <Separator />
          <div className="flex justify-center">
            <Button onClick={onStartNew} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Start New Task
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default StatusFeed;
