import React, { useMemo, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import type { FixTagEntry } from '../../types/services/fixMessage';
import type { DisplayFixProps } from '../../types/components/display-fix';
import * as S from './DisplayFix.styled';

const HEADER_TAGS = ['8', '9', '35', '49', '56', '34', '52', '115', '128'];
const TRAILER_TAGS = ['10'];

const DisplayFix: React.FC<DisplayFixProps> = ({
  entries,
  beginString,
  onRemove,
  onUpdate,
}) => {
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'error'>(
    'idle'
  );

  const sortedEntries = useMemo(() => {
    const header: FixTagEntry[] = [];
    const body: FixTagEntry[] = [];
    const trailer: FixTagEntry[] = [];
    const hasBeginTag = entries.some((entry) => entry.tag === '8');

    if (beginString && !hasBeginTag) {
      header.push({
        tag: '8',
        value: beginString,
        name: 'BeginString',
      });
    }

    entries.forEach((entry) => {
      const bucket = HEADER_TAGS.includes(entry.tag)
        ? header
        : TRAILER_TAGS.includes(entry.tag)
          ? trailer
          : body;

      bucket.push(entry);
    });

    header.sort(
      (a, b) => HEADER_TAGS.indexOf(a.tag) - HEADER_TAGS.indexOf(b.tag)
    );
    body.sort((a, b) => Number(a.tag) - Number(b.tag));

    return [...header, ...body, ...trailer];
  }, [entries, beginString]);

  const fixMessage = useMemo(() => {
    return sortedEntries
      .map((entry) => `${entry.tag}=${entry.value}`)
      .join('|');
  }, [sortedEntries]);

  const sohPayload = useMemo(() => {
    return sortedEntries.map((entry) => `${entry.tag}=${entry.value}`).join('');
  }, [sortedEntries]);

  const handleCopy = async () => {
    if (!sohPayload) {
      return;
    }

    try {
      await navigator.clipboard.writeText(sohPayload);
      setCopyState('copied');
      setTimeout(() => setCopyState('idle'), 2000);
    } catch (error) {
      console.error('Erro ao copiar payload FIX', error);
      setCopyState('error');
      setTimeout(() => setCopyState('idle'), 2000);
    }
  };

  return (
    <S.Container>
      <S.Header>
        <S.Title>
          <span>Mensagem FIX</span>
          {sortedEntries.length > 0 && (
            <S.Counter>({sortedEntries.length} tags)</S.Counter>
          )}
        </S.Title>
        <S.CopyButton
          type="button"
          onClick={handleCopy}
          disabled={!sortedEntries.length}
        >
          {copyState === 'copied'
            ? 'Copiado!'
            : copyState === 'error'
              ? 'Tente novamente'
              : 'Copiar FIX'}
        </S.CopyButton>
      </S.Header>

      <S.Content aria-live="polite">
        <AnimatePresence initial={false}>
          {sortedEntries.length === 0 ? (
            <S.Empty
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              Nenhuma tag adicionada. Use o formulário para começar.
            </S.Empty>
          ) : (
            sortedEntries.map((entry) => {
              const isValueEmpty = entry.value.trim() === '';
              const tagName = entry.name || `Tag ${entry.tag}`;
              const tagDescription = entry.description?.trim()
                ? entry.description
                : 'Descrição não disponível para esta tag.';
              const tooltip = `${tagName} — ${tagDescription}`;

              return (
                <S.TagWrapper
                  key={entry.tag}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                >
                  <S.Tag
                    $isEmpty={isValueEmpty}
                    title={tooltip}
                    aria-label={tooltip}
                  >
                    <S.TagKey>{entry.tag}</S.TagKey>
                    <S.TagEq>=</S.TagEq>
                    <S.TagValue
                      $isEmpty={isValueEmpty}
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(event) => {
                        const newValue = event.currentTarget.textContent ?? '';
                        if (newValue !== entry.value) {
                          onUpdate(entry.tag, newValue.trim());
                        }
                      }}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter') {
                          event.preventDefault();
                          event.currentTarget.blur();
                        }
                      }}
                    >
                      {entry.value}
                    </S.TagValue>
                  </S.Tag>
                  {entry.tag !== '8' && (
                    <S.Remove
                      type="button"
                      onClick={() => onRemove(entry.tag)}
                      aria-label={`Remover tag ${entry.tag}`}
                    >
                      x
                    </S.Remove>
                  )}
                </S.TagWrapper>
              );
            })
          )}
        </AnimatePresence>
      </S.Content>

      {fixMessage && (
        <S.PreviewText>
          Visualização: {fixMessage.split('|').join(' | ')}
        </S.PreviewText>
      )}
    </S.Container>
  );
};

export default DisplayFix;
