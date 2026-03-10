import { useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { Trophy, Star } from 'lucide-react-native';
import MainLayout from '../../layouts/MainLayout';
import Header from '../../components/Header';

import CustomCard from '../../components/CustomCard';
import AlertModal from '../../components/AlertModal';

const clubes = [
  {
    id: '1',
    nome: 'Flamengo',
    descricao: 'Clube de Regatas do Flamengo, sediado no Rio de Janeiro. Dono da maior torcida do Brasil.',
    conquista: '4x Copa Libertadores da América',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQFBGyZ4cDjwpcrS2-WlB7tLh5arhdIhSe4w&s',
    historia: 'O Flamengo conquistou a América em 1981 com a geração de Zico, repetindo o feito de forma épica em 2019 com Gabigol, e garantindo o tricampeonato em 2022 em Guayaquil. Em 2025, o Flamengo conquista sua quarta Copa Libertadores da América, garantindo título de rei do Brasil.',
    isFavorited: false,
  },
  {
    id: '2',
    nome: 'Cruzeiro',
    descricao: 'Cruzeiro Esporte Clube, gigante de Minas Gerais e o maior campeão da Copa do Brasil.',
    conquista: '6x Campeão da Copa do Brasil',
    logo: 'https://i0.wp.com/perspectivabr.wordpress.com/wp-content/uploads/2020/09/9b8500bb38d88f03d1b52f976499b87b.jpg?fit=1200%2C1200&ssl=1',
    historia: 'O Cruzeiro é conhecido como o Rei de Copas. Suas seis conquistas da Copa do Brasil (1993, 1996, 2000, 2003, 2017 e 2018) estabeleceram o clube como um dos mais letais em torneios de mata-mata no continente.',
    isFavorited: false,
  },
  {
    id: '3',
    nome: 'São Paulo',
    descricao: 'São Paulo Futebol Clube. Conhecido como Soberano, é um dos clubes mais vitoriosos do mundo.',
    conquista: '3x Campeão Mundial de Clubes',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqvGKXjzKlDDy_piRDjSkWEqaVVtHEkxSNaQ&s',
    historia: 'O Tricolor Paulista dominou o mundo com o esquadrão de Telê Santana vencendo o Barcelona (1992) e o Milan (1993), e repetiu o feito contra o Liverpool em 2005 com uma atuação memorável de Rogério Ceni.',
    isFavorited: false,
  },
  {
    id: '4',
    nome: 'Palmeiras',
    descricao: 'Sociedade Esportiva Palmeiras. O Maior Campeão do Brasil com vasta coleção de títulos nacionais.',
    conquista: '12x Campeão Brasileiro',
    logo: 'https://lncimg.lance.com.br/cdn-cgi/image/width=1280,height=720,quality=75,fit=cover,format=webp/uploads/2024/09/escudo-palmeiras-aspect-ratio-512-320.jpg',
    historia: 'O Palmeiras ostenta a marca histórica de ser o clube com mais títulos do Campeonato Brasileiro, somando conquistas desde a época da Taça Brasil e Robertão até o domínio na era dos pontos corridos recente.',
    isFavorited: false,
  },
  {
    id: '5',
    nome: 'Santos',
    descricao: 'Santos Futebol Clube, o time que parou uma guerra e revelou o Rei do Futebol.',
    conquista: '2x Campeão Mundial de Clubes',
    logo: 'https://i.pinimg.com/736x/9c/db/98/9cdb98b258c176d4ae053c4dc28c11fc.jpg',
    historia: 'Liderado por Pelé, o esquadrão do Santos encantou o planeta na década de 1960, conquistando o mundo em 1962 contra o Benfica e em 1963 contra o Milan, tornando-se o orgulho do futebol brasileiro.',
    isFavorited: false,
  },
  {
    id: '6',
    nome: 'Corinthians',
    descricao: 'Sport Club Corinthians Paulista, o Time do Povo. Famoso por sua torcida apaixonada (Fiel).',
    conquista: '2x Campeão Mundial da FIFA',
    logo: 'https://a-static.mlcdn.com.br/%7Bw%7Dx%7Bh%7D/molde-abs-15mm-time-brasao-escudo-corinthians-garden/gardenforma/2e2f9c90fedf11ef8e9142010a4808f6/6a2dd0833ef0752346b1e1171aedc8a5.jpeg',
    historia: 'O Corinthians venceu o primeiro Mundial de Clubes organizado pela FIFA em 2000 no Brasil, e repetiu a glória em 2012 no Japão, derrotando o poderoso Chelsea com gol do peruano Paolo Guerrero.',
    isFavorited: false,
  },
  {
    id: '7',
    nome: 'Grêmio',
    descricao: 'Grêmio Foot-Ball Porto Alegrense. Clube de raça, técnica e imortalidade nos pampas.',
    conquista: '3x Copa Libertadores da América',
    logo: 'https://i.pinimg.com/736x/22/dc/6e/22dc6e4b5b64ecffeb736826c38e0d9f.jpg',
    historia: 'O Tricolor Gaúcho conquistou a América sob a batuta de Renato Gaúcho como jogador em 1983, repetiu com Felipão em 1995, e viu Renato voltar como treinador para garantir o tri em 2017.',
    isFavorited: false,
  },
  {
    id: '8',
    nome: 'Internacional',
    descricao: 'Sport Club Internacional, o Clube do Povo, único campeão brasileiro invicto.',
    conquista: '1x Campeão Mundial de Clubes FIFA',
    logo: 'https://i.pinimg.com/736x/73/f4/86/73f486b88f68268112e11d6be754aa63.jpg',
    historia: 'O Inter alcançou o auge de sua história em 2006, ao derrotar o temido Barcelona de Ronaldinho Gaúcho no Japão, com o lendário gol de Adriano Gabiru que parou o Rio Grande do Sul.',
    isFavorited: false,
  },
  {
    id: '9',
    nome: 'Vasco da Gama',
    descricao: 'Club de Regatas Vasco da Gama. Gigante da Colina com uma história de luta e inclusão social.',
    conquista: '1x Copa Libertadores da América',
    logo: 'https://images.tcdn.com.br/img/img_prod/1006590/ima_vasco_escudo_4457_1_6d494837b6bf2208557274b0beb9a257.jpg',
    historia: 'No ano de seu centenário, em 1998, o Vasco coroou sua história vencendo a Libertadores. Com um time que tinha astros como Juninho Pernambucano e Luizão, bateram o Barcelona de Guayaquil na final.',
    isFavorited: false,
  },
  {
    id: '10',
    nome: 'Fluminense',
    descricao: 'Fluminense Football Club. O Tricolor das Laranjeiras, berço do futebol carioca.',
    conquista: '1x Copa Libertadores da América',
    logo: 'https://i.pinimg.com/736x/c9/ab/78/c9ab7885e1624819c98f73584f349334.jpg',
    historia: 'Após anos de espera e uma final traumática em 2008, o Fluminense finalmente abraçou a glória eterna em 2023, vencendo o Boca Juniors no Maracanã e escrevendo o capítulo mais lindo de sua história.',
    isFavorited: false,
  },
];

export default function Atividade2Screen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedClub, setSelectedClub] = useState<{ nome: string; historia: string } | null>(null);
  const [clubs, setClubs] = useState(clubes);

  const handleOpenHistory = (clube: typeof clubes[0]) => {
    setSelectedClub({ nome: clube.nome, historia: clube.historia });
    setModalVisible(true);
  };

  const handleStarPress = (id: string) => {
    setClubs((prevClubs) =>
      prevClubs.map((clube) =>
        clube.id === id ? { ...clube, isFavorited: !clube.isFavorited } : clube
      )
    );
  };

  const getDynamicStarIcon = (isFavorited: boolean) => {
    return ({ size, color }: any) => (
      <Star
        size={size}
        color={isFavorited ? '#eab308' : color}
        fill={isFavorited ? '#eab308' : 'transparent'}
      />
    );
  };

  return (
    <>
      <AlertModal
        isOpen={modalVisible}
        onClose={() => setModalVisible(false)}
        title={`A Glória do ${selectedClub?.nome}`}
        message={selectedClub?.historia}
        buttonText="Fechar História"
      />
      <View style={{ flex: 1 }}>
        <Header 
          title="Catálogo" 
          subtitle="Gigantes do Brasil" 
          icon={Trophy} 
          iconColor="#ca8a04" 
          iconBgColor="#fef08a" 
        />
        <FlatList
          data={clubs}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item }) => (
            <CustomCard
              title={item.nome}
              description={item.descricao}
              image={item.logo}
              subDescription={item.conquista}
              subIcon={Trophy}
              bottomButtonText="Ler História da Conquista"
              onPressBottom={() => handleOpenHistory(item)}
              rightIcon={getDynamicStarIcon(item.isFavorited)}
              onPressRight={() => handleStarPress(item.id)}
            />
          )}
        />
      </View>
    </>
  );
}