using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using MDF.Models.ClassesDeDominio;
using MDF.Models;
using MDF.Models.DTO;
using MDF.Models.Repositorios;
using MDF.Models.ValueObjects;

namespace MDF.Controllers
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
            var Maquina = await repositorioMaquina.getMaquinaById(Id);

            if (Maquina == null)
            {
                return NotFound();
            }

            return Maquina.Value.toDTO();
        }

        [HttpPost]
        public async Task<ActionResult<Maquina>> postMaquina(Maquina newMaquina)
        {
            var tipoMaquina = await repositorioTipoMaquina.getTipoMaquinaById(newMaquina.id_tipoMaquina);
            newMaquina.tipoMaquina = tipoMaquina.Value;
            repositorioMaquina.addMaquina(newMaquina);
            return CreatedAtAction(nameof(getMaquina), new Maquina { nomeMaquina = newMaquina.nomeMaquina }, newMaquina);
        }

        // PUT: api/Todo/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMaquina(long id, Maquina update_maquina)
        {
            var maquina = (await repositorioMaquina.getMaquinaById(id)).Value;
            if (maquina == null)
            {
                return NotFound("A máquina escolhida não existe!");
            }

            maquina.nomeMaquina = update_maquina.nomeMaquina;
            maquina.posicaoLinhaProducao = update_maquina.posicaoLinhaProducao;

            var tipoMaquina = (await repositorioTipoMaquina.getTipoMaquinaById(update_maquina.id_tipoMaquina)).Value;
            if (tipoMaquina == null)
            {
                return NotFound("O tipo de máquina escolhido não existe!");
            }

            if (!maquina.alterarIdTipoMaquina(tipoMaquina))
            {
                return BadRequest("Não foi possivel alterar o tipo de máquina!");
            }

            await repositorioMaquina.updateMaquina(maquina);

            return Ok("Maquina Atualizada com sucesso!");
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
