// import { useUsersData } from "./hooks";
import { getUsersData } from "../../core/services/userService";
import { DataTable } from "../../shared";
import Loading from "../../shared/loading/Loading";


const UserList = () => {
  const { data: users, isLoading, isError } = getUsersData();

  if (isLoading) return <Loading />;
  if (isError) return <div>Error loading data</div>;

  return <DataTable users={users || []} />;
};

export default UserList;
