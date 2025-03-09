 import React, { useState } from "react";
import "./App.css";
import "./card.css";

function ToDoList() {
  const [boards, setBoards] = useState([]);
  const [boardTitle, setBoardTitle] = useState("");

  function handleAddBoard() {                               
    if (boardTitle.trim() !== "") {
      setBoards((prevBoards) => [        //prevBoards represents the previous list of boards (before adding the new one).
        ...prevBoards,                   //(prevBoards) =>  return a new list with the new board added.  ...prevBoard  keeps all the old boards in the list.
        { id: Date.now(), title: boardTitle, tasks: [] },  // a new board is created with 3 things-1.id(for unique id) 2.the title that user typed 3.an empty list of task
      
      
      ]);                                                             //  This adds the new board to the list.
       setBoardTitle("");                                              // Clears the input box after adding the board.
    }
  }

  function handleAddTask(boardId, newTask) {  //this function will take two input -The ID of the board where the task should be added and the task that user will type in the input box
    if (newTask.trim() !== "") {
      setBoards((prevBoards) =>
        prevBoards.map((board) =>                                 //.map() goes through each board in the list.
          board.id === boardId                                    //Checks if this board’s ID matches the boardId where we need to add the task.
            ? { ...board, tasks: [...board.tasks, newTask] }
            : board                                                 // if this is not correct board , return it as it is
        )
      );
    }
  }

  function handleDeleteTask(boardId, taskIndex) {          //The position (index) of the task inside that board's task list.
    setBoards((prevBoards) =>                             //setBoards updates the list of boards after deleting a task.
      prevBoards.map((board) =>
        board.id === boardId                             //Finds the correct board where the task needs to be deleted.
          ? {
              ...board,                                 //{...board-Keep everything else the same (title, ID, etc.}
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
          value={boardTitle}                                         //Whatever is inside boardTitle will appear in the text box.
          onChange={(event) => setBoardTitle(event.target.value)}   //(e.target.value)-Grabs the latest text from the input box.
        />
         <button className="add-button" onClick={handleAddBoard}> 
                                                                    {/* onClick={handleAddBoard} → Calls handleAddBoard when the button is clicked.  */}
          Add Board
        </button>
      </div>


            {/* this holds all the board */}

      <div className="board-container">  
        {boards.map((board) => (                                          //board represent one board at a time
          <div key={board.id} className="board">  
                                                                          {/* each board gets its own div  and  board title is added in h2*/}
            <h2>{board.title}</h2>
            <TaskInput boardId={board.id} onAddTask={handleAddTask} />



                                                                      {/* boardId={board.id} → Tells TaskInput which board the task belongs to.
                                                                      onAddTask={handleAddTask} → Passes the handleAddTask function so tasks can be added. */}


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

function TaskInput({ boardId, onAddTask }) {   //created small input box 
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

