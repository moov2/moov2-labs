using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using BackboneExperiment.Core.Data;
using MongoDB.Bson;

namespace BackboneExperiment.Models
{
    public class Game
    {
        public ObjectId Id { get; set; }
        public string IdAsString { get { return Id.ToString(); } set { } }
        public string Title { get; set; }
        public string Genre { get; set; }
    }

    public class GameDto
    {
        public string id { get; set; }
        public string title { get; set; }
        public string genre { get; set; }

        public GameDto() { }

        public GameDto(Game game)
        {
            id = game.IdAsString;
            title = game.Title;
            genre = game.Genre;
        }
    }

    public static class GameExtensions
    {
        public static GameDto ToDto(this Game game){
            return new GameDto(game);
        }

        public static Game ToGame(this GameDto gameDto)
        {
            if (!MongoIdValidator.Check(gameDto.id)) gameDto.id = ObjectId.Empty.ToString();
            return new Game
            {
                Id = new ObjectId(gameDto.id),
                Title = gameDto.title,
                Genre = gameDto.genre
            };
        }
    }
}