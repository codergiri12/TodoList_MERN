import React, { useState , useEffect } from "react";
import "./App.css";

import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';

function TodoList(props) {

  //decides the style of text
  var [style_val,checkChanged] = useState({textDecoration: 'none'})

  var handlingChange = (e)=>{
    let isChecked = e.target.checked;
    if(isChecked){
      checkChanged((prevVal)=>{
        return(
          {textDecoration: 'line-through'}
        )
      })
    }
  }

  //works when user checks the check-box  
  var handleChange=(e,id)=>{
    axios.patch(`http://localhost:8000/todoByPos/${id}`)
        .then(()=>{console.log('updated')})
        .catch(err=>{console.log("cant update error")})

    let isChecked = e.target.checked;
    if(isChecked){
      checkChanged((prevVal)=>{
        return(
          {textDecoration: 'line-through'}
        )
      })
    }else if(!isChecked){
      checkChanged((prevVal)=>{
        return(
          {textDecoration: 'none'}
        )
      })
    }
    
  }

  
  return (
    <li className="ui-state-default">
      <div className="checkbox">
        <label>
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            onLoad={e=>handlingChange(e)}
            onChange={e =>handleChange(e,props.id)}
            aria-label="..."
            defaultChecked={props.checkedval}
            id="id_of_checkbox"
          />
          <span className="text_to_do" style={style_val}>{props.val}</span>
          <button className="close" onClick={() => {
            props.select(props.id);
           
          }}>
            <DeleteIcon />
          </button>
        </label>
      </div>
    </li>
  );
}
export default TodoList;
