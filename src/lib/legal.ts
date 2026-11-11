/**
 * Sereya Tech's Privacy Policy and Terms of Use, in English and Portuguese.
 * Written to follow Brasil's LGPD (Lei 13.709/2018), Marco Civil da Internet
 * (Lei 12.965/2014) and Código de Defesa do Consumidor. Have a lawyer review
 * before relying on them. Formatting uses Sereya's text marks (## titles, **bold**, - lists).
 */

export const LEGAL_UPDATED = { en: "9 November 2026", pt: "9 de novembro de 2026" };
/** Where people send privacy requests. Change it here and every page follows. */
export const LEGAL_EMAIL = "privacidade@sereya.tech";

export const PRIVACY = {
  en: `Sereya Tech is a trend research platform. This policy explains, in plain words, which personal data we collect when you use sereya.tech, why, who else handles it, how long we keep it and how you can exercise your rights under Brasil's General Data Protection Law (LGPD, Lei nº 13.709/2018).

## 1. Who is responsible for your data

The controller of your personal data is **Yasmim Seadi**, the founder of Sereya Tech (a trademark registered at INPI), based in Brasil. Yasmim also acts as the person in charge of data protection (the *encarregada*, art. 41 of the LGPD).

Contact for anything about your data: **${LEGAL_EMAIL}**

## 2. What we collect

**Data you give us**
- **Account:** your name, email address and password. The password is stored only in encrypted (hashed) form; nobody at Sereya can read it.
- **Profile:** your bio, the categories and regions you chose to follow and, if you add one, your profile photo.
- **What you do on the platform:** your comments and replies, your likes, the signals you save and your invite code when you join.
- **Messages** you send us by email.

**Data collected automatically**
- **Session cookies** that keep you logged in. They are strictly necessary: without them the login does not work. We do not use advertising or tracking cookies, and we do not use analytics tools that follow you across sites.
- **Technical records** (IP address, date and time of access, browser and device type) kept by our hosting providers for security and to keep the service running.

We do not collect sensitive personal data (art. 5, II of the LGPD) on purpose. Please do not share it in comments.

## 3. Why we use it and on which legal basis

| **Purpose** | **Legal basis (LGPD)** |
| --- | --- |
| Create and run your account, let you log in, comment, like and save signals | Performance of a contract you are part of (art. 7, V) |
| Show your name, photo and comments to other members | Performance of a contract (art. 7, V) |
| Choose the signals that match the interests you picked | Performance of a contract (art. 7, V) |
| Keep the platform secure, prevent abuse and fraud, fix errors | Legitimate interest (art. 7, IX) |
| Keep access records required by law and defend rights in legal proceedings | Legal obligation (art. 7, II) and regular exercise of rights (art. 7, VI) |
| Answer your requests and messages | Performance of a contract (art. 7, V) or legitimate interest (art. 7, IX) |

We never sell your personal data and we do not use it for advertising.

## 4. Who else handles your data

We rely on a few trusted providers (operators, in LGPD terms) who process data only on our instructions:
- **Supabase**: database, login and file storage (your account, profile, photo, comments).
- **Vercel**: website hosting and delivery.
- **Google Fonts**: serves the platform's typeface, so your browser connects to Google's servers and shares your IP address with them.
- **News sources' websites**: some signals show photos loaded directly from the original publisher's site, which then receives your IP address like any visit to that site.

We may also share data when required by law, by a court order or by a competent authority, or to defend Sereya's rights.

## 5. International transfer

Supabase, Vercel and Google may store or process data on servers outside Brasil, including in the United States. These transfers are made under art. 33 of the LGPD, relying on the contractual safeguards and security commitments these providers offer.

## 6. How long we keep it

- **Account and profile data:** while your account is active. When you ask us to delete your account, we delete or anonymize your data within 15 days, except what the law requires us to keep.
- **Comments:** while your account is active. When it is deleted, your comments are deleted with it.
- **Access records:** up to 6 months, as the Marco Civil da Internet (art. 15) requires of application providers.
- **Backups** made by our providers are overwritten in their normal cycles.

## 7. Your rights

Under art. 18 of the LGPD you can, at any time and free of charge:
- confirm whether we process your data and access it;
- correct incomplete, inaccurate or outdated data (you can also do it yourself in **Settings**);
- ask for anonymization, blocking or deletion of unnecessary or excessive data;
- ask for portability of your data to another service;
- ask for deletion of your data and of your account;
- know with whom we share your data;
- withdraw consent where processing is based on it, and be told what that means;
- object to processing based on legitimate interest.

Write to **${LEGAL_EMAIL}** from the email of your account. We answer within 15 days. You may also complain to Brasil's data protection authority, the **ANPD** (www.gov.br/anpd).

## 8. Security

Your data travels encrypted (HTTPS), passwords are hashed, and database rules make sure each member can only change their own data. No system is completely safe: if an incident may cause you relevant risk or harm, we will tell you and the ANPD, as art. 48 of the LGPD requires.

## 9. Children and teenagers

Sereya is meant for people aged **18 or over**. We do not knowingly collect data from children. If you believe a child has created an account, write to us and we will delete it.

## 10. Changes to this policy

We may update this policy as Sereya grows (for example, if paid plans are launched). We will post the new version here with its date and, for important changes, let members know on the platform or by email before they take effect.`,

  pt: `A Sereya Tech é uma plataforma de pesquisa de tendências. Esta política explica, em palavras simples, quais dados pessoais coletamos quando você usa o sereya.tech, para quê, com quem compartilhamos, por quanto tempo guardamos e como você pode exercer seus direitos pela Lei Geral de Proteção de Dados (LGPD, Lei nº 13.709/2018).

## 1. Quem é responsável pelos seus dados

A controladora dos seus dados pessoais é **Yasmim Seadi**, fundadora da Sereya Tech (marca registrada no INPI), no Brasil. Yasmim também é a encarregada pelo tratamento de dados pessoais (art. 41 da LGPD).

Contato para qualquer assunto sobre seus dados: **${LEGAL_EMAIL}**

## 2. O que coletamos

**Dados que você nos dá**
- **Conta:** seu nome, e-mail e senha. A senha fica guardada apenas de forma criptografada (hash); ninguém na Sereya consegue lê-la.
- **Perfil:** sua bio, as categorias e regiões que você escolheu acompanhar e, se você adicionar, sua foto de perfil.
- **O que você faz na plataforma:** seus comentários e respostas, curtidas, os sinais que você salva e o código de convite usado no cadastro.
- **Mensagens** que você nos envia por e-mail.

**Dados coletados automaticamente**
- **Cookies de sessão** que mantêm você conectada(o). São estritamente necessários: sem eles o login não funciona. Não usamos cookies de publicidade ou rastreamento, nem ferramentas de análise que sigam você por outros sites.
- **Registros técnicos** (endereço IP, data e hora de acesso, tipo de navegador e dispositivo) guardados pelos nossos provedores de hospedagem, para segurança e funcionamento do serviço.

Não coletamos de propósito dados pessoais sensíveis (art. 5º, II, da LGPD). Por favor, não os compartilhe nos comentários.

## 3. Para que usamos e com qual base legal

| **Finalidade** | **Base legal (LGPD)** |
| --- | --- |
| Criar e manter sua conta, permitir login, comentários, curtidas e sinais salvos | Execução de contrato do qual você é parte (art. 7º, V) |
| Mostrar seu nome, foto e comentários a outros membros | Execução de contrato (art. 7º, V) |
| Escolher os sinais que combinam com os interesses que você marcou | Execução de contrato (art. 7º, V) |
| Manter a plataforma segura, evitar abusos e fraudes, corrigir erros | Legítimo interesse (art. 7º, IX) |
| Guardar registros de acesso exigidos por lei e defender direitos em processos | Cumprimento de obrigação legal (art. 7º, II) e exercício regular de direitos (art. 7º, VI) |
| Responder seus pedidos e mensagens | Execução de contrato (art. 7º, V) ou legítimo interesse (art. 7º, IX) |

Nunca vendemos seus dados pessoais e não os usamos para publicidade.

## 4. Com quem seus dados são compartilhados

Contamos com alguns fornecedores de confiança (operadores, nos termos da LGPD), que tratam dados apenas conforme nossas instruções:
- **Supabase**: banco de dados, login e armazenamento de arquivos (sua conta, perfil, foto e comentários).
- **Vercel**: hospedagem e entrega do site.
- **Google Fonts**: fornece a fonte da plataforma; seu navegador se conecta aos servidores do Google e compartilha seu endereço IP com eles.
- **Sites das fontes de notícias**: alguns sinais mostram fotos carregadas diretamente do site do veículo original, que recebe seu endereço IP como em qualquer visita a ele.

Também podemos compartilhar dados quando a lei, uma ordem judicial ou uma autoridade competente exigir, ou para defender os direitos da Sereya.

## 5. Transferência internacional

Supabase, Vercel e Google podem armazenar ou tratar dados em servidores fora do Brasil, inclusive nos Estados Unidos. Essas transferências são feitas com base no art. 33 da LGPD, apoiadas nas garantias contratuais e compromissos de segurança oferecidos por esses fornecedores.

## 6. Por quanto tempo guardamos

- **Dados de conta e perfil:** enquanto sua conta estiver ativa. Quando você pedir a exclusão da conta, apagamos ou anonimizamos seus dados em até 15 dias, salvo o que a lei nos obrigar a guardar.
- **Comentários:** enquanto sua conta estiver ativa. Quando ela é excluída, seus comentários são excluídos junto.
- **Registros de acesso:** até 6 meses, como o Marco Civil da Internet (art. 15) exige dos provedores de aplicação.
- **Cópias de segurança** dos fornecedores são sobrescritas nos ciclos normais deles.

## 7. Seus direitos

Pelo art. 18 da LGPD, você pode, a qualquer momento e de graça:
- confirmar se tratamos seus dados e acessá-los;
- corrigir dados incompletos, inexatos ou desatualizados (também dá para fazer você mesma(o) em **Settings**);
- pedir anonimização, bloqueio ou eliminação de dados desnecessários ou excessivos;
- pedir a portabilidade dos seus dados para outro serviço;
- pedir a eliminação dos seus dados e da sua conta;
- saber com quem compartilhamos seus dados;
- revogar o consentimento, quando o tratamento se basear nele, e saber as consequências disso;
- se opor a tratamentos baseados em legítimo interesse.

Escreva para **${LEGAL_EMAIL}** a partir do e-mail da sua conta. Respondemos em até 15 dias. Você também pode reclamar à Autoridade Nacional de Proteção de Dados, a **ANPD** (www.gov.br/anpd).

## 8. Segurança

Seus dados trafegam criptografados (HTTPS), as senhas são guardadas com hash e regras no banco de dados garantem que cada membro só altere os próprios dados. Nenhum sistema é totalmente seguro: se um incidente puder trazer risco ou dano relevante a você, avisaremos você e a ANPD, como manda o art. 48 da LGPD.

## 9. Crianças e adolescentes

A Sereya é feita para pessoas com **18 anos ou mais**. Não coletamos dados de crianças de forma consciente. Se você acredita que uma criança criou uma conta, escreva para nós e vamos excluí-la.

## 10. Mudanças nesta política

Podemos atualizar esta política conforme a Sereya cresce (por exemplo, se lançarmos planos pagos). A nova versão será publicada aqui com a data e, em mudanças importantes, avisaremos os membros na plataforma ou por e-mail antes de valerem.`,
};

