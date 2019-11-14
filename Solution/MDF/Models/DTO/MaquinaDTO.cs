using MDF.Associations;
using MDF.Models.ValueObjects;
using System.Collections.Generic;

namespace MDF.Models.DTO
{

    public class MaquinaDTO
    {

        public long Id { get; set; }
        public NomeMaquina nomeMaquina { get; set; }
        public PosicaoNaLinhaProducao posicaoLinhaProducao { get; set; }
        public TipoMaquina tipoMaquina { get; set; }
        public ICollection<LinhaProducaoMaquinas> linhasProducao { get; set; }


        public MaquinaDTO(long Id, NomeMaquina nomeMaquina, PosicaoNaLinhaProducao posicaoLinhaProducao, TipoMaquina tipoMaquina, ICollection<LinhaProducaoMaquinas> linhasProducao)
        {
            this.Id = Id;
            this.nomeMaquina = nomeMaquina;
            this.posicaoLinhaProducao = posicaoLinhaProducao;
            this.tipoMaquina = tipoMaquina;
            this.linhasProducao = linhasProducao;
        }
    }
}