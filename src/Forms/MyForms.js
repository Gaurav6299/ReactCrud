import React, { useEffect, useState } from 'react'
import StudentDetails from './StudentDetails'

const MyForms = () => {
  const [inputData, setInputData] = useState({
    userName: '',
    email: '',
    designation: '',
    mobile: ''
  });
  const [studentList, setStudentList] = useState([{}])
  const [isUpdate, setUpdate] = useState(false)
  const [id, setUpdatedId] = useState();


  const getInputData = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputData(val => ({ ...val, [name]: value }))

  }


  // Save Student Details
  const saveDetails = () => {
    const body = {
      name: inputData.userName,
      email: inputData.email,
      designation: inputData.designation,
      contact: inputData.mobile
    }
    const url = 'http://localhost:8800/create-student';

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then(data => {
        console.log('Success:', data);
        alert("Details Saved Successfully.");
        setInputData({
          userName: '',
          email: '',
          designation: '',
          mobile: ''
        });
        getStudent()
      })
      .catch((error) => {
        console.error('Error:', error);
      });

  }

  // Get Student Details
  const getStudent = async () => {
    const url = "http://localhost:8800/getAllStudent"
    const data = await fetch(url)
    const value = await data.json();
    setStudentList(value);

  }

  //Delete Item
  const deleteItem = async (id) => {
    const url = `http://localhost:8800/delete-stu/${id}`
    try {
      const response = await fetch(url, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      alert("Data is Deleted Successfully")
      getStudent();
    }
    catch (err) {
      console.log(err)
    }
  }


  /**
   * Edit Details
   */

  const editDetails = (id) => {
    const data = studentList.find(ele => ele.roll_number == id)
    setInputData({
      userName: data.name,
      email: data.email,
      designation: data.designation,
      mobile: data.contact
    })
    setUpdate(true)
    setUpdatedId(id)


  }


  /**
   * Update Details
   */
  const updateDetails = () => {
    console.log(id)
    const body = {
      name: inputData.userName,
      email: inputData.email,
      designation: inputData.designation,
      contact: inputData.mobile
    }
    const url = `http://localhost:8800/update-stu/${id}`
    fetch(url, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }).then(data => {
      console.log("UPadted is::", data);
      setUpdate(false)
      alert("Details updated Successfully.")
      getStudent();
      setInputData({
        userName: '',
        email: '',
        designation: '',
        mobile: ''
      })
    }).catch(err => {
      console.log(err)
    })

  }

  useEffect(() => {
    getStudent();
  }, [])

  return (
    <>
      <div className="forms">
        <div className="input-field">
          <h1 style={{ color: '#fff' }}>Student Details</h1>
          <div className="name">
            <label >Enter Name:</label>
            <input type="text" name="userName" value={inputData.userName} onChange={(e) => getInputData(e)} />
          </div>
          <div className="name">
            <label >Enter Email:</label>
            <input type="text" name="email" value={inputData.email} onChange={(e) => getInputData(e)} />
          </div>
          <div className="name">
            <label >Enter Designation:</label>
            <input type="text" name="designation" value={inputData.designation} onChange={(e) => getInputData(e)} />
          </div>
          <div className="name">
            <label >Enter Mobile:</label>
            <input type="number" name="mobile" value={inputData.mobile} onChange={(e) => getInputData(e)} />
          </div>

          <div className="button" >
            {!isUpdate ? <button onClick={() => saveDetails()}>Save</button> : <button onClick={() => updateDetails()}>Update</button>}
          </div>

        </div>
      </div>

      <div className="details">
        <StudentDetails studentList={studentList} deleteItem={deleteItem} editDetails={editDetails} />
      </div>
    </>
  )
}

export default MyForms