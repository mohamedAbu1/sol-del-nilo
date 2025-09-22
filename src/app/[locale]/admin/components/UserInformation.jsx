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
} from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { DOMAIN } from "@/lib/constants/FixedTexts";
import DeleteIcon from '@mui/icons-material/Delete';
const UserInformation = () => {
  const [userData, setUsersData] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${DOMAIN}/api/users`);
        setUsersData(response.data.users);
      } catch (error) {
        return null;
      }
    };
    fetchUser();
  }, []);
  console.log(userData);

  // بيانات وهمية كمثال
  // const users = [
  //   {
  //     email: "user1@example.com",
  //     name: "محمد علي",
  //     password: "********",
  //     isActive: true,
  //     role: "USER",
  //     delete: "DELETE",
  //   },
  //   {
  //     email: "admin@example.com",
  //     name: "سارة أحمد",
  //     password: "********",
  //     isActive: false,
  //     role: "ADMIN",
  //     delete: `DELETE`,
  //   },
  //   {
  //     email: "admin@example.com",
  //     name: "سارة أحمد",
  //     password: "********",
  //     isActive: false,
  //     role: "ADMIN",
  //     delete: "DELETE",
  //   },
  //   {
  //     email: "admin@example.com",
  //     name: "سارة أحمد",
  //     password: "********",
  //     isActive: false,
  //     role: "ADMIN",
  //     delete: "DELETE",
  //   },
  // ];
  const handleDelete = async (userId) => {
  try {
    const response = await axios.delete(`${DOMAIN}/api/users`, {
      data: {
        userId,
        currentUserRole: "ADMIN", // تأكد أنك ترسل الدور من الجلسة أو السياق
      },
    });

    if (response.status === 200) {
      // حذف المستخدم من القائمة بدون إعادة تحميل
      setUsersData((prev) => prev.filter((user) => user.id !== userId));
    } else {
      console.error("فشل في حذف المستخدم:", response.data);
    }
  } catch (error) {
    console.error("❌ خطأ أثناء حذف المستخدم:", error);
  }
};
  return (
    <div className="w-full" style={{backgroundColor:"#181a1b"}}>
      <TableContainer component={Paper} sx={{ mt: 4 ,backgroundColor:"#181a1b"}}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong className="text-gray-400" style={{ fontWeight: "700" }}>
                  Users Email
                </strong>
              </TableCell>
              <TableCell>
                <strong className="text-gray-400" style={{ fontWeight: "700" }}>
                  Users Name
                </strong>
              </TableCell>
              <TableCell>
                <strong className="text-gray-400" style={{ fontWeight: "700" }}>
                  Users Sign Up
                </strong>
              </TableCell>
              <TableCell>
                <strong className="text-gray-400" style={{ fontWeight: "700" }}>
                  isActivate
                </strong>
              </TableCell>
              <TableCell>
                <strong className="text-gray-400" style={{ fontWeight: "700" }}>
                  Role
                </strong>
              </TableCell>
              <TableCell>
                <strong className="text-gray-400" style={{ fontWeight: "700" }}>
                  Delete User
                </strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userData.map((user, index) => (
              <TableRow key={index}>
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
                  {user.createdAt}
                </TableCell>
                <TableCell >
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
                        <Button onClick={() => handleDelete(user.id)} variant="outlined" endIcon={<DeleteIcon />}>
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
      </TableContainer>
    </div>
  );
};

export default UserInformation;
