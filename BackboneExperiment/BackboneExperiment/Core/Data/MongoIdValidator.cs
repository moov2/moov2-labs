using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MongoDB.Bson;

namespace BackboneExperiment.Core.Data
{
    public static class MongoIdValidator
    {
        public static bool Check(string id)
        {
            ObjectId result;
            return ObjectId.TryParse(id, out result);
        }
    }
}