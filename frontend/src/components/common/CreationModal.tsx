// src/components/common/CreationModal.tsx

import React, { useState, FormEvent, useEffect } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { title: string; content: string }) => Promise<void>;
  title: string; // "공지사항 작성" 또는 "게시글 작성"
}

const CreationModal: React.FC<Props> = ({ isOpen, onClose, onSubmit, title }) => {
  const [postTitle, setPostTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 모달이 닫힐 때 입력 필드를 초기화합니다.
  useEffect(() => {
    if (!isOpen) {
      setPostTitle('');
      setContent('');
      setIsSubmitting(false);
    }
  }, [isOpen]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!postTitle.trim() || !content.trim()) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }
    setIsSubmitting(true);
    try {
      await onSubmit({ title: postTitle, content });
      // 성공적인 제출 후에는 부모 컴포넌트에서 모달을 닫아줍니다.
      // 여기서 직접 onClose()를 호출해도 됩니다.
      onClose();
    } catch (error) {
      alert(error instanceof Error ? error.message : "작성에 실패했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl animate-fade-in-up">
        <header className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">{title}</h2>
          <button onClick={onClose} disabled={isSubmitting} className="text-2xl font-light leading-none hover:text-red-500 disabled:opacity-50">&times;</button>
        </header>
        <form onSubmit={handleSubmit}>
          <main className="p-6 space-y-4">
            <div>
              <label htmlFor="modal-title" className="block text-sm font-medium text-gray-700 mb-1">제목</label>
              <input
                id="modal-title"
                type="text"
                placeholder="제목을 입력하세요"
                value={postTitle}
                onChange={(e) => setPostTitle(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="modal-content" className="block text-sm font-medium text-gray-700 mb-1">내용</label>
              <textarea
                id="modal-content"
                placeholder="내용을 입력하세요"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md h-48 resize-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </main>
          <footer className="p-4 bg-gray-50 rounded-b-lg flex justify-end">
            <button type="submit" disabled={isSubmitting} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors">
              {isSubmitting ? '등록 중...' : '등록'}
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
};

export default CreationModal;