import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProdutoService } from '../../service/produto.service';
import {FormsModule} from '@angular/forms';
import {Produto} from '../../model/produto';
import {CurrencyPipe, NgIf, NgOptimizedImage} from '@angular/common';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-produto',
  templateUrl: './add-produto.component.html',
  imports: [
    FormsModule,
    CurrencyPipe,
    NgOptimizedImage,
    NgIf
  ],
  styleUrls: ['./add-produto.component.css']
})

export class AddProdutoComponent {

  // É criado um produto zerado para poder ser acesso pelo ngModel, mas as propriedades são alteradas
  // pelos valores inseridos no formulário, então são passadas para o service da API.
  produto: Produto = {
    id: 0,
    nome: '',
    descricao: '',
    tipo: 'tipoFisico',
    frete: 0,
    promocao: false,
    valorTotalDesc: 0,
    valorTotalFrete: 0,
    valor: 0,
    quantia: 1,
    peso: 0,
    somaTotalValores: 0,
    freteAtivo: false
  };

  novoProduto!: Produto;

  private modalService: NgbModal = new NgbModal();

  constructor(
    private produtoService: ProdutoService) {
  }

  // Método que é chamado ao clicar no botão Submit do formulário HTML (ngModel) ao criar um produto
  onSubmit() {
    this.calcularValores();
    this.produtoService.adicionarProduto(this.produto).subscribe({
      next: (produtoAdicionado: Produto) => {
        // Atribui o Produto retornado (produtoAdicionado) ao novoProduto
        this.novoProduto = produtoAdicionado
      }
    })
  }

  selecionarPromocao(selecionouPromocao: boolean): boolean {
    if (selecionouPromocao) {
      console.log("TROCOU PARA SIM");
      return true;
    } else {
      console.log("TROCOU PARA NÃO");
      return false;
    }
  }

  calcularFrete(valorPeso: number): void {
    console.log("VALOR DO PESO É: " + valorPeso);
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

  // Método que abre o modal de mensagem de sucesso após cadastrar um produto
  msgAddProduto(modalMsg: any) {
    const modalRef = this.modalService.open(modalMsg);
    // Espera 0.3 segundos para setar o produto no modal por que ele chama no arquivo HTML o submit e o click ao mesmo tempo
    // Então, primeiramente ele chama o submit, grava no banco, depois de 0.3 segundos chama o modal
    // Pois se chamar os dois eventos ao mesmo tempo, gera conflito, e o submit não consegue gravar no banco de dados
    setTimeout(() => {
      modalRef.componentInstance.produto = this.novoProduto;
    }, 300);
  }

  calcularValores() {
    if (this.produto.promocao) {
      this.produto.somaTotalValores = this.produto.valor - (this.produto.valor * 0.1)
    } else {
      this.produto.somaTotalValores = this.produto.valor
    }
  }
}
