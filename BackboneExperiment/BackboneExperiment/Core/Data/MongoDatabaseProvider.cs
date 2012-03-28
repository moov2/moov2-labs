using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using Simple.Data;
using Simple.Data.MongoDB;

namespace BackboneExperiment.Core.Data
{
    public class MongoDatabaseProvider : IDatabaseProvider
    {

        public dynamic GetDb()
        {
            return Database.Opener.OpenMongo(ConfigurationManager.ConnectionStrings["MongoDb"].ConnectionString);
        }
    }

    public interface IDatabaseProvider
    {
        dynamic GetDb();
    }
}