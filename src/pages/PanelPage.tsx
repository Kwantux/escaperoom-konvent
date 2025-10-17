import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import BrieBlasterPage from '../components/BrieBlasterPage';

const panelSchema = z.object({
  coordinates: z.object({
    x: z.number(),
    y: z.number(),
    z: z.number(),
  }),
  coreHeat: z.number().min(310, 'TOO LOW'),
  detonationPressure: z.number().min(100, 'INVALID PRESSURE')
});

const EARTH_COORDINATES = {
  x: 1350,
  y: 4562,
  z: 9313
};

const MAX_CORE_HEAT = 1200;
const MAX_DETONATION_PRESSURE = 5000;

type PanelFormData = z.infer<typeof panelSchema>;

enum SystemState {
  FRESH,
  HEATING_UP,
  READY_FOR_BLAST,
  BLASTING,
  BLAST_OVER
}

export function PanelPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [systemStatus, setSystemStatus] = useState(SystemState.FRESH);
  const [currentTemperature, setCurrentTemperature] = useState(310);
  const [targetTemperature, setTargetTemperature] = useState(310);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PanelFormData>({
    resolver: zodResolver(panelSchema),
    defaultValues: {
      coordinates: { x: EARTH_COORDINATES.x, y: EARTH_COORDINATES.y, z: EARTH_COORDINATES.z },
      coreHeat: 450,
      detonationPressure: 1200
    }
  });


  const onSubmit = async (data: PanelFormData) => {
    setIsLoading(true);
    
    // Simulate system processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (systemStatus === SystemState.FRESH) {
      setSystemStatus(SystemState.HEATING_UP);
      setTargetTemperature(data.coreHeat);
    
          
      let temperatureInterval = setInterval(() => {
        setCurrentTemperature(current => {
          const newTemp = Math.min(current + 1, data.coreHeat);
          if (newTemp >= data.coreHeat) {
            clearInterval(temperatureInterval);
            setSystemStatus(SystemState.READY_FOR_BLAST);
            setIsLoading(false);
          }
          if (newTemp >= MAX_CORE_HEAT) {
            navigate('/system-destroyed');
            return -1;
          }
          return newTemp;
        });
      }, 30);

      return () => clearInterval(temperatureInterval);
    }

    if (systemStatus === SystemState.READY_FOR_BLAST || systemStatus === SystemState.BLAST_OVER) {
      setSystemStatus(SystemState.BLASTING);
      await new Promise(resolve => setTimeout(resolve, 5000));
      
      if (data.detonationPressure > MAX_DETONATION_PRESSURE) {
        navigate('/system-destroyed');
        return;
      }
      if (data.coordinates.x === EARTH_COORDINATES.x && data.coordinates.y === EARTH_COORDINATES.y && data.coordinates.z === EARTH_COORDINATES.z) {
        navigate('/earth-destroyed');
        return;
      }
      setSystemStatus(SystemState.BLAST_OVER);
      await new Promise(resolve => setTimeout(resolve, 3000));
      setIsLoading(false);
      setSystemStatus(SystemState.FRESH);
    }
    
    
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
                {/* <h3 className="text-sm font-mono text-blue-300 uppercase tracking-wider">[TARGET COORDINATES]</h3> */}
                <br/>
                {/* X Coordinate */}
                <div className="group">
                  <div className="flex items-center justify-between mb-1">
                    <label htmlFor="coordinates.x" className="text-sm font-mono text-blue-300 group-focus-within:text-blue-400 transition-colors">
                      <h3>X_COORDINATE</h3>
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

                <br/>
                
                {/* Y Coordinate */}
                <div className="group">
                  <div className="flex items-center justify-between mb-1">
                    <label htmlFor="coordinates.y" className="text-sm font-mono text-blue-300 group-focus-within:text-blue-400 transition-colors">
                      <h3>Y_COORDINATE</h3>
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
                
                <br/>
                
                {/* Z Coordinate */}
                <div className="group">
                  <div className="flex items-center justify-between mb-1">
                    <label htmlFor="coordinates.z" className="text-sm font-mono text-blue-300 group-focus-within:text-blue-400 transition-colors">
                      <h3>Z_COORDINATE</h3>
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
              
              <br/>
              
              {/* Right Column - Core and Pressure */}
              <div className="space-y-4">
                {/* Core Heat Temperature */}
                <div className="group">
                  <div className="flex items-center justify-between mb-1">
                    <label htmlFor="coreHeat" className="text-sm font-mono text-blue-300 group-focus-within:text-blue-400 transition-colors">
                      <h3>CORE TEMPERATURE (K)</h3>
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      type="number"
                      id="coreHeat"
                      className={`w-full bg-black/50 border ${errors.coreHeat ? 'border-red-500' : 'border-blue-500/30 focus:border-blue-400'} text-white font-mono px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all`}
                      {...register('coreHeat', { valueAsNumber: true })}
                      disabled={isLoading}
                    />
                  </div>
                  {errors.coreHeat && (
                    <p className="mt-1 text-xs text-red-400 font-mono">{errors.coreHeat.message}</p>
                  )}
                </div>

                <br/>
                
                {/* Detonation Pressure */}
                <div className="group mt-6">
                  <div className="flex items-center justify-between mb-1">
                    <label htmlFor="detonationPressure" className="text-sm font-mono text-blue-300 group-focus-within:text-blue-400 transition-colors">
                      <h3>DETONATION PRESSURE (GPa)</h3>
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      type="number"
                      id="detonationPressure"
                      className={`w-full bg-black/50 border ${errors.detonationPressure ? 'border-red-500' : 'border-blue-500/30 focus:border-blue-400'} text-white font-mono px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all`}
                      {...register('detonationPressure', { valueAsNumber: true })}
                      disabled={isLoading}
                    />
                  </div>
                  {errors.detonationPressure && (
                    <p className="mt-1 text-xs text-red-400 font-mono">{errors.detonationPressure.message}</p>
                  )}
                </div>
              </div>
            </div>
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
            <span className="text-blue-100 group-hover:text-white transition-colors font-mono text-sm tracking-wider flex items-center">
              <span className="opacity-80 group-hover:opacity-100 transition-opacity">[</span>
              <span className="mx-2 text-blue-50 group-hover:text-white transition-colors font-medium">
                {systemStatus === SystemState.FRESH && "HEAT UP"}
                {systemStatus === SystemState.HEATING_UP && "HEATING UP..."}
                {systemStatus === SystemState.READY_FOR_BLAST && "LAUNCH CHEESE"}
                {systemStatus === SystemState.BLASTING && "LAUNCHING CHEESE..."}
                {systemStatus === SystemState.BLAST_OVER && "LAUNCH CHEESE"}
              </span>
              <span className="opacity-80 group-hover:opacity-100 transition-opacity">]</span>
            </span>
          </span>
          
          {/* Loading state
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex items-center">
                <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin mr-2"></div>
                <span className="text-blue-100 font-mono text-sm tracking-wider">
                  SENDING COMMAND...
                </span>
              </div>
            </div>
          )} */}
          
          {/* Glow effect on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-400/20 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </button>

        <br/><br/>
        
        {(systemStatus === SystemState.HEATING_UP) && (
          <div className="mt-4 p-3 bg-red-900/30 border border-red-500/30 text-red-300 text-sm font-mono flex items-center justify-center animate-pulse">
            <span className="inline-block w-2 h-2 bg-red-500 rounded-full mr-2"></span>
            SYSTEM IS HEATING UP...
            <br/>
            {currentTemperature} / {targetTemperature} K
          </div>
        )}
        {(systemStatus === SystemState.READY_FOR_BLAST) && (
          <div className="mt-4 p-3 bg-red-900/30 border border-red-500/30 text-red-300 text-sm font-mono flex items-center justify-center animate-pulse">
            <span className="inline-block w-2 h-2 bg-red-500 rounded-full mr-2"></span>
            SYSTEM IS READY FOR GRAND GRATINATION
          </div>
        )}
        {(systemStatus === SystemState.BLASTING) && (
          <div className="mt-4 p-3 bg-red-900/30 border border-red-500/30 text-red-300 text-sm font-mono flex items-center justify-center animate-pulse">
            <span className="inline-block w-2 h-2 bg-red-500 rounded-full mr-2"></span>
            GRATINATION IN PROGRESS...
          </div>
        )}
        {(systemStatus === SystemState.BLAST_OVER) && (
          <div className="mt-4 p-3 bg-red-900/30 border border-red-500/30 text-red-300 text-sm font-mono flex items-center justify-center animate-pulse">
            <span className="inline-block w-2 h-2 bg-red-500 rounded-full mr-2"></span>
            GRATINATION SUCCESSFUL
          </div>
        )}

        <br/><br/>

        </div>
      </form>
    </BrieBlasterPage>
  );
}

export default PanelPage;
