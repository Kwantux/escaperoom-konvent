import { useNavigate } from 'react-router-dom';
import BrieBlasterPage from '../components/BrieBlasterPage';


export function AntennaWarn() {
  const navigate = useNavigate();
  
  return (

    <BrieBlasterPage>
    
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">!!! ATTENTION !!!</h1>
        <br/>
        <p>
          YOU ARE ENTERING A DANGEROUS AREA. BE CAREFUL.
        </p>
        <p>
          TWEAKING THE SYSTEM MAY LEAD TO SERIOUS CONSEQUENCES.
        </p>
        <p>
          DO NOT PROCEED UNLESS YOU ARE AUTHORIZED TO DO SO.
        </p>
        <br/>
        <h3>
          YOU ARE HANDLING SENSITIVE HIGH VOLTAGE ELECTRONICS.
        </h3>
        <p>
          1. ALWAYS CHECK IF THE ANTENNA IS CORRECTLY CONNECTED.
        </p>
        <p>
          2. ALWAYS CHECK IF THE ANTENNA IS CORRECTLY ASSEMBLED.
        </p>
        <p>
          3. MAKE SURE THE ANTENNA IS PLUGGED INTO THE USB PORT.
        </p> 

        <br/>
        <h3>
          INSERTING NO ANTENNA OR A BROKEN ONE WILL CERTAINLY<br/>SHORT CIRCUIT THE ELECTRONICS AND DESTROY THIS COMPUTER.
        </h3>
        <br/>
        <p>
          YOU WILL NOT BE REFUNDED FOR ANY DAMAGES CAUSED BY YOUR ACTIONS.
        </p>
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
          onClick={() => navigate('/login')}>
          <h4>
            I HAVE CONNECTED THE ANTENNA SAFELY ✓
          </h4>
        </button>
        
      </div>
    </BrieBlasterPage>
  );
}

export default AntennaWarn;
