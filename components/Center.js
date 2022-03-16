import Button from '@material-tailwind/react/Button'
import Icon from '@material-tailwind/react/Icon'
import Image from 'next/image'

function Center() {
  return (
    <>
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
            <div className="relative h-52 w-40 cursor-pointer border-2 hover:border-blue-700">
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
        </div>
      </section>
    </>
  )
}
export default Center
