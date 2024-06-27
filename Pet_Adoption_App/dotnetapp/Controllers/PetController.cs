using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using dotnetapp.Models;
using dotnetapp.Data;

namespace dotnetapp.Controllers
{
    public class PetController : Controller
    {
        private readonly ApplicationDbContext _dbContext;

        public PetController(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IActionResult Index()
        {
            var pets = _dbContext.Pets.ToList();
            return View(pets);
        }

        public IActionResult Delete(int petId)
        {
            var pet = _dbContext.Pets.FirstOrDefault(p => p.PetID == petId);
            if (pet == null)
            {
                return NotFound();
            }

            return View(pet);
        }

        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public IActionResult DeleteConfirmed(int petId)
        {
            var pet = _dbContext.Pets.FirstOrDefault(p => p.PetID == petId);
            if (pet == null)
            {
                return NotFound();
            }

            _dbContext.Pets.Remove(pet);
            _dbContext.SaveChanges();

            return RedirectToAction(nameof(Index));
        }

        public IActionResult Search(string name)
        {
            if (string.IsNullOrEmpty(name))
            {
                return RedirectToAction(nameof(Index));
            }

            var lowerName = name.ToLower();

            var pets = _dbContext.Pets
                .Where(p => EF.Functions.Like(p.Name.ToLower(), "%" + lowerName + "%"))
                .ToList();

            var exactMatch = pets.FirstOrDefault(p => p.Name.ToLower() == lowerName);

            if (exactMatch == null)
            {
                TempData["Message"] = $"No pet found matching '{name}'.";
                return RedirectToAction(nameof(Index));
            }

            return View(nameof(Index), pets);
        }
    }
}
