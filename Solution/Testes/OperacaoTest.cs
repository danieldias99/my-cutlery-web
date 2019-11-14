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
    public class OperacaoTest
    {
        [Fact]
        public void ensureGetsAndSetsReturnCorrectly()
        {
            string descricaoTest = "boas";
            string horaTest = "10";
            string minTest = "5";
            string segTest = "50";
            long id = 4;
            var operacao = new Operacao(id);
            var descricao = new Descricao(descricaoTest);
            var duracaoOperacao = new DuracaoOperacao(horaTest, minTest, segTest);

            operacao.descricaoOperacao = descricao;
            operacao.duracaoOperacao = duracaoOperacao;

            Assert.Equal(operacao.Id, 4);
            Assert.Equal(operacao.descricaoOperacao, descricao);
            Assert.Equal(operacao.duracaoOperacao, duracaoOperacao);
        }
    }
}
