using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using LAPR5_3DD_019.Models.ClassesDeDominio;
using LAPR5_3DD_019.Models;
using LAPR5_3DD_019.Models.DTO;
using LAPR5_3DD_019.Models.Repositorios;
using LAPR5_3DD_019.Models.ValueObjects;

namespace LAPR5_3DD_019.Controllers
{

    [Route("api/Maquina")]
    [ApiController]
    public class MaquinaController : ControllerBase
    {

        public MaquinaRepositorio repositorioMaquina;
        public TipoMaquinaRepositorio repositorioTipoMaquina;

        public MaquinaController(MDFContext context)
        {
            repositorioMaquina = new MaquinaRepositorio(context);
            repositorioTipoMaquina = new TipoMaquinaRepositorio(context);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<MaquinaDTO>> getMaquina(long Id)
        {
            var MaquinaDTO = await repositorioMaquina.getMaquinaById(Id);

            if (MaquinaDTO == null)
            {
                return NotFound();
            }

            return MaquinaDTO;
        }

        [HttpPost]
        public async Task<ActionResult<Maquina>> postMaquina(Maquina newMaquina)
        {
            var tipoMaquina = await repositorioTipoMaquina.getTipoMaquinaById(newMaquina.id_tipoMaquina);
            newMaquina.tipoMaquina = new TipoMaquina(tipoMaquina.Value.Id_tipoMaquina, tipoMaquina.Value.descricaoTipoMaquina);
            repositorioMaquina.addMaquina(newMaquina);
            return CreatedAtAction(nameof(getMaquina), new Maquina { nomeMaquina = newMaquina.nomeMaquina }, newMaquina);
        }

        // PUT: api/Todo/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMaquina(long id, Maquina update_operacao)
        {
            var MaquinaDTO = await repositorioMaquina.getMaquinaById(id);

            if (MaquinaDTO == null)
            {
                return NotFound();
            }

            if (id != MaquinaDTO.Value.Id)
            {
                return BadRequest();
            }

            repositorioMaquina.updateMaquina(update_operacao);
            return NoContent();
        }

        // DELETE: api/Maquina/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<MaquinaDTO>> DeleteMaquina(long id)
        {
            var Maquina = await getMaquina(id);

            if (Maquina == null)
            {
                return NotFound();
            }

            repositorioMaquina.deleteMaquina(id);

            return NoContent();
        }
    }
}
