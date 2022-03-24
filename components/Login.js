import Button from '@material-tailwind/react/Button'
import { signIn } from 'next-auth/client'
import Image from 'next/image'
import Head from 'next/head'

function Login() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Log In</title>
      </Head>
      <Image
        src="https://links.papareact.com/1ui"
        height="300"
        width="550"
        objectFit="contain"
      />
      <Button
        className="mt-10 w-44"
        color="blue"
        buttonType="filled"
        ripple="light"
        onClick={signIn}
      >
        Login
      </Button>
    </div>
  )
}
export default Login
