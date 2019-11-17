using MDF.Associations;
using MDF.Models.ValueObjects;
using System.Collections.Generic;

namespace MDF.Models.DTO
{

    public class MaquinaDTO
    {

        public long Id { get; set; }
        public string nomeMaquina { get; set; }
        public int posicaoLinhaProducao { get; set; }
        public long id_tipoMaquina { get; set; }
        public ICollection<LinhaProducaoMaquinas> linhasProducao { get; set; }

        public MaquinaDTO() { }

        public MaquinaDTO(long Id, NomeMaquina nomeMaquina, PosicaoNaLinhaProducao posicaoLinhaProducao, long tipoMaquina, ICollection<LinhaProducaoMaquinas> linhasProducao)
        {
            this.Id = Id;
            this.nomeMaquina = nomeMaquina.nomeMaquina;
            this.posicaoLinhaProducao = posicaoLinhaProducao.posicaoNaLinhaProducao;
            this.id_tipoMaquina = tipoMaquina;
            this.linhasProducao = linhasProducao;
        }

        public MaquinaDTO(long Id, string nomeMaquina, int posicaoLinhaProducao, long tipoMaquina, ICollection<LinhaProducaoMaquinas> linhasProducao)
        {
            this.Id = Id;
            this.nomeMaquina = nomeMaquina;
            this.posicaoLinhaProducao = posicaoLinhaProducao;
            this.id_tipoMaquina = tipoMaquina;
            this.linhasProducao = linhasProducao;
        }
    }
}
