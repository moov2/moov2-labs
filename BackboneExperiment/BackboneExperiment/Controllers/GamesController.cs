using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using BackboneExperiment.Core.Data;
using BackboneExperiment.Core.Services;
using BackboneExperiment.Models;

namespace BackboneExperiment.Controllers
{
    public class GamesController : ApiController
    {
        private IGamesService _gamesService;

        public GamesController(IGamesService gamesService)
        {
            _gamesService = gamesService;
        }

        #region Get

        public HttpResponseMessage<List<GameDto>> Get()
        {
            return new HttpResponseMessage<List<GameDto>>(_gamesService.All().Select(x=>x.ToDto()).ToList(), HttpStatusCode.OK);
        }

        public HttpResponseMessage<GameDto> Get(string id)
        {
            if (!CheckId(id)) throw new HttpResponseException(HttpStatusCode.NotFound);
            var game = _gamesService.Get(id);
            if (game == null) throw new HttpResponseException(HttpStatusCode.NotFound);
            return new HttpResponseMessage<GameDto>(game.ToDto(), HttpStatusCode.OK);
        }

        #endregion

        #region Post

        public HttpResponseMessage<GameDto> Post(GameDto game)
        {
            var created = _gamesService.Create(game.ToGame());
            if (created == null) throw new HttpResponseException(HttpStatusCode.BadRequest);
            return new HttpResponseMessage<GameDto>(created.ToDto(), HttpStatusCode.Created);
        }

        #endregion

        #region Delete

        public HttpResponseMessage Delete(string id)
        {
            if (!CheckIdAndExists(id)) throw new HttpResponseException(HttpStatusCode.NotFound);
            _gamesService.Delete(id);
            return new HttpResponseMessage(HttpStatusCode.OK);
        }

        #endregion

        #region Put

        public HttpResponseMessage<GameDto> Put(string id, GameDto game)
        {
            if (!CheckIdAndExists(id)) throw new HttpResponseException(HttpStatusCode.NotFound);
            var updated = _gamesService.Update(id, game.ToGame());
            return new HttpResponseMessage<GameDto>(updated.ToDto(), HttpStatusCode.OK);
        }

        #endregion

        private bool CheckId(string id)
        {
            return MongoIdValidator.Check(id);
        }

        private bool CheckExists(string id)
        {
            return _gamesService.Exists(id);
        }

        private bool CheckIdAndExists(string id)
        {
            if (!CheckId(id)) return false;
            if (!CheckExists(id)) return false;
            return true;
        }
    }
}
