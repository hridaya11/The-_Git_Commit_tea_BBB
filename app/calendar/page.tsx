"use client";

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Plus, Calendar, X } from 'lucide-react';

const TaskCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isMobileView, setIsMobileView] = useState(false);
  
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
  const [showTasksForMobile, setShowTasksForMobile] = useState(false);
  const [selectedDateTasks, setSelectedDateTasks] = useState<Task[]>([]);

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

  // Check for mobile view on mount and resize
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    // Initial check
    checkIfMobile();

    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);

    // Clean up event listener
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    
    if (isMobileView) {
      // For mobile, show the tasks for selected date
      const tasksForDate = getTasksForDate(date);
      setSelectedDateTasks(tasksForDate);
      setShowTasksForMobile(true);
    } else {
      // For desktop, open the add task form
      setShowAddTaskForm(true);
    }
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
    
    // Update the selected date tasks for mobile view
    if (isMobileView) {
      setSelectedDateTasks([...selectedDateTasks, newTask]);
    }
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

  // Format date for mobile display
  const formatDateForMobile = (date: Date) => {
    return date.toLocaleDateString('default', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  };

  const days = isMobileView 
    ? ['M', 'T', 'W', 'T', 'F', 'S', 'S'] // Shorter day names for mobile
    : ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
  
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
    
    // Next month days to complete the grid
    // For mobile, we show 5 weeks max to save space
    const totalCellsNeeded = isMobileView ? 35 : 42;
    let remainingCells = totalCellsNeeded - calendarDays.length;
    
    // Ensure we don't go below 28 cells (4 weeks) for smaller months
    if (calendarDays.length < 28) {
      remainingCells = 28 - calendarDays.length;
    }
    
    for (let i = 1; i <= remainingCells; i++) {
      const date = new Date(year, month + 1, i);
      calendarDays.push({ date, currentMonth: false });
    }
    
    return calendarDays;
  };
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 space-y-2 sm:space-y-0">
        <h1 className="text-lg sm:text-xl font-semibold">Collaborative Task Calendar</h1>
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => setShowAddTaskForm(true)} 
            className="flex items-center px-2 sm:px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm sm:text-base"
          >
            <Plus size={16} className="mr-1" />
            Add Task
          </button>
        </div>
      </div>
      
      <div className="border rounded-lg overflow-hidden">
        <div className="flex justify-between items-center p-2 sm:p-4 border-b">
          <div className="flex items-center space-x-1 sm:space-x-4">
            {/* Only show double chevrons on larger screens */}
            <button onClick={goToPreviousMonth} className="p-1 rounded hover:bg-gray-100 hidden sm:block">
              <ChevronLeft size={16} className="mx-auto" />
              <ChevronLeft size={16} className="mx-auto -mt-1" />
            </button>
            <button onClick={goToPreviousMonth} className="p-1 rounded hover:bg-gray-100">
              <ChevronLeft size={16} />
            </button>
            <span className="text-sm sm:text-lg font-medium truncate">{formatMonth(currentMonth)}</span>
            <button onClick={goToNextMonth} className="p-1 rounded hover:bg-gray-100">
              <ChevronRight size={16} />
            </button>
            {/* Only show double chevrons on larger screens */}
            <button onClick={goToNextMonth} className="p-1 rounded hover:bg-gray-100 hidden sm:block">
              <ChevronRight size={16} className="mx-auto" />
              <ChevronRight size={16} className="mx-auto -mt-1" />
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-7 border-b">
          {days.map(day => (
            <div key={day} className="p-1 sm:p-2 text-center text-xs sm:text-sm font-medium text-gray-600 border-r last:border-r-0">
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7">
          {renderCalendarDays().map((item, index) => {
            const { date, currentMonth } = item;
            const isCurrentDay = isToday(date);
            const dateTaskList = getTasksForDate(date);
            const hasTask = dateTaskList.length > 0;
            
            return (
              <div 
                key={index} 
                className={`
                  min-h-12 sm:min-h-24 p-1 sm:p-2 border-r border-b relative cursor-pointer 
                  ${currentMonth ? '' : 'bg-gray-50 text-gray-400'} 
                  ${isCurrentDay ? 'bg-blue-50' : ''}
                  ${hasTask ? 'font-medium' : ''}
                `}
                onClick={() => handleDateClick(date)}
              >
                <div className={`text-right text-xs sm:text-base ${isCurrentDay ? 'font-bold text-blue-600' : ''}`}>
                  {date.getDate()}
                </div>
                
                {/* For mobile: only show dots for tasks */}
                {isMobileView && hasTask && (
                  <div className="absolute bottom-1 left-0 right-0 flex justify-center">
                    {dateTaskList.slice(0, 3).map((task, i) => (
                      <div 
                        key={`dot-${i}`}
                        className="h-1.5 w-1.5 rounded-full mx-0.5"
                        style={{ backgroundColor: task.color }}
                      ></div>
                    ))}
                    {dateTaskList.length > 3 && (
                      <div className="h-1.5 w-1.5 rounded-full mx-0.5 bg-gray-400"></div>
                    )}
                  </div>
                )}
                
                {/* For desktop: show task descriptions */}
                {!isMobileView && (
                  <div className="mt-1 space-y-1">
                    {dateTaskList.slice(0, 3).map((task, i) => (
                      <div 
                        key={`task-${i}`}
                        className="text-xs p-1 rounded text-white truncate"
                        style={{ backgroundColor: task.color }}
                      >
                        {task.description}
                      </div>
                    ))}
                    {dateTaskList.length > 3 && (
                      <div className="text-xs text-gray-500">+{dateTaskList.length - 3} more</div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile Task List View */}
      {isMobileView && showTasksForMobile && (
        <div className="fixed inset-0 bg-white z-40 flex flex-col">
          <div className="p-4 border-b flex justify-between items-center">
            <h3 className="font-medium">{formatDateForMobile(selectedDate)}</h3>
            <button 
              onClick={() => setShowTasksForMobile(false)}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="p-4 flex-1 overflow-auto">
            {selectedDateTasks.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                <Calendar className="mx-auto mb-2" size={32} />
                <p>No tasks for this date</p>
                <button 
                  onClick={() => setShowAddTaskForm(true)} 
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center justify-center mx-auto"
                >
                  <Plus size={16} className="mr-1" />
                  Add Task
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                {selectedDateTasks.map((task) => (
                  <div key={task.id} className="border rounded-lg overflow-hidden">
                    <div className="h-2" style={{ backgroundColor: task.color }}></div>
                    <div className="p-3">
                      <div className="font-medium">{task.description}</div>
                      <div className="text-sm text-gray-600 mt-1">Assigned to: {task.assignedTo}</div>
                    </div>
                  </div>
                ))}
                <button 
                  onClick={() => setShowAddTaskForm(true)} 
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center justify-center w-full"
                >
                  <Plus size={16} className="mr-1" />
                  Add Task
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Add Task Modal - Responsive for both desktop and mobile */}
      {showAddTaskForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] flex flex-col">
            <div className="border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
              <h3 className="text-base sm:text-lg font-medium">Add Task</h3>
              <button
                onClick={() => setShowAddTaskForm(false)}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <X size={18} />
              </button>
            </div>
            
            <div className="p-4 sm:p-6 overflow-y-auto flex-1">
              <div className="mb-3 sm:mb-4">
                <div className="text-sm text-gray-600 mb-1">Selected Date:</div>
                <div className="font-medium">
                  {selectedDate.toLocaleDateString('default', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                </div>
              </div>

              <div className="mb-3 sm:mb-4">
                <label className="block text-sm text-gray-600 mb-1">Task Description</label>
                <input
                  type="text"
                  placeholder="Enter task description"
                  className="w-full p-2 border border-gray-300 rounded text-sm sm:text-base"
                  value={taskDescription}
                  onChange={(e) => setTaskDescription(e.target.value)}
                />
              </div>
              
              <div className="mb-3 sm:mb-4">
                <label className="block text-sm text-gray-600 mb-1">Assign To</label>
                <input
                  type="text"
                  placeholder="Enter name or team"
                  className="w-full p-2 border border-gray-300 rounded text-sm sm:text-base"
                  value={taskAssignee}
                  onChange={(e) => setTaskAssignee(e.target.value)}
                />
              </div>
              
              <div className="mb-2 sm:mb-4">
                <label className="block text-sm text-gray-600 mb-2">Task Color</label>
                <div className="flex flex-wrap gap-2">
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
            
            <div className="border-t border-gray-200 px-4 sm:px-6 py-3 sm:py-4 flex justify-end space-x-2">
              <button 
                className="px-3 sm:px-4 py-1.5 sm:py-2 text-sm text-gray-600 hover:bg-gray-100 rounded"
                onClick={() => setShowAddTaskForm(false)}
              >
                Cancel
              </button>
              <button 
                className="px-3 sm:px-4 py-1.5 sm:py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
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