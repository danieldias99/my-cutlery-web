using MDF.Models.ClassesDeDominio;
using MDF.Models.DTO;
using MDF.Models.ValueObjects;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace MDF.Models.Repositorios
{

    public class OperacaoRepositorio
    {

        public readonly MDFContext _context;

        public OperacaoRepositorio(MDFContext context)
        {
            _context = context;
        }

        public async Task<ActionResult<Operacao>> getOperacaoById(long id)
        {
            var operacao = await _context.Operacoes.FindAsync(id);
            return operacao;
        }

        public void addOperacao(Operacao newOperacao)
        {
            _context.Operacoes.Add(newOperacao);
            _context.SaveChanges();
        }

        public async void updateOperacao(Operacao update_operacao)
        {
            var current_operacao = await _context.Operacoes.FindAsync(update_operacao.Id);
            current_operacao.descricaoOperacao = update_operacao.descricaoOperacao;
            current_operacao.duracaoOperacao = update_operacao.duracaoOperacao;
            _context.Entry(current_operacao).State = EntityState.Modified;
            _context.Entry(current_operacao).State = EntityState.Detached;
            await _context.SaveChangesAsync();
        }

        public async void deleteOperacao(long id)
        {
            var operacao = await _context.Operacoes.FindAsync(id);
            _context.Operacoes.Remove(operacao);
            _context.Entry(operacao).State = EntityState.Deleted;
            await _context.SaveChangesAsync();
        }
    }
}