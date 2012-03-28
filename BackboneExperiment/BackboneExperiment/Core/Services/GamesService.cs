using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using BackboneExperiment.Core.Data;
using BackboneExperiment.Models;
using MongoDB.Bson;

namespace BackboneExperiment.Core.Services
{
    public class GamesService : IGamesService
    {
        private dynamic _db;

        public GamesService(IDatabaseProvider databaseProvider)
        {
            _db = databaseProvider.GetDb();
        }

        public Game Get(string id)
        {
            return Get(new ObjectId(id));
        }

        public Game Get(ObjectId id)
        {
            return _db.Games.FindById(id);
        }

        public List<Game> All(){
            return _db.Games.All().ToList<Game>();
        }

        public void Delete(string id)
        {
            Delete(new ObjectId(id));
        }

        public void Delete(ObjectId id)
        {
            _db.Games.DeleteById(id);
        }

        public Game Save(Game game)
        {
            if (game.Id != ObjectId.Empty)
                return Update(game);
            else
                return Create(game);
        }

        public Game Create(Game game)
        {
            var output = _db.Games.Insert(game);
            var outputGame = (Game)output;
            outputGame.Id = output._id;
            return outputGame;
        }

        public Game Update(Game game)
        {
            _db.Games.Update(game);
            return Get(game.Id);
        }

        public Game Update(string id, Game game)
        {
            game.Id = new ObjectId(id);
            return Update(game);
        }

        public bool Exists(string id)
        {
            return Get(id) != null;
        }
    }

    public interface IGamesService
    {
        Game Get(string id);
        Game Get(ObjectId id);
        List<Game> All();
        void Delete(string id);
        void Delete(ObjectId id);
        Game Save(Game game);
        Game Create(Game game);
        Game Update(Game game);
        Game Update(string id, Game game);
        bool Exists(string id);
    }
}