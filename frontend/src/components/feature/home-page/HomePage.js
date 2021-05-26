import React, { useState} from 'react';
import Axios from 'axios';
import "../../../config/app.url.json";

function HomePage(props) {

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const addTest = () => {
    Axios.post("http://localhost:3001/api/insert", {
      name: name,
      description: description,
    }).then(() => {
      alert('successfull test insertion');
    });
  };

    return (
      <div className="App">
      <h1>Frontend SOAB - HOME PAGE</h1>

      <label>TestName received:</label><br />
      <input type="text" name="apitest" onChange={(e) => {
        setName(e.target.value);
      }}
      />

      <label>TestDescription received:</label><br />
      <input type="text" name="apitest" onChange={(e) => {
        setDescription(e.target.value);
      }}
      />

      <button onClick={addTest}>Submit</button>
    </div>
    );
}

export default HomePage
