namespace Labs.WebSocket.Service
{
    partial class ProjectInstaller
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary> 
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Component Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.webSocketDemoServiceProcessInstaller = new System.ServiceProcess.ServiceProcessInstaller();
            this.webSocketDemoServiceInstaller = new System.ServiceProcess.ServiceInstaller();
            // 
            // webSocketDemoServiceProcessInstaller
            // 
            this.webSocketDemoServiceProcessInstaller.Account = System.ServiceProcess.ServiceAccount.LocalSystem;
            this.webSocketDemoServiceProcessInstaller.Password = null;
            this.webSocketDemoServiceProcessInstaller.Username = null;
            // 
            // webSocketDemoServiceInstaller
            // 
            this.webSocketDemoServiceInstaller.ServiceName = "Service1";
            // 
            // ProjectInstaller
            // 
            this.Installers.AddRange(new System.Configuration.Install.Installer[] {
            this.webSocketDemoServiceProcessInstaller,
            this.webSocketDemoServiceInstaller});

        }

        #endregion

        private System.ServiceProcess.ServiceProcessInstaller webSocketDemoServiceProcessInstaller;
        private System.ServiceProcess.ServiceInstaller webSocketDemoServiceInstaller;
    }
}