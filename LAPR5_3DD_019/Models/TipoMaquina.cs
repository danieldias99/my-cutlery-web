using LAPR5_3DD_019.Models.Shared;
using LAPR5_3DD_019.Models.ValueObjects;
using LAPR5_3DD_019.Models.DTO;
using LAPR5_3DD_019.Associations;
using System.Collections.Generic;

namespace LAPR5_3DD_019.Models
{

    public class TipoMaquina : Entity, IAggregateRoot
    {

        public long Id { set; get; }
        public Descricao descricaoTipoMaquina { set; get; }
        public ICollection<TipoMaquinaOperacao> operacoesMaquina { set; get; }
        public ICollection<Maquina> maquinas { get; set; }

        public TipoMaquina() { }

        public TipoMaquina(long id, string descricao, List<TipoMaquinaOperacao> list)
        {
            this.Id = id;
            this.descricaoTipoMaquina = new Descricao(descricao);
            this.operacoesMaquina = list;
        }

        public TipoMaquina(long id, string descricao)
        {
            this.Id = id;
            this.descricaoTipoMaquina = new Descricao(descricao);
        }

        public void addOperacao(TipoMaquinaOperacao operacao)
        {
            operacoesMaquina.Add(operacao);
        }

        public TipoMaquinaDTO toDTO()
        {
            return new TipoMaquinaDTO(Id, descricaoTipoMaquina.Id, operacoesMaquina);
        }
    }
}