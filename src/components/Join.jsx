import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import image from "../assets/download.png"

function Join() {

  const navigate = useNavigate()
  const [userName, setUserName] = useState("")
  console.log(userName);


  const goToChat = () => {
    if (userName) {
      navigate('/chat', { state: userName })
    }
    else {
      alert("Enter Your Name")
    }
  }

  return (
    <>
      <div style={{ height: "100vh", width: '100vw', backgroundColor: "black", paddingLeft: '30vw', paddingRight: '30vw' }}
        className="d-flex justify-content-center align-items-center ">
        <div className="box">
          <div className='box d-flex flex-column justify-content-center align-items-center' >

            <img width={'100%'} height={'80%'} className='img-fluid mb-1 rounded pt-5' src={image} alt="" />
            <div>
              <input type="text" onChange={(e) => setUserName(e.target.value)} className='form-control rounded border border-none ' placeholder='Enter your Name' />
              <button onClick={goToChat} className="btn btn-primary mt-2 w-100 start">Start Chat</button>
            </div>
          </div>
        </div>




      </div>
    </>
  )
}

export default Join