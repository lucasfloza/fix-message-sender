import React, { useMemo, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { formatDate } from '../../utils/helpers';
import type { SavedFixMessage } from '../../types/components/display-messages';
import * as S from './DisplayMessages.styled';

type DisplayMessagesProps = {
  messages: SavedFixMessage[];
};

const DisplayMessages: React.FC<DisplayMessagesProps> = ({ messages }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const sortedMessages = useMemo(() => {
    return [...messages].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [messages]);

  const handleCopy = async (message: SavedFixMessage) => {
    try {
      await navigator.clipboard.writeText(message.sohPayload);
      setCopiedId(message.id);
      setTimeout(() => setCopiedId(null), 1500);
    } catch (error) {
      console.error('Erro ao copiar mensagem FIX', error);
      setCopiedId(null);
    }
  };

  const handleDownloadAll = () => {
    if (!sortedMessages.length) return;

    const nowLabel = new Date()
      .toISOString()
      .slice(0, 19)
      .replace(/[:T]/g, '-');
    const payload = sortedMessages
      .map((message, index) => {
        const label = `Mensagem ${sortedMessages.length - index} — ${formatDate(message.createdAt)}`;
        return `${label}\n${message.fixMessage}`;
      })
      .join('\n\n');

    const blob = new Blob([payload], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `fix-messages-${nowLabel}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <S.Container>
      <S.Header>
        <S.HeaderLeft>
          <S.Title>Mensagens salvas</S.Title>
          <S.Counter>({messages.length})</S.Counter>
        </S.HeaderLeft>
        <S.HeaderActions>
          <S.ActionButton
            onClick={handleDownloadAll}
            disabled={!sortedMessages.length}
          >
            Baixar todas (.txt)
          </S.ActionButton>
          <S.Toggle
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-expanded={isOpen}
            aria-controls="saved-messages-panel"
          >
            <S.Chevron $open={isOpen} />
            {isOpen ? 'Ocultar' : 'Mostrar'}
          </S.Toggle>
        </S.HeaderActions>
      </S.Header>

      <AnimatePresence initial={false}>
        {isOpen && (
          <S.Panel
            key="messages-panel"
            id="saved-messages-panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.18, ease: 'easeInOut' }}
          >
            {sortedMessages.length === 0 ? (
              <S.Empty>
                Nenhuma mensagem salva ainda. Clique em "+" ao lado de Copiar
                FIX para arquivar o payload atual.
              </S.Empty>
            ) : (
              <S.List>
                {sortedMessages.map((message, index) => (
                  <S.Item key={message.id}>
                    <S.Meta>
                      <S.Dot aria-hidden />
                      <span>Mensagem {sortedMessages.length - index}</span>
                      <S.Timestamp>{formatDate(message.createdAt)}</S.Timestamp>
                    </S.Meta>
                    <S.Preview title={message.fixMessage}>
                      {message.fixMessage.split('|').join(' | ')}
                    </S.Preview>
                    <S.Actions>
                      <S.ActionButton onClick={() => handleCopy(message)}>
                        {copiedId === message.id ? 'Copiado!' : 'Copiar FIX'}
                      </S.ActionButton>
                    </S.Actions>
                  </S.Item>
                ))}
              </S.List>
            )}
          </S.Panel>
        )}
      </AnimatePresence>
    </S.Container>
  );
};

export default DisplayMessages;
