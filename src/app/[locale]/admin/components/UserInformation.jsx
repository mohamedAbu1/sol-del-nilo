"use client";
import React, { useEffect } from "react";
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
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppContext } from "@/context/AppContext";
import { useTheme } from "@mui/material/styles"; // ✅ استدعاء الثيم

const UserInformation = () => {
  const { users, loading, handleDelete, fetchUserActivities } = useAppContext();
  const muiTheme = useTheme(); // ✅ يجيب الثيم الحالي

  useEffect(() => {
    if (users?.id) fetchUserActivities(users.id);
  }, [users]);

  return (
    <div
      className="w-full"
      style={{ backgroundColor: muiTheme.palette.background.default }}
    >
      <TableContainer
        component={Paper}
        sx={{
          mt: 4,
          backgroundColor: muiTheme.palette.background.paper,
          boxShadow: muiTheme.shadows[3],
          borderRadius: 2,
        }}
      >
        {loading ? (
          <CircularProgress color="secondary" />
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                {[
                  "Users Email",
                  "Users Name",
                  "Users Sign Up",
                  "isActivate",
                  "Role",
                  "Delete User",
                ].map((header, idx) => (
                  <TableCell key={idx}>
                    <strong
                      style={{
                        fontWeight: "700",
                        color: muiTheme.palette.text.secondary,
                      }}
                    >
                      {header}
                    </strong>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow
                  key={user.id}
                  sx={{
                    "&:hover": {
                      backgroundColor: muiTheme.palette.action.hover,
                    },
                  }}
                >
                  <TableCell
                    sx={{ color: muiTheme.palette.text.primary, fontWeight: "700" }}
                  >
                    {user.email}
                  </TableCell>
                  <TableCell
                    className="capitalize"
                    sx={{ color: muiTheme.palette.text.primary, fontWeight: "700" }}
                  >
                    {user.name}
                  </TableCell>
                  <TableCell
                    sx={{ color: muiTheme.palette.text.primary, fontWeight: "700" }}
                  >
                    {user.created_at}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={user.isActive ? "Active" : "Not Active"}
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
                  <TableCell>
                    <Button
                      onClick={() => handleDelete(user.id)}
                      variant="outlined"
                      endIcon={<DeleteIcon />}
                      sx={{
                        color: muiTheme.palette.error.main,
                        borderColor: muiTheme.palette.error.main,
                        "&:hover": {
                          backgroundColor: muiTheme.palette.error.light,
                          color: muiTheme.palette.getContrastText(
                            muiTheme.palette.error.light
                          ),
                        },
                      }}
                    >
                      Delete
                    </Button>
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
