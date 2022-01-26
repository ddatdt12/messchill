import { useState, useEffect } from 'react';

function useMessageLoad(socket, conversationId, page) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(1);

  useEffect(() => {
    setLoading(true);
    socket.emit(
      'get_more_messages',
      {
        conversationId,
        page: page + 1,
        limit: 10,
      },
      (res) => {
        console.log(res);
        if (!res.error) {
          setMessages((prev) => [...res.messages, ...prev]);
          setLoading(false);
        } else {
          console.log(res);
        }
      },
    );
  }, [page, conversationId]);

  return { messages, loading, hasMore };
}

export default use;
