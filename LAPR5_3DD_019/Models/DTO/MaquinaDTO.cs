using LAPR5_3DD_019.Models.Shared;
using LAPR5_3DD_019.Models.ValueObjects;

namespace LAPR5_3DD_019.Models.DTO {

  public class MaquinaDTO {

    public NomeMaquina nomeMaquina {get; set;}
    public PosicaoNaLinhaProducao posicaoLinhaProducao {get;set;}
    public TipoMaquina tipoMaquina {get;set;}

    public MaquinaDTO(NomeMaquina nomeMaquina, PosicaoNaLinhaProducao posicaoLinhaProducao, TipoMaquina tipoMaquina) {
      this.nomeMaquina = nomeMaquina;
      this.posicaoLinhaProducao = posicaoLinhaProducao;
      this.tipoMaquina = tipoMaquina;
    }
  }
}
