import { Link } from "react-router-dom";
import { TreePine } from "lucide-react";

export const Header = ({ children }) => {
  return (
    <header className="border-b border-emerald-200 bg-white/90">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-8 py-4">
        <Link to="/" className="flex items-center gap-3">
          <TreePine className="h-9 w-9 text-green-600" />
          <h1 className="text-2xl font-semibold text-gray-900">
            GrowLog
          </h1>
        </Link>

        <div className="flex items-center gap-4">
          {children}
        </div>
      </div>
    </header>
  );
};
