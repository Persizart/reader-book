import { Book } from '../types';

export const dummyBooks: Book[] = [
  {
    id: 'demo1',
    title: 'O Jardim dos Sonhos Perdidos',
    genre: 'Romance',
    description: 'Nas ruelas estreitas de uma cidade esquecida pelo tempo, Sofia descobre que as flores de um velho jardim botânico guardam segredos e fragmentos de memórias de vidas que ela julgava nunca ter vivido. Uma história cativante sobre encontros marcados pelas estrelas.',
    cover: null,
    chapters: [
      {
        title: 'O Primeiro Encontro no Café',
        content: `
          <p>Era uma tarde dourada de outono quando Sofia dobrou a esquina da Rua das Violetas e avistou o Café Vintage. As folhas secas dançavam sob a brisa fresca, criando um farfalhar suave que parecia sussurrar segredos antigos.</p>
          <p>Ela carregava consigo uma velha caderneta de couro marrom, repleta de esboços e anotações confusas. Sofia sempre escrevia. Era sua forma de organizar o caos que, às vezes, inundava sua mente.</p>
          <p>Ao empurrar a porta de vidro, o tilintar sinuoso do sino de bronze foi acompanhado pelo reconfortante aroma de grãos de café moídos na hora e canela. O ambiente estava aconchegante, preenchido por sussurros baixos e pelo som de algumas páginas sendo viradas.</p>
          <blockquote class="italic">"A vida é feita de colisões gentis," ela costumava pensar. E aquela tarde provaria sua tese de forma irrefutável.</blockquote>
          <p>Daniel estava sentado na mesa perto da janela de arco, lutando contra um guarda-chuva teimoso cuja haste parecia definitivamente emperrada. Em sua outra mão, ele equilibrava timidamente uma xícara de louça azul escura, fumegante.</p>
          <p>O sobressalto aconteceu quando Sofia, distraída com o vôo de um pardal do lado de fora, colidiu de leve contra a cadeira de Daniel. O líquido escuro desenhou um mapa caótico na toalha de linho e respingou na manga de sua jaqueta de lã cinza.</p>
          <p>— Ah! Mil desculpas, por favor! Que desastrada eu sou — exclamou Sofia, as bochechas esquentando instantaneamente. Ela começou a procurar freneticamente por lenços de papel em sua bolsa tiracolo.</p>
          <p>Daniel olhou primeiro para a jaqueta, depois para a mesa e, finalmente, focou nos olhos expressivos de Sofia. Em vez de irritação, ele soltou um riso caloroso e musical.</p>
          <p>— Não se preocupe — disse ele, ajeitando os óculos de aros finos. — Honestamente, este café precisava de um pouco de drama artesanal hoje.</p>
        `,
        wordCount: 290
      },
      {
        title: 'O Segredo da Estufa',
        content: `
          <p>Dois dias após o incidente do café desastroso, Sofia encontrou-se em frente aos portões enferrujados do Jardim Botânico Municipal. O lugar estava abandonado há décadas, mas mantinha uma majestade gótica fascinante.</p>
          <p>Entre as roseiras silvestres e as trepadeiras que abraçavam as colunas de ferro fundido, erguia-se a grande estufa de vidro. Suas placas transparentes estavam cobertas por uma fina camada de poeira verde e musgo, filtrando a luz solar em raios esmeralda hipnotizantes.</p>
          <p>Sofia forçou a maçaneta pesada de bronze. Com um gemido metálico, a porta cedeu.</p>
          <p>O ar lá dentro era quente, denso com o aroma de terra molhada e néctar desconhecido. No centro, uma misteriosa flor azul-íris cintilava sob um feixe solitário de luz.</p>
          <p>— Você não devia estar aqui — uma voz familiar soou das sombras.</p>
        `,
        wordCount: 145
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'demo2',
    title: 'As Crônicas do Horizonte Cinza',
    genre: 'Fantasia',
    description: 'No reino divido de Caelum, onde o céu mudou sua cor dourada para um cinza perpétuo, um jovem ferreiro descobre runas enterradas sob as cinzas da antiga forja real. Agora, ele precisará empunhar segredos que dão o poder de manipular as marés de vento.',
    cover: null,
    chapters: [
      {
        title: 'Cinzas e Faíscas',
        content: `
          <p>O fole de couro suspirava pesadamente nas profundezas da velha oficina. Para Kael, o ritmo do ferro batido era a única canção constante restante em Caelum. Do lado de fora, as nuvens opacas cobertas de fuligem ocultavam o grande farol celestial que outrora brilhava com o poder dos deuses.</p>
          <p>— Mais fogo, Kael! — ordenou seu pai, a testa suada brilhando sob as faíscas avermelhadas. — Se o metal esfriar agora, a tempera do aço estará perdida.</p>
          <p>Kael puxou a alavanca com vigor. Ele conhecia cada ranger daquela forja. Mas, sob o solo de pedra queimada da oficina, algo vibrou de forma incomum. Uma pulsação gelada que contrastava com o calor abrasador do carvão.</p>
        `,
        wordCount: 110
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];
