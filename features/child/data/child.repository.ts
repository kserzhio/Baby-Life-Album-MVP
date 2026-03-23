import { cache } from "react";

import { db } from "@/lib/db";

export const getChildProfile = cache(async () => {
  return db.child.findFirst({
    include: {
      memories: {
        orderBy: {
          eventDate: "desc"
        }
      },
      growthLogs: {
        orderBy: {
          recordedAt: "desc"
        }
      }
    }
  });
});
