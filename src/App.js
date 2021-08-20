// stand js components
import logo from './NutritionixAPI_hires_flat.png';
import './App.css';

// react components
import axios from "axios";
import { useEffect, useState } from "react";
import { Typography, Grid } from "@material-ui/core";
import { Icon, TextField, Button, } from "@material-ui/core";

// custom react class
import ChatBox from "./ChatBox"
// import InputBar from './InputBar';

const API_URL = "https://trackapi.nutritionix.com/v2/natural/nutrients"


const greeting = [
  {
    id: 1,
    createdAt: "",
    message: "Hi, what can I help?",
    senderId: {
      _id: 2,
      name: "Vesper",
      surname: "Lynd"
    }
  },
  {
    id: 1,
    createdAt: "",
    message: "Hi, what can I help?",
    senderId: {
      _id: 2,
      name: "Vesper",
      surname: "Lynd"
    }
  },
  {
    id: 1,
    createdAt: "",
    message: "Hi, what can I help?",
    senderId: {
      _id: 2,
      name: "Vesper",
      surname: "Lynd"
    }
  }
];



function App() {

  // const [message, setMessage] = useState(greeting);

  //  reply form bot
  const [reply, setReply] = useState();

  const [chatlog, setChatlog] = useState(greeting);

  // useEffect(waitReply, [chatlog])

  const addChatlog = (qury, reply) => {
    const newMsg1 =
    {
      id: chatlog.length + 1,
      createdAt: "",
      message: query,
      senderId: {
        _id: 1,
        name: "me",
        surname: "me"
      }
    }
    const newMsg2 =
    {
      id: chatlog.length + 2,
      createdAt: "",
      message: reply,
      senderId: {
        _id: 0,
        name: "M",
        surname: "M"
      }
    }
    setChatlog([...chatlog, newMsg1, newMsg2]);

    //   const sId = sender == "me" ? {
    //     _id: 2,
    //     name: "Vesper",
    //     surname: "Lynd"
    //   } : {
    //     _id: 2,
    //     name: "James",
    //     surname: "Bond"
    //   };

    //   const newMsg =
    //   {
    //     id: chatlog.length + 1,
    //     createdAt: "",
    //     message: msg,
    //     senderId: sId
    //   }
    //   setChatlog([...chatlog, newMsg]);
    // }

    // const addBotChat = (props) => {
    //   const newMsg =
    //   {
    //     id: chatlog.length + 1,
    //     createdAt: "",
    //     message: props,
    //     senderId: {
    //       _id: 1,
    //       name: "M",
    //       surname: "M"
    //     }
    //   }
    //   setChatlog([...chatlog, newMsg]);
  }
  // query is sent by user
  const [query, setQuery] = useState("");

  const addReply = (reply) => {

    let reply_str = ""
    reply_str += reply.foods[0].serving_qty + reply.foods[0].serving_unit + " of " + reply.foods[0].food_name + " contain:\n";
    reply_str += reply.foods[0].nf_calories + "\n";
    addChatlog(query, reply_str);



    // <Typography variant="h5">{chatlog.foods[0].serving_qty} {chatlog.foods[0].serving_unit} / {chatlog.foods[0].serving_weight_grams} grams</Typography>
    // <Typography variant="h5">calories: {chatlog.foods[0].nf_calories}</Typography>
    // <Typography variant="h5">total_fat: {chatlog.foods[0].nf_total_fat}</Typography>
    // <Typography variant="h5">saturated_fat: {chatlog.foods[0].nf_saturated_fat}</Typography>
    // <Typography variant="h5">sodium: {chatlog.foods[0].nf_sodium}</Typography>
    // <Typography variant="h5">total_carbohydrate: {chatlog.foods[0].nf_total_carbohydrate}</Typography>
    // <Typography variant="h5">dietary_fiber: {chatlog.foods[0].nf_dietary_fiber}</Typography>
    // <Typography variant="h5">sugars: {chatlog.foods[0].nf_sugars}</Typography>
    // <Typography variant="h5">protein: {chatlog.foods[0].nf_protein}</Typography>
    // <Typography variant="h5">potassium: {chatlog.foods[0].nf_potassium}</Typography>

  }

  // sent requst to api and sent response to chatlog
  const sendQuery = () => {
    axios({
      "method": 'post',
      "url": API_URL,
      "headers": {
        "Content-Type": "application/json",
        "accept": "application/json",
        "x-app-id": "5786afa8",
        "x-app-key": "83fdb146365c88a93e310c7e0e5538e8"
      },
      "data":
        "{\"query\": \"" + query + "\"}"


    }).then((res) => addReply(res.data));
  };

  const sendQuery0 = () => {
    addChatlog(query);
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


    }).then((res) => addReply(res.data));
  };


  return (
    <>
      <ChatBox message={[...chatlog]} />

      {/* input bar */}
      <div style={{ padding: 5, display: "flex", flexDirection: "row" }}>
        <TextField
          required
          id="outlined-required"
          label="Message"
          //inputRef={textInput}
          placeholder="Message"
          //onChange={handleChange}
          variant="outlined"
          fullWidth

          // value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        {/* <button onClick={() => sendQuery(query)}>send</button> */}
        <Button size="medium" variant="outlined" onClick={() => sendQuery()} disabled={query === ""}>
          send
        </Button>
      </div>
      <pre>{JSON.stringify(query, undefined, 2)}</pre>
      {reply && (
        <>
          <Typography variant="h5">{reply.foods[0].serving_qty} {reply.foods[0].serving_unit} / {reply.foods[0].serving_weight_grams} grams</Typography>
        </>)}
      <pre>{JSON.stringify(chatlog, undefined, 2)}</pre>


      <input onChange={(event) => setQuery(event.target.value)}></input>
      <button onClick={() => sendQuery0(query)}>send</button>
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
