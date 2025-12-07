import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/home/Home';
import Messages from './pages/messages/Messages';
import About from './pages/about/About';
import BuildFix from './pages/build-fix/BuildFix';

function App() {
  return (
    <Router basename="/fix-message-sender">
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/build" element={<BuildFix />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
