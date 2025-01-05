import { Component, OnInit } from '@angular/core';
import { Produto } from '../../model/produto';
import { ProdutoService } from '../../service/produto.service';
import {CurrencyPipe, NgForOf, NgIf, NgOptimizedImage, NgStyle} from '@angular/common';
import {NgbModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: '/app-produto-list',
  templateUrl: './produto-list.component.html',
  imports: [
    NgForOf,
    NgbModule,
    NgOptimizedImage,
    NgIf,
    CurrencyPipe,
    FormsModule,
    ReactiveFormsModule
  ],
  styleUrls: ['./produto-list.component.css']
})

export class ProdutoListComponent implements OnInit {

  // Lista que contém o produto com Valor Total mais caro
  listaProdutoMaisCaro: Produto[] = [];
  // Variável que extrai o nome do produto e o id do produto com o Valor Total mais caro
  stringProdutoMaisCaro: string = '';
  // Variável pra exibir o resultado da query que vem da API sobre média de preços
  mediaPreco: number = 0;

  // Variáveis para: armazenar a lista de produtos para listagem na tela, armazenar o produto a ser atualizado
  // no modal de edição e o produto a ser exclúido para abrir o modal de mensagem
  listaDeProdutos: Produto[] = [];
  produtoAtualizar!: Produto;
  produtoExcluido!: Produto;

  private modalService: NgbModal = new NgbModal();

  constructor(private produtoService: ProdutoService) { }

  // Ao abrir a página, chama os endpoints abaixo...
  ngOnInit() {
    // Chama o método de listar o produto mais caro
    this.listarProdutoMaisCaro();
    // Chama o método de calcular a média dos valores unitários
    this.calcularMedia();
    // Lista todos os produtos na tela
    this.produtoService.listarProdutos().subscribe(data => {
      // Lista e ordena os produtos por ID, em ordem crescente (de 'a' para 'b', de '0' a '10', por exemplo)
      this.listaDeProdutos = data.sort((a, b) => a.id - b.id);
    });
  }

  // Método chamado ao clicar no botão de Submit (Salvar) do formulário de Edição de produtos
  onSubmitSalvar(modal: any) {
    // Chama o modal de atualizar produto
    this.produtoService.atualizarProduto(this.produtoAtualizar.id, this.produtoAtualizar).subscribe();
    modal.close();
    this.atualizarLista();
  }

  // Método que calcula a média dos valores unitários
  calcularMedia() {
    this.produtoService.calcularMedia().subscribe((media: number) => {
      this.mediaPreco = media; // Atribui o valor da média à variável mediaPreco
    });
  }

  // Metodo que busca o produto com Valor Total mais caro
  listarProdutoMaisCaro() {
  this.produtoService.listarProdutoMaisCaro().subscribe((produtos: Produto[]) => {
    this.listaProdutoMaisCaro = produtos;
    this.stringProdutoMaisCaro = '' + this.listaProdutoMaisCaro[0].id + ' - ' +  this.listaProdutoMaisCaro[0].nome
  })}

  // Método para deletar um produto através do id. Chama o endpoint, e tendo sucesso na exclusão
  // (retornando true do endpoint, abre o o modal de mensagem de produto excluido com sucesso)
  deletarProduto(modalDeletar: any, id: number, produto: Produto) {
    this.produtoService.deletarProduto(id).subscribe({
      next: (response) => {
        if (response == true) {
          this.produtoExcluido = produto;
          this.abrirTelaExclusao(modalDeletar);
        }
      }
    })
  }

  // Método para atualizar um produto através do id
  atualizarProduto(modalEditar: any, id: number, produto: Produto) {
    this.produtoService.atualizarProduto(id, produto).subscribe({
      next: (produtoRetornado: Produto) => {
        // Atribui o Produto retornado (produtoRetornado) pelo id fornecido
        // ao produto que será atualizado e abre a tela de edição
        this.produtoAtualizar = produtoRetornado
        this.abrirTelaEdicao(modalEditar)
      }
    })
  }

  // Método que formata o valor para R$ para ser exibido na tabela
  formatarValor(valor: number): string {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }

  // Método que atualiza a lista de produtos
  atualizarLista(): void {
    // Lista todos os produtos na tela
    this.produtoService.listarProdutos().subscribe(data => {
      // Lista e ordena os produtos por ID, em ordem crescente (de 'a' para 'b', de '0' a '10', por exemplo)
      this.listaDeProdutos = data.sort((a, b) => a.id - b.id);
      this.listarProdutoMaisCaro();
      this.calcularMedia();
    });
  }

  // Função que abre o modal - Janela de edição de produto
  abrirTelaEdicao(modalEditar: any) {
    this.modalService.open(modalEditar);
  }

  // Função que abre o modal - Janela de exclusão de produto
  abrirTelaExclusao(modalExcluir: any) {
    this.modalService.open(modalExcluir);
    this.atualizarLista();
    this.listarProdutoMaisCaro();
    this.calcularMedia();
  }

  ativarFrete(ativouFrete: boolean): boolean {
    if (ativouFrete) {
      console.log("TROCOU PARA SIM");
      return true;
    } else {
      console.log("TROCOU PARA NÃO");
      return false;
    }
  }

}
