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
    ReactiveFormsModule,
    NgStyle
  ],
  styleUrls: ['./produto-list.component.css']
})

export class ProdutoListComponent implements OnInit {

  listaDeProdutos: Produto[] = [];
  produtoAtualizar!: Produto;
  private modalService: NgbModal = new NgbModal();
  produtoExcluido!: Produto;

  constructor(private produtoService: ProdutoService) { }

  // Ao abrir a página, chama o endpoint para preencher a lista de produtos
  ngOnInit() {
    this.produtoService.listarProdutos().subscribe(data => {
      this.listaDeProdutos = data.sort((a, b) => a.id - b.id);
    });
  }

  onSubmit() {
    console.log("CLICOU NO ONSUBMIT")
  }

  // Método para deletar um produto através do id
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
        // Atribui o Produto retornado pelo id fornecido(produtoRetornado)
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
    this.produtoService.listarProdutos().subscribe(data => {
      this.listaDeProdutos = data;
    });
  }

  // Função que abre o modal - Janela de edição de produto
  abrirTelaEdicao(modalEditar: any) {
    const modalRef = this.modalService.open(modalEditar);
  }

  // Função que abre o modal - Janela de exclusão de produto
  abrirTelaExclusao(modalExcluir: any) {
    const modalRef = this.modalService.open(modalExcluir);
    this.atualizarLista();
  }

  // Método que abre o modal de mensagem de sucesso após cadastrar um produto
  msgAtualizarProduto(modalMsg: any) {
    console.log("CLICOU NO 'MSG ATUALIZAR PRODUTO'")
    //const modalRef = this.modalService.open(modalMsg);
    // Espera 0.3 segundos para setar o produto no modal por que ele chama no HTML o submit e click ao mesmo tempo
    // E se chamar os dois eventos ao mesmo tempo, o submit não consegue gravar no banco de dados
    // E depois que seta o produto no modal, ele chama e abre o modal
    //setTimeout(() => {
    //  modalRef.componentInstance.produto = this.novoProduto;
    //}, 300);
  }

}
