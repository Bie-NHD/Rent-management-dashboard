//
// https://stackoverflow.com/a/49819545
// https://react-hook-form.com/get-started
//

import { useForm, SubmitHandler } from "react-hook-form"

type Inputs = {
  username: string
  password: string
}

const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

import { Container, Paper } from '@mui/material'
import React from 'react'

function LoginPage() {
  return (
    <Container>
        <center>
            <Paper>
                <form>

                </form>
            </Paper>
        </center>
    </Container>
  )
}

export default LoginPage