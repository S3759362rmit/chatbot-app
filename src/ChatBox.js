import React, { useState, useRef, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
    Card,
    Typography,
    Icon,
    useTheme,
    TextField,
    IconButton,
    Avatar,
    Paper
} from "@material-ui/core";
import Moment from "react-moment";
import clsx from "clsx";
import moment from "moment/moment";

const message = [
    {
        id: 1,
        createdAt: "",
        message: "Hi, James!",
        senderId: {
            _id: 2,
            name: "Vesper",
            surname: "Lynd"
        }
    },
    {
        id: 2,
        createdAt: "",
        message: "Hi, Vesper!",
        senderId: {
            _id: 1,
            name: "James",
            surname: "Bond"
        }
    },
    {
        id: 3,
        createdAt: "",
        message: "Quickly come to the meeting room 1B, we have a big server issue",
        senderId: {
            _id: 2,
            name: "Vesper",
            surname: "Lynd"
        }
    },
    {
        id: 4,
        createdAt: "",
        message: "I’m having breakfast right now, can’t you wait for 10 minutes?",
        senderId: {
            _id: 1,
            name: "James",
            surname: "Bond"
        }
    },
    {
        id: 5,
        createdAt: "",
        message: "I’m having breakfast right now, can’t you wait for 10 minutes?",
        senderId: {
            _id: 1,
            name: "James",
            surname: "Bond"
        }
    },
    {
        id: 6,
        createdAt: "",
        message: "We are losing money! Quick!",
        senderId: {
            _id: 2,
            name: "Vesper",
            surname: "Lynd"
        }
    },
    {
        id: 7,
        createdAt: "",
        message:
            "It’s not my money, you know. I will eat my breakfast and then I will come to the meeting room.",
        senderId: {
            _id: 1,
            name: "James",
            surname: "Bond"
        }
    },
    {
        id: 8,
        createdAt: "",
        message: "You are the worst!",
        senderId: {
            _id: 2,
            name: "Vesper",
            surname: "Lynd"
        }
    },
    {
        id: 9,
        createdAt: "",
        message: "We are losing money! Quick!",
        senderId: {
            _id: 2,
            name: "Vesper",
            surname: "Lynd"
        }
    },
    {
        id: 10,
        createdAt: "",
        message: "You are the worst!",
        senderId: {
            _id: 2,
            name: "Vesper",
            surname: "Lynd"
        }
    },
    {
        id: 11,
        createdAt: "",
        message: "We are losing money! Quick!",
        senderId: {
            _id: 2,
            name: "Vesper",
            surname: "Lynd"
        }
    },
    {
        id: 12,
        createdAt: "",
        message:
            "It’s not my money, you know. I will eat my breakfast and then I will come to the meeting room.",
        senderId: {
            _id: 1,
            name: "James",
            surname: "Bond"
        }
    }
];

const useStyles = makeStyles((theme) => ({
    root: {
        "& > *": {
            margin: theme.spacing(1)
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

export default function App() {
    const classes = useStyles();

    const [state, setState] = useState({
        userMyInfo: {
            id: 1,
            name: "James",
            surname: "Bond"
        },
        chat: message,
        msgState: "",
        pag: 0
    });

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
            (chat[i + 1] && chat[i].senderId._id !== chat[i + 1].senderId._id) ||
            !chat[i + 1]
        );
    };

    const isFirstMessageOfGroup = (item, i) => {
        return (
            i === 0 || (chat[i - 1] && chat[i - 1].senderId._id !== item.senderId._id)
        );
    };

    const isLastMessageOfGroup = (item, i) => {
        return (
            i === chat.length - 1 ||
            (chat[i + 1] && chat[i + 1].senderId._id !== item.senderId._id)
        );
    };

    return (
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
                    {state.chat.length === 0 ? (
                        <div style={{ textAlign: "center" }}>
                            Al momento non ci sono messaggi
                        </div>
                    ) : (
                        state.chat.map((item, key) => (
                            <div
                                key={key}
                                className={clsx(
                                    classes.messageRow,
                                    { me: item.senderId._id === userMyInfo.id },
                                    { contact: item.senderId._id !== userMyInfo.id },
                                    { "first-of-group": isFirstMessageOfGroup(item, key) },
                                    { "last-of-group": isLastMessageOfGroup(item, key) }
                                )}
                            >
                                {item.senderId._id !== userMyInfo.id &&
                                    shouldShowContactAvatar(item, key) && (
                                        <Avatar className={classes.avatar}>
                                            {item.senderId.name[0]} {item.senderId.surname[0]}
                                        </Avatar>
                                    )}
                                <div className={classes.bubble}>
                                    <div className={classes.message}>{item.message}</div>
                                    <Typography className={classes.time} color="textSecondary">
                                        {moment(item.time).format("MMMM Do YYYY, h:mm:ss a")}
                                    </Typography>
                                </div>
                            </div>
                        ))
                    )}
                    <div ref={messagesEndRef} />
                </div>
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
                    />
                    <IconButton onClick={() => sendMessage()} disabled={msgState === ""}>
                        <Icon>send</Icon>
                    </IconButton>
                </div>
            </Card>
        </Paper>
    );
}