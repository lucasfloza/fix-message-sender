import React from 'react';
import Card from '../components/card/Card';
import './About.css';

const About: React.FC = () => {
  return (
    <div className="about">
      <h1>About This Project</h1>

      <Card title="Technology Stack">
        <ul className="tech-list">
          <li>
            <strong>React 19</strong> - Latest version with modern features
          </li>
          <li>
            <strong>TypeScript</strong> - Type-safe development
          </li>
          <li>
            <strong>Vite</strong> - Fast build tool and development server
          </li>
          <li>
            <strong>React Router</strong> - Client-side routing
          </li>
          <li>
            <strong>Axios</strong> - HTTP client for API communication
          </li>
          <li>
            <strong>ESLint</strong> - Code quality and consistency
          </li>
        </ul>
      </Card>

      <Card title="Architecture">
        <p>
          This project follows modern best practices for React applications:
        </p>
        <ul className="architecture-list">
          <li>Component-based architecture with reusable UI components</li>
          <li>Custom hooks for shared logic and API integration</li>
          <li>Service layer for API communication</li>
          <li>Type-safe with TypeScript interfaces and types</li>
          <li>Environment-based configuration</li>
          <li>Centralized error handling and interceptors</li>
        </ul>
      </Card>

      <Card title="Java REST API Integration">
        <p>
          This frontend is designed to communicate with a Java REST API backend.
          The API client is configured with:
        </p>
        <ul className="api-features">
          <li>Axios interceptors for request/response handling</li>
          <li>JWT token authentication support</li>
          <li>Automatic error handling and user feedback</li>
          <li>Environment-based API URL configuration</li>
          <li>Type-safe request/response models</li>
        </ul>
      </Card>
    </div>
  );
};

export default About;
