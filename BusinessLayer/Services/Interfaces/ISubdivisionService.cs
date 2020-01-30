using BusinessLayer.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLayer.Services.Interfaces
{
    public interface ISubdivisionService
    {
        Task<List<SubdivisionModel>> GetSubdivisionListWithoutChild(int id);

        Task<List<SubdivisionModel>> GetAllSubdivisionList();

        Task<List<SubdivisionModel>> GetSubdivisionChildList(int id);

        Task<SubdivisionModel> GetSubdivision(int subdivisionId);

        Task<List<SubdivisionTreeItemModel>> GetSubdivisionTree();

        Task AddSubdivision(SubdivisionModel subdivision);

        Task UpdateSubdivision(SubdivisionModel subdivision);

        Task DeleteSubdivision(int subdivisionId);
    }
}
