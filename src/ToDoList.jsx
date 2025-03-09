 import React, { useState } from "react";
import "./App.css";
import "./card.css";

function ToDoList() {
  const [boards, setBoards] = useState([]);
  const [boardTitle, setBoardTitle] = useState("");

  function handleAddBoard() {                               
    if (boardTitle.trim() !== "") {
      setBoards((prevBoards) => [        
        ...prevBoards,                 
        { id: Date.now(), title: boardTitle, tasks: [] },  
      
      
      ]);                                                           
       setBoardTitle("");                                              
    }
  }

  function handleAddTask(boardId, newTask) {  
    if (newTask.trim() !== "") {
      setBoards((prevBoards) =>
        prevBoards.map((board) =>                                
          board.id === boardId                                    
            ? { ...board, tasks: [...board.tasks, newTask] }
            : board                                               
        )
      );
    }
  }

  function handleDeleteTask(boardId, taskIndex) {          
    setBoards((prevBoards) =>                          
      prevBoards.map((board) =>
        board.id === boardId                             
          ? {
              ...board,                                 
              tasks: board.tasks.filter((element, index) => index !== taskIndex),
            }
          : board
      )
    );
  }

  return (
    <div className="to-do-list">
      <div className="review">
        <input className="outer"
          type="text"
          placeholder="Enter Board Title"
          value={boardTitle}                                         
          onChange={(event) => setBoardTitle(event.target.value)}   
        />
         <button className="add-button" onClick={handleAddBoard}> 
                                                                    
          Add Board
        </button>
      </div>


            {/* this holds all the board */}

      <div className="board-container">  
        {boards.map((board) => (                                         
          <div key={board.id} className="board">  
                                                                          
            <h2>{board.title}</h2>
            <TaskInput boardId={board.id} onAddTask={handleAddTask} />



                                                                      
                                                                    


            <div className="task-list">
              {board.tasks.map((task, index) => (
                <div key={index} className="card">
                  <span>{task}</span>
                  <button
                    className="delete-btn"
                    onClick={()=> handleDeleteTask(board.id, index)}
                  >
                  X
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// manage the task inside th board

function TaskInput({ boardId, onAddTask }) {   
  const [task, setTask] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (task.trim()) {
    onAddTask(boardId, task);
    setTask("");
    
  }
}

  return (
    <form onSubmit={handleSubmit} className="task-input">
      <input
        type="text"
        placeholder="Add a task"
        value={task}
        onChange={(event) => setTask(event.target.value)}
      />
      <button type="submit" className="add-button-inside">
        Add Task
      </button>
    </form>
  );
}

export default ToDoList;

