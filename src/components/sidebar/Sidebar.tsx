import { links } from "@/lib/header-links";
import Link from "next/link";
import React from "react";

const Sidebar: React.FC = () => {
  return (
    <div className="min-w-[250px] py-4 pl-4 pr-2 flex flex-col items-center flex-grow-0">
      <div className="h-[100px] flex items-center">
        <Link
          className="text-2xl font-bold leading-none"
          href="/"
        >
          Pradascus
        </Link>
      </div>
      <div className="flex flex-col w-full text-sm">
        {links.map((link) => (
          <Link
            key={link.id}
            href={link.href}
            className="p-2 rounded-sm hover:bg-accent"
          >
            {link.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
