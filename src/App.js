import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/layout/Header";
import AuctionList from "./components/paginas/auction/AuctionList";

function App() {
  

  
  return (
    <div className="App">
      
      <BrowserRouter>
          <Header/>

          <Routes>
            <Route exact path="" element={<AuctionList/>}  />

          </Routes>

      </BrowserRouter>
      
    </div>
  );
}

export default App;
