import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, TextField, Button, useTheme, Typography, keyframes } from '@mui/material'
import styled from '@emotion/styled'
import { tokens, ColorModeContext } from '../../themes'

const Login = () => {
    const theme = useTheme()
    const navigate = useNavigate()
    const [colors, setColors] = useState(tokens(theme.palette.mode))
    const colorMode = useContext(ColorModeContext)
    const [pin, setPin] = useState("")
    const [password, setPassword] = useState("")
    const [pinError, setPinError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)

    const handleSetPin = (e) => setPin(e.target.value)
    const handleSetPassword = (e) => setPassword(e.target.value)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await window.$post('login', {pin: pin, password: password})
        if(res.data.status === "success"){
            window.sessionStorage.setItem("isLogin", true)
            window.sessionStorage.setItem("userToken", res.data.data)
            navigate('/home')
        }
        else{
            setPinError(true)
            setPasswordError(true)
            window.sessionStorage.clear()
        }
        
    }
    const fadeIn = keyframes`
        0%, 18%, 20%, 50.1%, 60%, 65.1%, 80%, 90.1%, 92% {
            color: #0e3742;
            text-shadow: none;
        }
        18.1%, 20.1%, 30%, 50%, 60.1%, 65%, 80.1%, 90%, 92.1%, 100% {
            color: #ffffff;
            text-shadow: 0 0 10px #03bcf4,
                         0 0 20px #03bcf4,
                         0 0 40px #03bcf4,
                         0 0 80px #03bcf4,
                         0 0 160px #03bcf4
        }
    `
    const AnimatedText = theme.palette.mode === "dark" ? styled.div`
        animation: ${fadeIn} 2s linear infinite;
    ` : styled.div``

    const style ={
        boxSizing: 'border-box',
        letterSpacing: '15px',
        WebkitBoxReflect: 'below 1px linear-gradient(transparent, #0004)',
        lineHeight: '.7em',
        outline: 'none',
        fontSize: '6em',
        fontWeight: 'bolder',
        animation: 'animate 5s linear infinite',
    }
    const style2 = {
        boxSizing: 'border-box',
        letterSpacing: '15px',
        WebkitBoxReflect: 'below 1px linear-gradient(transparent, #0004)',
        lineHeight: '.7em',
        outline: 'none',
        fontSize: '6em',
        fontWeight: 'bolder',
        textShadow:  theme.palette.mode === "dark" ? '0 0 10px #03bcf4, 0 0 20px #03bcf4, 0 0 40px #03bcf4, 0 0 80px #03bcf4, 0 0 160px #03bcf4' : 'none'
    }
  return (<>
    <Box sx={{
        position: 'absolute',
        left: '95%'
    }}>
        <input type='checkbox' id="pull-chain"
            style={{
                display: 'none'
            }}
        />
        <div style={{
            position: "relative",
            margin: "0px auto",
            borderRight: "5px dotted #D4AF37",
            height: theme.palette.mode === "dark" ? "250px" : "200px",
            width:" 15px",
            WebkitTransition: 'height 0.5s',
            MozTransition: 'height 0.5s',
            transition: 'height 0.5s'
        }}>
            <label htmlFor="pull-chain"
                style={{
                    display: "block",
                    position: "absolute",
                    /* left: width of chain div (15px) + half of border (1px) - radius of handle (8px)*/  
                    left: "5px",
                    bottom: '0%',
                    background: '#D4AF37',
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    cursor: 'pointer'
                }}
                onClick={colorMode.toggleColorMode}
            ></label>
        </div>
    </Box>
    <Box display={'flex'} justifyContent={"center"} alignItems={"center"} height={"100%"}>
        <Box>
            <Box display={'flex'} justifyContent={'center'} alignItems={'center'} textAlign={'center'}>
                <Typography variant='h1'
                    sx={style2}
                >ITP</Typography>
                <AnimatedText>
                    <Typography variant='h1'
                        sx={style}
                    >M</Typography>
                </AnimatedText>
                <Typography variant='h1'
                    sx={style2}
                >S</Typography>
            </Box>
            
            
            <Box p={"20px"} mt={8} sx={{
                border: "1px solid #ffffff",
                borderRadius: '10px'
            }}>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        variant='filled'
                        type='text'
                        label={pinError ? "Incorrect PIN..." : "Enter PIN..."}
                        onChange={handleSetPin}
                        sx={{mb: "10px"}}
                        error={pinError}
                    />
                    <TextField
                        fullWidth
                        variant='filled'
                        type='password'
                        label={passwordError ? "Incorrect Password..." : "Enter Password..."}
                        onChange={handleSetPassword}
                        sx={{mb: "10px"}}
                        error={passwordError}
                    />
                    <Button fullWidth variant='contained' type='submit' sx={{background: colors.blueAccent[700]}}>Submit</Button>
                </form>
            </Box>
        </Box>
    </Box>
  </>)
}

export default Login