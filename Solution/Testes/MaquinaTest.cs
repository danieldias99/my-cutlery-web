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
    public class MaquinaTest
    {
        [Fact]
        public void ensureGetsAndSetsReturnCorrectly()
        {
            var nomeMaquinaTeste = new NomeMaquina("nomeTeste");
            var nomeErradoTeste = new NomeMaquina("boas");
            var tipoMaquinaTeste = new TipoMaquina(1, "tipoTeste");
            var posicaoLinhaTeste = new PosicaoNaLinhaProducao(1);
            var maquina = new Maquina(nomeMaquinaTeste, posicaoLinhaTeste, tipoMaquinaTeste);
            maquina.Id = 2;
            maquina.id_tipoMaquina = 3;

            Assert.Equal(maquina.tipoMaquina, tipoMaquinaTeste);
            Assert.Equal(maquina.nomeMaquina, nomeMaquinaTeste);
            Assert.Equal(maquina.posicaoLinhaProducao, posicaoLinhaTeste);
            Assert.Equal(maquina.Id, 2);
            Assert.Equal(maquina.id_tipoMaquina, 3);
        }
    }
}
