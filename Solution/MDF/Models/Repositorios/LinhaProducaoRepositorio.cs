using MDF.Models.ClassesDeDominio;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MDF.Associations;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace MDF.Models.Repositorios
{

    public class LinhaProducaoRepositorio
    {

        private readonly MDFContext _context;

        public LinhaProducaoRepositorio(MDFContext context)
        {
            _context = context;
        }

        public async Task<ActionResult<LinhaProducao>> getLinhaProducaoById(long id)
        {
            var linhaOp = await _context.LinhasProducao.FindAsync(id);
            setMaquinaLinhaProducao(linhaOp);
            return linhaOp;
        }

        public async Task<ActionResult<List<LinhaProducao>>> getAllLinhasProducao()
        {
            return await _context.LinhasProducao.ToListAsync();
        }

        public void addLinhaProducao(LinhaProducao newLinhaProducao)
        {
            _context.LinhasProducao.Add(newLinhaProducao);
            _context.SaveChanges();
        }

        public void setMaquinaLinhaProducao(LinhaProducao linhaProducao)
        {
            var all_linhasProducao = _context.LinhaProducaoMaquinas;

            foreach (LinhaProducaoMaquinas linha in all_linhasProducao)
            {
                if (linha.id_linhaProducao == linhaProducao.id)
                {
                    linha.maquina = _context.Maquinas.Find(linha.id_maquina);
                    linhaProducao.addMaquina(linha);
                }
            }
        }

        public void updateLinhaProducao(LinhaProducao update_linha)
        {
            _context.Entry(update_linha).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public async void deleteLinhaProducao(long id)
        {
            var linha = await _context.LinhasProducao.FindAsync(id);
            _context.LinhasProducao.Remove(linha);
            _context.Entry(linha).State = EntityState.Deleted;
            _context.SaveChanges();
        }
    }
}