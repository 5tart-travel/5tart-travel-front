
const BouncingDotsLoader: React.FC = () => {
  return (
    <div className="flex justify-center items-center space-x-2">
      <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce"></div>
      <div className="w-3 h-3 bg-pink-600 rounded-full animate-bounce delay-200"></div>
      <div className="w-3 h-3 bg-lime-600 rounded-full animate-bounce delay-400"></div>
      <div className="w-3 h-3 bg-orange-600 rounded-full animate-bounce delay-700"></div>
      <div className="w-3 h-3 bg-yellow-600 rounded-full animate-bounce delay-700"></div>
      <div className="w-3 h-3 bg-purple-600 rounded-full animate-bounce delay-700"></div>
    </div>
  );
};

export default BouncingDotsLoader;
