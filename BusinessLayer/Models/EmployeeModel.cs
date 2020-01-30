
using DataAccessLayer.DbObjects;

namespace BusinessLayer.Models
{
    public class EmployeeModel
    {
        public EmployeeModel() { }
        public EmployeeModel(Employee employee)
        {
            this.EmployeeId = employee.EmployeeId;
            this.MiddleName = employee.MiddleName;
            this.Name = employee.Name;
            this.Phone = employee.Phone;
            this.Position = employee.Position;
            this.SubdivisionId = employee.SubdivisionId;
            this.Surname = employee.Surname;
            this.Subdivision = new SubdivisionModel(employee.Subdivision);
        }

        public Employee FillToEntity()
        {
            return new Employee
            {
                EmployeeId = this.EmployeeId,
                MiddleName = this.MiddleName,
                Name = this.Name,
                Phone = this.Phone,
                Position = this.Position,
                SubdivisionId = this.SubdivisionId,
                Surname = this.Surname
            };
        }

        public int EmployeeId { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string MiddleName { get; set; }
        public string Position { get; set; }
        public int SubdivisionId { get; set; }
        public string Phone { get; set; }
        public string FullName => this.Surname + " " + this.Name + " " + this.MiddleName;
        public SubdivisionModel Subdivision { get; set; }

    }
}
