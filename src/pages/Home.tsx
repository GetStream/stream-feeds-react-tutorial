import { StreamFeed } from '@stream-io/feeds-react-sdk';
import { useOwnFeedsContext } from '../own-feeds-context';
import { ActivityComposer } from '../components/activity/ActivityComposer';
import { ActivityList } from '../components/activity/ActivityList';

export const Home = () => {
  const { ownTimeline, ownFeed } = useOwnFeedsContext();

  if (!ownTimeline || !ownFeed) {
    return null;
  }

  return (
    <div className="w-full flex flex-col items-center justify-start gap-4">
      <StreamFeed feed={ownFeed}>
        <ActivityComposer />
      </StreamFeed>
      <StreamFeed feed={ownTimeline}>
        <ActivityList />
      </StreamFeed>
    </div>
  );
};
