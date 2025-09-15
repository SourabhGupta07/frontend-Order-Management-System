interface ToastProps {
  message: string;
  type: 'success' | 'error';
}

export default function Toast({ message, type }: ToastProps) {
  const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';
  return (
    <div className={`fixed bottom-4 right-4 p-4 ${bgColor} text-white rounded-lg shadow animate-slide-in`}>
      {message}
    </div>
  );
}
