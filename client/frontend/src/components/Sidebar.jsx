function Sidebar({ children }) {
  return (
    <div
      style={{
        width: 320,
        borderRight: "1px solid #1f2937",
        padding: 16,
        height: "100vh",
        backgroundColor: "#020617",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        gap: 16,
        overflowY: "auto"
      }}
    >
      {children}
    </div>
  )
}

export default Sidebar