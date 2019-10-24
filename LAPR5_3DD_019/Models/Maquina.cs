using LAPR5_3DD_019.Models.Shared;
using LAPR5_3DD_019.Models.ValueObjects;
using LAPR5_3DD_019.Models.DTO;

namespace LAPR5_3DD_019.Models {

  public class Maquina: Entity, IAggregateRoot {
    public NomeMaquina nomeMaquina {get; set;}
    public PosicaoNaLinhaProducao posicaoLinhaProducao {get;set;}
    public TipoMaquina tipoMaquina {get;set;}

    public Maquina() {}

    public Maquina(NomeMaquina nomeMaquina, PosicaoNaLinhaProducao posicaoLinhaProducao, TipoMaquina tipoMaquina) {
      this.nomeMaquina = nomeMaquina;
      this.tipoMaquina = tipoMaquina;
      this.posicaoLinhaProducao = posicaoLinhaProducao;
    }

    public MaquinaDTO toDTO() {
      return new MaquinaDTO(nomeMaquina, posicaoLinhaProducao, tipoMaquina);
    }

    /* pm.test("Content-Type is JSON", function (){
    pm.response.headers["Content-Type"] == "application/json"
    });

    var jsonData = pm.response.json();
    pm.test("Status code is 201 - Created", function(){
      pm.expect(jsonData.statusCode) == 201;
      });

      pm.globals.set("ID_OperacaoTest", jsonData.id); */
  }
}
