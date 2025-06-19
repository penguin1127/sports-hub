// src/components/common/DetailModal.tsx

import React, { useEffect, useState, FormEvent } from 'react';
import { 
  getPostDetailApi,
  getCommentsApi,
  createCommentApi,
  toggleLikeApi
} from '@/features/team/api/teamApi';

// 이름 충돌을 피하기 위해 Comment 타입을 CommentType이라는 별명으로 가져옵니다.
import type { TeamPost, PostComment } from '@/types/team';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  postId: number | null;
}

const DetailModal: React.FC<Props> = ({ isOpen, onClose, postId }) => {
  const [post, setPost] = useState<TeamPost | null>(null);
  // ▼▼▼ 상태의 타입도 PostComment로 변경합니다 ▼▼▼
  const [comments, setComments] = useState<PostComment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
    if (isOpen && postId) {
      setIsLoading(true);
      Promise.all([
        getPostDetailApi(postId),
        getCommentsApi(postId)
      ])
      .then(([postData, commentsData]) => {
        setPost(postData);
        setComments(commentsData);
      })
      .catch(err => {
        console.error("상세 정보 또는 댓글 로딩 실패:", err);
        alert("정보를 불러오는 데 실패했습니다.");
        onClose();
      })
      .finally(() => setIsLoading(false));
    }
  }, [isOpen, postId, onClose]);

  // 좋아요 버튼 클릭 핸들러 (낙관적 업데이트)
  const handleLikeClick = async () => {
    if (!post) return;
    const originalPostState = { ...post };
    setPost({
      ...post,
      isLikedByCurrentUser: !post.isLikedByCurrentUser,
      likeCount: post.isLikedByCurrentUser ? post.likeCount - 1 : post.likeCount + 1,
    });
    try {
      await toggleLikeApi(post.id);
    } catch (error) {
      alert("좋아요 처리에 실패했습니다.");
      setPost(originalPostState);
    }
  };

  // 댓글 작성 제출 핸들러
  const handleCommentSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !postId) return;
    setIsSubmitting(true);
    try {
      const newCommentData = await createCommentApi(postId, { content: newComment });
      setComments(prevComments => [...prevComments, newCommentData]);
      setNewComment('');
    } catch (error) {
      alert("댓글 작성에 실패했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // 모달 닫기 핸들러 (상태 초기화)
  const handleClose = () => {
    setPost(null);
    setComments([]);
    setNewComment('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <dialog open onCancel={handleClose} className="p-0 rounded-lg shadow-xl backdrop:bg-black backdrop:opacity-50 fixed inset-0 m-auto z-50">
      <div className="w-[90vw] max-w-2xl bg-white">
        {isLoading ? (
          <div className="p-10 text-center">로딩 중...</div>
        ) : post && (
          <>
            <header className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-bold">{post.title}</h2>
              <button onClick={handleClose} className="text-2xl font-light leading-none hover:text-red-500">&times;</button>
            </header>
            <main className="p-6 max-h-[70vh] overflow-y-auto">
              <div className="mb-6 pb-6 border-b">
                <p className="text-sm text-gray-500 mb-2">작성자: {post.authorName}</p>
                <p className="text-gray-800 whitespace-pre-wrap">{post.content}</p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <button onClick={handleLikeClick} className="p-2 rounded-full transform transition-transform hover:scale-110">
                    <span className={`text-2xl ${post.isLikedByCurrentUser ? 'text-red-500' : 'text-gray-300'}`}>❤️</span>
                  </button>
                  <span className="font-semibold text-lg">{post.likeCount}</span>
                </div>
                <div className="space-y-4 mb-6">
                  <h3 className="font-semibold text-lg border-b pb-2">댓글 {comments.length}</h3>
                  {comments.length > 0 ? comments.map(comment => (
                    <div key={comment.id} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-gray-200 rounded-full"></div>
                      <div className="flex-grow">
                        <p className="font-semibold text-sm">{comment.authorName}</p>
                        <p className="text-gray-700">{comment.content}</p>
                        <p className="text-xs text-gray-400 mt-1">{new Date(comment.createdAt).toLocaleString()}</p>
                      </div>
                    </div>
                  )) : (
                    <p className="text-sm text-gray-500">아직 댓글이 없습니다.</p>
                  )}
                </div>
                <form onSubmit={handleCommentSubmit} className="flex items-start space-x-3">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="댓글을 입력하세요..."
                    className="w-full p-2 border border-gray-300 rounded-md resize-none focus:ring-blue-500 focus:border-blue-500"
                    rows={2}
                    disabled={isSubmitting}
                  />
                  <button type="submit" disabled={isSubmitting} className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-black disabled:bg-gray-400 whitespace-nowrap">
                    {isSubmitting ? "등록 중" : "댓글 등록"}
                  </button>
                </form>
              </div>
            </main>
          </>
        )}
      </div>
    </dialog>
  );
};

export default DetailModal;