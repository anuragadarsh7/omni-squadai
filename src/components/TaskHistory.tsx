
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  CheckCircle, 
  AlertCircle, 
  Clock,
  MoreHorizontal 
} from "lucide-react";
import { TaskStatus } from "@/pages/Index";

interface TaskHistoryProps {
  tasks: TaskStatus[];
}

const TaskHistory = ({ tasks }: TaskHistoryProps) => {
  if (tasks.length === 0) {
    return (
      <Card className="bg-gray-50/50">
        <CardHeader>
          <CardTitle className="text-lg text-gray-700">Recent Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            <Clock className="w-8 h-8 mx-auto mb-2 text-gray-400" />
            <p className="text-sm">No recent tasks</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const getStatusIcon = (status: TaskStatus['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: TaskStatus['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'error':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm shadow-lg border-0">
      <CardHeader>
        <CardTitle className="text-lg text-gray-800">Recent Tasks</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[400px]">
          <div className="p-4 space-y-4">
            {tasks.map((task, index) => (
              <div key={task.id}>
                <div className="space-y-2">
                  <div className="flex items-start gap-3">
                    {getStatusIcon(task.status)}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${getStatusColor(task.status)}`}
                        >
                          {task.status === 'completed' ? 'Done' : 'Failed'}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          {task.timestamp.toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-800 line-clamp-2 leading-relaxed">
                        {task.description}
                      </p>
                      {task.result && (
                        <p className="text-xs text-gray-600 mt-1 line-clamp-1">
                          {task.result}
                        </p>
                      )}
                    </div>
                    <button className="text-gray-400 hover:text-gray-600 p-1">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                {index < tasks.length - 1 && <Separator className="mt-4" />}
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default TaskHistory;
