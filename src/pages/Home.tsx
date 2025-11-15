import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import './Home.css';

const Home: React.FC = () => {
  return (
    <div className="home">
      <div className="hero">
        <h1>Welcome to FIX Message Sender</h1>
        <p className="hero-description">
          A modern, scalable React application for sending and managing FIX
          messages to your Java REST API backend.
        </p>
        <div className="hero-actions">
          <Link to="/messages">
            <Button size="large">View Messages</Button>
          </Link>
        </div>
      </div>

      <div className="features">
        <Card title="🚀 Modern Architecture">
          <p>
            Built with React 19, TypeScript, and Vite for a fast and type-safe
            development experience.
          </p>
        </Card>

        <Card title="🔌 API Integration">
          <p>
            Seamless integration with Java REST APIs using Axios with
            interceptors for authentication and error handling.
          </p>
        </Card>

        <Card title="📦 Scalable Structure">
          <p>
            Organized folder structure following industry best practices for
            maintainability and scalability.
          </p>
        </Card>

        <Card title="🎨 Reusable Components">
          <p>
            Custom UI components built from scratch, ready to be extended and
            customized for your needs.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Home;
