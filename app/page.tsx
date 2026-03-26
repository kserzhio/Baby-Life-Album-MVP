import { redirect } from "next/navigation";

import { getCurrentUser } from "@/features/auth/data/auth.repository";
import { countBabiesByUser } from "@/features/babies/data/babies.repository";

type HomePageProps = {
  searchParams: Promise<{
    code?: string;
    next?: string;
  }>;
};

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = await searchParams;

  if (params.code) {
    const callbackUrl = new URL("/auth/callback", process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000");
    callbackUrl.searchParams.set("code", params.code);
    callbackUrl.searchParams.set("next", params.next ?? "/dashboard");
    redirect(callbackUrl.toString());
  }

  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth/sign-in");
  }

  const babiesCount = await countBabiesByUser(user.id);

  redirect(babiesCount === 0 ? "/babies" : "/dashboard");
}
