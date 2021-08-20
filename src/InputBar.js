import React from "react";
import { Icon, TextField, Button, } from "@material-ui/core";



const InputBar = () => {
    const sendMessage = () => { };
    return (
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
            <Button size="medium" variant="outlined"/*onClick={() => sendMessage()} disabled={msgState === ""}*/>
                send
            </Button>
        </div>
    )
}

export default InputBar