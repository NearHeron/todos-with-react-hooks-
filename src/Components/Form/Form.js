import React, { useState, useContext } from "react";
import AlertContext from "../../ducks/alertCotext";
import { FirebaseContext } from "../../ducks/Firebase"

const Form = () => {

  const [value, setValue] = useState('');
  const alert = useContext(AlertContext);
  const firebase  =useContext(FirebaseContext)

  const submitHandler = (event) => {
    event.preventDefault();

    if (value.trim()) {
      firebase.addNote(value.trim()).then(() => {
        alert.show('Действие созданно', 'success');
      }).catch(() => {
        alert.show('Что-то пошло не так', 'danger');
      });
      alert.show('Действие созданно', 'success');
      setValue('')
    } else {
      alert.show('Введите текст')
    }
    alert.show(value, 'success')
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="Введите действие"
          value={value}
          onChange={event => setValue(event.target.value)}
        />
      </div>
    </form>
  )
};

export default Form