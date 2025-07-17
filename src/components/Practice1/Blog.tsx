import '../../index.css';
import { Link } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import { useEffect, useState } from 'react';
import { getImageParameters } from './api';

type UnsplashPhoto = {
  id: string;
  urls: {
    raw: string;
  };
  alt_description: string;
};

type BlogPost = {
  id: string;
  title: string;
  image: string;
  alt: string;
};

//const prefetchBlogDetail = () => import('../../components/Practice1/BlogDetail');

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  useEffect(() => {
    const fetchUnsplashImages = async () => {
      const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
      const collectionId = '1580860';
      const url = `https://api.unsplash.com/collections/${collectionId}/photos?client_id=${accessKey}&per_page=6`;

      try {
        const response = await fetch(url);
        const data = (await response.json()) as UnsplashPhoto[];

        const formattedPosts: BlogPost[] = data.map((photo, index) => {
          const imageUrl =
            photo.urls.raw +
            getImageParameters({
              w: 3200,
              h: 2880,
              q: 100,
              /*w: 800,
              h: 600,
              q: 80,
              auto: 'format',*/
            });

          return {
            id: photo.id,
            title: `블로그 글 ${index + 1}`,
            image: imageUrl,
            alt: photo.alt_description,
          };
        });

        setPosts(formattedPosts);
        //prefetchBlogDetail();
      } catch (error) {
        console.error('Unsplash API에서 이미지를 가져오는 데 실패했습니다.', error);
      }
    };

    fetchUnsplashImages();
  }, []);
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="container flex-grow px-4 py-8 mx-auto">
        <h1 className="mb-4 text-3xl font-bold">최신 블로그 글</h1>
        {posts.length === 0 ? (
          <p>이미지를 불러오는 중입니다...</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 mb-8 sm:grid-cols-2">
            {posts.map((post) => (
              <Link to={`/blog/${post.id}`} key={post.id} className="block group">
                <div className="overflow-hidden transition rounded-lg shadow-lg hover:shadow-2xl">
                  <img
                    src={post.image}
                    alt={post.alt}
                    className="w-full h-[400px] object-cover group-hover:opacity-80 transition"
                  />
                  <div className="p-4">
                    <div className="text-xl font-semibold">{post.title}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
