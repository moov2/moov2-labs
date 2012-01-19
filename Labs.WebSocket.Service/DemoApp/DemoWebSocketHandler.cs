using System;
using System.Linq;
using Labs.WebSocket.Service.WebSockets;
using System.Collections.Generic;
using Labs.WebSocket.Service.DemoApp.Model;
using Alchemy.Classes;
using Newtonsoft.Json;
using System.Text.RegularExpressions;

namespace Labs.WebSocket.Service.DemoApp
{
    public class DemoWebSocketHandler : WebSocketHandler
    {
        private IList<User> _users;

        public DemoWebSocketHandler()
        {
            _users = new List<User>();
        }

        public override void OnConnected(UserContext context)
        {
            Console.WriteLine("OnConnected");
            _users.Add(new User { Context = context });
        }

        public override void OnDisconnect(UserContext context)
        {
            Console.WriteLine("OnDisconnect");

            User user;

            try
            {
                user = _users.Where(o => o.Context.ClientAddress == context.ClientAddress).Single();
                _users.Remove(user);
            }
            catch { return; }

            SendToAll(new Message { Detail = "has left the conversation.", From = user.Username, Type = Message.Activity });
        }

        public override void OnReceive(UserContext context)
        {
            Console.WriteLine("OnReceive");

            var user = GetConnectedUserByContext(context);
            ReceivedMessage message;

            try
            {
                message = JsonConvert.DeserializeObject<ReceivedMessage>(context.DataFrame.ToString());
            }
            catch { return; }

            if (message.Command == "Register")
            {
                user.Username = message.Alias;
                SendToAll(new Message { Detail = "has joined the conversation.", From = user.Username, Type = Message.Activity });
                return;
            }

            var messageToSend = StripHTML(message.Message);
            SendToAll(new Message { Detail = messageToSend, From = user.Username, Type = Message.Convo });
        }

        private User GetConnectedUserByContext(UserContext context)
        {
            return _users.Where(u => u.Context.ClientAddress == context.ClientAddress).Single();
        }

        private void SendToAll(Message response)
        {
            foreach (var user in _users)
            {
                user.Context.Send(JsonConvert.SerializeObject(response));
            }
        }

        private string StripHTML(string message)
        {
            return Regex.Replace(message, @"<(.|\n)*?>", string.Empty);
        }
    }
}
