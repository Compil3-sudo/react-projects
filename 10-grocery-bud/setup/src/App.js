import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

function getLocalStorage() {
  let list = localStorage.getItem('list');
  if (list) {
    return JSON.parse(localStorage.getItem('list'));
  } else {
    return [];
  }
}

function App() {
  const [name, setName] = useState('');
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setisEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: '', type: '' });

  function handleSubmit(e) {
    e.preventDefault();

    if (!name) {
      // display alert
      showAlert(true, 'danger', 'please enter a value');
    } else if (name && isEditing) {
      // deal with edit
      setList(
        list.map(item => {
          if (item.id === editID) {
            return { ...item, title: name };
          }
          return item;
        })
      )
      setName('');
      setEditID(null);
      setisEditing(false);
      showAlert(true, 'success', 'value changed');
    } else {
      // show alert
      showAlert(true, 'success', 'item added to the list');
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName('');
    }
  }

  function showAlert(show = false, type = '', msg = '') {
    setAlert({ show: show, type, msg });
  }

  function clearList() {
    showAlert(true, 'danger', 'empty list');
    setList([]);
  }

  function removeItem(id) {
    showAlert(true, 'danger', 'item removed')
    setList(list.filter(item => item.id !== id));
  }

  function editItem(id) {
    const specificItem = list.find(item => item.id === id);
    setisEditing(true);
    setEditID(id);
    setName(specificItem.title);
  }

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list));
  }, [list])

  return (
    <section className="section-center">
      <form className='grocery-form' onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
        <h3>grocery bud</h3>
        <div className="form-control">
          <input
            type="text"
            className='grocery'
            placeholder='e.g. bacon'
            value={name}
            onChange={(e) => setName(e.target.value)} />
          <button type="submit" className='submit-btn'>
            {isEditing ? 'edit' : 'submit'}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="grocery-container">
          <List items={list} removeItem={removeItem} editItem={editItem} />
          <button className='clear-btn' onClick={clearList}>clear items</button>
        </div>
      )}
    </section>
  );
}

export default App
