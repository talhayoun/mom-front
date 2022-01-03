import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useContext, useState } from "react";
import UserContext from "../../contex/usercontext";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState("");
    const [responseError, setResponseError] = useState("");

    const navigate = useNavigate();
    const userCtx = useContext(UserContext);

    let usernameInvalid = username.length > 0 ? false : true;
    let passwordInvalid = password.length > 0 ? false : true;

    const usernameBlurHandler = () => {
        if (usernameInvalid) setErrors([true, errors[1]]);
        else setErrors([false, errors[1]]);
    };
    const passwordBlurHandler = () => {
        if (passwordInvalid) setErrors([errors[0], true]);
        else setErrors([errors[0], false]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (usernameInvalid || passwordInvalid) {
            setErrors([usernameInvalid, passwordInvalid]);
            return;
        }
        fetch(`${process.env.REACT_APP_SERVER_API}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
            })
            .then((jsonData) => {
                userCtx.login(jsonData.token);
                navigate("/");
            })
            .catch((error) => {
                setResponseError("שם משתמש או סיסמה שגויים");
                setTimeout(() => {
                    setResponseError("");
                }, 2500);
            });
    };

    return (
        <div className="login">
            <form>
                <Container
                    component="main"
                    maxWidth="xs"
                    style={{ width: 350, marginTop: 250 }}
                >
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
                        <Typography component="h1" variant="h5">
                            התחברות
                        </Typography>
                        <Box
                            component="form"
                            noValidate
                            sx={{ mt: 1 }}
                            style={{ width: 350 }}
                        >
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="שם משתמש"
                                name="username"
                                autoComplete="username"
                                autoFocus
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                onBlur={usernameBlurHandler}
                            />
                            {errors[0] && (
                                <p className="error-message">שדה שם משתמש הוא חובה</p>
                            )}
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="סיסמה"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onBlur={passwordBlurHandler}
                            />
                            {errors[1] && <p className="error-message">שדה סיסמה הוא חובה</p>}
                            {responseError && <p className="error-message">{responseError}</p>}
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2, fontSize: 20 }}
                                onClick={handleSubmit}
                            >
                                התחבר
                            </Button>
                            <Grid container></Grid>
                        </Box>
                    </Box>
                </Container>
            </form>
        </div>
    );
};

export default Login;
