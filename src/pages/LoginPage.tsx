import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import BrieBlasterPage from '../components/BrieBlasterPage';

const CORRECT_DATA = {
  password: "brie",
  coordinates: {
    x: 1,
    y: 2,
    z: 3
  }
};

const loginSchema = z.object({
  password: z.string().min(1, 'AUTHORIZATION REQUIRED'),
  coordinates: z.object({
    x: z.number().min(0, 'INVALID COORDINATE'),
    y: z.number().min(0, 'INVALID COORDINATE'),
    z: z.number().min(0, 'INVALID COORDINATE'),
  })
});

type LoginFormData = z.infer<typeof loginSchema>;

enum AccessState {
  FRESH,
  NOREACH,
  DENIED,
  SUCCESS
}

export function LoginPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [accessDenied, setAccessDenied] = useState(AccessState.FRESH);
  const terminalRef = useRef<HTMLDivElement>(null);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      coordinates: { x: 0, y: 0, z: 0 }
    }
  });

  // Add terminal typing effect
  useEffect(() => {
    if (terminalRef.current) {
      const messages = [
        '> INITIALIZING SECURE CONNECTION...',
        '> CONNECTING TO BRIE BLASTER 3000 MAINFRAME...',
        '> ESTABLISHING QUANTUM ENCRYPTION...',
      ];
      
      let currentMessage = 0;
      let currentChar = 0;
      let isDeleting = false;
      let typingSpeed = 50;
      let deleteSpeed = 30;
      
      const type = () => {
        if (currentMessage == messages.length) return;
        
        const currentLine = terminalRef.current!.children[0];
        const message = messages[currentMessage];
        
        if (isDeleting) {
          currentChar--;
          currentLine.textContent = message.substring(0, currentChar) + '▋';
          typingSpeed = deleteSpeed;
        } else {
          currentChar++;
          currentLine.textContent = message.substring(0, currentChar) + (currentChar < message.length ? '▋' : '');
          typingSpeed = 50;
        }
        
        if (!isDeleting && currentChar === message.length) {
          typingSpeed = 2000; // Pause at end of line
          isDeleting = true;
        } else if (isDeleting && currentChar === 0) {
          isDeleting = false;
          currentMessage++;
          if (currentMessage === messages.length) {
            currentLine.textContent = "";
            return; // Stop at the last message
          }
          // if (currentMessage < messages.length - 1) {
          //   const newLine = document.createElement('div');
          //   terminalRef.current!.appendChild(newLine);
          // }
        }
        
        setTimeout(type, typingSpeed);
      };
      
      // Create first line
      const firstLine = document.createElement('div');
      terminalRef.current.appendChild(firstLine);
      
      // Start typing effect
      setTimeout(type, 1000);
      
      return () => {
        // Cleanup
        if (terminalRef.current) {
          terminalRef.current.innerHTML = '';
        }
      };
    }
  }, []);

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setAccessDenied(AccessState.FRESH);
    
    // Simulate authentication delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // For demo purposes, just navigate to home on submit
    // But let's add some fake validation
    if (data.password === CORRECT_DATA.password && data.coordinates.x == CORRECT_DATA.coordinates.x && data.coordinates.y == CORRECT_DATA.coordinates.y && data.coordinates.z == CORRECT_DATA.coordinates.z) {
      setAccessDenied(AccessState.SUCCESS);
      console.log("Login successful!");
      navigate('/warn');
    } else {
      if (data.coordinates.x == CORRECT_DATA.coordinates.x && data.coordinates.y == CORRECT_DATA.coordinates.y && data.coordinates.z == CORRECT_DATA.coordinates.z) {
        setAccessDenied(AccessState.DENIED);
        setError('password', { type: 'manual', message: 'ACCESS DENIED' });
      }
      else {
        setAccessDenied(AccessState.NOREACH);
        setError('password', { type: 'manual', message: 'NO DEVICE FOUND'})
      }
      // Shake animation for wrong credentials
      const form = document.querySelector('form');
      form?.classList.add('shake');
      setTimeout(() => form?.classList.remove('shake'), 500);
    }
    
    setIsLoading(false);
  };

  return (

    <BrieBlasterPage>
    
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-6">
        {/* Password field */}
        <div className="group">
          <div className="flex items-center justify-between mb-1">
            <label htmlFor="password" className="text-sm font-mono text-blue-300 group-focus-within:text-blue-400 transition-colors">
              <h3 className="text-sm font-mono text-blue-300 group-focus-within:text-blue-400 transition-colors">
                [PASSWORD_ACCESS]
              </h3>
            </label>
            {/* <span className="text-xs text-purple-400 animate-pulse">REQUIRED</span> */}
          </div>

          <div className="relative group">
            <div className="absolute inset-0.5 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <input
              id="password"
              type="password"
              {...register('password')}
              className={`relative w-full px-4 py-3 bg-black/70 backdrop-blur-sm border ${errors.password ? 'border-red-500/60' : 'border-blue-400/30'} text-blue-100 placeholder-blue-400/50 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200`}
              placeholder="••••••••"
              style={{
                boxShadow: errors.password 
                  ? '0 0 15px rgba(239, 68, 68, 0.4)' 
                  : '0 0 15px rgba(96, 165, 250, 0.1)',
                textShadow: '0 0 8px rgba(96, 165, 250, 0.3)'
              }}
            />
            <div className="absolute inset-0 border-t border-blue-400/10 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          {errors.password && (
            <p className="mt-2 text-xs font-mono text-red-400 flex items-center">
              <span className="inline-block w-3 h-3 bg-red-500 rounded-full mr-2"></span>
              {errors.password.message}
            </p>
          )}
        </div>

        <br/><br/>

        {/* Coordinates section */}
        <div className="group">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-sm font-mono text-blue-300 group-focus-within:text-blue-400 transition-colors">
              [DEVICE_COORDINATES]
            </h3>
            <span className="text-xs text-purple-400 animate-pulse">LIGHTYEARS</span>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            {['x', 'y', 'z'].map((axis) => (
              <div key={axis} className="relative">
                <div className="absolute -top-2 left-3 px-2 bg-black text-xs text-blue-400 font-mono">
                  {axis.toUpperCase()}:
                </div>
                <div className="relative group">
                  <div className="absolute inset-0.5 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <input
                    id={axis}
                    type="number"
                    step="0.1"
                    {...register(`coordinates.${axis}` as 'coordinates.x' | 'coordinates.y' | 'coordinates.z', { valueAsNumber: true })}
                    className={`relative w-full px-4 py-3 bg-black/70 backdrop-blur-sm border ${errors.coordinates?.[axis as keyof typeof errors.coordinates] ? 'border-red-500/60' : 'border-blue-400/30'} text-blue-100 text-center font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200`}
                    placeholder="0.0"
                    style={{
                      boxShadow: errors.coordinates?.[axis as keyof typeof errors.coordinates] 
                        ? '0 0 15px rgba(239, 68, 68, 0.4)' 
                        : '0 0 15px rgba(96, 165, 250, 0.1)',
                      textShadow: '0 0 8px rgba(96, 165, 250, 0.3)',
                    }}
                  />
                  <div className="absolute inset-0 border-t border-blue-400/10 pointer-events-none"></div>
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="absolute inset-0 border-t border-blue-400/10 pointer-events-none"></div>
              </div>
            ))}
          </div>
          
          {(errors.coordinates?.x || errors.coordinates?.y || errors.coordinates?.z) && (
            <p className="mt-2 text-xs font-mono text-red-400 flex items-center">
              <span className="inline-block w-3 h-3 bg-red-500 rounded-full mr-2"></span>
              {errors.coordinates?.x?.message || errors.coordinates?.y?.message || errors.coordinates?.z?.message}
            </p>
          )}
          
          {/* <div className="mt-2 flex justify-between text-xs text-blue-400/60 font-mono">
            <span>X: LONGITUDE</span>
            <span>Y: LATITUDE</span>
            <span>Z: ALTITUDE</span>
          </div> */}
        </div>
      </div>

      <br/><br/>

      <div className="pt-4">
        <button
          type="submit"
          disabled={isLoading}
          className={`group relative w-full flex justify-center items-center py-3 px-6 overflow-hidden ${isLoading ? 'cursor-not-allowed' : 'cursor-pointer'}`}
          style={{
            background: 'linear-gradient(90deg, rgba(30, 58, 138, 0.4) 0%, rgba(76, 29, 149, 0.4) 100%)',
            boxShadow: '0 0 15px rgba(59, 130, 246, 0.3)',
            border: '1px solid rgba(96, 165, 250, 0.3)',
            borderRadius: '0.25rem',
            position: 'relative',
            overflow: 'hidden',
            transition: 'all 0.3s ease',
          }}
        >
          {/* Animated background gradient */}
          <div className={`absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
          
          {/* Animated scanline effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
              style={{
                backgroundSize: '100% 2px',
                animation: 'scanline 2s linear infinite',
              }}></div>
          
          {/* Button content */}
          <span className={`relative z-10 flex items-center ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-200`}>
            <span className="text-white group-hover:text-white transition-colors font-mono text-sm tracking-wider flex items-center"
              style={{
                color: 'white'
              }}>
              <span className="opacity-80 group-hover:opacity-100 transition-opacity">[</span>
              <span className="mx-2 text-white group-hover:text-white transition-colors font-medium">
                INITIATE SYSTEM ACCESS
              </span>
              <span className="opacity-80 group-hover:opacity-100 transition-opacity">]</span>
            </span>
          </span>
          
          {/* Loading state */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex items-center">
                <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin mr-2"></div>
                <span className="text-blue-100 font-mono text-sm tracking-wider">
                  AUTHENTICATING...
                </span>
              </div>
            </div>
          )}
          
          {/* Glow effect on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-400/20 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </button>

        <br/><br/>
        
        {(accessDenied === AccessState.DENIED) && (
          <div className="mt-4 p-3 bg-red-900/30 border border-red-500/30 text-red-300 text-sm font-mono flex items-center justify-center animate-pulse">
            <span className="inline-block w-2 h-2 bg-red-500 rounded-full mr-2"></span>
            CONNECTION ESTABLISHED<br/>
            UNAUTHORIZED CREDENTIALS DETECTED
          </div>
        )}
        {(accessDenied === AccessState.NOREACH) && (
          <div className="mt-4 p-3 bg-red-900/30 border border-red-500/30 text-red-300 text-sm font-mono flex items-center justify-center animate-pulse">
            <span className="inline-block w-2 h-2 bg-red-500 rounded-full mr-2"></span>
            NO DEVICE FOUND AT GIVEN COORDINATES
          </div>
        )}
        {(accessDenied === AccessState.SUCCESS) && (
          <div className="mt-4 p-3 bg-red-900/30 border border-red-500/30 text-red-300 text-sm font-mono flex items-center justify-center animate-pulse">
            <span className="inline-block w-2 h-2 bg-red-500 rounded-full mr-2"></span>
            SUCCESSFULLY AUTHENTICATED
          </div>
        )}

        <br/><br/>

        </div>
      </form>
    </BrieBlasterPage>
  );
}

export default LoginPage;
