// stand js components
import logo from './NutritionixAPI_hires_flat.png';
import './App.css';

// react components
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  Typography,
  Icon,
  useTheme,
  TextField,
  IconButton,
  Avatar,
  Paper,
  Grid,
  Button
} from "@material-ui/core";
import clsx from "clsx";

// custom react class
// import ChatBox from "./ChatBox"
// import InputBar from './InputBar';

const API_URL = "https://trackapi.nutritionix.com/v2/natural/nutrients"

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(0)
    }
  },
  messageRow: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-end",
    padding: "0 16px 4px 16px",
    flex: "0 0 auto",
    "&.contact": {
      "& $bubble": {
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.getContrastText(theme.palette.background.paper),
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        marginLeft: 28,
        "& $time": {
          marginLeft: 12
        }
      },
      "&.first-of-group": {
        "& $bubble": {
          borderTopLeftRadius: 20
        }
      },
      "&.last-of-group": {
        "& $bubble": {
          borderBottomLeftRadius: 20
        }
      }
    },
    "&.me": {
      paddingLeft: 40,

      "& $avatar": {
        order: 2,
        margin: "0 0 0 16px"
      },

      "& $bubble": {
        marginLeft: "auto",
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        "& $time": {
          justifyContent: "flex-end",
          right: 0,
          marginRight: 12
        }
      },
      "&.first-of-group": {
        "& $bubble": {
          borderTopRightRadius: 20
        }
      },

      "&.last-of-group": {
        "& $bubble": {
          borderBottomRightRadius: 20
        }
      }
    },
    "&.contact + .me, &.me + .contact": {
      paddingTop: 20,
      marginTop: 20
    },
    "&.first-of-group": {
      "& $bubble": {
        borderTopLeftRadius: 20,
        paddingTop: 13
      }
    },
    "&.last-of-group": {
      "& $bubble": {
        borderBottomLeftRadius: 20,
        paddingBottom: 13,
        "& $time": {
          display: "flex"
        }
      }
    }
  },
  avatar: {
    position: "absolute",
    left: 0,
    margin: 0
  },
  bubble: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    maxWidth: "100%",
    boxShadow: theme.shadows[1]
  },
  message: {
    whiteSpace: "pre-wrap",
    lineHeight: 1.2
  },
  time: {
    position: "absolute",
    display: "none",
    width: "100%",
    fontSize: 11,
    marginTop: 8,
    top: "100%",
    left: 0,
    whiteSpace: "nowrap"
  },
  bottom: {
    // background: theme.palette.background.default,
    // borderTop: '1px solid rgba(0, 0, 0, 0.13)'
  },
  inputWrapper: {
    borderRadius: 24
  }
}));

// const me = {
//   _id: 1,
//   name: "me",
//   surname: "me"
// }

// const mm = {
//   _id: 1,
//   name: "M",
//   surname: "M"
// }


const greeting = [
  {
    id: 1,
    createdAt: "",
    message: "Hi! Please tell me what you ate and I'll tell you the nutrition information.",
    senderId: "MM"
  }
];



