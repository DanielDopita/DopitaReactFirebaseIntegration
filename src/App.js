import './App.css';
import React, { useState, useEffect } from "react";
import { auth, db } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, addDoc, query, where, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import Greeting from "./Greeting";
import UserInfo from "./UserInfo";
import TaskComponent from "./TaskComponent";
import Counter from "./Counter";
import { Auth } from "./Auth"; // Changed from default to named import
import TaskForm from "./TaskForm"; // Added missing import

const App = () => {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [randomTask, setRandomTask] = useState("");

  // Authentication state observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  // Load tasks from Firestore when user changes
  useEffect(() => {
    if (user) {
      const q = query(collection(db, 'tasks'), where('userId', '==', user.uid));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const tasksData = [];
        querySnapshot.forEach((doc) => {
          tasksData.push({ id: doc.id, name: doc.data().taskName });
        });
        setTasks(tasksData);
      });
      return unsubscribe;
    } else {
      setTasks([]);
      setRandomTask("");
    }
  }, [user]);

  const getRandomTask = () => {
    if (tasks.length === 0) return "";
    const randomTask = tasks[Math.floor(Math.random() * tasks.length)].name;
    setRandomTask(randomTask);
    return randomTask;
  };

  const handleAlert = () => {
    alert("Hello from the UserInfo component!");
  };

  const handleAddTask = async (newTask) => {
    try {
      await addDoc(collection(db, 'tasks'), {
        userId: user.uid,
        taskName: newTask.name,
        taskDescription: newTask.description,
        createdAt: new Date()
      });
    } catch (error) {
      console.error("Error adding task: ", error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await deleteDoc(doc(db, 'tasks', taskId));
      } catch (error) {
        console.error("Error deleting task: ", error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  if (!user) {
    return (
      <div className="App">
        <Auth />
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="user-header">
          <Greeting username={user.email} />
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </div>
  
        <div className="components-container">
          <section className="component-section">
            <UserInfo handleClick={handleAlert} />
          </section>
  
          <section className="component-section">
            <TaskComponent 
              task={randomTask || getRandomTask()} 
              tasks={tasks.map(t => t.name)}
              onDeleteTask={(index) => handleDeleteTask(tasks[index].id)}
            />
          </section>
  
          <section className="component-section">
            <Counter />
          </section>
  
          <section className="component-section">
            <TaskForm onAddTask={handleAddTask} />
          </section>
        </div>
      </header>
    </div>
  );
};

export default App;