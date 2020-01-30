using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccessLayer.DbObjects
{
    public class Subdivision
    {
        public int SubdivisionId { get; set; }
        public string SubdivisionName { get; set; }
        public int? ParentId { get; set; }

        public virtual List<Employee> Employees { get; set; }
    }
}
