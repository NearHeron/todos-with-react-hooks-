import React, { useReducer } from "react";
import axios from "axios"
import FirebaseContext from "./FirebaseContext";
import firebaseReducer from "./firebaseReducer";
import * as types from "../types"

const url = 'https://react-hooks-todos-6f011.firebaseio.com';

const FirebaseState = ({ children }) => {
  const initialState = {
    notes: [],
    loading: false
  };
  const [state, dispatch] = useReducer(firebaseReducer, initialState);

  const showLoader = () => dispatch({type: types.SHOW_LOADER});
  const fetchNotes = async () => {
    showLoader();
    const res = await axios.get(`${url}/notes.json`)

    const payload = Object.keys(res.data || []).map(key => {
      return {
        ...res.data[key],
        id: key
      }
    });

    dispatch({
      type: types.FETCH_NOTES,
      payload
    })
  };

  const addNote = async title => {
    const note = {
      title,
      date: new Date().toJSON()
    };
    try {
      const res = await axios.post(`${url}/notes.json`, note);
      const payload = {
        ...note,
        id: res.data.name
      }

      dispatch({
        type: types.ADD_NOTE,
        payload
      })
    } catch (e) {
      throw new Error(e.message)
    }
  };

  const removeNote = async id => {
    await axios.delete(`${url}/notes/${id}.json`);

    dispatch({
      type: types.REMOVE_NOTE,
      payload: id
    })
  };

  return (
    <FirebaseContext.Provider value={{
      showLoader, addNote, removeNote, fetchNotes,
      loading: state.loading,
      notes:state.notes
    }}>
      { children }
    </FirebaseContext.Provider>
  )
};

export default FirebaseState