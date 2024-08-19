import AddAPersonIcon from '../icons/add-a-person-svg-react';
import MenuNewSessionIcon from '../icons/menu-new-session.svg.react';

export default function ActionButton({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} className="relative flex h-40 w-40">
      <div className="absolute inset-0 flex items-center justify-center rounded-full">
        <AddAPersonIcon />
      </div>
      <div className="absolute right-0 top-3 flex h-16 w-16 items-center justify-center rounded-full p-5">
        <MenuNewSessionIcon />
      </div>
    </button>
  );
}
