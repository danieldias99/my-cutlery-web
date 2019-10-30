using System;
using LAPR5_3DD_019.Models;
using LAPR5_3DD_019.Models.Shared;
using LAPR5_3DD_019.Models.ValueObjects;
using LAPR5_3DD_019.Models.DTO;
using System.Collections.Generic;
using LAPR5_3DD_019.Associations;
using Xunit;

namespace testProject
{
    public class ProdutoTeste
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
