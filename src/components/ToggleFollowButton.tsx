import { useCallback, useState } from 'react';
import { useOwnFeedsContext } from '../own-feeds-context';

export const ToggleFollowButton = ({
  feed,
  isFollowing: initialIsFollowing,
}: {
  feed: string;
  isFollowing: boolean;
}) => {
  const { ownTimeline } = useOwnFeedsContext();
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);

  const follow = useCallback(async () => {
    await ownTimeline?.follow(feed);
    setIsFollowing(true);
    // Reload timelinesto see new activities
    await ownTimeline?.getOrCreate({ watch: true });
  }, [feed, ownTimeline]);

  const unfollow = useCallback(async () => {
    await ownTimeline?.unfollow(feed);
    setIsFollowing(false);
    // Reload timeline to remove activities
    await ownTimeline?.getOrCreate({ watch: true });
  }, [feed, ownTimeline]);

  const toggleFollow = useCallback(() => {
    if (isFollowing) {
      unfollow();
    } else {
      follow();
    }
  }, [isFollowing, follow, unfollow]);

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
