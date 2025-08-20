import { Link } from "react-router-dom";
import { ArrowLeft, Download } from "lucide-react";
import fitnessPlanner from "@/assets/fitness-planner.jpg";
import fitnessChecklist from "@/assets/fitness-checklist.jpg";
import proteinSnacks from "@/assets/protein-snacks.jpg";
import smoothieRecipes from "@/assets/smoothie-recipes.jpg";
import marathonFemale from "@/assets/marathon-female.jpg";
import marathonMale from "@/assets/marathon-male.jpg";

const products = [
  {
    id: "fitness-planner",
    title: "Fitness Planner & Journal Completo",
    subtitle: "Tu compañero perfecto para planificar, trackear y lograr tus objetivos fitness",
    image: fitnessPlanner,
  },
  {
    id: "fitness-checklist", 
    title: "Fitness Checklist: Tu Guía Diaria",
    subtitle: "Lista completa con todo lo que necesitas para mantener un estilo de vida saludable",
    image: fitnessChecklist,
  },
  {
    id: "protein-snacks",
    title: "60 Ideas de Snacks Proteicos",
    subtitle: "Descubre ideas rápidas y deliciosas de snacks proteicos para mantener tu energía",
    image: proteinSnacks,
  },
  {
    id: "smoothie-recipes",
    title: "Recetas de Smoothies Saludables",
    subtitle: "Batidos nutritivos y deliciosos para cada momento del día",
    image: smoothieRecipes,
  },
  {
    id: "marathon-female",
    title: "Guía de Entrenamiento Maratón Femenino",
    subtitle: "Plan completo de 16 semanas diseñado específicamente para mujeres",
    image: marathonFemale,
  },
  {
    id: "marathon-male",
    title: "Guía de Entrenamiento Maratón Masculino", 
    subtitle: "Programa intensivo de entrenamiento para hombres que buscan conquistar los 42K",
    image: marathonMale,
  }
];

const MyProducts = () => {
  return (
    <div className="min-h-screen bg-background safe-area-inset">
      {/* Header */}
      <div className="bg-white border-b border-border p-4">
        <Link to="/" className="inline-flex items-center text-navy hover:text-coral transition-colors">
          <ArrowLeft className="w-5 h-5 mr-2" />
          <span className="font-body">Volver</span>
        </Link>
      </div>

      {/* Page Title */}
      <div className="p-6 text-center">
        <h1 className="font-heading text-2xl md:text-3xl font-bold text-navy mb-2">
          Mis Productos
        </h1>
        <p className="font-body text-muted-foreground">
          Accede a todos tus recursos fitness descargados
        </p>
      </div>

      {/* Netflix-style Products Grid */}
      <div className="px-4 pb-6 space-y-4">
        {products.map((product, index) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            className="netflix-card group block relative overflow-hidden rounded-xl"
          >
            {/* Full Image Background */}
            <div className="relative aspect-[16/9] overflow-hidden">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              
              {/* Extra Badge */}
              {(index === 4 || index === 5) && (
                <div className="absolute top-4 right-4 bg-coral text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                  EXTRA
                </div>
              )}
              
              {/* Download Icon - Appears on Hover */}
              <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
                  <Download className="w-5 h-5 text-navy" />
                </div>
              </div>
            </div>
            
            {/* Content Overlay - Bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h2 className="font-heading text-xl md:text-2xl font-bold mb-2 group-hover:text-coral transition-colors">
                {product.title}
              </h2>
              <p className="font-body text-white/90 text-sm md:text-base leading-relaxed opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                {product.subtitle}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Call to Action */}
      <div className="p-6">
        <div className="bg-card rounded-2xl p-6 fitness-card text-center">
          <h2 className="font-heading text-navy text-lg font-bold mb-2">
            ¿Necesitas más recursos?
          </h2>
          <p className="font-body text-muted-foreground text-sm mb-4">
            Explora nuestra colección completa de guías fitness
          </p>
          <Link to="/" className="btn-secondary inline-block">
            Ver Todos los Productos
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MyProducts;