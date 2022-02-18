import { CircularProgress } from '@mui/material';
import { styled } from '@mui/system';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Message from './Message';

const InfiniteScrollMessagesBox = (props, ref) => {
  const { loading, messages, hasMore, fetchMoreMessages, currentUserId } =
    props;

  return (
    <MessagesBody id='scrollableDiv'>
      {loading && (
        <CircularProgress
          style={{
            position: 'absolute',
            top: 10,
            left: '50%',
          }}
        />
      )}
      {messages.length === 0 && <div>No messages</div>}
      {/*Put the scroll bar always on the bottom*/}
      {messages.length !== 0 && (
        <InfiniteScroll
          dataLength={messages.length}
          next={fetchMoreMessages}
          style={{
            display: 'flex',
            flexDirection: 'column-reverse',
            position: 'relative',
          }} //To put endMessage and loader to the top.
          hasMore={hasMore}
          inverse={true}
          loader={
            <CircularProgress
              style={{
                position: 'absolute',
                top: 10,
                left: '50%',
              }}
            />
          }
          endMessage={<h3>No more</h3>}
          scrollableTarget='scrollableDiv'>
          {messages.map((m, i) => (
            <Message
              key={m._id}
              data={m}
              isCurrentUser={m.sender._id === currentUserId}
              lastMessageSentTime={
                messages[i + 1] ? messages[i + 1].createdAt : null
              }
            />
          ))}
        </InfiniteScroll>
      )}
      {/* <div ref={endMessageRef} /> */}
    </MessagesBody>
  );
};

const MessagesBody = styled('div')({
  flex: 1,
  backgroundColor: 'white',
  padding: 20,
  overflowY: 'auto',
  overflowX: 'hidden',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column-reverse',
  // justifyContent: 'flex-end',
});

export default InfiniteScrollMessagesBox;
