import React from 'react';
import * as S from './About.styled';

const About: React.FC = () => {
  return (
    <S.Container>
      <S.Title>About This Project</S.Title>

      <S.SectionCard title="Technology Stack">
        <S.List>
          <S.ListItem>
            <S.Highlight>React 19</S.Highlight> - Latest version with modern
            features
          </S.ListItem>
          <S.ListItem>
            <S.Highlight>TypeScript</S.Highlight> - Type-safe development
          </S.ListItem>
          <S.ListItem>
            <S.Highlight>Vite</S.Highlight> - Fast build tool and development
            server
          </S.ListItem>
          <S.ListItem>
            <S.Highlight>React Router</S.Highlight> - Client-side routing
          </S.ListItem>
          <S.ListItem>
            <S.Highlight>Axios</S.Highlight> - HTTP client for API communication
          </S.ListItem>
          <S.ListItem>
            <S.Highlight>ESLint</S.Highlight> - Code quality and consistency
          </S.ListItem>
        </S.List>
      </S.SectionCard>

      <S.SectionCard title="Architecture">
        <S.Paragraph>
          This project follows modern best practices for React applications:
        </S.Paragraph>
        <S.List>
          <S.ListItem>
            Component-based architecture with reusable UI components
          </S.ListItem>
          <S.ListItem>
            Custom hooks for shared logic and API integration
          </S.ListItem>
          <S.ListItem>Service layer for API communication</S.ListItem>
          <S.ListItem>
            Type-safe with TypeScript interfaces and types
          </S.ListItem>
          <S.ListItem>Environment-based configuration</S.ListItem>
          <S.ListItem>Centralized error handling and interceptors</S.ListItem>
        </S.List>
      </S.SectionCard>

      <S.SectionCard title="Java REST API Integration">
        <S.Paragraph>
          This frontend is designed to communicate with a Java REST API backend.
          The API client is configured with:
        </S.Paragraph>
        <S.List>
          <S.ListItem>
            Axios interceptors for request/response handling
          </S.ListItem>
          <S.ListItem>JWT token authentication support</S.ListItem>
          <S.ListItem>Automatic error handling and user feedback</S.ListItem>
          <S.ListItem>Environment-based API URL configuration</S.ListItem>
          <S.ListItem>Type-safe request/response models</S.ListItem>
        </S.List>
      </S.SectionCard>
    </S.Container>
  );
};

export default About;
