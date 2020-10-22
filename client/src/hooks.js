import { useQuery, useMutation, useSubscription } from '@apollo/react-hooks';
import { messagesQuery, addMessageMutation, messageAddedSubscription } from './graphql/queries';

export function useChatMessages() {
  const {data} = useQuery(messagesQuery);
  const messages = data?.messages ?? [];
  useSubscription(messageAddedSubscription, {
    onSubscriptionData: ({client, subscriptionData: {data}}) => { 
      client.writeData({data: {
        messages: messages.concat(data.messageAdded)
      }})
    }
  });
   const [addMessage] = useMutation(addMessageMutation);
   return {
     messages,
     addMessage: (text)=> addMessage({variables: {input: {text}}})
   }
}
