"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Button,
  CircularProgress,
} from "@mui/material";
import { useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppContext } from "@/context/AppContext";
  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

const UserInformation = () => {
  const { users, loading, handleDelete, fetchUserActivities } = useAppContext();
    // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

  useEffect(() => {
    if (users?.id) fetchUserActivities(users.id);
  }, [users]);
  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

  return (
    <div className="w-full" style={{ backgroundColor: "#181a1b" }}>
      <TableContainer
        component={Paper}
        sx={{ mt: 4, backgroundColor: "#181a1b" }}
      >
        {loading ? (
          <CircularProgress />
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong
                    className="text-gray-400"
                    style={{ fontWeight: "700" }}
                  >
                    Users Email
                  </strong>
                </TableCell>
                <TableCell>
                  <strong
                    className="text-gray-400"
                    style={{ fontWeight: "700" }}
                  >
                    Users Name
                  </strong>
                </TableCell>
                <TableCell>
                  <strong
                    className="text-gray-400"
                    style={{ fontWeight: "700" }}
                  >
                    Users Sign Up
                  </strong>
                </TableCell>
                <TableCell>
                  <strong
                    className="text-gray-400"
                    style={{ fontWeight: "700" }}
                  >
                    isActivate
                  </strong>
                </TableCell>
                <TableCell>
                  <strong
                    className="text-gray-400"
                    style={{ fontWeight: "700" }}
                  >
                    Role
                  </strong>
                </TableCell>
                <TableCell>
                  <strong
                    className="text-gray-400"
                    style={{ fontWeight: "700" }}
                  >
                    Delete User
                  </strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell sx={{ color: "grey", fontWeight: "700" }}>
                    {user.email}
                  </TableCell>
                  <TableCell
                    className="capitalize"
                    sx={{ color: "grey", fontWeight: "700" }}
                  >
                    {user.name}
                  </TableCell>
                  <TableCell sx={{ color: "grey", fontWeight: "700" }}>
                    {user.created_at}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={user.isActive ? "active" : "Not active"}
                      color={user.isActive ? "success" : "error"}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={user.role}
                      color={user.role === "ADMIN" ? "primary" : "info"}
                      size="small"
                    />
                  </TableCell>
                  <TableCell style={{}}>
                    <Chip
                      sx={{}}
                      label={
                        <>
                          <Button
                            onClick={() => handleDelete(user.id)}
                            variant="outlined"
                            endIcon={<DeleteIcon />}
                          >
                            Delete
                          </Button>
                        </>
                      }
                      size="small"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>
    </div>
  );
};

export default UserInformation;
