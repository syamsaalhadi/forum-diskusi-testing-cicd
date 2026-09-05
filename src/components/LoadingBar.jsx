import { useSelector } from 'react-redux';

function LoadingBar() {
  const isLoading = useSelector((state) => state.loadingBar > 0);

  if (!isLoading) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 overflow-hidden bg-brand-100">
      <div className="h-full w-1/3 animate-[loadingbar_1s_ease-in-out_infinite] bg-brand-500" />
      <style>
        {`
          @keyframes loadingbar {
            0% { transform: translateX(-100%); }
            50% { transform: translateX(150%); }
            100% { transform: translateX(300%); }
          }
        `}
      </style>
    </div>
  );
}

export default LoadingBar;
