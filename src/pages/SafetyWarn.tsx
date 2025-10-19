import { useNavigate } from 'react-router-dom';
import BrieBlasterPage from '../components/BrieBlasterPage';


export function SafetyWarn() {

  const navigate = useNavigate();
  
  return (

    <BrieBlasterPage>
    
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">!!! ATTENTION !!!</h1>
        <br/>
        <p className="text-sm text-gray-300">
          YOU ARE ENTERING A DANGEROUS AREA. BE CAREFUL.
        </p>
        <p className="text-sm text-gray-300">
          TWEAKING THE SYSTEM MAY LEAD TO SERIOUS CONSEQUENCES.
        </p>
        <p className="text-sm text-gray-300">
          DO NOT PROCEED UNLESS YOU ARE AUTHORIZED TO DO SO.
        </p>
        <br/>
        <h2 className="text-sm text-gray-300">
          FOLLOW THESE RULES STRICTLY:
        </h2>
        <p className="text-sm text-gray-300">
          1. NEVER EXCEED THE MAXIMUM ALLOWED CHEESE TEMPERATURE OF 1200K.
        </p>
        
        <p className="text-sm text-gray-300">
          2. NEVER HEAT UP THE CHAMBER BEFORE INSERTING THE CHEESE. . . . .
        </p> 
        <p className="text-sm text-gray-300">
          3. NEVER EXCEED THE MAXIMUM ALLOWED CHAMBER PRESSURE OF 5000 GPa.
        </p>
        <p className="text-sm text-gray-300">
          4. NEVER EXCEED THE MAXIMUM ALLOWED CHEESE VELOCITY OF 10000 m/s.
        </p>
        <br/>
        <p className="text-sm text-gray-300">
          SETTING THE PARAMETERS TOO HIGH MAY LEAD TO AN EXPLOSION OF THE WEAPON. OR WORSE.
        </p>
        <p className="text-sm text-gray-300">
          YOU WILL NOT BE REFUNDED FOR ANY DAMAGES CAUSED BY YOUR ACTIONS.
        </p>
        <br/>
        <h3 className="text-sm text-gray-300">
          YOU HAVE BEEN WARNED.
        </h3>
        <br/>
        <button 
          className={`group relative w-full flex justify-center items-center py-3 px-6 overflow-hidden cursor-pointer`}
          style={{
            color: 'white',
            background: 'linear-gradient(90deg, rgba(30, 58, 138, 0.4) 0%, rgba(76, 29, 149, 0.4) 100%)',
            boxShadow: '0 0 15px rgba(59, 130, 246, 0.3)',
            border: '1px solid rgba(96, 165, 250, 0.3)',
            borderRadius: '0.25rem',
            position: 'relative',
            overflow: 'hidden',
            transition: 'all 0.3s ease',
          }}
          onClick={() => navigate('/panel')}>
          <h4>
            I HAVE READ AND UNDERSTOOD THE SAFETY WARNINGS ✓
          </h4>
        </button>
      </div>
    </BrieBlasterPage>
  );
}

export default SafetyWarn;
