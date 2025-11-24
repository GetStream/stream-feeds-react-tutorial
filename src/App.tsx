import { StreamFeeds, useCreateFeedsClient } from '@stream-io/feeds-react-sdk';
import { AppSkeleton } from './AppSkeleton';
import { API_KEY, CURRENT_USER } from './user';

export default function App() {
  const client = useCreateFeedsClient({
    apiKey: API_KEY,
    tokenOrProvider: CURRENT_USER.token,
    userData: {
      id: CURRENT_USER.id,
      name: CURRENT_USER.name,
    },
  });

  if (!client) {
    return null;
  }

  return (
    <StreamFeeds client={client}>
      <AppSkeleton />
    </StreamFeeds>
  );
}
