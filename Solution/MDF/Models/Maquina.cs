using MDF.Models.Shared;
using MDF.Models.ValueObjects;
using MDF.Models.DTO;
using System.Collections.Generic;
using MDF.Associations;

namespace MDF.Models
{

    public class Maquina : Entity, IAggregateRoot
    {
        public long Id { get; set; }
        public NomeMaquina nomeMaquina { get; set; }
        public PosicaoNaLinhaProducao posicaoLinhaProducao { get; set; }
        public long id_tipoMaquina { get; set; }
        public TipoMaquina tipoMaquina { get; set; }
        public ICollection<LinhaProducaoMaquinas> linhasProducao { get; set; }

        public Maquina() { }

        public Maquina(NomeMaquina nomeMaquina, PosicaoNaLinhaProducao posicaoLinhaProducao, TipoMaquina tipoMaquina)
        {
            this.nomeMaquina = nomeMaquina;
            this.tipoMaquina = tipoMaquina;
            this.posicaoLinhaProducao = posicaoLinhaProducao;
        }

        public void addLinha(LinhaProducaoMaquinas linha)
        {
            this.linhasProducao.Add(linha);
        }

        public bool alterarIdTipoMaquina(TipoMaquina tipoMaquina)
        {
            if (tipoMaquina == null)
            {
                return false;
            }
            this.tipoMaquina = tipoMaquina;
            this.id_tipoMaquina = tipoMaquina.id_tipoMaquina;
            return true;
        }


        public MaquinaDTO toDTO()
        {
            return new MaquinaDTO(Id, nomeMaquina, posicaoLinhaProducao, tipoMaquina, linhasProducao);
        }
    }
}
