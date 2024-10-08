import {  Grid, Typography } from "@mui/material";
import dayjs from "dayjs";
import { Message } from "../../../types";

interface Props {
  message: Message;
}

const MessageItem: React.FC<Props> = ({ message }) => {

  return (
    <Grid
      item
      container
      direction="column"
      sx={{
        borderTop: "1px solid black",
        background: message.personal ? "gray" : "inherit",
      }}
    >
      <Grid item container justifyContent="space-between">
        <Typography variant="h4">{message.user.displayName}</Typography>
        <Typography variant="h4">
          {dayjs(message.date).format("HH:mm:ss")}
        </Typography>
      </Grid>
      <Grid item container justifyContent="space-between">
        <Typography variant="h4">{message.message}</Typography>
        {message.personal && (
          <Typography variant="h6"></Typography>
        )}
      </Grid>
    </Grid>
  );
};

export default MessageItem;