function App() {

  // const [message, setMessage] = useState(greeting);

  //  reply form bot
  const [reply, setReply] = useState();

  const [chatlog, setChatlog] = useState(greeting);

  const [state, setState] = useState(chatlog);

  // useEffect(waitReply, [chatlog])

  const addChatlog = (qury, reply_str) => {
    const newMsg1 =
    {
      id: chatlog.length + 1,
      createdAt: "",
      message: query,
      senderId: "me"
    }
    const newMsg2 =
    {
      id: chatlog.length + 2,
      createdAt: "",
      message: reply_str,
      senderId: "MM"
    }
    setChatlog([...chatlog, newMsg1, newMsg2])
    setState(chatlog);

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
    setReply(reply)
    const food = reply.foods[0];

    let reply_str = ""
    reply_str += food.serving_qty + " " + food.serving_unit + " of " + food.food_name + "\n";
    reply_str += "weight: " + food.serving_weight_grams + " g contain:\n";
    reply_str += "calories: " + food.nf_calories + " kJ\n";
    reply_str += "total fat: " + food.nf_total_fat + " g\n";
    reply_str += "saturated fat: " + food.nf_saturated_fat + " g\n";
    reply_str += "protein: " + food.nf_protein + " g\n";
    reply_str += "sugars: " + food.nf_sugars + " g\n";
    reply_str += "total carbohydrate: " + food.nf_total_carbohydrate + " g\n";
    reply_str += "dietary fiber: " + food.nf_dietary_fiber + " g\n";
    reply_str += "cholesterol: " + food.nf_cholesterol + " mg\n";
    reply_str += "sodium: " + food.nf_sodium + " mg\n";
    reply_str += "dietary fiber: " + food.nf_dietary_fiber + " g\n";
    reply_str += "Sodium: " + food.nf_sodium + " mg\n";
    reply_str += "Potassium: " + food.nf_potassium + " mg\n";
    reply_str += "Phosphorus: " + food.nf_p + " mg\n";


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

  // for chatbox
  //
  const { message } = chatlog
  const classes = useStyles();



  const { userMyInfo, chat, msgState } = state;

  const sendMessage = () => { };

  const oldMessage = () => {
    //http request
    fetch("")
      .then((response) => response.json())
      .then((message) => {
        setState(...(prev) => ({ ...prev, chat: [...message, ...prev.chat] }));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, []);

  const shouldShowContactAvatar = (item, i) => {
    return (
      (chatlog[i + 1] && chatlog[i].senderId !== chatlog[i + 1].senderId) ||
      !chatlog[i + 1]
    );
  };

  const isFirstMessageOfGroup = (item, i) => {
    return (
      i === 0 || (chatlog[i - 1] && chatlog[i - 1].senderId !== item.senderId)
    );
  };

  const isLastMessageOfGroup = (item, i) => {
    return (
      i === chatlog.length - 1 ||
      (chatlog[i + 1] && chatlog[i + 1].senderId !== item.senderId)
    );
  };

  //
  //

  return (
    <>
      {/* <ChatBox message={[...chatlog]} /> */}
      <Paper
        elevation={3}
        className={clsx(classes.root, "flex flex-col relative pb-64")}
      >
        <Card elevation={1} className="flex flex-col h-512 rounded-8">
          <div
            className="flex flex-shrink-0 items-center justify-between px-24 h-64"
            style={{
              background: "#607d8b"
              //color: theme.palette.getContrastText('#607d8b')
            }}
          >
            <Typography className="text-center text-16 font-400">Chat</Typography>
          </div>
          <div style={{ flex: 1, overflowY: "auto" }}>
            {chatlog.length === 0 ? (
              <div style={{ textAlign: "center" }}>
                Al momento non ci sono messaggi
              </div>
            ) : (
              chatlog.map((item, key) => (
                <div
                  key={key}
                  className={clsx(
                    classes.messageRow,
                    { me: item.senderId == "me" },
                    { contact: item.senderId != "me" },
                    { "first-of-group": isFirstMessageOfGroup(item, key) },
                    { "last-of-group": isLastMessageOfGroup(item, key) }
                  )}
                >
                  {item.senderId !== "me" &&
                    shouldShowContactAvatar(item, key) && (
                      <Avatar className={classes.avatar}>
                        M M
                      </Avatar>
                    )}
                  <div className={classes.bubble}>
                    <div className={classes.message}>{item.message}</div>
                    {/* <Typography className={classes.time} color="textSecondary">
                                    </Typography> */}
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
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
          </div>

        </Card>
      </Paper>


      {/* <pre>{JSON.stringify(query, undefined, 2)}</pre>
      {reply && (
        <>
          <Typography variant="h5">{reply.foods[0].serving_qty} {reply.foods[0].serving_unit} / {reply.foods[0].serving_weight_grams} grams</Typography>
        </>)}
      <pre>{JSON.stringify(reply, undefined, 2)}</pre> */}


      {/* <input onChange={(event) => setQuery(event.target.value)}></input>
      <button onClick={() => sendQuery0(query)}>send</button> */}
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
