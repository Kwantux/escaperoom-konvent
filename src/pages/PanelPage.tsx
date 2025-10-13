import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import BrieBlasterPage from '../components/BrieBlasterPage';

const panelSchema = z.object({
  coordinates: z.object({
    x: z.number().min(0, 'INVALID COORDINATE'),
    y: z.number().min(0, 'INVALID COORDINATE'),
    z: z.number().min(0, 'INVALID COORDINATE'),
  }),
  coreHeat: z.number().min(1000, 'TOO LOW').max(10000, 'CRITICAL TEMPERATURE'),
  detonationPressure: z.number().min(0.1, 'INVALID PRESSURE').max(5.0, 'DANGER: PRESSURE TOO HIGH')
});

type PanelFormData = z.infer<typeof panelSchema>;

enum AccessState {
  FRESH,
  NOREACH,
  DENIED,
  SUCCESS
}

export function PanelPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [systemStatus, setSystemStatus] = useState(AccessState.FRESH);
  const terminalRef = useRef<HTMLDivElement>(null);
  const [panelVisible, setPanelVisible] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch
  } = useForm<PanelFormData>({
    resolver: zodResolver(panelSchema),
    defaultValues: {
      coordinates: { x: 0, y: 0, z: 0 },
      coreHeat: 3000,
      detonationPressure: 1.0
    }
  });

  // Watch form values for real-time validation feedback
  const formValues = watch();


  const onSubmit = async (data: PanelFormData) => {
    setIsLoading(true);
    setSystemStatus(AccessState.FRESH);
    
    // Simulate system processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if values match target values
    const isXMatch = data.coordinates.x === TARGET_VALUES.coordinates.x;
    const isYMatch = data.coordinates.y === TARGET_VALUES.coordinates.y;
    const isZMatch = data.coordinates.z === TARGET_VALUES.coordinates.z;
    const isHeatMatch = data.coreHeat === TARGET_VALUES.coreHeat;
    const isPressureMatch = data.detonationPressure === TARGET_VALUES.detonationPressure;
    
    if (isXMatch && isYMatch && isZMatch && isHeatMatch && isPressureMatch) {
      setSystemStatus(AccessState.SUCCESS);
      console.log("System parameters optimal!");
      // Add any success navigation or action here
    } else {
      setSystemStatus(AccessState.DENIED);
      
      // Provide feedback on which parameters are incorrect
      if (!isXMatch || !isYMatch || !isZMatch) {
        setError('coordinates', { type: 'manual', message: 'INVALID TARGET COORDINATES' });
      }
      if (!isHeatMatch) {
        setError('coreHeat', { type: 'manual', message: 'CORE TEMPERATURE NOT OPTIMAL' });
      }
      if (!isPressureMatch) {
        setError('detonationPressure', { type: 'manual', message: 'PRESSURE NOT OPTIMAL' });
      }
      
      // Shake animation for incorrect values
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
          {/* System Status */}
          <div className="bg-black/30 p-4 rounded border border-blue-500/30">
            <h2 className="text-xl font-mono text-blue-400 mb-4">SYSTEM CONTROL PANEL</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column - Coordinates */}
              <div className="space-y-4">
                <h3 className="text-sm font-mono text-blue-300 uppercase tracking-wider">TARGET COORDINATES</h3>
                
                {/* X Coordinate */}
                <div className="group">
                  <div className="flex items-center justify-between mb-1">
                    <label htmlFor="coordinates.x" className="text-sm font-mono text-blue-300 group-focus-within:text-blue-400 transition-colors">
                      X_COORDINATE
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      type="number"
                      id="coordinates.x"
                      className={`w-full bg-black/50 border ${errors.coordinates?.x ? 'border-red-500' : 'border-blue-500/30 focus:border-blue-400'} text-white font-mono px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all`}
                      {...register('coordinates.x', { valueAsNumber: true })}
                      disabled={isLoading}
                    />
                  </div>
                  {errors.coordinates?.x && (
                    <p className="mt-1 text-xs text-red-400 font-mono">{errors.coordinates.x.message}</p>
                  )}
                </div>
                
                {/* Y Coordinate */}
                <div className="group">
                  <div className="flex items-center justify-between mb-1">
                    <label htmlFor="coordinates.y" className="text-sm font-mono text-blue-300 group-focus-within:text-blue-400 transition-colors">
                      Y_COORDINATE
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      type="number"
                      id="coordinates.y"
                      className={`w-full bg-black/50 border ${errors.coordinates?.y ? 'border-red-500' : 'border-blue-500/30 focus:border-blue-400'} text-white font-mono px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all`}
                      {...register('coordinates.y', { valueAsNumber: true })}
                      disabled={isLoading}
                    />
                  </div>
                  {errors.coordinates?.y && (
                    <p className="mt-1 text-xs text-red-400 font-mono">{errors.coordinates.y.message}</p>
                  )}
                </div>
                
                {/* Z Coordinate */}
                <div className="group">
                  <div className="flex items-center justify-between mb-1">
                    <label htmlFor="coordinates.z" className="text-sm font-mono text-blue-300 group-focus-within:text-blue-400 transition-colors">
                      Z_COORDINATE
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      type="number"
                      id="coordinates.z"
                      className={`w-full bg-black/50 border ${errors.coordinates?.z ? 'border-red-500' : 'border-blue-500/30 focus:border-blue-400'} text-white font-mono px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all`}
                      {...register('coordinates.z', { valueAsNumber: true })}
                      disabled={isLoading}
                    />
                  </div>
                  {errors.coordinates?.z && (
                    <p className="mt-1 text-xs text-red-400 font-mono">{errors.coordinates.z.message}</p>
                  )}
                </div>
              </div>
              
              {/* Right Column - Core and Pressure */}
              <div className="space-y-4">
                {/* Core Heat Temperature */}
                <div className="group">
                  <div className="flex items-center justify-between mb-1">
                    <label htmlFor="coreHeat" className="text-sm font-mono text-blue-300 group-focus-within:text-blue-400 transition-colors">
                      CORE HEAT TEMPERATURE (K)
                    </label>
                    <span className="text-xs text-purple-400 animate-pulse">
                      {formValues.coreHeat} K
                    </span>
                  </div>
                  <div className="relative">
                    <input
                      type="range"
                      id="coreHeat"
                      min="1000"
                      max="10000"
                      step="100"
                      className={`w-full h-2 bg-blue-900/50 rounded-lg appearance-none cursor-pointer ${errors.coreHeat ? 'border-red-500' : ''}`}
                      {...register('coreHeat', { valueAsNumber: true })}
                      disabled={isLoading}
                    />
                    <div className="flex justify-between text-xs text-blue-300 mt-1">
                      <span>1000K</span>
                      <span>10000K</span>
                    </div>
                  </div>
                  {errors.coreHeat && (
                    <p className="mt-1 text-xs text-red-400 font-mono">{errors.coreHeat.message}</p>
                  )}
                </div>
                
                {/* Detonation Pressure */}
                <div className="group mt-6">
                  <div className="flex items-center justify-between mb-1">
                    <label htmlFor="detonationPressure" className="text-sm font-mono text-blue-300 group-focus-within:text-blue-400 transition-colors">
                      DETONATION PRESSURE (GPa)
                    </label>
                    <span className="text-xs text-purple-400 animate-pulse">
                      {formValues.detonationPressure.toFixed(2)} GPa
                    </span>
                  </div>
                  <div className="relative">
                    <input
                      type="range"
                      id="detonationPressure"
                      min="0.1"
                      max="5.0"
                      step="0.1"
                      className={`w-full h-2 bg-blue-900/50 rounded-lg appearance-none cursor-pointer ${errors.detonationPressure ? 'border-red-500' : ''}`}
                      {...register('detonationPressure', { valueAsNumber: true })}
                      disabled={isLoading}
                    />
                    <div className="flex justify-between text-xs text-blue-300 mt-1">
                      <span>0.1GPa</span>
                      <span>5.0GPa</span>
                    </div>
                  </div>
                  {errors.detonationPressure && (
                    <p className="mt-1 text-xs text-red-400 font-mono">{errors.detonationPressure.message}</p>
                  )}
                </div>
                
                {/* Status Indicator */}
                <div className="mt-8 p-3 rounded border border-blue-500/30 bg-black/20">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-2 ${systemStatus === AccessState.SUCCESS ? 'bg-green-500' : systemStatus === AccessState.DENIED ? 'bg-red-500' : 'bg-yellow-500'} animate-pulse`}></div>
                    <span className="text-sm font-mono text-blue-300">
                      {systemStatus === AccessState.SUCCESS 
                        ? 'SYSTEM NOMINAL' 
                        : systemStatus === AccessState.DENIED 
                          ? 'PARAMETERS NOT OPTIMAL' 
                          : 'AWAITING INPUT'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
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
                    {...register(`coordinates.${axis}` as const, { valueAsNumber: true })}
                    className={`relative w-full px-4 py-3 bg-black/70 backdrop-blur-sm border ${errors.coordinates?.[axis as keyof typeof errors.coordinates] ? 'border-red-500/60' : 'border-blue-400/30'} text-blue-100 text-center font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200`}
                    placeholder="0.0"
                    style={{
                      boxShadow: errors.coordinates?.[axis as keyof typeof errors.coordinates] 
                        ? '0 0 15px rgba(239, 68, 68, 0.4)' 
                        : '0 0 15px rgba(96, 165, 250, 0.1)',
                      textShadow: '0 0 8px rgba(96, 165, 250, 0.3)'
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
            <span className="text-blue-100 group-hover:text-white transition-colors font-mono text-sm tracking-wider flex items-center">
              <span className="opacity-80 group-hover:opacity-100 transition-opacity">[</span>
              <span className="mx-2 text-blue-50 group-hover:text-white transition-colors font-medium">
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

export default PanelPage;
