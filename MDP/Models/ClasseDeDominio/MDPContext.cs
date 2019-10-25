using Microsoft.EntityFrameworkCore;
using MDP.Models.ValueObjects;
using MDP.Models;

namespace MDP.Models.ClassesDeDominio
{
    public class MDPContext : DbContext
    {
        public MDPContext(DbContextOptions<MDPContext> options) : base(options) { }

        public DbSet<PlanoFabrico> PlanosProducao { get; set; }
        

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //Tipo Maquina
            /*modelBuilder.Entity<PlanoFabrico>().HasKey(a => a.Id);
            modelBuilder.Entity<PlanoFabrico>().Property(a => a.Id).HasConversion(v => v.id_planoFabrico, v => new ID_TipoMaquina(v));*/

        }

    }
}