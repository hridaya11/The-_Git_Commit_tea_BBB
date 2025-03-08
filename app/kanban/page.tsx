"use client"

import { useState } from "react"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { AnimatedCard } from "@/components/ui/animated-card"
import { Sparkles } from "@/components/ui/sparkles"

// Initial data for the Kanban board
const initialData = {
  tasks: {
    "task-1": { id: "task-1", content: "Design landing page", priority: "High", assignee: "John Doe" },
    "task-2": { id: "task-2", content: "Implement authentication", priority: "Medium", assignee: "Jane Smith" },
    "task-3": { id: "task-3", content: "Create dashboard widgets", priority: "High", assignee: "Alex Johnson" },
    "task-4": { id: "task-4", content: "Setup database schema", priority: "Low", assignee: "Sarah Williams" },
    "task-5": { id: "task-5", content: "API integration", priority: "Medium", assignee: "Mike Brown" },
    "task-6": { id: "task-6", content: "User testing", priority: "High", assignee: "Emily Davis" },
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "To Do",
      taskIds: ["task-1", "task-2", "task-3"],
    },
    "column-2": {
      id: "column-2",
      title: "In Progress",
      taskIds: ["task-4", "task-5"],
    },
    "column-3": {
      id: "column-3",
      title: "Done",
      taskIds: ["task-6"],
    },
  },
  columnOrder: ["column-1", "column-2", "column-3"],
}

export default function KanbanPage() {
  const [data, setData] = useState(initialData)

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result

    // If there's no destination or the item is dropped in the same place
    if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
      return
    }

    const sourceColumn = data.columns[source.droppableId]
    const destColumn = data.columns[destination.droppableId]

    // Moving within the same column
    if (sourceColumn === destColumn) {
      const newTaskIds = Array.from(sourceColumn.taskIds)
      newTaskIds.splice(source.index, 1)
      newTaskIds.splice(destination.index, 0, draggableId)

      const newColumn = {
        ...sourceColumn,
        taskIds: newTaskIds,
      }

      setData({
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn,
        },
      })
      return
    }

    // Moving from one column to another
    const sourceTaskIds = Array.from(sourceColumn.taskIds)
    sourceTaskIds.splice(source.index, 1)
    const newSourceColumn = {
      ...sourceColumn,
      taskIds: sourceTaskIds,
    }

    const destTaskIds = Array.from(destColumn.taskIds)
    destTaskIds.splice(destination.index, 0, draggableId)
    const newDestColumn = {
      ...destColumn,
      taskIds: destTaskIds,
    }

    setData({
      ...data,
      columns: {
        ...data.columns,
        [newSourceColumn.id]: newSourceColumn,
        [newDestColumn.id]: newDestColumn,
      },
    })
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
      case "Medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
      case "Low":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  return (
    <div className="p-4 md:p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">
          <Sparkles>Kanban Board</Sparkles>
        </h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Task
        </Button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.columnOrder.map((columnId) => {
            const column = data.columns[columnId]
            const tasks = column.taskIds.map((taskId) => data.tasks[taskId])

            return (
              <div key={column.id} className="flex flex-col">
                <Card className="h-full">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle>{column.title}</CardTitle>
                      <span className="inline-flex items-center justify-center w-6 h-6 text-sm font-semibold rounded-full bg-primary/10 text-primary">
                        {tasks.length}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <Droppable droppableId={column.id}>
                      {(provided) => (
                        <div ref={provided.innerRef} {...provided.droppableProps} className="min-h-[500px]">
                          {tasks.map((task, index) => (
                            <Draggable key={task.id} draggableId={task.id} index={index}>
                              {(provided, snapshot) => (
                                <AnimatedCard
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className={`mb-3 ${snapshot.isDragging ? "shadow-lg" : ""}`}
                                  style={{
                                    ...provided.draggableProps.style,
                                  }}
                                >
                                  <CardContent className="p-4">
                                    <div className="font-medium mb-2">{task.content}</div>
                                    <div className="flex justify-between items-center text-sm">
                                      <span
                                        className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(task.priority)}`}
                                      >
                                        {task.priority}
                                      </span>
                                      <span className="text-muted-foreground">{task.assignee}</span>
                                    </div>
                                  </CardContent>
                                </AnimatedCard>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </CardContent>
                </Card>
              </div>
            )
          })}
        </div>
      </DragDropContext>
    </div>
  )
}

