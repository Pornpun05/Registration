import "./App.css";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function App() {
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [emailaddress, setemailaddress] = useState("");
  const [password, setpassword] = useState("");
  const [requirement, setrequirement] = useState("");
  const [firstnameerror, seterrorfirstname] = useState("");
  const [lastnameerror, seterrorlastname] = useState("");
  const [emailaddresserror, seterroremailaddress] = useState("");
  const [passworderror, seterrorpassword] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    {
      event.preventDefault();
      try {
        if (password.length <= 6) {
          Swal.fire({
            title: "error",
            text: "Password must be more than 6 characterse",
            icon: "error",
            confirmButtonText: "OK",
          });
          return;
        }
        if (firstname.length <= 2) {
          Swal.fire({
            title: "error",
            text: "firstname must be more than 2 characters",
            icon: "error",
            confirmButtonText: "OK",
          });
          return;
        }
        if (lastname.length <= 2) {
          Swal.fire({
            title: "error",
            text: "lastname must be more than 2 characters",
            icon: "error",
            confirmButtonText: "OK",
          });
          return;
        }
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailaddress)) {
          Swal.fire({
            title: "error",
            text: "Invalid email address format",
            icon: "error",
            confirmButtonText: "OK",
          });
          return;
        }

        const inputData = {
          firstname: firstname,
          lastname: lastname,
          emailaddress: emailaddress,
          password: password,
          requirement: requirement,
        };

        axios.post("http://localhost:9000/register", inputData).then((res) => {
          console.log(res);
          Swal.fire({
            title: "success",
            text: "Do you want to continue",
            icon: "success",
            confirmButtonText: "OK",
          }).then(() => {
            window.location.reload();
          });
        });
      } catch (error) {
        console.log(error);
        Swal.fire({
          title: "error",
          text: "Do you want to continue",
          icon: "error",
          confirmButtonText: "",
        });
      }
    }
  };
  return (
    <div>
      <Container component="main" maxWidth="sm">
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ mt: 3, bgcolor: "#CDCDC" }}
        >
          <Typography
            component="h1"
            variant="h4"
            fontStyle="prompt"
            sx={{ mb: 4 }}
          >
            User Registration
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                autoComplete="given-name"
                name="firstName"
                id="firstName"
                label="First Name"
                autoFocus
                helperText={firstnameerror}
                error={Boolean(firstnameerror)}
                onChange={(e) => {
                  setfirstname(e.target.value);
                  if (e.target.value.length < 2) {
                    seterrorfirstname("should be more than 2 characters");
                  } else {
                    seterrorfirstname("");
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                helperText={lastnameerror}
                error={Boolean(lastnameerror)}
                onChange={(e) => {
                  setlastname(e.target.value);
                  if (e.target.value.length < 2) {
                    seterrorlastname("should be more than 2 characters");
                  } else {
                    seterrorlastname("");
                  }
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="emailaddress"
                label="Email Address"
                name="emailaddress"
                autoComplete="emailaddress"
                helperText={emailaddresserror}
                error={Boolean(emailaddresserror)}
                onChange={(e) => {
                  setemailaddress(e.target.value);
                  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value)) {
                    seterroremailaddress("Invalid email address format");
                  } else {
                    seterroremailaddress("");
                  }
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                helperText={passworderror}
                error={Boolean(passworderror)}
                onChange={(e) => {
                  setpassword(e.target.value);
                  if (e.target.value.length < 6) {
                    seterrorpassword(
                      "Password must be more than 6 characterse"
                    );
                  } else {
                    seterrorpassword("");
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                fullWidth
                id="outlined-multiline-static"
                label="Requirements"
                multiline
                rows={3}
                onChange={(e) => setrequirement(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sx={{ "& button": { m: 1 } }}>
              <Button
                endIcon={<SendIcon />}
                color="success"
                size="large"
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Register
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
}

export default App;
