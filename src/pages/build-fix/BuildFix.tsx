import React, { useMemo, useState } from 'react';
import Input from '../../components/input/Input';
import DisplayFix from '../../components/display-fix/DisplayFix';
import DisplayMessages from '../../components/display-messages/DisplayMessages';
import Card from '../../components/card/Card';
import Button from '../../components/button/Button';
import type {
  FixTagEntry,
  MarketOption,
  MessageOption,
} from '../../types/pages/build-fix';
import {
  MARKET_OPTIONS,
  MESSAGE_LABELS,
} from '../../constants/pages/build-fix';
import type { FixTag } from '../../types/data/fix-protocols';
import type { SavedFixMessage } from '../../types/components/display-messages';
import * as S from './BuildFix.styled';

const buildMessageOptions = (market?: MarketOption): MessageOption[] => {
  if (!market?.messages) {
    return [];
  }

  return Object.entries(market.messages).map(([key, definition]) => ({
    key,
    msgType: definition.msgType,
    tags: definition.tags,
    label: MESSAGE_LABELS[key]?.label ?? `${key} (35=${definition.msgType})`,
    note: MESSAGE_LABELS[key]?.note,
  }));
};

const getDefaultValueForTag = (tag?: FixTag) => {
  if (!tag) {
    return '';
  }
  if (tag.allowedValues?.length) {
    return tag.allowedValues[0].value;
  }
  return '';
};

const buildRequiredEntries = (
  message?: MessageOption,
  beginString?: string
): FixTagEntry[] => {
  if (!message) {
    return [];
  }

  return message.tags
    .filter((tag) => tag.required)
    .map((tag) => {
      const isMsgType = tag.tag === '35';
      const isBeginString = tag.tag === '8';
      return {
        tag: tag.tag,
        value: isMsgType
          ? message.msgType
          : isBeginString && beginString
            ? beginString
            : '',
        name: tag.name ?? `Tag ${tag.tag}`,
        description: tag.description,
        required: true,
      };
    });
};

