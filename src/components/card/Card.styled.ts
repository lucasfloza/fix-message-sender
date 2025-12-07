import styled from 'styled-components';

export const Card = styled.div`
  background-color: #ffffff;
  border-radius: 0.5rem;
  box-shadow:
    0 1px 3px 0 rgba(0, 0, 0, 0.1),
    0 1px 2px 0 rgba(0, 0, 0, 0.06);
  overflow: hidden;
`;

export const CardHeader = styled.div`
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
`;

export const CardBody = styled.div`
  padding: 1.5rem;
`;
