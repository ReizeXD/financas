// --- DADOS DO JOGO ---
const levels = [
    {
        id: 1, 
        title: "Fundamentos", 
        emoji: "🟢",
        description: "Receitas, despesas, orçamento e escolhas.",
        theory: [
            { t: "Receitas e Despesas", d: "Receitas são todo o dinheiro que entra (salário, mesada). Despesas são todo o dinheiro que sai (contas, compras). O saldo é a diferença entre eles." },
            { t: "Necessidades vs Desejos", d: "Necessidades são gastos essenciais para sobrevivência (moradia, alimentação). Desejos são focados em conforto e lazer (roupas de marca, streaming)." },
            { t: "Despesas Fixas e Variáveis", d: "Despesas fixas ocorrem todo mês com valores previsíveis (aluguel). Variáveis mudam conforme o consumo (luz, restaurante)." },
            { t: "Consumo Consciente", d: "Significa comprar o que é necessário e avaliar o custo-benefício, evitando compras por impulso." }
        ],
        questions: [
            { p: "Você recebe R$ 2.000 por mês e possui R$ 1.500 em despesas. Quanto sobra?", alt: ["R$ 300", "R$ 400", "R$ 500", "R$ 600"], resp: 2, exp: "Receitas (2000) - Despesas (1500) = R$ 500." },
            { p: "Qual das opções representa uma 'Necessidade'?", alt: ["Streaming", "Conta de luz", "Restaurante caro", "Celular novo"], resp: 1, exp: "Luz é essencial para moradia. O resto representa desejos." },
            { p: "Qual opção é uma despesa fixa?", alt: ["Cinema", "Restaurante", "Aluguel", "Presente"], resp: 2, exp: "O aluguel é cobrado mensalmente com um valor estabelecido em contrato." },
            { p: "João guardou o dinheiro de um tênis para uma emergência. Isso é:", alt: ["Compra por impulso", "Planejamento financeiro", "Desperdício", "Inadimplência"], resp: 1, exp: "Ele priorizou a segurança futura ao invés do desejo imediato." }
        ]
    },
    {
        id: 2, 
        title: "Organização Financeira", 
        emoji: "🟡",
        description: "Cartão de crédito, dívidas e reserva de emergência.",
        theory: [
            { t: "Reserva de Emergência", d: "Dinheiro guardado especificamente para cobrir imprevistos (saúde, desemprego). Evita que você faça dívidas ruins." },
            { t: "Cartão de Crédito", d: "É um meio de pagamento, não um dinheiro extra. O banco empresta o valor por alguns dias. Pagar apenas o mínimo gera os maiores juros." },
            { t: "Nome Sujo (Inadimplência)", d: "Acontece quando você deixa de pagar uma dívida. Dificulta muito conseguir novos empréstimos ou financiamentos." },
            { t: "Parcelamentos", d: "Mesmo sem juros, acumular muitas parcelas pequenas engessa e compromete sua renda dos meses futuros." }
        ],
        questions: [
            { p: "Qual o objetivo da reserva de emergência?", alt: ["Pagar férias", "Dar entrada num carro", "Cobrir gastos inesperados", "Comprar presentes"], resp: 2, exp: "Ela é um colchão financeiro para imprevistos urgentes." },
            { p: "Pagar apenas o valor mínimo da fatura do cartão...", alt: ["Gera juros altíssimos", "É a melhor estratégia", "Cancela o cartão", "Garante desconto"], resp: 0, exp: "O restante entra no crédito rotativo, que tem os piores juros do mercado." },
            { p: "Ter um limite de cartão de R$ 5.000 significa que:", alt: ["Você ficou mais rico", "Pode gastar 5.000 de dinheiro emprestado", "Seu salário aumentou", "O banco te deu dinheiro"], resp: 1, exp: "O limite é apenas crédito. Todo valor usado deverá ser pago." },
            { p: "Se você tem dívidas, qual deve priorizar pagar?", alt: ["A de maior valor", "A com juros mais altos", "A mais antiga", "A mais nova"], resp: 1, exp: "Dívidas com juros altos crescem mais rápido e viram uma bola de neve." }
        ]
    },
    {
        id: 3, 
        title: "Conceitos Financeiros", 
        emoji: "🟠",
        description: "Inflação, juros compostos e investimentos.",
        theory: [
            { t: "Juros Compostos", d: "Calculados sobre o valor inicial mais os juros já acumulados ('juros sobre juros'). Criam um efeito bola de neve positivo nos investimentos." },
            { t: "Inflação e Poder de Compra", d: "Inflação é o aumento generalizado dos preços. Quando sobe, seu dinheiro compra menos coisas (perda de poder de compra)." },
            { t: "Renda Fixa e Variável", d: "Na renda fixa você empresta sabendo como será remunerado. Na variável (Ações), não há garantias, mas o potencial de ganho é maior." },
            { t: "Risco e Retorno", d: "Para buscar maiores retornos nos investimentos, você geralmente precisa aceitar correr riscos maiores." }
        ],
        questions: [
            { p: "O que é inflação?", alt: ["Aumento geral dos preços", "Aumento do salário", "Queda de preços", "Um investimento"], resp: 0, exp: "A inflação representa o encarecimento contínuo do custo de vida." },
            { p: "Por que juros compostos são bons para investir?", alt: ["Rendem menos", "Rendem sobre o valor inicial e juros passados", "Não sofrem inflação", "São isentos de taxas"], resp: 1, exp: "Eles aceleram o crescimento do dinheiro ao longo do tempo." },
            { p: "Qual a relação básica entre risco e retorno?", alt: ["Menor risco, maior retorno", "Não há relação", "Maior retorno exige maior risco", "Alto risco sempre dá lucro"], resp: 2, exp: "O mercado exige que você se exponha ao risco para oferecer mais lucros." },
            { p: "Ao comprar uma ação, você está:", alt: ["Emprestando para o governo", "Comprando um pedaço de uma empresa", "Garantindo lucro", "Comprando dólar"], resp: 1, exp: "Você se torna sócio da companhia, participando dos lucros e riscos." }
        ]
    }
];
