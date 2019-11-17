using System;
using System.Collections.Generic;
using Xunit;
using MDP.Models;
using MDP.Models.Shared;
using MDP.Models.ValueObjects;
using MDP.Models.DTO;

namespace Testes
{
    public class ProdutoTest
    {
        [Fact]
        public void ensureGetsAndSetsReturnCorrectly()
        {   
           var infoProduto = new InfoProduto("testeInfo", "descricaoProduto");
           long Id = 1;
           var produto = new Produto(Id, infoProduto);

           Assert.Equal(produto.Id, 1);
           Assert.Equal(produto.informacaoProduto, infoProduto);
        }
    }
}
