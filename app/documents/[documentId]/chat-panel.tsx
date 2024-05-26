"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { useQuery } from "convex/react";
import { QuestionForm } from "./question-form";

export default function ChatPanel({
  documentId,
}: {
  documentId: Id<"documents">;
}) {
  const chats = useQuery(api.chats.getChatsForDocument, { documentId });

  return (
    <div className="bg-gray-900 flex flex-col gap-2 p-6 rounded-xl">
      <div className="h-[350px] overflow-y-auto space-y-3">
        <div className="bg-slate-950 rounded p-3">
          AI: Ask any question using AI about this document below:
        </div>
        {chats?.map((chat) => (
          <div
            className={cn(
              {
                "bg-slate-800": chat.isHuman,
                "bg-slate-950": !chat.isHuman,
                "text-right": chat.isHuman,
              },
              "rounded p-4 whitespace-pre-line"
            )}
          >
            {chat.isHuman ? "YOU" : "AI"}: {chat.text}
          </div>
        ))}
      </div>

      <div className="flex gap-1">
        <QuestionForm documentId={documentId} />
      </div>
    </div>
  );
}
