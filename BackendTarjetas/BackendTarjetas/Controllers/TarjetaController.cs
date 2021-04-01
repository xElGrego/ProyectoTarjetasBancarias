using BackendTarjetas.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BackendTarjetas.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class TarjetaController : ControllerBase
  {
    private readonly AplicationdbContext _context;
    public TarjetaController(AplicationdbContext context)
    {
      _context = context;
    }



    // GET: api/<TarjetaController>
    [HttpGet]
    public async Task<IActionResult> Get()
    {
      try
      {
        var listadoTarjetas = await _context.TarjetaCredito.ToListAsync();
        return Ok(listadoTarjetas);
      }
      catch(Exception ex)
      {
        return BadRequest(ex.Message);
      }
    }

    // GET api/<TarjetaController>/5
   

    // POST api/<TarjetaController>
    [HttpPost]
    public async Task<IActionResult> Post([FromBody] Tarjeta tarjeta)
    {
      try
      {
        _context.Add(tarjeta);
        await _context.SaveChangesAsync();
        return Ok(tarjeta);
      }
      catch (Exception ex)
      {
        return BadRequest(ex.Message);
      }
    }

    // PUT api/<TarjetaController>/5
    [HttpPut("{id}")]
    public async Task<IActionResult> Put(int id, [FromBody] Tarjeta tarjeta)
    {
      try
      {

        if(id != tarjeta.Id)
        {
          return NotFound();
        }
        _context.Update(tarjeta);
        await _context.SaveChangesAsync();
        return Ok(new { message = "La tarjeta fue actualizada con exito" });
      }
      catch (Exception ex)
      {
        return BadRequest(ex.Message);
      }
    }

    // DELETE api/<TarjetaController>/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
      try
      {
        var tarjeta = await _context.TarjetaCredito.FindAsync(id);
        if (tarjeta == null)
        {
          return NotFound();
        }
        {
          _context.TarjetaCredito.Remove(tarjeta);
          await _context.SaveChangesAsync();
          return Ok(new { message = "La tarjeta fue eliminada con éxito!" });
        }
      }
      catch (Exception ex)
      {
        return BadRequest(ex.Message);
      }
    }
  }
}
