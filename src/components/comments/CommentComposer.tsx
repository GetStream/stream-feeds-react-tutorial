import { ActivityResponse, useFeedsClient } from '@stream-io/feeds-react-sdk';
import { useState, useCallback } from 'react';

export const CommentComposer = ({
  activity,
}: {
  activity: ActivityResponse;
}) => {
  const client = useFeedsClient();
  const [commentDraft, setCommentDraft] = useState('');

  const addComment = useCallback(async () => {
    await client?.addComment({
      object_id: activity.id,
      object_type: 'activity',
      comment: commentDraft,
    });
    setCommentDraft('');
  }, [client, activity.id, commentDraft]);

  return (
    <div className="w-full flex flex-row gap-2">
      <input
        className="input w-full"
        placeholder="Post your reply"
        value={commentDraft}
        onChange={(e) => setCommentDraft(e.target.value)}
      />
      <button
        className="btn btn-primary"
        onClick={addComment}
        disabled={!commentDraft.trim()}
      >
        Reply
      </button>
    </div>
  );
};
