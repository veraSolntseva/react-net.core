using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccessLayer.DbObjects
{
    public class Employee
    {
        public int EmployeeId { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string MiddleName { get; set; }
        public string Position { get; set; }
        public int SubdivisionId { get; set; }
        public string Phone { get; set; }

        public Subdivision Subdivision { get; set; }
    }
}
