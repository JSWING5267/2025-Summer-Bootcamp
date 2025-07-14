import '../../index.css';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
//import AuthorProfile from './AuthorProfile';
import blogImage1 from '../../img/image1.jpg';
import blogImage2 from '../../img/image2.jpg';
import blogImage3 from '../../img/image3.jpg';
import blogImage4 from '../../img/image4.jpg';
import blogImage5 from '../../img/image5.jpg';
import blogImage6 from '../../img/image6.jpg';

const blogPosts = [
  { id: 1, title: '블로그 글 1', image: blogImage1 },
  { id: 2, title: '블로그 글 2', image: blogImage2 },
  { id: 3, title: '블로그 글 3', image: blogImage3 },
  { id: 4, title: '블로그 글 4', image: blogImage4 },
  { id: 5, title: '블로그 글 5', image: blogImage5 },
  { id: 6, title: '블로그 글 6', image: blogImage6 },
];

export default function Blog() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="text-3xl font-bold mb-4">최신 블로그 글</div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {blogPosts.map((post) => (
            <Link to={`/blog/${post.id}`} key={post.id} className="block group">
              <div className="shadow-lg hover:shadow-2xl transition rounded-lg overflow-hidden">
                <div className="text-xl font-semibold">{post.title}</div>
                <img
                  src={post.image}
                  alt={`${post.title} 대표 이미지`}
                  className="w-full h-[400px] object-cover mb-2 group-hover:opacity-80 transition"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
