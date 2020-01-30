using DataAccessLayer.DbObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DataAccessLayer
{
    public class SampleData
    {
        public static void InitDataBase(MyContext context)
        {
            if (!context.Subdivision.Any())
            {
                context.Subdivision.Add(new Subdivision() { SubdivisionName = "Центральное подразделение", ParentId = null });

                context.SaveChanges();

                int firstSubdivisionIndex = context.Subdivision.First().SubdivisionId;

                context.Subdivision.AddRange(
                    new Subdivision() { SubdivisionName = "Тверской филиал", ParentId = firstSubdivisionIndex },
                    new Subdivision() { SubdivisionName = "Смоленский филиал", ParentId = firstSubdivisionIndex });

                context.SaveChanges();

                int nextSubdivisionIndex = context.Subdivision.Last().SubdivisionId;

                context.Subdivision.AddRange(
                    new Subdivision() { SubdivisionName = "Вяземский филиал", ParentId = nextSubdivisionIndex },
                    new Subdivision() { SubdivisionName = "Сафоновский филиал", ParentId = nextSubdivisionIndex });

                context.SaveChanges();
            }

            if (!context.Employee.Any())
            {
                int firstSubdivisionIndex = context.Subdivision.First().SubdivisionId;

                int lastSubdivisionIndex = context.Subdivision.Last().SubdivisionId;

                List<Employee> EmployeeInitList = new List<Employee>
                {
                    new Employee(){ Name = "Иван", Surname = "Иванов", MiddleName = "Иванович", Position = "Директор", Phone = "8-999-999-99-99", SubdivisionId = firstSubdivisionIndex },
                    new Employee(){ Name = "Сергей", Surname = "Сергеев", MiddleName = "Сергеевич", Position = "Менеджер", Phone = "8-999-999-99-88", SubdivisionId = lastSubdivisionIndex },
                    new Employee(){ Name = "Петр", Surname = "Петров", MiddleName = "Петрович", Position = "Директор", Phone = "8-999-888-99-99", SubdivisionId = firstSubdivisionIndex },
                    new Employee(){ Name = "Алексей", Surname = "Алексеев", MiddleName = "Алексеевич", Position = "Бухгалтер", Phone = "8-999-888-77-99", SubdivisionId = lastSubdivisionIndex },
                    new Employee(){ Name = "Ольга", Surname = "Иванова", MiddleName = "Ивановна", Position = "Бухгалтер", Phone = "8-999-999-99-77", SubdivisionId = firstSubdivisionIndex }
                };

                context.Employee.AddRange(EmployeeInitList);

                context.SaveChanges();
            }
        }
    }
}
