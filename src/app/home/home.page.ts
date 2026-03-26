import { Component } from '@angular/core';
import { AuthenticateService } from '../services/auth.service';
import { CrudService } from '../services/crud.service';
import { Storage, getDownloadURL, ref, uploadBytesResumable } from '@angular/fire/storage';
import { MessageService } from '../services/message.service';
import { Router } from '@angular/router';
import { ILivro } from './acervo.interface';
import { IProduto } from './produtos.interface';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  livros: ILivro[] = [
    { 
      isbn: '123',
      titulo: 'Uma breve história do tempo',
      categoria: [
        { nome: 'científico'},
        { nome: 'romance'},
        { nome: 'terror'}
      ]
    },
    { 
      isbn: '124', titulo: 'O universo em uma casca de noz', categoria: [
      { nome: 'científico' }
    ] 
    },
    { 
      isbn: '125', titulo: '1984', categoria: [
        { nome: 'ficção'}, 
        { nome: 'distopia'}
      ] 
    },
    { 
      isbn: '126', titulo: 'O Senhor dos Anéis', categoria: [
        { nome: 'fantasia'}
      ] 
    },
    { 
      isbn: '127', titulo: 'O pequeno príncipe', categoria: [
        { nome: 'infantil'}, 
        { nome: 'fantasia'}
      ] 
    },
    { 
      isbn: '128', titulo: 'Dom Quixote', categoria: [
        { nome: 'clássico'}
      ] 
    },
    { 
      isbn: '129', titulo: 'Cem anos de solidão', categoria: [
        { nome: 'literatura'}, 
        { nome: 'realismo mágico'}
      ] },
    { 
      isbn: '130', titulo: 'O código Da Vinci', categoria: [
        { nome: 'suspense'}, 
        { nome: 'mistério'}
      ] 
    },
    { 
      isbn: '131', titulo: 'A revolução dos bichos', categoria: [
        { nome: 'satírico'}, 
        { nome: 'distopia'}
      ] 
    },
    { 
      isbn: '132', titulo: 'O Hobbit', categoria: [
        { nome: 'fantasia'}
      ] 
    },
    { 
      isbn: '133', titulo: 'Sherlock Holmes: Um Estudo em Vermelho', categoria: [
        { nome: 'mistério'}, 
        { nome: 'policial'}
      ] 
    },
    { 
      isbn: '134', titulo: 'A magia do pensamento grande', categoria: [
        { nome: 'autoajuda'}
      ] 
    },
    { 
      isbn: '135', titulo: 'O poder do hábito', categoria: [
        { nome: 'autoajuda'}, 
        { nome: 'produtividade'}
      ] 
    },
    { 
      isbn: '136', titulo: 'Sapiens: Uma breve história da humanidade', categoria: [
        { nome: 'história'}, 
        { nome: 'científico'}
      ] 
    },
    { 
      isbn: '137', titulo: 'A arte da guerra', categoria: [
        { nome: 'estratégia'}, 
        { nome: 'clássico'}
      ] 
    },
    { 
      isbn: '138', titulo: 'Harry Potter e a Pedra Filosofal', categoria: [
        { nome: 'fantasia'}, 
        { nome: 'infantil'}
      ] 
    },
    { 
      isbn: '139', titulo: 'O Morro dos Ventos Uivantes', categoria: [
        { nome: 'romance'}, 
        { nome: 'clássico'}
      ] 
    },
    { 
      isbn: '140', titulo: 'O Guia do Mochileiro das Galáxias', categoria: [
        { nome: 'ficção'}, { nome: 'humor'}
      ] 
    },
    { 
      isbn: '141', titulo: 'Moby Dick', categoria: [
        { nome: 'aventura'}, { nome: 'clássico'}
      ] 
    },
    { 
      isbn: '142', titulo: 'O Apanhador no Campo de Centeio', categoria: [
        { nome: 'literatura'}
      ] 
    },
    { 
      isbn: '143', titulo: 'O Hobbit', categoria: [
        { nome: 'fantasia'}
      ] 
    }
  ];

  //produtos

  produtos: IProduto[] = [
    {
      codigo: 1001,
      preco: 15000.00,
      quantidade: 7,
      nome: 'Panthera Low Low',
      marca: 'Ui Ui'
    },
    { codigo: 1002, preco: 8500.00, quantidade: 12, nome: 'Nike Air Max', marca: 'Nike' },
    { codigo: 1003, preco: 12000.00, quantidade: 5, nome: 'Adidas Ultraboost', marca: 'Adidas' },
    { codigo: 1004, preco: 9500.00, quantidade: 10, nome: 'Puma RS-X', marca: 'Puma' },
    { codigo: 1005, preco: 7200.00, quantidade: 15, nome: 'Vans Old Skool', marca: 'Vans' },
    { codigo: 1006, preco: 6500.00, quantidade: 20, nome: 'Converse All Star', marca: 'Converse' },
    { codigo: 1007, preco: 18000.00, quantidade: 3, nome: 'Timberland Premium', marca: 'Timberland' },
    { codigo: 1008, preco: 5800.00, quantidade: 25, nome: 'Havaianas Tradicional', marca: 'Havaianas' },
    { codigo: 1009, preco: 11500.00, quantidade: 8, nome: 'New Balance 574', marca: 'New Balance' },
    { codigo: 1010, preco: 13000.00, quantidade: 6, nome: 'Reebok Classic', marca: 'Reebok' },
    { codigo: 1011, preco: 16500.00, quantidade: 4, nome: 'Salomon Trail', marca: 'Salomon' },
    { codigo: 1012, preco: 9800.00, quantidade: 9, nome: 'ASICS Gel-Lyte', marca: 'ASICS' },
    { codigo: 1013, preco: 7800.00, quantidade: 14, nome: 'Mizuno Wave', marca: 'Mizuno' },
    { codigo: 1014, preco: 10500.00, quantidade: 11, nome: 'Skechers Ultra Go', marca: 'Skechers' },
    { codigo: 1015, preco: 14200.00, quantidade: 5, nome: 'Saucony Jazz', marca: 'Saucony' },
    { codigo: 1016, preco: 8900.00, quantidade: 13, nome: 'Keds Champion', marca: 'Keds' },
    { codigo: 1017, preco: 17000.00, quantidade: 2, nome: 'Merrell Hiking Boot', marca: 'Merrell' },
    { codigo: 1018, preco: 6200.00, quantidade: 22, nome: 'Crocs Classic', marca: 'Crocs' },
    { codigo: 1019, preco: 12500.00, quantidade: 7, nome: 'Brooks Ghost', marca: 'Brooks' },
    { codigo: 1020, preco: 9200.00, quantidade: 16, nome: 'DC Shoes Trase', marca: 'DC Shoes' },
    { codigo: 1021, preco: 11000.00, quantidade: 10, nome: 'Etnies Marana', marca: 'Etnies' }
  ];

}