const BuildFix: React.FC = () => {
  const [marketId, setMarketId] = useState(MARKET_OPTIONS[0].id);
  const selectedMarket = useMemo(
    () =>
      MARKET_OPTIONS.find((market) => market.id === marketId) ??
      MARKET_OPTIONS[0],
    [marketId]
  );

  const messageOptions = useMemo(
    () => buildMessageOptions(selectedMarket),
    [selectedMarket]
  );

  const [messageKey, setMessageKey] = useState(
    () => messageOptions[0]?.key ?? ''
  );
  const [selectedTag, setSelectedTag] = useState(
    () => messageOptions[0]?.tags[0]?.tag ?? ''
  );
  const [tagValue, setTagValue] = useState(() =>
    getDefaultValueForTag(messageOptions[0]?.tags[0])
  );
  const [entries, setEntries] = useState<FixTagEntry[]>(() =>
    buildRequiredEntries(messageOptions[0], selectedMarket?.beginString)
  );
  const [error, setError] = useState('');
  const [savedMessages, setSavedMessages] = useState<SavedFixMessage[]>([]);

  const selectedMessage = useMemo(() => {
    if (!messageOptions.length) {
      return undefined;
    }
    return (
      messageOptions.find((option) => option.key === messageKey) ??
      messageOptions[0]
    );
  }, [messageKey, messageOptions]);

  const currentTag: FixTag | undefined = useMemo(() => {
    if (!selectedMessage) {
      return undefined;
    }
    return selectedMessage.tags.find((tag) => tag.tag === selectedTag);
  }, [selectedMessage, selectedTag]);

  const applyMessageDefaults = (message?: MessageOption) => {
    const firstTag = message?.tags[0];
    setSelectedTag(firstTag?.tag ?? '');
    setTagValue(getDefaultValueForTag(firstTag));
  };

  const handleMarketChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const nextId = event.target.value;
    const nextMarket = MARKET_OPTIONS.find((market) => market.id === nextId);
    if (!nextMarket || nextMarket.disabled) {
      return;
    }

    const nextOptions = buildMessageOptions(nextMarket);
    const nextMessage = nextOptions[0];

    setMarketId(nextId);
    setMessageKey(nextMessage?.key ?? '');
    applyMessageDefaults(nextMessage);
    setEntries(buildRequiredEntries(nextMessage, nextMarket?.beginString));
    setError('');
  };

  const handleMessageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const nextKey = event.target.value;
    const nextMessage = messageOptions.find((option) => option.key === nextKey);
    setMessageKey(nextKey);
    applyMessageDefaults(nextMessage);
    setEntries(buildRequiredEntries(nextMessage, selectedMarket?.beginString));
    setError('');
  };

  const handleTagChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const nextTag = event.target.value;
    setSelectedTag(nextTag);
    const nextDefinition = selectedMessage?.tags.find(
      (tag) => tag.tag === nextTag
    );
    setTagValue(getDefaultValueForTag(nextDefinition));
    setError('');
  };

  const handleAddTag = () => {
    if (!currentTag) {
      return;
    }

    if (!tagValue.trim()) {
      setError('Informe um valor para a tag selecionada.');
      return;
    }

    if (currentTag.allowedValues?.length) {
      const isAllowed = currentTag.allowedValues.some(
        (option) => option.value === tagValue
      );
      if (!isAllowed) {
        setError('Escolha um valor permitido para esta tag.');
        return;
      }
    }

    setEntries((prev) => {
      const withoutCurrent = prev.filter(
        (entry) => entry.tag !== currentTag.tag
      );
      const entryName = currentTag.name ?? `Tag ${currentTag.tag}`;
      return [
        ...withoutCurrent,
        {
          tag: currentTag.tag,
          value: tagValue.trim(),
          name: entryName,
          description: currentTag.description,
          required: Boolean(currentTag.required),
        },
      ];
    });

    setError('');
    if (!currentTag.allowedValues?.length) {
      setTagValue('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setEntries((prev) => prev.filter((entry) => entry.tag !== tag));
  };

  const handleUpdateTagValue = (tag: string, newValue: string) => {
    setEntries((prev) =>
      prev.map((entry) =>
        entry.tag === tag ? { ...entry, value: newValue } : entry
      )
    );
    setError('');
  };

  const handleSaveMessage = (fixMessage: string, sohPayload: string) => {
    const nextId =
      typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : `msg-${Date.now()}-${Math.random().toString(16).slice(2)}`;

    const createdAt = new Date().toISOString();

    setSavedMessages((prev) => [
      {
        id: nextId,
        fixMessage,
        sohPayload,
        createdAt,
      },
      ...prev,
    ]);
  };

  const renderValueField = () => {
    if (!currentTag) {
      return null;
    }

    if (currentTag.allowedValues?.length) {
      return (
        <S.Field>
          <S.FieldLabel>Valor permitido</S.FieldLabel>
          <S.Select
            value={tagValue}
            onChange={(event) => {
              setTagValue(event.target.value);
              setError('');
            }}
          >
            {currentTag.allowedValues.map((option) => (
              <option key={option.value} value={option.value}>
                {option.value}
                {option.label ? ` — ${option.label}` : ''}
              </option>
            ))}
          </S.Select>
        </S.Field>
      );
    }

    const inputType = currentTag.inputType === 'number' ? 'number' : 'text';

    return (
      <Input
        label="Valor da tag"
        value={tagValue}
        type={inputType}
        placeholder={currentTag.placeholder || 'Digite o valor desejado'}
        onChange={(event) => {
          setTagValue(event.target.value);
          setError('');
        }}
        error={error}
      />
    );
  };

  return (
    <S.Container>
      <S.Hero>
        <S.Kicker>Build FIX</S.Kicker>
        <S.ResponsiveHeroTitle>
          Monte sua mensagem FIX em segundos
        </S.ResponsiveHeroTitle>
        <S.HeroText>
          Selecione o mercado, defina o tipo de mensagem FIX, escolha as tags
          necessárias, valide os valores permitidos e copie o payload formatado
          para enviar pelo seu canal favorito.
        </S.HeroText>
      </S.Hero>

      <DisplayMessages messages={savedMessages} />

      <DisplayFix
        entries={entries}
        beginString={selectedMarket?.beginString}
        onRemove={handleRemoveTag}
        onUpdate={handleUpdateTagValue}
        onAddMessage={handleSaveMessage}
      />

      <S.Grid>
        <Card title="1. Escolha o mercado">
          <S.CardDescription>
            Defina a bolsa para carregarmos o protocolo e as mensagens FIX
            corretas.
          </S.CardDescription>
          <S.Field>
            <S.FieldLabel>Mercado</S.FieldLabel>
            <S.Select value={marketId} onChange={handleMarketChange}>
              {MARKET_OPTIONS.map((market) => (
                <option
                  key={market.id}
                  value={market.id}
                  disabled={market.disabled}
                >
                  {market.label}
                  {market.disabled ? ' (em breve)' : ''}
                </option>
              ))}
            </S.Select>
          </S.Field>
          {selectedMarket && (
            <S.ProtocolHint>{selectedMarket.description}</S.ProtocolHint>
          )}
        </Card>

        <Card title="2. Tipo da mensagem (35=...)">
          <S.CardDescription>
            Cada tipo exige um conjunto específico de tags. Selecione o fluxo
            desejado.
          </S.CardDescription>
          <S.Field>
            <S.FieldLabel>Mensagem FIX</S.FieldLabel>
            <S.Select
              value={selectedMessage ? messageKey : ''}
              onChange={handleMessageChange}
              disabled={!selectedMessage}
            >
              {messageOptions.map((option) => (
                <option key={option.key} value={option.key}>
                  {option.label}
                  {option.note ? ` • ${option.note}` : ''}
                </option>
              ))}
            </S.Select>
          </S.Field>
          {selectedMessage?.note && (
            <S.ProtocolHint>{selectedMessage.note}</S.ProtocolHint>
          )}
        </Card>

        <Card title="3. Selecione a tag">
          <S.CardDescription>
            Use tags específicas para o fluxo escolhido e informe os valores
            válidos.
          </S.CardDescription>
          <S.Field>
            <S.FieldLabel>Tag FIX</S.FieldLabel>
            <S.Select
              value={selectedTag}
              onChange={handleTagChange}
              disabled={!selectedMessage}
            >
              {selectedMessage?.tags.map((tag) => (
                <option key={tag.tag} value={tag.tag}>
                  {tag.tag}
                  {tag.name ? ` — ${tag.name}` : ''}
                </option>
              ))}
            </S.Select>
          </S.Field>

          {currentTag && (
            <S.TagDetails>
              <S.TagTitle>
                Tag {currentTag.tag}
                {currentTag.name ? ` • ${currentTag.name}` : ''}
              </S.TagTitle>
              <S.TagDescription>{currentTag.description}</S.TagDescription>
              {currentTag.allowedValues && (
                <S.ChipList>
                  {currentTag.allowedValues.map((option) => (
                    <S.Chip key={option.value}>
                      {option.value}
                      {option.label ? ` — ${option.label}` : ''}
                    </S.Chip>
                  ))}
                </S.ChipList>
              )}
              {renderValueField()}
              {error && currentTag.allowedValues && (
                <S.FormError>{error}</S.FormError>
              )}
              <Button size="small" onClick={handleAddTag}>
                Adicionar tag
              </Button>
            </S.TagDetails>
          )}
        </Card>
      </S.Grid>
    </S.Container>
  );
};

export default BuildFix;
