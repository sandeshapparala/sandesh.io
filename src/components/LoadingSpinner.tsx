const LoadingSpinner = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-black py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            My Projects
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Loading amazing projects...
          </p>
        </div>
        
        <div className="space-y-12">
          {/* Loading skeleton cards */}
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-full max-w-6xl mx-auto h-[60vh] border-2 border-dotted border-gray-300 dark:border-gray-500 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-black rounded-lg shadow-lg animate-pulse"
            >
              <div className="flex h-full">
                <div className="w-1/2 bg-gray-200 dark:bg-gray-700 rounded-l-lg"></div>
                <div className="w-1/2 p-8 space-y-4">
                  <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                  <div className="space-y-2 mt-8">
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;