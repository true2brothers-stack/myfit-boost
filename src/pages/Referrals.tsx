import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Gift, Users, Copy, Share2, Trophy } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Session, User as SupabaseUser } from '@supabase/supabase-js';

const Referrals = () => {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [referralCode, setReferralCode] = useState("");
  const [referralCount, setReferralCount] = useState(0);
  const [loading, setLoading] = useState(true);
  
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
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
    const code = userId.slice(0, 8).toUpperCase();
    setReferralCode(code);
  };

  const fetchReferralCount = async (userId: string) => {
    // This will be implemented when we add the referrals table
    setReferralCount(0);
  };

  const copyReferralLink = () => {
    const referralLink = `${window.location.origin}/?ref=${referralCode}`;
    navigator.clipboard.writeText(referralLink);
    toast({
      title: "¡Copiado!",
      description: "Link de recomendación copiado al portapapeles",
    });
  };

  const shareReferralLink = () => {
    const referralLink = `${window.location.origin}/?ref=${referralCode}`;
    const shareText = `¡Únete conmigo en esta transformación fitness! 💪✨ Descubre guías, recetas y entrenamientos increíbles. ${referralLink}`;
    
    if (navigator.share) {
      navigator.share({
        title: "Transformación Fitness",
        text: shareText,
      });
    } else {
      navigator.clipboard.writeText(shareText);
      toast({
        title: "¡Copiado!",
        description: "Mensaje de recomendación copiado al portapapeles",
      });
    }
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
    return null;
  }

  const progress = (referralCount / 5) * 100;
  const isRewardUnlocked = referralCount >= 5;

  return (
    <div className="min-h-screen bg-background safe-area-inset">
      {/* Header */}
      <div className="bg-white border-b border-border p-4">
        <Link to="/" className="inline-flex items-center text-navy hover:text-coral transition-colors">
          <ArrowLeft className="w-5 h-5 mr-2" />
          <span className="font-body">Volver</span>
        </Link>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="max-w-md mx-auto space-y-6">
          {/* Header */}
          <div className="text-center">
            <div className="w-20 h-20 rounded-full gradient-hero mx-auto mb-4 flex items-center justify-center">
              <Gift className="w-10 h-10 text-white" />
            </div>
            <h1 className="font-heading text-2xl font-bold text-navy mb-2">
              Programa de Recomendaciones
            </h1>
            <p className="font-body text-muted-foreground">
              Invita a tus amigas y obtén recompensas increíbles
            </p>
          </div>

          {/* Progress Card */}
          <div className="fitness-card p-6">
            <div className="text-center mb-6">
              <div className="flex items-center justify-center mb-2">
                <Users className="w-6 h-6 text-turquoise mr-2" />
                <span className="font-heading text-lg font-bold text-navy">
                  {referralCount}/5 Recomendaciones
                </span>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-muted rounded-full h-3 mb-4">
                <div 
                  className="h-3 bg-gradient-to-r from-coral to-turquoise rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>

              {isRewardUnlocked ? (
                <div className="flex items-center justify-center p-4 bg-turquoise/20 rounded-xl">
                  <Trophy className="w-6 h-6 text-turquoise mr-2" />
                  <span className="font-body font-semibold text-turquoise">
                    ¡Recompensa desbloqueada!
                  </span>
                </div>
              ) : (
                <p className="font-body text-sm text-muted-foreground">
                  Te faltan {5 - referralCount} recomendaciones para desbloquear tu premio
                </p>
              )}
            </div>
          </div>

          {/* Reward Card */}
          <div className="fitness-card p-6">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-coral/20 mx-auto mb-4 flex items-center justify-center">
                <Gift className="w-8 h-8 text-coral" />
              </div>
              <h3 className="font-heading text-lg font-bold text-navy mb-2">
                Healthy Smoothie Bundle
              </h3>
              <p className="font-body text-sm text-muted-foreground mb-4">
                Recetas exclusivas de smoothies saludables y nutritivos
              </p>
              <div className={`p-3 rounded-xl ${isRewardUnlocked ? 'bg-turquoise/20' : 'bg-muted'}`}>
                <span className={`font-body text-sm font-semibold ${isRewardUnlocked ? 'text-turquoise' : 'text-muted-foreground'}`}>
                  {isRewardUnlocked ? '¡DISPONIBLE GRATIS!' : 'Valor: €8.90'}
                </span>
              </div>
            </div>
          </div>

          {/* Referral Code */}
          <div className="fitness-card p-6">
            <h3 className="font-heading text-lg font-bold text-navy mb-4 text-center">
              Tu Código de Recomendación
            </h3>
            
            <div className="bg-muted rounded-xl p-4 text-center mb-4">
              <span className="font-heading text-2xl font-bold text-coral">
                {referralCode}
              </span>
            </div>

            <div className="space-y-3">
              <button
                onClick={copyReferralLink}
                className="btn-secondary w-full flex items-center justify-center"
              >
                <Copy className="w-5 h-5 mr-2" />
                Copiar Link
              </button>
              
              <button
                onClick={shareReferralLink}
                className="btn-hero w-full flex items-center justify-center"
              >
                <Share2 className="w-5 h-5 mr-2" />
                Compartir con Amigas
              </button>
            </div>
          </div>

          {/* Instructions */}
          <div className="fitness-card p-6">
            <h3 className="font-heading text-lg font-bold text-navy mb-4">
              ¿Cómo funciona?
            </h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-coral text-white text-xs font-bold flex items-center justify-center mr-3 mt-0.5">
                  1
                </div>
                <p className="font-body text-sm text-foreground">
                  Comparte tu link de recomendación con tus amigas
                </p>
              </div>
              <div className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-turquoise text-white text-xs font-bold flex items-center justify-center mr-3 mt-0.5">
                  2
                </div>
                <p className="font-body text-sm text-foreground">
                  Cuando se registren usando tu link, cuentan para tu recompensa
                </p>
              </div>
              <div className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-navy text-white text-xs font-bold flex items-center justify-center mr-3 mt-0.5">
                  3
                </div>
                <p className="font-body text-sm text-foreground">
                  ¡Con 5 recomendaciones obtienes el Smoothie Bundle gratis!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Referrals;