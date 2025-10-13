
interface BrieBlasterPageProps {
  children?: React.ReactNode;
}

export function BrieBlasterPage({ children }: BrieBlasterPageProps) {

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-auto">
      {/* Outer glow and border */}
      <div 
        className="fixed inset-0 border-2 border-blue-500/30 pointer-events-none" 
        style={{
          boxShadow: '0 0 50px rgba(0, 243, 255, 0.3)',
          borderImage: 'linear-gradient(45deg, rgba(0, 243, 255, 0.3), rgba(188, 19, 254, 0.3)) 1',
        }}
      />
      
      {/* Animated background elements */}
      <div className="fixed inset-0 bg-grid-pattern opacity-20" />
      <div className="fixed inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-transparent via-transparent to-blue-900/20" />
      
      {/* Scanline effect */}
      <div 
        className="fixed inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent opacity-30 pointer-events-none" 
        style={{
          backgroundSize: '100% 2px',
          animation: 'scanline 4s linear infinite'
        }}
      />
      
      {/* Main content container */}
      <div 
        className="relative w-full max-w-2xl bg-black/80 backdrop-blur-sm rounded-lg overflow-hidden border border-blue-500/30 shadow-2xl z-10"
        style={{
          boxShadow: '0 0 25px rgba(0, 243, 255, 0.2)',
          borderImage: 'linear-gradient(45deg, rgba(0, 243, 255, 0.3), rgba(188, 19, 254, 0.3)) 1',
          height: '90vh',
          padding: '5vh'
        }}
      >
        
        {/* Terminal header */}
        <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 p-3 border-b border-blue-500/30 flex items-center">
          <div className="flex space-x-2 absolute">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="w-full text-center">
            <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 tracking-wider">
              BRIE BLASTER 3000 - SECURE ACCESS
            </h2>
          </div>
        </div>

        <br/><br/>
        
        {/* Terminal content */}
        <div className="p-6 relative">
          
            {children}

            <br/><br/>
            
            <div className="mt-6 pt-4 border-t border-blue-500/10 text-center">
              <p className="text-xs text-blue-400/60 font-mono">
                BRIE BLASTER 3000 // VERSION 2.3.7 // SECURE CONNECTION
              </p>
              <p className="text-[10px] text-blue-400/40 mt-1 font-mono">
                © 2025 MOZZELLARATOR GROUP. ALL RIGHTS RESERVED.
              </p>
            </div>
          
          {/* Grid overlay */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/10 to-transparent"></div>
            <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/5 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/10 to-transparent"></div>
            <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-blue-500/10 to-transparent"></div>
            <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-blue-500/10 to-transparent"></div>
          </div>
        </div>
        
        {/* Status bar */}
        <div className="bg-black/70 p-2 border-t border-blue-500/20 flex justify-between items-center text-xs font-mono text-blue-400/60">
          <div className="flex items-center">
            <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
            <span>SYSTEM STATUS: ONLINE</span>
          </div>
          <div className="text-right">
            <div className="text-blue-300">ENCRYPTION: ACTIVE</div>
            <div className="text-[10px] text-blue-400/40">AUTH_REQ: {new Date().toISOString()}</div>
          </div>
        </div>
      </div>
      
      {/* Corner decorations */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-blue-500/50"></div>
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-blue-500/50"></div>
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-blue-500/50"></div>
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-blue-500/50"></div>
    </div>
  );
}

export default BrieBlasterPage;
