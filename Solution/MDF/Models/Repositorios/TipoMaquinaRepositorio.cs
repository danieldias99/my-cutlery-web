using MDF.Models.ClassesDeDominio;
using MDF.Models.DTO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MDF.Associations;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace MDF.Models.Repositorios
{

    public class TipoMaquinaRepositorio
    {

        private readonly MDFContext _context;

        public TipoMaquinaRepositorio(MDFContext context)
        {
            _context = context;
        }

        public async Task<ActionResult<TipoMaquina>> getTipoMaquinaById(long id)
        {
            var tipoMaquina = await _context.TiposMaquina.FindAsync(id);
            setOperacoesTipoMaquina(tipoMaquina);
            return tipoMaquina;
        }

        public async Task<ActionResult<List<TipoMaquina>>> getAllTipoMaquina()
        {
            return await _context.TiposMaquina.ToListAsync();
        }

        public void addTipoMaquina(TipoMaquina newTipoMaquina)
        {
            _context.TiposMaquina.Add(newTipoMaquina);
            _context.SaveChanges();
        }

        public void updateTipoMaquina(TipoMaquina update_TipoMaquina)
        {
            _context.Entry(update_TipoMaquina).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void setOperacoesTipoMaquina(TipoMaquina tipoMaquina)
        {
            var all_tipos = _context.TipoMaquinaOperacao;

            foreach (TipoMaquinaOperacao tipo in all_tipos)
            {
                if (tipo.id_tipoMaquina == tipoMaquina.id_tipoMaquina)
                {
                    var operacao = _context.Operacoes.Find(tipo.id_operacao);
                }
            }
        }

        public async void deleteTipoMaquina(long id)
        {
            var tipoMaquina = await _context.TiposMaquina.FindAsync(id);
            _context.TiposMaquina.Remove(tipoMaquina);
            _context.Entry(tipoMaquina).State = EntityState.Deleted;
            _context.SaveChanges();
        }

    }
}