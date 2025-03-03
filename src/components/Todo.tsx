import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, Check } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

type TodoItem = {
  id: number;
  text: string;
  completed: boolean;
};

export default function Todo() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [newTodoText, setNewTodoText] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchTodos();
    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUser(session.user);
        fetchTodos();
      } else {
        setUser(null);
        setTodos([]);
      }
    });
  }, []);

  const fetchTodos = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data, error } = await supabase
        .from('todos')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: true });
      
      if (data) setTodos(data);
      if (error) console.error('Error fetching todos:', error);
    }
  };

  const addTodo = async (e) => {
    e.preventDefault();
    if (!newTodoText.trim()) return;

    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data, error } = await supabase
        .from('todos')
        .insert([
          { text: newTodoText, user_id: user.id }
        ])
        .select();

      if (error) console.error('Error adding todo:', error);
      else {
        setTodos([...todos, data[0]]);
        setNewTodoText('');
      }
    }
  };

  const toggleTodo = async (id: number, completed: boolean) => {
    const { error } = await supabase
      .from('todos')
      .update({ completed: !completed })
      .eq('id', id);

    if (!error) {
      setTodos(todos.map(todo => 
        todo.id === id ? { ...todo, completed: !completed } : todo
      ));
    }
  };

  const removeTodo = async (id: number) => {
    const { error } = await supabase
      .from('todos')
      .delete()
      .eq('id', id);

    if (!error) {
      setTodos(todos.filter(todo => todo.id !== id));
    }
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
          onKeyDown={(e) => e.key === 'Enter' && addTodo(e)}
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
              onClick={() => toggleTodo(todo.id, todo.completed)}
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
} 