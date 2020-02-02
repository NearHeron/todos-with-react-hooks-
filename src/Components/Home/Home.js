import React, { Fragment, useContext, useEffect } from "react";
import Form from "../Form";
import Notes from "../Notes";
import { FirebaseContext } from "../../ducks/Firebase";
import Loader from "../Loader";

const Home = () => {
  const { loading, notes, fetchNotes, removeNote } = useContext(FirebaseContext);
  useEffect(() => {
    fetchNotes()
  }, []);

  return (
    <Fragment>
      <Form />
      <hr />
      { loading ? <Loader /> : <Notes notes={notes} onRemove={removeNote} /> }
    </Fragment>
  )
};

export default Home;