import { useFeedContext } from '@stream-io/feeds-react-sdk';
import { useCallback, useState } from 'react';

export const ActivityComposer = () => {
  const feed = useFeedContext();
  const [newText, setNewText] = useState('');

  const sendActivity = useCallback(async () => {
    await feed?.addActivity({
      text: newText,
      // Type can be any string you want
      type: 'post',
    });
    setNewText('');
  }, [feed, newText]);

  return (
    <div className="w-full p-4 bg-base-100 card border border-base-300">
      <div className="w-full flex flex-col gap-2">
        <textarea
          className="w-full textarea textarea-ghost flex-1 min-h-[60px] text-base"
          rows={3}
          placeholder="What is happening?"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          style={{ resize: 'none' }}
        />
        <div className="w-full flex justify-end items-center gap-2">
          <button
            className="btn btn-primary flex-shrink-0"
            onClick={sendActivity}
            disabled={!newText}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};
