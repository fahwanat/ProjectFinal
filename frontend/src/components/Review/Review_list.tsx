import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import {
  IconButton,
  Paper,
  Grid,
  Drawer,
  TextField,
  Rating,
  Snackbar,
  Divider,
  FormControl,
  FormLabel,
  Select,
  SelectChangeEvent,
  styled,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Review_Save from "./Review_Save";
import { ReviewInterface, SystemworkInterface } from "../../models/IReview";
import Moment from "moment";
import EditIcon from "@mui/icons-material/Edit";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Carousel from "react-material-ui-carousel";
import im10 from "../../Image/im10.jpg";
import im7 from "../../Image/im7.jpg";
import Avatar from '@mui/material/Avatar';
import InputAdornment from '@mui/material/InputAdornment';
import p1 from "../../Image/p1.jpg";

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

function Review_list() {
  // Moment.locale("th");

  const [imageString, setImageString] = React.useState<string | ArrayBuffer | null>(null);
  const [openForCreate, setOpenForCreate] = React.useState(false);
  const [openForEdit, setOpenForEdit] = React.useState(false);
  const [review, setReview] = React.useState<ReviewInterface[]>([]);
  const [review1, setReview1] = React.useState<Partial<ReviewInterface>>({});
  const [start, setStart] = React.useState<number | null>();
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);
  const imgSize = { width: "200px", height: "200px" };
  const [openImage, setOpenImage] = React.useState(false);
  const [img, setimg] = React.useState({});
  const [message, setAlertMessage] = React.useState("");
  const [remainingChars, setRemainingChars] = React.useState(100); // Max number of characters

  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const UpdateReview = () => {
    let UpdateData = {
      ID: review1.ID,
      Comment: review1.Comment,
      Star: start,
      Reviewimage: imageString,
      SystemworkID: review1.SystemworkID,
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

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
    setError(false);
  };

  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof Review_Save;
    const { value } = event.target;
    setReview1({ ...review1, [id]: value });
  };

  const handleChange = (event: SelectChangeEvent<number>) => {
    const name = event.target.name as keyof typeof review;
    setReview1({
      ...review1,
      [name]: event.target.value,
    });
  };

  const closeImage = () => {
    setOpenImage(false);
  };

  const OpenImageonCilck = (item: ReviewInterface) => {
    setOpenImage(true);
    setimg(item.Reviewimage);
  };

  const CheckImage = (item: ReviewInterface) => {
    if (item.Reviewimage != "") {
      return (
        <img
          src={`${item.Reviewimage}`}
          style={imgSize}
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
    setOpenForEdit(true);
  };

  const handleCloseForEdit = () => {
    setOpenForEdit(false);
  };

  const handleImageChange = (event: any) => {
    const image = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = () => {
      const base64Data = reader.result;
      setImageString(base64Data);
    };
  };

    const FullScreenContainer = styled('div')({
    height: '80vw',
    width: '100vw',
    display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundImage: "url(https://th-test-11.slatic.net/p/77b74100b4ce7a4a90041dea0a602396.jpg)",
  });


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
    <ThemeProvider theme={themeshow}>
      <Container maxWidth="xl">
        <Button
          color="primary"
          variant="contained"
          aria-label="add"
          sx={{ mt: 6, padding: 0.5 }}
          onClick={() => handleClickOpenForCreate()}
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
                        <DeleteIcon
                          onClick={() => deleteReview(Number(item.ID))}
                        />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </div>
        <Drawer anchor="right" open={openImage} onClose={closeImage}>
          <Box sx={{ width: 800, padding: 2 }}>
            <img src={`${img}`} width="100%" height="100%" />
          </Box>
        </Drawer>
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
                        disabled
                        name="simple-controlled"
                        defaultValue={review1.Star}
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
                        inputProps={{ maxLength: 100 }} // Max character limit
                      />
                      <Typography color={remainingChars < 0 ? "error" : "initial"}>
                        จำนวนตัวหนังสือ : {remainingChars}
                      </Typography>
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
                    <Button component={RouterLink} to="/RW" variant="contained">
                      ย้อนกลับ
                    </Button>
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
    </ThemeProvider>
    </FullScreenContainer>
  );
}

export default Review_list;
