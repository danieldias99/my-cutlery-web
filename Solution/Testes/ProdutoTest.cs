using System;
using MDF.Models;
using MDF.Models.Shared;
using MDF.Models.ValueObjects;
using MDF.Models.DTO;
using System.Collections.Generic;
using MDF.Associations;
using Xunit;

namespace Testes
{
    public class ProdutoTest
    {
        [Fact]
        public void ensureGetsAndSetsReturnCorrectly()
        {   
           var infoProduto = new InfoProduto("testeInfo");
           long Id = 1;
           var produto = new Produto(Id, infoProduto);

           Assert.Equal(produto.Id, 1);
           Assert.Equal(produto.informacaoProduto, infoProduto);
        }
    }
}
