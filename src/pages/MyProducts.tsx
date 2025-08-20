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

      {/* Products List - One card per row */}
      <div className="px-6 pb-6 space-y-6">
        {products.map((product, index) => (
          <div key={product.id} className="w-full">
            <Link
              to={`/product/${product.id}`}
              className="block fitness-card group hover:shadow-lg transition-all duration-300"
            >
              {/* Card Content */}
              <div className="p-6">
                {/* Title and Subtitle Section */}
                <div className="mb-4">
                  <div className="flex items-start justify-between mb-2">
                    <h2 className="font-heading text-lg md:text-xl font-bold text-navy group-hover:text-coral transition-colors flex-1 pr-4">
                      {product.title}
                    </h2>
                    {/* Extra badge for marathon guides */}
                    {(index === 4 || index === 5) && (
                      <span className="bg-coral text-white text-xs font-bold px-2 py-1 rounded-full">
                        EXTRA
                      </span>
                    )}
                  </div>
                  <p className="font-body text-muted-foreground text-sm md:text-base leading-relaxed">
                    {product.subtitle}
                  </p>
                </div>

                {/* Product Image */}
                <div className="relative overflow-hidden rounded-xl">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-48 md:h-56 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Overlay with download icon */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full p-3">
                      <Download className="w-6 h-6 text-navy" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
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