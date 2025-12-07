import styled from 'styled-components';
import Card from '../../components/card/Card';

export const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 2rem;
`;

export const Paragraph = styled.p`
  color: #6b7280;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

export const List = styled.ul`
  list-style: disc;
  padding-left: 1.5rem;
  color: #6b7280;
  line-height: 1.8;
`;

export const ListItem = styled.li`
  margin-bottom: 0.5rem;
`;

export const Highlight = styled.strong`
  color: #111827;
`;

export const SectionCard = styled(Card)`
  margin-bottom: 1.5rem;
`;
