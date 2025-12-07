import type { FixTag } from '../types/data/fix-protocols';

const headerTags = (tags: Omit<FixTag, 'type'>[]): FixTag[] =>
  tags.map((tag) => ({ ...tag, type: 'header' }));

const bodyTags = (tags: Omit<FixTag, 'type'>[]): FixTag[] =>
  tags.map((tag) => ({ ...tag, type: 'body' }));

// Helper com descrições padrões do PDF para evitar repetição excessiva
const STANDARD_HEADER_B3 = [
  {
    tag: '8',
    name: 'BeginString',
    required: true,
    placeholder: 'FIX.4.4',
    description:
      'Identifica o início de nova mensagem e a versão do protocolo: FIX.4.4 [cite: 123]',
  },
  {
    tag: '9',
    name: 'BodyLength',
    required: true,
    inputType: 'number',
    description:
      'Tamanho da mensagem. Não criptografado, deve ser sempre o segundo campo da mensagem [cite: 123]',
  },
  {
    tag: '35',
    name: 'MsgType',
    required: true,
    description:
      'Tipo de mensagem. Não criptografado, deve ser sempre o terceiro campo da mensagem [cite: 123]',
  },
  {
    tag: '49',
    name: 'SenderCompID',
    required: true,
    description:
      'Este campo conterá o nome da sessão FIX que o participante está conectado [cite: 123]',
  },
  {
    tag: '56',
    name: 'TargetCompID',
    required: true,
    description:
      'Este campo conterá o nome do Fix Gateway da B3 que o participante se conectará [cite: 123]',
  },
  {
    tag: '34',
    name: 'MsgSeqNum',
    required: true,
    inputType: 'number',
    description: 'Número de sequência da mensagem [cite: 123]',
  },
  {
    tag: '52',
    name: 'SendingTime',
    required: true,
    inputType: 'datetime',
    description: 'Expresso em UTC (Tempo Universal Coordenado) [cite: 129]',
  },
  {
    tag: '115',
    name: 'OnBehalfOfCompID',
    required: false,
    description:
      'Para mensagens recebidas pela B3: CompID (nome da sessão FIX) do parceiro de negociação/operação do cliente [cite: 129]',
  },
  {
    tag: '129',
    name: 'DeliverToSubID',
    required: false,
    description:
      'Identificador (código do participante) que a mensagem deverá ser entregue [cite: 129]',
  },
] as Omit<FixTag, 'type'>[];

const STANDARD_TRAILER_B3 = [
  {
    tag: '10',
    name: 'CheckSum',
    required: true,
    description:
      'Soma de verificação. Não criptografada, é o último campo da mensagem [cite: 138]',
  },
] as Omit<FixTag, 'type'>[];

