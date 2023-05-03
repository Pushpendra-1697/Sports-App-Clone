import { Box } from "@chakra-ui/react";
import Navbar from "./Components/Navbar";
import AllRoutes from "./Pages/AllRoutes";
import Footer from "./Components/Footer";

function App() {
  return (
    <Box>
      <Navbar id="top" />
      <AllRoutes />
      <Footer />
    </Box>
  );
}

export default App;