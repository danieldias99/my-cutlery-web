using LAPR5_3DD_019.Models.ClassesDeDominio;
using LAPR5_3DD_019.Models.DTO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using LAPR5_3DD_019.Associations;
using System.Collections.Generic;

namespace LAPR5_3DD_019.Models.Repositorios
{

    public class TipoMaquinaRepositorio
    {

        private readonly MDFContext _context;

        public TipoMaquinaRepositorio(MDFContext context)
        {
            _context = context;
        }

        public async Task<ActionResult<TipoMaquinaDTO>> getTipoMaquinaById(long id)
        {
            var tipoMaquina = _context.TiposMaquina.Find(id);
            setOperacoesTipoMaquina(tipoMaquina);
            return tipoMaquina.toDTO();
        }

        public void addTipoMaquina(TipoMaquina newTipoMaquina)
        {
            setOperacoesTipoMaquina(newTipoMaquina);
            _context.TiposMaquina.Add(newTipoMaquina);
            _context.SaveChanges();
        }

        public void setOperacoesTipoMaquina(TipoMaquina tipoMaquina)
        {
            var all_tipos = _context.TipoMaquinaOperacao;

            foreach (TipoMaquinaOperacao tipo in all_tipos)
            {
                if (tipo.id_tipoMaquina == tipoMaquina.Id)
                {
                    tipo.operacao = _context.Operacoes.Find(tipo.id_operacao);
                    tipoMaquina.addOperacao(tipo);
                }
            }
        }
    }
}