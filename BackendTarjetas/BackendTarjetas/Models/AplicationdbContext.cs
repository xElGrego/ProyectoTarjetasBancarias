using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendTarjetas.Models
{
  public class AplicationdbContext : DbContext
  {
    //Con DBContext  crea una instancia de la base de datos para hacer todo tipo de consultas;almacernar datos hacer querys etc.

    //Se mapea el modelo con la base de datos
    public DbSet<Tarjeta> TarjetaCredito { get; set; }



    //Controlador 
    public AplicationdbContext(DbContextOptions<AplicationdbContext> options) : base(options)
    {

    }
  }
}
