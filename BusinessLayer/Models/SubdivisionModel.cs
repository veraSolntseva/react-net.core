using DataAccessLayer.DbObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BusinessLayer.Models
{
    public class SubdivisionModel
    {
        public SubdivisionModel() { }
        public SubdivisionModel(Subdivision subdivision)
        {
            this.SubdivisionId = subdivision.SubdivisionId;
            this.SubdivisionName = subdivision.SubdivisionName;
            this.ParentId = subdivision.ParentId.HasValue ? subdivision.ParentId : 0;
        }
        public Subdivision FillToEntity()
        {
            return new Subdivision
            {
                ParentId = this.ParentId == 0 ? null : this.ParentId,
                SubdivisionName = this.SubdivisionName,
                SubdivisionId = this.SubdivisionId
            };
        }
        public int SubdivisionId { get; set; }
        public string SubdivisionName { get; set; }
        public int? ParentId { get; set; }
        public string ParentName { get; set; }
    }
}
