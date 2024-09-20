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

  function createCommentTree(data: ChatComment[]) {
    const table = Object.create(null);
    data.forEach((item) => (table[item.id] = { ...item, childNodes: [] }));
    const dataTree: ChatComment[] = [];
    data.forEach((item) => {
      if (item.parentId) table[item.parentId].childNodes.push(table[item.id]);
      else dataTree.push(table[item.id]);
    });
    return dataTree;
  }

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

      <Segment attached style={{ height: 400, overflowY: "scroll" }}>
        {/* parent comment form */}
        <ChatForm eventId={eventId} />

        <CommentGroup style={{ paddingBottom: 0, marginBottom: 0 }}>
          {createCommentTree(comments)
            .reverse()
            .map((comment) => (
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
                    <CommentAction
                      onClick={() =>
                        setReplyForm({ open: true, commentId: comment.id })
                      }
                    >
                      Reply
                    </CommentAction>
                    {replyForm.open && replyForm.commentId === comment.id && (
                      <ChatForm
                        key={comment.id}
                        eventId={eventId}
                        parentId={comment.id}
                        setReplyForm={setReplyForm}
                      />
                    )}
                  </CommentActions>
                </CommentContent>

                {/* reply tree section */}

                <CommentGroup style={{ paddingBottom: 0 }}>
                  {comment.childNodes.map((child) => (
                    <Comment key={child.id}>
                      <CommentAvatar src={child.photoURL || "/user.png"} />
                      <CommentContent>
                        <CommentAuthor as={Link} to={`/profiles/${child.uid}`}>
                          {child.displayName}
                        </CommentAuthor>
                        <CommentMetadata>
                          <div>{dayjs(child.date).fromNow()}</div>
                        </CommentMetadata>
                        <CommentText>{child.text}</CommentText>
                        <CommentActions>
                          <CommentAction
                            onClick={() =>
                              setReplyForm({ open: true, commentId: child.id })
                            }
                          >
                            Reply
                          </CommentAction>
                          {replyForm.open &&
                            replyForm.commentId === child.id && (
                              <ChatForm
                                key={comment.id}
                                eventId={eventId}
                                // going one level deep from parent comment
                                parentId={child.parentId}
                                setReplyForm={setReplyForm}
                              />
                            )}
                        </CommentActions>
                      </CommentContent>
                    </Comment>
                  ))}
                </CommentGroup>
              </Comment>
            ))}
        </CommentGroup>
      </Segment>
    </>
  );
}
export default EventDetailedChat;
