export type FixValueOption = {
  value: string;
  label: string;
  description?: string;
};

export type FixTag = {
  tag: string;
  name?: string;
  description?: string;
  required?: boolean;
  inputType?: 'number' | 'string' | 'datetime' | 'boolean';
  placeholder?: string;
  allowedValues?: { value: string; label?: string }[];
  group?: boolean;
  parent?: string;
};

export type FixProtocol = {
  id: string;
  label: string;
  version: string;
  beginString: string;
  description: string;
  tags: FixTag[];
};
// fix4_4_b3.ts
// Fonte: /mnt/data/Fixed_Income_OE_MessageReference_v2.3.pdf (B3 Trademate OrderEntry Message Spec v2.3)
// Estrutura: mensagens separadas por msgType, tags em lista achatada (group: true / parent: 'NNN')

export const FIX_4_4_B3 = {
  newOrderSingle: {
    msgType: 'D',
    tags: [
      // standard header
      { tag: '8', name: 'BeginString', required: true, placeholder: 'FIX.4.4' },
      { tag: '9', name: 'BodyLength', required: true, inputType: 'number' },
      { tag: '35', name: 'MsgType', required: true, placeholder: 'D' },
      { tag: '49', name: 'SenderCompID', required: true },
      {
        tag: '50',
        name: 'SenderSubID',
        required: false,
        description: 'Condicional (Voice)',
      },
      { tag: '56', name: 'TargetCompID', required: true },
      { tag: '34', name: 'MsgSeqNum', required: true, inputType: 'number' },
      { tag: '52', name: 'SendingTime', required: true, inputType: 'datetime' },

      // new order body
      {
        tag: '11',
        name: 'ClOrdID',
        required: true,
        description: 'ID único da ordem pelo participante',
      },
      { tag: '18', name: 'ExecInst', required: false },
      { tag: '38', name: 'OrderQty', required: true, inputType: 'number' },
      {
        tag: '40',
        name: 'OrdType',
        required: true,
        allowedValues: [{ value: '2', label: '2 - Limit' }],
      },
      {
        tag: '44',
        name: 'Price',
        required: false,
        inputType: 'number',
        description: 'Obrigatório para ordType=Limit',
      },
      {
        tag: '54',
        name: 'Side',
        required: true,
        allowedValues: [
          { value: '1', label: '1 - Buy' },
          { value: '2', label: '2 - Sell' },
        ],
      },
      {
        tag: '55',
        name: 'Symbol',
        required: true,
        placeholder: 'Código humano (ex: PETR4)',
      },
      {
        tag: '60',
        name: 'TransactTime',
        required: true,
        inputType: 'datetime',
      },
      {
        tag: '59',
        name: 'TimeInForce',
        required: false,
        allowedValues: [
          { value: '0', label: '0 - Day' },
          { value: 'L', label: 'L - Liquidity Seeking' },
        ],
      },
      { tag: '111', name: 'MaxFloor', required: false },
      {
        tag: '423',
        name: 'PriceType',
        required: false,
        allowedValues: [
          { value: '2', label: '2 - Units' },
          { value: '6', label: '6 - Spread' },
          { value: '9', label: '9 - Yield' },
        ],
      },
      { tag: '5129', name: 'Memo', required: false },

      // parties group (achatado)
      { tag: '453', name: 'NoPartyIDs', required: true, group: true },
      { tag: '448', name: 'PartyID', parent: '453', required: true },
      {
        tag: '447',
        name: 'PartyIDSource',
        parent: '453',
        required: true,
        allowedValues: [{ value: 'D', label: 'D - Proprietary' }],
      },
      {
        tag: '452',
        name: 'PartyRole',
        parent: '453',
        required: true,
        allowedValues: [
          { value: '36', label: '36 - Entering Trader' },
          { value: '54', label: '54 - Sender Location' },
          { value: '58', label: '58 - Entering Desk' },
          { value: '59', label: '59 - Executing Desk' },
          { value: '76', label: '76 - Desk Id' },
          { value: '1005', label: '1005 - Strategy ID' },
        ],
      },

      // standard trailer
      { tag: '10', name: 'CheckSum', required: true },
    ] as FixTag[],
  },

  orderCancelRequest: {
    msgType: 'F',
    tags: [
      // header
      { tag: '8', name: 'BeginString', required: true },
      { tag: '9', name: 'BodyLength', required: true, inputType: 'number' },
      { tag: '35', name: 'MsgType', required: true, placeholder: 'F' },
      { tag: '49', name: 'SenderCompID', required: true },
      { tag: '56', name: 'TargetCompID', required: true },
      { tag: '34', name: 'MsgSeqNum', required: true },
      { tag: '52', name: 'SendingTime', required: true, inputType: 'datetime' },

      // cancel body
      {
        tag: '11',
        name: 'ClOrdID',
        required: true,
        description: 'ID da solicitação de cancelamento',
      },
      {
        tag: '41',
        name: 'OrigClOrdID',
        required: false,
        description: 'ClOrdID da ordem original',
      },
      { tag: '38', name: 'OrderQty', required: true, inputType: 'number' },
      {
        tag: '54',
        name: 'Side',
        required: true,
        allowedValues: [
          { value: '1', label: 'Buy' },
          { value: '2', label: 'Sell' },
        ],
      },
      { tag: '55', name: 'Symbol', required: true },
      {
        tag: '60',
        name: 'TransactTime',
        required: true,
        inputType: 'datetime',
      },

      // re-use parties group
      { tag: '453', name: 'NoPartyIDs', required: true, group: true },
      { tag: '448', name: 'PartyID', parent: '453', required: true },
      { tag: '447', name: 'PartyIDSource', parent: '453', required: true },
      { tag: '452', name: 'PartyRole', parent: '453', required: true },

      { tag: '10', name: 'CheckSum', required: true },
    ] as FixTag[],
  },

  orderCancelReplaceRequest: {
    msgType: 'G',
    tags: [
      // header
      { tag: '8', name: 'BeginString', required: true },
      { tag: '9', name: 'BodyLength', required: true },
      { tag: '35', name: 'MsgType', required: true, placeholder: 'G' },
      { tag: '49', name: 'SenderCompID', required: true },
      { tag: '56', name: 'TargetCompID', required: true },
      { tag: '34', name: 'MsgSeqNum', required: true },
      { tag: '52', name: 'SendingTime', required: true, inputType: 'datetime' },

      // body
      { tag: '11', name: 'ClOrdID', required: true },
      {
        tag: '41',
        name: 'OrigClOrdID',
        required: true,
        description: 'ClOrdID que será substituído',
      },
      { tag: '38', name: 'OrderQty', required: true },
      {
        tag: '40',
        name: 'OrdType',
        required: true,
        allowedValues: [{ value: '2', label: '2 - Limit' }],
      },
      { tag: '44', name: 'Price', required: false },
      { tag: '54', name: 'Side', required: true },
      { tag: '55', name: 'Symbol', required: true },
      { tag: '60', name: 'TransactTime', required: true },

      { tag: '111', name: 'MaxFloor' },
      { tag: '5149', name: 'Memo' },

      // parties group
      { tag: '453', name: 'NoPartyIDs', required: true, group: true },
      { tag: '448', name: 'PartyID', parent: '453', required: true },
      { tag: '447', name: 'PartyIDSource', parent: '453', required: true },
      { tag: '452', name: 'PartyRole', parent: '453', required: true },

      { tag: '10', name: 'CheckSum', required: true },
    ] as FixTag[],
  },

  executionReport: {
    msgType: '8',
    tags: [
      // header
      { tag: '8', name: 'BeginString', required: true },
      { tag: '9', name: 'BodyLength', required: true },
      { tag: '35', name: 'MsgType', required: true, placeholder: '8' },
      { tag: '49', name: 'SenderCompID', required: true },
      { tag: '56', name: 'TargetCompID', required: true },
      { tag: '34', name: 'MsgSeqNum', required: true },
      { tag: '52', name: 'SendingTime', required: true },

      // body
      {
        tag: '37',
        name: 'OrderID',
        required: true,
        description: 'Order ID assigned by exchange',
      },
      { tag: '198', name: 'SecondaryOrderID', required: false },
      { tag: '11', name: 'ClOrdID', required: true },
      { tag: '41', name: 'OrigClOrdID', required: false },
      { tag: '31', name: 'LastPx', required: false },
      { tag: '32', name: 'LastQty', required: false },
      { tag: '5149', name: 'Memo', required: false },
      { tag: '111', name: 'MaxFloor', required: false },

      // parties
      { tag: '453', name: 'NoPartyIDs', required: true, group: true },
      { tag: '448', name: 'PartyID', parent: '453', required: true },
      { tag: '447', name: 'PartyIDSource', parent: '453', required: true },
      { tag: '452', name: 'PartyRole', parent: '453', required: true },

      { tag: '17', name: 'ExecID', required: true },
      { tag: '19', name: 'ExecRefID' },
      {
        tag: '150',
        name: 'ExecType',
        required: true,
        allowedValues: [
          { value: '0', label: '0 - New' },
          { value: '4', label: '4 - Canceled' },
          { value: '5', label: '5 - Replace' },
          { value: '8', label: '8 - Rejected' },
          { value: 'F', label: 'F - Trade' },
          { value: 'H', label: 'H - Trade Cancel' },
        ],
      },
      { tag: '18', name: 'ExecInst', required: false },
      {
        tag: '39',
        name: 'OrdStatus',
        required: true,
        allowedValues: [
          { value: '0', label: '0 - New' },
          { value: '1', label: '1 - Partially Filled' },
          { value: '2', label: '2 - Filled' },
          { value: '4', label: '4 - Canceled' },
          { value: '5', label: '5 - Replaced' },
          { value: '8', label: '8 - Rejected' },
        ],
      },
      { tag: '55', name: 'Symbol', required: true },
      { tag: '48', name: 'SecurityID', required: false },
      {
        tag: '54',
        name: 'Side',
        required: true,
        allowedValues: [
          { value: '1', label: 'Buy' },
          { value: '2', label: 'Sell' },
        ],
      },
      { tag: '38', name: 'OrderQty', required: true },
      {
        tag: '40',
        name: 'OrdType',
        required: true,
        allowedValues: [
          { value: '2', label: '2 - Limit' },
          { value: 'Q', label: 'Q - Counter Order Selection' },
        ],
      },
      { tag: '423', name: 'PriceType', required: false },
      { tag: '44', name: 'Price', required: false },
      { tag: '59', name: 'TimeInForce', required: false },
      { tag: '151', name: 'LeavesQty', required: true },
      { tag: '14', name: 'CumQty', required: true },
      {
        tag: '6',
        name: 'AvgPx',
        required: true,
        description: 'Always 0 (zero) per doc',
      },
      { tag: '75', name: 'TradeDate', required: false },
      { tag: '60', name: 'TransactTime', required: false },
      { tag: '6032', name: 'UniqueTradeID', required: false },
      { tag: '1180', name: 'ApplID', required: false },
      { tag: '58', name: 'Text', required: false },
      { tag: '494', name: 'Designation', required: false },
      { tag: '513', name: 'RegistID', required: false },
      { tag: '548', name: 'CrossID', required: false },
      { tag: '551', name: 'OrigCrossID', required: false },

      // legs & nested groups (achatado)
      { tag: '555', name: 'NoLegs', required: false, group: true },
      { tag: '600', name: 'LegSymbol', parent: '555' },
      { tag: '624', name: 'LegSide', parent: '555' },
      { tag: '687', name: 'LegQty', parent: '555' },
      { tag: '566', name: 'LegPrice', parent: '555' },
      { tag: '654', name: 'LegRefID', parent: '555' },

      { tag: '539', name: 'NoNestedPartyIDs', required: false, group: true },
      { tag: '524', name: 'NestedPartyID', parent: '539' },
      {
        tag: '525',
        name: 'NestedPartyIDSource',
        parent: '539',
        allowedValues: [{ value: 'D', label: 'Proprietary' }],
      },
      {
        tag: '538',
        name: 'NestedPartyRole',
        parent: '539',
        allowedValues: [{ value: '7', label: '7 - Entering Firm' }],
      },

      { tag: '236', name: 'Yield', required: false },
      {
        tag: '63',
        name: 'SettlType',
        required: true,
        allowedValues: [
          { value: '0', label: '0 - Regular' },
          { value: '1', label: '1 - T+0' },
          { value: '2', label: '2 - T+1' },
          { value: '3', label: '3 - T+2' },
          { value: '4', label: '4 - T+3' },
          { value: 'B', label: 'B - BrokenDate' },
        ],
      },
      { tag: '64', name: 'SettlDate', required: false },

      { tag: '377', name: 'SolicitedFlag', required: false },

      { tag: '10', name: 'CheckSum', required: true },
    ] as FixTag[],
  },

  orderCancelReject: {
    msgType: '9',
    tags: [
      { tag: '8', name: 'BeginString', required: true },
      { tag: '9', name: 'BodyLength', required: true },
      { tag: '35', name: 'MsgType', required: true, placeholder: '9' },
      { tag: '49', name: 'SenderCompID', required: true },
      { tag: '56', name: 'TargetCompID', required: true },
      { tag: '34', name: 'MsgSeqNum', required: true },
      { tag: '52', name: 'SendingTime', required: true },

      { tag: '37', name: 'OrderID', required: true },
      { tag: '198', name: 'SecondaryOrderID' },
      { tag: '11', name: 'ClOrdID', required: true },
      { tag: '41', name: 'OrigClOrdID', required: false },
      { tag: '39', name: 'OrdStatus', required: true },
      { tag: '434', name: 'CxlRejResponseTo', required: true },
      { tag: '102', name: 'CxlRejReason', required: false },
      { tag: '58', name: 'Text', required: false },
      { tag: '54', name: 'Side', required: false },
      { tag: '55', name: 'Symbol', required: true },
      { tag: '48', name: 'SecurityID', required: false },
      { tag: '38', name: 'OrderQty', required: true },

      { tag: '10', name: 'CheckSum', required: true },
    ] as FixTag[],
  },

  businessMessageReject: {
    msgType: 'j',
    tags: [
      { tag: '8', name: 'BeginString', required: true },
      { tag: '9', name: 'BodyLength', required: true },
      { tag: '35', name: 'MsgType', required: true, placeholder: 'j' },
      { tag: '49', name: 'SenderCompID', required: true },
      { tag: '56', name: 'TargetCompID', required: true },
      { tag: '34', name: 'MsgSeqNum', required: true },
      { tag: '52', name: 'SendingTime', required: true },

      { tag: '45', name: 'RefSeqNum', required: false },
      { tag: '372', name: 'RefMsgType', required: true },
      { tag: '380', name: 'BusinessRejectReason', required: true },
      { tag: '58', name: 'Text', required: false },

      { tag: '10', name: 'CheckSum', required: true },
    ] as FixTag[],
  },

  // Session-level messages
  logon: {
    msgType: 'A',
    tags: [
      { tag: '8', name: 'BeginString', required: true },
      { tag: '9', name: 'BodyLength', required: true },
      { tag: '35', name: 'MsgType', required: true, placeholder: 'A' },
      { tag: '49', name: 'SenderCompID', required: true },
      { tag: '56', name: 'TargetCompID', required: true },
      { tag: '34', name: 'MsgSeqNum', required: true },
      { tag: '52', name: 'SendingTime', required: true },
      {
        tag: '98',
        name: 'EncryptMethod',
        required: true,
        allowedValues: [{ value: '0', label: '0 - None' }],
      },
      {
        tag: '108',
        name: 'HeartBtInt',
        required: true,
        inputType: 'number',
        placeholder: '30',
      },
      { tag: '141', name: 'ResetSeqNumFlag', required: false },
      { tag: '553', name: 'Username', required: false },
      { tag: '554', name: 'Password', required: false },
      {
        tag: '35002',
        name: 'CancelOnDisconnectType',
        required: false,
        allowedValues: [
          { value: '0', label: "0 - Doesn't cancel" },
          { value: '1', label: '1 - Cancel' },
        ],
      },
      {
        tag: '35003',
        name: 'CancelOnDisconnectTimeoutWindow',
        required: false,
      },
      { tag: '10', name: 'CheckSum', required: true },
    ] as FixTag[],
  },

  logout: {
    msgType: '5',
    tags: [
      { tag: '8', name: 'BeginString', required: true },
      { tag: '9', name: 'BodyLength', required: true },
      { tag: '35', name: 'MsgType', required: true, placeholder: '5' },
      { tag: '49', name: 'SenderCompID', required: true },
      { tag: '56', name: 'TargetCompID', required: true },
      { tag: '34', name: 'MsgSeqNum', required: true },
      { tag: '52', name: 'SendingTime', required: true },
      { tag: '58', name: 'Text', required: false },
      { tag: '10', name: 'CheckSum', required: true },
    ] as FixTag[],
  },

  heartbeat: {
    msgType: '0',
    tags: [
      { tag: '8', name: 'BeginString', required: true },
      { tag: '9', name: 'BodyLength', required: true },
      { tag: '35', name: 'MsgType', required: true, placeholder: '0' },
      { tag: '49', name: 'SenderCompID', required: true },
      { tag: '56', name: 'TargetCompID', required: true },
      { tag: '34', name: 'MsgSeqNum', required: true },
      { tag: '52', name: 'SendingTime', required: true },
      { tag: '10', name: 'CheckSum', required: true },
    ] as FixTag[],
  },

  testRequest: {
    msgType: '1',
    tags: [
      { tag: '8', name: 'BeginString', required: true },
      { tag: '9', name: 'BodyLength', required: true },
      { tag: '35', name: 'MsgType', required: true, placeholder: '1' },
      { tag: '49', name: 'SenderCompID', required: true },
      { tag: '56', name: 'TargetCompID', required: true },
      { tag: '34', name: 'MsgSeqNum', required: true },
      { tag: '52', name: 'SendingTime', required: true },
      { tag: '112', name: 'TestReqID', required: true },
      { tag: '10', name: 'CheckSum', required: true },
    ] as FixTag[],
  },

  resendRequest: {
    msgType: '2',
    tags: [
      { tag: '8', name: 'BeginString', required: true },
      { tag: '9', name: 'BodyLength', required: true },
      { tag: '35', name: 'MsgType', required: true, placeholder: '2' },
      { tag: '49', name: 'SenderCompID', required: true },
      { tag: '56', name: 'TargetCompID', required: true },
      { tag: '34', name: 'MsgSeqNum', required: true },
      { tag: '52', name: 'SendingTime', required: true },
      { tag: '17', name: 'BeginSeqNo', required: true },
      { tag: '16', name: 'EndSeqNo', required: true },
      { tag: '10', name: 'CheckSum', required: true },
    ] as FixTag[],
  },

  sequenceReset: {
    msgType: '4',
    tags: [
      { tag: '8', name: 'BeginString', required: true },
      { tag: '9', name: 'BodyLength', required: true },
      { tag: '35', name: 'MsgType', required: true, placeholder: '4' },
      { tag: '49', name: 'SenderCompID', required: true },
      { tag: '56', name: 'TargetCompID', required: true },
      { tag: '34', name: 'MsgSeqNum', required: true },
      { tag: '52', name: 'SendingTime', required: true },
      { tag: '43', name: 'PossDupFlag', required: false },
      { tag: '122', name: 'OrigSendingTime', required: false },
      { tag: '123', name: 'GapFillFlag', required: false },
      { tag: '36', name: 'NewSeqNo', required: true },
      { tag: '10', name: 'CheckSum', required: true },
    ] as FixTag[],
  },

  // VOICE messages
  newOrderCross: {
    msgType: 's',
    tags: [
      { tag: '8', name: 'BeginString', required: true },
      { tag: '9', name: 'BodyLength', required: true },
      { tag: '35', name: 'MsgType', required: true, placeholder: 's' },
      { tag: '49', name: 'SenderCompID', required: true },
      { tag: '56', name: 'TargetCompID', required: true },
      { tag: '34', name: 'MsgSeqNum', required: true },
      { tag: '52', name: 'SendingTime', required: true },

      { tag: '548', name: 'CrossID', required: true },
      {
        tag: '549',
        name: 'CrossType',
        required: true,
        allowedValues: [
          {
            value: '1',
            label: '1 - Cross Trade Which Is Executed Completely or Not',
          },
        ],
      },
      {
        tag: '550',
        name: 'CrossPrioritization',
        required: true,
        allowedValues: [{ value: '0', label: '0 - None' }],
      },

      // sides
      { tag: '552', name: 'NoSides', required: true, group: true },
      { tag: '54', name: 'Side', parent: '552', required: true },
      { tag: '11', name: 'ClOrdID', parent: '552', required: true },
      {
        tag: '453',
        name: 'NoPartyIDs',
        parent: '552',
        required: true,
        group: true,
      },
      { tag: '448', name: 'PartyID', parent: '453', required: true },
      { tag: '447', name: 'PartyIDSource', parent: '453', required: true },
      { tag: '452', name: 'PartyRole', parent: '453', required: true },

      { tag: '38', name: 'OrderQty', required: true },
      { tag: '55', name: 'Symbol', required: true },
      { tag: '48', name: 'SecurityID', required: false },
      {
        tag: '22',
        name: 'SecurityIDSource',
        required: false,
        allowedValues: [{ value: '8', label: '8 - Exchange Symbol' }],
      },

      { tag: '60', name: 'TransactTime', required: true },
      {
        tag: '40',
        name: 'OrdType',
        required: true,
        allowedValues: [{ value: 'Q', label: 'Q - Counter Order Selection' }],
      },
      { tag: '44', name: 'Price', required: false },
      { tag: '5149', name: 'Memo', required: false },
      { tag: '236', name: 'Yield', required: false },
      { tag: '63', name: 'SettlType', required: true },
      { tag: '64', name: 'SettlDate', required: false },
      { tag: '18', name: 'ExecInst', required: false },

      { tag: '117', name: 'QuoteID', required: false },

      { tag: '10', name: 'CheckSum', required: true },
    ] as FixTag[],
  },

  crossOrderCancelRequest: {
    msgType: 'u',
    tags: [
      { tag: '8', name: 'BeginString', required: true },
      { tag: '9', name: 'BodyLength', required: true },
      { tag: '35', name: 'MsgType', required: true, placeholder: 'u' },
      { tag: '49', name: 'SenderCompID', required: true },
      { tag: '56', name: 'TargetCompID', required: true },
      { tag: '34', name: 'MsgSeqNum', required: true },
      { tag: '52', name: 'SendingTime', required: true },

      { tag: '37', name: 'OrderID', required: true },
      { tag: '548', name: 'CrossID', required: true },
      { tag: '551', name: 'OrigCrossID', required: true },
      { tag: '549', name: 'CrossType', required: true },
      { tag: '550', name: 'CrossPrioritization', required: true },
      { tag: '552', name: 'NoSides', required: true, group: true },

      { tag: '54', name: 'Side', parent: '552', required: true },
      { tag: '41', name: 'OrigClOrdID', parent: '552', required: true },
      { tag: '11', name: 'ClOrdID', parent: '552', required: true },

      { tag: '38', name: 'OrderQty', required: true },
      { tag: '58', name: 'Text', required: true }, // mandatory on voice cancellation per doc
      { tag: '55', name: 'Symbol', required: true },

      { tag: '48', name: 'SecurityID', required: false },
      { tag: '22', name: 'SecurityIDSource', required: false },
      { tag: '207', name: 'SecurityExchange', required: false },

      { tag: '60', name: 'TransactTime', required: true },
      { tag: '961', name: 'HostCrossID', required: false },

      { tag: '10', name: 'CheckSum', required: true },
    ] as FixTag[],
  },

  executionAcknowledgement: {
    msgType: 'BN',
    tags: [
      { tag: '8', name: 'BeginString', required: true },
      { tag: '9', name: 'BodyLength', required: true },
      { tag: '35', name: 'MsgType', required: true, placeholder: 'BN' },
      { tag: '49', name: 'SenderCompID', required: true },
      { tag: '56', name: 'TargetCompID', required: true },
      { tag: '34', name: 'MsgSeqNum', required: true },
      { tag: '52', name: 'SendingTime', required: true },

      { tag: '37', name: 'OrderID', required: true },
      { tag: '198', name: 'SecondaryOrderID' },
      {
        tag: '1036',
        name: 'ExecAckStatus',
        required: true,
        allowedValues: [
          { value: '1', label: '1 - Accepted' },
          { value: '2', label: '2 - Rejected' },
        ],
      },
      { tag: '17', name: 'ExecID', required: true },
      { tag: '55', name: 'Symbol', required: true },
      { tag: '48', name: 'SecurityID' },
      { tag: '22', name: 'SecurityIDSource' },
      { tag: '207', name: 'SecurityExchange' },
      { tag: '54', name: 'Side', required: true },
      { tag: '38', name: 'OrderQty', required: true },
      { tag: '58', name: 'Text', required: false },

      { tag: '10', name: 'CheckSum', required: true },
    ] as FixTag[],
  },
} as const;
