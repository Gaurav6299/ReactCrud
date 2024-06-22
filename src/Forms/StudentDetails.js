import React from 'react'

const StudentDetails = ({ deleteItem, studentList, editDetails }) => {
  let count = 0;
  return (
    <>
      <div className="table">
        <h2>Student Details List</h2>
        <table>
          <thead>
            <tr>
              <th>SI.No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Designation</th>
              <th>Mobile</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {studentList.map((val) => {
              count++
              return (
                <>
                  <tr key={val.roll_number}>
                    <td>{count}</td>
                    <td>{val.name}</td>
                    <td>{val.email}</td>
                    <td>{val.designation}</td>
                    <td>{val.contact}</td>
                    <td>
                      <div>
                        <button className='edit' onClick={() => editDetails(val.roll_number)}>Edit</button>
                        <button className='delete' onClick={() => deleteItem(val.roll_number)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                </>
              )
            })}

          </tbody>
        </table>
      </div >
    </>
  )
}

export default StudentDetails