import React, { useMemo, useState } from 'react';
import Card from '../components/card/Card';
import Button from '../components/button/Button';
import Input from '../components/input/Input';
import { FIX_4_4_B3, type FixTag } from '../data/fixProtocols';
import './BuildFix.css';

type TagEntry = {
  tag: string;
  value: string;
  name: string;
  description?: string;
};

type FixMessageMap = Record<string, { msgType: string; tags: FixTag[] }>;

type MarketOption = {
  id: string;
  label: string;
  description: string;
  beginString: string;
  disabled?: boolean;
  messages?: FixMessageMap;
};

type MessageOption = {
  key: string;
  label: string;
  note?: string;
  msgType: string;
  tags: FixTag[];
};

const MESSAGE_LABELS: Record<string, { label: string; note?: string }> = {
  newOrderSingle: {
    label: 'New Order Single (35=D)',
    note: 'Inserção de ordens regulares via Order Entry',
  },
  orderCancelRequest: {
    label: 'Order Cancel Request (35=F)',
    note: 'Solicitação de cancelamento de ordens vivas',
  },
  orderCancelReplaceRequest: {
    label: 'Order Cancel/Replace (35=G)',
    note: 'Alteração de ordens (amenda quantidade/preço)',
  },
  executionReport: {
    label: 'Execution Report (35=8)',
    note: 'Confirmações enviadas pela bolsa',
  },
  orderCancelReject: {
    label: 'Order Cancel Reject (35=9)',
    note: 'Rejeições de cancelamento',
  },
};

const MARKET_OPTIONS: MarketOption[] = [
  {
    id: 'b3',
    label: 'B3',
    description: 'Renda variável e derivativos negociados na B3 (FIX 4.4).',
    beginString: 'FIX.4.4',
    messages: FIX_4_4_B3,
  },
  {
    id: 'baseExchange',
    label: 'Base Exchange',
    description: 'Integração proprietária baseada em FIX 4.2.',
    beginString: 'FIX.4.2',
    disabled: true,
  },
  {
    id: 'a5x',
    label: 'A5X Global',
    description: 'Roteamento multi-market (FIX 5.0 SP2).',
    beginString: 'FIXT.1.1',
    disabled: true,
  },
];

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
  const [entries, setEntries] = useState<TagEntry[]>([]);
  const [error, setError] = useState('');
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'error'>(
    'idle'
  );

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

  const orderedEntries = useMemo(
    () => [...entries].sort((a, b) => Number(a.tag) - Number(b.tag)),
    [entries]
  );

  const fixPreview = useMemo(() => {
    const begin = selectedMarket ? `8=${selectedMarket.beginString}` : '';
    const body = orderedEntries.map((entry) => `${entry.tag}=${entry.value}`);
    return [begin, ...body].filter(Boolean).join(' | ');
  }, [orderedEntries, selectedMarket]);

  const sohMessage = fixPreview.replace(/ \| /g, '\u0001');

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
    setEntries([]);
    setError('');
  };

  const handleMessageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const nextKey = event.target.value;
    const nextMessage = messageOptions.find((option) => option.key === nextKey);
    setMessageKey(nextKey);
    applyMessageDefaults(nextMessage);
    setEntries([]);
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

  const handleCopy = async () => {
    if (!fixPreview) {
      return;
    }

    try {
      await navigator.clipboard.writeText(sohMessage);
      setCopyState('copied');
      setTimeout(() => setCopyState('idle'), 2200);
    } catch (error) {
      console.error('Erro ao copiar FIX message', error);
      setCopyState('error');
      setTimeout(() => setCopyState('idle'), 2200);
    }
  };

  const renderValueField = () => {
    if (!currentTag) {
      return null;
    }

    if (currentTag.allowedValues?.length) {
      return (
        <label className="build-fix__field">
          <span>Valor permitido</span>
          <select
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
          </select>
        </label>
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
    <div className="build-fix">
      <section className="build-fix__hero">
        <p className="build-fix__kicker">Build FIX</p>
        <h1>Monte sua mensagem FIX em segundos</h1>
        <p>
          Selecione o mercado, defina o tipo de mensagem FIX, escolha as tags
          necessárias, valide os valores permitidos e copie o payload formatado
          para enviar pelo seu canal favorito.
        </p>
      </section>

      <div className="build-fix__grid">
        <Card title="1. Escolha o mercado">
          <p className="build-fix__card-description">
            Defina a bolsa para carregarmos o protocolo e as mensagens FIX
            corretas.
          </p>
          <label className="build-fix__field">
            <span>Mercado</span>
            <select value={marketId} onChange={handleMarketChange}>
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
            </select>
          </label>
          {selectedMarket && (
            <p className="build-fix__protocol-hint">
              {selectedMarket.description}
            </p>
          )}
        </Card>

        <Card title="2. Tipo da mensagem (35=...)">
          <p className="build-fix__card-description">
            Cada tipo exige um conjunto específico de tags. Selecione o fluxo
            desejado.
          </p>
          <label className="build-fix__field">
            <span>Mensagem FIX</span>
            <select
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
            </select>
          </label>
          {selectedMessage?.note && (
            <p className="build-fix__protocol-hint">{selectedMessage.note}</p>
          )}
        </Card>

        <Card title="3. Selecione a tag">
          <p className="build-fix__card-description">
            Use tags específicas para o fluxo escolhido e informe os valores
            válidos.
          </p>
          <label className="build-fix__field">
            <span>Tag FIX</span>
            <select
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
            </select>
          </label>

          {currentTag && (
            <div className="build-fix__tag-details">
              <h3>
                Tag {currentTag.tag}
                {currentTag.name ? ` • ${currentTag.name}` : ''}
              </h3>
              <p>{currentTag.description}</p>
              {currentTag.allowedValues && (
                <div className="build-fix__chip-list">
                  {currentTag.allowedValues.map((option) => (
                    <span key={option.value} className="build-fix__chip">
                      {option.value}
                      {option.label ? ` — ${option.label}` : ''}
                    </span>
                  ))}
                </div>
              )}
              {renderValueField()}
              {error && currentTag.allowedValues && (
                <p className="build-fix__form-error">{error}</p>
              )}
              <Button size="small" onClick={handleAddTag}>
                Adicionar tag
              </Button>
            </div>
          )}
        </Card>

        <Card title="4. Tags selecionadas">
          {entries.length === 0 ? (
            <p className="build-fix__empty">Nenhuma tag adicionada ainda.</p>
          ) : (
            <ul className="build-fix__list">
              {orderedEntries.map((entry) => (
                <li key={entry.tag}>
                  <div>
                    <strong>{entry.tag}</strong> = {entry.value}
                    <span>{entry.name}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(entry.tag)}
                  >
                    Remover
                  </button>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card title="5. Copie o payload">
          <p className="build-fix__card-description">
            Mostramos o separador <code>|</code> apenas para visualização. Ao
            copiar usamos o caractere SOH (\u0001).
          </p>
          <div className="build-fix__preview">
            {fixPreview
              ? fixPreview
              : 'Adicione tags para visualizar sua mensagem.'}
          </div>
          <Button
            variant="secondary"
            disabled={!fixPreview}
            onClick={handleCopy}
          >
            {copyState === 'copied' ? 'Copiado!' : 'Copiar mensagem'}
          </Button>
          {copyState === 'error' && (
            <p className="build-fix__error">
              Não foi possível copiar. Tente novamente.
            </p>
          )}
        </Card>
      </div>
    </div>
  );
};

export default BuildFix;
