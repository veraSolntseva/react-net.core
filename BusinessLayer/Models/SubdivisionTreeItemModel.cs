using DataAccessLayer.DbObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BusinessLayer.Models
{
    public class SubdivisionTreeItemModel
    {
        public SubdivisionTreeItemModel() { }
        public SubdivisionTreeItemModel(Subdivision subdivision)
        {
            this.Id = subdivision.SubdivisionId;
            this.SubdivisionName = subdivision.SubdivisionName;
            this.ParentId = subdivision.ParentId;
        }
        public int Id { get; set; }
        public string SubdivisionName { get; set; }
        public int? ParentId { get; set; }
        public List<SubdivisionTreeItemModel> ChildList { get; set; } = new List<SubdivisionTreeItemModel>();
    }
}
