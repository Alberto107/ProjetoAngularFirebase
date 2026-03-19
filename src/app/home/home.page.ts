import { Component } from '@angular/core';
import { AuthenticateService } from '../services/auth.service';
import { CrudService } from '../services/crud.service';
import { Storage, getDownloadURL, ref, uploadBytesResumable } from '@angular/fire/storage';
import { MessageService } from '../services/message.service';
import { Router } from '@angular/router';
import {Livro} from './livro.interface';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  //puxar a interface de livro.interface.ts

livros: Livro[] = [
  {
    isbn: '1001',
    titulo: 'O Código das Estrelas',
    sinopse: 'Mistérios cósmicos e descobertas além da galáxia.',
    paginas: '320',
    data_lancamento: '10/01/2022',
    autor: [{ nome: 'Carlos Silva', email: 'carlos@email.com' }],
    categoria: [{ nome: 'Ficção Científica' }],
    editora: { nome: 'Editora Cosmos', site: 'www.cosmos.com' }
  },
  {
    isbn: '1002',
    titulo: 'Segredos da Mente',
    sinopse: 'Explorando os limites da mente humana.',
    paginas: '280',
    data_lancamento: '05/03/2021',
    autor: [{ nome: 'Ana Souza', email: 'ana@email.com' }],
    categoria: [{ nome: 'Científico' }],
    editora: { nome: 'Editora Saber', site: 'www.saber.com' }
  },
  {
    isbn: '1003',
    titulo: 'A Jornada do Herói',
    sinopse: 'Uma aventura épica cheia de desafios.',
    paginas: '450',
    data_lancamento: '12/07/2020',
    autor: [{ nome: 'Pedro Lima', email: 'pedro@email.com' }],
    categoria: [{ nome: 'Fantasia' }],
    editora: { nome: 'Mundo Fantástico', site: 'www.fantasia.com' }
  },
  {
    isbn: '1004',
    titulo: 'Tecnologia do Futuro',
    sinopse: 'As inovações que vão mudar o mundo.',
    paginas: '390',
    data_lancamento: '22/11/2023',
    autor: [{ nome: 'Juliana Rocha', email: 'ju@email.com' }],
    categoria: [{ nome: 'Tecnologia' }],
    editora: { nome: 'TechBooks', site: 'www.techbooks.com' }
  },
  {
    isbn: '1005',
    titulo: 'Mistério na Floresta',
    sinopse: 'Um crime intrigante em meio à natureza.',
    paginas: '310',
    data_lancamento: '18/06/2019',
    autor: [{ nome: 'Rafael Costa', email: 'rafa@email.com' }],
    categoria: [{ nome: 'Suspense' }],
    editora: { nome: 'DarkHouse', site: 'www.darkhouse.com' }
  },
  {
    isbn: '1006',
    titulo: 'Amor em Paris',
    sinopse: 'Uma história romântica na cidade luz.',
    paginas: '270',
    data_lancamento: '14/02/2018',
    autor: [{ nome: 'Mariana Alves', email: 'mariana@email.com' }],
    categoria: [{ nome: 'Romance' }],
    editora: { nome: 'LoveBooks', site: 'www.lovebooks.com' }
  },
  {
    isbn: '1007',
    titulo: 'O Último Guerreiro',
    sinopse: 'Um guerreiro enfrenta seu destino final.',
    paginas: '500',
    data_lancamento: '30/09/2021',
    autor: [{ nome: 'Bruno Martins', email: 'bruno@email.com' }],
    categoria: [{ nome: 'Ação' }],
    editora: { nome: 'EpicEditora', site: 'www.epic.com' }
  },
  {
    isbn: '1008',
    titulo: 'Cozinha Prática',
    sinopse: 'Receitas simples para o dia a dia.',
    paginas: '150',
    data_lancamento: '11/05/2017',
    autor: [{ nome: 'Fernanda Lima', email: 'fer@email.com' }],
    categoria: [{ nome: 'Culinária' }],
    editora: { nome: 'ChefEditora', site: 'www.chef.com' }
  },
  {
    isbn: '1009',
    titulo: 'História do Brasil',
    sinopse: 'Um panorama completo da história brasileira.',
    paginas: '600',
    data_lancamento: '01/04/2015',
    autor: [{ nome: 'João Pereira', email: 'joao@email.com' }],
    categoria: [{ nome: 'História' }],
    editora: { nome: 'Educação Total', site: 'www.educacao.com' }
  },
  {
    isbn: '1010',
    titulo: 'Marketing Digital na Prática',
    sinopse: 'Estratégias modernas de marketing online.',
    paginas: '350',
    data_lancamento: '20/08/2022',
    autor: [{ nome: 'Lucas Mendes', email: 'lucas@email.com' }],
    categoria: [{ nome: 'Negócios' }],
    editora: { nome: 'BusinessBooks', site: 'www.business.com' }
  },
  {
    isbn: '1011',
    titulo: 'Introdução ao JavaScript',
    sinopse: 'Aprenda JS do básico ao intermediário.',
    paginas: '420',
    data_lancamento: '12/12/2020',
    autor: [{ nome: 'Diego Santos', email: 'diego@email.com' }],
    categoria: [{ nome: 'Programação' }],
    editora: { nome: 'CodePress', site: 'www.codepress.com' }
  },
  {
    isbn: '1012',
    titulo: 'Design Moderno',
    sinopse: 'Conceitos de design para iniciantes.',
    paginas: '210',
    data_lancamento: '09/09/2019',
    autor: [{ nome: 'Patricia Gomes', email: 'pat@email.com' }],
    categoria: [{ nome: 'Design' }],
    editora: { nome: 'CreativeBooks', site: 'www.creative.com' }
  },
  {
    isbn: '1013',
    titulo: 'Finanças Pessoais',
    sinopse: 'Controle seu dinheiro de forma eficiente.',
    paginas: '180',
    data_lancamento: '03/03/2021',
    autor: [{ nome: 'Ricardo Nunes', email: 'ricardo@email.com' }],
    categoria: [{ nome: 'Finanças' }],
    editora: { nome: 'MoneyEditora', site: 'www.money.com' }
  },
  {
    isbn: '1014',
    titulo: 'O Segredo da Motivação',
    sinopse: 'Como manter o foco e alcançar objetivos.',
    paginas: '240',
    data_lancamento: '15/07/2018',
    autor: [{ nome: 'Carla Souza', email: 'carla@email.com' }],
    categoria: [{ nome: 'Autoajuda' }],
    editora: { nome: 'MotivaBooks', site: 'www.motiva.com' }
  },
  {
    isbn: '1015',
    titulo: 'Redes de Computadores',
    sinopse: 'Fundamentos e práticas de redes.',
    paginas: '500',
    data_lancamento: '21/10/2022',
    autor: [{ nome: 'André Lopes', email: 'andre@email.com' }],
    categoria: [{ nome: 'Tecnologia' }],
    editora: { nome: 'NetEditora', site: 'www.net.com' }
  },
  {
    isbn: '1016',
    titulo: 'Inglês para Iniciantes',
    sinopse: 'Aprenda inglês de forma simples.',
    paginas: '300',
    data_lancamento: '05/05/2016',
    autor: [{ nome: 'Sofia Rocha', email: 'sofia@email.com' }],
    categoria: [{ nome: 'Idiomas' }],
    editora: { nome: 'LanguageBooks', site: 'www.lang.com' }
  },
  {
    isbn: '1017',
    titulo: 'Arquitetura Sustentável',
    sinopse: 'Projetos ecológicos e eficientes.',
    paginas: '380',
    data_lancamento: '17/01/2023',
    autor: [{ nome: 'Eduardo Freitas', email: 'edu@email.com' }],
    categoria: [{ nome: 'Arquitetura' }],
    editora: { nome: 'GreenEditora', site: 'www.green.com' }
  },
  {
    isbn: '1018',
    titulo: 'Fotografia Profissional',
    sinopse: 'Técnicas para fotos incríveis.',
    paginas: '260',
    data_lancamento: '28/06/2019',
    autor: [{ nome: 'Camila Torres', email: 'camila@email.com' }],
    categoria: [{ nome: 'Fotografia' }],
    editora: { nome: 'PhotoBooks', site: 'www.photo.com' }
  },
  {
    isbn: '1019',
    titulo: 'Empreendedorismo Jovem',
    sinopse: 'Como começar seu negócio cedo.',
    paginas: '230',
    data_lancamento: '13/03/2020',
    autor: [{ nome: 'Felipe Ramos', email: 'felipe@email.com' }],
    categoria: [{ nome: 'Negócios' }],
    editora: { nome: 'StartEditora', site: 'www.start.com' }
  },
  {
    isbn: '1020',
    titulo: 'Inteligência Artificial Básica',
    sinopse: 'Introdução ao mundo da IA.',
    paginas: '410',
    data_lancamento: '01/01/2024',
    autor: [{ nome: 'Gabriel Teixeira', email: 'gabriel@email.com' }],
    categoria: [{ nome: 'Tecnologia' }],
    editora: { nome: 'FutureTech', site: 'www.future.com' }
  }
]
}