export const TERMS = {
  en: `Welcome to Sereya Tech. These Terms of Use are the agreement between you and **Yasmim Seadi**, the founder of Sereya Tech, for the use of the platform at sereya.tech. By creating an account or using the platform, you agree to them and to our [Privacy Policy](/privacy). If you do not agree, please do not use Sereya.

## 1. What Sereya is

Sereya Tech is a trend research and foresight platform. It gathers signals (news, essays and reports) from sources around the world, organizes them into categories, and adds Yasmim's own analysis, glossary and readings. Members can comment, like and save signals.

## 2. Who can use it

- You must be **18 or older** and able to enter into this agreement.
- While Sereya is being tested, new accounts need an **invite code**.
- The information you give when joining must be true, and you must keep it up to date.

## 3. Your account

- You are responsible for keeping your password secret and for everything done with your account. Tell us at once at **${LEGAL_EMAIL}** if you suspect someone else is using it.
- One account per person. Accounts are personal and cannot be sold or transferred.

## 4. Price

Sereya is **free** for now. If paid plans are introduced, we will say so clearly beforehand, with prices and conditions, and nothing will be charged without your express agreement.

## 5. Rules for comments and conduct

Sereya is a space for curious, respectful conversation. When you comment or interact, you agree **not** to:
- post content that is illegal, hateful, discriminatory, violent, harassing, threatening or that incites any of these;
- share other people's personal data without permission, or impersonate anyone;
- post spam, advertising, malicious links or code;
- infringe copyright, trademarks or other rights of third parties;
- try to break, overload, scrape at scale or get around the platform's security, or access accounts and data that are not yours.

You are responsible for what you post. We may remove content that breaks these rules or the law, and suspend or close accounts that do so, in proportion to the seriousness of the case. Whenever reasonable, we will tell you why.

## 6. Your content

Your comments remain **yours**. By posting them, you give Sereya a free, non-exclusive licence to store, display and reproduce them on the platform, for as long as they are online, so that other members can read them. If you delete a comment or your account, the licence ends, except for copies already kept as required by law.

## 7. Sereya's content

The texts written by Yasmim (takes, glossary, readings, category descriptions), the visual identity, the "Sereya Tech" brand (registered at INPI) and the platform's software belong to Yasmim Seadi or are licensed to her. You may read them, share links to them and quote short excerpts with credit to Sereya Tech. Copying, republishing or using them commercially requires written permission.

## 8. Third-party content and sources

Signals come from third-party publishers and always credit and link to the original source. Rights in that material belong to its authors and publishers. If you hold rights to something published on Sereya and want it removed or corrected, write to **${LEGAL_EMAIL}** with the link and proof of your rights, and we will act promptly.

Links to other websites are offered for your convenience; we are not responsible for their content or their privacy practices.

## 9. Information, not advice

Sereya offers research, analysis and opinion about trends and future scenarios. It is **not** legal, financial, investment, medical or other professional advice. Decisions you make based on the content are your own responsibility.

## 10. Availability and changes to the service

We work to keep Sereya online and working well, but it may have interruptions for maintenance, updates or reasons beyond our control. Features may change, be added or be removed over time.

## 11. Liability

Nothing in these terms limits the rights you have as a consumer under the Código de Defesa do Consumidor. To the extent the law allows, Sereya is not responsible for content posted by members or third parties (art. 19 of the Marco Civil da Internet), nor for damage caused by interruptions or events beyond its reasonable control.

## 12. Ending your use

You can stop using Sereya and ask for your account to be deleted at any time by writing to **${LEGAL_EMAIL}**. We may suspend or close accounts that seriously or repeatedly break these terms or the law.

## 13. Changes to these terms

We may update these terms. The new version will be posted here with its date and, for important changes, members will be told in advance. If you keep using Sereya after the changes take effect, you accept the new version.

## 14. Law and jurisdiction

These terms are governed by the laws of Brasil. Any dispute will be settled in the courts of the consumer's domicile, as the Código de Defesa do Consumidor provides. Before going to court, write to us: most things can be solved in a conversation.`,

  pt: `Boas-vindas à Sereya Tech. Estes Termos de Uso são o acordo entre você e **Yasmim Seadi**, fundadora da Sereya Tech, para o uso da plataforma em sereya.tech. Ao criar uma conta ou usar a plataforma, você concorda com eles e com a nossa [Política de Privacidade](/privacy). Se não concordar, por favor não use a Sereya.

## 1. O que é a Sereya

A Sereya Tech é uma plataforma de pesquisa de tendências e foresight. Ela reúne sinais (notícias, ensaios e relatórios) de fontes do mundo todo, organiza em categorias e soma a análise, o glossário e as leituras da própria Yasmim. Membros podem comentar, curtir e salvar sinais.

## 2. Quem pode usar

- Você precisa ter **18 anos ou mais** e capacidade para aceitar este acordo.
- Enquanto a Sereya está em teste, novas contas precisam de um **código de convite**.
- As informações que você dá no cadastro devem ser verdadeiras e mantidas atualizadas.

## 3. Sua conta

- Você é responsável por manter sua senha em segredo e por tudo o que for feito com sua conta. Avise imediatamente em **${LEGAL_EMAIL}** se suspeitar que outra pessoa está usando.
- Uma conta por pessoa. Contas são pessoais e não podem ser vendidas nem transferidas.

## 4. Preço

Por enquanto a Sereya é **gratuita**. Se planos pagos forem criados, avisaremos com clareza e antecedência, com preços e condições, e nada será cobrado sem a sua concordância expressa.

## 5. Regras para comentários e convivência

A Sereya é um espaço de conversa curiosa e respeitosa. Ao comentar ou interagir, você concorda em **não**:
- publicar conteúdo ilegal, de ódio, discriminatório, violento, de assédio, ameaça ou que incentive qualquer um desses;
- compartilhar dados pessoais de outras pessoas sem autorização, ou se passar por outra pessoa;
- publicar spam, propaganda, links ou códigos maliciosos;
- violar direitos autorais, marcas ou outros direitos de terceiros;
- tentar quebrar, sobrecarregar, extrair dados em massa ou burlar a segurança da plataforma, ou acessar contas e dados que não são seus.

Você é responsável pelo que publica. Podemos remover conteúdos que violem estas regras ou a lei, e suspender ou encerrar contas que o façam, de forma proporcional à gravidade do caso. Sempre que for razoável, explicaremos o motivo.

## 6. O seu conteúdo

Seus comentários continuam **seus**. Ao publicá-los, você dá à Sereya uma licença gratuita e não exclusiva para armazenar, exibir e reproduzir esse conteúdo na plataforma, enquanto ele estiver no ar, para que outros membros possam ler. Se você apagar um comentário ou sua conta, a licença termina, salvo cópias que a lei obrigue a guardar.

## 7. O conteúdo da Sereya

Os textos escritos pela Yasmim (análises, glossário, leituras, descrições de categorias), a identidade visual, a marca "Sereya Tech" (registrada no INPI) e o software da plataforma pertencem a Yasmim Seadi ou são licenciados a ela. Você pode ler, compartilhar links e citar trechos curtos com crédito à Sereya Tech. Copiar, republicar ou usar comercialmente exige autorização por escrito.

## 8. Conteúdo de terceiros e fontes

Os sinais vêm de veículos de terceiros e sempre trazem crédito e link para a fonte original. Os direitos sobre esse material pertencem aos seus autores e editores. Se você é titular de direitos sobre algo publicado na Sereya e quer que seja removido ou corrigido, escreva para **${LEGAL_EMAIL}** com o link e a comprovação dos seus direitos, e agiremos com rapidez.

Links para outros sites são oferecidos por conveniência; não somos responsáveis pelo conteúdo nem pelas práticas de privacidade deles.

## 9. Informação, não aconselhamento

A Sereya oferece pesquisa, análise e opinião sobre tendências e cenários futuros. **Não** é aconselhamento jurídico, financeiro, de investimentos, médico ou de outra natureza profissional. As decisões que você tomar com base no conteúdo são de sua responsabilidade.

## 10. Disponibilidade e mudanças no serviço

Trabalhamos para manter a Sereya no ar e funcionando bem, mas podem ocorrer interrupções para manutenção, atualizações ou por motivos fora do nosso controle. Funcionalidades podem mudar, ser criadas ou retiradas com o tempo.

## 11. Responsabilidade

Nada nestes termos limita os direitos que você tem como consumidora(or) pelo Código de Defesa do Consumidor. Na medida permitida pela lei, a Sereya não responde por conteúdo publicado por membros ou terceiros (art. 19 do Marco Civil da Internet), nem por danos causados por interrupções ou eventos fora do seu controle razoável.

## 12. Encerramento

Você pode parar de usar a Sereya e pedir a exclusão da sua conta a qualquer momento, escrevendo para **${LEGAL_EMAIL}**. Podemos suspender ou encerrar contas que violem estes termos ou a lei de forma grave ou repetida.

## 13. Mudanças nestes termos

Podemos atualizar estes termos. A nova versão será publicada aqui com a data e, em mudanças importantes, os membros serão avisados com antecedência. Se você continuar usando a Sereya depois que as mudanças valerem, estará aceitando a nova versão.

## 14. Lei e foro

Estes termos seguem as leis do Brasil. Qualquer conflito será resolvido no foro do domicílio da(o) consumidora(or), como prevê o Código de Defesa do Consumidor. Antes de ir à Justiça, fale com a gente: quase tudo se resolve numa conversa.`,
};
