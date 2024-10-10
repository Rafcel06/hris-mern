import React from 'react'
import { faAngleRight, faPenToSquare,faAngleLeft,faTrashCan}  from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Table = ({Data,CallBack}) => {

    const {data,paginate} = Data;
    const {handleOpenDialog,handleOpen,handleChange,handleDecrement,handleIncrement} = CallBack;


  return (
    <>
     <table className="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data
              ? data?.users?.map((mapped, index) => (
                  <tr key={index}>
                    <td>{mapped.id}</td>
                    <td>
                      {mapped?.firstName + '  '}
                      {mapped?.lastName}
                    </td>
                    <td>{mapped?.email}</td>
                    <td>{mapped?.phone}</td>
                    <td id="table-action">
                    <button className="action-btn" onClick={() => handleOpenDialog(mapped)}><FontAwesomeIcon icon={faTrashCan} /></button>
                    <button  id="edit" className="action-btn" onClick={() => handleOpen(mapped)}><FontAwesomeIcon icon={faPenToSquare} /></button>
                    </td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
        <div id="pagination-container">
          <div id="pagination-sub-container">
             <label htmlFor="pagination">Rows per page:</label>
            <select id="pagination" name="pagination" onChange={handleChange} className="pagination-btn">
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
            </select>
            <p> 1 - {paginate !== 5 ? paginate : data?.users?.length} of {data?.users?.length} </p>
            <button id="lt-btn" className="pagination-btn" onClick={handleDecrement}><FontAwesomeIcon icon={faAngleLeft} className='input-icons'/></button>
            <button id="gt-btn" className="pagination-btn" onClick={handleIncrement}><FontAwesomeIcon icon={faAngleRight} className='input-icons'/></button>
          </div>
        </div>
    </>
  )
}

export default Table