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
    public class TipoMaquinaTest
    {
        [Fact]
        public void ensureGetsAndSetsReturnCorrectly()
        {
            string descricaoTest = "tipoTeste";
            var descricao = new Descricao(descricaoTest);
            var tipoMaquinaTeste = new TipoMaquina();
            // tipoMaquinaTeste.Id = 1;
            tipoMaquinaTeste.descricaoTipoMaquina = descricao;

            // Assert.Equal(tipoMaquinaTeste.Id, 1);
            Assert.Equal(tipoMaquinaTeste.descricaoTipoMaquina, descricao);
        }
    }
}
