import Button from '@material-tailwind/react/Button'

function Header() {
  return (
    <header className="flex items-center">
      <Button
        color="gray"
        buttonType="outline"
        rounded={true}
        iconOnly={true}
        ripple="dark"
        className="hidden h-20 w-20 border-0 md:inline-flex"
      ></Button>
    </header>
  )
}
export default Header
