import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify'; 

function todo() {
  const [input , setInput] = useState(''); 
  const getData = JSON.parse(localStorage.getItem('alltodos')) ?? [];  
  const [allTask,setAllTask] = useState(getData); 

  const allvalues = { 
    value : input ,
    isStatus : false
  } 
  const myData = ([...allTask,allvalues])

  const inputHandle = ((event)=>{
    event.preventDefault(); 
    if(input.trim() === ''){
      toast.warning('Please add the task! ');  
      setInput('');
    }else
    {
      setAllTask(myData); 
      localStorage.setItem('alltodos',JSON.stringify(myData));
      setInput('');
      toast.success('Task Added!');
    }
  })  

  const remove = (index) =>{
    const removeData = allTask.filter((d,i)=>{
      return index !== i; 
    })
    setAllTask(removeData); 
    localStorage.setItem('alltodos',JSON.stringify(removeData));
      toast.error('Task Deleted ');
  } 

  const line = (index) =>{
    const datas = [...allTask];
    datas[index].isStatus = !datas[index].isStatus;
    setAllTask(datas) 
    // console.log(datas[index].isStatus)   
  }
  return(
    <div
      className="min-vh-100 d-flex justify-content-center align-items-center"
      style={{
        background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
      }}
    >
      <ToastContainer />
      <div
        className="container p-4 main" 
        style={{
          maxWidth: '500px', 
          background: 'rgba(255, 255, 255, 0.1)', 
          borderRadius: '20px', 
          boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )', 
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)', 
          border: '1px solid rgba(255, 255, 255, 0.18)', 
        }}
      >
      <div className='header'>
        <h2 className="text-center text-white fw-bold mb-4">🔥 TODO LIST APP 🔥</h2>
          <form action="" onSubmit={inputHandle}>
              <div className="input-group mb-4"> 
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="💡 Add your next task..." 
                  value={input} 
                  onChange={(e) => setInput(e.target.value)}
                />
                <button className="btn btn-warning btn-lg fw-bold">
                   Add 
                </button> 
              </div>
          </form>
      </div>

          <ul className="list-group">
            {
              allTask.map((d,i)=>{
                return <li key={i}
                className="list-group-item d-flex justify-content-between align-items-center mb-2"
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  color: 'white',
                  borderRadius: '12px',
                  border: '1px solid rgba(255,255,255,0.2)',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                }}
              >
                <div className="form-check d-flex align-items-center">
                  <input
                    className="form-check-input me-2" 
                    type="checkbox"   
                    
                    checked = {d.isStatus}    
                    onChange={()=> line(i)}   
                    style={{ transform: 'scale(1.3)'}}  
                  /> 
                  <label
                    className="form-check-label" 
                    onClick={() => line(i)} 
                    
                    style={{ textDecoration : d.isStatus ? 'line-through':'none',
                      fontSize: '1.1rem',
                    }}
                  >
                  {d.value}
                  </label>
                </div>
                <button
                  className="btn btn-outline-light btn-sm" 
                  onClick={()=> remove(i)}
                >
                  ❌
                </button>
              </li>
              })
            }
              
          </ul>
      </div>
    </div>
  );
}

export default todo;
