import {
  Comment,
  CommentAction,
  CommentActions,
  CommentAuthor,
  CommentAvatar,
  CommentContent,
  CommentGroup,
  CommentMetadata,
  CommentText,
  Header,
  Segment,
} from "semantic-ui-react";
import ChatForm from "./ChatForm";
import { onChildAdded, ref } from "firebase/database";
import { useState, useEffect } from "react";
import { fb } from "../../../app/config/firebase";
import { ChatComment } from "../../../app/types/event";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

type Props = {
  eventId: string;
};

function EventDetailedChat({ eventId }: Props) {
  const [comments, setComments] = useState<ChatComment[]>([]);
  const [replyForm, setReplyForm] = useState<any>({
    open: false,
    commentId: null,
  });

  dayjs.extend(relativeTime);

  useEffect(() => {
    const chatRef = ref(fb, `chat/${eventId}`);
    const unsubscribe = onChildAdded(chatRef, (data) => {
      const comment = { ...data.val(), id: data.key };
      setComments((prevState) => [...prevState, comment]);
    });

    return () => unsubscribe();
  }, [eventId]);
  return (
    <>
      <Segment
        textAlign="center"
        attached="top"
        inverted
        color="teal"
        style={{ border: "none" }}
      >
        <Header>Chat about this event</Header>
      </Segment>

      <Segment attached>
        <CommentGroup>
          {comments.map((comment) => (
            <Comment key={comment.id}>
              <CommentAvatar src={comment.photoURL || "/user.png"} />
              <CommentContent>
                <CommentAuthor as={Link} to={`/profiles/${comment.uid}`}>
                  {comment.displayName}
                </CommentAuthor>
                <CommentMetadata>
                  <div>{dayjs(comment.date).fromNow()}</div>
                </CommentMetadata>
                <CommentText>{comment.text}</CommentText>
                <CommentActions>
                  <CommentAction>Reply</CommentAction>
                </CommentActions>
              </CommentContent>
            </Comment>
          ))}
        </CommentGroup>

        <ChatForm eventId={eventId} />
      </Segment>
    </>
  );
}
export default EventDetailedChat;
