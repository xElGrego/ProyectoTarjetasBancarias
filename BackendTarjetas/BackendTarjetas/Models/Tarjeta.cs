using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BackendTarjetas.Models
{
  public class Tarjeta
  {
 

    [Required]
    public int Id { get; set; }

    [Required]
    public string Titular { get; set; }

    [Required]
    public string NumeroTarjeta { get; set; }

    [Required]
    public string FechaExpiracion { get; set; }

    [Required]
    public string Cvv { get; set; }
  }
}
