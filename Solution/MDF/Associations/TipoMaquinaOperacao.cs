using MDF.Models;
using MDF.Models.ValueObjects;

namespace MDF.Associations
{

    public class TipoMaquinaOperacao
    {
        public long id_tipoMaquina { get; set; }
        public TipoMaquina tipoMaquina { get; set; }
        public long id_operacao { get; set; }
        public Operacao operacao { get; set; }

        public TipoMaquinaOperacao() { }

        public TipoMaquinaOperacao(long id_tipoMaquina, long id_operacao)
        {
            this.id_tipoMaquina = id_tipoMaquina;
            this.id_operacao = id_operacao;
        }

        public TipoMaquinaOperacao(long id_tipoMaquina, long id_operacao, Operacao operacao)
        {
            this.id_tipoMaquina = id_tipoMaquina;
            this.id_operacao = id_operacao;
            this.operacao = operacao;
        }
    }
}