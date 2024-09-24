import AddAPersonIcon from './icons/add-a-person-svg-react';
import MenuNewSessionIcon from './icons/menu-new-session.svg.react';
import AddNode from './icons/LucideAddNode';
import type { NodeIcon } from '~/schemas/protocol/codebook/entities';

const renderIcon = (icon: NodeIcon) => {
  switch (icon) {
    case 'add-a-person':
      return <AddAPersonIcon />;
    case 'add-a-place':
      return <div>Place</div>; // TODO: implement add-a-place icon
    default:
      return <AddNode iconName={icon} />;
  }
};

export default function ActionButton({
  onClick,
  icon,
}: {
  onClick: () => void;
  icon: NodeIcon;
}) {
  return (
    <button onClick={onClick} className="relative flex h-40 w-40">
      <div className="absolute inset-0 flex items-center justify-center rounded-full">
        {renderIcon(icon)}
      </div>
      <div className="absolute right-0 top-3 flex h-16 w-16 items-center justify-center rounded-full bg-muted p-5">
        <MenuNewSessionIcon />
      </div>
    </button>
  );
}
