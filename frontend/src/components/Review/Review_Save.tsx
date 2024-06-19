import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Grid,
  MenuItem,
  Paper,
  Rating,
  Select,
  SelectChangeEvent,
  Snackbar,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";
import * as React from "react";
import {
  ReviewInterface,
  SystemworkInterface,
} from "../../models/IReview";
import { Link as RouterLink } from "react-router-dom";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { MemberInterface } from "../../models/modelMember/IMember";

const bgbutton = createTheme({
  palette: {
    primary: {
      // Purple and grey play nicely together.
      main: grey[800],
    },
    secondary: {
      // Purple and grey play nicely together.
      main: grey[50],
    },
  },
});

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,

  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Review_Save() {
  const [start, setStart] = React.useState<number | null>();
  const [review, setReview] = React.useState<Partial<ReviewInterface>>({});
  const [user, setUser] = React.useState<MemberInterface>();
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [imageString, setImageString] = React.useState<string | ArrayBuffer | null>(null);
  const [reviewdate, setReviewdate] = React.useState<Date | null>(new Date());
  const [message, setAlertMessage] = React.useState("");
  const [remainingChars, setRemainingChars] = React.useState(100); // Max number of characters

  const handleImageChange = (event: any) => {
    const image = event.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = () => {
        const base64Data = reader.result;
        setImageString(base64Data)
    }
}

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

    setReview({ ...review, [id]: value });
  };

  const handleChange = (event: SelectChangeEvent<number>) => {
    const name = event.target.name as keyof typeof review;
    setReview({
      ...review,
      [name]: event.target.value,
    });
  };

  function submit() {
    let data = {
      Comment: review.Comment ?? "",
      Star: start,
      Reviewdate: reviewdate,
      Reviewimage: imageString,
      MemberID: user?.ID ?? "",
      SystemworkID: Number(review.SystemworkID),
    };

    const apiUrl = "http://localhost:8080/Reviews";

    const requestOptions = {
      method: "POST",

      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data),
    };

    fetch(apiUrl, requestOptions)
      .then((response) => response.json())

      .then((res) => {
        console.log(res)
        if (res.data) {
          window.location.reload();
          setSuccess(true);
        } else {
          setError(true);
          setAlertMessage(res.error);
        }
      });
  }

  React.useEffect(() => {
    const getToken = localStorage.getItem("token");
    if (getToken) {
      setUser(JSON.parse(localStorage.getItem("user") || ""));
    }
  }, []);
  return (
    <ThemeProvider theme={bgbutton}>
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
          onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            บันทึกข้อมูลไม่สำเร็จ {message}
          </Alert>
        </Snackbar>

        <Paper>
          <Box
            display="flex"
            sx={{
              marginTop: 2,
            }}
          >
            <Box sx={{ paddingX: 2, paddingY: 1 }}>
              <Typography
                component="h2"
                variant="h6"
                color="primary"
                gutterBottom
              >
                เขียนรีวิวของคุณ
              </Typography>
            </Box>
          </Box>

          <Divider />

          <Grid
            container
            spacing={3}
            sx={{ padding: 2 }}
            style={{ marginLeft: "10.5%" }}
          >
          </Grid>

          <Grid
            container
            spacing={3}
            sx={{ padding: 2 }}
            style={{ marginLeft: "14.5%" }}
          >
            <Grid item xs={6}>
              <FormControl>
                <FormLabel>ให้คะแนนบริการนี้</FormLabel>
                <Rating
                  name="simple-controlled"
                //   value={5}
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
                        value={review.Comment || ""}
                        onChange={handleInputChange}
                        multiline
                        rows={3}
                        // inputProps={{ maxLength: 100 }} // Max character limit
                      />
                      {/* <Typography color={remainingChars < 0 ? "error" : "initial"}>
                        จำนวนตัวหนังสือ : {remainingChars}
                      </Typography> */}
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
              {/* <Button component={RouterLink} to="/AddReview" variant="contained">
                ยกเลิก
              </Button> */}
              <Button
                style={{ float: "right" }}
                onClick={submit}
                variant="contained"
                color="primary"
              >
                บันทึก
              </Button>
            </Grid>

          </Grid>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

export default Review_Save;
