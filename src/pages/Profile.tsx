import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, User, LogOut, Gift, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Session, User as SupabaseUser } from '@supabase/supabase-js';

const Profile = () => {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [referralCode, setReferralCode] = useState("");
  const [referralCount, setReferralCount] = useState(0);
  const [loading, setLoading] = useState(true);
  
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (!session?.user) {
          navigate("/auth");
        } else {
          generateReferralCode(session.user.id);
          fetchReferralCount(session.user.id);
        }
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (!session?.user) {
        navigate("/auth");
      } else {
        generateReferralCode(session.user.id);
        fetchReferralCount(session.user.id);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const generateReferralCode = (userId: string) => {
    // Generate a simple referral code based on user ID
    const code = userId.slice(0, 8).toUpperCase();
    setReferralCode(code);
  };

  const fetchReferralCount = async (userId: string) => {
    // This will be implemented when we add the referrals table
    setReferralCount(0);
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error",
        description: "No se pudo cerrar sesión",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Sesión cerrada",
        description: "Has cerrado sesión correctamente",
      });
      navigate("/");
    }
  };

  const copyReferralLink = () => {
    const referralLink = `${window.location.origin}/?ref=${referralCode}`;
    navigator.clipboard.writeText(referralLink);
    toast({
      title: "¡Copiado!",
      description: "Link de recomendación copiado al portapapeles",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center safe-area-inset">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-coral border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="font-body text-muted-foreground">Cargando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to auth
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

      {/* Profile Content */}
      <div className="p-6">
        <div className="max-w-md mx-auto space-y-6">
          {/* User Info */}
          <div className="fitness-card p-6 text-center">
            <div className="w-20 h-20 rounded-full gradient-hero mx-auto mb-4 flex items-center justify-center">
              <User className="w-10 h-10 text-white" />
            </div>
            <h1 className="font-heading text-xl font-bold text-navy mb-2">
              {user.user_metadata?.name || "Usuario"}
            </h1>
            <p className="font-body text-muted-foreground text-sm">
              {user.email}
            </p>
          </div>

          {/* Referral Section */}
          <div className="fitness-card p-6">
            <div className="flex items-center mb-4">
              <Gift className="w-6 h-6 text-coral mr-2" />
              <h2 className="font-heading text-lg font-bold text-navy">
                Programa de Recomendaciones
              </h2>
            </div>
            
            <div className="space-y-4">
              <div className="bg-muted rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-body text-sm text-muted-foreground">Tu código:</span>
                  <span className="font-heading font-bold text-coral">{referralCode}</span>
                </div>
                <button
                  onClick={copyReferralLink}
                  className="btn-secondary w-full text-sm"
                >
                  Copiar Link de Recomendación
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-secondary/20 rounded-xl">
                <div className="flex items-center">
                  <Users className="w-5 h-5 text-turquoise mr-2" />
                  <span className="font-body text-sm text-navy">Recomendaciones:</span>
                </div>
                <span className="font-heading font-bold text-turquoise">
                  {referralCount}/5
                </span>
              </div>

              <div className="p-4 bg-coral/10 rounded-xl">
                <p className="font-body text-sm text-navy text-center">
                  🎁 ¡Recomienda a 5 amigas y obtén gratis el 
                  <span className="font-semibold"> Healthy Smoothie Bundle</span>!
                </p>
              </div>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center p-4 text-destructive bg-destructive/10 rounded-xl hover:bg-destructive/20 transition-colors"
          >
            <LogOut className="w-5 h-5 mr-2" />
            <span className="font-body font-medium">Cerrar Sesión</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;