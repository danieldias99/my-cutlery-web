using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using LAPR5_3DD_019.Models.ClassesDeDominio;
using LAPR5_3DD_019.Models;
using LAPR5_3DD_019.Models.DTO;
using LAPR5_3DD_019.Models.Repositorios;
using LAPR5_3DD_019.Models.ValueObjects;

namespace LAPR5_3DD_019.Controllers {

  [Route("api/Maquina")]
  [ApiController]
  public class MaquinaController : ControllerBase {

    public MaquinaRepositorio repositorio;

    public MaquinaController(MDFContext context) {
       repositorio = new MaquinaRepositorio(context);
    }
  [HttpGet("{id}")]
    public async Task<ActionResult<MaquinaDTO>> getMaquina(NomeMaquina nomeMaquina) {
        var MaquinaDTO = await repositorio.getMaquinaByName(nomeMaquina);

        if (MaquinaDTO == null) {
          return NotFound();
        }

        return MaquinaDTO;
    }

    [HttpPost]
    public async Task<ActionResult<Maquina>> postMaquina(Maquina newMaquina) {
      repositorio.addMaquina(newMaquina);
      return CreatedAtAction(nameof(getMaquina), new Maquina {nomeMaquina = newMaquina.nomeMaquina}, newMaquina);
    }
  }
}
