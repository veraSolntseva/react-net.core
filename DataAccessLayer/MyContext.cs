﻿using DataAccessLayer.DbObjects;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccessLayer
{
    public class MyContext : DbContext
    {
        public DbSet<Employee> Employee { get; set; }
        public DbSet<Subdivision> Subdivision { get; set; }

        public MyContext(DbContextOptions<MyContext> options): base(options) { }
    }
}
