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

  veiculo: any = {
    modelo:null,
    marca:null,
    cor:null
  }

  veiculos: any = [];

  //alert -> tipo window.prompt

  adicionar (){
    const veiculo = this.veiculo;
    this.veiculos.push(...this.veiculo);
    //verificando
    // console.log(this.veiculos);

  };
};
