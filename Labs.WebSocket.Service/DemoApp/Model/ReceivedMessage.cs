using System;

namespace Labs.WebSocket.Service.DemoApp.Model
{
    public class ReceivedMessage
    {
        public string Alias { get; set; }
        public string Command { get; set; }
        public string Message { get; set; }
    }
}
