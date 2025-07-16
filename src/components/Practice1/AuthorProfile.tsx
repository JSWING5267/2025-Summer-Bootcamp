import { useState, Suspense } from 'react';
import Modal from './BlogModal';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function AuthorProfile() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const markdownContent = `
## 작성자 정보
안녕하세요, **블로그 작성자**입니다. 좋은 하루 되세요!

\`\`\`js
function greet() {
  console.log("Hello, world!");
}
greet();
\`\`\`
  `;

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)} className="text-blue-500 hover:underline">
        작성자 프로필 보기
      </button>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ReactMarkdown
          components={{
            code({
              inline,
              className,
              children,
              ...props
            }: React.ComponentPropsWithoutRef<'code'> & { inline?: boolean }) {
              const match = /language-(\w+)/.exec(className || '');
              return !inline && match ? (
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                <SyntaxHighlighter style={oneDark as any} language={match[1]} PreTag="div" {...props}>
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
        >
          {markdownContent}
        </ReactMarkdown>
        <button
          onClick={() => setIsModalOpen(false)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4"
        >
          닫기
        </button>
      </Modal>
    </div>
  );
}
