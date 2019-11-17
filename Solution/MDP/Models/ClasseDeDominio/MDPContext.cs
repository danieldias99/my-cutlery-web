using Microsoft.EntityFrameworkCore;
using MDP.Models;

namespace MDP.Models.ClassesDeDominio
{
    public class MDPContext : DbContext
    {
        public MDPContext(DbContextOptions<MDPContext> options) : base(options) { }

        public DbSet<PlanoFabrico> PlanosProducao { get; set; }

        public DbSet<Produto> Produtos { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<PlanoFabrico>().HasKey(a => a.Id);

            //Produto
            modelBuilder.Entity<Produto>().HasKey(f => f.Id);
            modelBuilder.Entity<Produto>().Property(f => f.Id).ValueGeneratedNever();

            modelBuilder.Entity<Produto>().OwnsOne(f => f.informacaoProduto);


        }

    }
}