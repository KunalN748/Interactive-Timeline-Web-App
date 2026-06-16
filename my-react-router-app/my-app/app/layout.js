import './index.css'


function RootLayout({ children }) {
    return (
      <html lang="en">
        {/*sets css for all children in app*/}
        <body className="flex flex-col justify-center items-center bg-gray-900 text-white text-base pb-8 sm:text-lg"> 
          {children}
        </body>
      </html>
    );
  }
export default RootLayout
