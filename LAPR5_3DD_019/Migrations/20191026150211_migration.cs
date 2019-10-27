﻿using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace LAPR5_3DD_019.Migrations
{
    public partial class migration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "LinhasProducao",
                columns: table => new
                {
                    Id = table.Column<float>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LinhasProducao", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Operacoes",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    descricaoOperacao_Id = table.Column<string>(nullable: true),
                    duracaoOperacao_hora = table.Column<int>(nullable: false),
                    duracaoOperacao_min = table.Column<int>(nullable: false),
                    duracaoOperacao_seg = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Operacoes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Produtos",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false),
                    informacaoProduto_nomeProduto = table.Column<string>(nullable: true),
                    informacaoProduto_descricaoProduto = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Produtos", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TiposMaquina",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false),
                    descricaoTipoMaquina_Id = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TiposMaquina", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Maquinas",
                columns: table => new
                {
                    nomeMaquina = table.Column<string>(nullable: false),
                    posicaoLinhaProducao_posicaoNaLinhaProducao = table.Column<int>(nullable: false),
                    tipoMaquinaId = table.Column<long>(nullable: true),
                    LinhaProducaoId = table.Column<float>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Maquinas", x => x.nomeMaquina);
                    table.ForeignKey(
                        name: "FK_Maquinas_LinhasProducao_LinhaProducaoId",
                        column: x => x.LinhaProducaoId,
                        principalTable: "LinhasProducao",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Maquinas_TiposMaquina_tipoMaquinaId",
                        column: x => x.tipoMaquinaId,
                        principalTable: "TiposMaquina",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "TipoMaquinaOperacao",
                columns: table => new
                {
                    id_tipoMaquina = table.Column<long>(nullable: false),
                    id_operacao = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TipoMaquinaOperacao", x => new { x.id_operacao, x.id_tipoMaquina });
                    table.ForeignKey(
                        name: "FK_TipoMaquinaOperacao_Operacoes_id_operacao",
                        column: x => x.id_operacao,
                        principalTable: "Operacoes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TipoMaquinaOperacao_TiposMaquina_id_tipoMaquina",
                        column: x => x.id_tipoMaquina,
                        principalTable: "TiposMaquina",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Maquinas_LinhaProducaoId",
                table: "Maquinas",
                column: "LinhaProducaoId");

            migrationBuilder.CreateIndex(
                name: "IX_Maquinas_tipoMaquinaId",
                table: "Maquinas",
                column: "tipoMaquinaId");

            migrationBuilder.CreateIndex(
                name: "IX_TipoMaquinaOperacao_id_tipoMaquina",
                table: "TipoMaquinaOperacao",
                column: "id_tipoMaquina");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Maquinas");

            migrationBuilder.DropTable(
                name: "Produtos");

            migrationBuilder.DropTable(
                name: "TipoMaquinaOperacao");

            migrationBuilder.DropTable(
                name: "LinhasProducao");

            migrationBuilder.DropTable(
                name: "Operacoes");

            migrationBuilder.DropTable(
                name: "TiposMaquina");
        }
    }
}
