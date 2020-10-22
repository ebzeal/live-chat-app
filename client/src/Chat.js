import React from 'react';
import { useQuery, useMutation, useSubscription } from '@apollo/react-hooks';
import { messagesQuery, addMessageMutation, messageAddedSubscription } from './graphql/queries';
import MessageInput from './MessageInput';
import MessageList from './MessageList';

const Chat = ({user}) => {
  const {data} = useQuery(messagesQuery);
  const messages = data?.messages ?? [];
  useSubscription(messageAddedSubscription, {
    onSubscriptionData: ({client, subscriptionData: {data}}) => { // destructure result down into data
    client.writeData({data: {
      messages: messages.concat(data.messageAdded)
    }})
    }
  });
  // const [addMessage, {loading, error, data, called}] = useMutation(addMessageMutation) // useMutation returns an array
  const [addMessage] = useMutation(addMessageMutation) // useMutation returns an array
  // console.log("Chat -> result", result)

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
