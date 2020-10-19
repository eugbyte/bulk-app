using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BulkApi.Exceptions
{
    public class EntityNotFoundException : NullReferenceException
    {
        public EntityNotFoundException() 
        {
        }

        public EntityNotFoundException(int id, Type entityType) : base($"{entityType.Name} wtih id {id} cannot be found")
        {
        }

        public EntityNotFoundException(string id, Type entityType) : base($"{entityType.Name} wtih id {id} cannot be found")
        {
        }

        public EntityNotFoundException(string message) : base(message)
        {
        }

        public EntityNotFoundException(string message, Exception inner) : base(message, inner)
        {
        }


    }
}
