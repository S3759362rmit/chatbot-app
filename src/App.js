import logo from './NutritionixAPI_hires_flat.png';
import './App.css';

import axios from "axios";
import { useEffect, useState } from "react";
import { Typography, Grid } from "@material-ui/core";

const API_URL = "https://trackapi.nutritionix.com/v2/natural/nutrients"


function App() {

  // chatlog is reply form bot
  const [chatlog, setchatlog] = useState(null);

  // query is sent by user
  const [query, setQuery] = useState("");

  // sent requst to api and sent response to chatlog
  const sendQuery = (newQuery) => {
    setQuery(newQuery);
    axios({
      "method": 'post',
      "url": API_URL,
      "headers": {
        "Content-Type": "application/json",
        "accept": "application/json",
        "x-app-id": "d544d731",
        "x-app-key": "1cdc80e5ef06a646a35d1964a5b35cb2"
      },
      "data":
        "{\"query\": \"" + query + "\"}"


    }).then((res) => setchatlog(res.data));
  };


  return (
    <>
      {chatlog && (
        <>
          <Typography variant="h3">{chatlog.foods[0].food_name}</Typography>
          <Typography variant="h5">{chatlog.foods[0].serving_qty} {chatlog.foods[0].serving_unit} / {chatlog.foods[0].serving_weight_grams} grams</Typography>
          <Typography variant="h5">calories: {chatlog.foods[0].nf_calories}</Typography>
          <Typography variant="h5">total_fat: {chatlog.foods[0].nf_total_fat}</Typography>
          <Typography variant="h5">saturated_fat: {chatlog.foods[0].nf_saturated_fat}</Typography>
          <Typography variant="h5">sodium: {chatlog.foods[0].nf_sodium}</Typography>
          <Typography variant="h5">total_carbohydrate: {chatlog.foods[0].nf_total_carbohydrate}</Typography>
          <Typography variant="h5">dietary_fiber: {chatlog.foods[0].nf_dietary_fiber}</Typography>
          <Typography variant="h5">sugars: {chatlog.foods[0].nf_sugars}</Typography>
          <Typography variant="h5">protein: {chatlog.foods[0].nf_protein}</Typography>
          <Typography variant="h5">potassium: {chatlog.foods[0].nf_potassium}</Typography>
        </>)}
      {/* <pre>{JSON.stringify(chatlog, undefined, 2)}</pre> */}


      <input onChange={(event) => setQuery(event.target.value)}></input>
      <button onClick={() => sendQuery(query)}>send</button>
      <img src={logo} class="powered" alt="powered by Nutritionix API" />
    </>
  );

};

// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
