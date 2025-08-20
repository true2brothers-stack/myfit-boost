import { Link } from "react-router-dom";
import fitnessPlanner from "@/assets/fitness-planner.jpg";
import fitnessChecklist from "@/assets/fitness-checklist.jpg";
import proteinSnacks from "@/assets/protein-snacks.jpg";
import smoothieRecipes from "@/assets/smoothie-recipes.jpg";
import marathonFemale from "@/assets/marathon-female.jpg";
import marathonMale from "@/assets/marathon-male.jpg";

const products = [
  {
    id: "fitness-planner",
    title: "Fitness Planner & Journal",
    image: fitnessPlanner,
    description: "Planifica tu rutina fitness perfecta"
  },
  {
    id: "fitness-checklist", 
    title: "Fitness Checklist",
    image: fitnessChecklist,
    description: "Lista completa para tu bienestar"
  },
  {
    id: "protein-snacks",
    title: "60 Protein Pack Snacks",
    image: proteinSnacks,
    description: "Ideas deliciosas y saludables"
  },
  {
    id: "smoothie-recipes",
    title: "Healthy Smoothie Recipes",
    image: smoothieRecipes,
    description: "Batidos nutritivos y sabrosos"
  },
  {
    id: "marathon-female",
    title: "Guía Maratón Femenino",
    image: marathonFemale,
    description: "Entrena como una campeona"
  },
  {
    id: "marathon-male",
    title: "Guía Maratón Masculino", 
    image: marathonMale,
    description: "Alcanza tu mejor marca"
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background safe-area-inset">
      {/* Hero Header */}
      <div className="gradient-hero p-6 text-center text-white">
        <h1 className="font-heading text-2xl md:text-3xl font-bold mb-2">
          Tu Transformación Fitness
        </h1>
        <p className="font-body text-white/90 text-sm md:text-base">
          Guías completas para tu bienestar y nutrición
        </p>
      </div>

      {/* Products Grid */}
      <div className="product-grid max-w-lg mx-auto">
        {products.map((product, index) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            className="fitness-card block group relative"
          >
            {/* Extra badge for cards 5 and 6 (marathon guides) */}
            {(index === 4 || index === 5) && (
              <div className="extra-badge">
                EXTRA
              </div>
            )}
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="fitness-card-overlay">
              <h3 className="font-heading font-bold text-lg mb-1">
                {product.title}
              </h3>
              <p className="font-body text-white/90 text-sm">
                {product.description}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Call to Action */}
      <div className="p-6 text-center">
        <div className="bg-card rounded-2xl p-6 max-w-sm mx-auto fitness-card">
          <h2 className="font-heading text-navy text-lg font-bold mb-2">
            ¡Comienza Tu Transformación!
          </h2>
          <p className="font-body text-muted-foreground text-sm mb-4">
            Accede a todos los recursos fitness por solo €29,90
          </p>
          <button className="btn-hero w-full">
            Comprar Ahora
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;