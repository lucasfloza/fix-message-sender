import styled from 'styled-components';

export const Container = styled.div`
  padding: 2rem 0;
`;

export const Hero = styled.section`
  max-width: 720px;
  margin: 0 auto 2.5rem;
  text-align: center;
`;

export const Kicker = styled.p`
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: #38bdf8;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

export const HeroTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #0f172a;
`;

export const HeroText = styled.p`
  color: #475569;
  line-height: 1.6;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.5rem;
`;

export const CardDescription = styled.p`
  color: #6b7280;
  margin-bottom: 1rem;
  font-size: 0.95rem;
`;

export const Field = styled.label`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: #0f172a;
`;

export const FieldLabel = styled.span``;

export const Select = styled.select`
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  padding: 0.65rem 0.85rem;
  font-size: 1rem;
  background: #fff;
  color: #0f172a;

  &:focus {
    outline: 2px solid #38bdf8;
    outline-offset: 2px;
  }
`;

export const ProtocolHint = styled.p`
  font-size: 0.9rem;
  color: #64748b;
`;

export const TagDetails = styled.div``;

export const TagTitle = styled.h3`
  font-size: 1.05rem;
  margin-bottom: 0.35rem;
  color: #111827;
`;

export const TagDescription = styled.p`
  color: #64748b;
  margin-bottom: 0.75rem;
  line-height: 1.5;
`;

export const ChipList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
`;

export const Chip = styled.span`
  padding: 0.35rem 0.7rem;
  border-radius: 999px;
  background: #e0f2fe;
  color: #0369a1;
  font-size: 0.85rem;
`;

export const FormError = styled.p`
  color: #dc2626;
  font-size: 0.85rem;
  margin: 0.25rem 0 0.5rem;
`;

export const ResponsiveHeroTitle = styled(HeroTitle)`
  @media (max-width: 640px) {
    font-size: 2rem;
  }
`;
