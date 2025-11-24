import { useFeedActivities } from '@stream-io/feeds-react-sdk';
import { Activity } from './Activity';

export const ActivityList = () => {
  const { activities, loadNextPage, has_next_page } = useFeedActivities();

  return (
    <div className="w-full flex flex-col items-center justify-start gap-4">
      {activities?.length === 0 ? (
        'No posts yet'
      ) : (
        <>
          {activities?.map((activity) => (
            <Activity activity={activity} key={activity.id} />
          ))}
          {has_next_page && (
            <button className="btn btn-soft btn-primary" onClick={loadNextPage}>
              Load more
            </button>
          )}
        </>
      )}
    </div>
  );
};
