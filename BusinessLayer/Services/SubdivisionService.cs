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
    public class SubdivisionService : ISubdivisionService
    {
        private readonly MyContext _context;

        public SubdivisionService(MyContext context)
        {
            _context = context;
        }

        public async Task<List<SubdivisionModel>> GetSubdivisionChildList(int id) 
        {
            List<Subdivision> subdivisionChildList = (from s in await _context.Subdivision.AsNoTracking().ToListAsync() select s)
        .Where(s => s.ParentId == id).ToList();

            return subdivisionChildList.Select(s=> new SubdivisionModel(s)).ToList();
        }


        public async Task<List<SubdivisionTreeItemModel>> GetSubdivisionTree()
        {
            List<Subdivision> subdivisionList = (from s in await _context.Subdivision.AsNoTracking().ToListAsync() select s)
                .OrderBy(s => s.SubdivisionName).ToList();

            List<Subdivision> headSubdivisionList = subdivisionList.Where(s => !s.ParentId.HasValue || s.ParentId.Value == 0).ToList();

            List<SubdivisionTreeItemModel> subdivisionTree = subdivisionTreeList(headSubdivisionList);

            List<SubdivisionTreeItemModel> subdivisionTreeList(List<Subdivision> subdivisions)
            {
                List<SubdivisionTreeItemModel> resultList = new List<SubdivisionTreeItemModel>();

                foreach (var subdivision in subdivisions)
                {
                    SubdivisionTreeItemModel itemTree = new SubdivisionTreeItemModel(subdivision);

                    List<Subdivision> itemChildList = subdivisionList.Where(s => s.ParentId.HasValue && s.ParentId.Value == subdivision.SubdivisionId).ToList();

                    if (itemChildList != null && itemChildList.Count > 0)
                    {
                        itemTree.ChildList = subdivisionTreeList(itemChildList);
                    }

                    resultList.Add(itemTree);
                }
                return resultList;
            }
            return subdivisionTree;
        }

        public async Task<List<SubdivisionModel>> GetSubdivisionListWithoutChild(int id)
        {
            List<Subdivision> subdivisionList = (from s in await _context.Subdivision.AsNoTracking().ToListAsync() select s)
                .Where(s => s.SubdivisionId != id).ToList();

            List<Subdivision> allSubdivisionChildList = new List<Subdivision>();

            void getAllChild(int subdivisionId)
            {
                List<Subdivision> childList = subdivisionList.Where(s => s.ParentId.HasValue && s.ParentId.Value == subdivisionId).ToList();

                allSubdivisionChildList.AddRange(childList);

                foreach (var child in childList)
                    getAllChild(child.SubdivisionId);
            }

            if (id > 0)
                getAllChild(id);

            List<Subdivision> resultList = subdivisionList.Except(allSubdivisionChildList).ToList();

            return resultList.Select(s => new SubdivisionModel(s)).ToList();
        }

        public async Task<List<SubdivisionModel>> GetAllSubdivisionList()
        {
            List<Subdivision> subdivisionList = await _context.Subdivision.AsNoTracking().ToListAsync();

            return subdivisionList.Select(s => new SubdivisionModel(s)).ToList();
        }

        public async Task<SubdivisionModel> GetSubdivision(int id)
        {
            Subdivision entity = await _context.Subdivision.AsNoTracking().FirstOrDefaultAsync(s => s.SubdivisionId == id);

            SubdivisionModel subdivision = new SubdivisionModel(entity);

            if (subdivision.ParentId.HasValue && subdivision.ParentId != 0)
            {
                Subdivision parentSubdivision = await _context.Subdivision.AsNoTracking().FirstOrDefaultAsync(s => s.SubdivisionId == subdivision.ParentId.Value);

                subdivision.ParentName = parentSubdivision.SubdivisionName;
            }

            return subdivision;
        }

        public async Task AddSubdivision(SubdivisionModel subdivision)
        {
            Subdivision entity = subdivision.FillToEntity();

            try
            {
                _context.Subdivision.Add(entity);

                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                throw new Exception("Ошибка добавления в базу данных");
            }
        }

        public async Task UpdateSubdivision(SubdivisionModel subdivision)
        {
            Subdivision entity = subdivision.FillToEntity();

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

        public async Task DeleteSubdivision(int id)
        {
            Subdivision subdivision = await _context.Subdivision.FindAsync(id);

            if (subdivision != null)
            {
                _context.Subdivision.Remove(subdivision);

                await _context.SaveChangesAsync();
            }
            else
                throw new Exception("Объект не найден.");
        }
    }
}
