import { FIX_4_4_B3 } from '../../data/fixProtocols';
import type { MarketOption } from '../../types/pages/build-fix';

export const MESSAGE_LABELS: Record<string, { label: string; note?: string }> =
  {
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

export const MARKET_OPTIONS: MarketOption[] = [
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
