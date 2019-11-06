using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using MDF.Models.ClassesDeDominio;
using MDF.Models;
using MDF.Models.DTO;
using MDF.Models.Repositorios;
using System.Collections.Generic;
using MDF.Associations;

namespace MDF.Controllers
{
    [Route("api/TipoMaquina")]
    [ApiController]
    public class TipoMaquinaController : ControllerBase
    {
        public TipoMaquinaRepositorio repositorio;
        public OperacaoRepositorio repositorio_operacao;

        public TipoMaquinaController(MDFContext context)
        {
            repositorio = new TipoMaquinaRepositorio(context);
            repositorio_operacao = new OperacaoRepositorio(context);
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
        public async Task<ActionResult<TipoMaquina>> PostTipoMaquina(TipoMaquina newTipoMaquina)
        {
            repositorio.addTipoMaquina(newTipoMaquina);
            return CreatedAtAction(nameof(GetTipoMaquina), new { id = newTipoMaquina.Id }, newTipoMaquina);
        }

        // PUT: api/Todo/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTipoMaquina(long id, TipoMaquinaDTO update_TipoMaquina)
        {
            var tipoMaquina = await repositorio.getTipoMaquinaById(id);

            if (tipoMaquina == null)
            {
                return NotFound("O tipo de máquina escolhido não existe!");
            }

            var new_list_operacoes = new List<TipoMaquinaOperacao>();

            foreach (OperacaoDTO operacaodto in update_TipoMaquina.operacoes)
            {
                var operacao = await repositorio_operacao.getOperacaoById(operacaodto.Id);

                if (operacao == null)
                {
                    return NotFound("A operação " + operacaodto.Id + " não existe!");
                }

                new_list_operacoes.Add(new TipoMaquinaOperacao(tipoMaquina.Value.Id, operacao.Value.Id));
            }

            if (!tipoMaquina.Value.update_operacoes(new_list_operacoes))
            {
                return BadRequest("Não foi possivel alterar operações deste tipo de máquina!");
            }

            repositorio.updateTipoMaquina(tipoMaquina.Value);
            return Ok("Tipo de Máquina alterado com sucesso!");
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