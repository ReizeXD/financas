// --- DADOS DO JOGO ---
const levels = [
    {
        id: 1, 
        title: "Fundamentos", 
        emoji: "🟢",
        description: "Receitas, despesas, orçamento e escolhas.",
        theory: [
            { t: "Receitas e Despesas", d: "Pense na sua conta bancária como uma caixa d'água. As receitas são a água que entra (como seu salário, mesada ou bico). Já as despesas são os vazamentos por onde a água sai (como contas de luz, aluguel, mercado e lanches). O segredo para não 'secar' a conta é garantir que entre mais dinheiro do que sai. O valor que sobra no fim do mês é o seu saldo positivo." },
            { t: "Necessidades vs Desejos", d: "Na hora de gastar, é essencial separar o que você PRECISA do que você QUER. Necessidades são os gastos obrigatórios para a sua sobrevivência e bem-estar básico (moradia, comida, saúde). Desejos são coisas que trazem conforto ou prazer, mas não são vitais (pedir delivery, comprar uma roupa de marca, ir ao cinema). Primeiro cuide das necessidades, depois, com planejamento, atenda aos desejos." },
            { t: "Despesas Fixas e Variáveis", d: "Despesas fixas são como assinaturas: ocorrem todo mês e o valor costuma ser o mesmo (como o aluguel e a mensalidade da internet). Você já sabe que vai precisar pagar. Despesas variáveis, por outro lado, mudam todo mês dependendo de quanto você consome (como a conta de luz, o supermercado e a gasolina). Elas são mais fáceis de reduzir quando você precisa economizar." },
            { t: "Consumo Consciente", d: "Significa comprar com inteligência, e não por impulso. É parar e perguntar a si mesmo antes de abrir a carteira: 'Eu realmente preciso disso agora?' ou 'Eu tenho dinheiro para pagar isso sem me endividar?'. O consumo consciente ajuda a evitar gastos invisíveis que, no fim do mês, devoram o seu orçamento sem que você perceba." }
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
            { t: "Reserva de Emergência", d: "A vida é cheia de imprevistos: o carro pode quebrar, alguém pode adoecer ou você pode perder o emprego. A reserva de emergência é um dinheiro guardado justamente para esses momentos de 'socorro'. O ideal é ter guardado um valor que cubra de 3 a 6 meses do seu custo de vida. Ter essa reserva te dá paz de espírito e evita que você precise pegar empréstimos com juros altos." },
            { t: "Cartão de Crédito", d: "O cartão não é uma extensão do seu salário, é apenas um dinheiro emprestado pelo banco por alguns dias. Se você pagar o valor total da fatura até o vencimento, não paga nada a mais por isso. Mas atenção: se pagar apenas o valor 'mínimo' ou atrasar, o banco cobra juros gigantescos (o chamado crédito rotativo), e sua dívida pode dobrar de tamanho em poucos meses." },
            { t: "Nome Sujo (Inadimplência)", d: "Quando você deixa de pagar uma dívida, a empresa avisa órgãos como Serasa ou SPC, e você fica com o 'nome sujo' ou negativado. Isso funciona como uma nota ruim no seu boletim financeiro. Com o nome sujo, fica muito difícil conseguir cartões de crédito, financiar um carro, alugar uma casa ou fazer qualquer tipo de empréstimo até que a dívida seja quitada." },
            { t: "Parcelamentos", d: "Comprar parcelado ('em 12x sem juros') parece inofensivo, mas é uma armadilha perigosa. Várias parcelas pequenas de diferentes compras se somam e acabam bloqueando uma grande parte do seu salário nos meses seguintes. Quando você percebe, já gastou o dinheiro antes mesmo de recebê-lo. O ideal é juntar o dinheiro para comprar à vista, muitas vezes conseguindo bons descontos." }
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
            { t: "Juros Compostos", d: "Eles são a mágica da multiplicação do dinheiro. Diferente do juro simples, o juro composto é calculado sobre o valor inicial MAIS os juros que já foram ganhos ('juros sobre juros'). Nos investimentos, isso é incrível: seu dinheiro cresce como uma bola de neve a seu favor. Mas cuidado, nas dívidas (como no cartão de crédito), eles também agem e fazem a dívida virar uma avalanche que pode te esmagar." },
            { t: "Inflação e Poder de Compra", d: "Sabe quando você vai ao mercado e nota que as coisas estão mais caras que no ano passado? Isso é a inflação. É o aumento contínuo e generalizado dos preços. Por causa dela, o dinheiro perde valor ao longo do tempo (seu 'poder de compra' diminui). Se você guarda dinheiro embaixo do colchão ou na poupança rendendo pouco, no futuro ele comprará menos coisas do que compra hoje." },
            { t: "Renda Fixa e Variável", d: "Imagine que ao investir você tem duas opções. Na Renda Fixa, você empresta dinheiro e combina as regras do jogo antes (como quanto vai render). É mais seguro, mas rende menos. Na Renda Variável (como comprar ações de empresas na Bolsa), as regras mudam. Se a empresa for bem, você pode ganhar muito; se for mal, pode perder dinheiro. É como ser sócio do negócio." },
            { t: "Risco e Retorno", d: "No mundo do dinheiro, não existe almoço grátis ou 'ganho alto sem risco'. Se um investimento promete pagar muito, significa que as chances de algo dar errado (o risco) também são maiores. Quem busca segurança (Renda Fixa) aceita ganhar menos. Quem quer a chance de multiplicar o dinheiro (Renda Variável) precisa estar preparado para suportar as variações e o risco de perder." }
        ],
        questions: [
            { p: "O que é inflação?", alt: ["Aumento geral dos preços", "Aumento do salário", "Queda de preços", "Um investimento"], resp: 0, exp: "A inflação representa o encarecimento contínuo do custo de vida." },
            { p: "Por que juros compostos são bons para investir?", alt: ["Rendem menos", "Rendem sobre o valor inicial e juros passados", "Não sofrem inflação", "São isentos de taxas"], resp: 1, exp: "Eles aceleram o crescimento do dinheiro ao longo do tempo." },
            { p: "Qual a relação básica entre risco e retorno?", alt: ["Menor risco, maior retorno", "Não há relação", "Maior retorno exige maior risco", "Alto risco sempre dá lucro"], resp: 2, exp: "O mercado exige que você se exponha ao risco para oferecer mais lucros." },
            { p: "Ao comprar uma ação, você está:", alt: ["Emprestando para o governo", "Comprando um pedaço de uma empresa", "Garantindo lucro", "Comprando dólar"], resp: 1, exp: "Você se torna sócio da companhia, participando dos lucros e riscos." }
        ]
    },
    {
        id: 4, 
        title: "Economia Básica", 
        emoji: "📈",
        description: "Selic, IPCA, CDI.",
        theory: [
            { t: "Taxa Selic", d: "Pense na Selic como a taxa 'mãe' de todas as outras taxas no Brasil, controlada pelo Banco Central. Quando o governo acha que as coisas estão muito caras (inflação alta), ele sobe a Selic. Isso faz os empréstimos ficarem mais caros, as pessoas param de comprar e os preços tendem a cair. Por outro lado, com a Selic alta, os investimentos mais seguros rendem mais, atraindo os investidores." },
            { t: "IPCA", d: "IPCA (Índice Nacional de Preços ao Consumidor Amplo) é o 'termômetro' oficial usado para medir a inflação no Brasil. Pesquisadores acompanham mensalmente os preços de várias coisas (comida, transporte, aluguel, remédios) para ver o quanto o custo de vida aumentou ou diminuiu. O seu objetivo ao investir deve ser sempre ter ganhos acima do IPCA, para seu dinheiro não perder valor de verdade." },
            { t: "CDI", d: "Os bancos são obrigados por lei a fechar o dia com saldo positivo. Quando um banco precisa de dinheiro, ele pega emprestado de outro banco por um dia. Os juros cobrados nesse empréstimo entre os bancos formam o CDI. Como isso ocorre o tempo todo, o CDI se torna a taxa 'padrão' do mercado. Quando você investe e vê 'Rende 100% do CDI', significa que você ganhará o mesmo juro que os bancos pagam uns aos outros (que é bem próximo da taxa Selic)." }
        ],
        questions: [
            { p: "O que é a taxa Selic?", alt: ["Taxa básica de juros", "Imposto de Renda", "Custo do dólar", "Lucro da poupança"], resp: 0, exp: "A Selic é a taxa básica de juros, que influencia todas as outras taxas." },
            { p: "O IPCA mede:", alt: ["A alta do dólar", "A inflação oficial do país", "O lucro das empresas", "O salário mínimo"], resp: 1, exp: "O IPCA é o principal indicador de inflação do Brasil." },
            { p: "Se a Selic sobe, o que geralmente acontece?", alt: ["Empréstimos ficam mais baratos", "Empréstimos ficam mais caros", "A inflação sobe", "O CDI cai"], resp: 1, exp: "Com a Selic mais alta, o custo do dinheiro aumenta." },
            { p: "Um investimento rende 100% do CDI. Isso é bom?", alt: ["Sim, rende o dobro", "Sim, acompanha a taxa de mercado", "Não, perde dinheiro", "Não tem relação"], resp: 1, exp: "O CDI é um referencial; 100% do CDI significa render próximo à Selic." }
        ]
    },
    {
        id: 5, 
        title: "Mundo dos Investimentos", 
        emoji: "💼",
        description: "Tesouro Direto, CDB, FGC.",
        theory: [
            { t: "Tesouro Direto", d: "O Tesouro Direto é um sistema onde você pode emprestar seu dinheiro diretamente para o Governo Federal. O governo pega esse dinheiro, usa em projetos ou para pagar dívidas e te devolve no futuro com juros. É considerado o investimento mais seguro do país, porque a chance de um país inteiro 'quebrar' e não pagar é muito menor do que a de um banco particular falir. Uma boa opção para iniciantes é o 'Tesouro Selic'." },
            { t: "CDB", d: "Se no Tesouro Direto você empresta para o governo, no CDB (Certificado de Depósito Bancário) você está emprestando seu dinheiro para um banco. Os bancos pegam o seu dinheiro, emprestam para outras pessoas cobrando juros mais altos e dividem uma parte do lucro com você. Geralmente, os CDBs de bancos menores oferecem rendimentos maiores, porque eles precisam atrair mais dinheiro." },
            { t: "FGC", d: "Muitas pessoas têm medo de investir em um banco e ele falir. O FGC (Fundo Garantidor de Créditos) foi criado para dar essa segurança. Ele é como um 'seguro' que protege o dinheiro das pessoas. Se o banco onde você investiu quebrar, o FGC devolve o seu dinheiro, com limite de até R$ 250 mil por banco e por CPF. Apenas alguns investimentos têm essa proteção, como a conta corrente, a poupança, os CDBs e LCIs/LCAs." }
        ],
        questions: [
            { p: "Investir no Tesouro Direto é:", alt: ["Comprar ações", "Emprestar dinheiro para o governo", "Emprestar para o banco", "Comprar dólar"], resp: 1, exp: "Você compra títulos da dívida pública do governo." },
            { p: "O que é um CDB?", alt: ["Título público", "Empréstimo ao governo", "Título de banco", "Ação de empresa"], resp: 2, exp: "Você empresta dinheiro ao banco, que paga juros." },
            { p: "O Fundo Garantidor de Créditos (FGC) protege o investidor contra:", alt: ["Queda da bolsa", "Quebra do banco", "Alta da inflação", "Aumento da Selic"], resp: 1, exp: "O FGC garante até 250 mil reais por CPF se o banco falir." },
            { p: "O Tesouro Selic é ideal para:", alt: ["Reserva de emergência", "Aposentadoria de longo prazo", "Especulação rápida", "Compra de casa"], resp: 0, exp: "Possui liquidez diária e baixo risco, ideal para imprevistos." }
        ]
    },
    {
        id: 6, 
        title: "Segurança e Golpes", 
        emoji: "🛡️",
        description: "Pirâmides financeiras, Phishing, Agiotas.",
        theory: [
            { t: "Pirâmides Financeiras", d: "É um golpe clássico disfarçado de 'ótima oportunidade de negócio'. Eles prometem lucros fáceis e rápidos, mas, na verdade, o dinheiro de quem entra primeiro é pago por quem entra depois. Não existe um produto ou serviço real gerando valor. O esquema só funciona enquanto novas pessoas continuarem entrando. Quando não há mais novatos para injetar dinheiro, a pirâmide desmorona e a maioria perde tudo." },
            { t: "Phishing", d: "Sabe aquele SMS ou e-mail urgente dizendo que 'sua conta foi bloqueada' ou oferecendo uma 'promoção imperdível' com um link? Isso é Phishing (Pescando dados). Os golpistas criam páginas falsas idênticas às de bancos e lojas reais para 'pescar' suas senhas e dados do cartão. A regra de ouro é: nunca clique em links suspeitos, desconfie de urgência e sempre acesse o aplicativo ou site oficial do banco para verificar." },
            { t: "Agiotas", d: "Agiotas são pessoas que emprestam dinheiro por fora da lei. Como não há contrato oficial, eles cobram juros extorsivos, muito acima do que é permitido. A armadilha é que a dívida cresce tão rápido que se torna impossível de pagar. Quando isso acontece, as cobranças costumam ser feitas com ameaças, violência e intimidação, colocando a sua vida e a da sua família em perigo. Fuja disso a qualquer custo." }
        ],
        questions: [
            { p: "Qual é a principal característica de uma pirâmide financeira?", alt: ["Baixo risco", "Dependência da entrada constante de novas pessoas", "Produto muito bom", "Autorizada pelo governo"], resp: 1, exp: "Se parar de entrar gente, o esquema quebra e os últimos perdem tudo." },
            { p: "O que é Phishing?", alt: ["Investir em peixes", "Roubo de dados por links falsos", "Criptomoeda", "Título público"], resp: 1, exp: "É uma técnica para 'pescar' informações sensíveis usando mensagens falsas." },
            { p: "Por que não se deve pegar dinheiro com agiotas?", alt: ["O limite é pequeno", "Cobra juros abusivos e ilegais", "Pede muita papelada", "O dinheiro é falso"], resp: 1, exp: "A prática é crime e as cobranças podem envolver extorsão e violência." },
            { p: "Alguém oferece retorno garantido de 10% ao mês sem risco. O que é?", alt: ["Excelente negócio", "Tesouro Direto", "Provavelmente um golpe", "Ação da bolsa"], resp: 2, exp: "No mercado real, rentabilidade alta exige alto risco. Retorno alto e garantido é sinal de fraude." }
        ]
    }
];
