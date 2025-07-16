import { useParams, Link } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import '../../index.css';
import blogImage1 from '../../img/image1.jpg';
import blogImage2 from '../../img/image2.jpg';
import blogImage3 from '../../img/image3.jpg';
import blogImage4 from '../../img/image4.jpg';
import blogImage5 from '../../img/image5.jpg';
import blogImage6 from '../../img/image6.jpg';
import { useEffect, useState } from 'react';
import AuthorProfile from './AuthorProfile';

type BlogPost = {
  id: string;
  title: string;
  image: string;
  content: string; // 상세 내용 필드를 추가합니다.
  alt: string;
};

const blogPosts = [
  { id: 1, title: '블로그 글 1', image: blogImage1, content: '이것은 블로그 글 1의 상세 내용입니다.' },
  { id: 2, title: '블로그 글 2', image: blogImage2, content: '이것은 블로그 글 2의 상세 내용입니다.' },
  { id: 3, title: '블로그 글 3', image: blogImage3, content: '이것은 블로그 글 3의 상세 내용입니다.' },
  { id: 4, title: '블로그 글 4', image: blogImage4, content: '이것은 블로그 글 4의 상세 내용입니다.' },
  { id: 5, title: '블로그 글 5', image: blogImage5, content: '이것은 블로그 글 5의 상세 내용입니다.' },
  { id: 6, title: '블로그 글 6', image: blogImage6, content: '이것은 블로그 글 6의 상세 내용입니다.' },
];

function slowTagAnalysis(tags: string[]) {
  const uniqueTags = Array.from(new Set(tags));
  let mostFrequent = '';
  let maxCount = 0;

  uniqueTags.forEach((tag) => {
    const count = tags.filter((t) => t === tag).length;

    const _ = tag.split('').reverse().join('').toUpperCase();
    console.log(_);

    if (count > maxCount) {
      maxCount = count;
      mostFrequent = tag;
    }
  });

  const sorted = [...uniqueTags].sort((a, b) => a.localeCompare(b));
  console.log(sorted);

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
      const tags: string[] = [];
      for (let i = 0; i < count; i++) {
        tags.push(sampleTags[Math.floor(Math.random() * sampleTags.length)]);
      }
      return tags;
    };

    const tags = generateTagData(5000000);

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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl">해당 글을 찾을 수 없습니다.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-grow container mx-auto px-4 py-8">
        <Link to="/blog" className="text-blue-500 hover:underline mb-4 inline-block">
          ← 목록으로 돌아가기
        </Link>

        <div className="shadow-lg rounded-lg overflow-hidden mb-6">
          <img src={post.image} alt={post.alt} className="w-full h-auto max-h-[500px] object-cover" />
        </div>

        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <p className="text-lg leading-relaxed">{post.content}</p>
        <div className="bg-gray-100 p-4 rounded-lg text-sm mb-10">
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
