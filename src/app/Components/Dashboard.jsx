"use client"

import { useState, useEffect } from "react"
import { Card as UICard, CardHeader, CardTitle, CardContent, Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Trash2, CheckCircle, XCircle } from "lucide-react"

export default function Dashboard() {
    const [tasks, setTasks] = useState({
        todo: ["Buy Oranges"],
        completed: ["Do Laundry"]
    }) 
    
    const [newTask, setNewTask] = useState("")

    const handleAdd = (task) => {
       setTasks(prev => ({
        ...prev,
        todo: [...prev.todo,task]
       }))
       setNewTask("")
    }
    
    const handleComplete = (task) => {
       setTasks(prev => ({
        todo: prev.todo.filter(t => t !== task),
        completed: [...prev.completed, task]
       }))
    }

    const handleRemove  = (task, type) => {
        setTasks(prev => ({
         ...prev,
         [type.toLowerCase()]:  prev[type.toLowerCase()]?.filter(t => t !== task) 
        }))
    }

    const handleUncomplete = (task) => {
        setTasks(prev => ({
            todo: [...prev.todo, task],
            completed: prev.completed.filter(t => t !== task)
        }))
    }

    useEffect(() => {
        console.log(tasks);
    }, [tasks])

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && newTask.trim()) {
            handleAdd(newTask)
        }
    } 
    
    return (
        <div id="dashboard" className="flex-col items-center gap-y-5 size-full">
        <h1
        className="mt-5 text-5xl text-center">Task Managements App</h1>
        <div id="new-task-div" className="flex justify-center items-center space-x-1">
        <Input
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Groceries"
        className="w-64 my-10"
        onKeyDown={handleKeyDown}
        ></Input>
        <Button
        onClick={() => newTask.trim() && handleAdd(newTask)}
        disabled={!newTask.trim()}
        className="hover:bg-cyan-400"
        >
        <Plus />
        Add Task
        </Button>
        </div>
        <div id="tasks-div"
        className="flex justify-center space-x-4">
        <TaskCard type="To Do"
        className="min-w-[200px]"
        tasks={tasks.todo}>
        {tasks.todo.map((task, index) => (
            <Task 
            key={index}
            text={task}
            onComplete={() => handleComplete(task)}
            onRemove={() => handleRemove(task, "todo")}
            showComplete />
        ))}
        </TaskCard>

        <TaskCard 
        type="Completed"
        tasks={tasks.completed}>
        {tasks.completed.map((task, index) => (
        <Task 
        key={index}
        text={task}
        onUncomplete={() => handleUncomplete(task)}
        onRemove={() => handleRemove(task, "Completed")}
        isCompleted/>
        ))}
        </TaskCard>
        </div>
        </div>
    )
}

const Task = ({ text, onComplete, onRemove, onUncomplete, showComplete, isCompleted }) => {
  return (
   <div id="task" className="w-full flex justify-between items-center p-2">
   <p id="task-text" className="">{text}</p>
   <div id="buttons-div" className="flex justify-end items-center w-fit mt-2">
   { showComplete ? (<Button
   id="complete-btn" 
   onClick={onComplete}
   className="mr-2 bg-green-500"
   >
   <CheckCircle />
   </Button>) : 
   <Button
   id="uncomplete-btn"
   onClick={onUncomplete}
   className="mr-2 bg-red-400"
   > 
   <XCircle />
   </Button>}
   <Button 
   id="remove-btn"
   onClick={onRemove}
   className="bg-gray-600">
    <Trash2 />
   </Button>
   </div>
   </div> 
  )
}

const TaskCard = ({ type, children, tasks }) => {
    return (
        <UICard className="w-96">
            <CardHeader>
                <CardTitle>
                 {type}
                 <br />
                 <span>
                    {tasks.length} {tasks.length === 1 ? "task" : "tasks"}
                 </span>   
                </CardTitle>
            </CardHeader>
            <CardContent id="card-content">
                {children}
            </CardContent>
        </UICard>
    )
}

