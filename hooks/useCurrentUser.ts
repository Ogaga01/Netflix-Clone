import useSWR from "swr";
import fetcher from "@/lib/fetcher";
// SWR is a vercel developed package that is good at fetching data, similar to react query.
// Once we fetch /api/current, no matter where we use the useCurrentUser hook it is not going
// to fetch it again if the data already exists. Thus we don't need redux or any state management
// for fetching our user.
export const useCurrentUser = () => {
  const { data, error, isLoading, mutate } = useSWR("/api/current", fetcher);

  return { data, error, isLoading, mutate };
};
