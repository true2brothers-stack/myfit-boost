import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, ArrowLeft, Mail, Lock, User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Session, User as SupabaseUser } from '@supabase/supabase-js';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        // Redirect authenticated users to home
        if (session?.user) {
          navigate("/");
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        navigate("/");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (error) throw error;
        
        toast({
          title: "¡Bienvenida!",
          description: "Has iniciado sesión correctamente",
        });
      } else {
        const redirectUrl = `${window.location.origin}/`;
        
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: redirectUrl,
            data: {
              name: name,
            }
          }
        });
        
        if (error) throw error;
        
        toast({
          title: "¡Cuenta creada!",
          description: "Revisa tu email para confirmar tu cuenta",
        });
      }
    } catch (error: any) {
      let errorMessage = "Ha ocurrido un error";
      
      if (error.message.includes('Invalid login credentials')) {
        errorMessage = "Email o contraseña incorrectos";
      } else if (error.message.includes('User already registered')) {
        errorMessage = "Este email ya está registrado";
      } else if (error.message.includes('Password should be at least 6 characters')) {
        errorMessage = "La contraseña debe tener al menos 6 caracteres";
      }
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background safe-area-inset">
      {/* Header */}
      <div className="bg-white border-b border-border p-4">
        <Link to="/" className="inline-flex items-center text-navy hover:text-coral transition-colors">
          <ArrowLeft className="w-5 h-5 mr-2" />
          <span className="font-body">Volver</span>
        </Link>
      </div>

      {/* Auth Form */}
      <div className="p-6">
        <div className="max-w-md mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 rounded-full gradient-hero mx-auto mb-4 flex items-center justify-center">
              <User className="w-10 h-10 text-white" />
            </div>
            <h1 className="font-heading text-2xl font-bold text-navy mb-2">
              {isLogin ? "¡Bienvenida de vuelta!" : "¡Únete a nosotras!"}
            </h1>
            <p className="font-body text-muted-foreground">
              {isLogin 
                ? "Accede a todos tus recursos fitness" 
                : "Comienza tu transformación fitness hoy"}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <label className="font-body text-sm font-medium text-navy">
                  Nombre
                </label>
                <div className="relative">
                  <User className="w-5 h-5 text-muted-foreground absolute left-3 top-3" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-coral font-body"
                    placeholder="Tu nombre"
                    required
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="font-body text-sm font-medium text-navy">
                Email
              </label>
              <div className="relative">
                <Mail className="w-5 h-5 text-muted-foreground absolute left-3 top-3" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-coral font-body"
                  placeholder="tu@email.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="font-body text-sm font-medium text-navy">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="w-5 h-5 text-muted-foreground absolute left-3 top-3" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-coral font-body"
                  placeholder="••••••••"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-muted-foreground hover:text-coral transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-hero w-full mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading 
                ? "Cargando..." 
                : isLogin 
                ? "Iniciar Sesión" 
                : "Crear Cuenta"}
            </button>
          </form>

          {/* Toggle Form */}
          <div className="text-center mt-6">
            <p className="font-body text-muted-foreground text-sm">
              {isLogin ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-coral font-semibold ml-1 hover:underline"
              >
                {isLogin ? "Regístrate" : "Inicia sesión"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;