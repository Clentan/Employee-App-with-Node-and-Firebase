import {Avatar} from "@nextui-org/react";
import {CameraIcon} from './CameraIcon';

export default function App() {
  return (
    <div className="flex gap-4 items-center">
      <Avatar showFallback src='https://images.unsplash.com/broken' fallback={
        <CameraIcon className="animate-pulse w-6 h-6 text-default-500" fill="currentColor" size={20} />
      } />
    </div>
  );
}