using BusinessLayer.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLayer.Services.Interfaces
{
    public interface IEmployeeService
    {
        Task<List<EmployeeModel>> GetEmployeeList();

        Task<List<EmployeeModel>> GetEmployeeListForSubdivision(int subdivisionId);

        Task<EmployeeModel> GetEmployee(int employeeId);

        Task AddEmployee(EmployeeModel employee);

        Task UpdateEmployee(EmployeeModel employee);

        Task DeleteEmployee(int employeeId);
    }
}
