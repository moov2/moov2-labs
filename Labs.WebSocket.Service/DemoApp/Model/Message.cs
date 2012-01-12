using System;

namespace Labs.WebSocket.Service.DemoApp.Model
{
    public class Message
    {
        public static string Convo = "convo";
        public static string Activity = "activity";

        public string Detail { get; set; }
        public string From { get; set; }
        public string Type { get; set; }
    }
}
