import { ActivityResponse } from '@stream-io/feeds-react-sdk';

export const Activity = ({ activity }: { activity: ActivityResponse }) => {
  return (
    <div className="w-full p-4 bg-base-100 card border border-base-300">
      <div className="w-full flex items-start gap-4">
        <div className="avatar flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary  flex items-center justify-center text-white text-lg font-semibold">
            <span>{activity.user?.name?.[0]}</span>
          </div>
        </div>
        <div className="w-full flex flex-col items-start gap-4">
          <div className="flex flex-row items-center gap-2">
            <span className="font-semibold text-md">{activity.user.name}</span>
            <span className="text-sm text-base-content/80">
              {activity.created_at.toLocaleString()}
            </span>
          </div>
          <p className="w-full">{activity.text}</p>
        </div>
      </div>
    </div>
  );
};
