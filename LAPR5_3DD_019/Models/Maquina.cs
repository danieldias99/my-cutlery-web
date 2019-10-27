using LAPR5_3DD_019.Models.Shared;
using LAPR5_3DD_019.Models.ValueObjects;
using LAPR5_3DD_019.Models.DTO;
using System.Collections.Generic;
using LAPR5_3DD_019.Associations;

namespace LAPR5_3DD_019.Models
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

        public MaquinaDTO toDTO()
        {
            return new MaquinaDTO(Id, nomeMaquina, posicaoLinhaProducao, tipoMaquina, linhasProducao);
        }
    }
}
