using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using MDF.Models.ClassesDeDominio;
using MDF.Models;
using MDF.Models.DTO;
using System.Collections.Generic;
using MDF.Models.Repositorios;
using Microsoft.AspNetCore.Cors;

namespace MDF.Controllers
{
    [Route("api/Operacao")]
    [EnableCors("IT3Client")]
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
            if (operacao.Value == null)
            {
                return NotFound("Operacao não existe!");
            }
            return operacao.Value.toDTO();
        }

        // GET: api/Operacao/
        [HttpGet()]
        public async Task<ActionResult<List<OperacaoDTO>>> GetAllOperacao()
        {
            List<OperacaoDTO> listaMaquinasDTO = obterListaOperacaosDTO((await repositorio.getAllOperacao()).Value);
            return listaMaquinasDTO;
        }

        private List<OperacaoDTO> obterListaOperacaosDTO(List<Operacao> listaOperacaos)
        {
            List<OperacaoDTO> listaOperacaosDTO = new List<OperacaoDTO>();
            foreach (Operacao operacao in listaOperacaos)
            {
                listaOperacaosDTO.Add(operacao.toDTO());
            }
            return listaOperacaosDTO;
        }

        // POST: api/Operacao
        [HttpPost()]
        public async Task<ActionResult<Operacao>> PostOperacao(OperacaoDTO newOperacao)
        {
            repositorio.addOperacao(new Operacao(newOperacao.Id, newOperacao.descricaoOperacao, newOperacao.duracaoOperacao.Split(":")[0], newOperacao.duracaoOperacao.Split(":")[1], newOperacao.duracaoOperacao.Split(":")[2]));
            return CreatedAtAction(nameof(GetOperacao), new { id = newOperacao.Id }, newOperacao);
        }

        // PUT: api/Todo
        [HttpPut()]
        public async Task<IActionResult> PutOperacao(OperacaoDTO update_operacao)
        {
            var operacaoDTO = await repositorio.getOperacaoById(update_operacao.Id);

            if (operacaoDTO == null)
            {
                return NotFound("Operação não existe!");
            }

            repositorio.updateOperacao(operacaoDTO.Value);
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