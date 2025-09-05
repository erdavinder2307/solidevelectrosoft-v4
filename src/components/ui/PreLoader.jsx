import { useState, useEffect } from 'react';

const PreLoader = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Hide preloader after page load
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div id="loading">
      <div id="loading-center">
        <div id="loading-center-absolute">
          {/* Loading content here */}
        </div>
      </div>
    </div>
  );
};

export default PreLoader;