export const FIX_4_4_B3 = {
  // ---------------------------------------------------------------------------
  // MENSAGENS ESPECÍFICAS DO iMERCADO (PDF REFERÊNCIA)
  // ---------------------------------------------------------------------------

  xmlMessage: {
    msgType: 'n',
    description:
      'Mensagem de negócio: Utilizada para enviar mensagem do catálogo do iMERCADO (encapsulado em XML) [cite: 145, 184]',
    tags: [
      ...headerTags(STANDARD_HEADER_B3),
      ...bodyTags([
        {
          tag: '11',
          name: 'ClOrdID',
          required: true,
          description:
            'Identificador único da mensagem (com 35 posições) atribuído pelo participante (CodParticipante + Data + ID Gerador + Incremental) [cite: 185, 186]',
        },
        {
          tag: '60',
          name: 'TransactTime',
          required: true,
          inputType: 'datetime',
          description:
            'Horário de geração da mensagem, expresso em UTC [cite: 197]',
        },
        // Grupo de Partes
        {
          tag: '453',
          name: 'NoPartyIDs',
          required: true,
          group: true,
          description:
            'Grupo de repetição. Deve sempre conter combinações únicas dos campos PartyID, PartyIDSource e PartyRole. Valor aceito: 1 [cite: 197, 198]',
        },
        {
          tag: '447',
          name: 'PartyIDSource',
          parent: '453',
          required: true,
          description:
            'Identifica a classe ou a fonte do valor de PartyID. Valor aceito: D = código proprietário/individual [cite: 198, 199]',
          allowedValues: [{ value: 'D', label: 'D - Proprietary/Individual' }],
        },
        {
          tag: '448',
          name: 'PartyID',
          parent: '453',
          required: true,
          description:
            'Identificador do participante (número do participante) [cite: 199]',
        },
        {
          tag: '452',
          name: 'PartyRole',
          parent: '453',
          required: true,
          inputType: 'number',
          description:
            'Identifica o tipo ou a função do PartyID especificado [cite: 199]',
        },
        // Conteúdo XML
        {
          tag: '20002',
          name: 'XMLContentLen',
          required: true,
          inputType: 'number',
          description:
            'Tamanho da mensagem XML contida no campo XmlContent [cite: 200]',
        },
        {
          tag: '20001',
          name: 'XMLContent',
          required: true,
          description:
            'Mensagem XML do catálogo do iMERCADO. Deve usar codificação UTF-8 e estar envelopada na tag PayloadBVMF [cite: 200, 201, 215]',
        },
        {
          tag: '9225',
          name: 'MessageID',
          required: true,
          description:
            'Identificação da mensagem para o sistema de destino (Ex: imb.500.01) [cite: 202]',
        },
        {
          tag: '30003',
          name: 'CorrelationClOrdID',
          required: false,
          description:
            'Identificação (ClOrdID) da mensagem correlacionada. Usado em mensagens de resposta [cite: 203, 205]',
        },
      ]),
      ...bodyTags(STANDARD_TRAILER_B3),
    ] as FixTag[],
  },

  // ---------------------------------------------------------------------------
  // MENSAGENS DE SESSÃO (ATUALIZADAS COM O PDF)
  // ---------------------------------------------------------------------------

  logon: {
    msgType: 'A',
    description:
      'Autentica um usuário ao estabelecer conexão via sistema remoto. Deve ser obrigatoriamente a primeira enviada [cite: 151, 152]',
    tags: [
      ...headerTags(STANDARD_HEADER_B3),
      ...bodyTags([
        {
          tag: '98',
          name: 'EncryptMethod',
          required: true,
          description:
            'Método de encriptação. Deve ser sempre 0 [cite: 153, 154]',
          allowedValues: [{ value: '0', label: '0 - None' }],
        },
        {
          tag: '108',
          name: 'HeartBtInt',
          required: true,
          inputType: 'number',
          placeholder: '30',
          description:
            'Intervalo recomendado para o sinalizador: 30 segundos [cite: 154]',
        },
        {
          tag: '141',
          name: 'ResetSeqNumFlag',
          required: false,
          description:
            'Reiniciar números de sequência da mensagem. A B3 recomenda não reinicializar no logon (N) [cite: 154, 157]',
          allowedValues: [
            { value: 'Y', label: 'Yes' },
            { value: 'N', label: 'No' },
          ],
        },
        {
          tag: '789',
          name: 'NextExpectedMsgSeqNum',
          required: false,
          inputType: 'number',
          description:
            'Próximo número esperado para a sequência da mensagem a ser recebida [cite: 154]',
        },
        {
          tag: '464',
          name: 'TestMessageIndicator',
          required: false,
          description:
            'Indicador de conexão de teste ou de produção [cite: 154]',
        },
        {
          tag: '95',
          name: 'RawDataLength',
          required: false,
          inputType: 'number',
          description:
            'Tamanho dos dados brutos (bytes). Obrigatório quando o RawData for preenchido [cite: 154]',
        },
        {
          tag: '96',
          name: 'RawData',
          required: false,
          description:
            'Dados brutos. Obrigatório quando a mensagem contém dados de autenticação (senha) [cite: 155]',
        },
        {
          tag: '553',
          name: 'Username',
          required: false,
          description:
            'Usuário do CAU. Obrigatório quando for mensagem de conexão [cite: 156]',
        },
        {
          tag: '554',
          name: 'Password',
          required: false,
          description: 'Senha (se aplicável)',
        },
      ]),
      ...bodyTags(STANDARD_TRAILER_B3),
    ] as FixTag[],
  },

  logout: {
    msgType: '5',
    description:
      'Inicia ou confirma o encerramento de uma sessão FIX [cite: 180]',
    tags: [
      ...headerTags(STANDARD_HEADER_B3),
      ...bodyTags([
        {
          tag: '58',
          name: 'Text',
          required: false,
          description: 'Explica o motivo da desconexão (se houver) [cite: 182]',
        },
      ]),
      ...bodyTags(STANDARD_TRAILER_B3),
    ] as FixTag[],
  },

  heartbeat: {
    msgType: '0',
    description:
      'Monitora o status do link de comunicação e identifica quando a última sequência de mensagens deixou de ser recebida [cite: 160]',
    tags: [
      ...headerTags(STANDARD_HEADER_B3),
      ...bodyTags([
        {
          tag: '112',
          name: 'TestReqID',
          required: false,
          description:
            'Identificador necessário para teste. Obrigatório quando o sinalizador resulta de mensagem de solicitação de teste [cite: 161]',
        },
      ]),
      ...bodyTags(STANDARD_TRAILER_B3),
    ] as FixTag[],
  },

  testRequest: {
    msgType: '1',
    description:
      'Solicita um sinalizador da contraparte, verificando os números da sequência ou o status da linha de comunicação [cite: 162]',
    tags: [
      ...headerTags(STANDARD_HEADER_B3),
      ...bodyTags([
        {
          tag: '112',
          name: 'TestReqID',
          required: true,
          description:
            'Identificador necessário para teste. Campo incluído na mensagem de solicitação de teste a ser devolvido no sinalizador resultante [cite: 164]',
        },
      ]),
      ...bodyTags(STANDARD_TRAILER_B3),
    ] as FixTag[],
  },

  resendRequest: {
    msgType: '2',
    description:
      'Encaminhada pelo destino para iniciar a retransmissão de mensagens [cite: 166]',
    tags: [
      ...headerTags(STANDARD_HEADER_B3),
      ...bodyTags([
        {
          tag: '7',
          name: 'BeginSeqNo',
          required: true,
          inputType: 'number',
          description:
            'Número de sequência da primeira mensagem disponível para reenvio [cite: 168]',
        },
        {
          tag: '16',
          name: 'EndSeqNo',
          required: true,
          inputType: 'number',
          description:
            'Número de sequência da última mensagem disponível para reenvio. Se for para todas subsequentes use 0 [cite: 169, 171]',
        },
      ]),
      ...bodyTags(STANDARD_TRAILER_B3),
    ] as FixTag[],
  },

  reject: {
    msgType: '3',
    description:
      'Emitida obrigatoriamente quando uma mensagem recebida não pode ser processada adequadamente devido à violação de uma regra da sessão ',
    tags: [
      ...headerTags(STANDARD_HEADER_B3),
      ...bodyTags([
        {
          tag: '45',
          name: 'RefSeqNum',
          required: true,
          inputType: 'number',
          description:
            'Número de sequência da mensagem de referência rejeitada [cite: 173]',
        },
        {
          tag: '371',
          name: 'RefTagID',
          required: false,
          inputType: 'number',
          description: 'Número do campo FIX de referência [cite: 173]',
        },
        {
          tag: '372',
          name: 'RefMsgType',
          required: false,
          description: 'Tipo de mensagem FIX de referência [cite: 173]',
        },
        {
          tag: '373',
          name: 'SessionRejectReason',
          required: true,
          inputType: 'number',
          description:
            'Código para identificar o motivo da mensagem de rejeição no nível de sessão (0=Num campo inválido, 1=Falta campo obrigatório, etc) [cite: 174, 175]',
          allowedValues: [
            { value: '0', label: '0 - Número de campo inválido' },
            { value: '1', label: '1 - Falta campo obrigatório' },
            {
              value: '2',
              label: '2 - Campo não definido para este tipo de mensagem',
            },
            { value: '3', label: '3 - Campo não definido' },
            { value: '4', label: '4 - Campo especificado sem valor' },
            { value: '5', label: '5 - Valor incorreto' },
            { value: '6', label: '6 - Formato incorreto' },
            { value: '9', label: '9 - Problemas com CompID' },
            { value: '10', label: '10 - Problema de precisão no horário' },
            { value: '11', label: '11 - Tipo de mensagem inválido' },
            { value: '99', label: '99 - Outros' },
          ],
        },
        {
          tag: '58',
          name: 'Text',
          required: false,
          description:
            'Sempre que possível, mensagem para explicar o motivo da rejeição [cite: 176]',
        },
      ]),
      ...bodyTags(STANDARD_TRAILER_B3),
    ] as FixTag[],
  },

  sequenceReset: {
    msgType: '4',
    description:
      'Possui duas modalidades: preenchimento de intervalo (Gap Fill Mode) e reiniciação (Reset) [cite: 176]',
    tags: [
      ...headerTags(STANDARD_HEADER_B3),
      ...bodyTags([
        {
          tag: '43',
          name: 'PossDupFlag',
          required: false,
          description: 'Indica possível retransmissão da mensagem [cite: 123]',
        },
        {
          tag: '123',
          name: 'GapFillFlag',
          required: false,
          description:
            'Indica que a mensagem substitui mensagens que não serão reenviadas. Y=Msg de preenchimento, N=Reiniciação [cite: 179, 180]',
          allowedValues: [
            { value: 'Y', label: 'Y - Gap Fill Message' },
            { value: 'N', label: 'N - Sequence Reset' },
          ],
        },
        {
          tag: '36',
          name: 'NewSeqNo',
          required: true,
          inputType: 'number',
          description: 'Novo número de sequência [cite: 180]',
        },
      ]),
      ...bodyTags(STANDARD_TRAILER_B3),
    ] as FixTag[],
  },

  // ---------------------------------------------------------------------------
  // MENSAGENS DE NEGOCIAÇÃO (TRADEMATE / ORDER ENTRY)
  // Obs: Mantidas do código original pois o PDF anexado (iMercado) não cobre
  // mensagens D, F, G, 8, s, u, BN. Apenas os headers foram atualizados.
  // ---------------------------------------------------------------------------

  newOrderSingle: {
    msgType: 'D',
    tags: [
      ...headerTags(STANDARD_HEADER_B3),
      ...bodyTags([
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
      ]),
      ...bodyTags([
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
      ]),
      ...bodyTags(STANDARD_TRAILER_B3),
    ] as FixTag[],
  },

  orderCancelRequest: {
    msgType: 'F',
    tags: [
      ...headerTags(STANDARD_HEADER_B3),
      ...bodyTags([
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
      ]),
      ...bodyTags([
        { tag: '453', name: 'NoPartyIDs', required: true, group: true },
        { tag: '448', name: 'PartyID', parent: '453', required: true },
        { tag: '447', name: 'PartyIDSource', parent: '453', required: true },
        { tag: '452', name: 'PartyRole', parent: '453', required: true },
      ]),
      ...bodyTags(STANDARD_TRAILER_B3),
    ] as FixTag[],
  },

  orderCancelReplaceRequest: {
    msgType: 'G',
    tags: [
      ...headerTags(STANDARD_HEADER_B3),
      ...bodyTags([
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
      ]),
      ...bodyTags([
        { tag: '453', name: 'NoPartyIDs', required: true, group: true },
        { tag: '448', name: 'PartyID', parent: '453', required: true },
        { tag: '447', name: 'PartyIDSource', parent: '453', required: true },
        { tag: '452', name: 'PartyRole', parent: '453', required: true },
      ]),
      ...bodyTags(STANDARD_TRAILER_B3),
    ] as FixTag[],
  },

  executionReport: {
    msgType: '8',
    tags: [
      ...headerTags(STANDARD_HEADER_B3),
      ...bodyTags([
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
      ]),
      ...bodyTags([
        { tag: '453', name: 'NoPartyIDs', required: true, group: true },
        { tag: '448', name: 'PartyID', parent: '453', required: true },
        { tag: '447', name: 'PartyIDSource', parent: '453', required: true },
        { tag: '452', name: 'PartyRole', parent: '453', required: true },
      ]),
      ...bodyTags([
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
      ]),
      ...bodyTags([
        { tag: '555', name: 'NoLegs', required: false, group: true },
        { tag: '600', name: 'LegSymbol', parent: '555' },
        { tag: '624', name: 'LegSide', parent: '555' },
        { tag: '687', name: 'LegQty', parent: '555' },
        { tag: '566', name: 'LegPrice', parent: '555' },
        { tag: '654', name: 'LegRefID', parent: '555' },
      ]),
      ...bodyTags([
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
      ]),
      ...bodyTags([
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
      ]),
      ...bodyTags(STANDARD_TRAILER_B3),
    ] as FixTag[],
  },

  orderCancelReject: {
    msgType: '9',
    tags: [
      ...headerTags(STANDARD_HEADER_B3),
      ...bodyTags([
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
      ]),
      ...bodyTags(STANDARD_TRAILER_B3),
    ] as FixTag[],
  },

  businessMessageReject: {
    msgType: 'j',
    tags: [
      ...headerTags(STANDARD_HEADER_B3),
      ...bodyTags([
        { tag: '45', name: 'RefSeqNum', required: false },
        { tag: '372', name: 'RefMsgType', required: true },
        { tag: '380', name: 'BusinessRejectReason', required: true },
        { tag: '58', name: 'Text', required: false },
      ]),
      ...bodyTags(STANDARD_TRAILER_B3),
    ] as FixTag[],
  },

  newOrderCross: {
    msgType: 's',
    tags: [
      ...headerTags(STANDARD_HEADER_B3),
      ...bodyTags([
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
      ]),
      ...bodyTags([
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
      ]),
      ...bodyTags([
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
      ]),
      ...bodyTags(STANDARD_TRAILER_B3),
    ] as FixTag[],
  },

  crossOrderCancelRequest: {
    msgType: 'u',
    tags: [
      ...headerTags(STANDARD_HEADER_B3),
      ...bodyTags([
        { tag: '37', name: 'OrderID', required: true },
        { tag: '548', name: 'CrossID', required: true },
        { tag: '551', name: 'OrigCrossID', required: true },
        { tag: '549', name: 'CrossType', required: true },
        { tag: '550', name: 'CrossPrioritization', required: true },
        { tag: '552', name: 'NoSides', required: true, group: true },
      ]),
      ...bodyTags([
        { tag: '54', name: 'Side', parent: '552', required: true },
        { tag: '41', name: 'OrigClOrdID', parent: '552', required: true },
        { tag: '11', name: 'ClOrdID', parent: '552', required: true },
      ]),
      ...bodyTags([
        { tag: '38', name: 'OrderQty', required: true },
        { tag: '58', name: 'Text', required: true },
        { tag: '55', name: 'Symbol', required: true },
        { tag: '48', name: 'SecurityID', required: false },
        { tag: '22', name: 'SecurityIDSource', required: false },
        { tag: '207', name: 'SecurityExchange', required: false },
        { tag: '60', name: 'TransactTime', required: true },
        { tag: '961', name: 'HostCrossID', required: false },
      ]),
      ...bodyTags(STANDARD_TRAILER_B3),
    ] as FixTag[],
  },

  executionAcknowledgement: {
    msgType: 'BN',
    tags: [
      ...headerTags(STANDARD_HEADER_B3),
      ...bodyTags([
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
      ]),
      ...bodyTags(STANDARD_TRAILER_B3),
    ] as FixTag[],
  },
} as const;
