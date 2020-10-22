import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { messagesQuery, addMessageMutation } from './graphql/queries';
import MessageInput from './MessageInput';
import MessageList from './MessageList';

const Chat = ({user}) => {
  const result = useQuery(messagesQuery);
  // const  {data, loading, error} = result;
  const  {data} = result;
  // const [addMessage, {loading, error, data, called}] = useMutation(addMessageMutation) // useMutation returns an array
  const [addMessage] = useMutation(addMessageMutation) // useMutation returns an array
  // console.log("Chat -> result", result)
  const messages = data?.messages ?? [];

const handleSend = async (text) => {
  await addMessage({variables: {input: {text}}})
  // console.log("handleSend -> data", data)
  }
  return (
    <section className="section">
      <div className="container">
        <h1 className="title">Chatting as {user}</h1>
        <MessageList user={user} messages={messages} />
        <MessageInput onSend={handleSend} />
      </div>
    </section>
  );
}

export default Chat;
