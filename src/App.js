import React, { useState,useEffect } from "react";
import "./App.css";
import axios from 'axios'
import TodoList from "./TodoList";
function App() {

  //stores the value of input field
  var [tempTask, setTempTask] = useState("");

  //stores all values of text in to-do list
  var [items, addItemTobox] = useState([]);

  //storing all values from the database
  var [dbLists , changeDbLists] = useState([]);

  var getDataFromDb = async ()=>{
    try {
    const result = await axios.get('http://localhost:8000/todos');
    console.log("Result of getDataFromDbb()-->");
    console.log(result)
    changeDbLists(result.data);
    } catch (error) {
      console.log("Error in getting whole TodoList data from DB in async fn")
    }
  }
  var postData = async (todoDoc)=>{
    try{
      const result = await axios.post('http://localhost:8000/todo',todoDoc);
      console.log("added data successfully");
    }catch(err){
      console.log("Error in postData asysnc fn");
    }
  }

  useEffect(() => {
   
     getDataFromDb();

     console.log("onPageLoad dbLists-->");
     console.log(dbLists);
  }, [])

  //checks input-field has some value or nothing
  var [alertDivStyle, changeAlert] = useState({
    visibility: "hidden",
  });

  //runs when user is typing in input field
  var inputChanging = (e) => {
    setTempTask(e.target.value);
  };

  //runs when user clicks on add button---->and at last removes whole value in input field
  var addTaskClicked = () => {
    if (tempTask==="") {
      alert("nothing in temptask")
      changeAlert({visibility:'visible'});
    } else {
      addItemTobox((allVal) => {
        return [...allVal, tempTask];
      });
      changeAlert({visibility:'hidden'});
      let todoDoc = {
        text:tempTask,
        checked:false
      }
      postData(todoDoc);
      getDataFromDb();
      setTempTask("");
    }
  };

  // A fn which removes particular element
  var del = (arr, id) => {
    return arr.filter(function (value, index) {
      return index !== id;
    });
  };
  
  //works when del clicked
  var delClicked = async (id) => {

    const result = await axios.delete(`http://localhost:8000/todoByPos/${id}`);
    console.log("Del pos ");
    
    addItemTobox((allVal) => {
      return del(allVal, id);
    });

    getDataFromDb();
  };
  return (
    <>
      
      <div className="container">
        <div className="row single_row">
          <div
            className="alert alert-danger"
            style={alertDivStyle}
            role="alert"
          >
            <strong>Fill out the Input field !!!1</strong>
          </div>
          <div className="col-lg-12 single_col">
            <div className="todolist not-done">
              <div className="top_heading-wrapper">
                <span className="Heading_todo">TODO List</span>
                <span className="todo_image">📝</span>
              </div>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Add task"
                  onChange={inputChanging}
                  value={tempTask}
                  aria-label="Recipient's username"
                  aria-describedby="button-addon2"
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-outline-success"
                    type="button"
                    id="button-addon2"
                    onClick={addTaskClicked}
                  >
                    Add
                  </button>
                </div>
              </div>

              <hr />
              <ul id="sortable" className="list-unstyled">
                {/* {items.map((val, index) => {
                  return (
                    <TodoList
                      key={index}
                      id={index}
                      val={val}
                      select={delClicked}
                    />
                  );
                })} */}
                {dbLists.map((val, index) => {
                  return (
                    <TodoList
                      key={index}
                      id={index}
                      val={val.text}
                      select={delClicked}
                      checkedval={val.checked}
                    />
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
