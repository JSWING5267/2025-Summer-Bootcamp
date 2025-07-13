export default function Header() {
  return (
    <header className="w-full bg-gray-800 text-white py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">실습1</h1>
        <nav className="space-x-4">
          <a href="/" className="hover:underline">
            홈
          </a>
          <a href="/" className="hover:underline">
            소개
          </a>
          <a href="/" className="hover:underline">
            문의
          </a>
        </nav>
      </div>
    </header>
  );
}
