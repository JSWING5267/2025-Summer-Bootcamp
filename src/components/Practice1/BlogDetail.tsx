import { useParams, Link } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import '../../index.css';
import { useEffect, useState } from 'react';
import AuthorProfile from './AuthorProfile';

type BlogPost = {
  id: string;
  title: string;
  image: string;
  content: string;
  alt: string;
};

function slowTagAnalysis(tags: string[]) {
  let mostFrequent = '';
  let maxCount = 0;

  for (let i = 0; i < tags.length; i++) {
    let count = 0;

    for (let j = 0; j < tags.length; j++) {
      if (tags[i] === tags[j]) {
        count++;
      }
    }

    if (count > maxCount) {
      maxCount = count;
      mostFrequent = tags[i];
    }
  }

  return { tag: mostFrequent, count: maxCount };
}

/* function optimizedTagAnalysis(tags: string[]) {
  const frequencyMap: Record<string, number> = {};
  let mostFrequent = '';
  let maxCount = 0;

  for (const tag of tags) {
    frequencyMap[tag] = (frequencyMap[tag] || 0) + 1;
    if (frequencyMap[tag] > maxCount) {
      maxCount = frequencyMap[tag];
      mostFrequent = tag;
    }
  }

  return { tag: mostFrequent, count: maxCount };
} */

export default function BlogDetail() {
  const { id } = useParams<{ id: string }>();

  const [post, setPost] = useState<BlogPost | null>(null);

  const [result, setResult] = useState<{ tag: string; count: number; time: number } | null>(null);

  useEffect(() => {
    if (!id) {
      return;
    }

    const fetchPostDetail = async () => {
      const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
      const url = `https://api.unsplash.com/photos/${id}?client_id=${accessKey}`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('포스트를 불러오는 데 실패했습니다.');
        }
        const data = await response.json();

        setPost({
          id: data.id,
          title: data.description || data.alt_description || '제목 없음',
          image: data.urls.regular,
          content: `이 이미지는 ${data.user.name}님이 촬영했으며, ${data.likes}개의 '좋아요'를 받았습니다. 이미지에 대한 설명은 "${data.alt_description}"입니다.`,
          alt: data.alt_description,
        });
      } catch (error) {
        console.error(error);
        setPost(null);
      }
    };

    fetchPostDetail();
  }, [id]);

  useEffect(() => {
    const generateTagData = (count: number): string[] => {
      const sampleTags = ['react', 'javascript', 'css', 'html', 'node', 'typescript'];
      const tags = new Array(count);
      const sampleLength = sampleTags.length;

      for (let i = 0; i < count; i++) {
        tags[i] = sampleTags[(Math.random() * sampleLength) | 0];
      }

      return tags;
    };

    const tags = generateTagData(50000);

    const t1 = performance.now();
    const analysisResult = slowTagAnalysis(tags);
    const t2 = performance.now();

    /* const t1 = performance.now();
    const analysisResult = optimizedTagAnalysis(tags);
    const t2 = performance.now(); */

    setResult({ ...analysisResult, time: t2 - t1 });
  }, []);

  if (!post) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-2xl">해당 글을 찾을 수 없습니다.</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="container flex-grow px-4 py-8 mx-auto">
        <Link to="/blog" className="inline-block mb-4 text-blue-500 hover:underline">
          ← 목록으로 돌아가기
        </Link>

        <div className="mb-6 overflow-hidden rounded-lg shadow-lg">
          <img src={post.image} alt={post.alt} className="w-full h-auto max-h-[500px] object-cover" />
        </div>

        <h1 className="mb-4 text-3xl font-bold">{post.title}</h1>
        <p className="mb-4 text-lg leading-relaxed">{post.content}</p>
        <div className="p-4 mb-10 text-sm bg-gray-100 rounded-lg">
          <div className="mb-2 font-semibold">분석 결과</div>
          <div>가장 많은 태그: {result?.tag}</div>
          <div>개수: {result?.count}</div>
          <div>소요 시간: {result?.time.toFixed(2)} ms</div>
        </div>
        <AuthorProfile />
      </div>

      <Footer />
    </div>
  );
}
