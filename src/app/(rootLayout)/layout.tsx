import Footer from "./_components/Footer/Footer"
import Navbar from "./_components/Navbar/Navbar"

interface RootLayoutProps {
  children: React.ReactNode
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen">{children}</div>
      <Footer />
    </div>
  )
}

export default RootLayout
