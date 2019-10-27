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
            modelBuilder.Entity<PlanoFabrico>().HasKey(a => a.Id);

        }

    }
}