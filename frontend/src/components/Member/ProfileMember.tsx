import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import FormLabel from "@mui/material/FormLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Button from "@mui/material/Button";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import HouseIcon from "@mui/icons-material/House";
import EditIcon from "@mui/icons-material/Edit";
import { MemberInterface } from "../../models/modelMember/IMember";
import { PrefixInterface } from "../../models/modelMember/IPrefix";
import { DeleteMember, GetPrefixByUID } from "./service/servicecus";
import {
  Box,
  FormControl,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { GenderInterface } from "../../models/modelMember/IGender";

function ProfileMember() {
  const [member, setMember] = useState<MemberInterface>({});
  const [prefix, setPrefix] = useState<PrefixInterface[]>([]);
  const [gender, setGender] = useState<GenderInterface[]>([]);

  let navigate = useNavigate();

  const handleChange = (event: SelectChangeEvent) => {
    const name = event.target.name as keyof typeof member;
    console.log(event.target.name);
    console.log(event.target.value);

    setMember({
      ...member,
      [name]: event.target.value,
    });
    console.log(member);
  };

  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof member;

    const { value } = event.target;

    setMember({ ...member, [id]: value });
  };

  const Onclick = async (id: number) => {
    let res = await DeleteMember(id);
    if (res) {
      window.location.reload();
      localStorage.clear();
      window.location.href = "/";
    }
  };

  //-----------เริ่มดึงข้อมูล-----------//
  //---------------------Department-------------------------------------
  const getPrefix = async () => {
    const apiUrl = `http://localhost:8080/prefixes`;

    const requestOptions = {
      method: "GET",

      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    //การกระทำ //json
    fetch(apiUrl, requestOptions)
      .then((response) => response.json()) //เรียกได้จะให้แสดงเป็น json ซึ่ง json คือ API

      .then((res) => {
        //   console.log(res.data); //show ข้อมูล

        if (res.data) {
          setPrefix(res.data);
        } else {
          // console.log("else");
        }
      });
  };
  //---------------------Position-------------------------------------
  const getGender = async () => {
    const apiUrl = `http://localhost:8080/members/genders`;

    const requestOptions = {
      method: "GET",

      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    //การกระทำ //json
    fetch(apiUrl, requestOptions)
      .then((response) => response.json()) //เรียกได้จะให้แสดงเป็น json ซึ่ง json คือ API

      .then((res) => {
        //   console.log(res.data); //show ข้อมูล

        if (res.data) {
          setGender(res.data);
        } else {
          // console.log("else");
        }
      });
  };

  const apiUrl = "http://localhost:8080";

  async function GetMember() {
    let uid = localStorage.getItem("id");
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    fetch(`${apiUrl}/member/${uid}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setMember(res.data);
          console.log(res.data);
        } else {
          return false;
        }
      });
  }

  useEffect(() => {
    GetMember();
    getGender();
    getPrefix();
    // getNametitleByUID();
  }, []);

  console.log(member);

  return (
    <div>
      <Container
        maxWidth="xl"
        sx={{
          height: "91.35vh",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundImage:
            "url(https://th-test-11.slatic.net/p/77b74100b4ce7a4a90041dea0a602396.jpg)",
        }}
      >
        <Container maxWidth="md" sx={{ marginBottom: 5 }}>
          <Box flexGrow={1} sx={{ marginTop: 3 }} textAlign={"center"}>
            <Typography
              component="h2"
              variant="h6"
              gutterBottom
              sx={{ fontSize: "2rem", fontWeight: "bold" }}
            >
              ข้อมูลส่วนตัวของคุณ {member.FirstName}
            </Typography>
          </Box>

          <form>
            <Paper
              variant="outlined"
              sx={{ padding: 2, paddingTop: 1, marginBottom: 2 }}
            >
              {/*=======================================(Title)===========================================================*/}
              <Grid container spacing={2} sx={{ marginBottom: 1.5 , marginTop:2}}>
                <Grid xs={6}>
                  <FormControl fullWidth variant="outlined">
                    <p>คำนำหน้า</p>
                    <Select
                      disabled
                      id="PrefixID"
                      native
                      value={member.PrefixID + ""}
                      onChange={handleChange}
                      inputProps={{
                        name: "ServiceTypeID",
                      }}
                      // sx={{ height: "40px" }}
                    >
                      {prefix.map((item: PrefixInterface) => (
                        <option value={item.ID}>{item.Prefix_Name}</option>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                {/*============================================(First name)======================================================*/}
                <Grid xs={6} md={6}>
                  <p>ชื่อ</p>
                  <TextField
                    id="Fristname"
                    disabled
                    fullWidth
                    required
                    value={member.FirstName}
                  />
                </Grid>
                {/*=============================================(Last name)=====================================================*/}
                <Grid xs={6} md={6}>
                  <p>นามสกุล</p>
                  <TextField
                    id="lastname"
                    disabled
                    fullWidth
                    required
                    value={member.LastName}
                  />
                </Grid>
                {/*=============================================(Nickname)=====================================================*/}
                <Grid xs={6} md={6}>
                  <p style={{ color: "grey", fontSize: 17 }}>ชื่อเล่น</p>
                  <TextField
                    id="nickname"
                    disabled
                    fullWidth
                    required
                    value={member.Nickname}
                  />
                </Grid>
              </Grid>

              <Grid container spacing={2} sx={{ marginBottom: 1.5 }}>
                {/*============================================(Age)======================================================*/}
                <Grid xs={6} md={6}>
                  <p>อายุ</p>
                  <TextField
                    id="Age"
                    disabled
                    fullWidth
                    required
                    value={member.Age}
                  />
                </Grid>
                {/*=============================================(Phone)=====================================================*/}
                <Grid xs={6} md={6}>
                  <p>เบอร์มือถือ</p>
                  <TextField
                    id="Phone"
                    disabled
                    fullWidth
                    required
                    value={member.Phone}
                  />
                </Grid>
              </Grid>

              {/*===========================================(email)=======================================================*/}
              <Grid container spacing={1}>
                <Grid xs={6} md={6}>
                  <p>ไอดีไลน์</p>
                  <TextField
                    type="line"
                    id="outlined-basic"
                    disabled
                    required
                    fullWidth
                    value={member.Line}
                  />
                </Grid>

                {/*=======================================(select Gender)===========================================================*/}
                <Grid xs={6} md={6}>
                  <p>เพศ</p>
                  <Select
                    native
                    disabled
                    fullWidth
                    value={member.GenderID + ""}
                    onChange={handleChange}
                    inputProps={{
                      name: "Nametitle_ID",
                    }}
                  >
                    {gender.map((item: GenderInterface) => (
                      <option value={item.ID}>{item.G_Name}</option>
                    ))}
                  </Select>
                </Grid>

                <Stack direction="row" spacing={80} sx={{marginTop:2 }}>
                  <Button
                    variant="contained"
                    color="success"
                    startIcon={<HouseIcon />}
                    component={RouterLink}
                    to="/home"
                  >
                    กลับ
                  </Button>

                  <Button
                    variant="contained"
                    startIcon={<EditIcon />}
                    onClick={() => navigate(`/member/edit`)}
                  >
                    แก้ไข
                  </Button>
                </Stack>
              </Grid>
            </Paper>
          </form>
        </Container>
      </Container>
    </div>
  );
}

export default ProfileMember;
