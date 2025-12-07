import styled from 'styled-components';

export const Container = styled.div`
  padding: 2rem 0;
`;

export const Hero = styled.div`
  text-align: center;
  padding: 3rem 0;
  margin-bottom: 3rem;
`;

export const HeroTitle = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 1rem;
`;

export const HeroDescription = styled.p`
  font-size: 1.25rem;
  color: #6b7280;
  max-width: 600px;
  margin: 0 auto 2rem;
`;

export const HeroActions = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
`;

export const Features = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
`;

export const FeatureText = styled.p`
  color: #6b7280;
  line-height: 1.6;
`;
