import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import AuthProvider from '@/components/AuthProvider'
import { ToastContainer } from 'react-toastify';
import '@/assets/styles/globals.css'
import 'react-toastify/dist/ReactToastify.css';

export const metadata = {
    title: 'PushThought | Create Political Change',
    description: 'Take action for the causes you care about',
    keyword: 'politics, cause, social change, petition',
}

const MainLayout = ({children}) => {
  return (
    <AuthProvider>
      <html lang='en'>
          <body>
              <Navbar />
              <main>{children}</main>
              <Footer />
              <ToastContainer />
          </body>
      </html>
    </AuthProvider>
  )
}

export default MainLayout
