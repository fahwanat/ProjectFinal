import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  IconButton,
  TextField,
  Drawer,
  Rating,
  Snackbar,
  Divider,
  FormControl,
  FormLabel,
  styled,
  Avatar,
  InputAdornment,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Moment from "moment";
import p1 from "../../Image/p1.jpg";
import { ReviewInterface } from "../../models/IReview";
import Review_Save from "./Review_Save";

const themeshow = createTheme({
  palette: {
    primary: {
      main: grey[800],
    },
    secondary: {
      main: "#e8f5e9",
    },
  },
});

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const FullScreenContainer = styled('div')({
  height: '80vw',
  width: '100vw',
  display: 'flex',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundImage: "url(https://th-test-11.slatic.net/p/77b74100b4ce7a4a90041dea0a602396.jpg)",
});

function Review_list() {
  const [imageString, setImageString] = useState<string | ArrayBuffer | null>(null);
  const [openForCreate, setOpenForCreate] = useState(false);
  const [openForEdit, setOpenForEdit] = useState(false);
  const [review, setReview] = useState<ReviewInterface[]>([]);
  const [review1, setReview1] = useState<Partial<ReviewInterface>>({});
  const [start, setStart] = useState<number | null>(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [openImage, setOpenImage] = useState(false);
  const [img, setimg] = useState({});
  const [message, setAlertMessage] = useState("");

  const UpdateReview = () => {
    let UpdateData = {
      ID: review1.ID,
      Comment: review1.Comment,
      Star: start,
      Reviewimage: imageString,
    };
    const apiUrl = "http://localhost:8080/Reviews";
    const requestOptions = {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(UpdateData),
    };

    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          window.location.reload();
          setSuccess(true);
        } else {
          setError(true);
          setAlertMessage(res.error);
        }
      });
  };

  const getReview = async () => {
    const apiUrl = `http://localhost:8080/Review/` + localStorage.getItem("id");

    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };

    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setReview(res.data);
        }
      });
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
    setError(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setReview1({ ...review1, [id]: value });
  };

  const closeImage = () => {
    setOpenImage(false);
  };

  const OpenImageonCilck = (item: ReviewInterface) => {
    setOpenImage(true);
    setimg(item.Reviewimage);
  };

  const CheckImage = (item: ReviewInterface) => {
    if (item.Reviewimage !== "") {
      return (
        <img
          src={`${item.Reviewimage}`}
          style={{ width: "200px", height: "200px" }}
          onDoubleClick={() => OpenImageonCilck(item)}
        />
      );
    }
  };

  const handleClickOpenForCreate = () => {
    setOpenForCreate(true);
  };

  const handleCloseForCreate = () => {
    setOpenForCreate(false);
  };

  const handleClickOpenForEdit = (item: ReviewInterface) => {
    setReview1(item);
    setStart(item.Star);
    setImageString(item.Reviewimage);
    setOpenForEdit(true);
  };

  const handleCloseForEdit = () => {
    setOpenForEdit(false);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const image = event.target.files![0];
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = () => {
      const base64Data = reader.result;
      setImageString(base64Data);
    };
  };

  const deleteReview = (id: number) => {
    const apiUrl = "http://localhost:8080/Reviews/" + id;
    const requestOptions = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };

    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then(async (res) => {
        if (res.data) {
          window.location.reload();
        }
      });
  };

  useEffect(() => {
    getReview();
  }, []);

  return (
    <FullScreenContainer>
        <Container maxWidth="xl">
          <Button
            color="primary"
            variant="contained"
            aria-label="add"
            sx={{ mt: 6, padding: 0.5 }}
            onClick={handleClickOpenForCreate}
          >
            เขียนรีวิว
          </Button>
          <div>
            <Grid container columns={6} spacing={2} sx={{ mt: 2 }}>
              {review.map((item: ReviewInterface) => (
                <Grid item xs={3} key={item.ID}>
                  <Paper>
                    <Grid container alignItems="center" justifyContent="space-between">
                      <Grid item xs={8}>
                        <TextField
                          sx={{ "& fieldset": { border: "none" } }}
                          value={item.Member.Line}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Avatar src={p1} />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                      <Grid item xs={4} sx={{ textAlign: "right" }}>
                        <TextField
                          sx={{ "& fieldset": { border: "none" } }}
                          value={`${Moment(item.Reviewdate).format("DD/MM/YYYY HH:mm:ss A")}`}
                        />
                      </Grid>
                    </Grid>
                    <Grid container alignItems="center" justifyContent="space-between">
                      <Grid item xs={8}>
                        <TextField
                          fullWidth
                          multiline
                          sx={{ "& fieldset": { border: "none" } }}
                          value={item.Comment}
                        />
                      </Grid>
                      <Grid item xs={4} sx={{ textAlign: "center" }}>
                        <Rating
                          value={item.Star}
                          size="medium"
                          sx={{ mt: 1.7 }}
                        />
                      </Grid>
                    </Grid>
                    <Grid container display={"flex"} justifyContent={"center"}>
                      <Grid>
                        {CheckImage(item)}
                      </Grid>
                    </Grid>
                    <Grid container display={"flex"} justifyContent={"right"}>
                      <Grid>
                        <IconButton aria-label="edit" style={{ float: "right" }}>
                          <EditIcon onClick={() => handleClickOpenForEdit(item)} />
                        </IconButton>
                        <IconButton aria-label="delete" style={{ float: "right" }}>
                          <DeleteIcon onClick={() => deleteReview(Number(item.ID))} />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </div>
          <Drawer anchor="right" open={openForCreate} onClose={handleCloseForCreate}>
            <Box sx={{ width: 800, padding: 2 }}>
              <Review_Save />
            </Box>
          </Drawer>
          <Drawer anchor="right" open={openForEdit} onClose={handleCloseForEdit}>
            <Box sx={{ width: 800, padding: 2 }}>
              <Container maxWidth="md">
                <Snackbar
                  id="success"
                  open={success}
                  autoHideDuration={8000}
                  onClose={handleClose}
                  anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                >
                  <Alert onClose={handleClose} severity="success">
                    บันทึกข้อมูลสำเร็จ
                  </Alert>
                </Snackbar>
                <Snackbar
                  id="error"
                  open={error}
                  autoHideDuration={6000}
                  onClose={handleClose}
                >
                  <Alert onClose={handleClose} severity="error">
                    {message}
                  </Alert>
                </Snackbar>
                <Paper elevation={3}>
                  <Box display="flex" sx={{ marginTop: 2 }}>
                    <Box sx={{ paddingX: 2, paddingY: 1 }}>
                      <Typography
                        component="h2"
                        variant="h6"
                        color="primary"
                        gutterBottom
                      >
                        แก้ไขรีวิวของคุณ
                      </Typography>
                    </Box>
                  </Box>
                  <Divider />
                  <Grid container spacing={3} sx={{ padding: 2 }} style={{ marginLeft: "14.5%" }}>
                    <Grid item xs={6}>
                      <FormControl>
                        <FormLabel>ให้คะแนนบริการนี้</FormLabel>
                        <Rating
                          name="simple-controlled"
                          value={start}
                          onChange={(event, newValue) => {
                            setStart(newValue);
                          }}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Grid container spacing={3} sx={{ padding: 2 }}>
                    <Grid item xs={10}>
                      <FormControl fullWidth variant="outlined">
                        <FormLabel>เขียนรีวิว</FormLabel>
                        <TextField
                          id="Comment"
                          variant="outlined"
                          type="string"
                          size="medium"
                          value={review1.Comment || ""}
                          onChange={handleInputChange}
                          multiline
                          rows={2}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Grid container spacing={3} sx={{ padding: 2 }}>
                    <Grid item xs={10}>
                      <FormControl fullWidth variant="outlined">
                        <FormLabel>เพิ่มรูปภาพ</FormLabel>
                        <img src={`${imageString}`} style={{ maxWidth: '65%', height: '80' }} />
                        <input type="file" accept=".jpg, .jpeg, .png" onChange={handleImageChange} />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        style={{ float: "right" }}
                        onClick={UpdateReview}
                        variant="contained"
                        color="primary"
                      >
                        บันทึก
                      </Button>
                    </Grid>
                  </Grid>
                </Paper>
              </Container>
            </Box>
          </Drawer>
        </Container>
    </FullScreenContainer>
  );
}

export default Review_list;
