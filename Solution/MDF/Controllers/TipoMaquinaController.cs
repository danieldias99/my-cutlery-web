using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using MDF.Models.ClassesDeDominio;
using MDF.Models;
using MDF.Models.DTO;
using MDF.Models.Repositorios;

namespace MDF.Controllers
{
    [Route("api/TipoMaquina")]
    [ApiController]
    public class TipoMaquinaController : ControllerBase
    {
        public TipoMaquinaRepositorio repositorio;

        public TipoMaquinaController(MDFContext context)
        {
            repositorio = new TipoMaquinaRepositorio(context);
        }

        // GET: api/TipoMaquina/ID
        [HttpGet("{id}")]
        public async Task<ActionResult<TipoMaquinaDTO>> GetTipoMaquina(long id)
        {
            var tipoMaquina = await repositorio.getTipoMaquinaById(id);

            if (tipoMaquina == null)
            {
                return NotFound();
            }

            return tipoMaquina.Value.toDTO();
        }

        // POST: api/TipoMaquina
        [HttpPost]
        public async Task<ActionResult<Operacao>> PostTipoMaquina(TipoMaquina newTipoMaquina)
        {
            repositorio.addTipoMaquina(newTipoMaquina);
            return CreatedAtAction(nameof(GetTipoMaquina), new { id = newTipoMaquina.Id }, newTipoMaquina);
        }

        // PUT: api/Todo/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTipoMaquina(long id, TipoMaquina update_TipoMaquina)
        {
            var tipoMaquina = await repositorio.getTipoMaquinaById(id);

            if (tipoMaquina == null)
            {
                return NotFound("O tipo de máquina escolhido não existe!");
            }

            repositorio.updateTipoMaquina(update_TipoMaquina);
            return NoContent();
        }

        // DELETE: api/TipoMaquina/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TipoMaquinaDTO>> DeleteTipoMaquina(long id)
        {
            var tipoMaquina = await GetTipoMaquina(id);

            if (tipoMaquina == null)
            {
                return NotFound();
            }

            repositorio.deleteTipoMaquina(id);

            return NoContent();
        }
    }
}