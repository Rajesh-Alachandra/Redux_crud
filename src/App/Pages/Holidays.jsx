import React, { useState } from 'react';
import './Hollidays.css';
import { RxCrossCircled } from "react-icons/rx";
import { FaRegCheckCircle, FaRegWindowClose } from "react-icons/fa";
import { BsThreeDotsVertical } from 'react-icons/bs';
import { MdDelete, MdEdit } from 'react-icons/md';

const initialHolidays = [
  { name: 'Sankranti', date: '15 January 2024', optional: false },
  { name: 'Republic Day', date: '26 January 2024', optional: false },
  { name: 'Holi', date: '25 March 2024', optional: false },
  { name: 'Good Friday', date: '29 March 2024', optional: false },
  { name: 'Ugadi/Ramzan', date: '09 April 2024', optional: false },
  { name: 'Labour Day', date: '01 May 2024', optional: false },
];

const Holidays = () => {
  const [hoveredRow, setHoveredRow] = useState(null);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [openDelPopUp, setOpenDelPopUp] = useState(false);
  const [holidays, setHolidays] = useState(initialHolidays);
  const [newHolidays, setNewHolidays] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editHoliday, setEditHoliday] = useState({ name: '', date: '', optional: false });

  const handleAddHoliday = (index) => {
    const holidayToAdd = newHolidays[index];
    setHolidays([...holidays, holidayToAdd]);
    setNewHolidays(newHolidays.filter((_, i) => i !== index));
  };

  const handleMouseEnter = (index) => {
    setHoveredRow(index);
  };

  const handleMouseLeave = () => {
    setHoveredRow(null);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditHoliday(holidays[index]);
  };

  const handleSaveEdit = () => {
    const updatedHolidays = [...holidays];
    updatedHolidays[editIndex] = editHoliday;
    setHolidays(updatedHolidays);
    setEditIndex(null);
    setEditHoliday({ name: '', date: '', optional: false });
  };

  const handleDelete = (index) => {
    const updatedHolidays = holidays.filter((_, i) => i !== index);
    setHolidays(updatedHolidays);
  };

  const handleAddNewHolidayRow = () => {
    setNewHolidays([...newHolidays, { name: '', date: '', optional: false }]);
  };

  const handleRemoveNewHolidayRow = (index) => {
    setNewHolidays(newHolidays.filter((_, i) => i !== index));
  };

  const handleChangeNewHoliday = (index, field, value) => {
    const updatedNewHolidays = [...newHolidays];
    updatedNewHolidays[index][field] = value;
    setNewHolidays(updatedNewHolidays);
  };

  const handleChangeEditHoliday = (field, value) => {
    setEditHoliday({ ...editHoliday, [field]: value });
  };

  return (
    <div className="holiday-calendar-container">
      <div className="sidebar">
        <div className="sidebar-header">
          <input type="text" placeholder="Search" className="search-box" />
        </div>
        <div className='holiday_plan_container'>
          <div className="holiday-plan active">
            <p>Domestic Leave Calendar 2023</p>
            <div className='d-flex justify-content-between'>
              <span style={{ fontSize: "12px" }}>38 employees</span>
              <span className="default-tag">DEFAULT</span>
            </div>
          </div>
          <div className="holiday-plan">
            <p>Leave Calendar Worthington 2023</p>
            <p>0 employees</p>
          </div>
          <div className="holiday-plan">
            <p>NA</p>
            <p>0 employees</p>
          </div>
          <div className="holiday-plan">
            <p>US Holiday Calendar 2023</p>
            <p>0 employees</p>
          </div>
        </div>
        <button className="new-holiday-plan">+ New holiday plan</button>
      </div>
      <div className="main-content">
        <div className="holiday-calendar">
          <div className="holiday_header d-flex justify-content-between">
            <h3 className='domestic_title'>Domestic Leave Calendar 2023</h3>
            {/* <div
              onClick={() => setOpenDelPopUp(!openDelPopUp)}
              className="porel"
            >
              {openDelPopUp ? <FaRegWindowClose /> : <BsThreeDotsVertical />}
              {openDelPopUp && (
                <div
                  className={`depart-popup-menu ${openDelPopUp ? "open" : ""}`}
                >
                  <ul>
                    <li>
                      <p>Delete</p>
                    </li>
                  </ul>
                </div>
              )}
            </div> */}
          </div>
          <div className="year-buttons d-flex justify-content-between align-items-center p-lg-3">
            <div>
              <button className="year-button">2024</button>
              <button className="year-button">2023</button>
            </div>
            <div className='d-flex gap-5'>
              <p className="text-blue" onClick={handleAddNewHolidayRow}>+ Add Holiday</p>
              {/* <div
                onClick={() => setOpenPopUp(!openPopUp)}
                className="porel"
              >
                {openPopUp ? <FaRegWindowClose /> : <BsThreeDotsVertical />}
                {openPopUp && (
                  <div
                    className={`depart-popup-menu ${openPopUp ? "open" : ""}`}
                  >
                    <ul>
                      <li>
                        <p>Delete</p>
                      </li>
                    </ul>
                  </div>
                )}
              </div> */}
            </div>
          </div>
          <div className='tabel_container'>
            <table>
              <thead>
                <tr>
                  <th>HOLIDAY NAME</th>
                  <th>DATE</th>
                  <th>OPTIONAL</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {newHolidays.map((newHoliday, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type="text"
                        className="styled-input"
                        value={newHoliday.name}
                        onChange={(e) => handleChangeNewHoliday(index, 'name', e.target.value)}
                        placeholder="Holiday name"
                      />
                    </td>
                    <td>
                      <input
                        type="date"
                        className="styled-input"
                        value={newHoliday.date}
                        onChange={(e) => handleChangeNewHoliday(index, 'date', e.target.value)}
                      />
                    </td>
                    <td>
                      <label className="switch_toggle">
                        <input
                          type="checkbox"
                          checked={newHoliday.optional}
                          onChange={(e) => handleChangeNewHoliday(index, 'optional', e.target.checked)}
                        />
                        <span className="switch_slider switch_round"></span>
                      </label>
                    </td>
                    <td>
                      <div className='d-flex justify-content-evenly' style={{ fontSize: "20px" }}>
                        <FaRegCheckCircle className='Add_tick' onClick={() => handleAddHoliday(index)} />
                        <RxCrossCircled className='Remove_tick' onClick={() => handleRemoveNewHolidayRow(index)} />
                      </div>
                    </td>
                  </tr>
                ))}
                {holidays.map((holiday, index) => (
                  <tr
                    key={index}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <td>
                      {editIndex === index ? (
                        <input
                          type="text"
                          className="styled-input"
                          value={editHoliday.name}
                          onChange={(e) => handleChangeEditHoliday('name', e.target.value)}
                        />
                      ) : (
                        holiday.name
                      )}
                    </td>
                    <td>
                      {editIndex === index ? (
                        <input
                          type="date"
                          className="styled-input"
                          value={editHoliday.date}
                          onChange={(e) => handleChangeEditHoliday('date', e.target.value)}
                        />
                      ) : (
                        holiday.date
                      )}
                    </td>
                    <td>
                      {editIndex === index ? (
                        <label className="switch_toggle">
                          <input
                            type="checkbox"
                            checked={editHoliday.optional}
                            onChange={(e) => handleChangeEditHoliday('optional', e.target.checked)}
                          />
                          <span className="switch_slider switch_round"></span>
                        </label>
                      ) : (
                        holiday.optional ? 'Yes' : 'No'
                      )}
                    </td>
                    <td>
                      {hoveredRow === index && (
                        <div className='d-flex justify-content-evenly gap-1'>
                          {editIndex === index ? (
                            <FaRegCheckCircle className='Add_tick' onClick={handleSaveEdit} />
                          ) : (
                            <MdEdit className='Mdedit_icon' onClick={() => handleEdit(index)} />
                          )}
                          <MdDelete className='MdDelete_icon' onClick={() => handleDelete(index)} />
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Holidays;
