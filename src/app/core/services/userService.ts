import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { User } from "../models/user";
import { BASE_URL } from "../const/default-links";
import { ApiUrlEnum } from "../const/api.enums";

export const getUsersData = () => {
  return useQuery<User[]>("users", async () => {
    const { data } = await axios.get(`${BASE_URL}/${ApiUrlEnum.USERS}`);
    return data;
  });
};



export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (userId: number) => {
      const { data } = await axios.delete(`${BASE_URL}/${ApiUrlEnum.USERS}/${userId}`, {
        data: { id: userId },
        headers: {
          "Content-Type": "application/json",
        },
      });
      return data;
    },
    {
      onSuccess: () => {
        // წაშლის შემდეგ ვაახლებ users query-ს
        queryClient.invalidateQueries('users');
      },
    }
  );
};

