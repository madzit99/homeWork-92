import { Button, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../app/hooks";
import { selectUser } from "../usersSlice";
import {  Message } from "../../../types";

const Messages = () => {
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageText, setMessageText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const ws = useRef<WebSocket | null>(null);
  const interval = useRef<number | null>(null);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }

    const connect = () => {
      ws.current = new WebSocket("ws://localhost:8000/chat");

      ws.current.addEventListener("open", () => {
        if (ws.current) {
          ws.current.send(
            JSON.stringify({
              type: "LOGIN",
              payload: {
                user: {
                  _id: user?._id,
                  username: user?.username,
                  displayName: user?.displayName,
                  token: user?.token,
                },
              },
            })
          );
        }
        if (interval.current !== null) {
          clearInterval(interval.current);
          interval.current = null;
        }
      });

      ws.current.addEventListener("close", () => {
        console.log("ws закрыт");
        if (interval.current === null && user) {
          interval.current = setInterval(() => {
            console.log("Попытка повторного подключения...");
            connect();
          }, 3000);
        }
      });

      ws.current.addEventListener("message", (event) => {
        const decodedMessage = JSON.parse(event.data);

        if (decodedMessage.type === "MESSAGES") {
          setMessages(decodedMessage.payload);
        }

        if (decodedMessage.type === "NEW_MESSAGE") {
          setMessages((prev) => [...prev, decodedMessage.payload]);
        }

        if (decodedMessage.type === "WELCOME") {
          console.log(decodedMessage.payload);
        }
      });
    };

    connect();

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [user]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const onMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessageText(e.target.value);
  };

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();

    if (ws.current) {
      ws.current.send(
        JSON.stringify({
          type: "SEND_MESSAGE",
          payload: {
            user: {
              _id: user?._id,
              username: user?.username,
              displayName: user?.displayName,
            },
            message: messageText,
          },
        })
      );
    }
    setMessageText("");
  };

  return (
    <>
      <Grid container justifyContent="space-between">
        <Grid
          item
          container
          xs={8}
          sx={{
            background: "#fff",
            border: "3px solid black",
            borderRadius: "15px",
            height: "70vh",
            overflow: "auto",
          }}
        >
          <div ref={messagesEndRef} />
        </Grid>

        <Grid
          item
          container
          xs={3}
          direction="column"
          sx={{
            background: "#fff",
            border: "3px solid black",
            borderRadius: "15px",
            height: "70vh",
            px: "10px",
          }}
        >
          <Typography variant="h3" sx={{ textAlign: "center" }}>
            Онлайн:
          </Typography>
        </Grid>
      </Grid>

      <form onSubmit={sendMessage}>
        <Grid
          container
          sx={{
            mt: "20px",
            alignItems: "center",
          }}
        >
          <Grid item xs={6}>
            <TextField
              multiline
              rows={3}
              id="messageText"
              label="Сообщение"
              value={messageText}
              onChange={onMessage}
              name="info"
              required
              sx={{
                bgcolor: "#fff",
                border: "3px solid black",
                borderRadius: "15px",
              }}
            />
          </Grid>
          <Grid item xs={2} sx={{ textAlign: "right" }}>
            <Button type="submit" color="primary" variant="contained">
              Отправить
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default Messages;
