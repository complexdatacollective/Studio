type ButtonProps = {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
};

export default function Button({ children, type = 'button' }: ButtonProps) {
  return (
    <button
      type={type}
      className="mb-2 me-2 w-36 rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white"
    >
      {children}
    </button>
  );
}
