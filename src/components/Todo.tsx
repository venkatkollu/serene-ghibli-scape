import React, { useState } from 'react';
import { X, Plus, Trash2, Check } from 'lucide-react';

type TodoItem = {
  id: number;
  text: string;
  completed: boolean;
};

export const Todo: React.FC = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [newTodoText, setNewTodoText] = useState('');

  const addTodo = () => {
    if (newTodoText.trim()) {
      const newTodo: TodoItem = {
        id: Date.now(),
        text: newTodoText.trim(),
        completed: false
      };
      setTodos([...todos, newTodo]);
      setNewTodoText('');
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const removeTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="glass-panel p-4 w-full max-w-md mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-medium">Todo List</h3>
      </div>
      
      <div className="flex mb-4">
        <input 
          type="text" 
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTodo()}
          placeholder="Add a new task"
          className="flex-grow mr-2 px-2 py-1 rounded-md bg-white/20 border border-white/30 text-sm"
        />
        <button 
          onClick={addTodo}
          className="bg-white/30 p-2 rounded-md hover:bg-white/40 transition-colors"
        >
          <Plus size={16} />
        </button>
      </div>
      
      <div className="space-y-2 max-h-[300px] overflow-y-auto">
        {todos.map((todo) => (
          <div 
            key={todo.id} 
            className="flex items-center bg-white/20 p-2 rounded-md"
          >
            <button 
              onClick={() => toggleTodo(todo.id)}
              className={`mr-2 p-1 rounded-full ${
                todo.completed 
                  ? 'bg-green-500/50' 
                  : 'bg-white/30 hover:bg-white/40'
              }`}
            >
              {todo.completed && <Check size={12} className="text-white" />}
            </button>
            <span 
              className={`flex-grow text-sm ${
                todo.completed ? 'line-through text-white/50' : ''
              }`}
            >
              {todo.text}
            </span>
            <button 
              onClick={() => removeTodo(todo.id)}
              className="text-red-500/50 hover:text-red-500/70 transition-colors"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}; 