"use client";
// Import this component where needed in your main application

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';

const TaskCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  interface Task {
    id: string;
    date: Date;
    description: string;
    assignedTo: string;
    color: string;
  }

  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskDescription, setTaskDescription] = useState('');
  const [taskAssignee, setTaskAssignee] = useState('');
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);
  const [selectedColor, setSelectedColor] = useState('#4285F4');

  // Color options for tasks
  const colorOptions = [
    '#4285F4', // Blue
    '#0F9D58', // Green
    '#DB4437', // Red
    '#F4B400', // Yellow
    '#673AB7', // Purple
    '#FF6D01', // Orange
    '#795548', // Brown
  ];

  // Initialize with sample data
  useEffect(() => {
    // Sample tasks/events
    const sampleTasks = [
      { id: '1', date: new Date(2025, 2, 10), description: 'Website Redesign', assignedTo: 'Design Team', color: '#4285F4' },
      { id: '2', date: new Date(2025, 2, 15), description: 'Client Meeting', assignedTo: 'Sales', color: '#DB4437' },
      { id: '3', date: new Date(2025, 2, 21), description: 'Product Demo', assignedTo: 'Development', color: '#0F9D58' },
    ];
    
    setTasks(sampleTasks);
  }, []);

  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    // Open the add task form when a date is selected
    setShowAddTaskForm(true);
  };

  const handleAddTask = () => {
    if (taskDescription.trim() === '') return;
    
    const newTask = {
      id: Date.now().toString(),
      date: selectedDate,
      description: taskDescription,
      assignedTo: taskAssignee,
      color: selectedColor
    };
    
    setTasks([...tasks, newTask]);
    setTaskDescription('');
    setTaskAssignee('');
    setShowAddTaskForm(false);
  };

  const getTasksForDate = (date: Date) => {
    return tasks.filter(
      task => task.date.getDate() === date.getDate() &&
             task.date.getMonth() === date.getMonth() &&
             task.date.getFullYear() === date.getFullYear()
    );
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  };

  const formatMonth = (date: Date) => {
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
  };

  const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
  
  // Generate calendar days
  const renderCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    // Get first day of the month
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    // Adjust for Monday as first day (0 should be Monday, not Sunday)
    const adjustedFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
    
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const prevMonthDays = new Date(year, month, 0).getDate();
    
    const calendarDays = [];
    
    // Previous month days
    for (let i = 0; i < adjustedFirstDay; i++) {
      const day = prevMonthDays - (adjustedFirstDay - i - 1);
      const date = new Date(year, month - 1, day);
      calendarDays.push({ date, currentMonth: false });
    }
    
    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      calendarDays.push({ date, currentMonth: true });
    }
    
    // Next month days to complete the grid (6 rows x 7 days)
    const totalCellsNeeded = 42;
    const remainingCells = totalCellsNeeded - calendarDays.length;
    
    for (let i = 1; i <= remainingCells; i++) {
      const date = new Date(year, month + 1, i);
      calendarDays.push({ date, currentMonth: false });
    }
    
    return calendarDays;
  };
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Collaborative Task Assigning Calendar</h1>
        <div className="flex items-center space-x-2">
          <button onClick={() => setShowAddTaskForm(true)} className="flex items-center px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
            <Plus size={16} className="mr-1" />
            Add Task
          </button>
        </div>
      </div>
      
      <div className="border rounded-lg overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b">
          <div className="flex items-center space-x-4">
            <button onClick={goToPreviousMonth} className="p-1 rounded hover:bg-gray-100">«</button>
            <button onClick={goToPreviousMonth} className="p-1 rounded hover:bg-gray-100">‹</button>
            <span className="text-lg font-medium">{formatMonth(currentMonth)}</span>
            <button onClick={goToNextMonth} className="p-1 rounded hover:bg-gray-100">›</button>
            <button onClick={goToNextMonth} className="p-1 rounded hover:bg-gray-100">»</button>
          </div>
        </div>
        
        <div className="grid grid-cols-7 border-b">
          {days.map(day => (
            <div key={day} className="p-2 text-center font-medium text-gray-600 border-r last:border-r-0">
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7">
          {renderCalendarDays().map((item, index) => {
            const { date, currentMonth } = item;
            const isCurrentDay = isToday(date);
            const dateTaskList = getTasksForDate(date);
            
            return (
              <div 
                key={index} 
                className={`min-h-24 p-2 border-r border-b relative ${
                  currentMonth ? '' : 'bg-gray-50 text-gray-400'
                } ${isCurrentDay ? 'bg-blue-50' : ''}`}
                onClick={() => handleDateClick(date)}
              >
                <div className={`text-right ${isCurrentDay ? 'font-bold text-blue-600' : ''}`}>
                  {date.getDate()}
                </div>
                <div className="mt-1 space-y-1">
                  {dateTaskList.map((task, i) => (
                    <div 
                      key={`task-${i}`}
                      className="text-xs p-1 rounded text-white truncate"
                      style={{ backgroundColor: task.color }}
                    >
                      {task.description}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Task Modal */}
      {showAddTaskForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="border-b border-gray-200 px-6 py-4">
              <h3 className="text-lg font-medium">Add Task</h3>
            </div>
            
            <div className="p-6">
              <div className="mb-4">
                <label className="block text-sm text-gray-600 mb-1">Task Description</label>
                <input
                  type="text"
                  placeholder="Enter task description"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={taskDescription}
                  onChange={(e) => setTaskDescription(e.target.value)}
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm text-gray-600 mb-1">Assign To</label>
                <input
                  type="text"
                  placeholder="Enter name or team"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={taskAssignee}
                  onChange={(e) => setTaskAssignee(e.target.value)}
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm text-gray-600 mb-2">Task Color</label>
                <div className="flex space-x-2">
                  {colorOptions.map((color) => (
                    <div
                      key={color}
                      className={`w-6 h-6 rounded-full cursor-pointer ${
                        selectedColor === color ? 'ring-2 ring-offset-2 ring-gray-400' : ''
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => setSelectedColor(color)}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200 px-6 py-4 flex justify-end space-x-2">
              <button 
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                onClick={() => setShowAddTaskForm(false)}
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={handleAddTask}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskCalendar;