import { useMutation, useQuery } from "react-query";
import useAuth from "./useAuth";

export default function useColorSurvey(userId) {
  const { request } = useAuth();
  // submit survey
  const {
    mutateAsync: submitSurvey,
    isLoading,
    isError,
    isSuccess,
  } = useMutation(async ({ data, userId }) => {
    return (await request.post(`/user/${userId}/color-survey`, data)).data;
  });

  const {
    data: colorCombinations,
    isLoading: loadingColorCombination,
    isError: error,
  } = useQuery(`[/user/userId/color-survey]`, async () => {
    const response = await request.get(`/user/${userId}/color-survey`);
    return response.data;
  });

  return {
    submitSurvey,
    isLoading,
    isSuccess,
    isError,
    colorCombinations,
    loadingColorCombination,
    error,
  };
}
