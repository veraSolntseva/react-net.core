using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using DataAccessLayer;
using DataAccessLayer.DbObjects;
using BusinessLayer.Models;
using BusinessLayer.Services.Interfaces;

namespace ReactCrudApp.Controllers
{
    [Route("api/[controller]")]
    public class EmployeeController : Controller
    {
        private readonly IEmployeeService _employeeService;
        private readonly ISubdivisionService _subdivisionService;

        public EmployeeController(IEmployeeService employeeService, ISubdivisionService subdivisionService)
        {
            _employeeService = employeeService;
            _subdivisionService = subdivisionService;
        }

        [HttpGet("[action]/{subdivisionId}")]
        public async Task<List<EmployeeModel>> Index(int? subdivisionId)
        {
            List<EmployeeModel> employeeList = subdivisionId.HasValue ?
                await _employeeService.GetEmployeeListForSubdivision(subdivisionId.Value) :
                await _employeeService.GetEmployeeList();

            return employeeList;
        }

        [HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> Create(EmployeeModel employee)
        {
            try
            {
                await _employeeService.AddEmployee(employee);
            }
            catch 
            {
                return BadRequest();
            }

            return Ok();
        }

        [HttpGet]
        [Route("[action]/{id}")]
        public async Task<EmployeeModel> Details(int id)
        {
            EmployeeModel employee = await _employeeService.GetEmployee(id);
            
            return employee;
        }

        [HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> Edit(EmployeeModel employee)
        {
            try
            {
                await _employeeService.UpdateEmployee(employee);
            }
            catch
            {
                return BadRequest();
            }

            return Ok();
        }

        [HttpDelete]
        [Route("[action]/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                await _employeeService.DeleteEmployee(id);
            }
            catch
            {
                return BadRequest();
            }

            return Ok();
        }

        [HttpGet("[action]")]
        public async Task<SelectList> GetSubdivisionList()
        {
            List<SubdivisionModel> subdivisionList = await _subdivisionService.GetAllSubdivisionList();

            return new SelectList(subdivisionList, "SubdivisionId", "SubdivisionName");
        }
    }
}
