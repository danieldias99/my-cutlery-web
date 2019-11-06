using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using MDF.Models.ClassesDeDominio;
using MDF.Models;
using MDF.Models.DTO;
using MDF.Models.Repositorios;

namespace MDF.Controllers
{
    [Route("api/Operacao")]
    [ApiController]
    public class OperacaoController : ControllerBase
    {
        public OperacaoRepositorio repositorio;

        public OperacaoController(MDFContext context)
        {
            repositorio = new OperacaoRepositorio(context);
        }

        // GET: api/Operacao/5
        [HttpGet("{id}")]
        public async Task<ActionResult<OperacaoDTO>> GetOperacao(long id)
        {
            var operacao = await repositorio.getOperacaoById(id);
            if (operacao == null)
            {
                return NotFound("Operacao não existe!");
            }
            return operacao.Value.toDTO();
        }

        // POST: api/Operacao
        [HttpPost]
        public async Task<ActionResult<Operacao>> PostOperacao(Operacao newOperacao)
        {
            repositorio.addOperacao(newOperacao);
            return CreatedAtAction(nameof(GetOperacao), new { id = newOperacao.Id }, newOperacao);
        }

        // PUT: api/Todo/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOperacao(long id, Operacao update_operacao)
        {
            var operacaoDTO = await repositorio.getOperacaoById(id);

            if (operacaoDTO == null)
            {
                return NotFound("Operação não existe!");
            }

            if (id != operacaoDTO.Value.Id)
            {
                return BadRequest();
            }

            repositorio.updateOperacao(update_operacao);
            return NoContent();
        }

        // DELETE: api/Operacao/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<OperacaoDTO>> DeleteOperacao(long id)
        {
            var operacao = await GetOperacao(id);

            if (operacao == null)
            {
                return NotFound("Operação não existe!");
            }

            repositorio.deleteOperacao(id);

            return NoContent();
        }
    }
}