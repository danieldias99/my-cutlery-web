namespace LAPR5_3DD_019.Models.ValueObjects
{

    public class PosicaoNaLinhaProducao
    {

        public int posicaoNaLinhaProducao { get; set; }

        public PosicaoNaLinhaProducao(){}
        public PosicaoNaLinhaProducao(int value)
        {
            this.posicaoNaLinhaProducao = value;
        }
    }
}