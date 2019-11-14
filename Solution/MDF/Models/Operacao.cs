using MDF.Models.Shared;
using MDF.Models.ValueObjects;
using MDF.Models.DTO;
using MDF.Associations;
using System.Collections.Generic;

namespace MDF.Models
{
    public class Operacao : Entity, IAggregateRoot
    {
        public long Id { get; set; }
        public Descricao descricaoOperacao { get; set; }
        public DuracaoOperacao duracaoOperacao { get; set; }
        public ICollection<TipoMaquinaOperacao> tiposMaquinas { get; set; }

        private Operacao() { }

        public Operacao(long id, string descricao, string hora, string min, string seg)
        {
            this.Id = id;
            this.descricaoOperacao = new Descricao(descricao);
            this.duracaoOperacao = new DuracaoOperacao(hora, min, seg);
        }

        public Operacao(long Id)
        {
            this.Id = Id;
        }

        public OperacaoDTO toDTO()
        {
            return new OperacaoDTO(Id, descricaoOperacao.Id, duracaoOperacao.toString(), tiposMaquinas);
        }
    }
}