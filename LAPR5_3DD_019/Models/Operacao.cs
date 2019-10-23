using LAPR5_3DD_019.Models.Shared;
using LAPR5_3DD_019.Models.ValueObjects;
using LAPR5_3DD_019.Models.DTO;

namespace LAPR5_3DD_019.Models
{
    public class Operacao : Entity, IAggregateRoot
    {
        public long Id { get; set; }
        public Descricao descricaoOperacao { get; set; }
        public DuracaoOperacao duracaoOperacao { get; set; }

        private Operacao(){}

        public Operacao(string descricao, int hora, int min, int seg) { 
            this.descricaoOperacao = new Descricao(descricao); 
            this.duracaoOperacao = new DuracaoOperacao(hora, min, seg); 
        }

        public OperacaoDTO toDTO(){
            return new OperacaoDTO(Id, descricaoOperacao.Id, duracaoOperacao.toString());
        }
    }
}