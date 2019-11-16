using MDF.Models.Shared;
using MDF.Models.ValueObjects;
using MDF.Models.DTO;
using MDF.Associations;
using System.Collections.Generic;

namespace MDF.Models
{

    public class TipoMaquina : Entity, IAggregateRoot
    {

        public long id_tipoMaquina { set; get; }
        public Descricao descricaoTipoMaquina { set; get; }
        public List<TipoMaquinaOperacao> operacoesMaquina { set; get; }
        public ICollection<Maquina> maquinas { get; set; }

        public TipoMaquina() { }

        public TipoMaquina(long id_tipoMaquina, string descricao, List<TipoMaquinaOperacao> list)
        {
            this.id_tipoMaquina = id_tipoMaquina;
            this.descricaoTipoMaquina = new Descricao(descricao);
            this.operacoesMaquina = list;
        }

        public TipoMaquina(long id_tipoMaquina, string descricao, List<OperacaoDTO> list)
        {
            this.id_tipoMaquina = id_tipoMaquina;
            this.descricaoTipoMaquina = new Descricao(descricao);
            this.operacoesMaquina = new List<TipoMaquinaOperacao>();
            addOperacoes(list);
        }

        public TipoMaquina(long id_tipoMaquina, string descricao)
        {
            this.id_tipoMaquina = id_tipoMaquina;
            this.descricaoTipoMaquina = new Descricao(descricao);
        }

        public void addOperacoes(List<OperacaoDTO> operacaoes)
        {
            foreach (OperacaoDTO operacao in operacaoes)
            {
                addOperacao(new TipoMaquinaOperacao(this.id_tipoMaquina, operacao.Id));
            }
        }

        public void addOperacao(TipoMaquinaOperacao operacao)
        {
            operacoesMaquina.Add(operacao);
        }

        public bool update_operacoes(List<TipoMaquinaOperacao> new_operacoes)
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
            return new TipoMaquinaDTO(id_tipoMaquina, descricaoTipoMaquina.Id, operacoesMaquina);
        }
    }
}