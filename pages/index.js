import Head from 'next/head'
import Header from '../components/Header'
import Login from '../components/Login'
import DocumentRow from '../components/DocumentRow'
import { getSession, useSession } from 'next-auth/client'
import { useState } from 'react'
import Modal from '@material-tailwind/react/Modal'
import ModalBody from '@material-tailwind/react/ModalBody'
import ModalFooter from '@material-tailwind/react/ModalFooter'
import Button from '@material-tailwind/react/Button'
import Icon from '@material-tailwind/react/Icon'
import Image from 'next/image'
import { db } from '../firebase'
import firebase from 'firebase'
import { useCollectionOnce } from 'react-firebase-hooks/firestore'

export default function Home() {
  const [session] = useSession()

  if (!session) return <Login />

  const [showModal, setShowModal] = useState(false)
  const [input, setInput] = useState('')
  const [snapshot] = useCollectionOnce(
    db
      .collection('userDocs')
      .doc(session.user.email)
      .collection('docs')
      .orderBy('timestamp', 'desc')
  )

  const createDocument = () => {
    if (!input) return

    db.collection('userDocs').doc(session.user.email).collection('docs').add({
      filename: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })
    setInput('')
    setShowModal(false)
  }

  const modal = (
    <Modal size="sm" active={showModal} toggler={(e) => setShowModal(false)}>
      <ModalBody>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          className="w-full outline-none"
          placeholder="Enter name of document..."
          onKeyDown={(e) => e.key === 'Enter' && createDocument()}
        />
      </ModalBody>
      <ModalFooter>
        <Button
          color="blue"
          buttonType="link"
          onClick={(e) => setShowModal(false)}
          ripple="dark"
        >
          Cancel
        </Button>

        <Button color="blue" onClick={createDocument} ripple="light">
          Create
        </Button>
      </ModalFooter>
    </Modal>
  )

  return (
    <div>
      <Head>
        <title>Google Docs</title>
        <link
          rel="icon"
          href="https://ssl.gstatic.com/docs/documents/images/kix-favicon7.ico"
        />
      </Head>

      <Header />
      {modal}
      <section className="bg-[#F8F9FA] px-10 pb-10">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center justify-between py-6">
            <h2 className="text-lg text-gray-700">Start a new document</h2>
            <Button
              color="gray"
              buttonType="outline"
              iconOnly={true}
              ripple="dark"
              className="border-0"
            >
              <Icon name="more_vert" size="3xl" />
            </Button>
          </div>
          <div>
            <div
              onClick={() => setShowModal(true)}
              className="relative h-52 w-40 cursor-pointer border-2 hover:border-blue-700"
            >
              <Image src="https://links.papareact.com/pju" layout="fill" />
            </div>
            <p className="ml-2 mt-2 text-sm font-semibold text-gray-700">
              Blank
            </p>
          </div>
        </div>
      </section>
      <section className="bg-white px-10 md:px-0">
        <div className="mx-auto max-w-3xl py-8 text-sm text-gray-700">
          <div className="flex items-center justify-between pb-5">
            <h2 className="flex-grow font-medium">My Documents</h2>
            <p className="mr-12">Date Created</p>
            <Icon name="folder" size="3xl" color="gray" />
          </div>

          {snapshot?.docs.map((doc) => (
            <DocumentRow
              key={doc.id}
              id={doc.id}
              fileName={doc.data().filename}
              date={doc.data().timestamp}
            />
          ))}
        </div>
      </section>
    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)

  return {
    props: { session },
  }
}
