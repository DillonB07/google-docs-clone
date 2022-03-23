import Button from '@material-tailwind/react/Button'
import Icon from '@material-tailwind/react/Icon'
import { getSession, useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import { useDocumentOnce } from 'react-firebase-hooks/firestore'
import Login from '../../components/Login'
import TextEditor from '../../components/TextEditor'
import { db } from '../../firebase'

function Document() {
  const [session] = useSession()

  if (!session) return <Login />

  const router = useRouter()
  const { id } = router.query

  const [snapshot, loadingSnapshot] = useDocumentOnce(
    db.collection('userDocs').doc(session.user.email).collection('docs').doc(id)
  )

  // Redirect user if they don't have access to the file
  if (!loadingSnapshot && !snapshot?.data()?.filename) {
    router.replace('/')
  }

  return (
    <div>
      <header className="flex items-center justify-between p-3 pb-1">
        <span className="cursor-pointer" onClick={() => router.push('/')}>
          <Icon name="description" size="5xl" color="blue" />
        </span>

        <div className="flex-grow py-2">
          <h2 className="">{snapshot?.data()?.filename}</h2>
          <div className="-ml-1 flex h-8 items-center space-x-1 text-sm text-gray-600">
            <p className="option">File</p>
            <p className="option">Edit</p>
            <p className="option">View</p>
            <p className="option">Insert</p>
            <p className="option">Format</p>
            <p className="option">Tools</p>
          </div>
        </div>

        <Button
          color="lightBlue"
          buttonType="filled"
          size="regular"
          className="hidden h-10 md:inline-flex"
          rounded={false}
          block={false}
          iconOnly={false}
          ripple="light"
        >
          <Icon name="person" size="md" /> Share
        </Button>

        <img
          className="ml-2 h-10 w-10 cursor-pointer rounded-full"
          src={session.user.image}
          alt={session.user.name}
        />
      </header>

      <TextEditor />
    </div>
  )
}
export default Document

export async function getServerSideProps(context) {
  const session = await getSession(context)

  return {
    props: { session },
  }
}
