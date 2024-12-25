import DonutLoader from "./DonutLoader";

const LoadingScreen = ({ message, fullScreen = true }) => {
  const containerClasses = fullScreen
    ? "min-h-screen bg-gray-50 pt-16"
    : "h-full w-full py-12";

  return (
    <div className={`flex items-center justify-center ${containerClasses}`}>
      <DonutLoader message={message} size="lg" />
    </div>
  );
};

export default LoadingScreen;
