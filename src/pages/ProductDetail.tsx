import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Download, CheckCircle } from "lucide-react";
import fitnessPlanner from "@/assets/fitness-planner.jpg";
import fitnessChecklist from "@/assets/fitness-checklist.jpg";
import proteinSnacks from "@/assets/protein-snacks.jpg";
import smoothieRecipes from "@/assets/smoothie-recipes.jpg";
import marathonFemale from "@/assets/marathon-female.jpg";
import marathonMale from "@/assets/marathon-male.jpg";

const productData = {
  "fitness-planner": {
    title: "Fitness Planner & Journal Completo",
    image: fitnessPlanner,
    description: "Tu compañero perfecto para planificar, trackear y lograr tus objetivos fitness. Incluye plantillas mensuales, semanales y diarias.",
    content: [
      "Planificador mensual de objetivos",
      "Tracking semanal de entrenamientos",
      "Registro diario de progreso",
      "Páginas de motivación y logros",
      "Tracker de medidas corporales",
      "Planificador de comidas fitness",
      "Sección de notas y reflexiones",
      "Templates personalizables"
    ]
  },
  "fitness-checklist": {
    title: "Fitness Checklist: Tu Guía Diaria",
    image: fitnessChecklist,
    description: "Lista completa con todo lo que necesitas para mantener un estilo de vida saludable. Nunca olvides lo importante.",
    content: [
      "✓ Rutina matutina energizante",
      "✓ Hidratación adecuada (8 vasos)",
      "✓ Desayuno proteico completo",
      "✓ Ejercicio cardiovascular 30min",
      "✓ Snack saludable media mañana",
      "✓ Almuerzo balanceado",
      "✓ Entrenamiento de fuerza",
      "✓ Cena ligera y nutritiva",
      "✓ Rutina de relajación",
      "✓ 8 horas de sueño reparador"
    ]
  },
  "protein-snacks": {
    title: "60 Ideas de Snacks Proteicos",
    image: proteinSnacks,
    description: "Descubre 60 ideas rápidas y deliciosas de snacks proteicos para mantener tu energía durante todo el día.",
    content: [
      "Yogur griego con frutos secos y miel",
      "Batido de proteína con chocolate",
      "Hummus casero con bastones de zanahoria",
      "Huevos duros con aguacate",
      "Queso cottage con frutas del bosque",
      "Smoothie bowl proteico",
      "Almendras tostadas con especias",
      "Edamame con sal marina",
      "Rollitos de pavo y queso",
      "Mantequilla de cacahuete con manzana",
      "... y 50 ideas más increíbles"
    ]
  },
  "smoothie-recipes": {
    title: "Recetas de Smoothies Saludables",
    image: smoothieRecipes,
    description: "Batidos nutritivos y deliciosos para cada momento del día. Desde energizantes matutinos hasta reparadores nocturnos.",
    content: [
      "🌅 Smoothie Energizante Matutino",
      "🥭 Tropical Mango & Coco",
      "🍓 Berry Antioxidante Boost",
      "🥬 Green Detox Power",
      "🍌 Post-Workout Banana Protein",
      "🥤 Chocolate Peanut Butter",
      "🌙 Relajante Lavanda & Vainilla",
      "🥝 Kiwi Citrus Vitamin C",
      "🍑 Peachy Keen Morning",
      "🫐 Blueberry Brain Boost",
      "... recetas completas con ingredientes"
    ]
  },
  "marathon-female": {
    title: "Guía de Entrenamiento Maratón Femenino",
    image: marathonFemale,
    description: "Plan completo de 16 semanas diseñado específicamente para mujeres que quieren completar su primer maratón o mejorar su tiempo.",
    content: [
      "📅 Plan de 16 semanas estructurado",
      "🏃‍♀️ Técnicas de carrera específicas",
      "💪 Entrenamientos de fuerza complementarios",
      "🍎 Nutrición pre, durante y post carrera",
      "🩹 Prevención de lesiones femeninas",
      "🧘‍♀️ Técnicas de respiración y mindfulness",
      "📊 Tablas de pace y tiempos objetivo",
      "🎯 Estrategias de carrera el día D",
      "🏆 Planes de recuperación post-maratón"
    ]
  },
  "marathon-male": {
    title: "Guía de Entrenamiento Maratón Masculino",
    image: marathonMale,
    description: "Programa intensivo de entrenamiento para hombres que buscan conquistar los 42K con fuerza, resistencia y estrategia.",
    content: [
      "⚡ Plan progresivo de alta intensidad",
      "🏋️‍♂️ Rutinas de fuerza específicas",
      "⏱️ Entrenamientos de velocidad y tempo",
      "🥩 Nutrición deportiva masculina",
      "💊 Suplementación recomendada",
      "🔥 Técnicas de recuperación activa",
      "📈 Análisis de rendimiento semanal",
      "🎖️ Estrategias competitivas avanzadas",
      "🏃‍♂️ Preparación mental para la carrera"
    ]
  }
};

const ProductDetail = () => {
  const { productId } = useParams();
  const product = productData[productId as keyof typeof productData];

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-navy mb-4">Producto no encontrado</h1>
          <Link to="/" className="btn-secondary">
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background safe-area-inset">
      {/* Header */}
      <div className="bg-white border-b border-border p-4">
        <Link to="/" className="inline-flex items-center text-navy hover:text-coral transition-colors">
          <ArrowLeft className="w-5 h-5 mr-2" />
          <span className="font-body">Volver</span>
        </Link>
      </div>

      {/* Product Hero */}
      <div className="p-6">
        <div className="fitness-card overflow-hidden max-w-md mx-auto">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <h1 className="font-heading text-xl font-bold text-navy mb-3">
              {product.title}
            </h1>
            <p className="font-body text-muted-foreground text-sm leading-relaxed">
              {product.description}
            </p>
          </div>
        </div>
      </div>

      {/* Content List */}
      <div className="px-6 pb-6">
        <div className="bg-card rounded-2xl p-6 max-w-md mx-auto fitness-card">
          <h2 className="font-heading text-lg font-semibold text-navy mb-4 flex items-center">
            <CheckCircle className="w-5 h-5 text-turquoise mr-2" />
            Contenido Incluido
          </h2>
          <ul className="space-y-3">
            {product.content.map((item, index) => (
              <li key={index} className="font-body text-sm text-foreground flex items-start">
                <div className="w-2 h-2 bg-coral rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Action Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-border">
        <div className="max-w-md mx-auto">
          <button className="btn-hero w-full flex items-center justify-center">
            <Download className="w-5 h-5 mr-2" />
            Descargar Ahora
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;