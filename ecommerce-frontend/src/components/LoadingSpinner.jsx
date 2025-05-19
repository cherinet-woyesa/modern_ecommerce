import { FiLoader } from 'react-icons/fi';

const LoadingSpinner = ({ size = 'md', className = '', ...props }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  };

  return (
    <div className={`flex items-center justify-center ${className}`} {...props}>
      <FiLoader className={`animate-spin ${sizeClasses[size]}`} />
    </div>
  );
};

export default LoadingSpinner;
