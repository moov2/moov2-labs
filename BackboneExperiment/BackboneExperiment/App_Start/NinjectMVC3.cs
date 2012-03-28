[assembly: WebActivator.PreApplicationStartMethod(typeof(BackboneExperiment.App_Start.NinjectMVC3), "Start")]
[assembly: WebActivator.ApplicationShutdownMethodAttribute(typeof(BackboneExperiment.App_Start.NinjectMVC3), "Stop")]

namespace BackboneExperiment.App_Start
{
    using System.Reflection;
    using System.Web.Http;
    using System.Web.Mvc;
    using Microsoft.Web.Infrastructure.DynamicModuleHelper;
    using Ninject;
    using Ninject.Web.Mvc;
    using BackboneExperiment.Core.Infrastructure;
    using BackboneExperiment.Core.Services;
    using BackboneExperiment.Core.Data;

    public static class NinjectMVC3 
    {
        private static readonly Bootstrapper bootstrapper = new Bootstrapper();

        /// <summary>
        /// Starts the application
        /// </summary>
        public static void Start() 
        {
            DynamicModuleUtility.RegisterModule(typeof(OnePerRequestModule));
            DynamicModuleUtility.RegisterModule(typeof(HttpApplicationInitializationModule));
            bootstrapper.Initialize(CreateKernel);
            GlobalConfiguration.Configuration.ServiceResolver.SetResolver(DependencyResolver.Current.ToServiceResolver());
        }
        
        /// <summary>
        /// Stops the application.
        /// </summary>
        public static void Stop()
        {
            bootstrapper.ShutDown();
        }
        
        /// <summary>
        /// Creates the kernel that will manage your application.
        /// </summary>
        /// <returns>The created kernel.</returns>
        private static IKernel CreateKernel()
        {
            var kernel = new StandardKernel();
            RegisterServices(kernel);
            return kernel;
        }

        /// <summary>
        /// Load your modules or register your services here!
        /// </summary>
        /// <param name="kernel">The kernel.</param>
        private static void RegisterServices(IKernel kernel)
        {
            kernel.Bind<IGamesService>().To<GamesService>();
            kernel.Bind<IDatabaseProvider>().To<MongoDatabaseProvider>();
        }        
    }
}
