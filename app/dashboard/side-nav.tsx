"use client";

import { cn } from "@/lib/utils";
import { ClipboardPen, Cog, FilesIcon, Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SideNav() {
  const pathname = usePathname();

  return (
    <nav>
      <ul className="space-y-6">
        <li>
          <Link
            className={cn(
              "font-light flex gap-2 items-center text-xl hover:text-cyan-400 dark:hover:text-cyan-100",
              {
                "text-cyan-300": pathname.endsWith("/search"),
              }
            )}
            href="/dashboard/search"
          >
            <Search />
            Search
          </Link>
        </li>
        <li>
          <Link
            className={cn(
              "font-light flex gap-2 items-center text-xl hover:text-cyan-400 dark:hover:text-cyan-100",
              {
                "text-cyan-300": pathname.endsWith("/documents"),
              }
            )}
            href="/dashboard/documents"
          >
            <FilesIcon />
            Documents
          </Link>
        </li>
        <li>
          <Link
            className={cn(
              "font-light flex gap-2 items-center text-xl hover:text-cyan-400 dark:hover:text-cyan-100",
              {
                "text-cyan-300": pathname.endsWith("/notes"),
              }
            )}
            href="/dashboard/notes"
          >
            <ClipboardPen />
            Notes
          </Link>
        </li>
      </ul>
    </nav>
  );
}
