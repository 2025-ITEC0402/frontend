import * as React from "react"

import { ScrollArea } from "@/src/shared/ui/scroll-area"
import { Separator } from "@/src/shared/ui/separator"

const tags = Array.from({ length: 25 }).map(
  (_, i, a) => `Chapter ${i+1}`
)

export function ChapterSidebar() {
  return (
    <ScrollArea className="h-180 w-40 rounded-md border">
      <div className="p-4 text-center">
        <h4 className="mb-6 text-sm font-medium leading-none">
          목차
        </h4>
        {tags.map((tag) => (
          <React.Fragment key={tag}>
            <div className="text-sm">
              {tag}
            </div>
            <Separator className="my-2" />
          </React.Fragment>
        ))}
      </div>
    </ScrollArea>
  )
}
