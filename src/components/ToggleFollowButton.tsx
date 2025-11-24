import { useCallback } from 'react';
import { useOwnFeedsContext } from '../own-feeds-context';
import {
  FeedResponse,
  useFeedsClient,
  useOwnFollows,
} from '@stream-io/feeds-react-sdk';

export const ToggleFollowButton = ({
  feed: feedResponse,
}: {
  feed: FeedResponse;
}) => {
  const client = useFeedsClient();
  const { ownTimeline } = useOwnFeedsContext();

  const feed = client?.feed(feedResponse.group_id, feedResponse.id);
  const { own_follows: ownFollows } = useOwnFollows(feed) ?? {};
  const isFollowing = (ownFollows?.length ?? 0) > 0;

  const follow = useCallback(async () => {
    if (!feed) return;

    await ownTimeline?.follow(feed);
    // Reload timelinesto see new activities
    await ownTimeline?.getOrCreate({ watch: true, limit: 10 });
  }, [feed, ownTimeline]);

  const unfollow = useCallback(async () => {
    if (!feed) return;

    await ownTimeline?.unfollow(feed);
    // Reload timeline to remove activities
    await ownTimeline?.getOrCreate({ watch: true, limit: 10 });
  }, [feed, ownTimeline]);

  const toggleFollow = useCallback(() => {
    if (isFollowing) {
      unfollow();
    } else {
      follow();
    }
  }, [isFollowing, feed, follow, unfollow]);

  return (
    <button
      className={`btn btn-soft ${
        isFollowing ? 'btn-error' : 'btn-primary'
      } btn-sm`}
      onClick={toggleFollow}
    >
      {isFollowing ? 'Unfollow' : 'Follow'}
    </button>
  );
};
