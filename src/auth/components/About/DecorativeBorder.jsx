const DecorativeBorder = () => (
  <div style={{marginBottom:"12px"}} className="w-full border-t border-yellow-700 pt-6">
    <div className="flex justify-center gap-4">
      {[...Array(15)].map((_, i) => (
        <svg key={i} style={{color:"#ff9800"}} className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C10 6 6 10 2 12c4 2 8 6 10 10 2-4 6-8 10-10-4-2-8-6-10-10z" />
        </svg>
      ))}
    </div>
  </div>
);

export default DecorativeBorder;
