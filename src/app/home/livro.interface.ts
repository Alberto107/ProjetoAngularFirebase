//gerar regra de negócio das coisas que obrigatóriamente tem que ter no livro, usando interface
//ISBN -> não vai ser pq trem que ser algo que vai abrir nas informações dentro do livro e expor uma ou mais informações
export interface Autor{
    nome: string;
    email: string;
}

export interface Editora{
    nome: string;
    site: string;
}

export interface Categoria{
    nome:string;
}

//agra vai ter ISBN

export interface Livro {
    isbn: string;
    titulo: string;
    sinopse: string;
    paginas: string;
    data_lancamento: string;
    autor: Autor[],
    categoria: Categoria[],
    editora: Editora;
}

//usa export pq n é módulo