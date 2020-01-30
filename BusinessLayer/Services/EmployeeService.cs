using BusinessLayer.Models;
using BusinessLayer.Services.Interfaces;
using DataAccessLayer;
using DataAccessLayer.DbObjects;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLayer.Services
{
    public class EmployeeService : IEmployeeService
    {
        private readonly MyContext _context;

        public EmployeeService(MyContext context)
        {
            _context = context;
        }

        public async Task<List<EmployeeModel>> GetEmployeeList()
        {
            List<EmployeeModel> employeeList = (from e in await _context.Employee.Include(o => o.Subdivision).AsNoTracking().ToListAsync() select e)
                .Select(e => new EmployeeModel(e)).OrderBy(e => e.FullName).ToList();

            return employeeList;
        }

        public async Task<List<EmployeeModel>> GetEmployeeListForSubdivision(int subdivisionId)
        {
            List<EmployeeModel> employeeList = (from e in await _context.Employee.Include(o => o.Subdivision).AsNoTracking().ToListAsync() select e)
                .Select(e => new EmployeeModel(e)).OrderBy(e => e.FullName).ToList();

            employeeList = employeeList.Where(s => s.SubdivisionId == subdivisionId).ToList();

            return employeeList;
        }

        public async Task AddEmployee(EmployeeModel employee)
        {
            Employee entity = employee.FillToEntity();

            _context.Employee.Add(entity);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                throw new Exception("Ошибка добавления в базу данных.");
            }
        }

        public async Task<EmployeeModel> GetEmployee(int id)
        {
            Employee entity = await _context.Employee.Include(o => o.Subdivision).AsNoTracking().FirstOrDefaultAsync(e => e.EmployeeId == id);

            EmployeeModel employee = entity is null ? new EmployeeModel() : new EmployeeModel(entity);

            return employee;
        }

        public async Task UpdateEmployee(EmployeeModel employee)
        {
            Employee entity = employee.FillToEntity();

            _context.Entry(entity).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                throw new Exception("Ошибка обновления данных");
            }
        }

        public async Task DeleteEmployee(int id)
        {
            Employee emp = await _context.Employee.FindAsync(id);

            _context.Employee.Remove(emp);

            await _context.SaveChangesAsync();
        }
    }
}
