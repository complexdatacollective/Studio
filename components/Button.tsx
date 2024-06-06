type ButtonProps = {
  children: React.ReactNode;
};

export default function Button({ children }: ButtonProps) {
  return (
    <button className="mb-2 me-2 w-36 rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white">
      {children}
    </button>
  );
}
