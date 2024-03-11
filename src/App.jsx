import AOS from "aos";
import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "aos/dist/aos.css";

import './App.css'
import RouterComponent from './routers/RouterComponent'


function App() {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return <RouterComponent />
}

export default App
