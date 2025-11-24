import { StreamFeed } from '@stream-io/feeds-react-sdk';
import { useOwnFeedsContext } from '../own-feeds-context';
import { ActivityList } from '../components/activity/ActivityList';

export const Home = () => {
  const { ownTimeline } = useOwnFeedsContext();

  if (!ownTimeline) {
    return null;
  }

  return (
    <div className="w-full flex flex-col items-center justify-start gap-4">
      <StreamFeed feed={ownTimeline}>
        <ActivityList />
      </StreamFeed>
    </div>
  );
};
