using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BusinessLayer.Models;
using BusinessLayer.Services.Interfaces;
using DataAccessLayer;
using DataAccessLayer.DbObjects;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;

namespace ReactCrudApp.Controllers
{
    [Route("api/[controller]")]
    public class SubdivisionController : Controller
    {
        private readonly ISubdivisionService _subdivisionService;
        private readonly IEmployeeService _employeeService;

        public SubdivisionController(ISubdivisionService subdivisionService, IEmployeeService employeeService)
        {
            _subdivisionService = subdivisionService;
            _employeeService = employeeService;
        }

        [HttpGet("[action]")]
        public async Task<List<SubdivisionTreeItemModel>> GetSubdivisionTree()
        {
            List<SubdivisionTreeItemModel> subdivisionTree = await _subdivisionService.GetSubdivisionTree();

            return subdivisionTree;
        }

        [HttpGet("[action]/{id}")]
        public async Task<List<SelectListItem>> GetSubdivisionList(int id)
        {
            List<SubdivisionModel> subdivisionList = await _subdivisionService.GetSubdivisionListWithoutChild(id);

            List<SelectListItem> selectSubdivisionList = new SelectList(subdivisionList.OrderBy(s => s.SubdivisionName), "SubdivisionId", "SubdivisionName").ToList();

            selectSubdivisionList.Insert(0, (new SelectListItem { Text = "Нет", Value = "0" }));

            return selectSubdivisionList;
        }

        [HttpGet("[action]/{id}")]
        public async Task<SubdivisionModel> Details(int id)
        {
            SubdivisionModel subdivision = await _subdivisionService.GetSubdivision(id);

            return subdivision;
        }

        [HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> Create(SubdivisionModel subdivision)
        {
            try
            {
                await _subdivisionService.AddSubdivision(subdivision);
            }
            catch
            {
                return BadRequest();
            }

            return Ok();
        }

        [HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> Edit(SubdivisionModel subdivision)
        {
            try
            {
                await _subdivisionService.UpdateSubdivision(subdivision);
            }
            catch
            {
                return BadRequest();
            }

            return Ok();
        }

        [HttpGet("[action]/{id}")]
        public async Task<JsonResult> Delete(int id)
        {
            List<EmployeeModel> employeeListForSubdivision = await _employeeService.GetEmployeeListForSubdivision(id);

            if (employeeListForSubdivision is null || employeeListForSubdivision.Count == 0)
            {
                List<SubdivisionModel> childrenSubdivisionList = await _subdivisionService.GetSubdivisionChildList(id);

                if (childrenSubdivisionList is null || childrenSubdivisionList.Count == 0)
                {
                    try
                    {
                        await _subdivisionService.DeleteSubdivision(id);
                    }
                    catch (Exception ex)
                    {
                        return Json(ex.Message);
                    }
                }
                else
                    return Json("Нельзя удалить подразделение, так как у него есть дочерние подразделения!");
            }
            else
                return Json("Нельзя удалить подразделение, так как в нем есть сотрудники!");

            List<SubdivisionTreeItemModel> subdivisionTree = await _subdivisionService.GetSubdivisionTree();

            return Json(subdivisionTree);
        }

    }
}
