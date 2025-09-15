interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  color?: 'primary' | 'accent' | 'danger';
}

export default function Button({ children, onClick, color='primary' }: ButtonProps) {
  const colors = {
    primary: 'bg-[var(--primary)] hover:bg-indigo-600 text-white',
    accent: 'bg-[var(--accent)] hover:bg-pink-600 text-white',
    danger: 'bg-red-500 hover:bg-red-600 text-white'
  };

  return (
    <button 
      onClick={onClick} 
      className={`px-4 py-2 rounded-lg shadow transition transform duration-200 hover:scale-105 ${colors[color]}`}
    >
      {children}
    </button>
  );
}
