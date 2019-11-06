using MDF.Models.Shared;
using MDF.Models.ValueObjects;
using MDF.Models.DTO;
using MDF.Associations;
using System.Collections.Generic;

namespace MDF.Models
{

    public class TipoMaquina : Entity, IAggregateRoot
    {

        public long Id { set; get; }
        public Descricao descricaoTipoMaquina { set; get; }
        public ICollection<TipoMaquinaOperacao> operacoesMaquina { set; get; }
        public ICollection<Maquina> maquinas { get; set; }

        public TipoMaquina() { }

        public TipoMaquina(long id, string descricao, ICollection<TipoMaquinaOperacao> list)
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

        public bool update_operacoes(ICollection<TipoMaquinaOperacao> new_operacoes)
        {
            if (new_operacoes == null)
            {
                return false;
            }

            this.operacoesMaquina = new_operacoes;

            return true;
        }

        public TipoMaquinaDTO toDTO()
        {
            return new TipoMaquinaDTO(Id, descricaoTipoMaquina.Id, operacoesMaquina);
        }
    }
}