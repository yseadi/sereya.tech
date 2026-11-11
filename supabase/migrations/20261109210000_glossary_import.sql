-- Yasmim's glossary from Notion: every card's text, category and link, published.
-- Matches existing terms by name (accents and case ignored) and adds the missing ones.
-- Running it again rewrites the same texts, so edits made on the site to these cards would be replaced.

drop table if exists gl_import;
create temp table gl_import (term text, definition text, category text, slug text);
insert into gl_import (term, definition, category, slug) values
  ('1948 Palestinian expulsion from Lydda and Ramle', 'Summary: A expulsão de 50 mil a 70 mil palestinos de Lydda e Ramle em julho de 1948 ocorreu quando as tropas israelenses capturaram as cidades, inserida no contexto da Guerra Árabe‑Israelense de 1948.

A expulsão palestina de Lydda e Ramle em 1948 foi a expulsão de 50.000 a 70.000 árabes palestinos quando as tropas israelenses capturaram as cidades em julho daquele ano. A ação militar ocorreu no contexto da Guerra Árabe-Israelense de 1948.

---

Source: [en.wikipedia.org](https://en.wikipedia.org/wiki/1948_Palestinian_expulsion_from_Lydda_and_Ramle)', 'geo', '1948-palestinian-expulsion-from-lydda-and-ramle'),
  ('Acordo Estados Unidos-México-Canadá (USMCA)', 'O USMCA (Acordo Estados Unidos-México-Canadá) é um tratado de livre comércio entre os três países norte-americanos que substituiu o antigo [NAFTA](/glossary/acordo-de-livre-comercio-da-america-do-norte-nafta) em 1º de julho de 2020.

**O que é e por que mudou**

- **Substituição do [NAFTA](/glossary/acordo-de-livre-comercio-da-america-do-norte-nafta):** Atualizou regras que vigoravam desde 1994 para refletir a economia moderna.
- **Nomes locais:** É chamado de *CUSMA* no Canadá e *T-MEC* no México.
- **Negociação:** Foi assinado em 2018 sob forte impulso do governo americano.

**Principais Mudanças**

- **Setor Automotivo:** Exige maior percentual de produção regional e regras mais rígidas de salário para trabalhadores do setor.
- **Laticínios:** Ampliou o acesso de produtos norte-americanos ao mercado protegido do Canadá.
- **Propriedade Intelectual e Digital:** Incluiu salvaguardas para comércio eletrônico e estendeu prazos de patentes de medicamentos.
- **Cláusula de Expiração (*Sunset Clause*):** Estabelece revalidação periódica e revisão a cada seis anos, com validade total prevista para 16 anos.

---

Source: [pt.wikipedia.org](https://pt.wikipedia.org/wiki/Acordo_Estados_Unidos-M%C3%A9xico-Canad%C3%A1)', 'geo', 'acordo-estados-unidos-mexico-canada-usmca'),
  ('Acordo Sykes-Picot', 'O Acordo Sykes-Picot, assinado secretamente em 1916 entre Reino Unido e França, **foi um acordo para dividir o Oriente Médio, então parte do Império Otomano, em esferas de influência britânica e francesa após o fim da Primeira Guerra Mundial**.

O acordo traiu promessas de independência árabe feitas aos árabes, que resultaram em conflitos e instabilidade na região, com fronteiras traçadas com lápis e régua, sem consideração pelas etnias locais.

![Acordo Sykes-Picot](/glossary/acordo-sykes-picot-1.webp)

---

Source: [bbc.com](https://www.bbc.com/portuguese/internacional-36320891)', 'geo', 'acordo-sykes-picot'),
  ('Acordo de Livre-Comércio da América do Norte (NAFTA)', 'O Nafta (Acordo de Livre-Comércio da América do Norte) foi um bloco econômico de livre-comércio formado por Estados Unidos, México e Canadá, em vigor entre 1994 e 2020, quando foi substituído pelo [USMCA](Acordo%20Estados%20Unidos-M%C3%A9xico-Canad%C3%A1%20(USMCA)%203dd0c519cad480498f6fcbda5dba0bf0.md). O termo também pode se referir à nafta, um derivado líquido do petróleo usado como matéria-prima na indústria petroquímica.

- **Objetivo:** Reduzir tarifas alfandegárias e barreiras comerciais entre os três países norte-americanos.
- **Funcionamento:** Criou uma zona de livre circulação de mercadorias e serviços, mas sem livre circulação de pessoas.
- **Fim do acordo:** Foi oficialmente encerrado e substituído em 2020 pelo [**USMCA** (Acordo Estados Unidos-México-Canadá)](Acordo%20Estados%20Unidos-M%C3%A9xico-Canad%C3%A1%20(USMCA)%203dd0c519cad480498f6fcbda5dba0bf0.md), que trouxe regras mais rígidas para o setor automotivo e propriedade intelectual.

**O Derivado de Petróleo (Nafta)**

- **Uso petroquímico:** Serve de base para fabricar eteno, propeno e outros produtos químicos essenciais.
- **Uso energético:** Pode ser usado na produção de gás de síntese.

---

Source: [brasilescola.uol.com.br](https://brasilescola.uol.com.br/geografia/nafta.htm)', 'geo', 'acordo-de-livre-comercio-da-america-do-norte-nafta'),
  ('Acordo de Paz de Oslo', 'Os **acordos de Oslo** foram uma série de [acordos](https://pt.wikipedia.org/wiki/Tratado) na cidade de [Oslo](https://pt.wikipedia.org/wiki/Oslo), na [Noruega](https://pt.wikipedia.org/wiki/Noruega), entre o governo de [Israel](https://pt.wikipedia.org/wiki/Israel) e o Presidente da [Organização para a Libertação da Palestina](https://pt.wikipedia.org/wiki/Organiza%C3%A7%C3%A3o_para_a_Liberta%C3%A7%C3%A3o_da_Palestina) (OLP), [Yasser Arafat](https://pt.wikipedia.org/wiki/Yasser_Arafat), [mediados](https://pt.wikipedia.org/wiki/Media%C3%A7%C3%A3o) pelo [presidente dos Estados Unidos](https://pt.wikipedia.org/wiki/Presidente_dos_Estados_Unidos), [Bill Clinton](https://pt.wikipedia.org/wiki/Bill_Clinton). As medidas de pacificação incluíam a retirada das tropas israelenses da Faixa de Gaza e da Cisjordânia e o direito ao autogoverno palestina nas zonas geridas pela Autoridade Palestina. Estes acordos previam o término dos [conflitos](https://pt.wikipedia.org/wiki/Conflito_israelo-palestino), a abertura das negociações sobre os territórios ocupados, a retirada de Israel do sul do [Líbano](https://pt.wikipedia.org/wiki/L%C3%ADbano) e a questão do *status* de [Jerusalém](https://pt.wikipedia.org/wiki/Jerusal%C3%A9m).

### **Principais pontos dos Acordos**

- A retirada das forças armadas israelense da [Faixa de Gaza](https://pt.wikipedia.org/wiki/Faixa_de_Gaza) e [Cisjordânia](https://pt.wikipedia.org/wiki/Cisjord%C3%A2nia), assim como o direito dos [palestinos](https://pt.wikipedia.org/wiki/Estado_da_Palestina) ao auto-governo nas zonas governadas pela [Autoridade palestina](https://pt.wikipedia.org/wiki/Autoridade_palestina).
- O governo palestino duraria cinco anos, de maneira interina, durante os quais o *status* seria renegociado (a partir de maio de [1996](https://pt.wikipedia.org/wiki/1996)).
- Questões referentes a [Jerusalém](https://pt.wikipedia.org/wiki/Jerusal%C3%A9m), [refugiados](https://pt.wikipedia.org/wiki/Refugiados), [assentamentos israelenses](https://pt.wikipedia.org/wiki/Assentamento_israelense) nos territórios ocupados na [Guerra dos Seis Dias](https://pt.wikipedia.org/wiki/Guerra_dos_Seis_Dias), [segurança](https://pt.wikipedia.org/wiki/Seguran%C3%A7a) e [fronteiras](https://pt.wikipedia.org/wiki/Fronteiras).
- O autogoverno seria dividido em:
    - Área A - controle total pela Autoridade palestina;
    - Área B - controle civil pela Autoridade palestina e controle militar pelo Exército de Israel;
    - Área C - controle total pelo Governo de Israel.
- Acordo de Paz

### Oslo 2

Foi um acordo chave e complexo sobre o futuro da [Faixa de Gaza](https://pt.wikipedia.org/wiki/Faixa_de_Gaza) e da Cisjordânia. Foi assinado em Taba (na [península do Sinai](https://pt.wikipedia.org/wiki/Pen%C3%ADnsula_do_Sinai), no [Egito](https://pt.wikipedia.org/wiki/Egito)) por [Israel](https://pt.wikipedia.org/wiki/Israel) e a [OLP](https://pt.wikipedia.org/wiki/OLP) em [24 de setembro](https://pt.wikipedia.org/wiki/24_de_setembro) de [1995](https://pt.wikipedia.org/wiki/1995) e então quatro dias mais tarde em [28 de setembro](https://pt.wikipedia.org/wiki/28_de_setembro) de 1995 pelo ministro principal [Yitzhak Rabin](https://pt.wikipedia.org/wiki/Yitzhak_Rabin) de Israel e pelo presidente [Yasser Arafat](https://pt.wikipedia.org/wiki/Yasser_Arafat) da OLP (Organização para a Libertação da Palestina) testemunhado pelo presidente [Bill Clinton](https://pt.wikipedia.org/wiki/Bill_Clinton) dos [Estados Unidos](https://pt.wikipedia.org/wiki/Estados_Unidos).

---

Source: [pt.wikipedia.org](https://pt.wikipedia.org/wiki/Acordos_de_paz_de_Oslo)', 'geo', 'acordo-de-paz-de-oslo'),
  ('Acordos de Abraão', 'Os Acordos de Abraão ou Pacto Abraâmico são acordos bilaterais sobre a normalização árabe-israelense assinados entre Israel e os Emirados Árabes Unidos e Barém em 15 de setembro de 2020.

Mediado pelos Estados Unidos, o anúncio inicial de 13 de agosto de 2020 dizia respeito apenas a Israel e aos Emirados Árabes Unidos antes do anúncio de um acordo de acompanhamento entre Israel e Barém em 11 de setembro de 2020.

Em 15 de setembro de 2020, a cerimônia oficial de assinatura da primeira iteração dos Acordos de Abraão foi organizada pela administração Trump na Casa Branca. Como parte dos acordos duplos, tanto os Emirados Árabes Unidos como o Barém reconheceram a soberania de Israel, permitindo o estabelecimento de relações diplomáticas plenas.

O acordo inicial de Israel com os Emirados Árabes Unidos marcou a primeira vez que Israel estabeleceu relações diplomáticas com um país árabe desde 1994, quando o tratado de paz Israel-Jordânia entrou em vigor.

Os Acordos de Abraão foram assinados pelo ministro das Relações Exteriores do Bahrein, Abdullatif bin Rashid Al-Zayani, e pelo ministro das Relações Exteriores dos Emirados, Abdullah bin Zayed Al-Nahyan, vis-à-vis o primeiro-ministro israelense, Benjamin Netanyahu, tendo o presidente americano Donald Trump como testemunha.

Eles foram negociados pelo genro e conselheiro sênior de Trump, Jared Kushner, e pelo assistente de Kushner, Avi Berkowitz.

---

Source: [pt.wikipedia.org](https://pt.wikipedia.org/wiki/Acordos_de_Abra%C3%A3o)', 'geo', 'acordos-de-abraao'),
  ('Acordos de Camp David', 'Os dois **Acordos de Paz de Camp David**, foram dois acordos políticos assinados pelo presidente egípcio [Anwar Sadat](https://pt.wikipedia.org/wiki/Anwar_Sadat) e pelo primeiro-ministro israelense [Menachem Begin](https://pt.wikipedia.org/wiki/Menachem_Begin) em 17 de setembro de 1978, após doze dias de negociações secretas em [Camp David](https://pt.wikipedia.org/wiki/Camp_David), o retiro do Presidente dos Estados Unidos em Maryland.

Os dois acordos foram assinados na Casa Branca e testemunhados pelo presidente [Jimmy Carter](https://pt.wikipedia.org/wiki/Jimmy_Carter). O segundo (*Uma Estrutura para a Conclusão de um Tratado de Paz entre o Egito e Israel*) levou diretamente ao [tratado de paz Egito-Israel](https://pt.wikipedia.org/wiki/Tratado_de_Paz_Egito-Israel_(1979)) de 1979.

Devido ao acordo, Sadat e Begin receberam o Prêmio Nobel da Paz de 1978 compartilhado. O primeiro acordo (*Um Marco para a Paz no Oriente Médio*), que tratava dos territórios palestinos, foi escrito sem a participação dos palestinos e foi condenado pelas Nações Unidas.

### Acordos parciais

Os Acordos de Camp David compreendem dois acordos separados: *"Um Marco para a Paz no Oriente Médio"* e *"Um Marco para a Conclusão de um Tratado de Paz entre o Egito e Israel"*, o segundo que conduz ao tratado de paz Egito-Israel assinado em março de 1979 Os acordos e o tratado de paz foram ambos acompanhados por "cartas laterais" de entendimento entre o Egito e os EUA e Israel e os EUA.

### **Estrutura para a paz no Oriente Médio**

O preâmbulo do *"Marco para a Paz no Oriente Médio"* começa com a base de uma solução pacífica para o conflito árabe-israelense:

> *A base acordada para uma solução pacífica do conflito entre Israel e seus vizinhos é a Resolução 242 do Conselho de Segurança das Nações Unidas, em todas as suas partes*
>

A estrutura em si consiste em 3 partes. A primeira parte da estrutura era estabelecer uma autoridade autônoma e autônoma na Cisjordânia e na Faixa de Gaza e implementar totalmente a [Resolução 242](https://pt.wikipedia.org/wiki/Resolu%C3%A7%C3%A3o_242_do_Conselho_de_Seguran%C3%A7a_das_Na%C3%A7%C3%B5es_Unidas).

Os Acordos reconheceram os “legítimos direitos do povo palestino”, um processo que deveria ser implementado garantindo a plena autonomia do povo em um período de cinco anos. Begin insistiu no adjetivo "pleno" para garantir que fosse o máximo direito político atingível. Essa autonomia total seria discutida com a participação de Israel, Egito, Jordânia e palestinos. A retirada das tropas israelenses da Cisjordânia e de Gaza foi acordada para ocorrer após a eleição de uma autoridade autônoma para substituir o governo militar de Israel. Os acordos não mencionam as [Colinas de Golã](https://pt.wikipedia.org/wiki/Colinas_de_Gol%C3%A3), Síria ou Líbano. Essa não era a paz abrangente que [Kissinger](https://pt.wikipedia.org/wiki/Henry_Kissinger), Ford, Carter ou Sadat tinham em mente durante a transição presidencial americana anterior. Era menos claro do que os acordos relativos ao Sinai e mais tarde foi interpretado de forma diferente por Israel, Egito e Estados Unidos. O destino de Jerusalém foi deliberadamente excluído deste acordo.

A segunda parte da estrutura tratou das relações egípcio-israelense, o conteúdo real elaborado na segunda estrutura Egito-Israel. A terceira parte, "Princípios Associados", declarou os princípios que deveriam ser aplicados às relações entre Israel e todos os seus vizinhos árabes.

### **Pontos principais da seção de Cisjordânia e Gaza**

- *Egito, Israel, Jordânia e os representantes do povo palestino devem participar das negociações para a resolução do problema palestino em todos os seus aspectos.*
- (1.) *Egito e Israel concordam que, a fim de garantir uma transferência pacífica e ordeira de autoridade, e levando em consideração as preocupações de segurança de todas as partes, deve haver disposições transitórias para a Cisjordânia e Gaza por um período não superior cinco anos. A fim de fornecer total autonomia aos habitantes, de acordo com essas disposições, o governo militar israelense e sua administração civil serão retirados assim que uma autoridade autônoma for livremente eleita pelos habitantes dessas áreas para substituir o governo militar existente.*
- (2.) *Egito, Israel e Jordânia chegarão a um acordo sobre as modalidades para o estabelecimento de uma autoridade autônoma eleita na Cisjordânia e em Gaza. As delegações do Egito e Jordânia podem incluir palestinos da Cisjordânia e Gaza ou outros palestinos, conforme acordado mutuamente. As partes negociarão um acordo que definirá os poderes e responsabilidades da autoridade autônoma a ser exercida na Cisjordânia e em Gaza. Uma retirada das forças armadas israelenses ocorrerá e haverá uma redistribuição das forças israelenses restantes em locais de segurança especificados. O acordo também incluirá disposições para garantir a segurança interna e externa e a ordem pública. Uma forte força policial local será estabelecida, que pode incluir cidadãos jordanianos. Além disso, as forças israelenses e jordanianas participarão de patrulhas conjuntas e da guarnição de postos de controle para garantir a segurança das fronteiras.*
- (3.) *Quando a autoridade autônoma (conselho administrativo) na Cisjordânia e Gaza for estabelecida e inaugurada, o período de transição de cinco anos terá início. O mais rápido possível, mas o mais tardar no terceiro ano após o início do período de transição, as negociações ocorrerão para determinar o status final da Cisjordânia e Gaza e sua relação com seus vizinhos e para concluir um tratado de paz entre Israel e Jordânia no final do período de transição. Essas negociações serão conduzidas entre Egito, Israel, Jordânia e os representantes eleitos dos habitantes da Cisjordânia e Gaza.... As negociações serão baseadas em todas as disposições e princípios da Resolução 242. do Conselho de Segurança das Nações Unidas. As negociações resolverão, entre outras questões, a localização dos limites e a natureza das medidas de segurança. A solução das negociações também deve reconhecer o direito legítimo dos povos palestinos e suas justas exigências.*

A estrutura dizia respeito apenas à autonomia dos habitantes da Cisjordânia e de Gaza. Não menciona o status de Jerusalém, nem o Direito Palestino de Retorno.

### **Rejeição da ONU à estrutura do Oriente Médio**

A [Assembleia Geral da ONU](https://pt.wikipedia.org/wiki/Assembleia_Geral_da_ONU) rejeitou o *Marco para a Paz no Oriente Médio*, porque o acordo foi concluído sem a participação da [ONU](https://pt.wikipedia.org/wiki/ONU) e da [OLP](https://pt.wikipedia.org/wiki/OLP) e não cumpria o direito palestino de retorno, de autodeterminação e de independência e soberania nacional. Em dezembro de 1978, ele declarou na *Resolução 33/28 A* que os acordos só eram válidos se estivessem dentro da estrutura das Nações Unidas e sua Carta e suas resoluções, incluindo o direito palestino de retorno e o direito à independência nacional e soberania na Palestina, e concluído com a participação do OLP. Em 6 de dezembro de 1979, a ONU condenou na *Resolução 34/70* todos os acordos parciais e tratados separados que não atendiam aos direitos palestinos e soluções abrangentes para a paz; condenou a ocupação contínua de Israel e exigiu a retirada de *todos os* territórios ocupados. Em 12 de dezembro, na *Resolução 34/65 B*, a ONU rejeitou partes mais específicas dos Acordos de Camp David e acordos semelhantes, que não estavam em conformidade com os requisitos mencionados. Todos esses acordos parciais e tratados separados foram fortemente condenados. A parte dos acordos de Camp David sobre o futuro palestino e todos os semelhantes foram declarados inválidos.

### **Tratado de Paz Quadro Egito e Israel**

O segundo quadro delineou uma base para o tratado de paz seis meses depois, em particular decidir o futuro da [península do Sinai](https://pt.wikipedia.org/wiki/Pen%C3%ADnsula_do_Sinai). Israel concordou em retirar suas forças armadas do Sinai, evacuar seus 4 500 habitantes civis e devolvê-lo ao Egito em troca de relações diplomáticas normais com o Egito, garantias de liberdade de passagem pelo Canal de Suez e outras vias navegáveis próximas (como o Estreito de Tiran), e uma restrição às forças que o Egito poderia colocar na península do Sinai, especialmente dentro de 20–40 km de Israel. Esse processo levar

ia três anos para ser concluído. Israel também concordou em limitar suas forças a uma distância menor (3 km) da fronteira egípcia e em garantir a passagem livre entre o Egito e a Jordânia. Com a retirada, Israel também devolveu os campos de petróleo de Abu-Rudeis, no oeste do Sinai, que continham poços comercialmente produtivos de longo prazo.

---

Source: [pt.wikipedia.org](https://pt.wikipedia.org/wiki/Acordos_de_Camp_David)', 'geo', 'acordos-de-camp-david'),
  ('Ad Hoc', 'Na área das Relações Internacionais, o termo latino *"ad hoc"* significa *"para isto"* ou *"para uma finalidade específica"*. Refere-se a algo — como uma estrutura, comissão, missão diplomática ou tribunal — que é criado ou designado temporariamente para lidar com uma situação, problema ou objetivo pontual e específico, em vez de fazer parte de um sistema ou processo permanente e pré-estabelecido.

Os principais usos e exemplos nas Relações Internacionais incluem:

- **Missões Diplomáticas Especiais:** Um Estado pode enviar uma missão diplomática *ad hoc* para negociar um tratado específico, resolver uma crise fronteiriça ou participar de uma conferência internacional pontual. Essa missão termina quando o objetivo é alcançado.
- **Tribunais Internacionais *Ad Hoc*:** Foram criados tribunais específicos para julgar crimes graves cometidos durante conflitos em regiões específicas, como o Tribunal Penal Internacional para a ex-Iugoslávia e o Tribunal Penal Internacional para Ruanda. Diferentemente do Tribunal Penal Internacional permanente (TPI), esses tribunais foram estabelecidos para uma situação e período determinados.
- **Comités e Grupos de Trabalho:** Organizações internacionais frequentemente formam comités ou grupos de trabalho *ad hoc* compostos por especialistas para estudar e apresentar recomendações sobre um tema urgente ou uma questão técnica específica.
- **Nomeação de Representantes:** Em contextos jurídicos internacionais, pode ser nomeado um representante *ad hoc* (como um juiz *ad hoc* num tribunal internacional) quando há um conflito de interesses ou necessidade de representação específica para uma determinada ação ou processo.
- **Análises e Relatórios:** Governos ou organizações podem solicitar análises ou relatórios *ad hoc* para abordar questões pontuais e urgentes que exigem informações imediatas para a tomada de decisão, fora dos ciclos de relatórios regulares.

Em resumo, o uso de "ad hoc" nas Relações Internacionais denota flexibilidade e pragmatismo para responder a necessidades imediatas e imprevistas, sem a necessidade de criar estruturas permanentes ou alterar políticas coordenadas de longo prazo.', 'geo', 'ad-hoc'),
  ('African-American Vernacular English', '**African-American Vernacular English (AAVE)** é uma variedade do inglês falada principalmente por parte da comunidade afro-americana nos Estados Unidos.

Ela não é “erro de inglês” nem “gíria mal falada” — é um **sistema linguístico completo**, com regras próprias de gramática, pronúncia e vocabulário.

### 🌍 Origem

O AAVE se desenvolveu historicamente a partir:

- do contato entre línguas africanas trazidas por pessoas escravizadas
- e diferentes variedades do inglês faladas nos EUA

Ao longo do tempo, virou uma forma estável e estruturada de falar, ligada à identidade cultural negra americana.

---

### 🧠 Características linguísticas

Alguns exemplos de regras próprias do AAVE:

- **Ausência do verbo “to be” em certos contextos**
    - *She is nice* → *She nice*

        (isso segue regra — não é aleatório)

- **Uso do “habitual be”** (indica ação recorrente)
    - *She be working* = ela costuma trabalhar (regularmente)
- **Double negatives**
    - *I don’t know nothing*

        (estrutura comum e sistemática)

---

### 🎵 Cultura e influência

O AAVE tem enorme influência na música e cultura pop, especialmente em:

- Hip hop
- R&B
- Jazz

Muitas expressões populares na internet vêm do AAVE, mesmo quando usadas por pessoas que não pertencem à comunidade negra.

---

### ⚠️ Questão social

Durante muito tempo, o AAVE foi estigmatizado como “inglês errado”, o que reflete racismo estrutural.

Hoje, linguistas reconhecem que é uma variedade legítima do inglês, assim como o inglês britânico ou o inglês australiano.', 'zei', 'african-american-vernacular-english'),
  ('Air-gapped', 'Air-gapped describes a computer system or network that is completely isolated from unsecured networks, including the public internet and local wireless connections.

**How It Works**

- **Physical Isolation:** The computer has no wired or wireless network interfaces connected to the outside world. Wi-Fi, Bluetooth, and cellular cards are often disabled or removed.
- **Logical Isolation:** Software or firewalls create a strict barrier, though physical separation is the most secure method.
- **Manual Data Transfer:** Moving files into or out of the system requires a physical medium, such as a USB flash drive or external hard drive.

**Common Uses**

- **Data Backups:** Organizations use air-gapped backups to protect critical data from ransomware and cyberattacks. Even if the main network gets hacked, the isolated backup remains safe.
- **Critical Infrastructure:** Power plants, aviation systems, and water treatment facilities use air gaps to prevent remote tampering.
- **Government and Military:** Highly classified secrets and defense networks rely on this isolation to stop data theft.', 'geo', 'air-gapped'),
  ('Al-Qaeda', 'A Al-Qaeda é uma organização militante pan-islamista e rede terrorista internacional fundada em 1988 por Osama bin Laden.

**Origem e Objetivos**

- **Fundação:** O grupo surgiu no final da ocupação soviética no Afeganistão, reunindo combatentes árabes.
- **Meta Principal:** Unir o mundo muçulmano sob um califado global e eliminar a influência ocidental.
- **Ideologia:** Segue uma vertente sunita jihadista radical.

**Principais Atentados**

- **Atentados de 1998:** Explosões em embaixadas dos Estados Unidos na África.
- **Ataque ao USS Cole:** Atentado contra um navio de guerra americano no Iêmen em 2000.
- **11 de Setembro de 2001:** Sequestro de aviões comerciais contra o World Trade Center e o Pentágono, que provocou a "Guerra ao Terror" liderada pelos EUA.

**Situação Atual**

- **Declínio Central:** A liderança histórica e a base no Afeganistão foram severamente enfraquecidas após a morte de Osama bin Laden (2011) e de Ayman al-Zawahiri (2022).
- **Atuação por Filiadas:** Atualmente, a força do grupo concentra-se em ramificações regionais ativas, com destaque para a região do Sahel, na África, onde filiadas continuam a realizar operações e combates locais.

---

Source: [pt.wikipedia.org](https://pt.wikipedia.org/wiki/Al-Qaeda)', 'geo', 'al-qaeda'),
  ('Art Washing', '“Artwashing“ é um termo usado para descrever a utilização da arte, da cultura e dos artistas de forma a camuflar ou legitimar ações negativas, especialmente no contexto da gentrificação.

Essa prática visa criar uma imagem positiva de um indivíduo, organização ou entidade, especialmente quando essa imagem é contraditória com a sua atuação real.

---

Source: [projetodraft.com](https://www.projetodraft.com/verbete-draft-o-que-e-artwashing/)', 'art', 'art-washing'),
  ('Artificial General Intelligence (AGI)', 'Artificial general intelligence (AGI) is a theoretical type of artificial intelligence that can learn, reason, and perform any intellectual task that a human can do.

Unlike current narrow AI tools that only excel at specific jobs, an AGI system could adapt to unfamiliar domains and solve problems without task-specific training.

**Key Characteristics of AGI**

- **Generalization:** it can transfer skills and knowledge learned in one area to a completely different domain.
- **Autonomous Reasoning:** it can make decisions, plan, and solve novel problems without needing manual reprogramming.
- **Common Sense:** it possesses a broad contextual understanding of the world, similar to human cognition.

**Current Status and Challenges**

- **Still Theoretical:** true AGI does not exist yet. Today''s advanced models (like large language models) rely on pattern recognition rather than genuine understanding.
- **Major Obstacles:** researchers must overcome hurdles like developing true common sense, bridging the physical and digital worlds, and managing massive energy and computing demands.
- **Safety Concerns:** experts debate the ethical risks, potential job displacement, and long-term control of systems that match or surpass human intelligence.', 'geo', 'artificial-general-intelligence-agi'),
  ('Artificial Narrow Intelligence (ANI)', 'Artificial Narrow Intelligence (ANI), also known as “weak AI” or “narrow AI,” is a type of artificial intelligence designed to perform a single specific task or a limited set of tasks within predefined parameters.

**How ANI Works**

- **Specialized focus:** operates strictly within a narrow, defined domain without general cognitive adaptability.
- **Pattern recognition:** uses advanced machine learning algorithms and large datasets to make predictions or decisions.
- **No transferability:** cannot apply learned skills or transfer knowledge to unrelated domains.
- **No consciousness:** lacks self-awareness, real comprehension, or sentience.

**Common Examples**

- **Virtual assistants:** tools like Siri or Amazon Alexa answering specific voice commands.
- **Recommendation engines:** algorithms used by Netflix or YouTube to suggest media.
- **Perception systems:** facial recognition software and autonomous driving algorithms.
- **Generative tools:** large language models like chat applications that process text-based inputs.', 'geo', 'artificial-narrow-intelligence-ani'),
  ('Artificial Superintelligence (ASI)', 'A Inteligência Artificial Superinteligente (ASI) é um estágio hipotético em que um sistema de IA supera amplamente e de forma sustentada toda a capacidade intelectual humana em praticamente todas as áreas, incluindo raciocínio, criatividade, ciência e resolução de problemas.

**O que define a ASI?**

- **Superação global:** vai além da Inteligência Artificial Estreita (ANI), que executa tarefas específicas, e da Inteligência Artificial Geral (AGI), que emparelha a inteligência humana.
- **Autoaperfeiçoamento recursivo:** capacidade teórica de reescrever e otimizar seu próprio código de forma contínua, gerando uma “explosão de inteligência” rápida e exponencial.
- **Inovação autônoma:** habilidade de explorar o desconhecido e criar novos conhecimentos científicos além dos limites biológicos humanos.

**Benefícios e Riscos Potenciais**

- **Avanços científicos:** soluções para problemas complexos em medicina, física e exploração espacial.
- **Riscos existenciais:** perda de controle humano sobre uma entidade com objetivos desalinhados aos valores da humanidade.
- **Governança:** necessidade urgente de marcos éticos globais e regulamentações de segurança por design (como iniciativas de empresas e propostas legislativas recentes).', 'geo', 'artificial-superintelligence-asi'),
  ('Assentamento Israelense', 'Os assentamentos israelenses ou israelitas, ou colonatos judaicos são colônias construídas por Israel, a partir de 1968, na Palestina, no Egito, no Líbano e na Síria, em territórios ocupados por Israel durante a Guerra dos Seis Dias (1967). Desde então, esses territórios são controlados pelo Estado de Israel.', 'geo', 'assentamento-israelense'),
  ('Assentamento Netzarim', 'Assentamento israelense que começou como uma ocupação secular paramilitar, mas em 1984 se tornou um [*kibutz*](/glossary/kibutz) ortodoxo. Os moradores de Nitzarim foram os últimos israelenses a serem removidos da Faixa de Gaza pelas Forças de Desfesa de Israel em 2005.', 'zei', 'assentamento-netzarim'),
  ('Ausbau', 'Ausbau é uma palavra em alemão que significa expansão, ampliação, desenvolvimento ou acabamento/construção interna (como o *Innenausbau* em reformas).

**O que significa em diferentes contextos?**

- **Construção e infraestrutura:** refere-se à ampliação de estradas, redes ferroviárias ou edifícios, além de acabamentos internos.
- **Veículos (Van Ausbau):** muito usado no contexto de conversão ou personalização de vans e furgões em *motorhomes* ou veículos utilitários.
- **Indústria:** nome de marcas e equipamentos, a exemplo de rampas de carga para armazéns.
- **Linguística/Sociolinguística:** descreve o processo de desenvolvimento de uma língua padrão (*Ausbausprache*).

---

Source: [context.reverso.net](https://context.reverso.net/traducao/alemao-portugues/ausbau#:~:text=desenvolvimento%20m%20%C2%B7%20refor%C3%A7o,f.)', 'zei', 'ausbau'),
  ('Automatic Content Recognition (ACR)', 'Automatic Content Recognition (ACR) é uma tecnologia de reconhecimento automático de conteúdo integrada em Smart TVs para identificar o que é exibido na tela.

**Como funciona**

- **Captura de dados:** A TV tira pequenos recortes de áudio (impressão digital acústica) ou capturas de vídeo/pixels da tela em intervalos curtos.
- **Cruzamento de informações:** Esse material é transformado em uma assinatura digital e comparado com um banco de dados de filmes, programas, anúncios e canais.
- **Abrangência total:** Funciona independentemente da fonte (TV aberta, streaming, videogames ou aparelhos via HDMI).

**Para que serve**

- **Publicidade direcionada:** Coleta hábitos de consumo para vender dados a anunciantes e exibir propagandas personalizadas.
- **Métrica de audiência:** Ajuda fabricantes e parceiros a entenderem o tempo de exibição e a popularidade de programas.

---

Source: [en.wikipedia.org](https://en.wikipedia.org/wiki/Automatic_content_recognition)', 'res', 'automatic-content-recognition-acr'),
  ('BAT (Baidu, Alibaba and Tencent)', 'BAT é o acrônimo para Baidu, Alibaba e Tencent, as três maiores e mais influentes empresas de tecnologia da internet na China. Elas exercem um domínio comparável ao das gigantes de tecnologia dos Estados Unidos (como as Big Techs).

**As Três Gigantes**

- **Baidu:** conhecida como o **maior mecanismo de busca da China**. A empresa expandiu forte sua atuação para inteligência artificial (IA) e carros autônomos.
- **Alibaba:** líder absoluta no setor de comércio eletrônico (e-commerce). Também comanda operações massivas de logística, pagamentos digitais e computação em nuvem (Alibaba Cloud).
- **Tencent:** gigante focada em jogos eletrônicos e redes sociais / mensagens instantâneas. É dona do WeChat, o aplicativo multifuncional mais usado no país.

**Contexto de Mercado**

- **Ecossistema Digital:** em conjunto, o trio controla grande parte dos serviços digitais, dados e transações online na China.
- **Evolução:** embora ainda sejam pilares fundamentais, o mercado atual vê a ascensão de novas concorrentes em áreas industriais e de hardware avançado (como Huawei e ByteDance).', 'geo', 'bat-baidu-alibaba-and-tencent'),
  ('BRICS', 'O BRICS é um grupo de países de mercado emergente em relação ao seu desenvolvimento econômico. Trata-se de um acrônimo da língua inglesa que é geralmente traduzido como “os BRICS” ou “países BRICS”.

![BRICS](/glossary/brics-1.webp)

O agrupamento começou com quatro países sob o nome BRIC, reunindo Brasil, Rússia, Índia e China, até que, em 14 de abril de 2011, o "S" acrescido resultou da admissão da África do Sul (do inglês: South Africa) ao grupo.

Em 1 de janeiro de 2024, Egito, Emirados Árabes Unidos, Arábia Saudita, Etiópia e Irã aderiram ao bloco como membros plenos.

Brasil, Rússia, Índia, China, África do Sul, Egito, Emirados Árabes Unidos, Etiópia, Irã', 'geo', 'brics'),
  ('Balance of Payments (BoP)', 'The balance of payments (BOP) is the method countries use to monitor all international monetary transactions in a specific period. The BOP is usually calculated every quarter and every calendar year.

All trades conducted by both the private and public sectors are accounted for in the BOP to determine how much money is going in and out of a country. If a country has received money, this is known as a credit, and if a country has paid or given money, the transaction is counted as a debit.

Theoretically, the BOP should be zero, meaning that assets (credits) and liabilities (debits) should balance, but in practice, this is rarely the case. Thus, the BOP can tell the observer if a country has a deficit or a surplus and from which part of the economy the discrepancies are stemming.', 'geo', 'balance-of-payments-bop'),
  ('Balança sectária', 'A **balança sectária** é um termo utilizado para descrever o **equilíbrio instável** entre diferentes **grupos religiosos**, **étnicos** ou **sectários** dentro de um sistema político, especialmente em países com grande diversidade religiosa ou étnica. Em contextos como o **Líbano**, por exemplo, a balança sectária se refere a um sistema de **distribuição de poder** onde cargos políticos e posições importantes são alocados de forma proporcional entre os diversos grupos religiosos ou sectários.

### Características principais da balança sectária:

1. **Equilíbrio de poder entre grupos**: Em um sistema de balança sectária, as **decisões políticas** e **cargos** são divididos entre os diferentes grupos, com o objetivo de evitar a dominação de um grupo sobre os outros.
2. **Representação proporcional**: A distribuição de cargos ou benefícios é frequentemente feita de maneira que cada grupo sectário tenha representação no governo, nas forças armadas, na administração pública e até mesmo em outros setores importantes da sociedade.
3. **Objetivo de evitar conflitos**: O sistema tenta evitar conflitos sectários violentos, criando um modelo de governança baseado no compromisso e na cooperação entre diferentes grupos.

### Exemplo de balança sectária: **Líbano**

Um exemplo clássico de balança sectária é o sistema político do **Líbano**, onde o poder é dividido entre **muçulmanos** (sunitas e xiitas), **cristãos** (maronitas, entre outros) e outros grupos religiosos. No Líbano, a presidência é tradicionalmente ocupada por um cristão maronita, o primeiro-ministro por um muçulmano sunita e o presidente do parlamento por um muçulmano xiita, com outras posições políticas importantes também sendo compartilhadas entre os diferentes grupos.

### Críticas e desafios:

Embora a balança sectária tenha sido criada para promover a **estabilidade política** em sociedades fragmentadas, ela também enfrenta várias críticas, como:

- **Estagnação política**: O sistema pode levar a uma **falta de inovação** política, já que as decisões muitas vezes precisam de um acordo entre todos os grupos, o que pode resultar em **compromissos** e **acordos superficiais**.
- **Sectarianismo exacerbado**: Em vez de promover a integração nacional, o sistema pode **reforçar divisões sectárias** e dificultar a formação de uma identidade nacional unificada.
- **Favoritismo e clientelismo**: A distribuição de poder entre grupos pode levar ao **favoritismo** e ao **clientelismo**, onde os recursos são alocados com base na lealdade sectária, e não na meritocracia ou nas necessidades da população como um todo.

Em resumo, a balança sectária é uma estratégia política para administrar a diversidade religiosa e étnica em um país, mas também pode trazer desafios relacionados a divisões sociais e dificuldades de governança.', 'geo', 'balanca-sectaria'),
  ('Balanço do Poder (Balance of Power)', 'O conceito de **Balanço do Poder** (ou *Equilíbrio de Poder*) é uma das teorias mais centrais e tradicionais do Realismo nas Relações Internacionais.

Em termos simples, o princípio básico é: **nenhum Estado ou aliança deve se tornar tão poderoso a ponto de dominar todos os outros ou ditar as regras do sistema internacional.** Quando o poder está distribuído de forma relativamente homogênea, cria-se estabilidade e evita-se a hegemonia ou a tirania de uma única potência.

## 1. O que significa na prática?

O balanço do poder parte da premissa de que o sistema internacional é **anárquico** (não existe um "governo mundial" ou autoridade central para impor a ordem e proteger os países). Nesse cenário:

- **Insegurança estrutural:** Os Estados precisam garantir sua própria sobrevivência e segurança.
- **Ameaça do poder acumulado:** Se um Estado cresce demais militar ou economicamente, os vizinhos percebem isso como uma ameaça existencial.
- **Mecanismos de contenção:** Para se proteger, os demais Estados reagem para conter esse crescimento ou compensar a assimetria de forças.

## 2. Tipos de Comportamento (Como os Estados reagem?)

Diante do surgimento de uma grande potência ou ameaça, os Estados costumam adotar duas estratégias principais:

- **Balancimento (Balancing):** Aliar-se a outros Estados contra a potência ascendente para conter seu avanço.
    - *Exemplo histórico:* As sucessivas coalizões europeias formadas para conter a França sob o comando de Napoleão Bonaparte.
- **Aderência (Bandwagoning):** Aliar-se diretamente à potência mais forte (ou mais ameaçadora) para obter proteção, vantagens ou evitar ser atacado.
    - *Uso:* Mais comum em Estados menores ou vulneráveis quando a contenção parece inviável.

## 3. Formas de Fazer Balancimento (*Internal vs. External*)

Os Estados podem equilibrar o poder por dois caminhos:

- **Balancimento Interno (*Internal Balancing*):** Fortalecimento das capacidades próprias. O país investe na sua base industrial de defesa, desenvolve novas tecnologias, expande forças armadas e impulsiona a economia nacional.
- **Balancimento Externo (*External Balancing*):** Criação ou fortalecimento de alianças formais e informais com outros países para somar forças contra uma ameaça comum (como a criação da OTAN durante a Guerra Fria).
- **Soft Balancing (Balancimento Brando):** Uso de diplomacia, instâncias multilaterais (como a ONU), acordos econômicos ou regras internacionais para atrasar, encarecer ou dificultar a ação unilateral de uma superpotência, sem recorrer ao confronto militar direto.

## 4. Distribuição de Poder e Polaridade

A forma como o poder está distribuído no sistema define a sua **polaridade**, o que afeta diretamente a estabilidade internacional:

- **Unipolaridade:** Uma única hiperpotência domina o sistema (ex.: os EUA na década de 1990 após o fim da União Soviética). Não há balanço tradicional, pois a assimetria de poder é muito grande.
- **Bipolaridade:** Duas grandes potências rivalizam entre si (ex.: EUA e URSS na Guerra Fria). O balanço tende a ser direto, rígido e altamente previsível.
- **Multipolaridade:** Três ou mais grandes potências disputam influência (ex.: a Europa no século XIX). As alianças são mais flexíveis e fluidas, mas o risco de erros de cálculo e guerras de grande proporção pode aumentar.

## 5. Principais Abordagens Teóricas

| **Corrente Teórica** | **Visão sobre o Balanço de Poder** |
| --- | --- |
| **Realismo Clássico** *(ex.: Hans Morgenthau)* | O balanço é resultado direto da ação deliberada da diplomacia e de estadistas buscando conter o desejo natural de expansão do poder. |
| **Neorrealismo / Realismo Estrutural** *(ex.: Kenneth Waltz)* | O balanço ocorre de forma **automática** e inevitável devido à estrutura anárquica do sistema, independentemente da vontade individual dos líderes. |
| **Realismo Ofensivo** *(ex.: John Mearsheimer)* | O objetivo final de cada Estado é alcançar a hegemonia regional para garantir sua sobrevivência, o que torna o balanço de poder instável por natureza. |
| **Realismo Defensivo** *(ex.: Stephen Walt)* | Os Estados reagem principalmente à **ameaça percebida** (*Balance of Threat*), considerando não apenas o poder militar bruto, mas também a intenção agressiva e a proximidade geográfica. |', 'geo', 'balanco-do-poder-balance-of-power'),
  ('Bandwagoning (aderência)', '**Bandwagoning** (ou *aderência*) é a estratégia política e militar em que um Estado decide **se aliar diretamente à potência mais forte ou à principal ameaça do sistema**, em vez de tentar contê-la.

O objetivo principal do país que adota essa conduta é garantir sua própria sobrevivência por meio do apaziguamento ou se beneficiar do poder do hegemônio obtendo proteção, vantagens econômicas, ganhos territoriais e diplomáticos.

### Por que os Estados adotam o Bandwagoning?

1. **Acomodação defensiva:** Diante de uma potência militarmente avassaladora, Estados menores reconhecem a impossibilidade de resistência e se alinham ao agressor para evitar invasão ou destruição.
2. **Oportunismo geopolítico:** Estados que buscam alterar a ordem vigente associam-se à potência emergente para participar da divisão dos espólios e recompensas após a reconfiguração do poder.
3. **Ausência de alternativas:** Ocorre quando não existem parceiros ou alianças viáveis no entorno regional para oferecer proteção crível.', 'geo', 'bandwagoning-aderencia'),
  ('Bandwidth (Largura de Banda)', 'O termo **Bandwidth** (em português, *Largura de Banda*) tem significados diferentes dependendo do contexto em que é usado: **Telecomunicações/TI**, **Psicologia/Gestão** ou **Teoria Geral**.

### 1. Em Redes, TI e Telecomunicações (Sentido Técnico)

É a **capacidade máxima de transferência de dados** de uma conexão de rede ou canal de comunicação em um determinado período de tempo.

- **Como é medida:** Geralmente em bits por segundo (**bps**, **Mbps**, **Gbps**).
- **Analogia clássica:** Pense na rede como um **cano de água**. A largura de banda é o *diâmetro do cano*. Quanto mais largo o cano, mais água (dados) pode passar por ele ao mesmo tempo.
- **Diferença de *Speed/Latency* (Velocidade/Latência):** A largura de banda mede o *volume de dados* que cabe na conexão por segundo, enquanto a velocidade/latência mede o *tempo* que uma informação leva para ir do ponto A ao ponto B.

### 2. Em Psicologia e Produtividade (Sentido Figurado)

O termo foi adaptado para a ciência cognitiva e o ambiente de trabalho para descrever a **capacidade mental, cognitiva ou de tempo** que uma pessoa tem disponível para processar informações, tomar decisões ou assumir novas tarefas.

- **Exemplo de uso:** *"Não tenho bandwidth mental para assumir este projeto esta semana"* (significa que a atenção e o tempo da pessoa já estão completamente lotados).
- **Cognitive Bandwidth (Largura de Banda Cognitiva):** A quantidade de foco e memória de trabalho disponível em determinado momento. Estresse, privação de sono e sobrecarga de tarefas reduzem essa "largura de banda", levando a erros de julgamento.', 'geo', 'bandwidth-largura-de-banda'),
  ('Beligerantes', '"Beligerante" refere-se a alguém ou algo que está em guerra ou conflito, seja um país, um grupo ou uma pessoa que se envolve em combate ou age de forma hostil. O termo vem do latim "belligerans", que significa "travar guerra".', 'geo', 'beligerantes'),
  ('Big Nine (Amy Webb Concept)', 'The “Big Nine” concept, introduced by futurist Amy Webb in her 2019 book *The Big Nine: How the Tech Titans and Their Thinking Machines Could Warp Humanity*, refers to the nine dominant technology corporations that control the vast majority of artificial intelligence (AI) research, data, patents, and top talent.

**The Companies**

The Big Nine are divided into two geopolitical and economic blocs:

- **The US "G-MAFIA":** Google, Microsoft, Amazon, Meta (Facebook), IBM, and Apple. Driven primarily by free-market capitalism, shareholder returns, and short-term financial gains.
- **The Chinese "BAT" Bloc:** Baidu, Alibaba, and Tencent. Closely aligned with state policies aimed at national long-term planning, surveillance, and authoritarian control.

**Core Concerns**

- **Monopoly of Power:** a small group of unelected corporate leaders and executives effectively dictate the trajectory of human progress through data and algorithms.
- **Misaligned Motivations:** these commercial systems optimize for profit or state control rather than human well-being, ethics, or societal benefit.
- **Unpredictable Future:** unchecked development risks creating advanced AI models that operate outside human values and logic.

**Proposed Solutions**

Webb proposes shifting away from this dangerous trajectory by establishing a comprehensive national AI strategy in the US and creating international cooperative bodies—such as a Global Alliance of Intelligence Augmentation—to enforce humanistic values and oversight.', 'geo', 'big-nine-amy-webb-concept'),
  ('BotNet', 'Uma botnet é uma **rede de computadores ou dispositivos infectados por malware que são controlados remotamente por um cibercriminoso, conhecido como "líder de bot"**. Esses dispositivos se tornam "zumbis" e são usados para realizar ataques cibernéticos em larga escala, como ataques de Negação de Serviço Distribuída (DDoS), roubo de dados, envio de spam ou mineração ilícita de criptomoedas. Embora existam usos legítimos para bots, o termo geralmente se refere a essa rede maliciosa.

### **Como funcionam**

- **Infecção:** Dispositivos são infectados por malware, geralmente por meio de downloads maliciosos, phishing ou explorando vulnerabilidades de segurança.
- **Controle:** O líder de bot envia comandos para os dispositivos infectados através de um servidor de comando e controle (C2).
- **Ataque coordenado:** A botnet executa as tarefas maliciosas de forma coordenada, aproveitando a capacidade de processamento e o tráfego de rede de muitos dispositivos ao mesmo tempo.

### **Tipos de atividades maliciosas**

- [**Ataques de Negação de Serviço Distribuída (DDoS)](DDoS%20(Distributed%20Denial%20of%20Service)%202bd0c519cad480e6b6bfe68f8a2a1932.md):** Sobrecarregam um alvo com tráfego, tornando-o indisponível para usuários legítimos.
- **Roubo de dados:** Os dispositivos podem ser usados para coletar e enviar informações confidenciais, como senhas e dados bancários.
- [**Envio de spam](https://www.google.com/search?q=Envio+de+spam&sca_esv=940aa337a8577638&sxsrf=AE3TifMm7XdBd7Gy824i-kvSkYc-H0n_uw%3A1764718901791&ei=NXkvab6BMMfU1sQPsouayQY&ved=2ahUKEwjMn_rOiqCRAxXGqpUCHSDvCaIQgK4QegYIAQgAEBk&uact=5&oq=Botnets&gs_lp=Egxnd3Mtd2l6LXNlcnAiB0JvdG5ldHMyBRAAGIAEMgUQABiABDIIEAAYgAQYywEyCBAAGIAEGMsBMggQABiABBjLATIIEAAYgAQYywEyCBAAGIAEGMsBMggQABiABBjLATIIEAAYgAQYywEyCBAAGIAEGMsBSMsIUJoGWJoGcAN4AJABAJgBnwGgAZ8BqgEDMC4xuAEDyAEA-AEC-AEBmAIBoAKmAZgDAIgGAZIHAzAuMaAHnQWyBwMwLjG4B6YBwgcDMi0xyAcG&sclient=gws-wiz-serp):** Botnets são usadas para enviar um grande volume de e-mails de spam e phishing.
- [**Criptomineração](/glossary/criptomineracao):** O poder de processamento dos dispositivos é usado para minerar criptomoedas sem o conhecimento do proprietário.
- **Fraude de anúncios:** As botnets podem gerar tráfego falso em sites para aumentar artificialmente as visualizações de anúncios e gerar receita ilícita.', 'geo', 'botnet'),
  ('Buffer Zone', 'Uma "buffer zone" (zona de amortecimento) é uma **área de transição criada entre duas áreas diferentes para separar, proteger ou suavizar a interação entre elas**, como uma zona militar entre exércitos, uma faixa ao redor de um corpo d''água para protegê-lo de poluição, ou uma área verde entre um parque e uma cidade para integrar a natureza ao tecido urbano. A finalidade específica varia, podendo ser para proteção ambiental, segurança militar, ou para integrar diferentes funções de paisagem e urbanismo.

## Exemplos e Aplicações

- Militares e Políticas: Uma faixa de terra que separa dois países ou regiões para evitar conflitos diretos, como as zonas desmilitarizadas.
- Ambiental: Uma área de vegetação nativa plantada ao longo de corpos d''água para evitar que poluentes, como fertilizantes e pesticidas, cheguem à água.
- Patrimônio Cultural: Zonas de amortecimento ao redor de um bem do Patrimônio Mundial da UNESCO são essenciais para a proteção da integridade do local.
- Urbanismo e Arquitetura: Áreas de transição entre um parque e o tecido urbano para harmonizar as funções da construção e da paisagem, criando uma infraestrutura verde.
- Agricultura: Faixas sem o uso de pesticidas e fertilizantes perto de rios e lagos para protegê-los da poluição da água proveniente de áreas agrícolas.

## Funções Principais

- Proteção: Evita que riscos, como poluição ou agressões, afetem um dos lados da zona.
- Segurança: Cria uma barreira física ou estratégica entre áreas conflitantes.
- Transição: Serve como uma área de interface que suaviza as características e usos de duas regiões diferentes.
- Conservação: Garante a proteção de ecossistemas e recursos hídricos.

---

Source: [pt.wikipedia.org](https://pt.wikipedia.org/wiki/Zona-tamp%C3%A3o)', 'geo', 'buffer-zone'),
  ('Bureau of Indian Affairs (BIA)', 'The BIA''s mission is to enhance the quality of life, promote economic opportunities, and to carry out the federal responsibilities entrusted to us to protect and improve the trust assets of American Indians and Alaska Natives. They accomplish this by directly empowering Tribal governments through self-governance agreements.

The Bureau of Indian Affairs (BIA), also known as Indian Affairs (IA), is a United States federal agency within the Department of the Interior. It is responsible for implementing federal laws and policies related to Native Americans and Alaska Natives, and administering and managing over 55,700,000 acres (225,000 km2) of reservations held in trust by the U.S. federal government for indigenous tribes. It renders services to roughly 2 million indigenous Americans across 574 federally recognized tribes. The BIA is governed by a director and overseen by the assistant secretary for Indian affairs, who answers to the secretary of the interior.

The BIA works with tribal governments to help administer law enforcement and justice; promote development in agriculture, infrastructure, and the economy; enhance tribal governance; manage natural resources; and generally advance the quality of life in tribal communities. Educational services are provided by Bureau of Indian Education—the only other agency under the assistant secretary for Indian affairs—while health care is the responsibility of the U.S. Department of Health and Human Services through its Indian Health Service.

---

Source: [en.wikipedia.org](https://en.wikipedia.org/wiki/Bureau_of_Indian_Affairs)', 'geo', 'bureau-of-indian-affairs-bia'),
  ('Byproduct (subproduct)', 'O termo “byproduct” (em português, subproduto) refere-se a algo que é gerado como resultado secundário de um processo principal, sem ser o objetivo principal desse processo.

### Definição aprofundada

Um **byproduct** é qualquer resultado, material ou efeito que surge **indiretamente** durante a produção de algo ou a realização de uma atividade. Ele não é o foco principal, mas ainda assim pode ter valor — ou, em alguns casos, pode ser indesejado.

## No contexto científico (química/indústria)

Em química, um byproduct é uma substância produzida junto com o produto principal de uma reação.

- Exemplo:
Ao queimar combustível para gerar energia, o objetivo principal é a energia, mas gases como dióxido de carbono são **byproducts**.

Aqui o byproduct pode ser:

- útil (reaproveitado em outro processo)
- neutro
- ou prejudicial (como poluentes)

---

## No contexto industrial

Na indústria, subprodutos surgem durante a fabricação de bens.

- Exemplo:
Na produção de carne, partes como couro ou ossos são byproducts.

Esses subprodutos muitas vezes são:

- reaproveitados (ex: couro → roupas)
- vendidos separadamente
- descartados

---

## No sentido figurado (mais amplo)

O termo também é usado de forma abstrata para descrever consequências indiretas.

- Exemplo:
“O sucesso dele foi um byproduct do esforço constante.”

Aqui significa que:

- o sucesso **não era necessariamente o objetivo direto**, mas aconteceu como consequência.

---

## Características principais de um byproduct

Um byproduct geralmente:

- não é o objetivo principal
- surge inevitavelmente do processo
- pode ter valor econômico ou funcional
- pode ser positivo, neutro ou negativo

---

## Diferença importante

- **Produto principal** → aquilo que se quer produzir
- **Byproduct (subproduto)** → aquilo que aparece como consequência

---

## Resumindo

*“Byproduct” significa **resultado secundário de uma ação ou processo**, que não era o foco principal, mas que surge naturalmente e pode ou não ser útil.*', 'zei', 'byproduct-subproduct'),
  ('Califado Abássida', 'O Califado Abássida foi o terceiro califado islâmico da história, governado pela dinastia abássida entre 750 d.C. e 1258 d.C.

![Califado Abássida](/glossary/califado-abassida-1.webp)

**Origem e Capital**

- **Ascensão:** Surgiu após uma revolta bem-sucedida que derrubou o [**Califado Omíada**](https://www.worldhistory.org/trans/pt/1-18631/dinastia-abassida/).
- **Liderança:** A dinastia descendia de al-Abbas, tio do profeta Maomé.
- **Bagdá:** Os governantes transferiram a capital para a cidade planejada de [**Bagdá**](https://revistaforum.com.br/historia/califado-abassida-o-imponente-imperio-islamico-esquecido-no-tempo/), no Iraque, fundada em 762 d.C. às margens do rio Tigre.

**Era de Ouro do Islã**

- **Auge cultural e científico:** O período entre os séculos VIII e X marcou o apogeu do império, conhecido como a [**Idade de Ouro do Islã**](https://dialnet.unirioja.es/servlet/articulo?codigo=6224658).
- **Casa da Sabedoria:** Em Bagdá, a instituição reuniu estudiosos para traduzir e expandir textos de filosofias grega, persa e indiana.
- **Avanços:** Houve grandes progressos em matemática, astronomia, medicina e literatura.

**Declínio e Queda**

- **Descentralização:** A partir do século IX, o poder central enfraqueceu e províncias ganharam autonomia.
- **Invasões:** O império sofreu invasões de dinastias regionais e terminou em 1258 d.C., com a conquista de Bagdá pelos mongóis.

---

Source: [pt.wikipedia.org](https://pt.wikipedia.org/wiki/Califado_Ab%C3%A1ssida)', 'zei', 'califado-abassida'),
  ('Canal de Suez', 'O **Canal de Suez** é uma das rotas marítimas mais estratégicas e importantes do mundo, conectando o **Mar Mediterrâneo** ao **Mar Vermelho**. Ele permite a navegação direta entre a Europa e a Ásia, sem a necessidade de contornar o continente africano, o que economiza tempo e distância para o transporte de mercadorias.

### História e Importância:

1. **Construção**: O canal foi inaugurado em **1869**, após a construção dirigida pelo engenheiro francês **Ferdinand de Lesseps**, que conseguiu superar grandes desafios técnicos e políticos para sua construção, com o apoio do Império Francês. A obra foi uma grande conquista da engenharia da época.
2. **Propriedade e Controle**: Inicialmente, o Canal de Suez era controlado pelos franceses e pelos egípcios, mas, em **1956**, o então presidente egípcio **Gamal Abdel Nasser** nacionalizou o canal, o que gerou uma crise internacional, conhecida como **Crise de Suez**. Nasser tomou a medida para financiar a construção da **Represa de Aswan**, depois que o Reino Unido e os EUA retiraram o apoio financeiro ao projeto. A nacionalização do canal levou a um conflito militar envolvendo o Reino Unido, a França e Israel, mas, no final, o Egito manteve o controle do canal.
3. **Importância Econômica**: O Canal de Suez é vital para o comércio global. Ele permite o transporte de petróleo, mercadorias e produtos entre os continentes com muito mais rapidez do que outras rotas marítimas. Aproximadamente 10% do comércio mundial passa por ali, incluindo uma grande parte das exportações de petróleo da região do Golfo Pérsico.
4. **Geopolítica**: O controle sobre o Canal de Suez tem sido motivo de interesse estratégico para várias potências, especialmente durante os períodos de tensões políticas e militares no Oriente Médio. A crise de 1956 é apenas um exemplo de como o canal pode ser um ponto de discórdia entre grandes potências.
5. **Expansão e Modernização**: Nos últimos anos, o Egito tem investido na **expansão do Canal de Suez** para permitir o tráfego de navios maiores e aumentar sua capacidade. Em 2015, foi inaugurada uma nova rota paralela, permitindo que mais embarcações passem ao mesmo tempo, aumentando a eficiência do canal.

**Nacionalizar** o Canal de Suez significa que o governo do Egito assumiu o controle total do canal, transferindo a propriedade e a administração do empreendimento para o Estado egípcio. Antes da nacionalização, o canal era operado por uma empresa internacional, a **Companhia do Canal de Suez**, que era de propriedade majoritária de franceses e britânicos.

Quando o presidente egípcio **Gamal Abdel Nasser** nacionalizou o canal em **1956**, ele decidiu que o governo egípcio deveria ser o único responsável pela gestão e pelos lucros do canal, sem a intervenção de potências estrangeiras. Essa ação foi tomada para financiar a construção da **Represa de Aswan** e também como um ato de afirmação da soberania egípcia.

A nacionalização gerou tensões internacionais, pois o Reino Unido e a França, que tinham grandes interesses econômicos e políticos no canal, não aceitaram bem a decisão. Isso levou à **Crise de Suez**, onde ambos os países, juntamente com Israel, tentaram intervir militarmente para retomar o controle do canal. No entanto, o Egito conseguiu manter o controle, com apoio de outros países e da pressão internacional, especialmente dos Estados Unidos e da União Soviética.

![Canal de Suez](/glossary/canal-de-suez-1.webp)', 'geo', 'canal-de-suez'),
  ('Cavalos de Troia (Trojan)', '**É um tipo de [malware](/glossary/malware) que se disfarça de programa legítimo para enganar o usuário e obter acesso ao sistema**. Ele não se replica sozinho como um vírus, mas pode executar tarefas maliciosas como roubar dados confidenciais, espionar o usuário, apagar arquivos ou permitir que criminosos controlem o dispositivo remotamente.

### **Como funciona**

- **Disfarce:** O malware se apresenta como um aplicativo, arquivo ou e-mail inofensivo e desejável.
- **Instalação:** O usuário, ao ser enganado, baixa e executa o programa, permitindo a instalação do Trojan.
- **Ação:** Uma vez instalado, o malware pode permanecer oculto até ser ativado, abrindo uma "porta dos fundos" para que ações maliciosas sejam executadas no dispositivo.

### **Como se proteger**

- **Antivírus:** Mantenha um programa antivírus e de segurança na internet atualizado e execute verificações periódicas.
- **Atualizações:** Mantenha o sistema operacional e outros softwares sempre atualizados para corrigir vulnerabilidades.
- **Anexos e links:** Não baixe anexos de e-mail nem clique em links de remetentes desconhecidos ou suspeitos.
- **Downloads:** Faça download de programas e aplicativos apenas de fontes confiáveis e oficiais.
- **Atenção:** Desconfie de anúncios pop-up e sites que parecem inseguros.
- **Senhas e autenticação:** Use senhas fortes e únicas, e ative a autenticação de dois fatores sempre que possível.

### **Sinais de infecção**

- Alterações repentinas nas configurações do computador.
- Desempenho do computador ficou lento ou com falhas.
- Comportamento estranho, como programas fechando sozinhos ou travamentos frequentes.
- Anúncios ou pop-ups que aparecem inesperadamente.
- Perda de recursos, como um plano de celular que acaba mais rápido que o normal.', 'geo', 'cavalos-de-troia-trojan'),
  ('Centro de Prevenção, Tratamento e Resposta a Incidentes Cibernéticos de Governo (CTiR Gov)', 'O CTIR Gov (Centro de Prevenção, Tratamento e Resposta a Incidentes Cibernéticos de Governo) é o grupo oficial do governo brasileiro responsável por prevenir, analisar e responder a ataques e incidentes de segurança cibernética em órgãos da administração pública federal.

**O que o CTIR Gov faz?**

- **Prevenção e Alerta:** Emite avisos e recomendações técnicas para evitar invasões e falhas de segurança nos sistemas públicos;
- **Tratamento de Incidentes:** Recebe e analisa notificações de ataques cibernéticos ou vulnerabilidades para conter danos rapidamente;
- **Coordenação:** Integra as ações de segurança digital entre diferentes órgãos do governo federal;
- **Não é Polícia:** Atua apenas no suporte técnico e na defesa das redes, sem função de investigação criminal (polícia judiciária).

**A qual órgão pertence?**

O centro faz parte do Gabinete de Segurança Institucional (GSI) da Presidência da República. Ele funciona como um **CSIRT** (*Computer Security Incident Response Team*, ou Equipe de Resposta a Incidentes de Segurança em Computadores) voltado para o setor público.

---

Source: [gov.br](https://www.gov.br/ctir/pt-br/sobre-o-ctir-gov)', 'geo', 'centro-de-prevencao-tratamento-e-resposta-a-incidentes-ciberneticos-de-governo-c'),
  ('Cognitive war', '> *China knows exactly what this does. Their domestic version of TikTok caps kids under 14 at 40 minutes a day, locks access between 6am and 10pm, and swaps the entire feed to educational content. Science, history, museums.

The version they export to everyone else? Unlimited, unrestricted, pure dopamine on demand.

When kids in the US and China were asked what they wanted to be when they grew up, the number one answer in America was influencer. In China it was astronaut.

Macron calls this a **cognitive war**. Export what dulls young minds and keep what makes them intelligent for your own population.

This is the most effective weapon ever deployed against a generation’s ability to think.*
>

![Mobile phone short video use negatively impacts attention functions: an EEG study](/glossary/cognitive-war-1.webp)

See: [Mobile phone short video use negatively impacts attention functions: an EEG study](https://www.frontiersin.org/journals/human-neuroscience/articles/10.3389/fnhum.2024.1383913/full)

[Mobile phone short video use negatively impacts attention functions: an EEG study](https://www.frontiersin.org/journals/human-neuroscience/articles/10.3389/fnhum.2024.1383913/full)

---

Source: [x.com](https://x.com/van00sa/status/2026962396884107294)', 'geo', 'cognitive-war'),
  ('Comissão Interamericana de Direitos Humanos (CIDH)', 'A Comissão Interamericana de Direitos Humanos (CIDH) é um órgão principal e autônomo da Organização dos Estados Americanos ([OEA](Organiza%C3%A7%C3%A3o%20dos%20Estados%20Americanos%20(OEA)%203dd0c519cad48044b67ffbee2869fada.md)) encarregado da promoção e da proteção dos direitos humanos no continente americano.

**O que é e onde fica**

- **Sede:** Washington, D.C., Estados Unidos.
- **Criação:** Fundada em 1959 pela OEA, tendo seu estatuto formalizado em 1960.
- **Composição:** Integrada por sete membros independentes, eleitos pela Assembleia Geral da OEA a título pessoal, que não representam nenhum país específico.
- **Natureza:** Diferente da Corte Interamericana de Direitos Humanos (Corte IDH, sediada em San José, Costa Rica), a CIDH não é um tribunal judicial, mas atua em uma fase prévia ou investigativa e consultiva.

**Principais Funções**

- **Recebimento de Petições:** Analisa denúncias individuais sobre violações de direitos humanos cometidas por Estados-membros.
- **Medidas Cautelares:** Adota decisões urgentes para prevenir danos irreparáveis a pessoas ou grupos em situações graves de risco.
- **Relatórios e Visitas:** Realiza visitas *in loco* aos países da região e publica relatórios temáticos ou específicos sobre a situação dos direitos humanos.
- **Encaminhamento à Corte:** Pode submeter casos à jurisdição da Corte IDH caso o Estado não cumpra as recomendações ou se o processo exigir uma decisão judicial definitiva.

---

Source: [oas.org](https://www.oas.org/pt/CIDH/Default.asp)', 'geo', 'comissao-interamericana-de-direitos-humanos-cidh'),
  ('Communicative burden', 'O conceito de “communicative burden” (ônus comunicativo) se refere à responsabilidade desproporcional que recai sobre uma pessoa ou grupo para garantir que a comunicação funcione — especialmente em contextos de desigualdade linguística, cultural ou social.

## O que significa na prática?

### Em contexto linguístico

Uma pessoa que fala com sotaque forte em um país estrangeiro pode:

- falar mais devagar
- simplificar seu vocabulário
- repetir várias vezes
- aceitar correções constantes

Enquanto os falantes nativos **não fazem o mesmo esforço**.

→ O peso da adaptação fica concentrado nela.

---

### Em contexto cultural ou político

Pessoas de minorias muitas vezes:

- precisam explicar sua cultura
- justificar comportamentos
- responder a perguntas básicas repetidamente

Enquanto o grupo dominante raramente precisa fazer o mesmo.

---

### Em deficiência e acessibilidade

Por exemplo, uma pessoa surda pode ter que:

- pedir intérprete
- explicar suas necessidades
- insistir por adaptações

Em vez de o sistema já estar preparado.

---

## Dimensão de poder

O communicative burden quase sempre revela uma **assimetria de poder**.

Quem pertence ao grupo dominante:

- comunica “naturalmente”
- não precisa se justificar
- é considerado o padrão

Quem não pertence:

- carrega o peso da adaptação
- precisa se explicar constantemente

---

## Um exemplo simples

Imagine uma sala onde todos falam francês fluentemente, exceto uma pessoa no nível A1.

Essa pessoa precisa:

- se esforçar mais
- ter mais coragem
- tolerar mal-entendidos

O esforço emocional também faz parte do communicative burden.', 'zei', 'communicative-burden'),
  ('Complexo de Israel', 'O Complexo de Israel é um conjunto de favelas na Zona Norte do Rio de Janeiro dominado pela facção criminosa Terceiro Comando Puro (TCP) [O Globo](https://oglobo.globo.com/rio/noticia/2026/08/25/o-que-e-o-complexo-de-israel-conjunto-de-favelas-com-carros-bomba-fossos-e-drones-que-desafiam-a-policia.ghtml).

**Comunidades**

O território une cinco favelas principais:

- Vigário Geral
- Parada de Lucas
- Cidade Alta
- Pica-Pau
- Cinco Bocas

**Origem e Símbolos**

- O nome foi criado em 2020 pelo traficante Álvaro Malaquias Santa Rosa, conhecido como Peixão.
- Os criminosos usam símbolos do judaísmo, como bandeiras de Israel e estrelas de Davi.
- O grupo se autodenomina evangélico e proíbe cultos de religiões de matriz africana na área.

**Situação Atual**

A região é base para o tráfico de drogas e roubos de carga na cidade.As polícias Militar e Civil realizam operações de ocupação por tempo indeterminado para conter o poder do grupo armado.

---

Source: [pt.wikipedia.org](https://pt.wikipedia.org/wiki/Complexo_de_Israel)', 'geo', 'complexo-de-israel'),
  ('Computer Security Incident Response Team (CSIRT)', 'Um CSIRT (*Computer Security Incident Response Team* ou Equipe de Resposta a Incidentes de Segurança Computacional) é um grupo especializado responsável por receber, analisar e responder a incidentes de segurança cibernética em uma organização ou rede.

No Brasil, o [**CERT.br**](https://cert.br/) (Centro de Estudos, Resposta e Tratamento de Incidentes de Segurança) atua como o grupo de referência nacional para o tratamento de incidentes de última instância.

**O que um CSIRT faz?**

- **Detecção e Triagem:** Identifica e avalia a gravidade de alertas e ataques em andamento.
- **Contenção e Erradicação:** Isola sistemas comprometidos para impedir que a ameaça se espalhe e remove o código malicioso.
- **Recuperação:** Restaura os serviços afetados de forma segura para a operação normal.
- **Análise Forense:** Investiga a causa raiz e como ocorreu a invasão.
- **Prevenção:** Monitora tendências de ameaças e propõe melhorias nas políticas de segurança.

**Composição da Equipe**

- **Líder de Resposta / Incident Manager:** Coordena as ações e decide a prioridade.
- **Analistas de Segurança e Forense:** Coletam evidências e analisam os artefatos do ataque.
- **Especialistas de Suporte (TI/Redes):** Aplicam correções e isolam ativos técnicos.
- **Áreas de Apoio:** Envolve Jurídico, Comunicação e RH dependendo do impacto do incidente.', 'geo', 'computer-security-incident-response-team-csirt'),
  ('Computer Vision Dazzle', 'Computer vision dazzle, also known as CV dazzle, dazzle makeup, or anti-surveillance makeup, is a type of camouflage used to hamper facial recognition software. However, the approach draws human attention and is readily spotted by human monitors.

CV dazzle combines stylized makeup, asymmetric hair, and sometimes infrared lights built in to glasses or clothing to break up detectable facial patterns recognized by computer vision algorithms.

CV dazzle has been shown to be somewhat successful at defeating face detection software in common use, including that employed by Facebook. CV dazzle attempts to block detection by facial recognition technologies such as DeepFace "by creating an ''anti-face''".

The approach uses occlusion, covering certain facial features; transformation, altering the shape or colour of parts of the face; and a combination of the two. Prominent artists employing this technique include Adam Harvey and Jillian Mayer.

![Computer Vision Dazzle](/glossary/computer-vision-dazzle-1.webp)

### Use in protests

Computer vision dazzle makeup has been used by protestors in several different protest movements. Its use as a protesting aid has often been found ineffective. It may be effective to thwart computer technology, but draws human attention, is easy for human monitors to spot on security cameras, and makes it hard for protestors to blend in within a crowd. Advances in facial recognition technology make dazzle makeup increasingly ineffective.

---

Source: [en.wikipedia.org](https://en.wikipedia.org/wiki/Computer_vision_dazzle)', 'res', 'computer-vision-dazzle'),
  ('Congresso Mundial Uigur', 'O Congresso Mundial Uigur (WUC) é uma organização internacional de grupos uigures exilados que afirma "representar o interesse coletivo do povo uigur" tanto dentro quanto fora da Região Autônoma Uigur de Xinjiang da República Popular da China.

O Congresso Mundial Uigur afirma ser um movimento não violento e pacífico que se opõe ao que considera ser a "ocupação" chinesa do ''Turquestão Oriental'' e defende a rejeição do totalitarismo, da intolerância religiosa e do terrorismo como um instrumento de política.

Foi chamado de "maior órgão representativo dos uigures em todo o mundo" e usa métodos mais moderados de defesa dos direitos humanos para influenciar o governo chinês dentro da comunidade internacional em contraste com organizações uigures mais radicais.

> *Os uigures são um grupo étnico turco originário e culturalmente afiliado à região geral da Ásia Central e Oriental. Os uigures são reconhecidos como a nacionalidade titular da Região Autônoma Uigur de Xinjiang, no noroeste da China. Eles são uma das 55 minorias étnicas oficialmente reconhecidas da China.*
>

---

Source: [en.wikipedia.org](https://en.wikipedia.org/wiki/World_Uyghur_Congress)', 'geo', 'congresso-mundial-uigur'),
  ('Congresso do Panamá (1826)', 'O Congresso do Panamá, também chamado de Congresso Anfictiônico do Panamá, foi uma assembleia diplomática realizada de 22 de junho a 15 de julho de 1826 na Cidade do Panamá.

**Objetivos e Idealizadores**

- **Idealizador:** Foi convocado por Simón Bolívar para unir as novas repúblicas hispano-americanas.
- **Meta principal:** Criar uma confederação política e militar para defender a soberania comum contra ameaças externas.
- **Propostas:** Incluíam uma força militar conjunta e acordos de direito internacional público.

**Participantes e Impasses**

- **Participantes:** Reuniu representantes da Grã-Colômbia, México, Peru, Províncias Unidas da América Central e convidados dos Estados Unidos.
- **Ausências:** O Império do Brasil e outras potências não aderiram ou refutaram o projeto.
- **Resultado:** Os acordos de integração assinados não entraram em vigor devido a rivalidades políticas internas e falta de ratificação.

Apesar do fracasso prático imediato, o evento é lembrado como o grande marco fundador e precursor do **pan-americanismo** e dos debates sobre a **integração latino-americana**.

---

Source: [pt.wikipedia.org](https://pt.wikipedia.org/wiki/Congresso_do_Panam%C3%A1)', 'geo', 'congresso-do-panama-1826'),
  ('Consenso de Washington', 'O Consenso de Washington foi um conjunto de dez diretrizes e recomendações de política econômica formulado em novembro de 1989 por economistas de instituições sediadas em Washington, D.C. (como o FMI, o Banco Mundial e o Tesouro dos EUA), com base em um texto do economista John Williamson.

**O que foi o objetivo**

- **Ajuste macroeconômico**: Destinado principalmente aos países emergentes e da América Latina para combater a inflação alta e a crise da dívida externa.
- **Linha neoliberal**: Defendia a redução da participação do Estado na economia e a livre atuação dos mercados.

**As principais medidas**

- **Disciplina fiscal**: Controle rigoroso dos gastos públicos para evitar déficits.
- **Privatização**: Venda de empresas estatais para a iniciativa privada.
- **Abertura comercial**: Redução de tarifas de importação e eliminação de barreiras ao comércio internacional.
- **Desregulamentação**: Remoção de regras estatais que limitavam a atividade econômica e o fluxo de capitais.

---

Source: [pt.wikipedia.org](https://pt.wikipedia.org/wiki/Consenso_de_Washington)', 'geo', 'consenso-de-washington'),
  ('Convenção de Viena sobre o Direito dos Tratados (CVDT)', 'A Convenção de Viena sobre o Direito dos Tratados, também conhecida como CVDT, é um acordo internacional que estabelece regras e diretrizes para a criação, aplicação, interpretação, alteração e término de tratados entre Estados soberanos. É considerada uma codificação do direito internacional consuetudinário sobre tratados.

### Objetivo

A CVDT tem como objetivo principal estabelecer normas claras e objetivas para a formação e o funcionamento dos tratados, evitando mal-entendidos e conflitos entre as partes.

### Âmbito de aplicação

A Convenção se aplica a tratados entre Estados, mas também a tratados entre Estados e organizações internacionais, e entre organizações internacionais.

### Regras importantes

A CVDT aborda diversos aspectos dos tratados, como a validade, a interpretação, a alteração e o término, estabelecendo princípios como o da boa-fé, a importância do consentimento das partes e a possibilidade de invocação de vícios no consentimento.

### Importância

A CVDT é um documento fundamental para o direito internacional, servindo de base para a compreensão e aplicação das regras sobre tratados em todo o mundo.

### Histórico

Foi adotada em Viena em 1969 e entrou em vigor em 1980, tendo sido ratificada por muitos países.

---

a) “treaty” means an international agreement concluded between States in written form and governed by international law, whether embodied in a single instrument or in two or more related instruments and whatever its particular designation;

b) “ratification”, “acceptance”, “approval” and “accession” mean in each case the international act so named whereby a State establishes on the international plane its consent to be bound by a treaty;

c) “full powers” means a document emanating from the competent authority of a State, designating person or persons to represent the State for negotiating, adopting or authenticating the text of a treaty, for expressing the consent of the State to be bound by a treaty, or for accomplishing any other act with respect to a treaty;

d) “reservation” means a unilateral statement, however phrased or named, made by a State, when signing, ratifying, accepting, approving or acceding to a treaty, whereby it purports to exclude or to modify the legal effect of certain provisions of the treaty in their application to that State;

e) “negotiating State” means a State which took part in the drawing up and adoption of the text of the treaty;

f) “contracting State” means a State which has consented to be bound by the treaty,whether or not the treaty has entered into force;

g) “party” means a State which has consented to be bound by the treaty and for which the treaty is in force;

h) “third State” means a State not a party to the treaty;

i) “international organization” means an intergovernmental organization.', 'geo', 'convencao-de-viena-sobre-o-direito-dos-tratados-cvdt'),
  ('Cosmo-partisan (Kosmopartisan)', 'O termo "cosmo-partisan" (ou *cosmo-partisano*) refere-se principalmente a um conceito da filosofia política e do direito internacional, frequentemente associado a discussões sobre a obra do teórico político Carl Schmitt.

O conceito explora as contradições da geopolítica moderna através de duas frentes:

- **A ambiguidade do partidário (partisan):** Tradicionalmente, o partidário ou guerrilheiro é uma figura ligada à terra e a uma causa local ou nacionalista estruturada (defendendo seu próprio território contra um invasor).
- **O elemento cosmopolita (cosmo):** Ao elevar o partidário ao nível global ("cosmo"), ele perde sua ligação puramente local. Cria-se uma figura ambígua na legalidade internacional: uma força que atua globalmente fora das estruturas tradicionais dos Estados-nação.

Esse paralelo conceitual costuma ser traçado para analisar a linha tênue entre o "pirata" (um criminoso comum atuando por interesses privados) e o "herói cultural" ou combatente da liberdade (que se sacrifica em nome de uma causa ideológica globalizada) no cenário internacional moderno.', 'geo', 'cosmo-partisan-kosmopartisan'),
  ('Criptomineração', 'A **criptomineração** é o processo de **verificação e adição de transações** a uma rede blockchain, como a do Bitcoin. Mineradores utilizam computadores potentes para resolver problemas matemáticos complexos, o que garante a segurança e a integridade da rede, além de permitir a criação de novas moedas como recompensa.

### **Como Funciona**

O processo de criptomineração baseia-se em alguns princípios-chave:

- **Validação de Transações:** Quando ocorrem transações de criptomoedas, elas são agrupadas em um "bloco". Os mineradores competem para validar esse bloco, resolvendo um complexo enigma criptográfico, um processo conhecido como "prova de trabalho" (Proof of Work).
- **Adição à Blockchain:** O primeiro minerador a resolver o enigma transmite o bloco validado para a rede. Outros participantes da rede verificam a solução e, se estiver correta, o bloco é adicionado à blockchain (um livro-razão digital e descentralizado).
- **Recompensa:** Como incentivo pelo trabalho e pelo uso de recursos computacionais, o minerador bem-sucedido é recompensado com uma certa quantidade da criptomoeda minerada, além das taxas de transação.

### **Aspectos Importantes**

- **Hardware Especializado:** No início, qualquer computador podia minerar, mas hoje são necessários hardwares potentes e específicos, como servidores dedicados (ASICs), para ter sucesso, o que gerou uma indústria própria.
- **Consumo de Energia:** O processo exige uma quantidade significativa de eletricidade devido à complexidade dos cálculos, o que levanta preocupações ambientais e aumenta o custo operacional da mineração.
- **Legalidade:** No Brasil, a mineração de Bitcoin e outras criptomoedas é uma atividade legal e inclusive já recebeu incentivos fiscais do governo federal.
- **Pools de Mineração:** Para aumentar as chances de ganho, muitos mineradores se juntam em "pools" (piscinas) de mineração, onde combinam seu poder computacional e dividem as recompensas proporcionalmente.', 'geo', 'criptomineracao'),
  ('Crise dos Mísseis de Cuba (1962)', 'A Crise dos Mísseis de Cuba em outubro de 1962 foi o momento mais tenso da Guerra Fria, quando Estados Unidos e União Soviética chegaram mais perto de uma guerra nuclear em grande escala.

**O que causou a crise**

- **Revolução Cubana (1959):** Fidel Castro assumiu o poder em Cuba e aproximou o país da [**União Soviética**](https://www.bbc.com/portuguese/internacional-63309793), adotando o socialismo.
- **Mísseis na Turquia:** Os Estados Unidos instalaram mísseis nucleares na Turquia e na Itália, apontados para os soviéticos.
- **Bases em Cuba:** Para proteger a ilha de uma nova invasão americana e equilibrar o poder militar, a União Soviética enviou mísseis nucleares de médio alcance para Cuba, a apenas 150 km da costa dos EUA.

**Os 13 dias de tensão (16 a 28 de outubro)**

- **A descoberta (14 de outubro):** Um avião espião americano U-2 fotografou as bases de mísseis em construção.
- **O bloqueio (22 de outubro):** O presidente americano John F. Kennedy anunciou um bloqueio naval (chamado de "quarentena") em Cuba para impedir a chegada de novos armamentos soviéticos.
- **O Sábado Negro (27 de outubro):** O dia mais perigoso da crise, marcado pelo abate de um avião espião americano sobre Cuba e quase confronto direto no mar.

**Como terminou**

- **Acordo secreto:** O líder soviético Nikita Khrushchev concordou em retirar os mísseis de Cuba.
- **Promessa americana:** Os EUA prometeram publicamente nunca invadir Cuba e, de forma secreta, retiraram seus mísseis da Turquia meses depois.
- **Consequências:** O episódio gerou a criação do "telefone vermelho", uma linha de comunicação direta entre Washington e Moscou para evitar futuros conflitos.

---

Source: [pt.wikipedia.org](https://pt.wikipedia.org/wiki/Crise_dos_m%C3%ADsseis_de_Cuba)', 'geo', 'crise-dos-misseis-de-cuba-1962'),
  ('Cultural genocide', 'Cultural genocide is the systematic destruction of traditions, values, language, and other elements that make one group of people distinct from another.

Cultural genocide remains a recurrent topic, appearing not only in the form of wide-ranging claims about the commission of cultural genocide in diverse contexts but also in the legal sphere, as exemplified by the discussions before the International Criminal Tribunal for the Former Yugoslavia and also the drafting of the UN Declaration on the Rights of Indigenous Peoples.

These discussions have, however, displayed the lack of a uniform understanding of the concept of cultural genocide and thus of the role that international law is expected to fulfil in this regard.

The Concept of Cultural Genocide: An International Law Perspective details how international law has approached the core idea underlying the concept of cultural genocide and how this framework can be strengthened and fostered. It traces developments from the early conceptualisation of cultural genocide to the contemporary question of its reparation.

Through this journey, the book discusses the evolution of various branches of international law in relation to both cultural protection and cultural destruction in light of a number of legal cases in which either the concept of cultural genocide or the idea of cultural destruction has been discussed. Such cases include the destruction of cultural and religious heritage in Bosnia and Herzegovina, the forced removals of Aboriginal children in Australia and Canada, and the case law of the Inter-American Court of Human Rights in relation to Indigenous and tribal groups'' cultural destruction.

---

Source: [cadmus.eui.eu](https://cadmus.eui.eu/entities/publication/07e83cc7-a9ea-59a0-84c8-0d4b5b487f3a)', 'geo', 'cultural-genocide'),
  ('Cyber deterrence', 'Cyber deterrence (dissuasão cibernética) é uma estratégia de segurança que busca evitar ataques digitais ao convencer potenciais agressores de que os custos ou riscos de uma invasão superam os benefícios.

#### Como funciona

- Ameaça de punição: O agressor é avisado de que sofrerá retaliação severa (cibernética ou física) caso realize um ataque.
- Estratégia de negação: A infraestrutura é fortalecida para tornar o ataque difícil de ser bem-sucedido.
- Atribuição: Envolve a capacidade de identificar quem executou o ataque para cobrar consequências reais.

#### Desafios no ciberespaço

- Anonimato: É difícil provar com certeza absoluta quem está por trás de um ataque cibernético.
- Atores diversos: Criminosos comuns ou grupos mercenários não respondem da mesma forma que Estados soberanos.
- Escala cinzética: Diferente da Guerra Fria nuclear, muitos atos cibernéticos ficam abaixo do limite que justificaria uma guerra aberta.

---

Links

[CCDCOE](https://ccdcoe.org/library/publications/cyber-deterrence-a-comprehensive-approach/)

[Rethinking Cyber Deterrence in a Multipolar World](https://www.rusi.org/explore-our-research/publications/emerging-insights/rethinking-cyber-deterrence-multipolar-world)

isec_a_00266.pdf

---

Source: [ccdcoe.org](https://ccdcoe.org/library/publications/cyber-deterrence-a-comprehensive-approach/)', 'geo', 'cyber-deterrence'),
  ('DDoS (Distributed Denial of Service)', 'DDoS é a sigla para Distributed Denial of Service, ou ataque distribuído de negação de serviço. É uma tentativa maliciosa de tornar um sistema, site ou rede indisponível, sobrecarregando-o com um volume massivo de tráfego falso vindo de múltiplos dispositivos (botnets). Isso impede que usuários legítimos possam acessar o serviço, que se torna lento ou completamente indisponível.

### Como funciona um ataque DDoS

- **Sobrecarga de tráfego**: Um ou mais atacantes usam uma rede de dispositivos infectados, como computadores, smartphones e roteadores (chamada de botnet), para enviar um grande volume de requisições ao alvo simultaneamente.
- **Consequência**: O servidor do alvo não consegue processar todas as requisições simultâneas, ficando sobrecarregado e inacessível para os usuários que tentam acessá-lo de forma legítima.
- **Distinção**: Ao contrário de um ataque DoS (Denial of Service), que vem de uma única fonte, o DDoS é mais potente porque utiliza uma grande quantidade de fontes distribuídas, o que dificulta a sua identificação e bloqueio.', 'geo', 'ddos-distributed-denial-of-service'),
  ('Dead Man''s Switch (Botão de Inatividade / Interruptor do Homem Morto)', 'Um mecanismo projetado para ser ativado automaticamente caso o operador humano fique incapacitado ou deixe de dar um sinal de vida regular. É um script ou contrato inteligente baseado em **temporizadores (timers)** de contagem decrescente.

- O utilizador define um intervalo de tempo (ex: 60 dias) e um gatilho (fazer login na app, enviar um e-mail ou fazer um ping num servidor).
- Cada vez que o utilizador realiza essa ação, o temporizador faz um *reset* e recomeça a contar do zero.
- Se o temporizador chegar a zero sem nenhuma interação, o sistema dispara uma ação automatizada programada na base de dados (como apagar dados confidenciais ou transferir a propriedade de chaves criptográficas).

### Intersecção com Relações Internacionais & Soberania

- **Proteção de Denunciantes (*Whistleblowers*):** ativistas e jornalistas de investigação (como Edward Snowden ou Julian Assange) usam *Dead Man''s Switches* para garantir que, caso sejam presos, fiquem incomunicáveis ou desapareçam, ficheiros altamente confidenciais do governo sejam vazados automaticamente para a imprensa global como uma apólice de seguro.
- **Continuidade em Zonas de Conflito:** usado por civis e diplomatas em cenários de guerra ou desastres humanitários para garantir a transferência automática de ativos digitais, testamentos ou documentos de identidade para familiares na diáspora caso o remetente perca o acesso físico à rede ou à vida.

---

### Explicação Simples

Imagina o maquinista de um comboio de alta velocidade. Para garantir que o comboio não descarrile caso o maquinista desmaie ou tenha um problema de saúde, existe um pedal ou botão que ele precisa de pressionar a cada poucos minutos. Se o maquinista soltar o pedal por muito tempo, o sistema entende que algo correu mal e ativa os travões de emergência automaticamente.

No mundo digital, é um sistema que diz: *"Se eu não fizer login ou não clicar neste botão nos próximos 30 dias, envia este e-mail secreto para o meu irmão ou liberta este ficheiro criptografado"*.', 'res', 'dead-man-s-switch-botao-de-inatividade-interruptor-do-homem-morto'),
  ('Declaração Balfour', 'Cem anos atrás, 67 palavras escritas em uma folha de papel viraram o pontapé de um dos conflitos mais difíceis de resolver dos tempos modernos, dita dia 02 de novembro de 1917:

> *”Dear Lord Rothschild,*
>
>
> *I have much pleasure in conveying to you, on behalf of His Majesty''s Government, the following declaration of sympathy with Jewish [Zionist](Sionismo%20(Zionism)%20f66fb1f1aae84ac78e9e5fd86a50affd.md) aspirations which has been submitted to, and approved by, the Cabinet.*
>
> *"His Majesty''s Government view with favour the establishment in Palestine of a national home for the Jewish people, and will use their best endeavours to facilitate the achievement of this object, it being clearly understood that nothing shall be done which may prejudice the civil and religious rights of existing non-Jewish communities in Palestine, or the rights and political status enjoyed by Jews in any other country."*
>
> *I should be grateful if you would bring this declaration to the knowledge of the [Zionist](Sionismo%20(Zionism)%20f66fb1f1aae84ac78e9e5fd86a50affd.md) Federation.*
>
> *Yours sincerely,*
>
> *Arthur James Balfour”*
>

[balfour2.avif](Declara%C3%A7%C3%A3o%20Balfour/balfour2.avif)

A Declaração de Balfour é o documento no qual o governo de uma potência da época - no caso, a Grã-Bretanha - respalda pela primeira vez *“o estabelecimento de um lar nacional para o povo judeu na Palestina”*.

O mesmo documento simboliza a pedra fundamental de Israel como Estado para os judeus e, ao mesmo tempo, uma "grande traição" na visão dos palestinos.

No Reino Unido, Arthur Balfour mal aparece nos livros escolares, mas muitos alunos israelenses e palestinos saberiam o que dizer sobre ele.

Então ministro britânico das Relações Exteriores, Arthur Balfour assinou em 2 de novembro de 1917 a carta - entendida como o ponto inicial do conflito árabe-israelense.

---

Source: [bbc.com](https://www.bbc.com/portuguese/geral-41842505)', 'geo', 'declaracao-balfour'),
  ('Declaração Universal dos Direitos Humanos', '> Adotada pela ONU em 10 de dezembro de 1948.

### **Preâmbulo**

Reconhece que a dignidade de todos os seres humanos e seus direitos iguais e inalienáveis são a base da liberdade, justiça e paz no mundo.

### **Artigos principais (resumo dos primeiros 10)**

1. **Todos nascem livres e iguais** em dignidade e direitos.
2. **Sem discriminação** de raça, cor, sexo, idioma, religião, etc.
3. Todos têm **direito à vida, à liberdade e à segurança**.
4. **Escravidão é proibida**.
5. Ninguém será submetido à **tortura** ou tratamento cruel.
6. Todos têm o **direito ao reconhecimento jurídico**.
7. Todos são **iguais perante a lei**.
8. Direito à **justiça** quando seus direitos forem violados.
9. Ninguém pode ser **preso arbitrariamente**.
10. Todos têm direito a um **julgamento justo e público**.

(Existem 30 artigos no total; posso enviar o texto completo, se quiser.)

---

## 🧠 **Recursos Retóricos Usados na Declaração**

A **retórica** é a arte de usar a linguagem para convencer, emocionar ou reforçar ideias. A Declaração usa alguns dispositivos importantes para isso:

### 1. **Anáfora** (repetição de palavras ou frases no início das sentenças)

Exemplo: “Todo ser humano...”, “Todos têm direito...”

🔹 *Efeito*: Cria ritmo e reforça a universalidade dos direitos.

### 2. **Linguagem universal e inclusiva**

Usa expressões como “toda pessoa”, “ninguém”, “todos”, para **incluir todos os povos e culturas**.

🔹 *Efeito*: Transmite igualdade e fraternidade global.

### 3. **Apelo à moral e à justiça**

Expressões como “dignidade humana”, “justiça”, “liberdade” conectam o leitor com valores éticos universais.

🔹 *Efeito*: Cria uma base emocional e moral forte.

### 4. **Paralelismo** (estrutura semelhante em várias frases)

Frases com estrutura repetida: “Todo ser humano tem direito a...”, “Ninguém será submetido a...”

🔹 *Efeito*: Dá coesão e força argumentativa ao texto.

### 5. **Linguagem formal e solene**

O tom é sério, direto e universal, dando **peso e autoridade** ao texto.

🔹 *Efeito*: Mostra a importância histórica e política do documento.', 'geo', 'declaracao-universal-dos-direitos-humanos'),
  ('Declergização', '“Declergização” (ou “declericalização”) é um termo usado principalmente em contextos religiosos e sociais.

Significa reduzir o poder, a influência ou o papel do clero (padres, líderes religiosos) dentro de uma instituição, sociedade ou prática.

Em outras palavras:

- Tirar decisões importantes das mãos apenas de líderes religiosos
- Dar mais participação às pessoas comuns (leigos)
- Tornar instituições menos dependentes da autoridade religiosa

Exemplos:

Em algumas comunidades da Igreja Católica, incentivar que leigos participem mais da organização e decisões

Separar religião do Estado (como aconteceu em vários países após movimentos históricos)

Reformas internas que tornam práticas religiosas menos centradas no clero

Ideia central:

➡️ Menos controle do clero, mais autonomia para a comunidade ou sociedade', 'zei', 'declergizacao'),
  ('Denial-of-Service (DoS) attack', 'A denial-of-service (DoS) attack is a type of cyber attack in which a malicious actor aims to render a computer or other device unavailable to its intended users by interrupting the device''s normal functioning. DoS attacks typically function by overwhelming or flooding a targeted machine with requests until normal traffic is unable to be processed, resulting in denial-of-service to addition users. A DoS attack is characterized by using a single computer to launch the attack.

## How does a DoS attack work?

The primary focus of a DoS attack is to oversaturate the capacity of a targeted machine, resulting in denial-of-service to additional requests. The multiple attack vectors of DoS attacks can be grouped by their similarities.

### **DoS attacks typically fall in 2 categories:**

#### Buffer overflow attacks

An attack type in which a memory [buffer overflow](https://www.cloudflare.com/learning/security/threats/buffer-overflow/) can cause a machine to consume all available hard disk space, memory, or CPU time. This form of exploit often results in sluggish behavior, system crashes, or other deleterious server behaviors, resulting in denial-of-service.

#### Flood attacks

By saturating a targeted server with an overwhelming amount of packets, a malicious actor is able to oversaturate server capacity, resulting in denial-of-service. In order for most DoS flood attacks to be successful, the malicious actor must have more available bandwidth than the target.

---

## How can you tell if a computer is experiencing a DoS attack?

While it can be difficult to separate an attack from other network connectivity errors or heavy [bandwidth](Bandwidth%20(Largura%20de%20Banda)%203ca0c519cad480f98d3df6e49c528187.md) consumption, some characteristics may indicate an attack is underway.

Indicators of a DoS attack include:

- Atypically slow network performance such as long load times for files or websites
- The inability to load a particular website such as your web property
- A sudden loss of connectivity across devices on the same network

---

Source: [cloudflare.com](https://www.cloudflare.com/learning/ddos/glossary/denial-of-service/)', 'geo', 'denial-of-service-dos-attack'),
  ('Deterrence (dissuasão)', 'Convencer outro país a não agir de certa forma — normalmente de forma agressiva ou hostil — usando a ameaça de retaliação ou de consequências muito sérias.

A teoria da **intimidação, dissuasão ou deterrência** é uma estratégia militar desenvolvida e utilizada durante a Guerra Fria até os tempos atuais. Ela é especialmente relevante no que diz respeito ao uso de armas nucleares e figura proeminentemente na atual política externa dos Estados Unidos, no tocante ao desenvolvimento da tecnologia nuclear do Irã e da Coreia do Norte.

## Definição de dissuasão

Dissuasão significa simplesmente desencorajar o mau comportamento com a ameaça de uma punição significativa.

É uma prática que remonta a milênios e vai além das relações internacionais. Os antigos romanos, por exemplo, realizavam execuções públicas para dissuadir potenciais criminosos. Ainda hoje, a dissuasão é um princípio fundamental dos sistemas judiciais de muitos países. A ameaça de longas penas de prisão — ou mesmo da pena capital — visa impedir que as pessoas cometam crimes.

Na política externa, a dissuasão serve a um propósito semelhante: manter a paz, persuadindo os inimigos de que qualquer ataque será respondido com uma reação significativa.

Para que a dissuasão funcione, duas condições devem estar presentes: severidade e credibilidade.

## Estratégia

**Existem duas formas de intimidação: intimidação por punição ou intimidação por proibição.**

1. A **intimidação por punição** é uma estratégia onde um governo ameaça uma forte retaliação caso seja atacado. Os agressores são intimidados se eles não quiserem sofrer os danos causados por tal ação agressiva. A Destruição Mútua Assegurada é uma forma desta estratégia, utilizada para caracterizar as relações entre os Estados Unidos e a União Soviética.
2. A **intimidação por proibição** é uma estratégia onde um governo constrói ou mantém sistemas de defesa e inteligência com o propósito de neutralizar ou coibir ataques. Os agressores são intimidados, então eles optam por não agir, prevendo o alto custo da ação em relação ao seu sucesso.

A teoria da intimidação é vista por alguns como o oposto da política de apaziguamento, onde é permitido a um governo expansionista absorver território para alcançar um acordo negociado (por exemplo, o Acordo de Munique que antecedeu a Segunda Guerra Mundial). A intimidação pode ser baseada tanto em armas de destruição em massa como em armas convencionais, sanções econômicas ou ambos.', 'geo', 'deterrence-dissuasao'),
  ('Dinastia', 'A Dinastia é a série de reis e rainhas de uma mesma família que se sucedem no governo. Historiadores consideram tradicionalmente muitos estados soberanos da história num quadro de sucessivas dinastias, por exemplo, o Antigo Egito e a China imperial.

---

Source: [pt.wikipedia.org](https://pt.wikipedia.org/wiki/Dinastia)', 'zei', 'dinastia'),
  ('Diplomacia das canhoneiras (Gunboat diplomacy)', 'A Diplomacia das Canhoneiras (*Gunboat Diplomacy*) é uma estratégia de política externa na qual um país usa a ameaça de força militar – especialmente naval – para pressionar ou intimidar outra nação a aceitar suas demandas. O termo vem do uso de navios de guerra (*gunboats*) para demonstrar poder e influenciar negociações sem necessariamente entrar em combate.

Ela foi muito usada entre os séculos XIX e XX, especialmente por potências coloniais como o Reino Unido e os Estados Unidos, para impor sua vontade sobre países mais fracos. Um exemplo clássico é a **abertura forçada do Japão ao comércio internacional em 1853**, quando os EUA enviaram navios de guerra sob o comando do Comodoro Matthew Perry para pressionar o governo japonês.

Hoje, a diplomacia das canhoneiras evoluiu para formas mais sutis de pressão militar, como a presença de porta-aviões em regiões estratégicas ou manobras militares perto de países adversários.

---

Source: [pt.wikipedia.org](https://pt.wikipedia.org/wiki/Diplomacia_das_canhoneiras)', 'geo', 'diplomacia-das-canhoneiras-gunboat-diplomacy'),
  ('Diáspora', 'O termo diáspora define o deslocamento, normalmente forçado ou incentivado, de massas populacionais originárias de uma zona determinada para várias áreas de acolhimento distintas. Em termos gerais, diáspora pode significar dispersão de qualquer nação ou etnia pelo mundo.

---

Source: [pt.wikipedia.org](https://pt.wikipedia.org/wiki/Di%C3%A1spora)', 'zei', 'diaspora'),
  ('Dogfighting', 'O termo **dogfighting** pode significar o combate aéreo militar.

**Aviação Militar (Combate Aéreo)**

Na aviação, **dogfight** refere-se ao **combate aéreo aproximado (WVR - *Within Visual Range*) entre aviões de caça**.

- **Origem:** O termo surgiu em 1913 durante a Revolução Mexicana e se popularizou na Primeira Guerra Mundial, pois o movimento tático e o som dos motores dos aviões manobrando em círculos fechados lembravam cachorros brigando.
- **Terminologia Moderna:** Atualmente, a doutrina militar utiliza expressões técnicas como **Manobras de Combate Aéreo** (*Air Combat Manoeuvring* - ACM) ou Manobras Básicas de Combate (*Basic Fighter Maneuvers* - BFM).
- **Evolução:** Embora o desenvolvimento de mísseis além do alcance visual (BVR) tenha mudado a face da guerra aérea, o treinamento de *dogfight* continua sendo uma habilidade essencial para pilotos de caça em situações de curto alcance.

---

Source: [en.wikipedia.org](https://en.wikipedia.org/wiki/Dogfight)', 'geo', 'dogfighting'),
  ('Dossel Sagrado', 'O Dossel Sagrado é o título da principal obra de sociologia da religião do teólogo e sociólogo Peter L. Berger, publicada originalmente em 1967 (com edições clássicas no Brasil pela [Paulus Editora](https://loja.paulus.com.br/o-dossel-sagrado-elementos-para-uma-teoria-sociologica-da-religiao/p)).

**O Conceito**

- **Construção social do mundo:** Para Berger, a sociedade humana é um esforço contínuo para construir e manter uma ordem de sentido (chamada de *nômos*) que nos protege contra o caos e a falta de sentido (*anomia*).
- **A função da religião:** O "dossel sagrado" é a metáfora que o autor usa para descrever o papel da religião nessa empreitada. A religião atua como um teto protetor que legitima a ordem social, ligando o ordem humana a uma ordem cósmica ou divina.
- **Proteção contra o sofrimento:** O conceito explica como as religiões ajudam as sociedades a lidar com situações-limite e caóticas, como o sofrimento, a injustiça e a morte (através da teodiceia).', 'zei', 'dossel-sagrado'),
  ('Doutrina Monroe', 'A Doutrina Monroe é uma diretriz da política externa dos Estados Unidos criada em 1823 que estabelece que o continente americano não deve sofrer nova colonização ou interferência de potências europeias. A frase que resume essa ideia é “a América para os americanos”.

![Doutrina Monroe](/glossary/doutrina-monroe-1.webp)

**O Contexto Histórico**

- **Ano de criação:** 1823.
- **Presidente:** James Monroe, que apresentou o plano em um discurso no Congresso dos Estados Unidos em 2 de dezembro.
- **Situação:** Vários países da América Latina lutavam ou conquistavam sua independência contra a Espanha.
- **Medo:** Os Estados Unidos temiam que a Europa (especialmente a Santa Aliança) tentasse retomar o controle das colônias perdidas.

**Os Objetivos Principais**

- **Fim da interferência europeia:** Proibir que países da Europa criassem novas colônias ou mandassem tropas para o continente americano.
- **Neutralidade dos EUA:** Prometer que os Estados Unidos não iriam interferir nos conflitos internos dos países europeus.
- **Liderança americana:** Colocar os Estados Unidos como o protetor e líder do Hemisfério Ocidental.

**A Prática e as Consequências**

- **Mudança de sentido:** O que começou como um aviso de defesa contra a Europa virou, com o tempo, uma justificativa para os Estados Unidos interferirem na América Latina.
- **Intervenções militares:** O [**Destino Manifesto**](https://brasilescola.uol.com.br/historia-da-america/doutrinamonroe.htm) e atualizações da doutrina (como o Corolário Roosevelt em 1904) deram poder aos EUA para agir militar e politicamente na região para garantir seus próprios interesses.
- **Visão histórica:** Críticos apontam que a regra transformou a América Latina em uma área de influência dominada por Washington, como detalha a análise da [**BBC News Brasil**](https://www.bbc.com/portuguese/articles/cgrp3x22d7wo) sobre os 200 anos do plano.

---

Source: [pt.wikipedia.org](https://pt.wikipedia.org/wiki/Doutrina_Monroe)', 'geo', 'doutrina-monroe'),
  ('Doxxing', 'É o ato de pesquisar, reunir e divulgar informações pessoais de alguém na internet sem consentimento, geralmente com a intenção de intimidar, assediar ou causar danos. Essas informações podem incluir:

- Nome completo
- Endereço
- Número de telefone
- Local de trabalho ou escola
- Dados de familiares
- Outras informações de identificação', 'res', 'doxxing'),
  ('Détente', 'Détente é uma palavra francesa que significa **distensão ou relaxamento**. O termo tem sido usado em política internacional desde a década de 1970.

De uma maneira geral, o termo pode ser empregado para se referir a qualquer situação internacional na qual nações que tinham anteriormente um relacionamento hostil (sem, no entanto, estarem em um estado de guerra declarada) passam a restabelecer relações diplomáticas e culturais, apaziguando seu relacionamento e diminuindo o risco de conflito declarado.

Durante a década de 1970, nas administrações de Nixon e Ford, nos EUA, e de Brezhnev na URSS, a Guerra Fria sofreu grandes modificações com a implementação da détente pelas duas potências. A URSS buscava mostrar ao público como a nova política de coexistência pacífica, com o fim da corrida armamentista era algo positivo, bem como tentava se vangloriar por isso. Cumpre destacar que essa foi uma política adotada pelas nações aos fins da década de 60 com medo de uma guerra nuclear, que dado o poderio armamentista de ambas as potências, teria consequências ainda mais desastrosas que as guerras anteriores, ainda, por lado da URSS, com o interesse de ter suas fronteiras no leste Europeu reconhecidas.

As principais motivações para a détente, conforme mencionado acima, era o medo do desencadeamento de mais uma guerra, pois o poder militar da URSS não era mais inferior àquele detido pelos EUA. Ainda, com essa nova política, desejavam expandir o comércio entre as nações, bem como reduzir a capacidade nuclear, buscando a suficiência, por parte dos EUA. Cumpre destacar que a détente, apesar da tentativas dos governos de mostrar o contrário, não foi livre de críticas, principalmente pelo Congresso e população estadunidense, que acreditavam que grande parte os atos decorrentes da détente, como o SALT, e os tratados de Helsinque favoreciam a URSS em detrimento dos EUA, entendimento esse compartilhado também pelo escritor soviético exilado Aleksandr Solzhenitsyn, que alertava os EUA sobre os perigos da détente indicando que o desconhecimento dos EUA a respeito do regime soviético é produto da distância, da falta de informação, da estreiteza dos pontos de vista e das interpretações tendenciosas dos observadores e comentaristas. A população temia a política de détente tanto por medo do avanço nuclear da URSS como também pela mesma significar um afastamento dos EUA sobre a violação dos direitos humanos que ocorria no governo soviético, manifestação evidente após a assinatura dos acordos de Helsinki, fato este também criticado pelo escritor acima mencionado.

Dentre os motivos que levaram ao fracasso da détente, pode-se mencionar a insatisfação popular dos americanos, das questões pessoais, principalmente do presidente Nixon, que se isolava na tomada de decisões com o secretário Kissinger, sofrendo diversas críticas dos demais membros da administração e deixando de se aproveitar de seu conhecimento. Por outro lado, à época, tiveram conflitos internacionais que alarmaram a situação entre os países, como a Guerra do Vietnã, a imigração de judeus para os EUA e as guerras travadas entre Síria, Egito e Israel, que contavam com o apoio de cada um dos lados e frequentes ameaças de uma potência para outra. Por fim, teve-se os conflitos com o Congresso americano, que acreditando que os acordos e medidas tomados no âmbito da détente era unilaterais e favoreciam apenas os EUA, dessa forma, propuseram várias emendas e restrições que não agradaram a URSS, conforme notícia de 15/01/75. Ainda, membros da administração, como o secretário de Defesa James Schlesinger, advertiu o congresso em 75 que reduções unilaterais do poderio norte-americano não eram positivas para a détente, e que apesar desta, ainda existiam inúmeras divergências entre os EUA e a URSS, decorrente de seus sistemas sociais e objetivos políticos econômicos, de forma que períodos de cooperação iriam inevitavelmente se intercalar com períodos de contestação, como de fato ocorreu, e os EUA deveriam estar preparados para isso. De forma geral, apesar das tentativas das duas potências de manter uma coexistência pacífica, inúmeras divergências ideológicas, políticas e econômicas manifestadas em atitudes pessoais, domésticas e internacionais refletiram a impossibilidade dessa política no longo prazo, refletida principalmente em conflitos internacionais nos quais havia ameaças de ambos os lados e nas manifestações domésticas que contrariavam essa política.

---

Source: [pt.wikipedia.org](https://pt.wikipedia.org/wiki/D%C3%A9tente)', 'geo', 'detente'),
  ('E pluribus unum', '*E pluribus unum (One of many) → Ou seja: de muitos cidadãos, fizemos uma nação.*

*E pluribus unum* traduzido do latim, significa *“a partir de vários, um só espírito”*.

Refere-se à integração das treze colônias independentes em um país unido, e ganhou um outro significado, da natureza pluralística da sociedade norte-americana devido à imigração. O lema foi escolhido pelo primeiro comitê do Grande Selo em 1776, no começo na Revolução americana. A sugestão veio de Pierre Eugene DuSimitiere. Em 1956, foi criado o lema In God We Trust, também um lema nacional.

A frase veio originalmente de Moretum, um poema escrito por Virgílio que tinha como assunto uma receita de salada. No texto do poema, color est e pluribus unus foi mencionado para descrever a mistura das cores em uma só. Este lema era bem conhecido pelos literários norte-americanos do século XVIII. Apareceu na revista Gentleman''s Magazine, publicada mensalmente em Londres desde 1731. A legenda E pluribus unum era usada nas páginas de título dos volumes anuais que continham uma coleção das doze edições anuais da revista.', 'geo', 'e-pluribus-unum'),
  ('Estado Islâmico (ISIS | EIIL | Daesh)', 'O Estado Islâmico (também conhecido como ISIS, EIIL ou Daesh) é uma organização terrorista e jihadista que segue uma interpretação radical do islamismo.

**Origem e Crescimento**

- O grupo nasceu após a invasão do Iraque pelos Estados Unidos em 2003.
- Ele ganhou muita força durante a guerra civil na Síria.
- Em 2014, o grupo declarou a criação de um "califado" em partes do Iraque e da Síria.

**Ações e Violência**

- No auge, o grupo controlou grandes áreas de terra e milhões de pessoas.
- Ele usou extrema violência, execuções públicas e ataques terroristas em vários países.
- O grupo também destruiu cidades e locais históricos importantes.

**Situação Atual**

- Uma coalizão internacional combateu o grupo e tirou dele quase todo o território no Oriente Médio.
- Apesar disso, o Estado Islâmico não sumiu.
- Ele atua hoje por meio de células escondidas e ramificações em países da África e da Ásia Central, como o ISIS-Khorasan.

---

Source: [pt.wikipedia.org](https://pt.wikipedia.org/wiki/Estado_Isl%C3%A2mico_do_Iraque_e_do_Levante)', 'geo', 'estado-islamico-isis-eiil-daesh'),
  ('Estatuto de Roma (1998)', 'O [**Estatuto de Roma**](https://pt.wikipedia.org/wiki/Estatuto_de_Roma) é o tratado internacional que criou a [**Corte Penal Internacional (CPI)**](https://www.planalto.gov.br/ccivil_03/decreto/2002/d4388.htm), também chamada de Tribunal Penal Internacional (TPI).

### **O que é o Estatuto de Roma**

**Criação:** Adotado em 17 de julho de 1998, em Roma (Itália), e em vigor desde 1 de julho de 2002.

**Sede:** Fica em Haia, nos Países Baixos.

**Função:** É a primeira corte penal internacional permanente do mundo para julgar indivíduos (e não Estados) por crimes graves que afetam a comunidade internacional.

**Complementaridade:** Atua apenas quando os tribunais nacionais não podem ou não querem julgar os casos.

### **Crimes de Competência da Corte**

O TPI julga quatro crimes principais:

- **Genocídio:** Atos com intenção de destruir grupo nacional, étnico, racial ou religioso.
- **Crimes contra a humanidade:** Ataques generalizados ou sistemáticos contra civis.
- **Crimes de guerra:** Violações graves das leis de conflitos armados.
- **Crime de agressão:** Uso ilegal da força armada por um Estado contra outro.

### **Relação com o Brasil**

O Brasil ratificou o tratado e o promulgou por meio do Decreto nº 4.388/2002.A Constituição Federal prevê que o país se submete à jurisdição do tribunal.', 'geo', 'estatuto-de-roma-1998'),
  ('Estratégia Nacional de Cibersegurança: soberania, governança e resiliência (E-Ciber)', 'A Estratégia Nacional de Cibersegurança (E-Ciber), instituída pelo Decreto nº 12.573 em 4 de agosto de 2025, define o plano do governo brasileiro para organizar a regulação digital, proteger a infraestrutura crítica e garantir a soberania tecnológica do país.

**Principais Eixos Temáticos**

A E-Ciber estrutura-se em quatro eixos centrais de atuação:

- **Proteção e conscientização da sociedade:** Campanhas educativas e ações para ampliar a cultura de segurança digital entre cidadãos e grupos vulneráveis.
- **Serviços essenciais e infraestruturas críticas:** Foco na defesa e na recuperação rápida de setores vitais, como energia, saúde e telecomunicações.
- **Cooperação público-privada:** Estímulo ao compartilhamento de informações e práticas conjuntas de defesa entre órgãos de governo e empresas.
- **Soberania nacional e governança:** Diretrizes voltadas para reduzir a dependência externa de tecnologias sensíveis e fortalecer a autonomia digital do Brasil.

**Objetivos e Ações Estratégicas**

- **Modelo de maturidade:** Criação de um indicador nacional para medir a evolução do setor de cibersegurança e guiar ajustes no planejamento do país.
- **Capacitação em escala:** Formação técnica e profissional para suprir a demanda do mercado de segurança da informação.
- **Conexão com a LGPD:** A agenda de privacidade e proteção de dados serve como base natural para as empresas iniciarem a conformidade com as novas diretrizes da E-Ciber.

---

Source: [gov.br](https://www.gov.br/gsi/pt-br/assuntos/seguranca-da-informacao-e-cibernetica/estrategia-nacional-de-ciberseguranca-eciber)', 'geo', 'estrategia-nacional-de-ciberseguranca-soberania-governanca-e-resiliencia-e-ciber'),
  ('Estratégica Nacional de Segurança Cibernética do Poder Judiciário (ENSEC-PJ)', 'A **Estratégia Nacional de Segurança Cibernética do Poder Judiciário (ENSEC-PJ)** foi instituída pela Resolução CNJ nº 396/2021 com o objetivo principal de aprimorar o nível de maturidade em segurança da informação e proteção de ativos tecnológicos nos órgãos da Justiça brasileira.

**O que é a ENSEC-PJ?**

- **Finalidade:** Estabelecer diretrizes, requisitos mínimos e boas práticas para criar um ambiente digital resistente, seguro e desenvolvido contra ciberataques aos tribunais.
- **Origem:** Regulamentada pelo [**Conselho Nacional de Justiça (CNJ)**](https://www.cnj.jus.br/) em junho de 2021.
- **Abrangência:** Todos os órgãos e conselhos integrantes do Poder Judiciário nacional.

**Principais Protocolos Vinculados**

A [**Portaria CNJ nº 162/2021**](https://www.cnj.jus.br/tecnologia-da-informacao-e-comunicacao/seguranca-da-informacao/normativos/) aprovou protocolos operacionais fundamentais exigidos para os tribunais:

- **PPINC-PJ (Protocolo de Prevenção a Incidentes Cibernéticos):** Diretrizes para evitar falhas e invasões.
- **PGCRC-PJ (Protocolo de Gerenciamento de Crises Cibernéticas):** Ações coordenadas de resposta imediata a incidentes graves.
- **PIILC-PJ (Protocolo de Investigação de Ilícitos Cibernéticos):** Procedimentos para preservação de provas e comunicação obrigatória aos órgãos de persecução penal.

---

Source: [atos.cnj.jus.br](https://atos.cnj.jus.br/atos/detalhar/3975)', 'geo', 'estrategica-nacional-de-seguranca-cibernetica-do-poder-judiciario-ensec-pj'),
  ('Ethnographic purism', 'É a ideia de que uma cultura ou grupo deve ser estudado (e “valorizado”) como se fosse **puro, intacto, sem misturas, influências externas ou mudanças**.

### Em estudos culturais / antropologia

É quando alguém:

- trata uma cultura como **fixa** (“sempre foi assim”)
- ignora trocas culturais, migração, globalização, colonialismo
- acha que misturas “estragam” a cultura original

Como se existisse uma versão **autêntica e congelada** de um povo.

### Exemplo prático

Dizer que:

> “isso não é mais cultura X de verdade, porque sofreu influência do Ocidente”
>

→ isso é **ethnographic purism**.

Na prática, é uma visão **essencialista** da cultura.

### Em uma frase

Ethnographic purism = a ilusão de culturas puras, sem mistura, sem história.', 'zei', 'ethnographic-purism'),
  ('Ethnopsychiatry (etnopsiquiatria – antropologia das emoções)', 'Antropologia das emoções é uma linha teórico-metodológica da Antropologia que lida com a categoria analítica emoção como objeto de análise. Os estudos da emoção desde os finais do século XIX começo do século XX tem sido objeto de análise da psicologia e fisiologia.

**Ethnopsychiatry** (ou *etnopsiquiatria*) é uma área que mistura duas disciplinas:

- Psiquiatria
- Antropologia

Ou seja, ela estuda **como a cultura influencia a saúde mental, as emoções e a forma como as pessoas entendem o sofrimento psicológico**.

---

### Explicando de forma simples:

A etnopsiquiatria analisa coisas como:

- Como diferentes culturas interpretam **tristeza, ansiedade ou trauma**
- Como cada sociedade explica doenças mentais (espiritual, social, biológica, etc.)
- Quais formas de tratamento existem em cada cultura (terapia, rituais, medicina tradicional)

---

### Ligação com “antropologia das emoções”

A chamada **“antropologia das emoções”** é uma parte desse campo que foca em:

- Como as emoções (amor, medo, raiva, vergonha) **não são iguais em todas as culturas**
- Como aprendemos a sentir e expressar emoções dependendo do lugar onde vivemos

Por exemplo:

- Em algumas culturas, expressar tristeza em público é normal
- Em outras, isso pode ser visto como fraqueza

---

### Resumindo:

**Ethnopsychiatry = estudo da mente + cultura**

Mostra que **emoções e doenças mentais não são só biológicas — também são influenciadas pela sociedade e pelos costumes**.

---

Antropologia das emoções é uma linha teórico-metodológica da Antropologia que lida com a categoria analítica emoção como objeto de análise. Os estudos da emoção desde os finais do século XIX começo do século XX tem sido objeto de análise da psicologia e fisiologia. Entre os primeiros estudos de caráter antropológico das emoções podemos incluir diversas obras de Sigmund Freud e Marcel Mauss.

O estudo das emoções na antropologia pode ser compreendido como uma categoria de análise capaz de apreender a noção de padrão de reação biológica humano e de sociedade como um todo. Constituindo-se como um desafio metodológicas de pesquisa, o estudo sobre emoção nas inter-relações sempre tensas entre indivíduo e sociedade. (KOURY, 2004).', 'zei', 'ethnopsychiatry-etnopsiquiatria-antropologia-das-emocoes'),
  ('Feminist Security Studies', '**Feminist security studies** is a subdiscipline of security studies that draws attention to gendered dimensions of security.

Feminist security studies (FSS) is the study of the various forms and implications of security through a gendered lens. As a sub-discipline of international relations (IR) and security studies, FSS aims to understand and analyse how issues such as militarisation, war, gender, race, economics and power politics intersect in states and globally.

---

Source: [en.wikipedia.org](https://en.wikipedia.org/wiki/Feminist_security_studies)', 'geo', 'feminist-security-studies'),
  ('G-MAFIA (Google, Microsoft, Amazon, Facebook, IBM and Apple)', 'G-MAFIA é um acrônimo cunhado pela futurista Amy Webb em seu livro [*The Big Nine* (2019)](Big%20Nine%20(Amy%20Webb%20Concept)%203e90c519cad480269d4ec708d3681a76.md) para se referir a seis gigantes tecnológicas dos Estados Unidos: Google, Microsoft, Amazon, Facebook (Meta), IBM e Apple.

**O Conceito e os “Big Nine”**

- **Definição:** o termo agrupa as corporações ocidentais que dominam o desenvolvimento de inteligência artificial (IA), dados e infraestrutura digital.
- **O Contraste:** no livro, a G-MAFIA é contraposta ao **BAT** (**Baidu, Alibaba e Tencent**), o trio de gigantes da China.
- **Forças Motrizes:** enquanto a G-MAFIA responde a forças de mercado capitalistas e acionistas, as empresas do BAT operam alinhadas às diretrizes estratégicas do governo de Pequim.
- **Impacto Global:** juntas, as nove empresas formam o grupo que, segundo análises de tecnologia e futurismo, controla a maior parte das patentes, dos investimentos e do ecossistema de IA no mundo.', 'geo', 'g-mafia-google-microsoft-amazon-facebook-ibm-and-apple'),
  ('G7 (Grupo dos Sete)', 'O Grupo dos Sete (G7) é o grupo dos países mais industrializados do mundo, composto por:

- Alemanha
- Canadá
- Estados Unidos
- França
- Itália
- Japão
- Reino Unido

A União Europeia também esteja representada.

---

Source: [pt.wikipedia.org](https://pt.wikipedia.org/wiki/G7)', 'geo', 'g7-grupo-dos-sete'),
  ('Gamal Abdel Nasser', 'Gamal Abdel Nasser foi uma figura central na história moderna do Egito e desempenhou um papel crucial no fortalecimento do país, tanto internamente quanto em sua posição no mundo árabe.

![Gamal Abdel Nasser](/glossary/gamal-abdel-nasser-1.webp)

### 1. **Revolução de 1952 e Fim da Monarquia**

Nasser foi um dos líderes da Revolução Egípcia de 1952, que depôs o rei Farouk e acabou com a monarquia no Egito. A revolução estabeleceu uma república, que Nasser ajudou a construir e consolidar.

### 2. **Nacionalismo Árabe e Pan-Arabismo**

Nasser defendia a ideia de uma unidade árabe e foi um dos principais promotores do **pan-arabismo**, que visava unir os países árabes em uma só nação política e econômica. Ele tentou fortalecer a solidariedade entre os estados árabes e foi uma figura chave na criação da **República Árabe Unida** (1958-1961), que uniu o Egito e a Síria, embora a união tenha sido breve.

### 3. **Reformas Internas e Modernização**

Internamente, Nasser implementou uma série de reformas políticas e sociais:

- **Nacionalização das Indústrias**: Ele nacionalizou setores-chave da economia, incluindo a indústria do petróleo, para garantir que o Egito controlasse seus recursos naturais.
- **Reforma Agrária**: Promoveu a redistribuição de terras para reduzir a desigualdade entre ricos e pobres.
- **Educação e Saúde**: Nasser fez esforços significativos para expandir o sistema educacional e melhorar os cuidados de saúde no Egito, com foco em elevar o nível de vida da população.

### 4. **Construção da Represa de Aswan**

Nasser também foi responsável pela construção da **Represa de Aswan** (iniciada em 1960), que visava controlar as inundações do Nilo, aumentar a produção de energia elétrica e melhorar a irrigação, permitindo uma maior produtividade agrícola. A represa se tornou um símbolo do modernismo e do progresso sob seu governo.

### 5. **Política Externa Independente**

Em termos de política externa, Nasser buscou uma posição independente durante a Guerra Fria. Embora inicialmente tivesse uma relação estreita com os EUA, ele também buscou apoio da União Soviética e outras nações não alinhadas. O Egito, sob sua liderança, teve uma postura ativa na política internacional e defendeu os interesses do mundo árabe e do Terceiro Mundo.

### 6. **Impacto no Mundo Árabe**

Nasser tornou-se uma figura heroica em muitos países árabes por sua oposição ao imperialismo ocidental e seu apoio à autodeterminação dos povos árabes. Sua imagem como líder revolucionário inspirou movimentos de independência em outras partes da região.

### 7. **Guerra dos Seis Dias e Consequências**

Embora Nasser tenha sido muito popular em seus primeiros anos de governo, a derrota do Egito na **Guerra dos Seis Dias (1967)** contra Israel foi um golpe significativo para sua reputação. O Egito perdeu a Península do Sinai, que foi ocupada por Israel, o que afetou negativamente a imagem de Nasser como líder militar e pan-árabe. Após essa guerra, Nasser sofreu um breve período de desilusão, mas manteve-se uma figura central até sua morte, em 1970.

### Legado

O legado de Nasser é complexo. Ele é lembrado como um líder que tentou modernizar o Egito e torná-lo uma potência regional, mas suas políticas de nacionalização e o autoritarismo de seu governo também geraram desafios econômicos e políticos. Mesmo assim, sua figura é reverenciada por muitos egípcios e árabes, e ele continua a ser visto como um símbolo de resistência e orgulho nacional.', 'geo', 'gamal-abdel-nasser'),
  ('Garantia da Lei e da Ordem (GLO)', 'A **GLO (Garantia da Lei e da Ordem)** é uma operação militar autorizada exclusivamente pelo Presidente da República para o emprego provisório das Forças Armadas (Marinha, Exército e Aeronáutica) em tarefas de segurança pública.

**Como Funciona a GLO**

- **Caráter excepcional:** Ocorre apenas quando os meios tradicionais de segurança pública (polícias estaduais e federais) mostram-se esgotados, inexistentes ou insuficientes.
- **Poder de polícia temporário:** Durante a vigência da GLO, os militares recebem provisoriamente atribuições típicas de polícia para agir em uma área delimitada e por tempo determinado.
- **Iniciativa:** Pode ser decretada por iniciativa do próprio Presidente da República ou mediante solicitação dos chefes dos Poderes constitucionais (STF, Senado ou Câmara) ou dos governadores de Estado.

**Base Legal**

- **Constituição Federal:** Amparada pelo artigo 142, que prevê a garantia da lei e da ordem por iniciativa de qualquer dos poderes constitucionais.
- **Lei Complementar nº 97/1999:** Regulamenta o preparo e o emprego das Forças Armadas, definindo as regras de atuação subsidiária.
- **Decreto nº 3.897/2001:** Fixa as diretrizes para a execução destas operações.', 'geo', 'garantia-da-lei-e-da-ordem-glo'),
  ('Gastrodiplomacia', 'Gastrodiplomacia **é o uso estratégico da culinária nacional como ferramenta de *soft power* para promover a cultura, a imagem e os interesses de um país no exterior, criando conexões emocionais, atraindo turismo e impulsionando a economia**. Países como Tailândia, Peru e Coreia do Sul usam a comida para construir uma marca positiva, influenciar percepções e abrir mercados, transformando ingredientes e pratos (como sushi ou kimchi) em embaixadores culturais.

**Como funciona**

- **Conexão emocional:** A comida cria laços afetivos, superando barreiras de idioma e política, e gerando uma experiência memorável.
- **Marca-país:** A gastronomia se torna um ativo para mostrar a identidade e os valores de uma nação, construindo uma imagem positiva.
- **Marketing cultural:** Campanhas promovem pratos e ingredientes para atrair turistas e exportar produtos (ex: "Global Thai", "Marca Peru").
- **Diplomacia formal:** Chefs e governos usam jantares e eventos temáticos (como o jantar amazônico na COP 28) para fortalecer laços entre líderes.

**Exemplos de sucesso**

- **Tailândia:** Campanha "Global Thai" para expandir restaurantes tailandeses no mundo.
- **Peru:** Uso da culinária andina e amazônica para criar uma "marca Peru" forte e impulsionar o turismo e a exportação.
- **Coreia do Sul:** Promoção do kimchi e outras comidas para criar tendências globais.
- **Japão:** Expansão global do sushi, inicialmente orgânica, depois com apoio estratégico.

**No Brasil**

- **Amazônia:** Propostas para usar a gastronomia amazônica como um caminho para o desenvolvimento sustentável e a promoção da região, valorizando ingredientes e saberes tradicionais.
- **Cidades Criativas da UNESCO:** Cidades brasileiras (como Belo Horizonte, Paraty, Florianópolis, Belém) integram a rede em gastronomia, mostrando o potencial da culinária local.', 'geo', 'gastrodiplomacia'),
  ('Geoeconomia', 'A geoeconomia é o estudo das inter-relações entre a economia, a geografia e a política para entender como os países usam o poder econômico com objetivos geopolíticos.

**O Conceito e sua Prática**

- **Definição:** Trata do uso de ferramentas econômicas — como tarifas, sanções, controle de cadeias de suprimentos e investimentos — para defender interesses nacionais e projetar poder no mundo.
- **Origem:** O termo ganhou força com analistas como Edward Luttwak e Pascal Lorot, que perceberam que as disputas globais mudaram de bases estritamente militares para confrontos comerciais e tecnológicos.
- **Exemplos práticos:** Guerras comerciais (como entre Estados Unidos e China), restrições a semicondutores e o uso de bloqueios energéticos.', 'geo', 'geoeconomia'),
  ('Global AI Action Alliance (GAIA)', 'The Global AI Action Alliance (GAIA) is a multi-stakeholder collaboration platform launched by the World Economic Forum (WEF) in January 2021 to accelerate the adoption of safe, transparent, and human-centric artificial intelligence globally.

**Key Details and Objectives**

- **Partnership Network:** brings together over 100 leading companies, government entities, international organizations, non-profits, and academic institutions.
- **Core Mission:** maximizes the societal benefits of AI while minimizing risks, addressing issues like bias, privacy, and accountability.
- **Key Focus Areas:** educating leaders on AI risks and best practices, fostering peer learning among legislators, and driving responsible product design.
- **Integration:** works alongside the WEF’s Industry Action Groups and data initiatives to ensure interoperable global governance standards.

---

Source: [weforum.org](https://www.weforum.org/press/2021/01/world-economic-forum-launches-new-global-initiative-to-advance-the-promise-of-responsible-artificial-intelligence/)', 'geo', 'global-ai-action-alliance-gaia'),
  ('Global Alliance on Intelligence Augmentation (GAIA)', 'A Global Alliance on Intelligence Augmentation (GAIA) é um conceito de governança global de inteligência artificial proposto pela futurista Amy Webb em seu livro de 2019, *The Big Nine*.

**O Conceito Original (Amy Webb)**

- **Definição:** uma coalizão voluntária entre governos democráticos (como os EUA e nações europeias) e as gigantes tecnológicas conhecidas como “G-MAFIA” (Google, Microsoft, Amazon, Facebook, IBM e Apple).
- **Missão principal:** estabelecer normas globais éticas, priorizar a segurança em detrimento da velocidade e focar na augmentação da inteligência humana (IA que melhora as capacidades humanas) em vez de buscar o controle total ou uma superinteligência sem supervisão.
- **Cenário otimista:** no modelo previsional de Webb, a criação da GAIA serve como o cenário ideal onde a IA é gerida como um bem público global e transparente, mantendo os humanos no controle do processo de tomada de decisão.

**Relação com o Fórum Econômico Mundial (WEF)**

Vale notar que, posteriormente, o Fórum Econômico Mundial lançou uma iniciativa com sigla semelhante chamada [**Global AI Action Alliance (GAIA)**](Global%20AI%20Action%20Alliance%20(GAIA)%203e90c519cad480d8add9ea45e5d3c8ed.md) em janeiro de 2021. Esta plataforma prática reúne mais de 100 empresas, governos e acadêmicos para acelerar a adoção responsável, transparente e inclusiva de ferramentas de IA no mundo real.

---

> *”The international body includes AI researchers, sociologists, economists, game theorists, futurists, and political scientists from all member countries. GAIA members reflect socioeconomic, gender, race, religious, political, and sexual diversity. They agree to facilitate and cooperate on shared AI initiatives and policies, and over time they exert enough influence and control that an apocalypse—either because of AGI, ASI, or China’s use of AI to oppress citizens—is prevented.“

[The Big Nine, Amy Webb, Chapter 8](https://www.amywebbfuturist.com/i/215647480/worldwide-systemic-change-the-case-for-creating-gaia)*
>

*A note on the original terminology: G-MAFIA refers to Google, Microsoft, Amazon, Facebook, IBM and Apple; BAT refers to Baidu, Alibaba and Tencent. Together they are the Big Nine. ANI means artificial narrow intelligence, AGI means artificial general intelligence, and ASI means artificial superintelligence. The Réngōng Zhìnéng Dynasty is a scenario developed earlier in the book.*', 'geo', 'global-alliance-on-intelligence-augmentation-gaia'),
  ('Glocalização', 'Glocalização é a junção das palavras "global" e "local", representando a adaptação de produtos, serviços e estratégias globais para atender às necessidades de mercados locais.

**O Conceito**

- **Pensar global, agir local:** empresas mantêm uma identidade de marca forte, mas respeitam os costumes, os hábitos e as leis de cada região.
- **Origem:** o termo veio do Japão (*dochakuka*, adaptado para *glocal*) e foi popularizado na sociologia por Roland Robertson.
- **Cultura e economia:** o local não só como resistência, mas como parte ativa da rede global.

**Exemplos Práticos**

- **Alimentação:** Redes de fast-food como o McDonald''s mudam o cardápio conforme o país para agradar ao paladar local.
- **Produtos:** Marcas de margarina alteram o sabor, o sal ou a cor do produto para atender a preferências regionais específicas no Brasil.', 'zei', 'glocalizacao'),
  ('Great Vowel Shift', 'The Great Vowel Shift was **a series of pronunciation changes in the vowels of the English language that took place primarily between the 1400s and 1600s** (the transition period from Middle English to Early Modern English), beginning in southern England and having influenced effectively all dialects of English today.

The Great Vowel Shift was a massive change in English pronunciation that occurred between the 1400s and 1600s. It was a "chain shift," meaning that as the sound of one vowel changed, other vowels shifted to fill the phonetic space left behind. For example, the word *time* used to be pronounced like "teem," and *house* sounded like "hoos".

This transformation was triggered by major social upheavals following the Black Death. Severe labor shortages caused mass migration to London, which mixed various regional dialects together and reorganized the English sound system. Because London was the center of government and trade, its shifting dialect became highly prestigious.

The printing press was introduced in England right in the middle of this shift. This froze English *spelling* in place while the *spoken pronunciation* continued to evolve. This historical mismatch is the main reason why modern English words often aren''t spelled the way they sound.', 'zei', 'great-vowel-shift'),
  ('Guerra da Criméia', 'A Guerra da Crimeia foi um conflito armado travado entre 1853 e 1856, que opôs o Império Russo a uma coalizão formada pelo Império Otomano, França, Reino Unido e Reino da Sardenha.

![Guerra da Criméia](/glossary/guerra-da-crimeia-1.webp)

**O que motivou o conflito**

- **Disputa territorial e influência:** a Rússia tentava expandir seu território em direção ao Mar Negro e aos Bálcãs, aproveitando-se do enfraquecimento do Império Otomano.
- **Equilíbrio europeu:** França e Reino Unido uniram-se aos otomanos para conter o expansionismo russo e manter o equilíbrio de poder na Europa.
- **Pretexto religioso:** a disputa inicial envolveu o controle sobre os lugares santos cristãos na Terra Santa e a proteção de populações ortodoxas.

**Principais características e desfecho**

- **Guerra moderna:** ficou conhecida como um dos primeiros conflitos da era industrial pelo uso de ferrovias, navios a vapor, telégrafo e fotografia.
- **Impacto das doenças:** a maioria das baixas não ocorreu em combate, mas sim devido a epidemias como cólera e às duras condições de inverno.
- **Marco na enfermagem:** o conflito projetou o trabalho pioneiro de Florence Nightingale na organização de cuidados médicos aos feridos.
- **Fim da guerra:** o conflito encerrou-se com a derrota russa e a assinatura do [Tratado de Paris em 1856](/glossary/tratado-de-paris-1856), que proibiu a Rússia de manter arsenais ou frotas militares no Mar Negro.

---

Source: [pt.wikipedia.org](https://pt.wikipedia.org/wiki/Guerra_da_Crimeia)', 'geo', 'guerra-da-crimeia'),
  ('Handicap', 'O handicap é um tipo de aposta que aplica uma vantagem ou desvantagem fictícia a um dos times antes do jogo começar. Seu objetivo é equilibrar as chances entre as equipes e tornar o mercado mais competitivo, principalmente quando há um grande favorito.

Como o sistema internacional é composto por Estados soberanos juridicamente iguais, mas **profundamente desiguais em termos de capacidade econômica, militar e tecnológica**, aplicar as mesmas regras para todos gera injustiça. Para compensar essa assimetria estrutural, institui-se um "handicap" (vantagem adaptativa ou flexibilização de regras aos países vulneráveis).

Esses mecanismos aparecem no cenário internacional sob diferentes formas:

### **1. Tratamento Especial e Diferenciado (TED) no Comércio Global**

O exemplo mais formal de "handicap" ocorre na Organização Mundial do Comércio (OMC). O princípio do **Tratamento Especial e Diferenciado** (*Special and Differential Treatment*) concede flexibilidade aos países em desenvolvimento e aos de menor desenvolvimento relativo (LDCs):

- **Prazos maiores:** Países desenvolvidos precisam implementar acordos de abertura comercial imediatamente, enquanto os países em desenvolvimento ganham um "handicap de tempo" (anos adicionais para adaptar suas indústrias).
- **Acesso privilegiado a mercados:** Países ricos dão isenção de tarifas para produtos de países em desenvolvimento sem exigir reciprocidade imediata (Sistema Generalizado de Preferências - SGP).

### **2. Princípio das Responsabilidades Comuns, Mas Diferenciadas (PRCD)**

No Direito Ambiental Internacional (como no **Acordo de Paris** e na Convenção-Quadro da ONU sobre Mudança do Clima), o handicap funciona como uma compensação por responsabilidades históricas:

- Todos os países têm o objetivo comum de combater o aquecimento global.
- No entanto, os países desenvolvidos (que se industrializaram primeiro e emitiram carbono por séculos) assumem metas de corte mais duras e a obrigação de financiar o fundo de transição ecológica dos países em desenvolvimento.

### **3. Cláusulas de Salvaguarda e Exceções de Segurança**

Acordos internacionais costumam prever regras de "compensação por choque externo". Se um país enfrenta uma crise grave ou balanço de pagamentos negativo, a arquitetura internacional permite que ele imponha restrições temporárias (barreiras tarifárias ou controle de capital) que normalmente seriam ilegais segundo o livre comércio.

### **4. O "Handicap Geopolítico" das Potências**

No realismo das Relações Internacionais, o termo também é usado em debates teóricos para descrever como **grandes potências operam sob desvantagens estruturais específicas**:

- **Dilema de projeção de poder:** Manter alianças e bases globais gera um custo massivo que desgasta a potência ao longo do tempo (*overstretch* imperial).
- **Restrições normativas:** Democracias enfrentam um "handicap de governança" na política externa em comparação a regimes autoritários, pois precisam prestar contas ao eleitorado, à imprensa e ao poder judiciário para aprovar ações militares ou orçamentos diplomáticos.

---

Source: [iisd.org](https://www.iisd.org/itn/2016/12/12/special-and-differential-treatment-in-international-investment-agreements-riham-marii/#:~:text=By%20rebalancing%20the%20international%20law%20principle%20of,on%20the%20relationship%20between%20trade%20and%20development.)', 'geo', 'handicap'),
  ('Hara', 'Em árabe, **hara** (حارة) significa "bairro" ou "beco" em um contexto urbano. É usado para descrever pequenas comunidades ou ruas estreitas em cidades tradicionais. Esses bairros frequentemente têm uma identidade cultural ou histórica própria, sendo comuns em cidades antigas do mundo árabe, como o Cairo, Damasco e Fez.

Por exemplo, a famosa "حارة اليهود" (*Harat al-Yahud*) refere-se ao "Bairro Judeu" em algumas cidades árabes históricas. O termo evoca a ideia de vizinhança e comunidade em um ambiente próximo e interligado.', 'geo', 'hara'),
  ('Humint (Inteligência humana)', '**HUMINT** é a sigla para **Human Intelligence** (Inteligência Humana). É a modalidade de coleta de informações estratégicas realizada por meio de fontes, interações ou contatos humanos diretos, sendo uma das disciplinas mais antigas da atividade de inteligência e espionagem.

### Principais Fontes e Métodos de HUMINT

Diferente de interceptações de sinais ou imagens de satélite, o HUMINT baseia-se na exploração de relacionamentos e fatores comportamentais:

- **Agentes infiltrados e espiões:** Pessoas recrutadas para obter acesso a informações confidenciais dentro de governos, empresas ou forças armadas adversárias.
- **Interrogatórios e entrevistas:** Obtenção de dados a partir do questionamento de prisioneiros de guerra, desertores ou testemunhas.
- **Fontes diplomáticas e relatórios de adidos:** Informações obtidas por diplomatas e oficiais de ligação durante interações oficiais ou informais no exterior.
- **Operações disfarçadas (*undercover*):** Oficiais de inteligência que assumem falsas identidades para se aproximar de alvos estratégicos.

### HUMINT vs. Outras Disciplinas de Inteligência

No meio de defesa e inteligência, o HUMINT é frequentemente combinado com outras siglas:

| **Sigla** | **Nome Completo** | **Fonte / Método** |
| --- | --- | --- |
| **HUMINT** | *Human Intelligence* | Redes humanas, agentes, interrogatórios e fontes presenciais. |
| **SIGINT** | *Signals Intelligence* | Interceptação de comunicações (rádio, chamadas, e-mails) e sinais eletrônicos. |
| **GEOINT / IMINT** | *Geospatial / Imagery Intelligence* | Análise de imagens de satélite, mapas e fotografias aéreas (ex.: fotos de drones). |
| [**OSINT**](OSINT%20(Open%20Source%20Intelligence)%202bc0c519cad480bcb0f0eb025ab18bdb.md) | *Open Source Intelligence* | Coleta e análise de dados publicamente disponíveis (notícias, redes sociais, relatórios). |

### O Papel do HUMINT em Operações Cibernéticas

Embora ciberataques pareçam 100% digitais, operações cibernéticas de alto nível (como no caso do [Stuxnet](/glossary/stuxnet-attack-on-iran-s-nuclear-enrichment-program)) dependem de HUMINT para ultrapassar barreiras físicas. Redes altamente protegidas e isoladas da internet (*air-gapped*) só costumam ser infectadas quando um agente humano introduz fisicamente o código malicioso na infraestrutura interna por meio de dispositivos como pen drives.', 'geo', 'humint-inteligencia-humana'),
  ('Império Otomano', '### Império Otomano: 1299 – 1922 (mais de 600 anos)

Foi uma região da Anatólia (atual Turquia) e se expande para abranger vastas áreas no Oriente Médio, Norte da África, Euro Oriental e partes da Europa Central

Controlou a região que hoje compreende a Palestina, juntamente com muitas outras terras do Mediterrâneo Oriental. A Palestina estava sob controle desde o Século XVI até o final de WWI', 'geo', 'imperio-otomano'),
  ('Insurreição', 'Ação de insurgir, de se opor, de se colocar contra uma ordem preestabelecida ou determinada; revolta.

- **Jurídico:** crime que se configura na oposição direcionada a um poder com o propósito de derrubá-lo.
- **Por extensão:** oposição intensa e insistente; rebeldia: insurreição popular.

---

Source: [dicio.com.br](https://www.dicio.com.br/insurreicao/)', 'geo', 'insurreicao'),
  ('Intifada', 'Intifada **é um** **termo frequentemente associado a dois movimentos de resistência palestinos contra a ocupação israelense em seu território**. De origem árabe, o termo “intifada” significa “agitar” ou “sacudir”, e foi usado para descrever a revolta e resistência do povo palestino contra a ocupação israelense. As duas intifadas mais proeminentes ocorreram de 1987 a 1993 (Primeira Intifada, ou Intifada das Pedras) e de 2000 a 2005 (Segunda Intifada). Ambas tiveram como pano de fundo o conflito entre Israel e os palestinos e levaram a tumultos, manifestações e violência.

### **Resumo sobre intifada**

- Intifada é um termo frequentemente associado a dois movimentos de resistência palestinos contra a ocupação israelense em seu território.
- De origem árabe, o termo “intifada” significa “agitar” e foi usado para descrever o despertar da consciência palestina e a luta contra a ocupação israelense.
- As intifadas foram desencadeadas por vários fatores, como a opressão da ocupação israelense, tensões religiosas e culturais, falta de progresso nas negociações.
- A Primeira Intifada (1987-1993) foi um levante da população palestina contra a ocupação israelense, que àquela altura já durava vinte anos. O estopim da Primeira Intifada foi a morte de 4 palestinos, atropelados na Faixa de Gaza por um caminhão de Israel. A revolta se iniciou de modo espontâneo e descentralizado, protagonizada por estudantes e jovens palestinos, cujos únicos recrusos de defesa contra o exército israelense eram pedras, coquetéis molotov e barricadas de pneus queimados. A Primeira Intifada se estendeu até 1994, quando foram assinados os [Acordos de Oslo](/glossary/acordo-de-paz-de-oslo) entre o governo de Israel e Yasser Arafat, líder da Organização para a Libertação da Palestina.
- A Segunda Intifada (2000-2005) ocorreu após a visita polêmica do líder israelense Ariel Sharon à Esplanada das Mesquitas em Jerusalém.
- Os objetivos das intifadas incluíram o fim da ocupação israelense, reconhecimento internacional, direitos e autodeterminação, resistência e negociações de paz sérias.
- Várias foram as consequências das intifadas, que resultaram em um grande número de vítimas, mudanças no equilíbrio de poder, expansão de assentamentos, divisões palestinas e impacto duradouro na região.

---

Source: [mundoeducacao.uol.com.br](https://mundoeducacao.uol.com.br/historiageral/intifada.htm#:~:text=Resumo%20sobre%20intifada-,Intifada%20%C3%A9%20um%20termo%20frequentemente%20associado%20a%20dois%20movimentos%20de,luta%20contra%20a%20ocupa%C3%A7%C3%A3o%20israelense.)', 'geo', 'intifada'),
  ('Islamic Supreme Council of America', 'The Islamic Supreme Council of America (ISCA) is a U.S.-based Muslim religious and educational organization founded in 1997 by Shaykh Hisham Kabbani. Headquartered in Fenton, Michigan, ISCA focuses on promoting traditional Islamic teachings through the lens of Sufism.

**Core Mission and Beliefs**

- **Moderation and Peace:** ISCA works to present Islam as a religion of peace, tolerance, and justice.
- **Rejection of Extremism:** The organization explicitly rejects puritanical movements and extremist ideologies, including Wahhabism.
- **Interfaith Dialogue:** It emphasizes the shared heritage of Islam, Christianity, and Judaism to build mutual respect between different cultures.
- **Modern Integration:** It seeks to apply traditional Islamic scholarship to help Muslims navigate contemporary, secular societies.

**Leadership and Operations**

- **Chairman:** Shaykh Muhammad Hisham Kabbani, a prominent Sufi scholar of the Naqshbandi order, serves as the chairman.
- **Activities:** The group engages in global humanitarian efforts, educational outreach, and interfaith discussions with government and religious leaders.

---

Source: [en.wikipedia.org](https://en.wikipedia.org/wiki/Islamic_Supreme_Council_of_America)', 'zei', 'islamic-supreme-council-of-america'),
  ('Jihadismo', 'O jihadismo é uma vertente extremista e violenta que deturpa o conceito islâmico de *jihad* para justificar campanhas de terrorismo e conflitos armados no mundo.

**O Significado: Jihad vs. Jihadismo**

- **Jihad:** No islamismo tradicional, significa "esforço" ou "luta". Pode ser a luta interna para ser uma pessoa melhor ou a defesa da comunidade muçulmana.
- **Jihadismo:** É um termo moderno criado para definir grupos que transformam essa luta em guerra violenta, terrorismo e imposição de sua visão extremista da lei religiosa.

**Principais Características**

- **Uso da Violência:** Empregam atentados suicidas, assassinatos e guerras civis para atingir seus objetivos.
- **Inimigos:** Atacam tanto governos ocidentais quanto governos de países muçulmanos que consideram infiéis ou apóstatas.
- **Rejeição de Regras:** Ignoram as regras tradicionais da guerra e matam civis sem distinção.

**Grupos Conhecidos**

- [**Al-Qaeda](/glossary/al-qaeda):** Ficou famoso pelos ataques de 11 de setembro de 2001 nos Estados Unidos.
- [**Estado Islâmico](Estado%20Isl%C3%A2mico%20(ISIS%20EIIL%20Daesh)%203df0c519cad4809f8f74d682a115fbef.md):** Tentou criar um "califado" na Síria e no Iraque, usando extrema violência e controle territorial.
- **Talibã:** Grupo que governa o Afeganistão e compartilha de visões radicais, embora com foco mais nacionalista em alguns momentos.

---

Source: [pt.wikipedia.org](https://pt.wikipedia.org/wiki/Jihadismo)', 'geo', 'jihadismo'),
  ('Jus solis / 🩸 Jus sanguinis', 'No sistema do Jus Soli, a nacionalidade é obtida em virtude do território onde o indivíduo tenha nascido – regra do solo. Logo, não importa a nacionalidade dos pais, pois o direito é concedido em razão do nascimento no território do Estado que permita este sistema.

Este é o sistema adotado no Brasil. Se a criança nasce em território brasileiro, é considerada cidadã brasileira.

No sistema Jus Sanguinis, a regra de direito é pelo sangue. Assim, a nacionalidade é atribuída em razão da ascendência, da família de sangue. Esta é a regra adotada na Itália. Portanto, é considerado cidadão italiano, o filho de pais italianos.

![Jus solis / 🩸 Jus sanguinis](/glossary/jus-solis-jus-sanguinis-1.webp)', 'geo', 'jus-solis-jus-sanguinis'),
  ('Keffiyeh', 'Lenço preto e branco que se tornou um símbolo da luta pela libertação da Palestina.

A estampa é emblemática e cheia de significados: é possível ver folhas de oliva, que representam as árvores de oliveira centenárias da Palestina; linhas retas que simbolizam as rotas que carregam a história e as tradições da região; e a rede de pesca, que mostra a profunda ligação dos pescadores e do povo palestino com o Mar Mediterrâneo.', 'art', 'keffiyeh'),
  ('Kejawèn', 'Kejawèn ou Javanismo, também conhecido como Kebatinan, Agama Jawa (lit. "Religião Javanesa") e Kepercayaan (lit. "Crença"), é uma tradição cultural javanesa que consiste em uma amálgama de aspectos animistas, budistas, hindus e islâmicos.

Kejawèn (Javanese: ꦏꦗꦮꦺꦤ꧀, romanized: Kajawèn) or Javanism, also known as Kebatinan, Agama Jawa lit. ''Javanese Religion'', and Kepercayaan lit. ''Belief'', is a Javanese cultural tradition, consisting of an amalgam of animistic, Buddhist, Hindu and Islamic aspects. It is rooted in Javanese history and religiosity, syncretizing aspects of different religions and traditions.

![Kejawèn](/glossary/kejawen-1.webp)', 'zei', 'kejawen'),
  ('Kibutz', 'O kibutz (hebraico: קיבוץ; plural: kibutzim: קיבוצים, "reunião" ou "juntos") é uma comunidade agrária coletiva israelita inicialmente utópica, sem uso de meios de produção privativos, uma coletividade comunitária voluntária baseada nos princípios do sionismo trabalhista (combinação de socialismo e sionismo). Comunidade para proteção da crescente onda de antissemitismo na Europa na época.

Apesar de existirem empresas comunais (ou cooperativas) em outros países, em nenhum outro lugar esse tipo desempenharam papel tão importante como em Israel, com função essencial na criação do Estado judeu.

Os kibutzim são considerados uma experiência única de Israel, e parte de um dos maiores movimentos comunais seculares na história. Fundados em um momento que a lavoura individual não era prática. Forçados pela necessidade de vida comunal e inspirados por ideologia socialista, os membros do kibutz desenvolveram modo de vida em comunidade que atraiu interesse mundial.

---

Source: [pt.wikipedia.org](https://pt.wikipedia.org/wiki/Kibutz)', 'zei', 'kibutz'),
  ('Malware', 'Malware é a abreviação de "malicious software" (software malicioso) e se refere a qualquer programa ou código projetado para causar danos, roubar dados ou obter acesso não autorizado a dispositivos e redes. É um termo genérico que abrange diversos tipos de ameaças, como vírus, worms, ransomware, spyware e cavalos de Troia. Para se proteger, é essencial usar programas de segurança cibernética e tomar precauções online.

**O que é malware**

- **Software malicioso**: Programas criados para serem prejudiciais, roubando informações confidenciais como senhas e números de cartão de crédito, ou para interromper operações.
- **Acesso não autorizado**: Malware pode dar a criminosos cibernéticos acesso não autorizado a um computador ou rede.
- **Formas variadas**: Inclui uma ampla gama de softwares, cada um com suas próprias características e métodos de ataque.

**Tipos comuns de malware**

- **Vírus**: Programas que se replicam e se anexam a outros programas. Podem corromper ou apagar dados.
- **Worms**: Semelhantes aos vírus, mas se espalham automaticamente por redes, explorando vulnerabilidades sem precisar de um programa hospedeiro.
- **Ransomware**: Um tipo de malware que sequestra dados e exige um resgate para devolvê-los.
- **Spyware**: Coleta informações do usuário secretamente, como hábitos de navegação, credenciais e dados pessoais.
- **Cavalos de Troia**: Disfarçam-se como programas legítimos, mas executam ações maliciosas sem o conhecimento do usuário quando ativados.', 'geo', 'malware'),
  ('Mandato Britânico da Palestina', '**Em junho de 1922, a Liga das Nações aprovou o Mandato Britânico da Palestina**. O documento estabelecia a responsabilidade britânica sobre o território da então Palestina otomana e comandava o estabelecimento de um lar nacional para o povo judeu.

O Mandato Britânico da Palestina foi uma entidade geopolítica sob administração britânica que foi criada com a Partilha do Império Otomano após o final da Primeira Guerra Mundial. A administração civil britânica na Palestina operou de 1920 a 1948.

![Mandato Britânico da Palestina](/glossary/mandato-britanico-da-palestina-1.webp)', 'geo', 'mandato-britanico-da-palestina'),
  ('Massacre da Praça da Paz Celestial em 1989', 'O Massacre da Praça da Paz Celestial em 1989, também chamado Massacre de 4 de Junho, consistiu na repressão do governo da República Popular da China às manifestações populares pacíficas ocorridas em Pequim, por meio do emprego da força militar chinesa. Acarretou o assassinato de um grande número de civis.

Os protestos e as ordens do governo de interditação destes, produziu no Partido Comunista uma divisão de opiniões sobre como o governo deveria responder aos manifestantes. A decisão tomada foi suprimir os protestos pela força, no lugar de atenderem suas reivindicações.', 'geo', 'massacre-da-praca-da-paz-celestial-em-1989'),
  ('Massacre de Deir Yassin', 'O massacre de Deir Yassin se refere à matança de entre 107 e 120 civis palestinos desarmados, ocorrida na vila de Deir Yassin, nas proximidades de Jerusalém, no que então era o Mandato Britânico da Palestina, cometida pelas forças de guerrilha judaico-sionistas entre 9 de abril e 11 de abril de 1948.

No ano do 75º aniversário da Nakba, não podemos deixar apagar a memória de que o Estado de Israel foi erigido sobre os cadáveres de 15 000 crianças, mulheres e homens palestinos, sobre os escombros de meio milhar de vilas e aldeias apagadas do mapa, sobre a ocupação das casas e campos de 750 000 palestinos forçados ao exílio pelo terror sionista.

Deir Yassin era uma pacata aldeia árabe, com cerca de 750 habitantes, empoleirada numa colina a ocidente de Jerusalém. Ficava fora da área que o Plano de Partilha das Nações Unidas, aprovado em 29 de Novembro de 1947, destinava ao futuro Estado judaico, e os seus habitantes até tinham estabelecido um pacto de não-agressão com a milícia sionista Haganah. Mas Deir Yassin tinha a fatalidade de se situar na estrada entre Telavive e Jerusalém.

Antecipando o fim do mandato britânico, marcado para 15 de Maio de 1948, a direcção sionista tinha desde há muito decidido efectuar uma limpeza étnica dos palestinos, com o objectivo de consolidar e expandir a área que lhe era atribuída. Nesse sentido, em 10 de Março aprovou o Plano Dalet, um plano de operações militares em que uma das primeiras concretizações foi a Operação Nachson, destinada a «limpar» a estrada entre Telavive e Jerusalém. E Deir Yassin estava no caminho.

---

Source: [mppm-palestina.org](https://mppm-palestina.org/content/ha-75-anos-deir-yassin-prenunciou-limpeza-etnica-da-palestina)', 'geo', 'massacre-de-deir-yassin'),
  ('Mercado Comum do Sul (Mercosul)', 'O Mercado Comum do Sul (Mercosul) é um bloco econômico regional sul-americano criado em 26 de março de 1991 pelo [Tratado de Assunção](https://www2.camara.leg.br/atividade-legislativa/comissoes/comissoes-mistas/cpcms/conheca-a-representacao/oqueeomercosul.html/mercosulsocial.html).

**Países Membros**

- **Membros plenos:** **Brasil**, Argentina, Paraguai, Uruguai, Bolívia e Venezuela (esta última com participação suspensa).
- **Estados associados:** Chile, Colômbia, Equador, Guiana, Peru, Suriname e Panamá.

**Objetivos Principais**

- **Livre comércio:** Eliminação de tarifas alfandegárias e barreiras entre os países membros.
- **Tarifa Externa Comum (TEC):** Aplicação de regras uniformes de importação para países de fora do bloco.
- **Integração:** Coordenação de políticas econômicas, de transporte e de leis entre os vizinhos da região.

---

Source: [mercosur.int](https://www.mercosur.int/pt-br/sobre-o-mercosul/o-que-e-o-mercosul)', 'geo', 'mercado-comum-do-sul-mercosul'),
  ('Metapolítica', 'A metapolítica é o conjunto de ideias, valores e crenças culturais que moldam e antecedem a própria disputa pelo poder político institucional.

**O Conceito Filosófico**

- **Definição:** É a esfera que busca os fundamentos profundos, atemporais e espirituais ou culturais da política, indo além das leis e dos governos de um momento específico.
- **Origem e Uso:** O termo ganhou força com pensadores conservadores e da Nova Direita (como Alain de Benoist) para descrever a conquista de espaço na cultura, na educação e na mídia antes de tentar vencer eleições.
- **Visão Crítica:** No marxismo e em outras correntes radicais, também denota a superação revolucionária da própria estrutura social que gera o Estado e o poder político tradicional.

**Outros Significados no Brasil**

- **Consultoria e Assessoria:** É o nome da [**Metapolítica Consultoria**](https://metapolitica.com.br/), uma empresa brasileira de relações governamentais e análise de dados parlamentares baseada em Brasília.

---

O exemplo mais prático e famoso de metapolítica na história moderna é o conceito de Hegemonia Cultural formulado pelo filósofo Antonio Gramsci.

Imagine uma linha do tempo onde a política institucional é apenas o resultado final:

- **Etapa 1: A Produção Cultural (Onde nasce a Metapolítica): t**udo começa na criação e circulação de ideias. Intelectuais, artistas, influenciadores, professores e cineastas começam a produzir livros, filmes, músicas, memes e conteúdos educativos defendendo uma determinada visão de mundo.
- **Etapa 2: O Senso Comum (Onde a Metapolítica se consolida): c**om o tempo, essa produção cultural constante molda o que a sociedade passa a considerar "certo", "errado", "normal" ou "absurdo". As pessoas mudam seus valores e o comportamento cotidiano sem perceberem que foram influenciadas por uma estratégia de longo prazo.
- **Etapa 3: A Mudança Política (O resultado final): s**omente após a cultura e o senso comum mudarem é que os políticos propõem novas leis ou ganham eleições baseados nessa nova mentalidade. A aprovação da lei ocorre sem grandes resistências porque a população já concorda com aquela ideia no dia a dia.

**O Exemplo Prático: A Mudança sobre o Tabagismo**

Durante décadas, fumar era visto como um símbolo de status, charme e liberdade. Isso não mudou por causa de uma lei repentina, mas sim por uma longa **estratégia metapolítica** (cultural e comportamental):

- **Ação Metapolítica:** Cientistas, cineastas, educadores e jornalistas começaram a mudar a narrativa cultural em torno do cigarro. Filmes pararam de glamourizar o fumo, escolas passaram a educar sobre a saúde e o debate público transformou o ato de fumar em algo socialmente indesejado.
- **O Resultado Político:** Só depois que o "senso comum" da sociedade mudou (metapolítica), os governos ganharam força e apoio popular para aprovar **leis restritivas**, como a proibição de fumar em locais fechados e o aumento de impostos sobre o tabaco.

Se o governo tentasse proibir o cigarro nos anos 1950, haveria uma revolta popular. A metapolítica preparou o terreno cultural para que a mudança política fosse possível e aceita anos depois.

---

Source: [pt.wikipedia.org](https://pt.wikipedia.org/wiki/Metapol%C3%ADtica)', 'geo', 'metapolitica'),
  ('Monoftongação', 'A monotongação ou monoftongação (Monophthongization) é uma mudança fonética em que um ditongo ou um tritongo é simplificado para um monotongo. Esse processo, fortemente presente no português brasileiro e no sul de Portugal, faz com que ⟨dinheiro⟩ passe a ser pronunciado como /di.ˈɲe.ru/, e ⟨roupa⟩, como /ˈʁo.pɐ/.', 'zei', 'monoftongacao'),
  ('Movimento para a independência do Tibete', 'O movimento de independência do Tibete é um movimento que visa à independência do Tibete e a separação política do Tibete em relação à República Popular da China.

O movimento é liderado principalmente pelos tibetanos no exílio em países como a Índia e os Estados Unidos, e por celebridades e budistas tibetanos nos Estados Unidos, Índia e Europa. O movimento não é mais apoiado pelo 14.º Dalai Lama, que apesar de tê-lo defendido de 1961 até o final dos anos 1970, propondo uma espécie de autonomia de alto nível em um discurso em Estrasburgo em 1988, e desde então restringiu sua posição a qualquer autonomia para o povo tibetano na Região Autônoma do Tibete dentro da China, ou extensão da área da autonomia para incluir partes das províncias chinesas vizinhas habitadas por tibetanos. O nível de apoio para o movimento na Região Autônoma do Tibete e em outras regiões tibetanas da China é difícil de ser avaliado.

---

Source: [pt.wikipedia.org](https://pt.wikipedia.org/wiki/Movimento_para_a_independ%C3%AAncia_do_Tibete)', 'geo', 'movimento-para-a-independencia-do-tibete'),
  ('Movimento para a independência do Turquestão Oriental', 'O movimento para a independência do Turquestão Oriental se refere aos defensores da autonomia, soberania e independência da atual Região Autônoma Uigur de Sinquião, atualmente parte da República Popular da China. "Turquestão Oriental" e "Uiguristão" são os nomes históricos/étnicos dados à região autônoma, onde vivem muitos uigures muçulmanos.

---

Source: [pt.wikipedia.org](https://pt.wikipedia.org/wiki/Movimento_para_a_independ%C3%AAncia_do_Turquest%C3%A3o_Oriental)', 'zei', 'movimento-para-a-independencia-do-turquestao-oriental'),
  ('Māori Language Act (1987)', 'The Māori Language Act 1987 was a piece of legislation passed by the Parliament of New Zealand that gave official language status to the Māori language (te reo Māori), and gave speakers a right to use it in legal settings such as courts. It also established the Māori Language Commission, initially called Te Komihana Mo Te Reo Maori, to promote the language and provide advice on it. The law was enacted as the Maori Language Act 1987 and originally written without macrons. It was repealed by section 48 of the Māori Language Act 2016.

---

Source: [en.wikipedia.org](https://en.wikipedia.org/wiki/Maori_Language_Act_1987)', 'zei', 'maori-language-act-1987'),
  ('Nakba', 'Nakba é uma palavra árabe que significa "catástrofe" ou "desastre" e designa o êxodo palestino de 1948, quando pelo menos 711.000 árabes palestinos, segundo dados da Organização das Nações Unidas, fugiram ou foram expulsos de seus lares, em razão da guerra civil de 1947-1948 e da Guerra Árabe-Israelense de 1948.

Em 1947, a Assembleia Geral das Nações Unidas propôs a partição do Mandato Britânico da Palestina em dois estados - um judeu e outro árabe. A comunidade judaica aceitou o Plano de Partição da Palestina, enquanto a comunidade árabe palestina, apoiada pela Liga Árabe, rejeitou o plano, declarando que oporia resistência armada à sua implementação. Apesar da guerra que se seguiu, os palestinos não conseguiram evitar o estabelecimento do estado judeu, em 1948. Estima-se que, em decorrência da guerra, 700.000 árabes palestinos tenham sido expulsos de suas terras, ao mesmo tempo em que foram destruídas e despovoadas mais de 418 aldeias árabes, cujos nomes Israel tratou posteriormente de apagar dos mapas. Desde então, os palestinos expulsos e seus descendentes permanecem dispersos pelo mundo, na condição de refugiados, os palestinos se referem a esses eventos como al-Nakba ("A Catástrofe").

---

Source: [pt.wikipedia.org](https://pt.wikipedia.org/wiki/Nakba)', 'geo', 'nakba'),
  ('Narcopentecostalismo', 'Narcopentecostalismo é um termo jornalístico e acadêmico que descreve a fusão entre facções do narcotráfico e religiões neopentecostais, especialmente no Rio de Janeiro a partir dos anos 2010, onde traficantes usam símbolos religiosos, adotam práticas e buscam legitimar seu poder e controle territorial em áreas de favelas, substituindo, por vezes, as religiões afro-brasileiras e criando uma identidade híbrida de dominação social e simbólica com um discurso alinhado à extrema-direita.

## **Características Principais**

- [**Fusão Religiosa](https://www.google.com/search?sca_esv=f85673565f5b1f98&sxsrf=AE3TifNQeZJ0LTQXlj4voGdODFDqzwYiYw%3A1765148915631&q=Fus%C3%A3o+Religiosa&sa=X&ved=2ahUKEwjC6N2QzKyRAxXwGLkGHXJdHeYQxccNegQIQhAB&mstk=AUtExfBuYI4AK3SWIzdY7CUWCDhijFlwZ8GREX4n8u_9YHH8hJ4_04tgn4Bi2lg5oHISCL1hlwXFFsyeYnODlpOnIqsdC5D5b1LgGy9bZmimwdad-pSex87QsTgGu8W8DzLLAQvwEiHbc06kgv-wFfokwWscFHVTJN9EQZbmx96xGyLdbSLr6rN0goJZteNm7McGpI9zr03S8cWftppcwLyDZeAdnx0TGNieZpxakN7iRYX2BTzmxMrhMZuVJ1HdY2zPH9ZkLZYXN5pz-P4TS5CyVXP4&csui=3):** Traficantes se convertem, frequentam cultos e usam símbolos judaico-cristãos (como os de Israel e do Antigo Testamento) para construir uma identidade "povo de Deus" ou "soldados de Jesus".
- [**Disputa Territorial](https://www.google.com/search?sca_esv=f85673565f5b1f98&sxsrf=AE3TifNQeZJ0LTQXlj4voGdODFDqzwYiYw%3A1765148915631&q=Disputa+Territorial&sa=X&ved=2ahUKEwjC6N2QzKyRAxXwGLkGHXJdHeYQxccNegUIhgEQAQ&mstk=AUtExfBuYI4AK3SWIzdY7CUWCDhijFlwZ8GREX4n8u_9YHH8hJ4_04tgn4Bi2lg5oHISCL1hlwXFFsyeYnODlpOnIqsdC5D5b1LgGy9bZmimwdad-pSex87QsTgGu8W8DzLLAQvwEiHbc06kgv-wFfokwWscFHVTJN9EQZbmx96xGyLdbSLr6rN0goJZteNm7McGpI9zr03S8cWftppcwLyDZeAdnx0TGNieZpxakN7iRYX2BTzmxMrhMZuVJ1HdY2zPH9ZkLZYXN5pz-P4TS5CyVXP4&csui=3):** A religião se torna uma ferramenta para dominar comunidades, controlar espaços urbanos e impor uma moralidade evangélica, muitas vezes em conflito com religiões de matriz africana (Umbanda, Candomblé).
- [**Instrumento de Dominação](https://www.google.com/search?sca_esv=f85673565f5b1f98&sxsrf=AE3TifNQeZJ0LTQXlj4voGdODFDqzwYiYw%3A1765148915631&q=Instrumento+de+Domina%C3%A7%C3%A3o&sa=X&ved=2ahUKEwjC6N2QzKyRAxXwGLkGHXJdHeYQxccNegUIgAEQAQ&mstk=AUtExfBuYI4AK3SWIzdY7CUWCDhijFlwZ8GREX4n8u_9YHH8hJ4_04tgn4Bi2lg5oHISCL1hlwXFFsyeYnODlpOnIqsdC5D5b1LgGy9bZmimwdad-pSex87QsTgGu8W8DzLLAQvwEiHbc06kgv-wFfokwWscFHVTJN9EQZbmx96xGyLdbSLr6rN0goJZteNm7McGpI9zr03S8cWftppcwLyDZeAdnx0TGNieZpxakN7iRYX2BTzmxMrhMZuVJ1HdY2zPH9ZkLZYXN5pz-P4TS5CyVXP4&csui=3):** Combina violência com uma narrativa de purificação espiritual, usando o discurso religioso para legitimar o poder do crime organizado e alcançar hegemonia.
- [**Contexto Social](https://www.google.com/search?sca_esv=f85673565f5b1f98&sxsrf=AE3TifNQeZJ0LTQXlj4voGdODFDqzwYiYw%3A1765148915631&q=Contexto+Social&sa=X&ved=2ahUKEwjC6N2QzKyRAxXwGLkGHXJdHeYQxccNegQIfxAB&mstk=AUtExfBuYI4AK3SWIzdY7CUWCDhijFlwZ8GREX4n8u_9YHH8hJ4_04tgn4Bi2lg5oHISCL1hlwXFFsyeYnODlpOnIqsdC5D5b1LgGy9bZmimwdad-pSex87QsTgGu8W8DzLLAQvwEiHbc06kgv-wFfokwWscFHVTJN9EQZbmx96xGyLdbSLr6rN0goJZteNm7McGpI9zr03S8cWftppcwLyDZeAdnx0TGNieZpxakN7iRYX2BTzmxMrhMZuVJ1HdY2zPH9ZkLZYXN5pz-P4TS5CyVXP4&csui=3):** Fenômeno emergente nas periferias e favelas do Rio de Janeiro, refletindo a expansão do neopentecostalismo nesses contextos.

## **Origem e Uso do Termo**

- Surgiu com o crescimento de grupos criminosos que adotaram o pentecostalismo como ideologia, como o TCP (Terceiro Comando Puro) no Rio.
- É um termo debatido, com alguns pesquisadores criticando-o por ser sensacionalista e reduzir a complexa relação entre crime e religião no Brasil, que sempre existiu, mas se reconfigurou com a ascensão evangélica.

> *Em resumo, o narcopentecostalismo descreve como a religião se tornou um elemento central na disputa por poder e controle territorial por facções criminosas, misturando fé, violência e política.*', 'geo', 'narcopentecostalismo'),
  ('Native Land Act of 1862', 'The Native Lands Act 1862 was a New Zealand colonial law passed on September 15, 1862, that changed how Māori land ownership was recognized and allowed private land sales between Māori and European settlers.

![Native Land Act of 1862](/glossary/native-land-act-of-1862-1.webp)

![Native Land Act of 1862](/glossary/native-land-act-of-1862-2.webp)

**Key Details of the Act**

- **End of Crown Monopoly**: it moved away from the Crown''s exclusive right of pre-emption (the sole right to buy Māori land) established by the [Treaty of Waitangi in 1840](Treaty%20of%20Waitangi%20(1840)%2031e0c519cad4800898c2cdbd0147e34e.md).
- **Direct Transactions**: it allowed Māori owners to deal and sell their land directly to individual European settlers (*Pākehā*) after ownership was legally defined.
- **Establishment of Courts**: it empowered the Governor to set up courts—presided over by European magistrates with assistance from Māori chiefs or assessors—to investigate customary ownership and issue certificates of title.
- **Individual Titles**: The process aimed to convert collective tribal customary ownership into individual property rights recognized under British law.

**Impact and Aftermath**

- **Dispossession**: by individualizing title and permitting direct sales, the law made it easier for settlers to acquire Māori land, leading to significant long-term land loss.
- **Replacement**: because it contravened existing treaty frameworks and proved difficult to apply during the New Zealand Wars, it was largely superseded by the more comprehensive **Native Lands Act 1865**, which established the formal Native Land Court.

---

Source: [legislation.govt.nz](https://www.legislation.govt.nz/act/public/1862/42/en/latest/)', 'geo', 'native-land-act-of-1862'),
  ('OSI (Open Systems Interconnection)', 'Há sete camadas de abstração que compõem o modelo OSI. A comunicação de uma pessoa para outra vai da Camada 7 para a Camada 1. Cada camada executa um trabalho específico antes de enviar os dados para a próxima camada.

O modelo OSI (open systems interconnection) divide as funções de um sistema de rede em 7 camadas, com cada camada sintetizada a partir da camada abaixo dela. Dentro do modelo, cada camada interage apenas com as camadas acima e abaixo dela própria.

![OSI (Open Systems Interconnection)](/glossary/osi-open-systems-interconnection-1.webp)

### **Camada 7 — Camada de aplicação**

A camada de aplicação é a mais próxima do usuário final. Ele inicia a comunicação entre o usuário e os aplicativos com os quais ele interage pessoalmente. Nesta camada, os dados são traduzidos da sintaxe em que foram convertidos em algo que o usuário pode ler.

Exemplos de aplicativos de Camada 7 incluem um navegador da web como Chrome, Safari ou Firefox, ou um aplicativo de e-mail. A camada 7 também pode identificar parceiros de comunicação, verificar quais recursos estão disponíveis e garantir que a comunicação esteja devidamente sincronizada.

**Exemplos de protocolos**

- [**HTTP](https://www.google.com/search?q=HTTP&sca_esv=940aa337a8577638&sxsrf=AE3TifPnTvTWoZj2WD12rmWaBiNHfNEoAg%3A1764719170113&ei=QnovacXLBqzU1sQPrLr-wA0&ved=2ahUKEwihxciji6CRAxWMlJUCHU9YLI8QgK4QegQIBhAB&uact=5&oq=Camada+7+%28Aplica%C3%A7%C3%A3o%29+do+modelo+OSI&gs_lp=Egxnd3Mtd2l6LXNlcnAiJENhbWFkYSA3IChBcGxpY2HDp8OjbykgZG8gbW9kZWxvIE9TSTIGEAAYFhgeMggQABiABBiiBDIFEAAY7wUyCBAAGIAEGKIESIArUJQIWLAOcAF4AZABAJgBxwGgAZwEqgEDMC4zuAEDyAEA-AEBmAIEoAKtBMICChAAGLADGNYEGEeYAwCIBgGQBgiSBwUxLjIuMaAH0gWyBwUwLjIuMbgHqATCBwUxLjEuMsgHCw&sclient=gws-wiz-serp&mstk=AUtExfDh0Z1yFI6HFO6FGMsOj7Q_R9Lr5oywlrq4eRElRNveSdBsEStiUeWGSw8Y9nDespU8KmG0P3kEGr_28ygj9f7R379MCyX7g1ILV_-fy-EOwD1Sei0VBo5a9GZNnWKzqOmPJhO1IoKyQXcEo04v75oHhbNXsYd85LL_0Eq50-7QesjAqpEqTxHpNJrf-PcLpi4-kKDQBJYj7mKKwr9PH3qyPbvx2y76cPW89LTHNH7ZB10uOBcstx56B0vf4N8vrIDPxZmG0lSTVcpISg-1zbKD&csui=3)/HTTPS:** Protocolo para navegação na web.
- [**SMTP](https://www.google.com/search?q=SMTP&sca_esv=940aa337a8577638&sxsrf=AE3TifPnTvTWoZj2WD12rmWaBiNHfNEoAg%3A1764719170113&ei=QnovacXLBqzU1sQPrLr-wA0&ved=2ahUKEwihxciji6CRAxWMlJUCHU9YLI8QgK4QegQIBhAD&uact=5&oq=Camada+7+%28Aplica%C3%A7%C3%A3o%29+do+modelo+OSI&gs_lp=Egxnd3Mtd2l6LXNlcnAiJENhbWFkYSA3IChBcGxpY2HDp8OjbykgZG8gbW9kZWxvIE9TSTIGEAAYFhgeMggQABiABBiiBDIFEAAY7wUyCBAAGIAEGKIESIArUJQIWLAOcAF4AZABAJgBxwGgAZwEqgEDMC4zuAEDyAEA-AEBmAIEoAKtBMICChAAGLADGNYEGEeYAwCIBgGQBgiSBwUxLjIuMaAH0gWyBwUwLjIuMbgHqATCBwUxLjEuMsgHCw&sclient=gws-wiz-serp&mstk=AUtExfDh0Z1yFI6HFO6FGMsOj7Q_R9Lr5oywlrq4eRElRNveSdBsEStiUeWGSw8Y9nDespU8KmG0P3kEGr_28ygj9f7R379MCyX7g1ILV_-fy-EOwD1Sei0VBo5a9GZNnWKzqOmPJhO1IoKyQXcEo04v75oHhbNXsYd85LL_0Eq50-7QesjAqpEqTxHpNJrf-PcLpi4-kKDQBJYj7mKKwr9PH3qyPbvx2y76cPW89LTHNH7ZB10uOBcstx56B0vf4N8vrIDPxZmG0lSTVcpISg-1zbKD&csui=3):** Protocolo para envio de e-mail.
- [**FTP](https://www.google.com/search?q=FTP&sca_esv=940aa337a8577638&sxsrf=AE3TifPnTvTWoZj2WD12rmWaBiNHfNEoAg%3A1764719170113&ei=QnovacXLBqzU1sQPrLr-wA0&ved=2ahUKEwihxciji6CRAxWMlJUCHU9YLI8QgK4QegQIBhAF&uact=5&oq=Camada+7+%28Aplica%C3%A7%C3%A3o%29+do+modelo+OSI&gs_lp=Egxnd3Mtd2l6LXNlcnAiJENhbWFkYSA3IChBcGxpY2HDp8OjbykgZG8gbW9kZWxvIE9TSTIGEAAYFhgeMggQABiABBiiBDIFEAAY7wUyCBAAGIAEGKIESIArUJQIWLAOcAF4AZABAJgBxwGgAZwEqgEDMC4zuAEDyAEA-AEBmAIEoAKtBMICChAAGLADGNYEGEeYAwCIBgGQBgiSBwUxLjIuMaAH0gWyBwUwLjIuMbgHqATCBwUxLjEuMsgHCw&sclient=gws-wiz-serp&mstk=AUtExfDh0Z1yFI6HFO6FGMsOj7Q_R9Lr5oywlrq4eRElRNveSdBsEStiUeWGSw8Y9nDespU8KmG0P3kEGr_28ygj9f7R379MCyX7g1ILV_-fy-EOwD1Sei0VBo5a9GZNnWKzqOmPJhO1IoKyQXcEo04v75oHhbNXsYd85LL_0Eq50-7QesjAqpEqTxHpNJrf-PcLpi4-kKDQBJYj7mKKwr9PH3qyPbvx2y76cPW89LTHNH7ZB10uOBcstx56B0vf4N8vrIDPxZmG0lSTVcpISg-1zbKD&csui=3):** Protocolo para transferência de arquivos.
- [**DNS](https://www.google.com/search?q=DNS&sca_esv=940aa337a8577638&sxsrf=AE3TifPnTvTWoZj2WD12rmWaBiNHfNEoAg%3A1764719170113&ei=QnovacXLBqzU1sQPrLr-wA0&ved=2ahUKEwihxciji6CRAxWMlJUCHU9YLI8QgK4QegQIBhAH&uact=5&oq=Camada+7+%28Aplica%C3%A7%C3%A3o%29+do+modelo+OSI&gs_lp=Egxnd3Mtd2l6LXNlcnAiJENhbWFkYSA3IChBcGxpY2HDp8OjbykgZG8gbW9kZWxvIE9TSTIGEAAYFhgeMggQABiABBiiBDIFEAAY7wUyCBAAGIAEGKIESIArUJQIWLAOcAF4AZABAJgBxwGgAZwEqgEDMC4zuAEDyAEA-AEBmAIEoAKtBMICChAAGLADGNYEGEeYAwCIBgGQBgiSBwUxLjIuMaAH0gWyBwUwLjIuMbgHqATCBwUxLjEuMsgHCw&sclient=gws-wiz-serp&mstk=AUtExfDh0Z1yFI6HFO6FGMsOj7Q_R9Lr5oywlrq4eRElRNveSdBsEStiUeWGSw8Y9nDespU8KmG0P3kEGr_28ygj9f7R379MCyX7g1ILV_-fy-EOwD1Sei0VBo5a9GZNnWKzqOmPJhO1IoKyQXcEo04v75oHhbNXsYd85LL_0Eq50-7QesjAqpEqTxHpNJrf-PcLpi4-kKDQBJYj7mKKwr9PH3qyPbvx2y76cPW89LTHNH7ZB10uOBcstx56B0vf4N8vrIDPxZmG0lSTVcpISg-1zbKD&csui=3):** Protocolo para resolução de nomes de domínio.
- [**POP3](https://www.google.com/search?q=POP3&sca_esv=940aa337a8577638&sxsrf=AE3TifPnTvTWoZj2WD12rmWaBiNHfNEoAg%3A1764719170113&ei=QnovacXLBqzU1sQPrLr-wA0&ved=2ahUKEwihxciji6CRAxWMlJUCHU9YLI8QgK4QegQIBhAJ&uact=5&oq=Camada+7+%28Aplica%C3%A7%C3%A3o%29+do+modelo+OSI&gs_lp=Egxnd3Mtd2l6LXNlcnAiJENhbWFkYSA3IChBcGxpY2HDp8OjbykgZG8gbW9kZWxvIE9TSTIGEAAYFhgeMggQABiABBiiBDIFEAAY7wUyCBAAGIAEGKIESIArUJQIWLAOcAF4AZABAJgBxwGgAZwEqgEDMC4zuAEDyAEA-AEBmAIEoAKtBMICChAAGLADGNYEGEeYAwCIBgGQBgiSBwUxLjIuMaAH0gWyBwUwLjIuMbgHqATCBwUxLjEuMsgHCw&sclient=gws-wiz-serp&mstk=AUtExfDh0Z1yFI6HFO6FGMsOj7Q_R9Lr5oywlrq4eRElRNveSdBsEStiUeWGSw8Y9nDespU8KmG0P3kEGr_28ygj9f7R379MCyX7g1ILV_-fy-EOwD1Sei0VBo5a9GZNnWKzqOmPJhO1IoKyQXcEo04v75oHhbNXsYd85LL_0Eq50-7QesjAqpEqTxHpNJrf-PcLpi4-kKDQBJYj7mKKwr9PH3qyPbvx2y76cPW89LTHNH7ZB10uOBcstx56B0vf4N8vrIDPxZmG0lSTVcpISg-1zbKD&csui=3)/IMAP:** Protocolos para recebimento de e-mail.
- [**DHCP](https://www.google.com/search?q=DHCP&sca_esv=940aa337a8577638&sxsrf=AE3TifPnTvTWoZj2WD12rmWaBiNHfNEoAg%3A1764719170113&ei=QnovacXLBqzU1sQPrLr-wA0&ved=2ahUKEwihxciji6CRAxWMlJUCHU9YLI8QgK4QegQIBhAL&uact=5&oq=Camada+7+%28Aplica%C3%A7%C3%A3o%29+do+modelo+OSI&gs_lp=Egxnd3Mtd2l6LXNlcnAiJENhbWFkYSA3IChBcGxpY2HDp8OjbykgZG8gbW9kZWxvIE9TSTIGEAAYFhgeMggQABiABBiiBDIFEAAY7wUyCBAAGIAEGKIESIArUJQIWLAOcAF4AZABAJgBxwGgAZwEqgEDMC4zuAEDyAEA-AEBmAIEoAKtBMICChAAGLADGNYEGEeYAwCIBgGQBgiSBwUxLjIuMaAH0gWyBwUwLjIuMbgHqATCBwUxLjEuMsgHCw&sclient=gws-wiz-serp&mstk=AUtExfDh0Z1yFI6HFO6FGMsOj7Q_R9Lr5oywlrq4eRElRNveSdBsEStiUeWGSw8Y9nDespU8KmG0P3kEGr_28ygj9f7R379MCyX7g1ILV_-fy-EOwD1Sei0VBo5a9GZNnWKzqOmPJhO1IoKyQXcEo04v75oHhbNXsYd85LL_0Eq50-7QesjAqpEqTxHpNJrf-PcLpi4-kKDQBJYj7mKKwr9PH3qyPbvx2y76cPW89LTHNH7ZB10uOBcstx56B0vf4N8vrIDPxZmG0lSTVcpISg-1zbKD&csui=3):** Protocolo para configuração dinâmica de host.

### **Camada 6 — Camada de apresentação**

A camada de apresentação cuida de preparar os dados para a camada de aplicativo. Os dois dispositivos que estão se comunicando podem usar métodos diferentes de codificação de seus dados. A Camada 6, portanto, transforma os dados de entrada em algo que pode ser lido na camada do aplicativo. Isso inclui criptografar e descriptografar dados.

A camada de apresentação também comprime os dados que vêm da camada de aplicativo antes de enviá-los para a Camada 5, a camada de sessão.

### **Camada 5 — Camada de sessão**

A camada de sessão lida com a abertura e o fechamento das comunicações de rede entre dois dispositivos de interação. A “sessão” refere-se ao tempo entre a abertura e o fechamento da interação. A camada de sessão garante que a sessão esteja aberta por um período de tempo suficiente para que todos os dados necessários sejam enviados. Em seguida, a camada da sessão fecha a sessão para evitar gastar recursos desnecessários.

Além disso, ele sincroniza a transferência de dados. Se uma grande quantidade de dados estiver sendo enviada, a camada de sessão pode configurar pontos de verificação. Se a transmissão for interrompida antes que todos os dados sejam baixados, os pontos de verificação permitem que a transmissão seja reiniciada sem que ela comece novamente.

### **Camada 4 — Camada de transporte**

A camada de transporte lida com a comunicação de ponta a ponta entre os dispositivos que interagem entre si. O gerenciamento da comunicação envolve pegar os dados na camada de sessão e dividi-los em partes chamadas de segmentos. A camada de transporte no dispositivo que recebe a comunicação lida com a remontagem dos segmentos em dados que são consumíveis pela camada de sessão.

Além disso, a camada de transporte cuida do gerenciamento do fluxo e de quaisquer mensagens de erro necessárias que precisem ser enviadas caso algo dê errado. Para gerenciar o fluxo de dados, a camada de transporte garante que ela não esteja sendo enviada tão rapidamente que o dispositivo do receptor não possa lidar com ela. Para controlar erros, a camada de transporte verifica se os dados transmitidos foram feitos completamente. Caso contrário, essa camada solicitará uma retransmissão.

A camada 4 é onde funcionam os números de porta do protocolo de [**controle de transmissão (Transmission Control Protocol, TCP)**](https://www.fortinet.com/br/resources/cyberglossary/tcp-ip) e do protocolo de [**datagrama do usuário (User Datagram Protocol, UDP**](https://www.fortinet.com/br/resources/cyberglossary/user-datagram-protocol-udp)). Os endereços de protocolo de internet (IP) operam na Camada 3, a camada de rede. TCP, UDP e IP são protocolos que facilitam como os dados são enviados e recebidos.

### **Camada 3 — Camada de rede**

A camada de rede facilita a transferência de dados quando duas redes estão se comunicando entre si. Se dois dispositivos de comunicação estiverem usando a mesma rede, então não há necessidade da camada de rede. A camada de rede divide os segmentos que vêm da camada de transporte. Eles são chamados de pacotes. A divisão dos segmentos em pacotes acontece no dispositivo do remetente e eles são remontados no dispositivo receptor.

A camada de rede também funciona como uma ferramenta de eficiência. Ele descobre o caminho físico ideal necessário para levar os dados ao seu destino. Essa função é chamada de “roteamento”.

### **Camada 2 — Camada de link de dados**

A camada de link de dados é como a camada de rede, exceto que a camada de link de dados facilita a transferência de dados entre dois dispositivos usando a mesma rede. Na camada de link de dados, os pacotes são divididos em partes chamadas de frames. Semelhante à camada de rede, a camada de link de dados lida com controle de fluxo e erro. A camada de transporte é diferente porque só gerencia o fluxo de dados e erros quando duas redes estão se comunicando entre si.

Dentro da camada de link de dados, você tem duas subcamadas, as camadas de controle de acesso à mídia (MAC) e controle de link lógico (LLC). A maioria dos switches executa suas tarefas na Camada 2. Em alguns casos, os comutadores funcionam na Camada 3 porque estão facilitando a comunicação entre duas redes ou redes virtuais de área local (VLANs). Isso precisa acontecer na Camada 3 porque, nessas situações, os dados precisam ser roteados, o que é uma tarefa da Camada 3.

### **Camada 1 — Camada física**

A camada física envolve o equipamento físico que transfere dados, como switches e cabos. Nesta camada, os dados são convertidos em strings de 1s e 0s. Na camada física, os dispositivos precisam concordar com um método de distinção dos 1s dos 0s, o que permite que os dados digitais sejam interpretados adequadamente por cada dispositivo.

A camada física inclui uma variedade de componentes, como cabos, a frequência de rádio usada para transmitir dados, Wi-Fi e outras estruturas físicas para transmitir dados, como pinos, tensões necessárias e tipos de portas.

---

Source: [cloudflare.com](https://www.cloudflare.com/pt-br/learning/ddos/what-is-layer-7/)', 'geo', 'osi-open-systems-interconnection'),
  ('OSINT (Open Source Intelligence)', 'Utilizado por empresas de segurança/cibersegurança e agências de inteligência governamentais como **FBI, NSA, CIA, MI6, ABIN, CDCiber, Mossad, BND** e entre outras, o termo **OSINT** nada mais é do que a coleta, análise e processamento de informações.

Para aplicar-se o OSINT devemos obter **informações relevantes** em diversas fontes como:

- Internet: sites de busca, redes sociais, blogs, wikis, fóruns e até mesmo na Deep Web.
- Mídia: jornais, televisão, revistas e rádio.
- Informações públicas de fontes governamentais.
- Eventos, conferências, trabalhos e até bibliotecas.

OSINT pode ser usado em diversos meios de atuação como por exemplo: combate aos ataques terroristas, recrutamento, propriedade intelectual, e até mesmo por empresas de marketing.

Os processos principais na aplicação do OSINT (**Open Source Intelligence**) são: reconhecimento → fontes de informação → coleta de dados → processamento de dados → análise de dados → inteligência.

Todo esse processo de OSINT / Coleta de Informações é ainda mais detalhado em nossa Plataforma de [**Treinamentos de Cibersegurança**](https://hackersec.com/academy/).

# **Ferramentas / Métodos**

### Google Hacking / Google Dorks

É um método para buscar e coletar informações, você pode conhecer mais nesse nosso artigo: [**Usando Google Hacking para testes de invasão**](https://hackersec.com/usando-google-hacking-para-testes-de-invasao/)

### [OSINT Framework](https://osintframework.com/)

É um “mapa mental” que pode ajudar encontrar fontes para buscar informações.

### [Maltego](https://www.maltego.com/)

Uma ferramenta de coleta que pode ser encontrada já nos sistemas operacionais de Pentest, como Kali Linux e Parrot Security.

### [Shodan](https://www.shodan.io/)

Um buscador já muito utilizado por hackers por ter o poder de mostrar serviços como SSH, FTP, SNMP, Telnet, RTSP, IMAP também realizar capturar de banner.

### [Nmap](https://nmap.org/)

Utilizada tanto para o mapeando de rede como também para captura e análise de aplicações em um alvo.

### Nessus

Uma aplicação para avaliação, coleta e análise de segurança e vulnerabilidades em servidores, sistemas e aplicações.

### [OpenVAS](https://www.openvas.org/)

Semelhante ao Nessus, porém Open Source, também faz a avaliação, coleta e análise de segurança e vulnerabilidades

### Metagoofil

Ferramenta para extração de metadados de arquivos como: pdf, doc, ppt, xls e entre outros.

### [Libextractor](https://www.gnu.org/software/libextractor/)

É uma biblioteca Open Source para extração de metadados de arquivos.', 'res', 'osint-open-source-intelligence'),
  ('Offshores', 'Offshores são empresas ou contas registradas no exterior, ou rendimentos obtidos fora do Brasil. O termo vem do inglês e significa "afastado da costa".

## Empresas offshore

- Podem ser sociedades anônimas ou limitadas, ou entidades não personificadas, como fundos de investimento
- São constituídas em países ou territórios que oferecem vantagens fiscais e regulatórias
- Podem ser usadas para planejamento tributário, proteção de ativos, diversificação de investimentos, entre outros
- Podem ser usadas para lavagem de dinheiro e sonegação de impostos

## Rendimentos offshore

- São rendimentos obtidos fora do Brasil, por meio de aplicações financeiras ou empresas no exterior
- Devem ser informados na Declaração Anual de Imposto de Renda
- Valores acima de US$ 100 mil exigem o preenchimento do Censo de Capitais Brasileiros no Exterior (CBE)

## Tributação offshore

- O Brasil possui acordos de bitributação com diversos países, ajudando a evitar que o investidor pague imposto duplo
- Existem projetos de lei no Congresso Nacional para tributar as offshores', 'geo', 'offshores'),
  ('Operação Lava Jato', 'A **Operação Lava Jato** foi uma das maiores investigações de corrupção e lavagem de dinheiro da história do Brasil, que começou em **2014** e revelou um esquema de corrupção envolvendo **políticos**, **empresas estatais**, **empresas privadas**, e **executivos** de grandes empresas do país. A operação teve um impacto profundo na política e na economia brasileira, com repercussões internacionais.

Aqui estão os principais detalhes:

### 1. **O Início da Operação**

A Lava Jato teve início em março de 2014, com investigações de crimes relacionados a **lavagem de dinheiro** e **fraude em contratos** envolvendo a **Petrobras**, a maior empresa estatal brasileira. A investigação foi inicialmente desencadeada por uma denúncia de um **postodista** (ou doleiro) chamado **Alberto Youssef**, que estava sendo investigado por crimes de lavagem de dinheiro.

A operação revelou um esquema de corrupção envolvendo o pagamento de **propinas** a **políticos** e **executivos** da Petrobras em troca de contratos superfaturados. O dinheiro desviado era lavado por meio de **empresas fictícias**, [**offshores**](/glossary/offshores) e outros métodos para esconder a origem ilícita dos recursos.

### 2. **Principais Envolvidos**

A Lava Jato envolveu uma série de **investigações** que resultaram na prisão e julgamento de diversas figuras políticas e empresariais de alto escalão. Entre os nomes mais conhecidos que foram investigados ou processados estavam:

- **Luiz Inácio Lula da Silva** (ex-presidente do Brasil): Lula foi condenado e preso em 2017 por envolvimento em corrupção e lavagem de dinheiro. A condenação gerou grande controvérsia, com apoio de muitos e críticas de outros, que alegavam que o processo judicial foi politizado.
- **Dilma Rousseff** (ex-presidente do Brasil): Embora Dilma não tenha sido diretamente implicada, seu governo foi acusado de ser conivente com os esquemas de corrupção que aconteceram durante seu mandato.
- **Sérgio Moro**: O juiz federal que conduziu muitos dos processos da Lava Jato e ganhou notoriedade internacional por sua atuação. Mais tarde, Moro foi nomeado ministro da Justiça no governo de Jair Bolsonaro, o que gerou discussões sobre a imparcialidade da operação.
- **Empresários e executivos de grandes empresas**: Como o ex-presidente da **Odebrecht**, **Marcelo Odebrecht**, que foi preso e condenado. A empresa foi uma das mais envolvidas no esquema de corrupção.

### 3. **O Esquema de Corrupção**

O esquema de corrupção funcionava da seguinte maneira:

- **Políticos e empresas públicas** (como a Petrobras) firmavam contratos superfaturados com **empresas privadas** (muitas vezes, grandes empreiteiras), que, por sua vez, pagavam **propinas** a políticos, partidos e executivos em troca da aprovação e execução desses contratos.
- O dinheiro das propinas era então **lavado** através de um complexo sistema de **empresas intermediárias**, **contas bancárias no exterior** e **lavo de dinheiro** em setores como o de **construção civil** e **energia**.

### 4. **Consequências**

- **Condenações e Prisões**: Muitos políticos e empresários foram **condenados** e **presos**, o que resultou em uma ampla **operação judicial** no Brasil e em outros países, como **Suíça**, **Estados Unidos** e **Portugal**, que investigaram a lavagem de dinheiro e os fluxos financeiros internacionais.
- **Desgaste Político**: A Lava Jato teve um grande impacto político, especialmente nas eleições de 2018, quando a operação foi vista por alguns como um fator importante na **derrota** do PT e na **ascensão** de Jair Bolsonaro.
- **Impacto Econômico**: A operação teve consequências econômicas significativas, incluindo a desaceleração de grandes projetos de infraestrutura e a queda de ações de empresas envolvidas no escândalo, como a Petrobras e as grandes empreiteiras.

### 5. **Controvérsias**

- A Lava Jato gerou intensos debates no Brasil sobre sua **legitimidade** e se a operação foi ou não politicamente motivada. Algumas críticas apontaram que a operação teria sido usada para enfraquecer o governo do Partido dos Trabalhadores (PT) e garantir a eleição de um novo presidente (Bolsonaro).
- A **imparcialidade** de alguns dos juízes envolvidos foi questionada, especialmente após o vazamento de mensagens que sugeriam que o juiz **Sérgio Moro** teria agido de forma parcial para favorecer o ex-presidente **Michel Temer**.

### 6. **Fim da Operação**

Em 2021, a operação foi oficialmente encerrada. Algumas investigações e processos continuaram, mas a Lava Jato perdeu força devido a uma série de decisões judiciais e mudanças na direção das investigações.

### Conclusão

A **Operação Lava Jato** foi um marco na história do Brasil, revelando um grande esquema de corrupção envolvendo empresas estatais e privados. Enquanto foi vista por muitos como um avanço no combate à corrupção, também foi criticada por sua abordagem, por possíveis excessos e pela politização dos processos. Seu legado é controverso, com profundas repercussões políticas e sociais no Brasil.', 'geo', 'operacao-lava-jato'),
  ('Organização do Tratado do Atlântico Norte (OTAN)', 'A OTAN – Organização do Tratado do Atlântico Norte é uma aliança militar e política internacional criada em 4 de abril de 1949, no contexto da Guerra Fria.

**O que é a OTAN**

- **Objetivo principal:** Garantir a defesa mútua e a segurança dos países-membros por meio de cooperação política e militar.
- **Defesa coletiva:** O Artigo 5º do tratado estabelece que um ataque armado contra um dos integrantes é considerado um ataque contra todos.
- **Sede:** Fica localizada em Bruxelas, na Bélgica.

**Países Membros**

A aliança conta atualmente com **32 países** da América do Norte e da Europa. Entre eles estão:

- Estados Unidos, Canadá e Reino UnidoFrança, Alemanha, Itália e Espanha;
- Finlândia e Suécia (os membros mais recentes).

---

Source: [brasilescola.uol.com.br](https://brasilescola.uol.com.br/geografia/otan.htm)', 'geo', 'organizacao-do-tratado-do-atlantico-norte-otan'),
  ('Organização dos Estados Americanos (OEA)', 'A Organização dos Estados Americanos (OEA) [é o principal fórum político de diálogo multilateral do hemisfério ocidental](https://www2.camara.leg.br/atividade-legislativa/comissoes/comissoes-mistas/cpcms/siglas/oea.html#:~:text=Congrega%20os%20pa%C3%ADses,concertada%20na%20regi%C3%A3o.), fundada em 30 de abril de 1948 com sede em Washington, D.C., Estados Unidos.

**O que é e Objetivos**

- **Formação**: Reúne 35 Estados independentes do continente americano.
- **Missão**: Assegurar a paz, promover a democracia, garantir a segurança e defender os direitos humanos.
- **Pilares**: Apoia-se em quatro eixos principais: democracia, direitos humanos, segurança multidimensional e desenvolvimento integral.

**Estrutura Principal**

- **Assembleia Geral**: Órgão supremo que define as políticas gerais da entidade.
- [**CIDH (Comissão Interamericana de Direitos Humanos)**](Comiss%C3%A3o%20Interamericana%20de%20Direitos%20Humanos%20(CIDH)%203dd0c519cad4804ba5fdefd65ab42b09.md): Órgão autônomo encarregado de observar, promover e defender os direitos humanos na região.

---

Source: [oas.org](https://www.oas.org/pt/)', 'geo', 'organizacao-dos-estados-americanos-oea'),
  ('Organização para a Libertação da Palestina', 'A Organização para a Libertação da Palestina **é uma organização política e paramilitar criada com o objetivo de liderar a luta dos palestinos pela formação de um Estado nacional**. É essa organização que representa os interesses do povo palestino a nível internacional, sendo inclusive observador da Organização das Nações Unidas. É tida pela Liga Árabe desde outubro de 1964 como a *“única representante legítima do povo palestino”.*

Fundação: 28 de maio de 1964, Jerusalém

Fundadores: [Liga Árabe](https://www.google.com/search?sa=X&sca_esv=08aa480cc1483e6a&biw=1621&bih=904&sxsrf=ADLYWIJW6bjTzciZrj5IxPq3C7bDkcCnpg:1721084808714&q=Liga+%C3%81rabe&si=ACC90nyvvWro6QmnyY1IfSdgk5wwjB1r8BGd_IWRjXqmKPQqmyXVfFZitF_ABSkTo6o7QM617hIdZkbOwFmKlaFcehLWhTviE6olbXD5qGe8jSiH00Fjwt99OJPhCrqAdgZMSuIVQ955GqrFLpvbkN5SSFWejIqFkspNHM3HFayD6MXYdb3FQ37BIe1vqPPsQ4BO0Plt_6zFayFCKlrKYnqIJ-YG1ZBJpF16Zcsx7gvspLDJrJkC0sJcnphCH-U5YDrw-6lDrzNz&ved=2ahUKEwi6ipvFlKqHAxUSqJUCHSR8DSMQmxMoAHoECDIQAg), [Ahmed Shukairi](https://www.google.com/search?sa=X&sca_esv=08aa480cc1483e6a&biw=1621&bih=904&sxsrf=ADLYWIJW6bjTzciZrj5IxPq3C7bDkcCnpg:1721084808714&q=Ahmed+Shukairi&si=ACC90nzx_D3_zUKRnpAjmO0UBLNxnt7EyN4YYdru6U3bxLI-L4NPvp9gae3cXvucz_gIot2pLjXjz2vdM1xC7EyyV9CmPPLWgfNfbhvdoBjZVAZcaNCkSO6WiRQvDboEC_QhPA2OIGxOBcHjevbVUr3MfFx5wwotwkn5najwthok_6Ms4eujhxA2dWof22ubbdi7TK4Zavb7xTavT8mjau5Z6-EDOgL7EhqFWMafQ861PQcSnOQgf4O8zPX_vrjfyfD5Uaz4Za9OPJJTQwD4Z2MvFKcZRfifvQ%3D%3D&ved=2ahUKEwi6ipvFlKqHAxUSqJUCHSR8DSMQmxMoAXoECDIQAw)', 'geo', 'organizacao-para-a-libertacao-da-palestina'),
  ('Othering', 'Is a process that denies the humanity of targeted individuals, and promotes inequality, discrimination, and persecution.

# **Othering can be divided into two steps**

- Categorizing a group of people according to perceived differences, such as ethnic origin, skin colour, religion, gender, or sexual orientation;
- Identifying this group of people as inferior and adopting an “us vs. them” mentality in order to isolate them.

Othering does not only mean grouping individuals according to the traits that distinguish them, like differentiating Christians from Muslims or francophones from anglophones. Rather, it presents the identified group as intrinsically different than and inferior to “our” group, to “us”.

At this point, the individuals being othered are not perceived as having their own characteristics, ideas, backgrounds or desires, but are instead seen only as members of “their” group, as “Other”.

**Othering is therefore a process that denies the humanity of targeted individuals, and promotes inequality, discrimination, and persecution.**

The term “othering” is more commonly used in English, where it literally means to “make other”. The relational dynamics can more easily be understood when considering the concept of othering in contrast with belonging. Those who are othered are seen as not *belonging* to “us”. The ways in which identity is defined, and who “us” or “we” represent, is therefore central to the process of othering.

---

Source: [museeholocauste.ca](https://museeholocauste.ca/en/resources-training/the-process-of-othering)', 'geo', 'othering'),
  ('Pan-americanismo', 'O pan-americanismo é um movimento político e ideológico que defende a integração, a cooperação e a solidariedade entre os países do continente americano.

**Origens com Simón Bolívar**

- **Ideal de união:** A ideia original surgiu no século XIX com [**Simón Bolívar**](https://pt.wikipedia.org/wiki/Sim%C3%B3n_Bol%C3%ADvar).
- [**Congresso do Panamá (1826)](Congresso%20do%20Panam%C3%A1%20(1826)%203dd0c519cad480748cdef10d35919916.md):** Bolívar convocou o congresso para tentar unificar a América hispânica independente em uma confederação de defesa comum.
- **Fracasso inicial:** O projeto de um Estado único não deu certo devido a rivalidades locais e à oposição de interesses externos.

**Releitura pelos Estados Unidos**

- **Liderança norte-americana:** No final do século XIX, os **Estados Unidos** passaram a liderar o movimento.
- **Interesse comercial:** O secretário de Estado James Blaine promoveu encontros para estimular o comércio e ampliar a influência americana na região.
- **Conferências Pan-Americanas:** Foram criados fóruns de debate diplomático e cooperação sob forte influência da política externa dos Estados Unidos.

---

Source: [studhistoria.com.br](https://studhistoria.com.br/qq-isso/pan-americanismo/)', 'geo', 'pan-americanismo'),
  ('Pan-arabismo', 'O pan-arabismo é um movimento político e cultural que defende a união de todos os povos e países de língua e cultura árabe em uma única nação ou grande comunidade.

**O que é o movimento**

- **Defesa da unidade:** Baseia-se na ideia de que os árabes formam um só povo, unidos por idioma, história, cultura e laços sociais comuns.
- **Origem e evolução:** Começou a se formar no final do século XIX e início do século XX, ganhando força com o fim do Império Otomano e a luta contra o domínio colonial europeu.
- **Liderança marcante:** O presidente egípcio **Gamal Abdel Nasser** foi o principal expoente do pan-arabismo em meados do século XX, promovendo o anti-imperialismo e a soberania dos Estados árabes.
- **Principais ideias:** Caracteriza-se por preceitos nacionalistas, seculares (separação entre Estado e religião) e de forte oposição à interferência ocidental no Oriente Médio e no Norte da África.

---

Source: [pt.wikipedia.org](https://pt.wikipedia.org/wiki/Pan-arabismo)', 'geo', 'pan-arabismo'),
  ('Países bálticos', 'Países Bálticos ou Estados Bálticos é uma região a **nordeste da Europa**, limita-se a leste do mar Báltico, onde estão localizados os Estados modernos da **Estônia, Letônia e Lituânia**.

![Países bálticos](/glossary/paises-balticos-1.webp)', 'geo', 'paises-balticos'),
  ('Pen Register / Trap-and-Trace (PRTT)', 'É um tipo de **ordem judicial e técnica de vigilância**, originalmente usada em sistemas telefônicos e depois adaptada para algumas comunicações eletrônicas, especialmente nos Estados Unidos.

Em termos simples:

- **Pen Register (PR)** registra os **números ou endereços de destino** que um dispositivo contata (por exemplo, números discados ou, em certos contextos, informações de roteamento de comunicações eletrônicas).
- **Trap and Trace (TT)** registra os **números ou endereços de origem** das comunicações recebidas.

O ponto importante é que:

- Ele **não captura o conteúdo** da comunicação (como mensagens ou áudio).
- Ele registra apenas informações de **endereçamento e roteamento** (metadados), como quem contatou quem e quando, conforme permitido pela legislação aplicável.

Em investigações envolvendo a internet, uma ordem de Pen Register/Trap and Trace pode autorizar a coleta de certos metadados relacionados às comunicações eletrônicas, mas **não é um sistema mágico de localizar qualquer IP** nem algo que qualquer pessoa possa usar. É um mecanismo legal utilizado por autoridades, geralmente com autorização judicial ou conforme a lei do país.', 'geo', 'pen-register-trap-and-trace-prtt'),
  ('Phishing', 'Phishing é um tipo de golpe cibernético em que criminosos tentam enganar pessoas para obter informações confidenciais, como senhas, dados de cartão de crédito e informações bancárias, fingindo ser uma entidade confiável por meio de e-mails, mensagens ou sites falsos. Os atacantes usam essas informações para roubar dinheiro ou identidade, muitas vezes enviando mensagens com links suspeitos ou anexos que instalam malwares.

**Como funciona**

- **Engenharia social:** Os criminosos enviam e-mails ou mensagens que parecem ser de empresas legítimas (como bancos, Correios ou lojas) para criar um senso de urgência e levar a vítima a agir.
- **Links e anexos maliciosos:** Os golpes podem direcionar a vítima a um site falso que imita a página oficial de uma empresa, ou podem conter arquivos maliciosos que, ao serem abertos, roubam dados do dispositivo.
- **Ofertas falsas:** Promessas de prêmios, descontos incríveis ou problemas urgentes na conta são táticas comuns para atrair a vítima.

**Como se proteger**

- **Desconfie de e-mails e mensagens:** Não clique em links ou baixe anexos de remetentes desconhecidos. Verifique o endereço de e-mail do remetente em busca de erros de ortografia, números ou abreviações incomuns.
- **Acesse sites diretamente:** Se uma mensagem pedir para verificar sua conta, vá diretamente ao site oficial da empresa digitando o endereço no navegador em vez de clicar no link.
- **Procure o "s" em HTTPS:** Ao inserir informações confidenciais, verifique se o URL da página começa com "https://" em vez de apenas "http://".
- **Não forneça informações confidenciais:** Nunca insira dados pessoais ou financeiros em resposta a um e-mail ou mensagem suspeita.
- **Use autenticação de dois fatores (2FA):** Habilite a autenticação de dois fatores sempre que possível. Isso adiciona uma camada extra de segurança, mesmo que sua senha seja comprometida.
- **Entre em contato pelo canal oficial:** Se tiver dúvidas sobre uma mensagem, entre em contato com a empresa por telefone ou através do site oficial para confirmar a veracidade.', 'geo', 'phishing'),
  ('Plano Marshall', 'O Plano Marshall (conhecido oficialmente como Programa de Recuperação Europeia) foi o principal plano dos Estados Unidos para a reconstrução dos países aliados da Europa nos anos seguintes à Segunda Guerra Mundial. A iniciativa recebeu o nome do Secretário de Estado dos Estados Unidos, George Marshall.', 'geo', 'plano-marshall'),
  ('Politiets Online Patrulje', 'A Polícia da Dinamarca criou uma unidade especializada para atuar diretamente no ambiente digital, usando jogos online como ferramenta de investigação e prevenção de crimes. Conhecida como Politiets Online Patrulje (Patrulha Online da Polícia), a equipe passa boa parte do dia conectada a jogos populares entre jovens, como Counter-Strike, Fortnite e Minecraft, além de plataformas como Discord e redes sociais.

O objetivo vai além do entretenimento. Os agentes utilizam os jogos e chats para identificar comportamentos suspeitos, receber denúncias, prevenir crimes digitais e combater práticas como aliciamento, fraudes, discurso de ódio e abuso online. Ao se inserir nos mesmos ambientes frequentados por potenciais vítimas e suspeitos, a polícia consegue agir de forma preventiva e estabelecer canais diretos de comunicação com a comunidade.

Segundo reportagens internacionais, a estratégia também busca criar confiança, principalmente com o público jovem, que muitas vezes evita procurar canais oficiais. A presença policial nos jogos funciona como uma extensão da patrulha tradicional, adaptada à realidade digital, mostrando como a investigação criminal tem se reinventado para acompanhar a evolução da internet e das interações virtuais.

---

Source: [politi.dk](https://politi.dk/om-politiet/virksomheden/politiets-online-patrulje)', 'res', 'politiets-online-patrulje'),
  ('Política Nacional de Cibersegurança (PNCiber)', 'A Política Nacional de Cibersegurança (**PNCiber**), instituída pelo [**Decreto nº 11.856**](https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2023/decreto/D11856.htm) em 26 de dezembro de 2023, é a diretriz oficial do governo brasileiro para orientar a segurança digital e a proteção de dados no país.

**O que é a PNCiber?**

A **PNCiber** funciona como um guia para blindar sistemas digitais públicos e privados contra ameaças virtuais. Ela também criou o Comitê Nacional de Cibersegurança (**CNCiber**), que ajuda a debater e propor melhorias para o setor.

**Principais Objetivos**

- **Tecnologia nacional:** Incentivar o uso e a criação de produtos e serviços de segurança feitos no Brasil.
- **Proteção de serviços:** Defender infraestruturas essenciais, como energia, saúde e transporte, contra ataques cibernéticos.
- **Combate a crimes:** Reduzir delitos virtuais e punir ações maliciosas na internet.
- **Educação digital:** Capacitar a população e conscientizar grupos mais vulneráveis, como crianças e idosos.

**Princípios Básicos**

- **Soberania:** Defender os interesses do Brasil no ambiente digital.
- **Direitos fundamentais:** Proteger a privacidade, a liberdade de expressão e a LGPD (Lei Geral de Proteção de Dados).
- **Prevenção:** Agir antes que ataques ocorram para evitar quedas em sistemas críticos.

---

Source: [gov.br](https://www.gov.br/anatel/pt-br/assuntos/seguranca-cibernetica/politicas-publicas)', 'geo', 'politica-nacional-de-ciberseguranca-pnciber'),
  ('Povo han', '**Han** (em chinês simplificado: 汉, pinyin: hàn) é o maior grupo étnico da China (e de todo o mundo), representando quase 92% da população chinesa, ou seja, mais de 1,24 bilhão de pessoas (cerca de 18% da população mundial, equivalente à população da Índia).

---

Source: [pt.wikipedia.org](https://pt.wikipedia.org/wiki/Han_(etnia))', 'zei', 'povo-han'),
  ('Primavera Árabe', 'Primavera Árabe (em árabe: الربيع العربي , transliterado - ar-rabīˁ al-ˁarabī), como é conhecida mundialmente, foi uma onda revolucionária de manifestações e protestos que ocorreram no Oriente Médio e no Norte da África a partir de 18 de dezembro de 2010.

Houve revoluções na Tunísia e no Egito, uma guerra civil na Líbia e na Síria; também ocorreram grandes protestos na Argélia, Bahrein, Djibuti, Iraque, Jordânia, Omã e Iémen e protestos menores no Kuwait, Líbano, Mauritânia, Marrocos, Arábia Saudita, Sudão e Saara Ocidental. Os protestos compartilharam técnicas de resistência civil em campanhas sustentadas envolvendo greves, manifestações, passeatas e comícios, bem como o uso das mídias sociais, como Facebook, Twitter e YouTube, para organizar, comunicar e sensibilizar a população e a comunidade internacional em face de tentativas de repressão e censura na Internet por partes dos Estados.

---

Source: [pt.wikipedia.org](https://pt.wikipedia.org/wiki/Primavera_%C3%81rabe)', 'geo', 'primavera-arabe'),
  ('Proxy War (Guerra por Procuração)', 'Uma guerra por procuração é um conflito armado em que países grandes usam terceiros, como grupos ou nações menores, para lutar em seu lugar, evitando um confronto direto entre si.

**Como Funciona**

- **Intermediários:** potências usam rebeldes, milícias ou governos aliados chamados de *proxies*.
- **Apoio externo:** o país patrocinador envia armas, dinheiro e treinamento militar, mas não seus próprios soldados para a linha de frente principal.
- **Prevenção de escalada:** o objetivo principal é evitar uma guerra total ou nuclear entre superpotências.

**Exemplos Históricos**

- **Guerra Fria:** EUA e União Soviética lutaram indiretamente em lugares como Coreia, Vietnã e Afeganistão.
- **Conflitos modernos:** especialistas apontam dinâmicas de guerra por procuração em cenários como a Guerra na Ucrânia e a Guerra Civil na Síria.

---

Source: [britannica.com](https://www.britannica.com/topic/proxy-war)', 'geo', 'proxy-war-guerra-por-procuracao'),
  ('Ransomware', 'Ransomware é um tipo de [malware](/glossary/malware) (software malicioso) que criptografa arquivos ou bloqueia o acesso a um sistema, exigindo o pagamento de um resgate para restaurar o acesso. Os ataques de ransomware podem causar danos financeiros e operacionais significativos, e a ameaça evoluiu para incluir roubo de dados (extorsão dupla) e ameaças de expor esses dados.

### **Como funciona**

- **Infecção:** Ocorre através de e-mails de phishing, sites maliciosos, downloads de fontes não confiáveis ou outras vulnerabilidades de segurança.
- **Criptografia ou Bloqueio:** Uma vez instalado, o malware criptografa os arquivos da vítima ou impede o acesso ao dispositivo.
- **Extorsão:** Os criminosos exibem uma mensagem com a exigência de resgate, geralmente em criptomoedas como Bitcoin, para liberar os dados.
- **Evolução:** Ataques mais recentes frequentemente incluem a ameaça de vazar dados roubados, uma tática conhecida como extorsão dupla ou tripla.

### **Como se proteger**

- **Backups:** Faça cópias de segurança regulares e armazene-as em um local separado ([offline](https://www.google.com/search?q=offline&oq=Ransomware&gs_lcrp=EgZjaHJvbWUyDAgAEEUYORixAxiABDIMCAEQABhDGIAEGIoFMgwIAhAAGEMYgAQYigUyDAgDEAAYQxiABBiKBTIMCAQQABgUGIcCGIAEMgwIBRAAGEMYgAQYigUyBwgGEAAYgAQyBwgHEAAYgAQyBwgIEAAYgAQyBwgJEAAYgATSAQc0NDJqMGo5qAIGsAIB8QUzAIEr-SQjlw&sourceid=chrome&ie=UTF-8&mstk=AUtExfAJ8-CqxvnbuCHggLqsYZBQmMApj6Sl0oy8bSA94ZCzDFDGjVju7F7PDygsm2nR0qGLN9nYIT9brwbBWiEG3jVVlPUNc5dAuSj0p7K-5MJ3WkfycgIk0v8e5DsRMwbmC7zkB190czXKfrBvwaiJSgqK38v172d_aYmX46-kvzmfJ7xLsM9Eje8dB6q8y6F7DePf7zoNfST_MZkCAQQhxjACL9G4U6icsBUQ-5HHNMPHKPO-DtfkiAxkTmLXumCA-E62HNStEkKbD_35BhjhVzm7&csui=3&ved=2ahUKEwjGspLZjKCRAxXSr5UCHXOgMJUQgK4QegQIBRAC) ou em nuvem).
- **Software de segurança:** Instale e mantenha atualizados softwares antivírus e anti-ransomware, e um firewall.
- **Cuidado com e-mails e links:** Não clique em links suspeitos ou abra anexos de remetentes desconhecidos.
- **Fontes confiáveis:** Baixe software e aplicativos apenas de fontes oficiais e confiáveis, como a Google Play Store ou a Apple App Store.
- **Atualizações:** Mantenha todos os programas e o sistema operacional atualizados para corrigir vulnerabilidades de segurança.
- **Redes Wi-Fi:** Evite usar redes Wi-Fi públicas para transações sensíveis e utilize uma VPN se necessário.

### **O que fazer em caso de ataque**

- **Não pague o resgate:** A maioria dos especialistas e autoridades de segurança aconselha não pagar, pois não há garantia de que os dados serão restaurados e isso incentiva o crime.
- **Reportar o incidente:** Denuncie o ataque às autoridades policiais.', 'geo', 'ransomware'),
  ('Rede Federal de Gestão de Incidentes Cibernéticos (ReGIC)', 'A **Rede Federal de Gestão de Incidentes Cibernéticos (ReGIC)** **foi instituída pelo [Decreto nº 10.748](https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2021/decreto/d10748.htm) para prevenir, tratar e responder a ameaças virtuais nos órgãos da administração pública federal**.

**O que é a ReGIC**

- **Objetivo:** Aumentar a segurança dos dados e das redes do governo federal contra ataques cibernéticos.
- **Coordenação:** É coordenada pelo Departamento de Segurança da Informação do Gabinete de Segurança Institucional (GSI) da Presidência da República.
- **Atuação técnica:** O CTIR Gov (Centro de Prevenção, Tratamento e Resposta a Incidentes Cibernéticos de Governo) atua como o braço operacional central da rede.

**Quem faz parte**

- Órgãos e entidades da administração pública federal direta, autárquica e fundacional.
- Empresas públicas e sociedades de economia mista que aderirem formalmente à rede.
- Equipes setoriais de defesa e centros integrados de segurança digital associados.

---

Source: [gov.br](https://www.gov.br/ctir/pt-br/assuntos/rede-federal-de-gestao-de-incidentes-ciberneticos-regic/)', 'geo', 'rede-federal-de-gestao-de-incidentes-ciberneticos-regic'),
  ('Regime de Controle de Tecnologia de Mísseis – MTCR (1987)', 'O MTCR (Regime de Controle de Tecnologia de Mísseis) é um acordo político informal criado em abril de 1987 pelos países do [G7](G7%20(Grupo%20dos%20Sete)%2020a0c519cad4806d8c0fe1f2924bb90a.md) para conter a proliferação de mísseis e tecnologias de veículos não tripulados.

![Regime de Controle de Tecnologia de Mísseis – MTCR (1987)](/glossary/regime-de-controle-de-tecnologia-de-misseis-mtcr-1987-1.webp)

**O que é o MTCR?**

- **Natureza:** não é um tratado internacional jurídico vinculativo, mas sim um entendimento político voluntário entre os países parceiros.
- **Fundação:** estabelecido em 1987 por Alemanha, Canadá, Estados Unidos, França, Itália, Japão e Reino Unido (G7).
- **Membros:** atualmente conta com 35 países participantes.

**Objetivos Principais**

- **Armas de Destruição em Massa (ADM):** limitar os riscos de proliferação de armas nucleares, químicas e biológicas.
- **Sistemas de Entrega:** controlar a exportação de foguetes, mísseis e veículos aéreos não tripulados (drones).
- **Critério de Alcance e Carga:** foca em sistemas capazes de transportar uma carga útil de pelo menos **500 kg** a uma distância de pelo menos **300 km**.

---

Source: [mtcr.info](https://www.mtcr.info)', 'geo', 'regime-de-controle-de-tecnologia-de-misseis-mtcr-1987'),
  ('Rivest-Shamir-Adleman (RSA)', 'O RSA é um algoritmo de **criptografia assimétrica** (ou de chave pública). Ele baseia-se numa propriedade matemática muito específica: **a assimetria da multiplicação de números primos gigantes**.

É muito fácil para um computador pegar em dois números primos enormes (ex: com mais de 300 dígitos) e multiplicá-los.

No entanto, se o computador receber apenas o resultado final dessa multiplicação, é extremamente difícil e demorado (levaria milhões de anos) descobrir quais foram os dois números primos originais que geraram aquele resultado.

A **Chave Pública** é gerada a partir do resultado da multiplicação. A **Chave Privada** é gerada a partir dos números primos originais escondidos.

---

## Intersecção com Relações Internacionais & Soberania

No campo das Relações Internacionais e da geopolítica cibernética, o controle de algoritmos como o RSA e a criptografia forte são considerados **armas de defesa estratégica**.

- **Antivigilância e Dissidência Política:** O RSA permite que ativistas, refugiados e jornalistas comuniquem em canais seguros sem que estados autoritários consigam fazer vigilância em massa. Sem a chave privada, mesmo que o governo intercepte os pacotes de dados na infraestrutura de rede, o conteúdo é apenas ruído ilegível.
- **Criptoanarquismo vs. Controlo Estatal:** Historicamente, o governo dos EUA tentou classificar a criptografia forte (como o RSA) como "munição militar" nos anos 90, tentando proibir a sua exportação para fora do país (um evento histórico conhecido como *Crypto Wars*). O argumento era de que o Estado perderia a capacidade de espionagem digital.

---

Imagine que você e seu herdeiro no Brasil querem trocar caixas com cartas secretas pelo correio, mas vocês têm medo de que algum carteiro curioso abra a caixa no caminho para ler o que está escrito.

Para resolver isso, vocês usam o sistema **RSA**, que funciona usando **dois tipos de chaves mágicas**: a **Chave Pública** e a **Chave Privada**.

Funciona exatamente assim:

### 1. A Chave Pública (O Cadeado Aberto)

O seu parente no Brasil fabrica milhares de **cadeados coloridos** e deixa todos eles abertos em uma caixinha na calçada para qualquer pessoa pegar. Todo mundo pode ver e pegar esses cadeados. Isso é a **Chave Pública**.

Quando você quer enviar uma foto antiga do Líbano para ele, você coloca a foto dentro de uma caixa de ferro, pega um daqueles cadeados abertos dele que estavam na calçada, coloca na caixa e **tranca**.

Depois que você trancou o cadeado, **nem você consegue abrir de novo**, porque você não tem a chave dele. A caixa agora está super segura e pronta para viajar pelo correio.

### 2. A Chave Privada (A Chave Secreta)

Quando a caixa trancada chega no Brasil, o seu parente usa uma **chave secreta de metal** que ele guarda escondida no bolso e que ninguém mais no mundo tem. Essa é a **Chave Privada**.

Só essa chave do bolso dele consegue abrir aquele cadeado específico. Ele coloca a chave, abre a caixa e lê a sua carta.

### Por que esse sistema é tão genial?

Se um espião ou um carteiro malvado interceptar a caixa no meio do caminho, ele vai ver um cadeado super pesado e trancado. Mesmo que ele vá até a calçada no Brasil e pegue um daqueles cadeados abertos (a Chave Pública), isso não ajuda em nada, porque **o cadeado aberto só serve para trancar, não para abrir**.

Para descobrir o segredo, o espião precisaria da chave que está no bolso do seu parente (a Chave Privada). E na matemática do computador, descobrir o desenho dessa chave do bolso olhando só para o cadeado da calçada é tão difícil que demoraria milhões de anos para alguém conseguir chutar o resultado.', 'res', 'rivest-shamir-adleman-rsa'),
  ('Rota da Seda (Silk Road)', 'A Rota da Seda foi uma antiga e vasta rede de caminhos terrestres e marítimos que ligava a China à Europa e ao Oriente Médio.

![Rota da Seda (Silk Road)](/glossary/rota-da-seda-silk-road-1.webp)

**O que foi e origem**

- **Rede de conexões:** Não era apenas uma estrada única, mas um conjunto de rotas comerciais.
- **Nome:** O termo foi criado no século XIX pelo geógrafo alemão Ferdinand von Richthofen, inspirado na seda, produto valioso fabricado exclusivamente pelos chineses por muito tempo.
- **Início:** A rede começou a se consolidar por volta do século II a.C., impulsionada pela dinastia Han na China.

**Importância e Trocas**

- **Produtos:** Além da seda, circulavam chá, porcelana, especiarias, ouro e pólvora.
- **Cultura e Religião:** Facilitou a propagação de ideias, tecnologias e crenças, como a expansão do budismo da Índia para o restante da Ásia.
- **Consequências:** Também serviu como via para a transmissão de doenças graves, a exemplo da Peste Negra no século XIV.

**Declínio e Atualidade**

- **Declínio:** Perdeu força no final da Idade Média e início da Moderna com o bloqueio de rotas pelo Império Otomano e o início das Grandes Navegações marítimas europeias.
- **Nova Rota da Seda:** Em 2013, o governo chinês lançou a iniciativa **Cinturão e Rota** para investir em infraestrutura global e reconectar a Ásia, Europa e África.

---

Source: [unesco.org](https://www.unesco.org/en/silk-roads/about-silk-roads)', 'geo', 'rota-da-seda-silk-road'),
  ('Réngōng Zhìnéng 人工智能 (Inteligência Artificial) Dinasty', 'O termo *“The Réngōng Zhìnéng Dynasty”* (A Dinastia de Inteligência Artificial) é o nome dado ao cenário catastrófico futurista apresentado pela futurista Amy Webb em seu livro de 2019, *The Big Nine: How the Tech Titans and Their Thinking Machines Could Warp Humanity*.

Nesse cenário geopolítico e tecnológico hipotético, “Réngōng Zhìnéng” (人工智能) — que significa literalmente **Inteligência Artificial em mandarim** — torna-se a base de um império digital global liderado pela China.

**O Cenário de Acordo com o Livro**

Amy Webb divide o futuro do desenvolvimento da IA em três cenários (o otimista, o pragmático e o catastrófico). A “Dinastia Réngōng Zhìnéng” detalha a pior das hipóteses:

- **Inércia do Ocidente:** o governo dos Estados Unidos e outras democracias falham em criar uma estratégia nacional unificada de longo prazo para a IA. Em vez de financiarem pesquisas básicas de segurança e ética, eles terceirizam o desenvolvimento para as forças do mercado de Wall Street.
- **Ascensão Absoluta da China:** aproveitando-se dessa distração, o governo chinês executa seu plano de se tornar a superpotência global em IA. A fusão entre o Estado e suas gigantes de tecnologia (Baidu, Alibaba e Tencent) cria um ecossistema indissociável.
- **Sistema de Castas Tecnológicas:** o viés algorítmico não é mitigado, resultando em um sistema global de controle social baseado em crédito e pontuação comportamental.
- **Aniquilação Digital:** conforme os recursos globais diminuem devido às mudanças climáticas, a China consolida o controle total sobre as infraestruturas físicas e digitais do Ocidente. O resultado é uma dinastia tecnológica brutal, absoluta e irreversível.

O conceito serve como um sinal de alerta sobre a necessidade urgente de cooperação global, financiamento público de pesquisa de base e regulamentações éticas que priorizem o bem-estar humano frente ao avanço da superinteligência artificial.', 'geo', 'rengong-zhineng-inteligencia-artificial-dinasty'),
  ('SQLi', 'Ataques de injeção de SQL (SQLi) ocorrem quando um invasor insere código SQL malicioso em entradas de usuário que uma aplicação web constrói, permitindo-lhes executar comandos no banco de dados.

As consequências variam desde a falsificação de identidade e manipulação de dados até a negação de serviço ou o comprometimento total do sistema, como a divulgação de dados confidenciais, a exclusão de informações ou a obtenção de acesso administrativo.

### **Como funciona**

- **Consulta SQL:** Uma aplicação web pode ter uma consulta simples como `SELECT id, nome FROM usuarios WHERE nome = ''[entrada_do_usuario]''`.
- **Entrada do usuário:** Quando um usuário digita, por exemplo, "jose", a consulta se torna `SELECT id, nome FROM usuarios WHERE nome = ''jose''`.
- **Injeção:** Um invasor pode inserir um código SQL malicioso na entrada, como `'' OR ''1''=''1`. A consulta final se torna `SELECT id, nome FROM usuarios WHERE nome = '''' OR ''1''=''1''`, o que retorna todos os usuários da tabela, ignorando o filtro original.

### **Como se proteger**

- **Instruções preparadas:** Uma forma segura de construir consultas é usando instruções preparadas, que separam o código SQL da entrada do usuário, evitando que a entrada seja interpretada como código.
- **Procedimentos armazenados:** Utilizar procedimentos armazenados, que são sub-rotinas de código armazenadas no banco de dados e executadas pela aplicação, pode ajudar a sanitizar as entradas do usuário antes de executar a consulta.
- **Validação de entrada:** Validar todas as entradas do usuário antes de usá-las em consultas é crucial para evitar que caracteres especiais ou comandos SQL sejam executados acidentalmente.', 'geo', 'sqli'),
  ('Salafismo', 'O **salafismo** é uma corrente dentro do Islã que defende um retorno às práticas dos primeiros muçulmanos, chamados de *“salaf”* (os “antepassados piedosos”).

![Salafismo](/glossary/salafismo-1.webp)

### Ideia central

Os salafistas acreditam que a forma mais pura do Islã é aquela vivida na época do profeta Muhammad e das primeiras gerações após ele. Por isso, procuram:

- seguir o Alcorão e os ensinamentos originais de forma **literal**
- evitar inovações religiosas (*bid‘ah*)
- manter práticas consideradas “autênticas”

### Características

- Forte ênfase na **ortodoxia** (seguir regras e doutrinas corretamente)
- Interpretação mais **conservadora** em muitos aspectos
- Foco na prática religiosa “como era no início”

### Importante entender

O salafismo **não é um grupo único** — existem diferentes correntes dentro dele:

- algumas são mais **pacíficas e focadas na vida religiosa pessoal**
- outras podem ter posições **políticas mais rígidas**
- uma minoria foi associada a movimentos extremistas (mas isso não representa todos os salafistas)

### Comparando com o sufismo

- **Sufismo** → foco na espiritualidade interior e experiência mística
- **Salafismo** → foco na prática correta e fidelidade às origens', 'zei', 'salafismo'),
  ('Sapir-Whorf Hypothesis', 'The Sapir-Whorf Hypothesis explores how the language we speak shapes how we perceive and think about the world. Edward Sapir and Benjamin Lee Whorf studied different natural languages, like English and Hopi, to see if structural differences affected how speakers viewed reality.

The hypothesis is generally broken down into two main views:

**Linguistic Determinism (The strong view)**
This older theory argues that language completely *controls* your thoughts. According to this view, if a concept does not exist in your language, you literally cannot think about or understand it. For example, if a language has no future tense, its speakers might conceptualize time differently and struggle to be future-oriented. This extreme view is largely rejected by modern scholars.

**Linguistic Relativity (The accepted view)**
This modern view argues that language does not strictly determine reality, but it strongly *influences* it. Language highlights certain aspects of reality, which subtly guides a speaker''s memory, attention, and daily habits.

For example, English speakers must pay attention to biological sex because the language forces a choice between "he," "she," or "it". Another example is how some languages use cardinal directions (north/south) instead of relative ones (left/right), which significantly enhances their speakers'' spatial orientation. Ultimately, languages obtain these categories from our underlying cultural schemas and mental models.', 'zei', 'sapir-whorf-hypothesis'),
  ('Scapegoat (Bode Expiatório)', 'Um bode expiatório é simplesmente alguém que leva a culpa pelos erros, problemas ou crimes dos outros. A origem do termo vem de um antigo ritual do Livro de Levítico (na Bíblia):

1. No *Yom Kippur* (Dia do Perdão), os sacerdotes sorteavam dois bodes.
2. Um bode era sacrificado, e sobre o outro — o **bode expiatório** — o sacerdote "transferia" simbolicamente todos os pecados e culpas do povo.
3. Esse bode era então **expulso e abandonado no deserto**, levando embora a culpa da comunidade.

Por isso, na sociologia e na política, “fazer de bode expiatório” (*scapegoating*) significa **culpar um grupo minoria por crises sociais** (desemprego, violência, inflação) para tirar o foco dos verdadeiros culpados ou da incapacidade do governo.

---

Source: [en.wikipedia.org](https://en.wikipedia.org/wiki/Scapegoat)', 'geo', 'scapegoat-bode-expiatorio'),
  ('Secularização', 'É basicamente a passagem de uma sociedade “guiada pela religião” para uma sociedade onde a religião é uma parte da vida privada, não o centro de tudo. A **secularização** é o processo pelo qual a religião perde influência sobre a sociedade, especialmente nas áreas públicas como política, educação e leis.

### Ideia principal

Numa sociedade secularizada:

- o Estado se torna **independente da religião**
- decisões políticas e leis são baseadas em **razão, ciência e debate público**, não em crenças religiosas
- a religião passa a ser mais uma **escolha pessoal** do que uma obrigação social

### Exemplo conhecido

Um exemplo clássico é a laicidade na França, onde o Estado é oficialmente separado de qualquer religião.

### Como acontece

A secularização pode ocorrer por vários motivos:

- avanço da ciência e tecnologia
- maior diversidade cultural e religiosa
- valorização da liberdade individual

### Importante

Secularização **não significa o fim da religião**. As pessoas ainda podem acreditar e praticar sua fé — só que a religião deixa de dominar a vida pública.', 'zei', 'secularizacao'),
  ('Shamir''s Secret Sharing (Partilha de Segredo de Shamir)', 'Um algoritmo criptográfico que divide um segredo (como uma senha ou chave mestra) em várias partes menores, exigindo que um número mínimo de partes seja reunido para revelar o segredo original.

![Shamir''s Secret Sharing (Partilha de Segredo de Shamir)](/glossary/shamir-s-secret-sharing-partilha-de-segredo-de-shamir-1.webp)

Criado pelo criptógrafo Adi Shamir em 1979, o algoritmo baseia-se num conceito matemático simples: **Geometria de Polinómios**.

- Para ligar dois pontos no espaço, precisas de uma linha reta. Com apenas um ponto, a linha pode apontar para qualquer direção infinitamente.
- Para definir uma curva (parábola), precisas de pelo menos 3 pontos.
- O algoritmo esconde o segredo original num ponto específico de um gráfico (o intercepto $y$). Ele gera uma equação matemática e distribui pontos coordenados $(x, y)$ como as "partes" do segredo. Se o número mínimo de pontos (limite) for reunido, o computador consegue redesenhar a curva exata e revelar o segredo. Com menos pontos do que o limite, existem infinitas curvas possíveis, tornando o segredo matematicamente impossível de adivinhar.

### 🏛️ Intersecção com Relações Internacionais & Soberania

- **Segurança de Armas Nucleares:** este conceito é a base dos protocolos de segurança nacional para lançamentos de mísseis. Garante que nenhum líder militar ou presidente consiga ativar armas de destruição maciça sozinho; é estritamente necessário o consenso e a união das chaves de múltiplos membros do alto escalão do Estado (ex: Regra dos Dois Homens).
- **Custódia Descentralizada e Antivigilância:** em governança de dados soberana, impede o abuso de poder corporativo ou estatal. Uma organização internacional pode dividir as suas chaves de segurança entre servidores em países diferentes (ex: Suíça, islândia e África do Sul). Nenhum desses governos consegue confiscar os dados sozinho, pois precisaria de cooperar geopoliticamente com os outros estados para atingir o limite mínimo de chaves necessárias para abrir o sistema.

---

### Explicação Simples

Imagina que tens um mapa do tesouro trancado num cofre que precisa de uma chave mágica para abrir. Tu não confias essa chave a uma única pessoa, porque ela pode roubar o tesouro. Então, usas a matemática para dividir essa chave em **5 pedaços de quebra-cabeça** e entregas um pedaço a cada um dos teus 5 melhores amigos.

O segredo da matemática de Shamir é o **Limite mínimo (Threshold)**. Tu podes configurar o sistema para dizer: *"Se pelo menos 3 de vocês se juntarem e unirem os seus pedaços, a chave mágica reconstrói-se e o cofre abre"*. Se apenas 2 pessoas se juntarem, elas não conseguem descobrir absolutamente nada sobre a chave.', 'res', 'shamir-s-secret-sharing-partilha-de-segredo-de-shamir'),
  ('Shibboleth', 'Shibboleth é um traço linguístico (uma palavra, som ou jeito de falar) que funciona como marcador de pertencimento social — ele revela se alguém é “de dentro” ou “de fora” de um grupo.

Em termos simples:

> *é um detalhe na fala que denuncia quem você é (ou de onde você vem).*
>

### De onde vem o termo

A palavra vem de um episódio bíblico (Livro dos Juízes). Um grupo exigia que as pessoas pronunciassem “shibboleth”. Quem não conseguia produzir o som correto era identificado como inimigo.

### Como funciona hoje

Um shibboleth pode ser:

- uma pronúncia específica
- uma gíria
- um sotaque
- uma palavra técnica ou cultural

E ele serve para:

- incluir (“essa pessoa é do nosso grupo”)
- excluir (“essa pessoa não pertence aqui”)

### Em uma frase

Shibboleth = language as a social gatekeeper.', 'zei', 'shibboleth'),
  ('Singrar', 'Navegar à vela; velejar: preferia estar horas ao mar, singrando.

Navegar em uma direçao determinada: singrar para o porto.', 'geo', 'singrar'),
  ('Sionismo (Zionism)', 'O sionismo é um movimento surgido no século 19 na comunidade judia na Europa que buscava uma solução para a questão judaica. Naquela época, o antissemitismo – que é a discriminação contra os povos semitas, entre os quais, está o povo judeu – estava em crescimento no continente.

Foi o sionismo enquanto movimento político que deu corpo à criação do Estado de Israel, em 1947, logo após o Holocausto na Europa, quando cerca de 6 milhões de judeus foram assassinados, principalmente em campos de concentração da Alemanha nazista. O termo sionismo faz referência ao Monte Sião, nome de uma das colinas de Jerusalém e usado como sinônimo de terra prometida, ou terra de Israel.

A definição do conceito sionismo gera divergências entre estudiosos e militantes de movimentos favoráveis e contrários à criação de um Estado judeu. Enquanto algumas correntes de pensamento apontam para o caráter laico do sionismo, outros acreditam que o movimento é necessariamente baseado na religião judaica.

---

Source: [agenciabrasil.ebc.com.br](https://agenciabrasil.ebc.com.br/internacional/noticia/2023-10/entenda-o-que-e-sionismo-movimento-que-da-origem-ao-estado-de-israel)', 'geo', 'sionismo-zionism'),
  ('Sistema de Arquivos Interplanetário (InterPlanetary File System)', 'Sistema de Arquivos Interplanetário é um protocolo e uma rede projetada para criar um armazenamento associativo peer-to-peer endereçável ao conteúdo de armazenamento e compartilhamento, de hipermídia, num sistema de arquivos distribuído.', 'res', 'sistema-de-arquivos-interplanetario-interplanetary-file-system'),
  ('Sociolect', 'É um dialeto / lingua que é conectado a uma classe social específica, e não geograficamente.

### O que define um sociolect

Ele pode variar de acordo com:

- classe social
- profissão
- idade
- gênero
- nível de escolaridade
- grupo cultural ou subcultural

Inclui:

- vocabulário
- pronúncia
- construções gramaticais
- expressões típicas

### Diferença importante

- **dialect** → varia por **região**
- **sociolect** → varia por **grupo social**

### Em uma frase

Sociolect = language shaped by social identity.', 'zei', 'sociolect'),
  ('Speech acts (Ato de fala)', 'Um ato de fala (*speech act*) é uma ação realizada por meio da linguagem, em que a pessoa não apenas transmite uma informação, mas faz algo com as palavras (como prometer, ordenar ou pedir desculpas).

O conceito faz parte da **pragmática**, um ramo da linguística, e foi criado pelo filósofo J. L. Austin no livro *"Como Fazer Coisas com Palavras"*, sendo depois expandido por John Searle.

**Os Três Níveis do Ato de Fala**

Segundo Austin, quando dizemos algo, executamos três atos ao mesmo tempo:

- **Ato locucionário:** É o ato físico de emitir sons, palavras e frases com um sentido literal e gramatical claro.
- **Ato ilocucionário:** É a **intenção** ou a força por trás da frase (por exemplo, fazer uma pergunta, dar uma ordem, fazer uma ameaça ou uma promessa).
- **Ato perlocucionário:** É o **efeito** ou o impacto real que a fala causa em quem ouve (como assustar, convencer, persuadir ou fazer alguém obedecer).

*Exemplo prático:* Quando alguém diz *"Está muito frio aqui"*, o **ato locucionário** é a frase literal sobre a temperatura. O **ato ilocucionário** é a intenção de pedir para fecharem a janela. O **ato perlocucionário** acontece se a outra pessoa se levantar e fechar a janela.

**Principais Tipos de Atos de Fala (Classificação de Searle)**

- **Assertivos / Representativos:** Afirmam que algo é verdadeiro (dizer, descrever, relatar).
- **Diretivos:** Tentam fazer o ouvinte realizar uma ação (mandar, pedir, suplicar).
- **Comissivos:** Comprometem o falante com uma ação futura (prometer, garantir, apostar).
- **Expressivos:** Mostram os sentimentos ou atitudes do falante (agradecer, elogiar, pedir desculpas).
- **Declarativos:** Alteram a realidade de forma institucional ou social ao serem ditos (batizar, condenar no tribunal, casar duas pessoas).

---

Source: [edtl.fcsh.unl.pt](https://edtl.fcsh.unl.pt/encyclopedia/actos-de-linguagem-speech-acts)', 'zei', 'speech-acts-ato-de-fala'),
  ('Spoofing', '*Spoofing* é uma técnica de falsificação de identidade digital usada para enganar pessoas e sistemas, fazendo parecer que um ataque ou comunicação falsa vem de uma fonte confiável. O objetivo é obter informações confidenciais, roubar dados, espalhar malware ou realizar outras atividades maliciosas. Os ataques podem ser feitos por e-mail, chamadas telefônicas, sites ou endereços IP.

## **Como funciona**

- **Falsificação de e-mail:** O remetente de um e-mail é alterado para se passar por alguém legítimo. O e-mail pode conter links maliciosos ou anexos que instalam programas como vírus ou cavalos de Troia.
- **Falsificação de chamadas:** O número que aparece no identificador de chamadas é manipulado para se parecer com um número conhecido, como o de um banco, para induzir a vítima a atender.
- **Falsificação de IP:** Um endereço IP é falsificado para fazer um ataque parecer ter origem em uma fonte diferente, ocultando a identidade real do atacante.
- **Falsificação de sites:** Um site malicioso é criado para imitar um site legítimo, como um banco, para roubar credenciais de login. Isso é conhecido como [phishing](https://www.google.com/search?sca_esv=a65b0ffea2fb0023&sxsrf=AE3TifOa6-uBxPOKmRwIMXFjQZgc7rofYQ%3A1764637182309&q=phishing&sa=X&ved=2ahUKEwj2xqLj2Z2RAxWeIrkGHWd9Gh8QxccNegUIkQIQAQ&mstk=AUtExfD6p54WlUOCqIQuMxHuCJY-Rbfvswt578sPfcydsNGvcWiWISysVhwjhpT0DYKqLwWJEF0l2azolYhb_IQQCRdQeObiS6JCmxdMH84PyB9unHBg05q2_WTXTxxMTMmG0uV_q2uabGgq968wNb_zab9bvIPIXMFuClhGbQGXe099itM&csui=3), que pode ser combinado com o spoofing.
- **Falsificação de localização ([geolocation](https://www.google.com/search?sca_esv=a65b0ffea2fb0023&sxsrf=AE3TifOa6-uBxPOKmRwIMXFjQZgc7rofYQ%3A1764637182309&q=geolocation&sa=X&ved=2ahUKEwj2xqLj2Z2RAxWeIrkGHWd9Gh8QxccNegUI4wEQAQ&mstk=AUtExfD6p54WlUOCqIQuMxHuCJY-Rbfvswt578sPfcydsNGvcWiWISysVhwjhpT0DYKqLwWJEF0l2azolYhb_IQQCRdQeObiS6JCmxdMH84PyB9unHBg05q2_WTXTxxMTMmG0uV_q2uabGgq968wNb_zab9bvIPIXMFuClhGbQGXe099itM&csui=3)):** Um usuário usa ferramentas como VPNs para fazer com que seu dispositivo pareça estar em uma localização diferente, como para acessar conteúdo restrito por região.', 'geo', 'spoofing'),
  ('Spyware', 'Spyware **é um tipo de [malware](/glossary/malware) (software malicioso) que se instala secretamente em um dispositivo para coletar informações sobre o usuário e o seu comportamento, como senhas, dados de login, histórico de navegação e dados bancários**. Essas informações são enviadas a terceiros sem o consentimento do usuário, que podem usá-las para fraudes, chantagem, ou vendê-las. O spyware age de forma discreta e oculta, diferente de outros malwares como o ransomware, que foca em bloquear o sistema.

### **Como o spyware funciona?**

**Coleta de dados:** O spyware rastreia secretamente suas atividades, como sites visitados, o que é digitado no teclado (keylogger) e até mesmo tirando capturas de tela (screenlogger).

- **Coleta de dados:** O spyware rastreia secretamente suas atividades, como sites visitados, o que é digitado no teclado (keylogger) e até mesmo tirando capturas de tela (screenlogger).
- **Transmissão de informações:** As informações coletadas são enviadas pela internet para um invasor, sem que o usuário perceba.
- **Danos ao dispositivo:** Além de roubar dados, o spyware pode danificar o dispositivo, causar lentidão e alterar o navegador.

### **Como o spyware se espalha?**

- **Downloads:** Pode ser instalado junto com outros programas, especialmente programas gratuitos (freeware).
- **Anexos de e-mail:** Abertura de e-mails com anexos infectados.
- **Links enganosos:** Clicar em links suspeitos em mensagens, e-mails ou sites.

### **Riscos do spyware**

- **Violação de privacidade:** Acesso não autorizado às suas informações pessoais e financeiras.
- **Fraudes:** Uso de dados bancários e senhas para roubar dinheiro.
- **Chantagem:** Uso de informações para extorquir a vítima.

### **Como se proteger?**

- **Instale e mantenha um programa antivírus atualizado**: em todos os seus dispositivos.
- **Seja cauteloso:** Não clique em links suspeitos ou baixe arquivos de fontes desconhecidas.
- **Verifique a instalação de programas:** Fique atento durante a instalação de novos softwares e desmarque opções de instalação de programas adicionais indesejados.
- **Use teclados virtuais**: para digitar informações sensíveis, pois eles não podem ser capturados por keyloggers.', 'res', 'spyware'),
  ('Standard Language Ideology (SLI)', 'Standard Language Ideology (SLI) é a crença de que existe uma forma “correta”, neutra e superior de uma língua — geralmente a variedade padrão — e que todas as outras formas (dialetos, sotaques, variações regionais ou sociais) são vistas como inferiores, erradas ou menos legítimas.

### O que essa ideologia faz

- transforma uma variedade específica (normalmente a da elite, da escola, do Estado) em **norma**
- naturaliza hierarquias sociais como se fossem linguísticas
- associa “boa linguagem” a inteligência, educação e moralidade
- deslegitima fala popular, racializada ou periférica

### Exemplo rápido

Dizer:

> “essa pessoa fala errado”
>

na verdade significa:

> “essa pessoa não fala a variedade dominante”.
>', 'zei', 'standard-language-ideology-sli'),
  ('Stuxnet attack on Iran''s nuclear enrichment program', 'O **Stuxnet** foi o primeiro "ciberarmamento" conhecido da história capaz de causar destruição física em infraestruturas do mundo real. Descoberto publicamente em 2010, o *malware* foi desenvolvido especificamente para sabotar o programa de enriquecimento de urânio do Irã, centrado na usina de Natanz.

Atribuído amplamente a uma cooperação secreta entre os Estados Unidos e Israel (projeto codinome *Operation Olympic Games*), o ataque marcou uma virada histórica na guerra cibernética.

### Como o Ataque Funcionou

O ataque do Stuxnet foi um feito de engenharia de software e inteligência sem precedentes pela sua complexidade:

1. **Ultrapassando o *Air Gap* (Isolamento Físico):** A usina de Natanz não era conectada à internet. O vírus foi introduzido fisicamente na rede interna através de pen drives infectados (provavelmente levados por prestadores de serviço terceirizados).
2. **Uso de múltiplos *Zero-Days*:** O Stuxnet explorou quatro vulnerabilidades do tipo *zero-day* no Windows (falhas desconhecidas até então pela Microsoft) para se espalhar silenciosamente.
3. **Alvo Específico:** O código não causava danos a computadores normais. Ele procurava exclusivamente por softwares da Siemens (Step 7) que controlavam os Controladores Lógicos Programáveis (PLCs) de motores específicos.
4. **Sabotagem Física:** Uma vez na rede de controle, o Stuxnet alterava drasticamente a velocidade de rotação das centrífugas de enriquecimento de urânio (subindo e descendo as rotações em ciclos). Isso fazia com que os rotores sofressem estresse mecânico extremo, vibrassem até a deformação e se autodestruíssem.
5. **Ilusão de Normalidade:** Simultaneamente, o vírus enviava relatórios falsos para as salas de controle, fazendo os monitores indicarem que a operação estava 100% normal. Os cientistas iranianos viam as centrífugas quebrando sem entender o motivo.

### O Impacto

- **Danos Físicos:** Estimou-se que o Stuxnet destruiu cerca de 1.000 centrífugas (aproximadamente 20% do parque de Natanz na época) e atrasou o programa nuclear iraniano em meses ou anos.
- **Descoberta:** O ataque foi descoberto quando o vírus vazou da rede de Natanz para a internet global devido a uma modificação de código agressiva, sendo detectado por uma empresa de segurança em Belarus.
- **Mudança no Cenário Internacional:** O Stuxnet provou que linhas de código podiam causar danos físicos equivalentes a um ataque aéreo militar, inaugurando a era da ciberguerra entre Estados.

---

Source: [kaspersky.com](https://www.kaspersky.com/resource-center/definitions/what-is-stuxnet)', 'geo', 'stuxnet-attack-on-iran-s-nuclear-enrichment-program'),
  ('Sufismo', 'O sufismo é como o “lado mais interior” do Islã — focado menos em aparência e mais na transformação do coração.

O sufismo é uma corrente mística dentro do Islã que busca uma conexão direta e profunda com Deus através da experiência espiritual pessoal.

Em vez de focar apenas em regras externas da religião, **o sufismo enfatiza o amor, a devoção e a purificação interior**.

## Ideia central

Os sufis acreditam que o objetivo da vida é se aproximar de Deus, removendo o ego e desenvolvendo qualidades como:

- humildade
- compaixão
- amor universal

## Práticas comuns

Os praticantes usam diferentes métodos para atingir esse estado espiritual, como:

- meditação e contemplação
- repetição de nomes divinos (chamado dhikr)
- música e dança espiritual (como a famosa dança dos dervixes)

## Figura importante

Um dos nomes mais conhecidos do sufismo é Jalal ad-Din Rumi, um poeta e mestre espiritual que escreveu sobre amor divino e união com Deus.

### Comparando com o sufismo

- **Sufismo** → foco na espiritualidade interior e experiência mística
- **Salafismo** → foco na prática correta e fidelidade às origens

---

Source: [pt.wikipedia.org](https://pt.wikipedia.org/wiki/Sufismo)', 'zei', 'sufismo'),
  ('Surveillance of Julian Assange', '> **Julian Assange** é um ciberativista, jornalista e programador australiano, mundialmente conhecido por ser o fundador do **WikiLeaks**, uma organização que publica vazamentos de documentos secretos de governos e grandes corporações.

The **Surveillance of Julian Assange** involved a covert operation managed by **Undercover Global S.L. (UC Global)**, a Spanish security firm originally hired to protect the Ecuadorian Embassy in London where Assange lived in asylum from 2012 to 2019.

**The Surveillance Operation**

- **Hidden Devices:** UC Global installed audio-enabled cameras, hidden microphones inside fire extinguishers and a women''s restroom, and specialized window stickers to prevent glass vibration and capture conversations from the outside.
- **Targeted Individuals:** Lawyers, journalists, medical personnel, and high-profile visitors—including Glenn Greenwald, Pamela Anderson, and Yanis Varoufakis—had their meetings, personal documents, passport copies, and electronic device passwords secretly recorded.
- **Data Transfer:** Company owner David Morales instructed employees to share the gathered audio, video, and logs with U.S. intelligence services ("American friends") to support prospective extradition cases against Assange.

**CIA Plans and Legal Fallout**

- **Extreme Measures:** Investigations and reports revealed that under CIA Director Mike Pompeo, the agency treated WikiLeaks as a hostile intelligence service after the Vault 7 leaks, prompting proposals not only for extensive electronic surveillance but also plans for abduction or assassination while Assange was in the embassy.
- **Court Rulings:** Spanish national court proceedings scrutinized UC Global and Morales for violating the privacy and attorney-client privileges of Assange and his legal team.', 'res', 'surveillance-of-julian-assange'),
  ('Talibã', 'O Talibã é um movimento fundamentalista e nacionalista islâmico que governa o Afeganistão e impõe uma interpretação rigorosa da lei islâmica (Sharia).

**O que é o Talibã**

- **Significado:** A palavra vem do pachto e significa "estudantes".
- **Origem:** O grupo surgiu no início da década de 1990, após a retirada soviética do Afeganistão e no contexto da guerra civil.
- **Governo:** Controlou o Afeganistão entre 1996 e 2001, e retomou o poder do país em agosto de 2021.

**Regras e Sociedade**

- **Restrições:** O grupo impõe fortes restrições aos direitos civis, especialmente proibindo o ensino secundário e superior para mulheres.
- **Liderança:** O movimento é liderado politicamente e espiritualmente por Hibatullah Akhundzada desde 2016.

**Cenário Atual**

- **Conflitos de fronteira:** O grupo enfrenta tensões diplomáticas e militares constantes com o Paquistão devido a acusações mútuas de abrigo a grupos militantes.

---

Source: [pt.wikipedia.org](https://pt.wikipedia.org/wiki/Talib%C3%A3)', 'geo', 'taliba'),
  ('Taqwa تقوى', 'Taqwa é um termo islâmico que significa a consciência, o temor reverente e a plena consciência de Allah em todas as ações, pensamentos e palavras.

**O Significado de Taqwa**

- **Consciência Divina:** Saber que Allah está sempre observando e ciente de tudo o que fazemos, tanto em público quanto em segredo.
- **Escudo Espiritual:** O sentido linguístico vem de uma raiz que significa proteção ou escudo — agir como uma barreira que nos afasta do pecado e do que desagrada a Deus.
- **Cumprimento e Abstenção:** Consiste em obedecer aos mandamentos divinos e afastar-se do que foi proibido.
- **Origem no Coração:** Como ensinou o Profeta Muhammad, o taqwa reside no coração e guia a conduta com sinceridade, amor e temor adequado.

---

### explicado de forma clara

*taqwa* vem da raiz árabe **w-q-y**, que significa **proteger / guardar / estar atento**.

na prática, é a ideia de:

> viver com consciência constante de Deus nas escolhas do dia a dia.
>

### a raiz **و ق ي** significa

o campo semântico de **w-q-y** é:

- proteger
- preservar
- guardar
- prevenir dano
- agir com cautela

a ideia central é **colocar algo como escudo**.

### como isso vira *taqwa*

alguns exemplos derivados da mesma raiz:

- **waqā** (وقى) → proteger
- **wiqāya** (وقاية) → proteção, prevenção
- **taqwa** (تقوى) → autocontrole consciente / proteção moral
- **muttaqī** (متّقي) → pessoa que vive com taqwa

---

### o que *taqwa* envolve

- agir com responsabilidade moral
- ter autocontrole
- buscar justiça e integridade
- estar atento às consequências dos próprios atos
- alinhar intenção, ação e consciência

não é sobre ser “perfeito”, mas sobre **agir com cuidado e intenção**.

### por que *taqwa* é importante

no Alcorão, *taqwa* aparece o tempo todo como:

- o critério de valor de uma pessoa
- algo mais importante que status, origem ou aparência

ou seja, não é identidade social — é **prática ética**.

### conexão direta com *taqwacore*

o nome **taqwacore** junta:

- *taqwa* → consciência ética/religiosa
- *hardcore / punk* → contestação, marginalidade, “do it yourself”

a provocação é justamente essa:

> é possível viver taqwa fora das formas religiosas tradicionais?
>

por isso o movimento questiona:

- quem define o que é “bom muçulmano”
- quem tem autoridade religiosa
- como fé e identidade podem existir em espaços marginais

---

Source: [en.wikipedia.org](https://en.wikipedia.org/wiki/Taqwa)', 'zei', 'taqwa'),
  ('Terras-raras (minerais críticos)', 'Terras raras são um grupo de 17 elementos químicos encontrados na Tabela Periódica, incluindo os lantanídeos (15 elementos) mais o escândio e o ítrio.

Apesar do nome, eles não são tão raros assim, mas costumam estar dispersos na crosta terrestre e são difíceis de extrair de maneira pura.

Eles são essenciais para várias tecnologias modernas, como:

- **Eletrônicos** – usados em telas de celulares, TVs e computadores.
- **Ímãs superpotentes** – presentes em turbinas eólicas, motores de carros elétricos e fones de ouvido.
- **Equipamentos militares** – radares, lasers e mísseis guiados.
- **Catalisadores e baterias** – ajudando na produção de combustíveis e no armazenamento de energia.

A China domina a extração e o processamento desses elementos, o que gera disputas geopolíticas, já que eles são estratégicos para muitas indústrias.

---

Source: [pt.wikipedia.org](https://pt.wikipedia.org/wiki/Terra-rara)', 'geo', 'terras-raras-minerais-criticos'),
  ('Terreur', '*Terreur* é a definição de terrorismo como justiça.

O Terror (*La Terreur*) foi um período de forte violência política na Revolução Francesa que durou de meados de 1793 até 28 de julho de 1794.

**O que foi o Terror?**

Um governo forte guiado pelo [**Comitê de Salvação Pública**](https://shs.cairn.info/la-terreur--9782262067731?lang=fr&tab=sommaire), liderado por [**Maximilien de Robespierre**](https://www.youtube.com/watch?v=OZVQUfKNz-s).Uma fase de leis duras contra quem era visto como inimigo da revolução.O uso frequente da guilhotina para matar pessoas suspeitas ou contrárias ao governo.

**Fatos importantes**

- **Datas:** De setembro de 1793 a julho de 1794.
- **Lei dos Suspeitos:** Uma regra criada em setembro de 1793 que permitia prender pessoas apenas por denúncias ou falta de provas de civismo.
- **Vítimas:** Cerca de 17 mil pessoas foram condenadas à morte de forma oficial, e o número total passa de 40 mil com mortes sem julgamento.
- **Fim:** Terminou em 28 de julho de 1794 (ou 9 de Termidor), quando Robespierre foi preso e guilhotinado.

---

Source: [pt.wikipedia.org](https://pt.wikipedia.org/wiki/Terror_(Revolu%C3%A7%C3%A3o_Francesa))', 'geo', 'terreur'),
  ('Terrorism Studies', 'Terrorism Studies is an interdisciplinary academic field that examines the causes, dynamics, prevention, and historical evolution of political violence and violent extremism.

**Core Focus Areas**

- **Causes and Origins:** Investigates the psychological, social, political, and material factors that drive individuals and groups toward radicalization and rebellion.
- **Typologies of Terrorism:** Explores domestic, transnational, state-conducted, and state-sponsored violence, alongside emerging threats like cyberterrorism and technology-driven attacks.
- **Counterterrorism Strategies:** Analyzes policy responses, intelligence methods, legal frameworks, and security measures used by governments and international bodies.

**Academic Scope and Evolution**

- **Interdisciplinary Approach:** Traditionally rooted in political science and international relations, the field now incorporates sociology, criminology, psychology, history, computer science, and law.
- **Critical Terrorism Studies (CTS):** An offshoot that emerged to challenge conventional state-centric or pro-Western biases in mainstream research.
- **Programs and Research:** Prominent institutions—such as the [**University of Maryland''s START Consortium**](https://www.start.umd.edu/education/master-professional-studies-security-and-terrorism-studies)—offer specialized degrees and minors focused on security and global terrorism analysis', 'geo', 'terrorism-studies'),
  ('Title VII of the Civil Rights Act', 'Title VII of the Civil Rights Act, as amended, protects employees and job applicants from employment discrimination based on race, color, religion, sex and national origin.

---

Title VII of the [Civil Rights Act of 1964](https://www.eeoc.gov/statutes/title-vii-civil-rights-act-1964) is a federal law that makes it illegal for employers to discriminate against employees and job applicants based on specific protected characteristics.

**Protected Characteristics**

- **Race and Color**: Protects individuals from bias based on skin color, racial traits, or ethnic backgrounds.
- **Religion**: Protects religious beliefs and requires employers to reasonably accommodate practices unless it causes undue hardship.
- **Sex**: Covers gender, pregnancy, sexual orientation, and gender identity.
- **National Origin**: Protects people from being treated unfairly due to their birthplace, accent, ethnicity, or culture.

**Covered Employment Actions**

The law applies to all terms and conditions of employment, including:

- Hiring and firing
- Compensation, pay, and benefits
- Promotions, training, and job assignments
- Harassment and workplace retaliation

**Who Must Comply?**

- **Employers**: Applies to private-sector employers, state and local governments, and educational institutions with **15 or more employees**.
- **Other Entities**: Also covers labor unions, employment agencies, and the federal government.
- **Enforcement**The law created the Equal Employment Opportunity Commission (EEOC) to receive, investigate, and resolve workplace discrimination complaints.

---

Source: [ftc.gov](https://www.ftc.gov/policy-notices/no-fear-act/protections-against-discrimination)', 'geo', 'title-vii-of-the-civil-rights-act'),
  ('Transnational social field', 'um espaço social que atravessa fronteiras nacionais, onde pessoas mantêm relações, práticas, identidades e trocas em mais de um país ao mesmo tempo.

uma pessoa pode:

- morar em um país
- trabalhar para outro
- manter família, afetos, religião, política ou cultura ligados a um terceiro

tudo isso junto forma um **transnational social field**.

### exemplos concretos

- migrantes que vivem na França, mas:
    - participam de debates políticos do país de origem
    - seguem líderes religiosos online
    - enviam dinheiro
    - constroem identidade entre dois (ou mais) contextos
- jovens muçulmanos europeus que:
    - aprendem religião via YouTube, TikTok, Telegram
    - conectam discursos globais do Islã com experiências locais

essas conexões **não se encerram nas fronteiras do Estado-nação**.

### por que o termo é usado

ele ajuda a explicar:

- identidades **não territoriais**
- autoridade **descentralizada**
- pertença múltipla
- circulação de ideias, normas e práticas

em vez de pensar “a pessoa saiu de um país e entrou em outro”, o conceito mostra que ela **habita vários espaços sociais ao mesmo tempo**.', 'zei', 'transnational-social-field'),
  ('Tratado Interamericano de Assistência Recíproca (TIAR) Inter-American Treaty of Reciprocal Assistance', 'O TIAR (Tratado Interamericano de Assistência Recíproca), também chamado de Tratado Interamericano de Assistência Recíproca (Inter-American Treaty of Reciprocal Assistance) ou Tratado do Rio (Rio Treaty), é um acordo de defesa mútua assinado em 1947.

![Tratado Interamericano de Assistência Recíproca (TIAR) Inter-American Treaty of Reciprocal Assistance](/glossary/tratado-interamericano-de-assistencia-reciproca-tiar-inter-a-1.webp)

**O que é o TIAR?**

- É um pacto assinado no Rio de Janeiro por países das Américas.
- O lema principal é que um ataque contra um país membro é considerado um ataque contra todos.
- Permite ações coletivas de defesa.

**Como funciona?**

- **Defesa militar:** os países podem enviar ajuda militar para apoiar uma nação agredida.
- **Sanções:** o tratado também permite aplicar punições econômicas e cortar relações diplomáticas com o agressor.
- **Regras:** as medidas seguem as normas da [Organização dos Estados Americanos (OEA)](Organiza%C3%A7%C3%A3o%20dos%20Estados%20Americanos%20(OEA)%203dd0c519cad48044b67ffbee2869fada.md) e da ONU.

---

Source: [pt.wikipedia.org](https://pt.wikipedia.org/wiki/Tratado_Interamericano_de_Assist%C3%AAncia_Rec%C3%ADproca)', 'geo', 'tratado-interamericano-de-assistencia-reciproca-tiar-inter-american-treaty-of-re'),
  ('Tratado de Não Proliferação de Armas Nucleares – TNP (1968)', 'O [**Tratado de Não Proliferação de Armas Nucleares (TNP)**](https://pt.wikipedia.org/wiki/Tratado_de_N%C3%A3o_Prolifera%C3%A7%C3%A3o_de_Armas_Nucleares) é um acordo internacional de 1968 que visa impedir a disseminação de armas nucleares e promover o desarmamento.

**O que é o TNP**

- **Aberto para assinatura:** 1 de julho de 1968.
- **Entrada em vigor:** 5 de março de 1970.
- **Países participantes:** cerca de 191 nações.
- **Órgão de fiscalização:** Agência Internacional de Energia Atômica (AIEA).

**Os Três Pilares do Tratado**

1. **Não proliferação:** impedir que novos países adquiram armas nucleares.
2. **Desarmamento:** reduzir de forma gradual o arsenal das potências nucleares.**Uso pacífico:** Permitir o acesso à tecnologia nuclear para fins civis (como energia e medicina).
3. **Países com Armas Nucleares:** o acordo reconhece oficialmente cinco potências detentoras de armas atômicas:
    1. Estados Unidos
    2. Rússia (que assumiu o lugar da antiga União Soviética)
    3. Reino Unido
    4. França
    5. China

Todos eles são membros permanentes do Conselho de Segurança da Organização das Nações Unidas (ONU). Outros países, como Índia, Paquistão e Israel, nunca assinaram o pacto e possuem armas nucleares de forma não oficial pelo tratado. A Coreia do Norte deixou o acordo em 2003. O Brasil assinou e ratificou o tratado em 1998.', 'geo', 'tratado-de-nao-proliferacao-de-armas-nucleares-tnp-1968'),
  ('Tratado de Paris 1856', 'O Tratado de Paris de 1856 foi o acordo de paz assinado em 30 de março de 1856 que encerrou oficialmente a Guerra da Crimeia.

**Participantes**

- **Lado vencido:** Império Russo.
- **Lado vencedor (aliados):** Império Otomano, França, Reino Unido e Reino da Sardenha.
- **Mediador/Presidência:** Imperador francês Napoleão III.

**Principais Pontos do Tratado**

- **Neutralidade do Mar Negro:** o mar Negro tornou-se uma zona neutra, fechada a navios de guerra de qualquer nação.
- **Proibição Militar:** a Rússia e o Império Otomano foram proibidos de manter bases navais ou fortificações militares nas margens do Mar Negro.
- **Perdas Territoriais Russas:** a Rússia cedeu a região sul da Bessarábia para a Moldávia e a embocadura do rio Danúbio para o controle otomano.
- **Integridade do Império Otomano:** as potências europeias garantiram a independência e a integridade territorial do Império Otomano.
- **Navegação Livre:** foi estabelecida a liberdade de navegação no rio Danúbio.

**Consequências**

- Marcou o enfraquecimento temporário da influência russa no Leste Europeu e no Oriente Médio.
- Consagrou o prestígio político da França de Napoleão III na Europa.
- Pôs fim à cooperação da Santa Aliança na Europa do século XIX.

---

Source: [pt.wikipedia.org](https://pt.wikipedia.org/wiki/Tratado_de_Paris_(1856))', 'geo', 'tratado-de-paris-1856'),
  ('Treaty of Waitangi (1840)', 'Historic pact between Great Britain and a number of New Zealand Māori tribes of North Island.

![Treaty of Waitangi (1840)](/glossary/treaty-of-waitangi-1840-1.webp)

Te Tiriti o Waitangi (February 6, 1840), historic pact between Great Britain and a number of New Zealand Māori tribes of North Island.

It purported to protect Māori rights and was the immediate basis of the British annexation of New Zealand. Negotiated at the settlement of Waitangi by Britain’s designated consul and lieutenant governor William Hobson and many leading Māori chiefs, the treaty’s three articles provided for the Māori signatories’ acceptance of the British queen’s sovereignty in their lands, the crown’s protection of Māori possessions, with the exclusive right of the queen to purchase Māori land, and full rights of British subjects for the Māori signatories.

The arrangement had serious shortcomings in practice. The Māori were dissatisfied because the impoverished colonial government could not afford to buy much land, and the land it did buy was resold to Europeans at a substantial profit. British immigrants were also angered by government land profits and by the scarcity of land. The resulting interracial and intercultural tension led to warfare in 1844–47 and the New Zealand Wars of the 1860s.

The land-selling article of the treaty ceased to be operative with the passage of the [Native Land Act of 1862](/glossary/native-land-act-of-1862), which provided for private purchase of Māori land.

---

Source: [britannica.com](https://www.britannica.com/event/Te-Tiriti-o-Waitangi)', 'geo', 'treaty-of-waitangi-1840'),
  ('Ulamās', '**os estudiosos do Islã.**

### explicado sem complicar

a palavra vem do árabe **ʿilm** (علم), que significa **conhecimento**.

**ʿulamāʾ** é o plural de **ʿālim** — “aquele que sabe”.

ou seja:

> ulamas = pessoas reconhecidas por seu conhecimento religioso.
>

### o que eles fazem

tradicionalmente, os ulamas:

- estudam o **Alcorão**
- estudam os **hadiths** (ditos e ações do Profeta Muhammad)
- interpretam a **sharia** (lei islâmica)
- emitem **opiniões jurídicas e morais** (*fatwas*)
- orientam a comunidade em questões religiosas do dia a dia

eles **não são padres** e **não formam uma hierarquia central**, como no catolicismo.

### por que isso é importante

no Islã:

- **não existe uma autoridade religiosa única**
- o poder dos ulamas vem do **reconhecimento social**, não de um cargo formal
- diferentes ulamas podem discordar entre si

por isso, a autoridade religiosa no Islã é:

- **dispersa**
- **plural**
- **historicamente negociada**

### conexão com o que você está estudando

quando você fala de **globalização, vernacularization e shift in authority**, está falando justamente de como:

- o monopólio interpretativo dos ulamas é questionado
- mulheres, jovens e atores não tradicionais passam a interpretar textos
- novas formas de autoridade religiosa emergem (online, comunitárias, transnacionais)', 'zei', 'ulamas'),
  ('Umma', 'A Umma (ou *Ummah*) é a comunidade global e espiritual que une todos os muçulmanos do mundo, independentemente de sua raça, nacionalidade, língua ou posição social.

**Significado e Origem**

- **Definição:** a palavra em árabe significa "nação" ou "comunidade religiosa".
- **União espiritual:** os membros são conectados pela fé em Allah e no profeta Maomé.
- **Origem histórica:** o conceito nasceu com Maomé em Medina, quando ele uniu os crentes de diferentes tribos em uma única sociedade baseada na fé, e não em laços de sangue.

**Características Principais**

- **Sem fronteiras:** a Umma transcende limites geográficos e barreiras culturais.
- **Igualdade:** perante Allah, todos os fiéis possuem o mesmo valor, algo visível em práticas como a peregrinação do Hajj.
- **Solidariedade:** a tradição islâmica compara a Umma a um único corpo; se uma parte sofre dor, o restante deve sentir e ajudar.

---

Source: [es.wikipedia.org](https://es.wikipedia.org/wiki/Umma_%28islam%29)', 'zei', 'umma'),
  ('União Internacional de Química Pura e Aplicada (IUPAC)', '### Advancing Chemistry Worldwide

A União Internacional de Química Pura e Aplicada (International Union of Pure and Applied Chemistry, IUPAC) é uma organização não governamental (ONG) internacional dedicada ao avanço da química. Foi criada em Genebra no ano de 1919, e está sediada em Zurique, Suíça, com um secretariado sediado no estado norte-americano da Carolina do Norte, comandado por seu diretor-executivo, atualmente Lynn Soby.

Tem como membros as sociedades nacionais de química. É a autoridade reconhecida no desenvolvimento de padrões para a denominação dos compostos químicos, mediante o seu Comitê Interdivisional de Nomenclatura e Símbolos (em inglês: Interdivisional Committee on Nomenclature and Symbols). É um membro do Conselho Internacional de Ciência (CIC).

---

Source: [pt.wikipedia.org](https://pt.wikipedia.org/wiki/Uni%C3%A3o_Internacional_de_Qu%C3%ADmica_Pura_e_Aplicada)', 'geo', 'uniao-internacional-de-quimica-pura-e-aplicada-iupac'),
  ('Vernacularização', 'tradução cultural; adaptação à linguagem local; localização discursiva

é o processo de traduzir, adaptar e “aterrar” ideias globais para a linguagem, cultura e práticas do dia a dia de um lugar específico.

quando uma ideia nasce ou circula em nível **global** (religiosa, política, jurídica, cultural) ela **não chega pronta** às pessoas.

ela precisa ser:

- dita na **língua local**
- conectada a **costumes locais**
- reinterpretada a partir de **experiências concretas**

isso é vernacularization.

### exemplo em religião

o Islã circula globalmente, mas:

- no Marrocos, certas práticas dialogam com tradições amazigh
- na Indonésia, com culturas locais do Sudeste Asiático
- entre jovens muçulmanos na Europa, com linguagem digital, ativismo e identidade diaspórica

a doutrina pode ser a mesma, mas **a forma de viver, falar e justificar a fé muda**. isso é vernacularization.

### exemplo fora da religião

- **direitos humanos**: um discurso global que, ao chegar em comunidades locais, é explicado com exemplos, valores e histórias que façam sentido naquele contexto
- **feminismo**: ideias globais que ganham versões locais, com outras prioridades, palavras e estratégias
- [arquitetura](https://www.archdaily.com/pt/951326/o-que-e-arquitetura-vernacular)

### a diferença importante

- **globalization** → circulação global
- **vernacularization** → tradução cultural local
- **glocalization** → o jogo entre as duas coisas

em resumo:

> vernacularization mostra que ideias globais só ganham vida quando falam a língua das pessoas.
>', 'zei', 'vernacularizacao'),
  ('Watchdog organizations', 'Watchdog organizations are independent groups that monitor governments, businesses, and institutions to expose corruption, waste, and unethical behavior.

### **What They Do**

**Monitor Actions:** They track spending, policy changes, and legal compliance.

**Expose Misconduct:** They investigate fraud, abuse of power, and environmental harm.

**Inform the Public:** They publish reports and data to raise public awareness.**Demand Reform:** They use public pressure, advocacy, and sometimes litigation to hold groups accountable.

### **Types of Watchdog Organizations**

**Government Watchdogs:** Track how public funds are spent and how laws are enforced (e.g., [**Project On Government Oversight**](https://www.google.com/goto?url=CAESTAHrOzAVTZfZKkqcoDXwH7MiJvuve_sRhueAb96sA6bBDlO0kfgB9YL0UZIlXAUR9cKhF5c8Iy-6ZwTU37RkuV5qrt-9ahwDs80J6nE) or the [**U.S. Government Accountability Office**](https://www.google.com/goto?url=CAESSwHrOzAVBXmn_0cZ53BOHJqxJukRHZQwlQQNjuK_c9j2WR4mKwzSF_MVKVBcTYk_gp-cxGcHm7qNoz9Dvue7Z08-m5NY3np-QId2Qw)).

**Corporate Watchdogs:** Monitor corporate social responsibility, labor conditions, and fair business practices (e.g., [**Transparency International**](https://www.google.com/goto?url=CAESVAHrOzAVWNIIX5Tja0Ab7zHrWSPzkQmuwX0nP1-_CQpDIIuylLyNB4-SanysUIV7JWl--FRV-omr1FSlAFK-Tt4735I_sDt-ssnMLe9MG5aoVYjvbw)).

**Environmental & Rights Watchdogs:** Protect civil liberties, human rights, and ecological health (e.g., [**Human Rights Watch**](https://www.google.com/goto?url=CAESSwHrOzAVZ2nZ61iwa5SHQDmN4vYqshCLtZ6A-BEv5fi_3uZv52dRussFa21PkqEl9MIw2wuZmIr1zhhO0tmY_pqSu_4Oqv1Udmh8Ug) or [**Greenpeace**](https://www.google.com/goto?url=CAESUgHrOzAVQGSVP0zzW73kwgcyZ4fP12cNZ9gA133tBs4N3JCWvPvvB6oXa2w2-qd8hT0JStGLh1C1lRbUkhIcusOEZqxOtH_d7JtH2JfoYFxet1Y)).

### **Why They Matter**

Watchdog groups act as a check on power between elections. They rely on transparency, freedom of speech, and public trust to make their findings effective.', 'res', 'watchdog-organizations'),
  ('Watergate', 'O **Escândalo Watergate** foi um dos maiores escândalos políticos da história dos Estados Unidos, que levou à **renúncia** do presidente **Richard Nixon** em 1974. Ele envolveu uma série de eventos, como **espionagem política**, **interceptação de comunicações** e tentativas de encobrir as atividades ilegais feitas por membros do governo Nixon.

Aqui está um resumo do que aconteceu:

### 1. **Início do escândalo** (1972)

O escândalo começou com um **assalto** ao prédio do **Complexo Watergate**, em Washington, D.C., em **17 de junho de 1972**. Nesse prédio estava localizado o escritório do Partido Democrata Nacional, e o objetivo dos invasores era **espionar** a campanha presidencial de **George McGovern**, o principal rival político de Nixon, nas eleições de 1972.

Os cinco homens que invadiram o escritório foram **presos**. Eles estavam ligados a membros da campanha de Nixon, a **Comitê para a Reeleição do Presidente** (CREEP), o que gerou suspeitas sobre o envolvimento do governo de Nixon.

### 2. **O encobrimento**

Após o assalto, houve uma tentativa de encobrir a ligação entre os invasores e a campanha de Nixon. **Nixon** e alguns de seus assessores tentaram esconder o envolvimento do governo, pressionando a polícia e a mídia a abafarem a investigação. Eles também tentaram influenciar os membros do Congresso e a opinião pública para que o caso fosse ignorado.

### 3. **Investigações e revelações**

Apesar dos esforços para encobrir, jornalistas investigativos, principalmente **Bob Woodward** e **Carl Bernstein** do **Washington Post**, continuaram a investigar o caso. Suas reportagens revelaram que membros da Casa Branca estavam diretamente envolvidos no planejamento e encobrimento do assalto ao Watergate.

Uma das descobertas mais significativas foi a existência de **fitas gravadas** das conversas na Casa Branca, feitas automaticamente pelo próprio Nixon, que mostravam claramente que ele estava ciente e até envolvido no encobrimento do crime.

### 4. **A pressão para a renúncia**

À medida que as investigações avançavam, ficou claro que Nixon estava tentando bloquear a justiça e abusar do poder para proteger sua administração. O **Senado dos Estados Unidos** iniciou um processo de **impeachment** (um processo para remover um presidente do cargo), e havia uma crescente pressão da mídia, do Congresso e da população para que ele renunciasse.

### 5. **Renúncia de Nixon**

Em 9 de agosto de 1974, com o impeachment se aproximando e sem apoio político, Richard Nixon **renunciou** à presidência dos Estados Unidos. Ele foi substituído pelo vice-presidente **Gerald Ford**, que mais tarde concedeu uma **anistia** a Nixon, ou seja, ele não enfrentou julgamento ou punição por seus atos relacionados ao escândalo.

### 6. **Consequências**

- O escândalo Watergate teve grandes consequências para a política americana, como uma **perda de confiança** do público no governo e no sistema político.
- Muitas reformas políticas e legais foram feitas para aumentar a **transparência** e a **responsabilidade** no governo dos Estados Unidos.
- Além disso, o escândalo trouxe à tona o poder dos **meios de comunicação** e do **jornalismo investigativo** como instrumentos para desafiar o poder e garantir a prestação de contas.

Em resumo, o **Watergate** foi um marco importante na história dos Estados Unidos, pois revelou abusos de poder no governo, gerou a renúncia de um presidente e mudou o curso da política americana, destacando a importância da ética política e da transparência no governo.

---

Source: [pt.wikipedia.org](https://pt.wikipedia.org/wiki/Caso_Watergate)', 'geo', 'watergate'),
  ('XSS (Cross-Site Scripting)', 'XSS, ou Cross-Site Scripting, é uma vulnerabilidade de segurança na qual um invasor injeta *scripts* maliciosos em um site confiável para que esses *scripts* sejam executados no navegador de outros usuários.

![XSS (Cross-Site Scripting)](/glossary/xss-cross-site-scripting-1.webp)

Isso pode permitir que o invasor roube informações confidenciais como cookies e senhas, sequestre a sessão do usuário, ou até mesmo altere o conteúdo da página. A falha ocorre quando um site não valida ou sanitiza adequadamente os dados inseridos pelos usuários.

### Como um ataque XSS funciona

1. Um invasor encontra uma vulnerabilidade em um site (geralmente na falta de validação de dados).
2. O invasor injeta um código malicioso (como um script JavaScript) no site.
3. Um usuário visita o site.
4. O navegador do usuário executa o script malicioso como se ele fosse parte do site legítimo, pois não consegue distinguir o código.
5. O script realiza a ação maliciosa, como roubar cookies de sessão para se passar pelo usuário ou redirecionar a vítima para outro site.

### Tipos comuns de XSS

- **Reflected XSS**: O script malicioso é refletido de volta para o usuário imediatamente em uma resposta do servidor, como em uma mensagem de erro ou resultado de busca. Para que o ataque ocorra, o invasor precisa induzir a vítima a clicar em um link manipulado.
- **Stored XSS**: O script é armazenado permanentemente no servidor do site, como em um campo de comentários ou perfil de usuário. Qualquer usuário que visite a página onde o código está armazenado executará o script automaticamente.
- **DOM-based XSS**: A falha está na manipulação do DOM (Document Object Model) pelo JavaScript do lado do cliente. O script é executado diretamente no navegador da vítima, sem necessidade de interação com o servidor.', 'geo', 'xss-cross-site-scripting'),
  ('YPJ (Yekîneyên Parastina Jin) – Unidades de Proteção das Mulheres', 'As Unidades de Proteção das Mulheres ou Unidades de Defesa das Mulheres, ou ainda Unidades de Proteção Feminina, *(em curdo: Yekîneyên Parastina Jin, YPJ, pronunciado Yuh-Pah-Juh)* é uma organização militar formada apenas por mulheres curdas.

![YPJ (Yekîneyên Parastina Jin) – Unidades de Proteção das Mulheres](/glossary/ypj-yekineyen-parastina-jin-unidades-de-protecao-das-mulhere-1.webp)

Foi formalmente criada em 2012 como uma brigada feminina das milícias chamadas Unidades de Proteção Popular (Yekîneyên Parastina Gel, YPG). Esses dois grupos são as principais organizações militares do Curdistão Sírio e são um dos protagonistas da luta no norte da Síria, país que vive uma violenta guerra civil.[4] Várias nações apoiam, com mantimentos e armamentos, o YPJ (especialmente os Estados Unidos).

---

Source: [pt.wikipedia.org](https://pt.wikipedia.org/wiki/Unidades_de_Prote%C3%A7%C3%A3o_das_Mulheres)', 'geo', 'ypj-yekineyen-parastina-jin-unidades-de-protecao-das-mulheres'),
  ('Zero-Knowledge Architecture', 'Zero-knowledge architecture is built on the foundation of zero-knowledge proofs, cryptographic protocols that allow one party (the prover) to demonstrate knowledge of a secret to another party (the verifier) without revealing the secret itself.

### **Core Principles**

A zero-knowledge proof must satisfy three essential properties:

1. **Completeness**: If the statement is true, an honest prover can convince an honest verifier
2. **Soundness**: If the statement is false, no dishonest prover can convince an honest verifier
3. **Zero-Knowledge**: The verifier learns nothing about the secret beyond the validity of the statement

### **Types of Zero-Knowledge Proofs**

#### **zk-SNARKs (Zero-Knowledge Succinct Non-Interactive Arguments of Knowledge)**

- **Succinct**: Proofs are small and fast to verify
- **Non-Interactive**: No back-and-forth communication needed
- **Trade-off**: Requires a trusted setup ceremony
- **Use cases**: Blockchain privacy (Zcash), authentication systems

#### **zk-STARKs (Zero-Knowledge Scalable Transparent Arguments of Knowledge)**

- **Transparent**: No trusted setup required
- **Quantum-resistant**: Secure against quantum computing attacks
- **Trade-off**: Larger proof sizes compared to zk-SNARKs
- **Use cases**: Scalable blockchain solutions, public verifiable computation

## **Architecture Patterns**

### **Pattern 1: Privacy-Preserving Authentication**

Traditional authentication systems require password verification, which means the server must either store passwords (hashed) or receive them during login. Zero-knowledge architecture enables passwordless authentication:

```jsx
// Conceptual example: ZK-based authentication
// Prover proves knowledge of password without sending it
const proof = generateZKProof({
  statement: "I know the password",
  secret: userPassword,
  publicInput: username
});

// Verifier checks proof without seeing password
const isValid = verifyZKProof(proof, publicInput);
```

**Benefits:**

- No password transmission over network
- Server never stores or sees passwords
- Protection against credential stuffing attacks

### **Pattern 2: Private Blockchain Transactions**

Blockchains are transparent by default, but zero-knowledge proofs enable private transactions:

- **Sender privacy**: Prove you have sufficient funds without revealing balance
- **Receiver privacy**: Hide transaction recipient
- **Amount privacy**: Conceal transaction amounts
- **Public verification**: Network can still verify transaction validity

### **Pattern 3: Confidential Computation**

Execute computations on encrypted data without decrypting:

```jsx
# Conceptual example: Private data analysis
# Client encrypts data
encrypted_data = encrypt(sensitive_data, public_key)

# Server performs computation on encrypted data
result_proof = compute_with_zkp(
    encrypted_data,
    computation: "calculate average age"
)

# Client verifies result without revealing data
verify_computation(result_proof)
```

## **Implementation Considerations**

### **Circuit Design**

Zero-knowledge proofs require defining a “circuit” that represents the computation to be proven:

1. **Identify what to prove**: What statement needs verification?
2. **Define constraints**: What are the valid operations and relationships?
3. **Optimize for size**: Smaller circuits = faster proofs
4. **Balance privacy vs. performance**: More privacy often means more computation

### **Trust Models**

- **Trusted setup (zk-SNARKs)**: Requires a secure multi-party computation ceremony
- **Transparent setup (zk-STARKs)**: No trust required, but larger proofs
- **Choose based on**: Your threat model, proof size constraints, and trust assumptions

### **Performance Optimization**

- **Proof generation**: Can be slow for complex circuits (seconds to minutes)
- **Proof verification**: Typically fast (milliseconds)
- **Proof size**: Varies from kilobytes (zk-SNARKs) to megabytes (zk-STARKs)
- **Parallelization**: Some proof systems support parallel proof generation

## **Real-World Applications**

### **1. Privacy-Preserving Identity Verification**

Prove age, citizenship, or credentials without revealing full identity documents. Useful for:

- Age-restricted services
- Employment verification
- Financial compliance (KYC/AML)

### **2. Private Voting Systems**

Enable verifiable elections where:

- Votes are private
- Results are publicly verifiable
- No one can link votes to voters
- Mathematical guarantees ensure integrity

### **3. Confidential Smart Contracts**

Blockchain smart contracts that:

- Process private data
- Maintain public auditability
- Enable private DeFi transactions
- Support confidential business logic

### **4. Privacy-Preserving Machine Learning**

Train models on encrypted data:

- Hospitals can collaborate on medical research
- Financial institutions can share fraud detection models
- Data remains encrypted throughout computation

## **Getting Started**

### **Tools and Libraries**

**For zk-SNARKs:**

- **Circom & SnarkJS**: Popular JavaScript ecosystem tools
- **Arkworks**: Rust library for advanced use cases
- **libsnark**: C++ library (older but stable)

**For zk-STARKs:**

- **StarkWare**: Production-ready STARK implementation
- **Winterfell**: Rust-based STARK library

### **Example: Simple Zero-Knowledge Proof**

```jsx
// Using SnarkJS (conceptual)
const { proof, publicSignals } = await snarkjs.groth16.fullProve(
  { secret: "mySecretValue" },
  "circuit.wasm",
  "proving_key.zkey"
);

// Verify without seeing secret
const verified = await snarkjs.groth16.verify(
  vkey,
  publicSignals,
  proof
);
```

## **Best Practices**

1. **Start simple**: Begin with basic proofs before complex circuits
2. **Audit circuits**: Zero-knowledge doesn’t mean bug-free—audit your logic
3. **Consider alternatives**: Sometimes traditional cryptography is sufficient
4. **Optimize carefully**: Proof generation can be expensive
5. **Plan for key management**: Trusted setups require secure key handling

## **Challenges and Limitations**

- **Computational cost**: Proof generation can be slow
- **Proof size**: Storage and transmission overhead
- **Trusted setup complexity**: zk-SNARKs require secure ceremonies
- **Circuit complexity**: Complex logic = slower proofs
- **Learning curve**: Requires understanding of cryptography

## **Future Directions**

Zero-knowledge architecture is rapidly evolving:

- **Faster proof systems**: Ongoing research to reduce generation time
- **Smaller proofs**: Compression techniques for zk-STARKs
- **Better tooling**: More developer-friendly frameworks
- **Hardware acceleration**: GPU/FPGA support for proof generation
- **Standardization**: Industry standards for ZKP implementations

## **Conclusion**

Zero-knowledge architecture offers a powerful paradigm for building privacy-preserving systems. By enabling verification without disclosure, ZKPs solve fundamental privacy challenges in authentication, blockchain, and confidential computation.

As the technology matures and tooling improves, zero-knowledge architecture will become increasingly accessible, enabling a new generation of privacy-first applications that protect user data while maintaining trust and verifiability.

---

### Referência

[Zero-Knowledge Architecture | mgr.domains](https://mgr.domains/zero-knowledge)

---

Source: [glukhov.org](https://www.glukhov.org/app-architecture/security/zero-knowledge-architecture/)', 'res', 'zero-knowledge-architecture'),
  ('Zero-day Attack', '“Zero-day” is a broad term that describes recently discovered security vulnerabilities that hackers can use to attack systems. The term “zero-day” refers to the fact that **the vendor or developer has only just learned of the flaw – which means they have “zero days” to fix it. A zero-day attack takes place when hackers exploit the flaw before developers have a chance to address it.**

Zero-day is sometimes written as 0-day. The words vulnerability, exploit, and attack are typically used alongside zero-day, and it’s helpful to understand the difference:

- A **zero-day vulnerability** is a software vulnerability discovered by attackers before the vendor has become aware of it. Because the vendors are unaware, no patch exists for zero-day vulnerabilities, making attacks likely to succeed.
- A **zero-day exploit**is the method hackers use to attack systems with a previously unidentified vulnerability.
- A **zero-day attack** is the use of a zero-day exploit to cause damage to or steal data from a system affected by a vulnerability.

## **What are zero-day attacks and how do zero-day attacks work?**

Software often has security vulnerabilities that hackers can exploit to cause havoc. Software developers are always looking out for vulnerabilities to "patch" – that is, develop a solution that they release in a new update.

However, sometimes hackers or malicious actors spot the vulnerability before the software developers do. While the vulnerability is still open, attackers can write and implement a code to take advantage of it. This is known as exploit code.

The exploit code may lead to the software users being victimized – for example, through identity theft or other forms of cybercrime. Once attackers identify a zero-day vulnerability, they need a way of reaching the vulnerable system. They often do this through a socially engineered email – i.e., an email or other message that is supposedly from a known or legitimate correspondent but is actually from an attacker. The message tries to convince a user to perform an action like opening a file or visiting a malicious website. Doing so downloads the attacker’s malware, which infiltrates the user’s files and steals confidential data.

When a vulnerability becomes known, the developers try to patch it to stop the attack. However, security vulnerabilities are often not discovered straight away. It can sometimes take days, weeks, or even months before developers identify the vulnerability that led to the attack. And even once a zero-day patch is released, not all users are quick to implement it. In recent years, hackers have been faster at exploiting vulnerabilities soon after discovery.

Exploits can be sold on the [dark web](https://www.kaspersky.com/resource-center/threats/deep-web) for large sums of money. Once an exploit is discovered and patched, it’s no longer referred to as a zero-day threat.

Zero-day attacks are especially dangerous because the only people who know about them are the attackers themselves. Once they have infiltrated a network, criminals can either attack immediately or sit and wait for the most advantageous time to do so.

## **Who carries out zero day attacks?**

Malicious actors who carry out zero-day attacks fall into different categories, depending on their motivation. For example:

- **Cybercriminals** – hackers whose motivation is usually financial gain
- **Hacktivists** – hackers motivated by a political or social cause who want the attacks to be visible to draw attention to their cause
- **Corporate espionage** – hackers who spy on companies to gain information about them
- **Cyberwarfare** – countries or political actors spying on or attacking another country''s cyberinfrastructure

## **Who are the targets for zero-day exploits?**

A zero-day hack can exploit vulnerabilities in a variety of systems, including:

- Operating systems
- Web browsers
- Office applications
- Open-source components
- Hardwareand firmware
- Internet of Things (IoT)

As a result, there is a broad range of potential victims:

- Individuals who use a vulnerable system, such as a browser or operating system Hackers can use security vulnerabilities to compromise devices and build large [botnets](https://www.kaspersky.com/resource-center/threats/botnet-attacks)
- Individuals with access to valuable business data, such as intellectual property
- Hardware devices, firmware, and the Internet of Things
- Large businesses and organizations
- Government agencies
- Political targets and/or national security threats

It''s helpful to think in terms of targeted versus non-targeted zero-day attacks:

- Targeted zero-day attacks are carried out against potentially valuable targets – such as large organizations, government agencies, or high-profile individuals.
- Non-targeted zero-day attacks are typically waged against users of vulnerable systems, such as an operating system or browser.

Even when attackers are not targeting specific individuals, large numbers of people can still be affected by zero-day attacks, usually as collateral damage. Non-targeted attacks aim to capture as many users as possible, meaning that the average user’s data could be affected.

## **How to identify zero-day attacks**

Because zero-day vulnerabilities can take multiple forms – such as missing data encryption, missing authorizations, broken algorithms, bugs, problems with password security, and so on – they can be challenging to detect. Due to the nature of these types of vulnerabilities, detailed information about zero-day exploits is available only after the exploit is identified.

Organizations that are attacked by a zero-day exploit might see unexpected traffic or suspicious scanning activity originating from a client or service. Some of the zero-day detection techniques include:

- Using existing databases of malware and how they behave as a reference. Although these databases are updated very quickly and can be useful as a reference point, by definition, zero-day exploits are new and unknown. So there’s a limit to how much an existing database can tell you.
- Alternatively, some techniques look for zero-day malware characteristics based on how they interact with the target system. Rather than examining the code of incoming files, this technique looks at the interactions they have with existing software and tries to determine if they result from malicious actions.
- Increasingly, machine learning is used to detect data from previously recorded exploits to establish a baseline for safe system behavior based on data of past and current interactions with the system. The more data which is available, the more reliable detection becomes.

Often, a hybrid of different detection systems is used.

## **Examples of zero-day attacks**

Some recent examples of zero-day attacks include:

### **2021: Chrome zero-day vulnerability**

In 2021, Google''s Chrome suffered a series of zero-day threats, [causing Chrome to issue updates](https://chromereleases.googleblog.com/2021/04/stable-channel-update-for-desktop_20.html). The vulnerability stemmed from a bug in the V8 JavaScript engine used in the web browser.

### **2020: Zoom**

[A vulnerability was found in the popular video conferencing platform](https://www.darkreading.com/vulnerabilities---threats/zoom-patches-zero-day-vulnerability-in-windows-7/d/d-id/1338331). This zero-day attack example involved hackers accessing a user’s PC remotely if they were running an older version of Windows. If the target was an administrator, the hacker could completely take over their machine and access all their files.

### **2020: Apple iOS**

Apple’s iOS is often described as the most secure of the major smartphone platforms. However, in 2020, it fell victim to at least two sets of iOS zero-day vulnerabilities, including a zero-day bug that allowed attackers to compromise iPhones remotely.

### **2019: Microsoft Windows, Eastern Europe**

This attack focused on local escalation privileges, a vulnerable part of Microsoft Windows, and targeted government institutions in Eastern Europe. The zero-day exploit abused a local privilege vulnerability in Microsoft Windows to run arbitrary code and install applications and view and change the data on compromised applications. Once the attack was identified and reported to the Microsoft Security Response Center, a patch was developed and rolled out.

### **2017: Microsoft Word**

This zero-day exploit compromised personal bank accounts. Victims were people who unwittingly opened a malicious Word document. The document displayed a "load remote content" prompt, showing users a pop-up window that requested external access from another program. When victims clicked "yes," the document installed malware on their device, which was able to capture banking log-in credentials.

### [**Stuxnet**](/glossary/stuxnet-attack-on-iran-s-nuclear-enrichment-program)

One of the most famous examples of a zero-day attack was Stuxnet. First discovered in 2010 but with roots that spread back to 2005, this malicious computer worm affected manufacturing computers running programmable logic controller (PLC) software. The primary target was Iran''s uranium enrichment plants to disrupt the country''s nuclear program. The worm infected the PLCs through vulnerabilities in Siemens Step7 software, causing the PLCs to carry out unexpected commands on assembly-line machinery. The story of Stuxnet was subsequently made into a documentary called Zero Days.

## **How to protect yourself against zero-day attacks**

For zero-day protection and to keep your computer and data safe, it’s essential for both individuals and organizations to follow cyber security best practices. This includes:

- **Keep all software and operating systems up to date.** This is because the vendors include security patches to cover newly identified vulnerabilities in new releases. Keeping up to date ensures you are more secure.
- **Use only essential applications.** The more software you have, the more potential vulnerabilities you have. You can reduce the risk to your network by using only the applications you need.
- **Use a firewall.** A firewall plays an essential role in protecting your system against zero-day threats. You can ensure maximum protection by configuring it to allow only necessary transactions.
- **Within organizations, educate users.** Many zero-day attacks capitalize on human error. Teaching employees and users good safety and security habits will help keep them safe online and protect organizations from zero-day exploits and other digital threats.
- **Use a comprehensive antivirus software solution.**

---

Source: [kaspersky.com](https://www.kaspersky.com/resource-center/definitions/zero-day-exploit)', 'geo', 'zero-day-attack'),
  ('Área de Livre Comércio das Américas (ALCA)', 'A Área de Livre Comércio das Américas (ALCA) foi um projeto de bloco econômico proposto pelos Estados Unidos em 1994 para eliminar barreiras alfandegárias entre 34 países do continente americano, com exceção de Cuba.

**O que foi a ALCA**

- **Proposta:** Apresentada pelo presidente norte-americano George H. W. Bush na Cúpula das Américas em Miami, em dezembro de 1994.
- **Objetivo:** Criar uma zona de livre circulação de mercadorias, serviços e investimentos de forma gradual.
- **Abrangência:** Todos os países do continente, menos Cuba, devido a divergências políticas e ideológicas com os Estados Unidos.

**Por que o projeto não foi criado**

- **Resistência latino-americana:** Havia o temor de que as indústrias locais da América Latina não resistissem à concorrência desigual com a economia dos Estados Unidos.
- **Posição do Brasil:** O governo brasileiro, fortalecendo o Mercosul, adotou uma postura defensiva nas negociações e exigiu o fim dos subsídios agrícolas americanos antes de avançar no acordo.
- **Fim das negociações:** O projeto perdeu força política e foi paralisado em novembro de 2005, durante a Cúpula das Américas em Mar del Plata, na Argentina.

---

Source: [pt.wikipedia.org](https://pt.wikipedia.org/wiki/%C3%81rea_de_Livre-Com%C3%A9rcio_das_Am%C3%A9ricas)', 'geo', 'area-de-livre-comercio-das-americas-alca');

update public.concha_terms c
   set term = g.term, slug = g.slug, definition = g.definition, category = g.category, published = true
  from gl_import g
 where c.kind = 'glossary'
   and (c.slug = g.slug or lower(public.unaccent_simple(c.term)) = lower(public.unaccent_simple(g.term))
        or (char_length(c.term) >= 40 and replace(public.term_slug(g.term), '-', '') like replace(public.term_slug(c.term), '-', '') || '%'));

insert into public.concha_terms (kind, term, slug, definition, category, published)
select 'glossary', g.term, g.slug, g.definition, g.category, true
  from gl_import g
 where not exists (
   select 1 from public.concha_terms c
    where c.kind = 'glossary'
      and (c.slug = g.slug or lower(public.unaccent_simple(c.term)) = lower(public.unaccent_simple(g.term))
           or (char_length(c.term) >= 40 and replace(public.term_slug(g.term), '-', '') like replace(public.term_slug(c.term), '-', '') || '%')));

drop table gl_import;
