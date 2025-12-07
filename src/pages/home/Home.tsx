import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/card/Card';
import Button from '../../components/button/Button';
import LightningLogo from '../../components/lightning-logo/LightningLogo';
import * as S from './Home.styled';

const Home: React.FC = () => {
  return (
    <S.Container>
      <S.Hero>
        <LightningLogo />
        <S.HeroTitle>Welcome to FIX Message Sender</S.HeroTitle>
        <S.HeroDescription>
          A modern, scalable React application for sending and managing FIX
          messages to your Java REST API backend.
        </S.HeroDescription>
        <S.HeroActions>
          <Link to="/messages">
            <Button size="large">View Messages</Button>
          </Link>
          <Link to="/build">
            <Button size="large" variant="secondary">
              Build FIX
            </Button>
          </Link>
        </S.HeroActions>
      </S.Hero>

      <S.Features>
        <Card title="🚀 Modern Architecture">
          <S.FeatureText>
            Built with React 19, TypeScript, and Vite for a fast and type-safe
            development experience.
          </S.FeatureText>
        </Card>

        <Card title="🔌 API Integration">
          <S.FeatureText>
            Seamless integration with Java REST APIs using Axios with
            interceptors for authentication and error handling.
          </S.FeatureText>
        </Card>

        <Card title="📦 Scalable Structure">
          <S.FeatureText>
            Organized folder structure following industry best practices for
            maintainability and scalability.
          </S.FeatureText>
        </Card>

        <Card title="🎨 Reusable Components">
          <S.FeatureText>
            Custom UI components built from scratch, ready to be extended and
            customized for your needs.
          </S.FeatureText>
        </Card>
      </S.Features>
    </S.Container>
  );
};

export default Home;
