import { Component } from '@angular/core';
import { AuthenticateService } from '../services/auth.service';
import { CrudService } from '../services/crud.service';
import { Storage, getDownloadURL, ref, uploadBytesResumable } from '@angular/fire/storage';
import { MessageService } from '../services/message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  //nome_da_var: tipo-> (any = qualquer, objeto, string, array, number)
  //aluno[] = [] -> um array em que cada elemento dele vai receber um array de dados >:)
  // lista_compras: object[]
  lista_compras: any = [
    /*object ->*/ {nome:"fígado", preco: 26.0, marca: "friboi", promocao: true },
    {nome:"chocolate", preco: 2.5, marca: "lakaa", promocao: false },
    {nome:"livro", preco: 10.5, marca: "livraria dom bosco", promocao: true },
    {nome:"refri", preco: 9.5, marca: "pepsi", promocao: false }
  ];

}
