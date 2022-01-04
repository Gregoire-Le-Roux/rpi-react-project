import './App.css';
/*
 * Pour le système de route, on utilise la librairie React Router, un des routers les plus populaires pour gérer les routes
 * https://www.w3schools.com/react/react_router.asp
*/
import { Route,  Routes} from "react-router-dom";
import Layout from './components/Layout';
import Author from './components/Author/Author';
import Book from './components/Book/Book';
import Gender from './components/Gender/Gender';


function App() {
  return (
    <div>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Book />} />
            <Route path="auteur" element={<Author />} />
            <Route path="genre" element={<Gender />} />
            <Route path="*" element={<Book />} />
          </Route>
        </Routes>
    </div>
  );
}

export default App;
