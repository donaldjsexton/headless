import { getCommentss } from '@/actions/wp.actions';
import React, { useEffect, useState } from 'react';
import { formatDate } from '@/utils/lib';
import DOMPurify from 'dompurify';

const CommentList = ({ post }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllComments = async () => {
    setLoading(true);
    const data = await getCommentss(post.id);
    console.log(data);
    setComments(data);
    setLoading(false);
  };

  useEffect(() => {
    getAllComments();
  }, [post.id]);

  return (
    <div className="w-2/3 m-auto space-y-4">
      {loading && <div className="text-center text-gray-500">Loading...</div>}
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="p-4 border rounded-lg bg-white shadow-sm"
        >
          <h2 className="text-lg font-semibold text-gray-900">
            {comment?.author_name}
          </h2>

          <p
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(comment?.content?.rendered),
            }}
            className="mt-2 text-gray-700"
          ></p>
          <span className="flex justify-end text-sm">
            Comment Date: {formatDate(comment?.date)}
          </span>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
