import React, { useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Avatar,
  TextField,
  Box,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { defaultImageUrl } from "../../core/const/default-links";
import { User } from "../../core/models/user";
import { useDeleteUser } from "../../core/services/userService";
import { useNavigate } from "react-router-dom";

interface DataTableProps {
  users: User[];
}

const DataTable = ({ users }: DataTableProps) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(2);
  const [searchText, setSearchText] = useState("");

  const { mutate: userRemove } = useDeleteUser();
  const navigate = useNavigate();



  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
    setPage(0);
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>, userId: number) => {
    e.stopPropagation();
    userRemove(userId)
  }

  const openUser = (userId: number) => {
    navigate(`/user/${userId}`); // გადასვლა როუტზე /users/:userId
  }


  const filteredData = useMemo(() => {
    console.log(users);
    
    if(users.length > 0) {
      return users.filter(
        (el) =>
          el.firstName.toLowerCase().startsWith(searchText.toLowerCase()) ||
          el.lastName.toLowerCase().startsWith(searchText.toLowerCase()) ||
          el.phone.toLowerCase().startsWith(searchText.toLowerCase()) ||
          el.privateNumber.toLowerCase().startsWith(searchText.toLowerCase()) ||
          el.address.toLowerCase().startsWith(searchText.toLowerCase())
      );
    }

  }, [searchText, users]);



  return (
    <Box>
      <TextField
        label="Search"
        variant="filled"
        fullWidth
        value={searchText}
        onChange={handleSearchChange}
        className="!mb-8"
      />
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className="!text-[#04a2e1] !text-[16px] !font-kanit !font-bold">
                  Image
                </TableCell>
                <TableCell className="!text-[#04a2e1] !text-[16px] !font-kanit !font-bold">
                  First name
                </TableCell>
                <TableCell className="!text-[#04a2e1] !text-[16px] !font-kanit !font-bold">
                  Last Name
                </TableCell>
                <TableCell className="!text-[#04a2e1] !text-[16px] !font-kanit !font-bold">
                  Gender
                </TableCell>
                <TableCell className="!text-[#04a2e1] !text-[16px] !font-kanit !font-bold">
                  Identification
                </TableCell>
                <TableCell className="!text-[#04a2e1] !text-[16px] !font-kanit !font-bold">
                  Phone
                </TableCell>
                <TableCell className="!text-[#04a2e1] !text-[16px] !font-kanit !font-bold">
                  Address
                </TableCell>
                <TableCell className="!text-[#04a2e1] !text-[16px] !font-kanit !font-bold"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData && filteredData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user: User) => (
                  <TableRow key={user.id} onClick={() => openUser(user.id)} className="!relative !z-[1]">
                    <TableCell>
                      <Avatar
                        alt="avatar"
                        src={user.image || defaultImageUrl}
                        className="w-[40px] h-auto rounded-full object-cover"
                      />
                    </TableCell>
                    <TableCell className="!text-[#04a2e1] !font-kanit">
                      {user.firstName}
                    </TableCell>
                    <TableCell className="!text-[#04a2e1] !font-kanit">
                      {user.lastName}
                    </TableCell>
                    <TableCell className="!text-[#04a2e1] !font-kanit">
                      {user.gender}
                    </TableCell>
                    <TableCell className="!text-[#04a2e1] !font-kanit">
                      {user.privateNumber}
                    </TableCell>
                    <TableCell className="!text-[#04a2e1] !font-kanit">
                      {user.phone}
                    </TableCell>
                    <TableCell className="!text-[#04a2e1] !font-kanit">
                      {user.address}
                    </TableCell>
                    <TableCell className="!text-[#04a2e1] !font-kanit">
                      <Button onClick={(event) => handleDelete(event, user.id)} className="!relative !z-[99]">
                        <DeleteIcon className="cursor-pointer" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[2, 5, 10]}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default DataTable;
